import type { ReactNode } from "react";
import AccountContent from "@/app/account/components/AccountContent";
import AccountHeader from "@/app/account/components/AccountHeader";
import AccountNavigation from "@/app/account/components/AccountNavigation";
import ProfileHero from "@/app/account/components/ProfileHero";

type AccountLayoutProps = {
  children: ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-brand-ivory">
      <AccountHeader />
      <ProfileHero />
      <AccountNavigation />
      <AccountContent>{children}</AccountContent>
    </div>
  );
}
