import Link from "next/link";
import FadeUp from "@/app/components/animations/FadeUp";
import Video from "@/app/components/ui/VisualOptimizers/Video";

const categories = [
  {
    name: "Scrubs",
    description: "Made for your everyday shift.",
    href: "/shop/scrubs",
    src: "https://res.cloudinary.com/dy4qtrmgz/video/upload/v1791229857/vid-hero_ck4ivt.mp4",
    poster: "/images/categories/scrubs.jpg",
  },
  {
    name: "African Wears",
    description: "Tradition, tailored your way.",
    href: "/shop/african-wears",
    src:"https://res.cloudinary.com/dy4qtrmgz/video/upload/v1791278814/african_dasv1p.mp4" ,
    poster: "/images/categories/african-wears.jpg",
  },
  {
    name: "Kaftans",
    description: "Effortless comfort. Refined style.",
    href: "/shop/caftans",
    src: "https://res.cloudinary.com/dy4qtrmgz/video/upload/v1791278728/kaftan_siesac.mp4",
    poster: "/images/categories/caftans.jpg",
  },
  {
    name: "Senator Wears",

    description: "Sharp looks, made for you.",
    href: "/shop/senator-wears",
    src: "https://res.cloudinary.com/afsrpjwx/video/upload/v1791415565/onravel-senator-category.mp4",
    poster: "/images/categories/senator-wears.jpg",
  },
];

export default function Categories() {
  return (
    <section className="section-padding">
      <div className="container">
        {/* Section intro */}
        <FadeUp>
          <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
            <div className="max-w-2xl">
  <p className="eyebrow mb-2 md:mb-3">Explore</p>

  <h2 className="text-[clamp(1.75rem,5vw,4rem)] leading-[0.95]">
    Find what fits you.
  </h2>

  <p className="mt-3 max-w-xl text-[clamp(0.8rem,1.5vw,1.125rem)] leading-[clamp(1.2rem,2vw,1.8rem)] text-neutral-600 md:mt-4">
    From everyday scrubs to statement African wears, discover pieces made to
    fit your style, your moment, and you.
  </p>
</div>

            <Link
              href="/shop"
              className="btn btn-primary"
            >
              View all
            </Link>
          </div>
        </FadeUp>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-4 md:gap-3">
          {categories.map((category, index) => (
            <FadeUp key={category.name} delay={index * 0.1}>
              <Link
                href={category.href}
                aria-label={`Explore ${category.name}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-neutral-200"
              >
                <Video
                  src={category.src}
                  poster={category.poster}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Soft bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Category content */}
                <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4 md:p-6">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                    <h3 className="text-shadow-sm text-[clamp(0.9rem,2vw,1.875rem)] leading-[1]">
  {category.name}
</h3>

<p className="mt-1 line-clamp-2 text-[clamp(0.6rem,1vw,0.875rem)] leading-[1.25] text-white/75">
  {category.description}
</p>
                    </div>

                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/40 text-sm transition-all duration-300 sm:size-8 md:size-9 md:text-lg group-hover:translate-x-1 group-hover:bg-white group-hover:text-brand-black"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-6 sm:hidden">
          <Link href="/shop" className="text-link text-sm">
            View all collections
          </Link>
        </div>
      </div>
    </section>
  );
}