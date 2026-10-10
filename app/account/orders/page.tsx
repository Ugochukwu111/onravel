import { Suspense } from "react";
import OrdersExperience from "@/app/account/orders/OrdersExperience";

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <p className="py-10 text-center text-sm text-neutral-600">
          Loading your orders…
        </p>
      }
    >
      <OrdersExperience />
    </Suspense>
  );
}
