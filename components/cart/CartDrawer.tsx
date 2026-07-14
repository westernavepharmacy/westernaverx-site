"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { money } from "@/lib/shopify";

const FREE_DELIVERY_THRESHOLD = 35;

export function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, pending, setQuantity, confirmAge } = useCart();

  if (!drawerOpen) return null;

  const subtotal = cart ? parseFloat(cart.subtotal.amount) : 0;
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const needsAgeGate = !!cart?.hasAlcohol && !cart?.attested;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Overlay */}
      <button
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/40 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-mist px-5 py-4">
          <h2 className="text-lg font-bold text-navy">
            Your cart {cart && cart.totalQuantity > 0 ? `(${cart.totalQuantity})` : ""}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-cloud"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {!cart || cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="text-4xl">🛒</span>
            <p className="text-slate">Your cart is empty.</p>
            <button
              onClick={closeDrawer}
              className="rounded-full bg-cyan px-6 py-2.5 font-semibold text-white hover:bg-navy"
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free delivery nudge */}
            <div className="border-b border-mist bg-cloud px-5 py-2.5 text-center text-[13px] font-medium text-navy">
              {toFreeDelivery > 0 ? (
                <>Add <strong>${toFreeDelivery.toFixed(2)}</strong> more for free local delivery 🚚</>
              ) : (
                <>🎉 You&apos;ve unlocked <strong>free local delivery</strong></>
              )}
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.lines.map((line) => (
                <div key={line.id} className="flex gap-3 border-b border-mist py-4 last:border-0">
                  <Link
                    href={`/products/${line.handle}`}
                    onClick={closeDrawer}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-mist bg-cloud"
                  >
                    {line.image ? (
                      <Image
                        src={line.image.url}
                        alt={line.image.altText ?? line.title}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xl">💊</span>
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.handle}`}
                        onClick={closeDrawer}
                        className="line-clamp-2 text-[13.5px] leading-snug text-ink hover:text-cyan"
                      >
                        {line.title}
                        {line.alcohol && (
                          <span className="ml-1.5 rounded bg-[#7a1b3d]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#7a1b3d]">
                            21+
                          </span>
                        )}
                      </Link>
                      <span className="whitespace-nowrap text-sm font-bold text-navy">
                        {money(line.lineTotal)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-mist">
                        <button
                          aria-label="Decrease quantity"
                          disabled={pending}
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          className="h-7 w-7 text-navy hover:text-cyan disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-ink">
                          {line.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          disabled={pending}
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          className="h-7 w-7 text-navy hover:text-cyan disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <button
                        disabled={pending}
                        onClick={() => setQuantity(line.id, 0)}
                        className="text-xs text-slate underline-offset-2 hover:text-cyan hover:underline disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-mist px-5 py-4">
              {cart.hasAlcohol && (
                <label className="mb-3 flex cursor-pointer items-start gap-2.5 rounded-xl border border-[#7a1b3d]/25 bg-[#7a1b3d]/5 p-3 text-[13px] leading-snug text-ink">
                  <input
                    type="checkbox"
                    checked={cart.attested}
                    disabled={cart.attested || pending}
                    onChange={() => confirmAge()}
                    className="mt-0.5 h-4 w-4 accent-[#7a1b3d]"
                  />
                  <span>
                    I confirm I am <strong>21 or older</strong>. Valid ID is required at delivery or
                    pickup for beer &amp; wine.
                  </span>
                </label>
              )}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate">Subtotal</span>
                <span className="text-lg font-bold text-navy">{money(cart.subtotal)}</span>
              </div>
              <a
                href={needsAgeGate ? undefined : cart.checkoutUrl}
                aria-disabled={needsAgeGate}
                className={
                  "flex w-full items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white transition-colors " +
                  (needsAgeGate
                    ? "pointer-events-none cursor-not-allowed bg-slate/50"
                    : "bg-cyan hover:bg-navy")
                }
              >
                {needsAgeGate ? "Confirm 21+ to check out" : "Check out"}
              </a>
              <p className="mt-2.5 text-center text-xs text-slate">
                Taxes &amp; delivery calculated at checkout · Secured by Shopify
              </p>
              <p className="mt-1.5 text-center text-xs font-medium text-slate">
                🚚 Delivery available within ~20 miles of Glendale, CA — or free
                in-store pickup. We don&apos;t ship nationwide yet.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
