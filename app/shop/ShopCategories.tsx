import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { shopCategories } from "@/app/data/products";

type ShopCategoriesProps = {
  categorySlug?: string;
  isOpen: boolean;
  onToggle: () => void;
  onCategorySelect: () => void;
};

export default function ShopCategories({
  categorySlug,
  isOpen,
  onToggle,
  onCategorySelect,
}: ShopCategoriesProps) {
  return (
    <section>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border-b border-black/10 pb-3 text-left text-lg"
      >
        Shop

        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <nav aria-label="Shop categories" className="mt-5">
          <Link
            href="/shop"
            aria-current={!categorySlug ? "page" : undefined}
            onClick={onCategorySelect}
            className={`flex items-center gap-3 py-3.5 text-sm transition-colors hover:text-brand-bronze lg:py-3 ${
              !categorySlug
                ? "font-medium text-brand-black"
                : "text-neutral-700"
            }`}
          >
            <span
              className={`size-2 shrink-0 rounded-full bg-brand-bronze transition-opacity ${
                !categorySlug ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />

            <span>All products</span>
          </Link>

          {shopCategories.map((item) => {
            const isActive = categorySlug === item.slug;

            return (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                aria-current={isActive ? "page" : undefined}
                onClick={onCategorySelect}
                className={`flex items-center gap-3 py-3.5 text-sm transition-colors hover:text-brand-bronze lg:py-3 ${
                  isActive
                    ? "font-medium text-brand-black"
                    : "text-neutral-700"
                }`}
              >
                <span
                  className={`size-2 shrink-0 rounded-full bg-brand-bronze transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </section>
  );
}
