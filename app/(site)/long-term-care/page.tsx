import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/long-term-care" },
  title: "Long-Term Care Pharmacy",
  description:
    "Western Ave Pharmacy provides closed-door long-term care pharmacy services to assisted living, RCFEs, hospice, and home health across Los Angeles — same-day delivery, 24/7 pharmacist access, and compliance support.",
};

const SERVICES = [
  { title: "Same-day medication delivery", body: "Reliable daily and STAT delivery to your facility, including weekends." },
  { title: "24/7 pharmacist availability", body: "A pharmacist on call around the clock for urgent questions and orders." },
  { title: "Medication therapy management", body: "Regimen reviews to improve outcomes and reduce adverse interactions." },
  { title: "Formulary optimization", body: "Cost-effective formulary guidance tailored to your residents." },
  { title: "Staff training & compliance", body: "In-service training, chart audits, and survey-readiness support." },
  { title: "DME & medical supplies", body: "Durable medical equipment and supplies coordinated with your care plans." },
];

const SERVE = [
  { icon: "🏡", label: "Assisted Living & RCFEs" },
  { icon: "🕊️", label: "Hospice" },
  { icon: "🩺", label: "Home Health" },
  { icon: "☀️", label: "Adult Day Centers" },
];

export default function LongTermCarePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#071f50,#0a2a6b_55%,#006fb8)] text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-20 sm:py-24">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-sky-soft">
            Closed-door pharmacy
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Long-term care pharmacy services, built around your facility.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Western Ave Pharmacy is an owner-operated, closed-door pharmacy serving senior living
            communities across Los Angeles with personalized, 24/7 medication management.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="tel:+18187474000" className="rounded-full bg-white px-7 py-3.5 font-semibold text-navy transition-transform hover:-translate-y-0.5">
              Call (818) 747-4000
            </a>
            <Link href="/contact" className="rounded-full border-[1.5px] border-white/55 bg-white/10 px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5">
              Request a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-[1080px] px-6 py-16 sm:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-navy">Owner-operated, personally accountable</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate">
          When you partner with us, you work directly with the pharmacist-owner — not a call center.
          That means faster decisions, consistent communication, and care tailored to your residents
          rather than a one-size-fits-all contract.
        </p>
      </section>

      {/* Services */}
      <section className="bg-cloud">
        <div className="mx-auto max-w-[1180px] px-6 py-16 sm:py-20">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-navy">What we provide</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-mist bg-white p-6">
                <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-[1080px] px-6 py-16 sm:py-20">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-navy">Who we serve</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SERVE.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3 rounded-2xl border border-mist bg-cloud px-4 py-8 text-center">
              <span className="text-4xl">{s.icon}</span>
              <span className="font-semibold text-navy">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Prime Initiative */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-[900px] px-6 py-16 sm:py-20 text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-sky">
            Community education
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">The Prime Initiative</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/85">
            Our community-education program brings practical medication-safety and wellness training
            to facility staff, caregivers, and families — because better-informed care teams mean
            healthier, safer residents.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1080px] px-6 py-16 sm:py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-navy">Let&apos;s talk about your facility</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate">
          We&apos;ll review your current pharmacy setup and show you exactly how we&apos;d improve
          delivery times, compliance, and resident care.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <a href="tel:+18187474000" className="rounded-full bg-cyan px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy">
            Call (818) 747-4000
          </a>
          <a href="mailto:Rx@Westernaverx.com" className="rounded-full border-[1.5px] border-mist px-7 py-3.5 font-semibold text-navy transition-colors hover:border-cyan hover:text-cyan">
            Rx@Westernaverx.com
          </a>
        </div>
      </section>
    </>
  );
}
