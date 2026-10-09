import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { getProductHref, shopProducts } from "@/app/data/products";

type ShopBestsellersProps = {
  isOpen: boolean;
  onToggle: () => void;
  onProductSelect: () => void;
};

export default function ShopBestsellers({
  isOpen,
  onToggle,
  onProductSelect,
}: ShopBestsellersProps) {
  return (
    <section>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border-b border-black/10 pb-3 text-left text-lg"
      >
        Bestsellers

        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {shopProducts.slice(0, 2).map((product) => (
            <Link
              key={product.id}
              href={getProductHref(product)}
              onClick={onProductSelect}
              className="flex items-start gap-3"
            >
              <div className="w-16 shrink-0">
                <OptimizedImage
                  src={product.image}
                  alt=""
                  className="aspect-[4/5]"
                  sizes="64px"
                />
              </div>

              <span className="min-w-0">
                <span className="block text-xs uppercase leading-5">
                  {product.name}
                </span>

                <span className="mt-1 block text-xs text-neutral-600">
                  ₦
                  {product.price.toLocaleString("en-NG")}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
