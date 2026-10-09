export type SortOption = {
  label: string;
  value: string;
};

export const productSortOptions: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Most relevant", value: "relevant" },
  { label: "Best selling", value: "best-selling" },
  { label: "Alphabetically, A–Z", value: "name-ascending" },
  { label: "Alphabetically, Z–A", value: "name-descending" },
  { label: "Price, low to high", value: "price-ascending" },
  { label: "Price, high to low", value: "price-descending" },
  { label: "Date, old to new", value: "date-ascending" },
  { label: "Date, new to old", value: "date-descending" },
];

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options?: readonly SortOption[];
  label?: string;
};

export default function SortDropdown({
  value,
  onChange,
  options = productSortOptions,
  label = "Sort by",
}: SortDropdownProps) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="!w-auto min-w-40 appearance-none border border-neutral-300 bg-transparent py-2.5 pl-4 pr-10 text-sm text-brand-black focus:border-brand-black focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute right-3 size-4"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </label>
  );
}
