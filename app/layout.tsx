import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@/app/config/site";
import StorefrontChrome from "@/app/components/layout/StorefrontChrome";
import Cart from "@/app/components/ui/cart/Cart";
import "./globals.css";


/*Body font family*/ 
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/*Header font family*/ 
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});


export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StorefrontChrome>{children}</StorefrontChrome>
        <Suspense fallback={null}>
          <Cart />
        </Suspense>
      </body>
    </html>
  );
}
