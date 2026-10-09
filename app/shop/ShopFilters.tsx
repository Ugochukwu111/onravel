import { ChevronDown, ChevronUp, X } from "lucide-react";
import { siteConfig } from "@/app/config/site";
import ShopBestsellers from "@/app/shop/ShopBestsellers";
import ShopCategories from "@/app/shop/ShopCategories";
import ShopOccasions from "@/app/shop/ShopOccasions";

type ShopFiltersProps = {
  categorySlug?: string;
  filtersOpen: boolean;
  categoriesOpen: boolean;
  occasionsOpen: boolean;
  bestsellersOpen: boolean;
  onCloseFilters: () => void;
  onClearFilters: () => void;
  onToggleCategories: () => void;
  onToggleOccasions: () => void;
  onToggleBestsellers: () => void;
};

export default function ShopFilters({
  categorySlug,
  filtersOpen,
  categoriesOpen,
  occasionsOpen,
  bestsellersOpen,
  onCloseFilters,
  onClearFilters,
  onToggleCategories,
  onToggleOccasions,
  onToggleBestsellers,
}: ShopFiltersProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 lg:hidden
          transition-opacity duration-500 ease-out
          ${
            filtersOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onCloseFilters}
        aria-hidden="true"
      />

      {/* Filters */}
      <aside
        id="shop-filters"
        aria-label="Shop filters"
        aria-hidden={!filtersOpen}
        className={`
          fixed inset-x-0 bottom-0 z-50
          max-h-[80vh] overflow-y-auto
          bg-brand-ivory px-5 pb-8 pt-6
          shadow-2xl

          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            filtersOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-full opacity-0"
          }

          lg:static
          lg:z-auto
          lg:max-h-none
          lg:overflow-visible
          lg:bg-transparent
          lg:p-0
          lg:shadow-none

          lg:transition-all
          lg:duration-500

          ${
            filtersOpen
              ? "lg:translate-x-0 lg:opacity-100"
              : "lg:-translate-x-4 lg:opacity-0"
          }
        `}
      >
        {/* Mobile drag handle */}
        <div className="mx-auto mb-5 h-1 w-10 bg-black/20 lg:hidden" />

        {/* Mobile filter header */}
        <div className="mb-7 flex items-center justify-between lg:hidden">
          <h3 className="text-lg font-normal tracking-tight">Filters</h3>

          <button
            type="button"
            onClick={onCloseFilters}
            aria-label="Close filters"
            className="flex size-9 items-center justify-center border border-black/10 transition-colors hover:bg-brand-black hover:text-white"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-8">
          <ShopCategories
            categorySlug={categorySlug}
            isOpen={categoriesOpen}
            onToggle={onToggleCategories}
            onCategorySelect={onCloseFilters}
          />

          <ShopOccasions
            isOpen={occasionsOpen}
            onToggle={onToggleOccasions}
          />

          <ShopBestsellers
            isOpen={bestsellersOpen}
            onToggle={onToggleBestsellers}
            onProductSelect={onCloseFilters}
          />
        </div>

        {/* Mobile clear filters */}
        <div className="mt-10 border-t border-black/10 pt-6 lg:hidden">
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full border border-brand-black px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:bg-brand-black hover:text-white"
          >
            Clear filters
          </button>
        </div>

        {/* Brand */}
        <div className="mt-10 border-t border-black/10 pt-6 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-black/40">
            {siteConfig.name}
          </span>
        </div>
      </aside>
    </>
  );
}
