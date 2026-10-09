import { ChevronDown, ChevronUp } from "lucide-react";

const occasions = [
  "Bridal",
  "Evening Wear",
  "Graduation",
  "Party",
  "Summer",
  "Vacation",
];

type ShopOccasionsProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function ShopOccasions({
  isOpen,
  onToggle,
}: ShopOccasionsProps) {
  return (
    <section>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border-b border-black/10 pb-3 text-left text-lg"
      >
        Shop by Occasion

        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="relative mt-4 min-h-48">
          <ul className="space-y-3 blur-[1.5px]" aria-hidden="true">
            {occasions.map((occasion) => (
              <li key={occasion}>
                <label className="flex items-center gap-2.5 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    disabled
                    className="!size-3.5 accent-brand-black"
                  />

                  {occasion}
                </label>
              </li>
            ))}
          </ul>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-ivory/75 px-4 text-center">
            <span className="bg-brand-black px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              Coming soon
            </span>

            <p className="mt-2 max-w-48 text-xs leading-5 text-neutral-700">
              Occasion filters are being tailored for you.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
