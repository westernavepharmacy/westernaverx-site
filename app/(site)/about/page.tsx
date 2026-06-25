import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Western Ave Pharmacy is an owner-operated neighborhood pharmacy in Glendale, CA — combining retail convenience with specialized long-term care services.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#0a2a6b,#006fb8)] text-white">
        <div className="mx-auto max-w-[900px] px-6 py-20 text-center sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">A pharmacy that knows your name</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Western Ave Pharmacy is an independent, owner-operated pharmacy in Glendale — built on
            the belief that great care is personal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-6 py-16 sm:py-20">
        <div className="space-y-6 text-[17px] leading-relaxed text-ink/90">
          <p>
            We&apos;re a full-service neighborhood pharmacy serving Glendale and the surrounding
            communities. From everyday over-the-counter essentials and vitamins to first aid and
            cold beer &amp; wine, we make it easy to get what you need — in store, delivered to your
            door, or ready for quick pickup.
          </p>
          <p>
            Beyond our retail counter, we&apos;re also a trusted{" "}
            <Link href="/long-term-care" className="font-semibold text-cyan hover:text-navy">
              long-term care pharmacy partner
            </Link>{" "}
            for assisted living communities, RCFEs, hospice, and home-health providers across Los
            Angeles — providing same-day medication delivery, 24/7 pharmacist access, and hands-on
            compliance support.
          </p>
          <p>
            As an owner-operated pharmacy, the person filling your prescription is the same person
            accountable for your care. That&apos;s a level of consistency and trust the big chains
            simply can&apos;t match.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-mist bg-cloud p-8">
          <h2 className="text-xl font-bold text-navy">Visit us</h2>
          <ul className="mt-4 space-y-2.5 text-[15px] text-ink">
            <li>📍 501 Western Ave, Glendale, CA 91201</li>
            <li>📞 <a href="tel:+18182425887" className="font-semibold text-cyan hover:text-navy">(818) 242-5887</a></li>
            <li>🕘 Monday–Friday, 9 AM – 6 PM</li>
          </ul>
        </div>
      </section>
    </>
  );
}
