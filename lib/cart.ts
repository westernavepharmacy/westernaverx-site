"use server";

// Cart Server Functions — Storefront Cart API, token stays server-side.
// Checkout itself still hands off to Shopify (tax, local delivery, payments).

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const ENDPOINT = `https://${DOMAIN}/api/2025-01/graphql.json`;

// Matches the attribute the Shopify theme's cart gate writes, so admin sees one consistent record.
const AGE_ATTR_KEY = "Age 21+ attestation";
const AGE_ATTR_VALUE = "Customer confirmed 21+ in cart";
const ALCOHOL_TAGS = ["alcohol", "21-plus", "beer"];

export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  variantGid: string;
  handle: string;
  lineTotal: { amount: string; currencyCode: string };
  image: { url: string; altText: string | null } | null;
  alcohol: boolean;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: { amount: string; currencyCode: string };
  attested: boolean;
  hasAlcohol: boolean;
  lines: CartLine[];
};

async function cartFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // cart state must never be cached
  });
  if (!res.ok) throw new Error(`Cart API ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  attributes { key value }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id
          product { title handle tags featuredImage { url altText } }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  attributes: { key: string; value: string }[];
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string; currencyCode: string } };
      merchandise: {
        id: string;
        product: {
          title: string;
          handle: string;
          tags: string[];
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
};

function normalizeCart(c: RawCart | null): Cart | null {
  if (!c) return null;
  const lines: CartLine[] = c.lines.nodes.map((n) => ({
    id: n.id,
    quantity: n.quantity,
    title: n.merchandise.product.title,
    variantGid: n.merchandise.id,
    handle: n.merchandise.product.handle,
    lineTotal: n.cost.totalAmount,
    image: n.merchandise.product.featuredImage,
    alcohol: n.merchandise.product.tags.some((t) => ALCOHOL_TAGS.includes(t.toLowerCase())),
  }));
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: c.cost.subtotalAmount,
    attested: c.attributes.some((a) => a.key === AGE_ATTR_KEY),
    hasAlcohol: lines.some((l) => l.alcohol),
    lines,
  };
}

export async function fetchCart(cartId: string): Promise<Cart | null> {
  const data = await cartFetch<{ cart: RawCart | null }>(
    `query Cart($id: ID!) { cart(id: $id) { ${CART_FRAGMENT} } }`,
    { id: cartId }
  );
  return normalizeCart(data.cart);
}

export async function addLine(
  cartId: string | null,
  variantGid: string,
  quantity = 1
): Promise<Cart | null> {
  if (!cartId) {
    const data = await cartFetch<{ cartCreate: { cart: RawCart | null; userErrors: { message: string }[] } }>(
      `mutation Create($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) { cart { ${CART_FRAGMENT} } userErrors { message } }
      }`,
      { lines: [{ merchandiseId: variantGid, quantity }] }
    );
    if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
    return normalizeCart(data.cartCreate.cart);
  }
  const data = await cartFetch<{ cartLinesAdd: { cart: RawCart | null; userErrors: { message: string }[] } }>(
    `mutation Add($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } userErrors { message } }
    }`,
    { cartId, lines: [{ merchandiseId: variantGid, quantity }] }
  );
  if (data.cartLinesAdd.userErrors.length) {
    // Stale/expired cart id (e.g. completed checkout) — start fresh.
    return addLine(null, variantGid, quantity);
  }
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function setLineQuantity(cartId: string, lineId: string, quantity: number): Promise<Cart | null> {
  if (quantity <= 0) {
    const data = await cartFetch<{ cartLinesRemove: { cart: RawCart | null } }>(
      `mutation Remove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FRAGMENT} } }
      }`,
      { cartId, lineIds: [lineId] }
    );
    return normalizeCart(data.cartLinesRemove.cart);
  }
  const data = await cartFetch<{ cartLinesUpdate: { cart: RawCart | null } }>(
    `mutation Update($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return normalizeCart(data.cartLinesUpdate.cart);
}

// 21+ attestation for carts containing beer/wine — same attribute the in-store theme gate records.
export async function attestAge(cartId: string): Promise<Cart | null> {
  const data = await cartFetch<{ cartAttributesUpdate: { cart: RawCart | null } }>(
    `mutation Attest($cartId: ID!, $attributes: [AttributeInput!]!) {
      cartAttributesUpdate(cartId: $cartId, attributes: $attributes) { cart { ${CART_FRAGMENT} } }
    }`,
    { cartId, attributes: [{ key: AGE_ATTR_KEY, value: AGE_ATTR_VALUE }] }
  );
  return normalizeCart(data.cartAttributesUpdate.cart);
}
