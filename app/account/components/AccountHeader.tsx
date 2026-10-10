import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/onravel-logo.png";
import { siteConfig } from "@/app/config/site";

export default function AccountHeader() {
  return (
    <header className="border-b border-black/10 bg-brand-ivory">
      <div className="container flex min-h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={`${siteConfig.brand.name} home`}
          className="inline-flex items-center gap-2 text-brand-black transition-colors hover:text-brand-bronze focus-visible:text-brand-bronze"
        >
          <Image
            src={logo}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="font-heading text-xl font-bold uppercase leading-none">
            {siteConfig.brand.name}
          </span>
        </Link>

        <span className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
          My account
        </span>
      </div>
    </header>
  );
}
