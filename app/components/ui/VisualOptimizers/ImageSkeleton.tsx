import Image from "next/image";
import logo from "@/public/images/onravel-logo.png";

type ImageSkeletonProps = {
  className?: string;
};

export default function ImageSkeleton({
  className = "",
}: ImageSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center overflow-hidden bg-neutral-200 ${className}`}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />

      {/* Onravel logo */}
      <Image
        src={logo}
        alt=""
        width={48}
        height={48}
        className="relative z-10 size-10 object-contain opacity-40 grayscale"
      />
    </div>
  );
}