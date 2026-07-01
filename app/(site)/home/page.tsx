import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

// Health & everyday categories (Beer & Wine is intentionally separated below as 21+)
const CATEGORIES = [
  { icon: "🤧", title: "Cold, Flu & Pain", sub: "Over-the-counter relief", handle: "over-the-counter-medicine" },
  { icon: "🧼", title: "Personal Care", sub: "Hygiene & everyday care", handle: "personal-care-hygiene" },
  { icon: "🌱", title: "Vitamins", sub: "Daily health & wellness", handle: "vitamins-supplements" },
  { icon: "🩹", title: "First Aid", sub: "Cuts, scrapes & supplies", handle: "first-aid-medical-supplies" },
  { icon: "💧", title: "Hydration", sub: "Electrolytes & drinks", handle: "beverages" },
  { icon: "🧸", title: "Baby & Child", sub: "Gentle care for little ones", handle: "baby-child" },
];

const TRUST = [
  { icon: "🚚", label: "Free delivery over $35" },
  { icon: "⚡", label: "Same-day by 6 PM" },
  { icon: "🏪", label: "Free store pickup" },
  { icon: "🔒", label: "Licensed CA pharmacy" },
];

export const metadata = { alternates: { canonical: "/home" } };

export default async function Home() {
  const products = await getProducts(10).catch(() => []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a2a6b_0%,#0a2a6b_35%,#006fb8_100%)] text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-24 text-center sm:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.07] tracking-tight sm:text-6xl">
            <span className="text-sky">Your pharmacy,</span>{" "}
            now delivering.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Over-the-counter essentials, vitamins, first aid, and cold beer &amp; wine — ordered
            online and brought right to your door, or ready for pickup in Glendale.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/shop"
              className="rounded-full bg-white px-7 py-3.5 font-semibold text-navy shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Shop the pharmacy
            </Link>
            <Link
              href="/shop?c=beer-wine"
              className="rounded-full border-[1.5px] border-white/55 bg-white/10 px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Beer &amp; Wine (21+)
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="border-b border-mist bg-cloud">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 px-6 py-5 sm:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-2.5 text-center text-[14px] font-medium text-navy/90">
              <span className="text-xl">{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-[1180px] px-6 py-16 sm:py-20">
        <div className="mb-9 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy">Shop by category</h2>
          <p className="mt-2 text-slate">Everything you may need for sick days and good days alike — in one trip.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.handle}
              href={`/shop?c=${c.handle}`}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-mist bg-cloud px-4 py-8 text-center transition-all hover:-translate-y-1 hover:border-sky hover:shadow-[0_12px_28px_rgba(10,42,107,0.12)]"
            >
              <span className="mb-1.5 text-4xl">{c.icon}</span>
              <span className="font-bold text-navy">{c.title}</span>
              <span className="text-[13px] text-slate">{c.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BEER & WINE — separated, 21+ (placed high for visibility) */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#3a0d22_0%,#5a1230_52%,#7a1b3d_100%)] text-white">
        {/* divider rule to signal a distinct department */}
        <div className="h-1 w-full bg-[linear-gradient(90deg,transparent,#e7a9b4,transparent)]" />
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-6 py-16 sm:py-20 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e7a9b4] text-sm font-bold text-[#e7a9b4]">
                21+
              </span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e7a9b4]">
                Beer &amp; Wine
              </span>
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Chilled, stocked, and delivered to your door.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-white/80">
              Grab a cold one without the trip. Browse our beer &amp; wine selection and we&apos;ll
              bring it over with the rest of your order — handed to you, never left at the door.
            </p>
            <p className="mt-3 text-sm font-medium text-[#f1c9d0]">
              🪪 You must be 21 or older. A valid government ID is required at delivery or pickup.
            </p>
            <Link
              href="/shop?c=beer-wine"
              className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-[#5a1230] transition-transform hover:-translate-y-0.5"
            >
              Shop Beer &amp; Wine
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-white/10">
              <Image
                src="/photos/beer-modelo.jpg"
                alt="Cold Modelo beer on ice — beer & wine delivered by Western Ave Pharmacy"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORE FAVORITES */}
      {products.length > 0 && (
        <section className="bg-cloud">
          <div className="mx-auto max-w-[1180px] px-6 py-16 sm:py-20">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">Store favorites</h2>
              <Link href="/shop" className="text-[15px] font-semibold text-cyan hover:text-navy">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {products.slice(0, 10).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LTC TEASER */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-6 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-sky">
              For facilities
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Long-term care pharmacy services</h2>
            <p className="mt-4 max-w-md text-white/85 leading-relaxed">
              We&apos;re a full-service partner to assisted living, RCFEs, hospice, and home health
              across Los Angeles — with same-day medication delivery, 24/7 pharmacist access,
              compliance support, and personalized med management.
            </p>
            <Link
              href="/long-term-care"
              className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              Explore LTC services
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { h: "Same-day", p: "Medication delivery to your facility" },
              { h: "24/7", p: "On-call pharmacist availability" },
              { h: "Compliance", p: "Staff training & chart reviews" },
              { h: "Owner-run", p: "A pharmacist who knows your residents" },
            ].map((b) => (
              <div key={b.h} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5">
                <div className="text-lg font-bold text-sky">{b.h}</div>
                <div className="mt-1 text-sm text-white/80">{b.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="mx-auto grid max-w-[1080px] items-center gap-10 px-6 py-16 sm:py-20 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy">Visit Western Ave Pharmacy</h2>
          <p className="mt-3 leading-relaxed text-slate">
            We&apos;re your full-service neighborhood pharmacy in Glendale — prescriptions,
            over-the-counter care, and everyday essentials, backed by pharmacists who know you by name.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-ink">
            <li className="flex gap-3"><span className="text-xl">📍</span> 501 Western Ave, Glendale, CA 91201</li>
            <li className="flex gap-3"><span className="text-xl">📞</span> <a href="tel:+18182425887" className="font-semibold text-cyan hover:text-navy">(818) 242-5887</a></li>
            <li className="flex gap-3"><span className="text-xl">🚚</span> Local delivery &amp; free in-store pickup</li>
            <li className="flex gap-3"><span className="text-xl">🪪</span> Valid 21+ ID required at handoff for beer &amp; wine</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-[linear-gradient(135deg,#006fb8,#0a2a6b)] p-9 text-white">
          <h3 className="text-xl font-bold">Store hours</h3>
          <div className="mt-4 space-y-1 border-t border-white/20 pt-4 text-[15px] text-white/85">
            <div className="flex justify-between"><span>Monday – Friday</span><span>9 AM – 6 PM</span></div>
            <div className="flex justify-between"><span>Saturday</span><span>Closed</span></div>
            <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
          </div>
          <a
            href="https://maps.google.com/?q=501+Western+Ave+Glendale+CA+91201"
            target="_blank"
            rel="noopener"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-navy"
          >
            Get directions →
          </a>
        </div>
      </section>
    </>
  );
}
