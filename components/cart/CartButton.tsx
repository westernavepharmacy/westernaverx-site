"use client";

import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-cloud"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.47 1.2h8.56a1.5 1.5 0 0 0 1.47-1.18L21 8H6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan px-1 text-[11px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
