import Link from "next/link";
import FadeUp from "@/app/components/animations/FadeUp";
import PopIn from "@/app/components/animations/PopIn";
import Video from "@/app/components/ui/VisualOptimizers/Video";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* About Onravel */}
      <section
        className="section-padding bg-brand-ivory"
        aria-labelledby="about-onravel-heading"
      >
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* Video */}
            <FadeUp>
              <Video
                src="https://res.cloudinary.com/afsrpjwx/video/upload/v1791415564/about-us.mp4"
                poster="/images/about/about-onravel-poster.jpg"
                className="aspect-4/5 w-full"
              />
            </FadeUp>

            {/* Content */}
            <div className="max-w-xl">
              <FadeUp>
                <p className="eyebrow mb-4">About Onravel</p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 id="about-onravel-heading">
                  Clothing that feels like you.
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="mt-6 text-brand-charcoal">
                  Onravel creates custom-made clothing designed around the way
                  you live, work, and express yourself — from comfortable,
                  well-fitted scrubs to modern African wears and pieces made
                  specifically for you.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="mt-5 text-brand-stone">
                  We believe getting dressed should feel personal. Your clothes
                  should fit well, move with you, and still feel like a
                  reflection of who you are.
                </p>
              </FadeUp>

              <PopIn delay={0.4}>
                <Link href="/shop" className="btn btn-primary mt-8">
                  Discover the collection
                  <span aria-hidden="true">→</span>
                </Link>
              </PopIn>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section
        className="relative isolate overflow-hidden bg-brand-black text-brand-white"
        aria-labelledby="founder-heading"
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

        <div className="container relative z-10 section-padding">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Founder content */}
            <div className="order-2 max-w-xl lg:order-1">
              <FadeUp>
                <p className="eyebrow mb-4 text-brand-bronze-light">
                  The person behind Onravel
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 id="founder-heading" className="text-brand-white">
                  Built from a belief in better clothing.
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="mt-6 text-neutral-300">
                  Onravel was born from a simple belief: what you wear should
                  feel as good as it looks. Every piece is an opportunity to
                  create something that fits your body, your lifestyle, and
                  your personality.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="mt-5 text-neutral-400">
                  From everyday essentials to custom-made pieces, the goal is
                  to make clothing that feels considered, personal, and
                  unmistakably yours.
                </p>
              </FadeUp>

              <PopIn delay={0.4}>
                <div className="mt-8">
                  <p className="font-heading text-2xl text-brand-bronze-light">
                    Wear your statement.
                  </p>

                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
                    — Founder, Onravel
                  </p>
                </div>
              </PopIn>
            </div>

            {/* Founder image */}
            <FadeUp
              delay={0.15}
              className="order-1 lg:order-2"
            >
                   <Video
                src="https://res.cloudinary.com/afsrpjwx/video/upload/v1791415566/onravel-ceo.mp4"
                poster="/images/about/about-onravel-poster.jpg"
                className="aspect-4/5 w-full"
              />
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}