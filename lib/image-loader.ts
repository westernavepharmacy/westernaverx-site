// Custom next/image loader: let Shopify's CDN do the resizing instead of
// Vercel Image Optimization (the free tier caps at 5,000 transformations/mo).
// Shopify serves WebP/AVIF automatically based on the browser's Accept header.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.includes("cdn.shopify.com")) {
    const url = new URL(src);
    url.searchParams.set("width", String(width));
    if (quality) url.searchParams.set("quality", String(quality));
    return url.toString();
  }
  // Local /public assets are already web-optimized; serve as-is.
  return src;
}
