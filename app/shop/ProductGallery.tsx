"use client";

import { useState } from "react";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import type { Product } from "@/app/data/products";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images?.length ? product.images : [product.image];
  const media = [
    ...(product.video
      ? [
          {
            type: "video" as const,
            src: product.video.src,
            poster: product.video.poster ?? images[0],
          },
        ]
      : []),
    ...images.map((src) => ({ type: "image" as const, src })),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        {activeMedia.type === "video" ? (
          <video
            key={activeMedia.src}
            controls
            playsInline
            poster={activeMedia.poster}
            className="absolute inset-0 size-full object-cover"
          >
            <source src={activeMedia.src} type="video/mp4" />
          </video>
        ) : (
          <OptimizedImage
            src={activeMedia.src}
            alt={`${product.name} — Onravel`}
            className="absolute inset-0 size-full"
            sizes="(max-width: 1023px) 100vw, 55vw"
          />
        )}
      </div>

      {media.length > 1 && (
        <div
          role="group"
          aria-label="Product media"
          className="mt-3 flex gap-3 overflow-x-auto"
        >
          {media.map((item, index) => (
            <button
              key={`${item.type}-${item.src}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={
                item.type === "video"
                  ? "View product video"
                  : `View product image ${index + 1 - Number(Boolean(product.video))}`
              }
              aria-pressed={activeIndex === index}
              className={`relative w-16 shrink-0 overflow-hidden border sm:w-20 ${
                activeIndex === index
                  ? "border-brand-black"
                  : "border-transparent"
              }`}
            >
              <OptimizedImage
                src={item.type === "video" ? item.poster : item.src}
                alt=""
                className="aspect-square"
                sizes="80px"
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-[10px] font-medium uppercase tracking-wider text-white">
                  Video
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
