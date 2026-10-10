import { orderStatuses, type OrderStatus } from "@/app/account/orders/order-types";

type OrderStatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

export function getOrderStatusLabel(status: OrderStatus) {
  return orderStatuses.find((item) => item.value === status)?.label ?? status;
}

export default function OrderStatusBadge({
  status,
  className = "",
}: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center border border-brand-bronze/35 bg-brand-bronze/10 px-2.5 py-1 text-[0.7rem] font-medium leading-4 text-brand-bronze-dark ${className}`}
    >
      {getOrderStatusLabel(status)}
    </span>
  );
}
