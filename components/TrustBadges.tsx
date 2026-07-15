const TRUST_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l7 3v5c0 4.6-3 8.6-7 10-4-1.4-7-5.4-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: "Licensed CA Pharmacy",
    sub: "Real pharmacists in Glendale",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
    label: "Secure Checkout",
    sub: "SSL encrypted · powered by Shopify",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    ),
    label: "14-Day Returns",
    sub: "Sealed &amp; unopened items".replace("&amp;", "&"),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </svg>
    ),
    label: "Same-Day Local Delivery",
    sub: "Order by 6 PM · free over $35",
  },
];

const PAYMENT_METHODS = [
  { name: "Visa", style: "text-[#1A1F71] font-extrabold italic tracking-tight" },
  { name: "Mastercard", style: "text-[#EB001B] font-bold" },
  { name: "Amex", style: "text-[#016FD0] font-extrabold" },
  { name: "Discover", style: "text-[#E55C20] font-bold" },
  { name: " Pay", style: "text-ink font-semibold", apple: true },
  { name: "G Pay", style: "text-[#5F6368] font-semibold" },
  { name: "Shop Pay", style: "text-[#5A31F4] font-bold" },
];

export function TrustBadges() {
  return (
    <div className="mt-6 rounded-2xl border border-mist bg-white p-4">
      <div className="grid grid-cols-2 gap-3">
        {TRUST_ITEMS.map((t) => (
          <div key={t.label} className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-cyan">{t.icon}</span>
            <span>
              <span className="block text-[13px] font-semibold leading-tight text-navy">{t.label}</span>
              <span className="block text-[11.5px] leading-tight text-slate">{t.sub}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-mist pt-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-slate">We accept</span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m.name}
              className={`inline-flex h-7 items-center rounded-md border border-mist bg-white px-2 text-[12px] leading-none ${m.style}`}
              aria-label={m.apple ? "Apple Pay" : m.name}
            >
              {m.apple ? " Pay" : m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
