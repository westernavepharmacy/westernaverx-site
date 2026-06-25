"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Long-Term Care", href: "/long-term-care" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-mist">
      <div className="mx-auto max-w-[1180px] px-6 h-16 flex items-center justify-between">
        <Link href="/home" aria-label="Western Ave Pharmacy home" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink/80 hover:text-cyan transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="rounded-full bg-cyan px-5 py-2 text-[15px] font-semibold text-white hover:bg-navy transition-colors"
          >
            Order online
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-navy"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-mist bg-white px-6 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium text-ink/90 hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-cyan px-5 py-2.5 text-center text-[15px] font-semibold text-white"
          >
            Order online
          </Link>
        </nav>
      )}
    </header>
  );
}
