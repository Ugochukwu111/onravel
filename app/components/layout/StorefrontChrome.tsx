"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/NavBar";
import WhatsAppIcon from "@/app/components/animations/WhatsAppIcon";

type StorefrontChromeProps = {
  children: ReactNode;
};

export default function StorefrontChrome({
  children,
}: StorefrontChromeProps) {
  const pathname = usePathname();
  const isAccountRoute =
    pathname === "/account" || pathname.startsWith("/account/");

  if (isAccountRoute) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <WhatsAppIcon />
      <Footer />
    </>
  );
}
