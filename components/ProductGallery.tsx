"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = { url: string; altText: string | null };

export function ProductGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-mist bg-cloud text-6xl">
        💊
      </div>
    );
  }

  const img = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-mist bg-cloud">
        <Image
          key={img.url}
          src={img.url}
          alt={img.altText ?? title}
          width={900}
          height={900}
          className="aspect-square h-auto w-full object-contain p-4"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((im, i) => (
            <button
              key={im.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white transition-colors " +
                (i === active
                  ? "border-cyan ring-2 ring-cyan/30"
                  : "border-mist hover:border-cyan/60")
              }
            >
              <Image
                src={im.url}
                alt={im.altText ?? `${title} — image ${i + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
