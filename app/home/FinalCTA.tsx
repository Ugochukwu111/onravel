import Link from "next/link";
import FadeUp from "@/app/components/animations/FadeUp";
import PopIn from "@/app/components/animations/PopIn";

export default function FinalCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-charcoal text-brand-white"
      aria-labelledby="final-cta-heading"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(209,185,138,0.32)_0%,rgba(176,141,87,0.16)_30%,rgba(255,255,255,0.06)_55%,transparent_72%)] blur-3xl"
      />

      {/* Curved background lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
      >
        <svg
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <path
            d="M-100 520C180 280 390 250 620 390C850 530 1060 530 1540 170"
            stroke="rgba(209,185,138,0.18)"
            strokeWidth="1"
          />

          <path
            d="M-150 610C150 350 390 330 640 470C900 615 1120 560 1570 240"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />

          <path
            d="M-120 430C190 170 430 170 690 320C930 460 1130 430 1560 80"
            stroke="rgba(184,177,167,0.16)"
            strokeWidth="1"
          />

          <path
            d="M-80 700C230 430 450 420 710 550C960 675 1190 610 1520 360"
            stroke="rgba(176,141,87,0.12)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* CTA content */}
      <div className="container relative z-10 section-padding  flex items-center justify-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center ">
          <FadeUp>
            <p className="eyebrow mb-4 text-brand-bronze-light">
              Your next statement
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              id="final-cta-heading"
              className="text-brand-white text-center"
            >
              Ready to wear your statement?
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-neutral-300">
              Discover pieces made to fit your style, your body, and the way
              you move.
            </p>
          </FadeUp>

          <PopIn delay={0.3}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="btn btn-primary bg-brand-white text-brand-black hover:bg-brand-bronze-light"
              >
                Shop the collection
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/custom-wear"
                className="btn border border-white/30 text-brand-white hover:border-brand-bronze-light hover:text-brand-bronze-light"
              >
                Order custom wear
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </PopIn>
        </div>
      </div>
    </section>
  );
}
