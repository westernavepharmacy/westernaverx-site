import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getCollectionProducts, STORE_URL, type Product } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop",
  description:
    "Shop over-the-counter medicine, vitamins, personal care, first aid, and beer & wine from Western Ave Pharmacy — delivered or ready for pickup in Glendale.",
};

const CATEGORIES = [
  { label: "All", handle: "" },
  { label: "Pain Relief", handle: "pain-relief" },
  { label: "Cold, Flu & Cough", handle: "cold-flu-cough" },
  { label: "Allergy & Sinus", handle: "allergy-sinus" },
  { label: "Digestive Health", handle: "digestive-health" },
  { label: "Eye & Ear Care", handle: "eye-ear-care" },
  { label: "Skin & Foot Care", handle: "skin-foot-care" },
  { label: "Oral Care", handle: "oral-care" },
  { label: "Feminine Care", handle: "feminine-care" },
  { label: "Sexual Wellness", handle: "sexual-wellness" },
  { label: "Sleep", handle: "sleep-aids" },
  { label: "First Aid", handle: "first-aid-medical-supplies" },
  { label: "Vitamins", handle: "vitamins-supplements" },
  { label: "Personal Care", handle: "personal-care-hygiene" },
  { label: "Baby & Child", handle: "baby-child" },
  { label: "Beverages", handle: "beverages" },
  { label: "Beer & Wine", handle: "beer-wine" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active = c && CATEGORIES.some((cat) => cat.handle === c) ? c : "";

  let products: Product[] = [];
  let heading = "All products";
  if (active) {
    const col = await getCollectionProducts(active).catch(() => null);
    products = col?.products ?? [];
    heading = col?.title ?? "Products";
  } else {
    products = await getAllProducts().catch(() => []);
  }
  if (products.length) heading += ` (${products.length})`;

  return (
    <>
      <section className="border-b border-mist bg-cloud">
        <div className="mx-auto max-w-[1180px] px-6 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Shop</h1>
          <p className="mt-2 max-w-xl text-slate">
            Browse our shelves online. Checkout, delivery, and pickup are handled securely through
            our store — same-day local delivery on orders placed by 6 PM.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-6 py-10">
        {/* Category chips */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.handle;
            return (
              <Link
                key={cat.label}
                href={cat.handle ? `/shop?c=${cat.handle}` : "/shop"}
                className={
                  "rounded-full border px-4 py-2 text-[14px] font-medium transition-colors " +
                  (isActive
                    ? "border-cyan bg-cyan text-white"
                    : "border-mist bg-white text-ink/80 hover:border-sky hover:text-cyan")
                }
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        <h2 className="mb-6 text-xl font-bold text-navy">{heading}</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-mist bg-cloud p-12 text-center text-slate">
            No products to show here yet.
          </div>
        )}

        <p className="mt-10 text-center text-sm text-slate">
          Clicking a product opens it in our secure store to add to cart and check out.{" "}
          <a href={STORE_URL} target="_blank" rel="noopener" className="font-semibold text-cyan hover:text-navy">
            Visit the full store →
          </a>
        </p>
      </div>
    </>
  );
}
