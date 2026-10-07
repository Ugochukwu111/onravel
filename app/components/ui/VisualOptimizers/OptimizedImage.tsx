import NextImage from "next/image";
import ImageSkeleton from "@/app/components/ui/VisualOptimizers/ImageSkeleton";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
}: ImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ImageSkeleton className="absolute inset-0 h-full w-full" />

      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
      />

    </div>
  );
}