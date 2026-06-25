import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/shopify";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block rounded-2xl border border-mist bg-white p-3 transition-shadow hover:shadow-[0_12px_28px_rgba(10,42,107,0.10)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-cloud">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate/60">
            No image
          </div>
        )}
      </div>
      <h3 className="mt-3 line-clamp-2 px-1 text-[14px] leading-snug text-ink">{product.title}</h3>
      <div className="mt-1 flex items-center justify-between px-1">
        <span className="font-bold text-navy">{money(product.price)}</span>
        {!product.available && <span className="text-xs text-slate/70">Out of stock</span>}
      </div>
    </Link>
  );
}
