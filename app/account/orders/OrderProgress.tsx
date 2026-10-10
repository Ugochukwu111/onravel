import {
  orderStatuses,
  type CustomerOrder,
  type OrderStatus,
} from "@/app/account/orders/order-types";

type OrderProgressProps = {
  order: CustomerOrder;
};

function formatEventDate(date: string) {
  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(
        parsedDate,
      );
}

export default function OrderProgress({ order }: OrderProgressProps) {
  const currentIndex = orderStatuses.findIndex(
    ({ value }) => value === order.status,
  );

  return (
    <ol className="mt-5 space-y-4">
      {orderStatuses.map(({ value, label }, index) => {
        const event = order.statusHistory?.find(
          (item) => item.status === value,
        );
        const isSkipped = order.skippedStatuses?.includes(
          value as OrderStatus,
        );
        const isComplete = !isSkipped && index < currentIndex;
        const isCurrent = !isSkipped && index === currentIndex;

        return (
          <li
            key={value}
            className="flex items-start gap-3"
            aria-current={isCurrent ? "step" : undefined}
          >
            <span
              aria-hidden="true"
              className={`mt-1.5 size-2.5 shrink-0 rounded-full border ${
                isSkipped
                  ? "border-neutral-300 bg-transparent"
                  : isComplete
                    ? "border-brand-bronze bg-brand-bronze"
                    : isCurrent
                      ? "border-brand-bronze bg-brand-ivory ring-2 ring-brand-bronze/20"
                      : "border-neutral-300 bg-brand-ivory"
              }`}
            />
            <div className="min-w-0">
              <p
                className={`text-sm ${
                  isCurrent || isComplete
                    ? "font-medium text-brand-black"
                    : "text-neutral-500"
                }`}
              >
                {label}
                {isCurrent && (
                  <span className="sr-only"> (current status)</span>
                )}
                {isSkipped && (
                  <span className="ml-2 text-xs font-normal text-neutral-500">
                    Not required
                  </span>
                )}
              </p>
              {event && (
                <p className="mt-1 text-xs text-neutral-500">
                  {formatEventDate(event.occurredAt)}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
