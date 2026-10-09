"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/app/data/products";

const sizes = ["Small", "Medium", "Large", "Custom"] as const;

type ProductCustomizationProps = {
  product: Product;
};

export default function ProductCustomization({
  product,
}: ProductCustomizationProps) {
  const [selectedSize, setSelectedSize] = useState<string>("Medium");

  return (
    <div className="space-y-6 border-y border-black/10 py-6">
      <fieldset>
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em]">
          Size
        </legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label
              key={size}
              className="cursor-pointer"
            >
              <input
                type="radio"
                name={`size-${product.id}`}
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className="peer sr-only"
              />
              <span
                className={`inline-flex min-w-16 border px-4 py-2.5 text-xs transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-bronze ${
                  selectedSize === size
                    ? "border-brand-black bg-brand-black text-white"
                    : "border-neutral-300 hover:border-brand-black"
                }`}
              >
                {size}
              </span>
            </label>
          ))}
        </div>
        <br />
        <Link
          href="/contact"
          className="mt-5 text-link"
        >
          Learn more about our sizes  →
        </Link>
        {selectedSize === "Custom" && (
          <p className="mt-3 text-xs leading-5 text-neutral-600">
            Custom measurements require an Onravel account and your measurement
            details.
          </p>
        )}
      </fieldset>

      {product.details && product.details.length > 0 && (
        <dl className="space-y-2">
          {product.details.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 text-sm">
              <dt className="text-neutral-600">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
