import type { LucideIcon } from "lucide-react";

type AccountEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function AccountEmptyState({
  icon: Icon,
  title,
  description,
}: AccountEmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
      <Icon
        aria-hidden="true"
        className="mb-5 size-8 text-brand-bronze"
        strokeWidth={1.25}
      />
      <h2 className="font-heading text-2xl font-normal tracking-normal">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
    </div>
  );
}
