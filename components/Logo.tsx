/* eslint-disable @next/next/no-img-element */
// Real WesteRxn brand wordmark (vector). Cyan two-tone on light backgrounds,
// white/light on dark backgrounds. Source: Final Logo Brand Kit (outlined paths,
// no font dependency). Wordmark aspect ratio ≈ 3.08:1.

export function Logo({ className = "h-8 w-auto", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <img
      src={dark ? "/logo-reversed.svg" : "/logo-primary.svg"}
      alt="Western Ave Pharmacy"
      className={className}
      draggable={false}
    />
  );
}
