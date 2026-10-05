import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import FadeUp from "@/app/components/animations/FadeUp";

import { siteConfig } from "@/app/config/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const informationLinks = [
  { label: "Returns", href: "/returns" },
  { label: "Custom Size", href: "/custom-size" },
  { label: "Product Care", href: "/product-care" },
];

const policyLinks = [
  { label: "Return & Refund", href: "/return-refund" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Shipping Policy", href: "/shipping" },
];

const socials = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: FaFacebook,
  },
  {
    label: "TikTok",
    href: siteConfig.social.tiktok,
    icon: FaTiktok,
  },
  {
    label: "WhatsApp",
    href: siteConfig.contact.whatsapp,
    icon: FaWhatsapp,
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-ivory">
      <div className="container pt-16 md:pt-20 lg:pt-24">
        {/* Upper footer */}
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4 md:pb-20 lg:pb-24">
          {/* Brand */}
          <div>
            <h5 className="mb-8 text-brand-white">
              {siteConfig.brand.name}
            </h5>
            <br/>

            <div className="flex items-center gap-3">
              {socials.map(({ label,  href, icon: Icon },index) => (
                <FadeUp delay={index * 0.1} key={label} className="flex">
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    bg-neutral-800
                    text-neutral-400
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:bg-neutral-700
                    hover:text-brand-white
                    focus-visible:bg-neutral-700
                    focus-visible:text-brand-bronze
                  "
                >
                  <Icon className="size-[1.1rem]" />
                </a>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Information */}
          <FooterColumn title="Information" links={informationLinks} />

          {/* Policies */}
          <FooterColumn title="Policies" links={policyLinks} />
        </div>

        {/* Lower footer */}
        <div className="border-t border-brand-charcoal">
          <div className="relative flex min-h-40 items-end overflow-hidden py-6">
            <p className="relative z-10 w-full text-center text-sm text-neutral-500">
              © {new Date().getFullYear()} {siteConfig.brand.name}. All rights
              reserved.
            </p>

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[-0.25em]
                left-1/2
                -translate-x-1/2
                font-heading
                text-[clamp(5rem,18vw,15rem)]
                leading-none
                text-brand-ink
              "
            >
              {siteConfig.brand.name.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h6 className="mb-8 text-brand-white">{title}</h6>
          <br/>
    

      <nav className="flex flex-col items-start gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="
              text-sm
              text-neutral-400
              transition-all
              duration-200
              hover:translate-x-1
              hover:text-brand-ivory
              focus-visible:text-brand-bronze
            "
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}