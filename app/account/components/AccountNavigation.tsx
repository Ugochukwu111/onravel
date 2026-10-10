"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNavigation } from "@/app/account/components/account-navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account sections"
      className="border-y border-black/10 bg-brand-ivory"
    >
      <div className="container">
        <ul className="account-nav-scroll flex min-w-full w-max overflow-x-auto">
          {accountNavigation.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-14 items-center border-b-2 px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-bronze sm:px-6 ${
                    isActive
                      ? "border-brand-bronze font-medium text-brand-black"
                      : "border-transparent text-neutral-600 hover:text-brand-black"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
