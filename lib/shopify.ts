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
};
export type Collection = {
  title: string;
  handle: string;
  products: Product[];
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
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { edges { node { availableForSale } } }
`;

type RawProduct = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: Money };
  variants: { edges: { node: { availableForSale: boolean } }[] };
};

function normalize(p: RawProduct): Product {
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    productType: p.productType,
    featuredImage: p.featuredImage,
    price: p.priceRange.minVariantPrice,
    available: p.variants.edges[0]?.node.availableForSale ?? true,
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

export async function getCollectionProducts(handle: string, first = 24): Promise<Collection | null> {
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

export function money(m: Money): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: m.currencyCode }).format(
    parseFloat(m.amount)
  );
}

// Direct link to a product on the Shopify store (hosted checkout / PDP).
export function productUrl(handle: string): string {
  return `${STORE_URL}/products/${handle}`;
}
