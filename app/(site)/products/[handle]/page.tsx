import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllProductHandles, money } from "@/lib/shopify";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/ProductGallery";
import { TrustBadges } from "@/components/TrustBadges";

export const revalidate = 600;

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  try {
    const handles = await getAllProductHandles();
    return handles.map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const p = await getProduct(handle).catch(() => null);
  if (!p) return { title: "Product not found" };
  const desc = (
    p.description ||
    `${p.title} — available at Western Ave Pharmacy in Glendale, CA with local delivery and free pickup.`
  ).slice(0, 160);
  return {
    title: p.title,
    description: desc,
    alternates: { canonical: `/products/${p.handle}` },
    openGraph: {
      title: p.title,
      description: desc,
      url: `/products/${p.handle}`,
      type: "website",
      images: p.images[0] ? [{ url: p.images[0].url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const p = await getProduct(handle).catch(() => null);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    image: p.images.map((i) => i.url),
    description: p.description || p.title,
    ...(p.vendor ? { brand: { "@type": "Brand", name: p.vendor } } : {}),
    ...(p.productType ? { category: p.productType } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: p.price.currencyCode,
      price: parseFloat(p.price.amount).toFixed(2),
      availability: p.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://westernaverx.com/products/${p.handle}`,
      seller: { "@type": "Pharmacy", name: "Western Ave Pharmacy" },
    },
  };

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-sm text-slate">
        <Link href="/home" className="hover:text-cyan">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <Link href="/shop" className="hover:text-cyan">
          Shop
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <ProductGallery images={p.images} title={p.title} />
        </div>

        <div>
          {p.vendor && (
            <div className="text-sm font-semibold uppercase tracking-wide text-cyan">{p.vendor}</div>
          )}
          <h1 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl">
            {p.title}
          </h1>
          <div className="mt-4 text-3xl font-bold text-navy">{money(p.price)}</div>
          <div className="mt-2 text-sm font-medium">
            {p.available ? (
              <span className="text-[#0a8a4a]">● In stock</span>
            ) : (
              <span className="text-slate">Out of stock</span>
            )}
          </div>

          <AddToCartButton
            variantGid={p.variantId ? `gid://shopify/ProductVariant/${p.variantId}` : null}
            available={p.available}
          />
          <p className="mt-3 text-sm text-slate">
            🚚 Local delivery &amp; free in-store pickup in Glendale · Checkout secured by Shopify
          </p>

          <TrustBadges />

          {p.descriptionHtml && (
            <div
              className="mt-8 max-w-none border-t border-mist pt-6 text-[15px] leading-relaxed text-ink [&_li]:my-1 [&_p]:my-3 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
