"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { shopProducts } from "@/app/data/products";
import OrderDetailsDialog from "@/app/account/orders/OrderDetailsDialog";
import { customerOrders } from "@/app/account/orders/order-data";
import {
  orderStatuses,
  type CustomerOrder,
  type OrderItem,
  type OrderStatus,
} from "@/app/account/orders/order-types";
import OrderStatusBadge, {
  getOrderStatusLabel,
} from "@/app/account/orders/OrderStatusBadge";
import { PackageOpen } from "lucide-react";

type StatusFilter = "all" | OrderStatus;

function formatDate(date: string) {
  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(
        parsedDate,
      );
}

function formatMoney(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getItemImage(item: OrderItem) {
  return (
    item.productImage ??
    shopProducts.find((product) => product.id === item.productId)?.image
  );
}

function OrderCard({
  order,
  onViewOrder,
}: {
  order: CustomerOrder;
  onViewOrder: (orderId: string) => void;
}) {
  const firstItem = order.items[0];
  const image = firstItem ? getItemImage(firstItem) : undefined;
  const itemCount = order.items.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  return (
    <article className="border border-black/10 bg-brand-white p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-600">
            Order
          </p>
          <p className="mt-1 text-sm font-medium">{order.reference}</p>
          <p className="mt-1 text-xs text-neutral-600">
            Placed {formatDate(order.placedAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {order.developmentPreview && (
            <span className="border border-warning/30 bg-warning-light px-2.5 py-1 text-[0.7rem] font-medium text-warning-dark">
              Development preview
            </span>
          )}
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
        {firstItem && (
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {image ? (
              <OptimizedImage
                src={image}
                alt={firstItem.productName}
                className="size-20 shrink-0 sm:size-24"
                sizes="96px"
              />
            ) : (
              <div
                aria-hidden="true"
                className="size-20 shrink-0 bg-sand sm:size-24"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-medium">{firstItem.productName}</p>
              <p className="mt-1 text-sm text-neutral-600">
                {[
                  firstItem.size && `Size: ${firstItem.size}`,
                  firstItem.color && `Colour: ${firstItem.color}`,
                ]
                  .filter(Boolean)
                  .join(" · ") || `${itemCount} item${itemCount === 1 ? "" : "s"}`}
              </p>
              {order.items.length > 1 && (
                <p className="mt-1 text-xs text-neutral-500">
                  +{order.items.length - 1} more{" "}
                  {order.items.length === 2 ? "item" : "items"}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div className="text-sm">
            <p className="text-xs text-neutral-600">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </p>
            <p className="mt-1 font-medium">{formatMoney(order.total)}</p>
          </div>
          <button
            type="button"
            onClick={() => onViewOrder(order.id)}
            className="inline-flex min-h-10 items-center justify-center border border-brand-black px-4 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-brand-black hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bronze"
          >
            View order
          </button>
        </div>
      </div>
    </article>
  );
}

export default function OrdersExperience() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedOrderId = searchParams.get("order");
  const selectedOrder =
    requestedOrderId === null
      ? null
      : customerOrders.find((order) => order.id === requestedOrderId) ?? null;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visibleOrders =
    statusFilter === "all"
      ? customerOrders
      : customerOrders.filter((order) => order.status === statusFilter);

  const updateOrderParam = (orderId?: string) => {
    const url = new URL(window.location.href);

    if (orderId) {
      url.searchParams.set("order", orderId);
    } else {
      url.searchParams.delete("order");
    }

    router.push(`${pathname}${url.search}${url.hash}`, { scroll: false });
  };

  return (
    <section aria-labelledby="orders-heading">
      <p className="eyebrow">Your purchases</p>
      <h1
        id="orders-heading"
        className="mt-2 font-heading text-3xl font-normal tracking-normal sm:text-4xl"
      >
        My Orders
      </h1>
      <p className="mt-3 text-sm text-neutral-600">
        View your purchases and track their progress.
      </p>

      <div className="account-nav-scroll mt-7 overflow-x-auto border-b border-black/10">
        <div className="flex w-max min-w-full gap-1">
          <button
            type="button"
            aria-pressed={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            className={`min-h-11 shrink-0 border-b-2 px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-bronze sm:px-4 ${
              statusFilter === "all"
                ? "border-brand-bronze font-medium text-brand-black"
                : "border-transparent text-neutral-600 hover:text-brand-black"
            }`}
          >
            All orders
          </button>
          {orderStatuses.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={statusFilter === value}
              onClick={() => setStatusFilter(value)}
              className={`min-h-11 shrink-0 border-b-2 px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-bronze sm:px-4 ${
                statusFilter === value
                  ? "border-brand-bronze font-medium text-brand-black"
                  : "border-transparent text-neutral-600 hover:text-brand-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visibleOrders.length > 0 ? (
        <div className="mt-6 space-y-4">
          {visibleOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewOrder={updateOrderParam}
            />
          ))}
        </div>
      ) : customerOrders.length === 0 && statusFilter === "all" ? (
        <div className="flex min-h-64 flex-col items-center justify-center py-12 text-center">
          <PackageOpen
            aria-hidden="true"
            className="mb-5 size-8 text-brand-bronze"
            strokeWidth={1.25}
          />
          <h2 className="font-heading text-2xl font-normal tracking-normal">
            No orders yet
          </h2>
          <p className="mt-2 max-w-md text-sm text-neutral-600">
            Explore the collection and your purchases will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-flex min-h-11 items-center justify-center border border-brand-black px-5 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-brand-black hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bronze"
          >
            Explore the shop
          </Link>
        </div>
      ) : (
        <p className="mt-8 py-10 text-center text-sm text-neutral-600">
          No orders with status &ldquo;
          {statusFilter === "all"
            ? "all orders"
            : getOrderStatusLabel(statusFilter)}
          &rdquo;.
        </p>
      )}

      {requestedOrderId !== null && (
        <OrderDetailsDialog
          order={selectedOrder}
          onClose={() => updateOrderParam()}
        />
      )}
    </section>
  );
}
