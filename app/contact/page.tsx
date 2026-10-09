"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
import FadeUp from "@/app/components/animations/FadeUp";
import PopIn from "@/app/components/animations/PopIn";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { siteConfig } from "@/app/config/site";
import FAQ from "@/app/home/FAQ";

export default function ContactPage() {
  return (
    <main>
    <section
      className="relative isolate overflow-hidden bg-brand-black text-brand-white"
      aria-labelledby="contact-heading"
    >
      {/* Curved background lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <path
            d="M-180 680C160 330 410 300 690 500C970 700 1180 610 1620 210"
            stroke="rgba(209,185,138,0.16)"
            strokeWidth="1"
          />
          <path
            d="M-220 790C130 430 390 400 700 590C990 770 1210 690 1650 310"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <path
            d="M-120 530C180 220 450 210 720 390C1000 580 1220 470 1580 100"
            stroke="rgba(184,177,167,0.12)"
            strokeWidth="1"
          />
          <path
            d="M-100 900C260 520 500 520 760 700C1020 880 1250 770 1580 470"
            stroke="rgba(176,141,87,0.10)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20rem] left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(209,185,138,0.16)_0%,rgba(176,141,87,0.08)_35%,transparent_70%)] blur-3xl"
      />

      <div className="container section-padding relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Contact grid */}
          <FadeUp>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ContactCard
                title="Instagram"
                href={siteConfig.social.instagram}
                image="https://res.cloudinary.com/afsrpjwx/image/upload/v1791457554/ig.jpg"
                alt="Onravel on Instagram"
                icon={FaInstagram}
              />

              <ContactCard
                title="WhatsApp"
                href={siteConfig.contact.whatsapp}
                image="https://res.cloudinary.com/afsrpjwx/image/upload/v1791457554/tiktok.jpg"
                alt="Contact Onravel on WhatsApp"
                icon={FaWhatsapp}
              />

              <ContactCard
                title="TikTok"
                href={siteConfig.social.tiktok}
                image="https://res.cloudinary.com/afsrpjwx/image/upload/v1791457554/tiktok.jpg"
                alt="Onravel on TikTok"
                icon={FaTiktok}
              />

              {/* Physical location */}
              <Link
                href="/contact"
                aria-label="Onravel physical location coming soon"
                className="group relative aspect-square overflow-hidden border border-white/10 bg-brand-charcoal"
              >
                {/* Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-bronze/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />

                <div className="relative flex h-full flex-col items-center justify-center p-5 text-center sm:p-7">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-bronze-light">
                    Coming soon
                  </span>

                  <FaLocationDot
                    aria-hidden="true"
                    className="my-6 text-6xl text-brand-bronze-light transition-transform duration-500 group-hover:scale-110 sm:text-7xl"
                  />

                  <div>
                    <h3 className="font-heading text-2xl text-brand-white sm:text-3xl">
                      Our space
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      Our physical Onravel location is coming soon.
                    </p>

                    <p className="mt-4 text-xs uppercase tracking-[0.15em] text-neutral-500">
                      Lagos · Nigeria
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </FadeUp>

          {/* Contact information */}
          <div className="max-w-xl">
            <FadeUp>
              <p className="eyebrow mb-4 text-brand-bronze-light">
                Get in touch
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 id="contact-heading " className="text-brand-white text-[clamp(3rem,7vw,6rem)]">
                Let&apos;s talk.
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-lg text-neutral-300">
                Have a question, concern, or something specific in mind?
                Reach out and we&apos;ll be happy to help.
              </p>
            </FadeUp>

            {/* WhatsApp */}
            <FadeUp delay={0.3}>
              <div className="mt-10">
                <p className="text-lg font-medium text-brand-white">
                  Need a quick answer?
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  For speedy answers and complaints, reach us directly on
                  WhatsApp.
                </p>

                {siteConfig.contact.whatsapp && (
                  <PopIn delay={0.35}>
                    <Link
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-5"
                    >
                      Chat on WhatsApp
                      <span aria-hidden="true">→</span>
                    </Link>
                  </PopIn>
                )}
              </div>
            </FadeUp>

            {/* Custom wear */}
            <FadeUp delay={0.4}>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-lg font-medium text-brand-white">
                  Want a custom wear?
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  Tell us what you have in mind and let&apos;s make something
                  that fits you.
                </p>

                <PopIn delay={0.45}>
                  <Link
                    href="/custom-wear"
                    className=" btn btn-inverse-2 text-link w-[300px]"
                  >
                    Start a custom order
                    <span aria-hidden="true">→</span>
                  </Link>
                </PopIn>
              </div>
            </FadeUp>
            <br />

            {/* Email */}
            <FadeUp delay={0.5}>
              <div className="mt-8 flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand-bronze-light">
                  <FaEnvelope aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    Prefer email?
                  </p>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 block text-sm text-neutral-300 transition-colors hover:text-brand-bronze-light"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
    <FAQ />
    </main>
  );
}

type ContactCardProps = {
  title: string;
  href: string;
  image: string;
  alt: string;
  icon: React.ElementType;
};



function ContactCard({
  title,
  href,
  image,
  alt,
  icon: Icon,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden border border-white/10 bg-brand-charcoal"
      aria-label={`Visit Onravel on ${title}`}
    >
      <OptimizedImage
        src={image}
        alt={alt}
        sizes="(max-width: 1024px) 50vw, 30vw"
        className="absolute inset-0 h-full w-full"
      />

      <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/30" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <Icon
          aria-hidden="true"
          className="text-2xl text-white sm:text-3xl"
        />

        <div>
          <h3 className="font-heading text-2xl text-white sm:text-3xl">
            {title}
          </h3>

          <span className="mt-2 inline-flex text-sm text-white/70 transition-transform duration-300 group-hover:translate-x-1">
            Visit profile →
          </span>
        </div>
      </div>
    </a>
  );
}