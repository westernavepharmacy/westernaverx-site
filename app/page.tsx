import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StructuredData } from "@/components/StructuredData";

// Sean's Long-Term Care site (separate deployment for now; can move to ltc.westernaverx.com later)
const LTC_URL = "https://westernaverx-gamma.vercel.app";

export const metadata = { alternates: { canonical: "/" } };

export default function Welcome() {
  return (
    <>
      <StructuredData />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0a2a6b_0%,#0a2a6b_40%,#006fb8_100%)] px-6 py-16 text-white">
        <Logo dark className="h-10 w-auto" />

        <h1 className="mt-8 max-w-2xl text-center text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Welcome to Western Ave Pharmacy
        </h1>
        <p className="mt-4 max-w-xl text-center text-lg text-white/80">
          How can we help you today?
        </p>

        <div className="mt-12 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          {/* Retail — Arthur's site */}
          <Link
            href="/home"
            className="group flex flex-col rounded-3xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky hover:bg-white/[0.12]"
          >
            <span className="text-5xl">🛒</span>
            <h2 className="mt-5 text-2xl font-bold">Retail Pharmacy</h2>
            <p className="mt-2 flex-1 leading-relaxed text-white/75">
              Shop over-the-counter essentials, vitamins, first aid, and cold beer &amp; wine — with
              local delivery and free pickup in Glendale.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sky group-hover:text-white">
              Enter the shop
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Long-Term Care — Sean's site */}
          <a
            href={LTC_URL}
            className="group flex flex-col rounded-3xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky hover:bg-white/[0.12]"
          >
            <span className="text-5xl">🏥</span>
            <h2 className="mt-5 text-2xl font-bold">Long-Term Care</h2>
            <p className="mt-2 flex-1 leading-relaxed text-white/75">
              Closed-door pharmacy for senior living &amp; care facilities — same-day delivery, 24/7
              pharmacist access, and full compliance support.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sky group-hover:text-white">
              Enter LTC services
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>

        <p className="mt-12 text-center text-sm text-white/55">
          501 Western Ave · Glendale, CA 91201 ·{" "}
          <a href="tel:+18182425887" className="hover:text-white">
            (818) 242-5887
          </a>{" "}
          · Licensed CA pharmacy
        </p>
      </main>
    </>
  );
}
