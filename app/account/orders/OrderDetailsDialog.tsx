"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { shopProducts } from "@/app/data/products";
import { siteConfig } from "@/app/config/site";
import type { CustomerOrder, OrderItem } from "@/app/account/orders/order-types";
import OrderProgress from "@/app/account/orders/OrderProgress";
import OrderStatusBadge from "@/app/account/orders/OrderStatusBadge";

type OrderDetailsDialogProps = {
  order: CustomerOrder | null;
  onClose: () => void;
};

function formatDate(date: string) {
  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat("en-NG", { dateStyle: "long" }).format(
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

function getSupportHref(order: CustomerOrder) {
  const subject = `Question about order ${order.reference}`;
  const body = `Hello Onravel, I have a question about order ${order.reference}.`;

  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function OrderDetailsDialog({
  order,
  onClose,
}: OrderDetailsDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || document.activeElement === dialog)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && previousFocus !== document.body) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 p-3 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        tabIndex={-1}
        className="relative flex max-h-[min(92dvh,56rem)] w-full max-w-3xl flex-col overflow-hidden bg-brand-ivory text-brand-black shadow-2xl outline-none"
      >
        <header className="flex shrink-0 items-start justify-between gap-5 border-b border-black/10 px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="eyebrow">
              {order ? `Order ${order.reference}` : "Order details"}
            </p>
            <h2
              id="order-details-title"
              className="mt-1 font-heading text-2xl font-normal tracking-normal sm:text-3xl"
            >
              {order ? "Order details" : "Order unavailable"}
            </h2>
            {order && (
              <p className="mt-2 text-sm text-neutral-600">
                Placed {formatDate(order.placedAt)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="flex size-10 shrink-0 items-center justify-center text-neutral-700 transition-colors hover:text-brand-bronze focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bronze"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {!order ? (
            <div className="py-10 text-center">
              <p className="font-heading text-2xl">We couldn&apos;t find that order</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600">
                This order may no longer be available, or it may not belong to
                this account. No order details have been displayed.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {order.developmentPreview && (
                <p className="border border-warning/30 bg-warning-light px-3 py-2 text-xs text-warning-dark">
                  Development preview — this is not a customer order.
                </p>
              )}

              <section aria-label="Items in this order">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-normal tracking-normal">
                    Items
                  </h3>
                  <OrderStatusBadge status={order.status} />
                </div>

                <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
                  {order.items.map((item, index) => {
                    const image = getItemImage(item);

                    return (
                      <li
                        key={`${item.productId ?? item.productName}-${index}`}
                        className="flex gap-4 py-4"
                      >
                        {image ? (
                          <OptimizedImage
                            src={image}
                            alt={item.productName}
                            className="size-20 shrink-0 sm:size-24"
                            sizes="96px"
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="size-20 shrink-0 bg-sand sm:size-24"
                          />
                        )}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="font-medium">{item.productName}</p>
                          <p className="mt-1 text-sm text-neutral-600">
                            {[
                              item.size && `Size: ${item.size}`,
                              item.color && `Colour: ${item.color}`,
                            ]
                              .filter(Boolean)
                              .join(" · ") || "Details not available"}
                          </p>
                          <p className="mt-1 text-sm text-neutral-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        {(item.unitPrice !== undefined ||
                          item.lineTotal !== undefined) && (
                          <div className="flex shrink-0 flex-col items-end justify-center gap-1 text-sm">
                            {item.unitPrice !== undefined && (
                              <span className="text-neutral-600">
                                {formatMoney(item.unitPrice)} each
                              </span>
                            )}
                            {item.lineTotal !== undefined && (
                              <span className="font-medium">
                                {formatMoney(item.lineTotal)}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section aria-labelledby="order-progress-title">
                <h3
                  id="order-progress-title"
                  className="font-heading text-xl font-normal tracking-normal"
                >
                  Order progress
                </h3>
                <OrderProgress order={order} />
              </section>

              <section
                aria-labelledby="payment-summary-title"
                className="border-t border-black/10 pt-6"
              >
                <h3
                  id="payment-summary-title"
                  className="font-heading text-xl font-normal tracking-normal"
                >
                  Payment summary
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {order.subtotal !== undefined && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-600">Subtotal</dt>
                      <dd>{formatMoney(order.subtotal)}</dd>
                    </div>
                  )}
                  {order.deliveryFee !== undefined && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-600">Delivery fee</dt>
                      <dd>{formatMoney(order.deliveryFee)}</dd>
                    </div>
                  )}
                  {order.discount !== undefined && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-600">Discount</dt>
                      <dd>−{formatMoney(order.discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 border-t border-black/10 pt-3 text-base font-medium">
                    <dt>Total</dt>
                    <dd>{formatMoney(order.total)}</dd>
                  </div>
                  {order.payment?.status && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-600">Payment status</dt>
                      <dd>{order.payment.status}</dd>
                    </div>
                  )}
                  {order.payment?.method && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-600">Payment method</dt>
                      <dd>{order.payment.method}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {(order.fulfilment ||
                order.trackingReference ||
                order.estimatedDelivery) && (
                <section
                  aria-labelledby="fulfilment-details-title"
                  className="border-t border-black/10 pt-6"
                >
                  <h3
                    id="fulfilment-details-title"
                    className="font-heading text-xl font-normal tracking-normal"
                  >
                    Fulfilment details
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    {order.fulfilment?.method && (
                      <div>
                        <dt className="text-neutral-600">Method</dt>
                        <dd className="mt-1">{order.fulfilment.method}</dd>
                      </div>
                    )}
                    {order.fulfilment?.address && (
                      <div>
                        <dt className="text-neutral-600">Delivery address</dt>
                        <dd className="mt-1">{order.fulfilment.address}</dd>
                      </div>
                    )}
                    {order.fulfilment?.pickupLocation && (
                      <div>
                        <dt className="text-neutral-600">Pickup location</dt>
                        <dd className="mt-1">
                          {order.fulfilment.pickupLocation}
                        </dd>
                      </div>
                    )}
                    {order.trackingReference && (
                      <div>
                        <dt className="text-neutral-600">Tracking reference</dt>
                        <dd className="mt-1">{order.trackingReference}</dd>
                      </div>
                    )}
                    {order.estimatedDelivery && (
                      <div>
                        <dt className="text-neutral-600">
                          Estimated delivery
                        </dt>
                        <dd className="mt-1">
                          {formatDate(order.estimatedDelivery)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              <div className="border-t border-black/10 pt-5">
                {order.receiptUrl && (
                  <a
                    href={order.receiptUrl}
                    className="text-sm font-medium text-brand-bronze-dark underline underline-offset-4"
                  >
                    View receipt
                  </a>
                )}
                <a
                  href={getSupportHref(order)}
                  className="ml-5 text-sm font-medium text-brand-bronze-dark underline underline-offset-4"
                >
                  Contact us about this order
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
