"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  productColors,
  type ProductColor,
} from "@/app/data/productColors";

type ProductColorsProps = {
  onColorChange?: (color: ProductColor) => void;
};

export default function ProductColors({
  onColorChange,
}: ProductColorsProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    productColors[0],
  );

  const selectColor = (color: ProductColor) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  return (
    <section aria-labelledby="product-colour-heading">
      <h4
        id="product-colour-heading"
        className="mb-3 text-xs font-medium uppercase tracking-[0.14em]"
      >
        Choose your colour
      </h4>

      <div className="flex flex-wrap gap-3">
        {productColors.map((color) => {
          const isSelected = selectedColor.name === color.name;

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => selectColor(color)}
              aria-label={`Select ${color.name}`}
              aria-pressed={isSelected}
              title={color.name}
              className={`flex size-10 items-center justify-center border transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bronze ${
                isSelected
                  ? "border-brand-black ring-1 ring-brand-black ring-offset-2"
                  : "border-black/20 hover:border-brand-black"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <span className="flex size-5 items-center justify-center bg-brand-black text-white">
                  <Check aria-hidden="true" size={13} strokeWidth={2.5} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-[50px] shrink-0 border border-black/20"
          style={{ backgroundColor: selectedColor.hex }}
        />
        <div className="text-xs leading-5">
          <p className="font-medium">{selectedColor.name}</p>
          <p className="text-neutral-600">{selectedColor.hex}</p>
        </div>
      </div>

      <p aria-live="polite" className="mt-3 text-sm text-neutral-700">
        I want this colour: {selectedColor.name}
      </p>
    </section>
  );
}
