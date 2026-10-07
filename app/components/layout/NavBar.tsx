"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  ShoppingBag,
  UserRound,
  Package,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/public/images/onravel-logo.png";
import { siteConfig } from "@/app/config/site";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileAccountLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: Package,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full top-0 z-50 border-b border-neutral-200 bg-brand-ivory/95 backdrop-blur-md">
      <div className="container">
        <nav
          aria-label="Main navigation"
          className="relative flex h-16 items-center justify-between md:min-h-20"
        >
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="
              flex
              size-10
              items-center
              justify-center
              text-brand-black
              transition-colors
              duration-200
              hover:text-brand-bronze
              focus-visible:text-brand-bronze
              md:hidden
            "
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>

          {/* Desktop brand */}
          <div className="hidden flex-1 justify-start md:flex">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="
                flex
                items-center
                gap-2
                text-brand-black
                transition-colors
                duration-200
                hover:text-brand-bronze
                focus-visible:text-brand-bronze
              "
            >
              <Image
                src={logo}
                alt=""
                aria-hidden="true"
                 width={28}
  height={28}
                className="size-7 object-contain"
              />

              <span className="font-heading text-3xl font-bold uppercase leading-none">
                {siteConfig.brand.name}
              </span>
            </Link>
          </div>

          {/* Mobile centered brand */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="
              absolute
              left-1/2
              flex
              -translate-x-1/2
              items-center
              gap-1.5
              text-brand-black
              md:hidden
            "
          >
            <Image
              src={logo}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="size-6 object-contain"
            />

            <span className="font-heading text-xl font-bold uppercase leading-none">
              {siteConfig.brand.name}
            </span>
          </Link>

          {/* Desktop main navigation */}
          <div className="absolute left-1/2 hidden h-full -translate-x-1/2 md:block">
            <ul className="flex h-full items-center gap-8 lg:gap-10">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href} className="h-full">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                        relative
                        flex
                        h-full
                        items-center
                        text-sm
                        font-medium
                        text-neutral-700
                        transition-colors
                        duration-200
                        hover:text-brand-black
                        focus-visible:text-brand-bronze
                        after:absolute
                        after:bottom-0
                        after:left-0
                        after:h-[2px]
                        after:w-full
                        after:bg-brand-black
                        after:content-['']
                        ${
                          isActive
                            ? "after:scale-x-100"
                            : "after:scale-x-0 hover:after:scale-x-100"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop account navigation */}
          <div className="hidden flex-1 justify-end md:flex">
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  href="/cart"
                  aria-label="Cart"
                  title="Cart"
                  className="flex size-10 items-center justify-center text-brand-black transition-colors duration-200 hover:text-brand-bronze focus-visible:text-brand-bronze"
                >
                  <ShoppingBag
                    aria-hidden="true"
                    className="size-[1.15rem]"
                    strokeWidth={1.7}
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  aria-label="Profile"
                  title="Profile"
                  className="flex size-10 items-center justify-center text-brand-black transition-colors duration-200 hover:text-brand-bronze focus-visible:text-brand-bronze"
                >
                  <UserRound
                    aria-hidden="true"
                    className="size-[1.15rem]"
                    strokeWidth={1.7}
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  aria-label="Orders"
                  title="Orders"
                  className="flex size-10 items-center justify-center text-brand-black transition-colors duration-200 hover:text-brand-bronze focus-visible:text-brand-bronze"
                >
                  <Package
                    aria-hidden="true"
                    className="size-[1.15rem]"
                    strokeWidth={1.7}
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile cart */}
          <div className="flex md:hidden">
            <Link
              href="/cart"
              aria-label="Cart"
              title="Cart"
              className="
                flex
                size-10
                items-center
                justify-center
                text-brand-black
                transition-colors
                duration-200
                hover:text-brand-bronze
                focus-visible:text-brand-bronze
              "
            >
              <ShoppingBag
                aria-hidden="true"
                className="size-[1.2rem]"
                strokeWidth={1.7}
              />
            </Link>
          </div>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-neutral-200 py-6 md:hidden"
          >
            <ul className="flex flex-col">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                        flex
                        items-center
                        justify-between
                        border-b
                        border-neutral-200
                        py-4
                        text-sm
                        font-medium
                        transition-colors
                        duration-200
                        ${
                          isActive
                            ? "text-brand-black"
                            : "text-neutral-700 hover:text-brand-bronze"
                        }
                      `}
                    >
                      {item.label}

                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-brand-bronze"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}

              <li className="mt-4 border-t border-neutral-200 pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                  Account
                </p>

                {mobileAccountLinks.map(
                  ({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 py-3 text-sm text-neutral-700 transition-colors hover:text-brand-black"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.7}
                      />

                      {label}
                    </Link>
                  ),
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}