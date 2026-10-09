import { ListFilter } from "lucide-react";
import SortDropdown from "@/app/components/ui/SortDropdown";

type ShopHeaderProps = {
  categoryName: string;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  sort: string;
  onSortChange: (value: string) => void;
};

export default function ShopHeader({
  categoryName,
  filtersOpen,
  onToggleFilters,
  sort,
  onSortChange,
}: ShopHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-5">
      <button
        type="button"
        aria-controls="shop-filters"
        aria-expanded={filtersOpen}
        onClick={onToggleFilters}
        className="flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-brand-black hover:text-white"
      >
        <ListFilter
          aria-hidden="true"
          size={15}
          strokeWidth={1.5}
        />
        Filters
      </button>

      <h4 className="text-xl font-normal tracking-tight md:text-4xl">
        {categoryName}
      </h4>

      <SortDropdown value={sort} onChange={onSortChange} />
    </div>
  );
}
