"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/app/components/ui/product/ProductCard";
import type { Product } from "@/app/data/products";

type ProductCarouselProps = {
  title: string;
  products: Product[];
  viewMoreHref?: string;
  compact?: boolean;
  showViewMore?: boolean;
};

export default function ProductCarousel({
  title,
  products,
  viewMoreHref = "/shop",
  compact = false,
  showViewMore = true,
}: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.8;

    carouselRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section>
      {/* Header */}
      <div
        className={`flex items-center justify-between gap-6 ${
          compact ? "mb-4" : "mb-6"
        }`}
      >
        <h2
          className={
            compact
              ? "text-[clamp(1.25rem,2.5vw,2rem)] font-normal tracking-tight"
              : "text-[clamp(1.5rem,3vw,2.5rem)] font-normal tracking-tight"
          }
        >
          {title}
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={`Previous ${title}`}
            className="flex size-10 items-center justify-center border border-black/10 transition-colors hover:bg-black hover:text-white"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={`Next ${title}`}
            className="flex size-10 items-center justify-center border border-black/10 transition-colors hover:bg-black hover:text-white"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Products */}
      <div
        ref={carouselRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          compact ? "gap-3 sm:gap-4" : "gap-4 sm:gap-5 lg:gap-6"
        }`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={
              compact
                ? "w-[42%] shrink-0 snap-start sm:w-[28%] lg:w-[23%]"
                : "w-[calc((100%-1rem)/2)] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
            }
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {showViewMore && (
        <div className="mt-4 flex justify-end">
          <Link href={viewMoreHref} className="btn btn-primary group">
            See more
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
