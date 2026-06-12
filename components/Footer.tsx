import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="mx-auto max-w-[1180px] px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark className="h-8" />
          <p className="mt-4 max-w-xs text-sky-soft/90 text-[15px] leading-relaxed">
            Your neighborhood pharmacy in Glendale — retail essentials, online ordering, and
            specialized long-term care services for senior living communities.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sky">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-[15px] text-white/85">
            <li><Link href="/shop" className="hover:text-sky">Shop online</Link></li>
            <li><Link href="/long-term-care" className="hover:text-sky">Long-term care</Link></li>
            <li><Link href="/about" className="hover:text-sky">About us</Link></li>
            <li><Link href="/contact" className="hover:text-sky">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sky">Visit us</h3>
          <ul className="mt-4 space-y-2.5 text-[15px] text-white/85">
            <li>501 Western Ave<br />Glendale, CA 91201</li>
            <li><a href="tel:+18182425887" className="hover:text-sky">(818) 242-5887</a></li>
            <li>Mon–Fri 9 AM–6 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1180px] px-6 py-5 flex flex-col sm:flex-row gap-2 justify-between text-[13px] text-white/60">
          <span>© {new Date().getFullYear()} Western Ave Pharmacy. All rights reserved.</span>
          <span>Licensed California pharmacy · 21+ ID required for beer &amp; wine.</span>
        </div>
      </div>
    </footer>
  );
}
