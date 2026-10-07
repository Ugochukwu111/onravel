import Link from "next/link";
import ImageSkeleton from "@/app/components/ui/VisualOptimizers/ImageSkeleton";
import FadeUp from "@/app/components/animations/FadeUp";
import PopIn from "@/app/components/animations/PopIn";
import RotatingCTA from "@/app/home/RotatingCTA";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Video skeleton */}
      <ImageSkeleton className="absolute inset-0 h-full w-full" />

      {/* Hero video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://res.cloudinary.com/dy4qtrmgz/video/upload/v1791229857/vid-hero_ck4ivt.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="container pb-[clamp(3rem,8vw,7rem)]">
          
            <div className="max-w-2xl text-white">
              <FadeUp>
            <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-shadow">
  Wear your statement.
</h1>
  </FadeUp>

  <FadeUp delay={0.1}>

<p className="mt-6 font-medium uppercase tracking-[0.12em] text-shadow-sm">
  Scrubs · African Wears · Caftans · Senator Wears
</p>
</FadeUp>

<FadeUp delay={0.2}>
<p className="mt-3 max-w-md text-base text-white/85 text-shadow-sm">
  Custom-made wears, delivered across Nigeria.
</p>
</FadeUp>

<PopIn delay={0.3} >
 <RotatingCTA />
</PopIn>
            </div>
        
        </div>
      </div>
    </section>
  );
}