import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contact Western Ave Pharmacy in Glendale, CA — retail, prescriptions, and long-term care pharmacy services. Call, email, or visit us.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-mist bg-cloud">
        <div className="mx-auto max-w-[1180px] px-6 py-14">
          <h1 className="text-4xl font-bold tracking-tight text-navy">Contact us</h1>
          <p className="mt-3 max-w-xl text-slate">
            Questions about an order, a prescription, or partnering with us for long-term care?
            We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1080px] gap-8 px-6 py-16 md:grid-cols-2">
        {/* Retail */}
        <div className="rounded-3xl border border-mist bg-white p-8">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-cyan">Retail & prescriptions</span>
          <h2 className="mt-2 text-2xl font-bold text-navy">Western Ave Pharmacy</h2>
          <ul className="mt-5 space-y-3 text-[15px] text-ink">
            <li className="flex gap-3"><span className="text-xl">📍</span> 501 Western Ave, Glendale, CA 91201</li>
            <li className="flex gap-3"><span className="text-xl">📞</span> <a href="tel:+18182425887" className="font-semibold text-cyan hover:text-navy">(818) 242-5887</a></li>
            <li className="flex gap-3"><span className="text-xl">🕘</span> Mon–Fri 9 AM – 6 PM · Sat &amp; Sun closed</li>
          </ul>
          <a
            href="https://maps.google.com/?q=501+Western+Ave+Glendale+CA+91201"
            target="_blank"
            rel="noopener"
            className="mt-6 inline-block rounded-full bg-cyan px-6 py-3 font-semibold text-white transition-colors hover:bg-navy"
          >
            Get directions →
          </a>
        </div>

        {/* LTC */}
        <div className="rounded-3xl border border-mist bg-navy p-8 text-white">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-sky">Long-term care</span>
          <h2 className="mt-2 text-2xl font-bold">Facility partnerships</h2>
          <ul className="mt-5 space-y-3 text-[15px] text-white/90">
            <li className="flex gap-3"><span className="text-xl">📞</span> <a href="tel:+18187474000" className="font-semibold text-sky hover:text-white">(818) 747-4000</a></li>
            <li className="flex gap-3"><span className="text-xl">📠</span> Fax (818) 981-9333</li>
            <li className="flex gap-3"><span className="text-xl">✉️</span> <a href="mailto:Rx@Westernaverx.com" className="font-semibold text-sky hover:text-white">Rx@Westernaverx.com</a></li>
            <li className="flex gap-3"><span className="text-xl">🌙</span> 24-hour emergency line for partner facilities</li>
          </ul>
          <a
            href="mailto:Rx@Westernaverx.com"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-navy"
          >
            Email our LTC team →
          </a>
        </div>
      </section>
    </>
  );
}
