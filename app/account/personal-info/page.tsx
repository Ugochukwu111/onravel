import { UserRound } from "lucide-react";
import AccountEmptyState from "@/app/account/components/AccountEmptyState";

export default function PersonalInfoPage() {
  return (
    <section aria-labelledby="personal-info-heading">
      <p className="eyebrow">Your account</p>
      <h1
        id="personal-info-heading"
        className="mt-2 font-heading text-3xl font-normal tracking-normal sm:text-4xl"
      >
        Personal Info
      </h1>
      <AccountEmptyState
        icon={UserRound}
        title="Your details will appear here"
        description="There is no profile information available for this account yet."
      />
    </section>
  );
}
