"use client";

import { useCart } from "./CartProvider";

// Full-size add-to-cart for the product page.
export function AddToCartButton({
  variantGid,
  available,
}: {
  variantGid: string | null;
  available: boolean;
}) {
  const { addItem, pending } = useCart();
  const disabled = !variantGid || !available || pending;

  return (
    <button
      onClick={() => variantGid && addItem(variantGid)}
      disabled={disabled}
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan px-8 py-4 font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:bg-slate/50 sm:w-auto"
    >
      {!available ? "Out of stock" : pending ? "Adding…" : "Add to cart"}
    </button>
  );
}

// Compact add button for product cards in the grid.
export function CardAddButton({
  variantGid,
  available,
}: {
  variantGid: string | null;
  available: boolean;
}) {
  const { addItem, pending } = useCart();
  if (!variantGid || !available) return null;

  return (
    <button
      aria-label="Add to cart"
      disabled={pending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(variantGid);
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan text-white shadow-sm transition-colors hover:bg-navy disabled:opacity-50"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </button>
  );
}
