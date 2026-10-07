"use client";

import ImageSkeleton from "@/app/components/ui/VisualOptimizers/ImageSkeleton";

type VideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export default function Video({
  src,
  poster,
  className = "",
}: VideoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ImageSkeleton className="absolute inset-0 h-full w-full" />

      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}