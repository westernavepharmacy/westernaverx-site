// Shopify Storefront API client — read-only product data for the retail site.
// "Buy" actions hand off to Shopify's hosted checkout so we keep tax/delivery/age-gate.

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = "2025-01";
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

export const STORE_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? DOMAIN}`;

export type Money = { amount: string; currencyCode: string };
export type Product = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  featuredImage: { url: string; altText: string | null } | null;
  price: Money;
  available: boolean;
  variantId: string | null; // ProductVariant GID for cart mutations
  tags: string[];
};
export type Collection = {
  title: string;
  handle: string;
  products: Product[];
};
export type ProductDetail = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  vendor: string;
  description: string;
  descriptionHtml: string;
  images: { url: string; altText: string | null }[];
  price: Money;
  available: boolean;
  variantId: string | null; // numeric variant id, for the Shopify cart permalink
};

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate product data every 10 minutes
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Storefront API ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

const PRODUCT_FRAGMENT = `
  id
  title
  handle
  productType
  tags
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { edges { node { id availableForSale } } }
`;

type RawProduct = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: Money };
  variants: { edges: { node: { id: string; availableForSale: boolean } }[] };
};

function normalize(p: RawProduct): Product {
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    productType: p.productType,
    tags: p.tags ?? [],
    featuredImage: p.featuredImage,
    price: p.priceRange.minVariantPrice,
    available: p.variants.edges[0]?.node.availableForSale ?? true,
    variantId: p.variants.edges[0]?.node.id ?? null,
  };
}

export async function getProducts(first = 12): Promise<Product[]> {
  const data = await storefront<{ products: { edges: { node: RawProduct }[] } }>(
    `query Products($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }`,
    { first }
  );
  return data.products.edges.map((e) => normalize(e.node));
}

// Full catalog for the "All" shop view — pages through every product (250/page).
export async function getAllProducts(): Promise<Product[]> {
  const all: Product[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 8; i++) {
    const data: {
      products: {
        edges: { node: RawProduct }[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    } = await storefront(
      `query AllProducts($cursor: String) {
        products(first: 250, after: $cursor, sortKey: TITLE) {
          edges { node { ${PRODUCT_FRAGMENT} } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { cursor }
    );
    all.push(...data.products.edges.map((e) => normalize(e.node)));
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }
  return all;
}

export async function getCollectionProducts(handle: string, first = 250): Promise<Collection | null> {
  const data = await storefront<{
    collection: { title: string; handle: string; products: { edges: { node: RawProduct }[] } } | null;
  }>(
    `query Collection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        title
        handle
        products(first: $first) { edges { node { ${PRODUCT_FRAGMENT} } } }
      }
    }`,
    { handle, first }
  );
  if (!data.collection) return null;
  return {
    title: data.collection.title,
    handle: data.collection.handle,
    products: data.collection.products.edges.map((e) => normalize(e.node)),
  };
}

// Single product by handle — full detail for the on-site product page (SEO + buy handoff).
export async function getProduct(handle: string): Promise<ProductDetail | null> {
  const data = await storefront<{
    product: {
      id: string;
      title: string;
      handle: string;
      productType: string;
      vendor: string;
      description: string;
      descriptionHtml: string;
      featuredImage: { url: string; altText: string | null } | null;
      images: { edges: { node: { url: string; altText: string | null } }[] };
      priceRange: { minVariantPrice: Money };
      variants: { edges: { node: { id: string; availableForSale: boolean } }[] };
    } | null;
  }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        id title handle productType vendor description descriptionHtml
        featuredImage { url altText }
        images(first: 6) { edges { node { url altText } } }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 1) { edges { node { id availableForSale } } }
      }
    }`,
    { handle }
  );
  const p = data.product;
  if (!p) return null;
  const imgs = p.images.edges.map((e) => e.node);
  const images = imgs.length ? imgs : p.featuredImage ? [p.featuredImage] : [];
  const variantGid = p.variants.edges[0]?.node.id ?? null;
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    productType: p.productType,
    vendor: p.vendor,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    images,
    price: p.priceRange.minVariantPrice,
    available: p.variants.edges[0]?.node.availableForSale ?? true,
    variantId: variantGid ? variantGid.split("/").pop() ?? null : null,
  };
}

// Every product handle (paginated) — for the sitemap and static generation.
export async function getAllProductHandles(): Promise<string[]> {
  const handles: string[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 20; i++) {
    const data: {
      products: {
        edges: { node: { handle: string } }[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    } = await storefront(
      `query Handles($cursor: String) {
        products(first: 250, after: $cursor) {
          edges { node { handle } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { cursor }
    );
    handles.push(...data.products.edges.map((e) => e.node.handle));
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }
  return handles;
}

// Shopify cart permalink — adds the variant and lands on hosted checkout (keeps tax/delivery/age-gate).
export function buyUrl(variantId: string | null, handle: string): string {
  return variantId ? `${STORE_URL}/cart/${variantId}:1` : `${STORE_URL}/products/${handle}`;
}

export function money(m: Money): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: m.currencyCode }).format(
    parseFloat(m.amount)
  );
}

// Direct link to a product on the Shopify store (hosted checkout / PDP).
export function productUrl(handle: string): string {
  return `${STORE_URL}/products/${handle}`;
}

// --- Store policies (pulled from Shopify so legal stays in one source of truth) ---
export type Policy = { title: string; handle: string; body: string };

const POLICY_FIELDS = ["refundPolicy", "privacyPolicy", "termsOfService", "shippingPolicy"] as const;
export type PolicyKey = (typeof POLICY_FIELDS)[number];

export const POLICY_SLUGS: Record<string, PolicyKey> = {
  "refund-policy": "refundPolicy",
  "privacy-policy": "privacyPolicy",
  "terms-of-service": "termsOfService",
  "shipping-policy": "shippingPolicy",
};

export async function getPolicies(): Promise<Policy[]> {
  const data = await storefront<{ shop: Record<PolicyKey, Policy | null> }>(
    `query Policies {
      shop {
        refundPolicy { title handle body }
        privacyPolicy { title handle body }
        termsOfService { title handle body }
        shippingPolicy { title handle body }
      }
    }`
  );
  return POLICY_FIELDS.map((k) => data.shop[k]).filter((p): p is Policy => !!p);
}

export async function getPolicy(slug: string): Promise<Policy | null> {
  const all = await getPolicies();
  return all.find((p) => p.handle === slug) ?? null;
}
