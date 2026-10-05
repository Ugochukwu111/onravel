import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {   siteConfig } from "@/app/config/site";
import Footer from "@/app/components/layout/Footer";
import WhatsAppIcon from "@/app/components/animations/WhatsAppIcon";
import Navbar from "@/app/components/layout/NavBar";
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
        <Navbar/>
        {children}
        <WhatsAppIcon />
      <Footer />
        
      </body>
    </html>
  );
}
