"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FadeUp from "@/app/components/animations/FadeUp";
import PopIn from "@/app/components/animations/PopIn";
import Video from "@/app/components/ui/VisualOptimizers/Video";

const stories = [
  {
    id: 1,
    name: "Dr. David",
    role: "Medical Doctor",
    location: "Lagos",
    order: "Custom Scrubs",
    delivery: "September 12, 2026",
    quote:
      "I needed scrubs that actually fit the way I work. Onravel took my measurements and delivered exactly what I wanted.",
    video: "YOUR_DAVID_VIDEO_URL",
    poster: "/images/custom-wear/dr-david.jpg",
  },
  {
    id: 2,
    name: "Amaka",
    role: "Registered Nurse",
    location: "Abuja",
    order: "Custom Scrubs",
    delivery: "September 18, 2026",
    quote:
      "The fit was exactly what I wanted, and the process was so easy from measurement to delivery.",
    video: "YOUR_AMAKA_VIDEO_URL",
    poster: "/images/custom-wear/amaka.jpg",
  },
  {
    id: 3,
    name: "Lagos Private Hospital",
    role: "Healthcare Team",
    location: "Lagos",
    order: "24 Custom Scrubs",
    delivery: "September 20, 2026",
    quote:
      "We wanted a consistent look for our clinical team without compromising comfort. Onravel delivered.",
    video: "YOUR_HOSPITAL_VIDEO_URL",
    poster: "/images/custom-wear/hospital.jpg",
  },
];

export default function CustomWear() {
  const [activeStory, setActiveStory] = useState(stories[0]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleStoryChange = (story: (typeof stories)[number]) => {
    setActiveStory(story);

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // Duplicate the stories so the rail can loop continuously.
  const scrollingStories = [...stories, ...stories, ...stories];

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-20 overflow-hidden"
      aria-labelledby="custom-wear-heading"
    >
      <div className="container">
        {/* Main story */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Selected video */}
          <FadeUp key={`media-${activeStory.id}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Video
                src={activeStory.video}
                poster={activeStory.poster}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </FadeUp>

          {/* Story content */}
          <div className="max-w-xl">
            <FadeUp delay={0.1}>
              <p className="eyebrow mb-3">Custom Made</p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 id="custom-wear-heading">
                Made for you. Literally.
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-5 max-w-lg text-[clamp(0.9rem,1.5vw,1.125rem)] leading-[clamp(1.4rem,2vw,1.8rem)] text-neutral-600">
                From measurements to the final stitch, we create custom wears
                designed around your body, your style, and your occasion.
              </p>
            </FadeUp>

            {/* Customer story */}
            <FadeUp key={`story-${activeStory.id}`} delay={0.15}>
              <div className="mt-10 border-l border-brand-bronze pl-5 md:mt-12">
                <p className="text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-brand-black">
                  “{activeStory.quote}”
                </p>

                <div className="mt-6">
                  <p className="font-medium">{activeStory.name}</p>

                  <p className="mt-1 text-sm text-neutral-500">
                    {activeStory.role} · {activeStory.location}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Order details */}
            <FadeUp key={`details-${activeStory.id}`} delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 text-sm">
                <div>
                  <p className="text-neutral-400">Order</p>
                  <p className="mt-1 font-medium">{activeStory.order}</p>
                </div>

                <div>
                  <p className="text-neutral-400">Delivered</p>
                  <p className="mt-1 font-medium">{activeStory.delivery}</p>
                </div>
              </div>
            </FadeUp>

            <PopIn delay={0.4}>
              <Link
                href="/custom-wear"
                className="btn btn-primary mt-10"
              >
                Order a custom wear
                <span aria-hidden="true">→</span>
              </Link>
            </PopIn>
          </div>
        </div>
        <br />

        {/* Infinite story rail */}
        <div className="mt-14 md:mt-20">
          <FadeUp>
            <div className="relative overflow-hidden">
              <div className="custom-wear-marquee flex w-max gap-4">
                {scrollingStories.map((story, index) => {
                  const isActive = story.id === activeStory.id;

                  return (
                    <button
                      key={`${story.id}-${index}`}
                      type="button"
                      onClick={() => handleStoryChange(story)}
                      aria-pressed={isActive}
                      className={`group w-[190px] shrink-0 text-left transition-opacity duration-300 sm:w-[220px] ${
                        isActive
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* Video thumbnail */}
                      <div
                        className={`relative aspect-[4/3] overflow-hidden ${
                          isActive
                            ? "ring-2 ring-brand-bronze ring-offset-2"
                            : ""
                        }`}
                      >
                        <Video
                          src={story.video}
                          poster={story.poster}
                          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />

                        <span
                          aria-hidden="true"
                          className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-sm transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>

                      {/* Story info */}
                      <div className="mt-3">
                        <p className="text-sm font-medium">
                          {story.name}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {story.role} · {story.location}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      <style jsx>{`
        .custom-wear-marquee {
          animation: custom-wear-scroll 30s linear infinite;
        }

        .custom-wear-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes custom-wear-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-wear-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

