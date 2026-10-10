import { Ruler } from "lucide-react";
import AccountEmptyState from "@/app/account/components/AccountEmptyState";

export default function MeasurementsPage() {
  return (
    <section aria-labelledby="measurements-heading">
      <p className="eyebrow">Made to fit</p>
      <h1
        id="measurements-heading"
        className="mt-2 font-heading text-3xl font-normal tracking-normal sm:text-4xl"
      >
        My Measurements
      </h1>
      <AccountEmptyState
        icon={Ruler}
        title="No saved measurements"
        description="Saved sizing details will appear here when they are available."
      />
    </section>
  );
}
