"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/app/components/ui/product/ProductCard";

type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug: string;
};

type ProductCarouselProps = {
  title: string;
  products: Product[];
};

export default function ProductCarousel({
  title,
  products,
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
      <div className="mb-6 flex items-center justify-between gap-6">
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-normal tracking-tight">
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
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc((100%-1rem)/2)] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
              slug={product.slug}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

