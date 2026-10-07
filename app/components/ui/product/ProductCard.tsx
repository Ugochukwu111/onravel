import Link from "next/link";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function ProductCard({
  name,
  price,
  image,
  slug,
}: ProductCardProps) {
  return (
    <article>
      <Link
        href={`/shop/${slug}`}
        className="group block"
        aria-label={`View ${name}`}
      >
        <OptimizedImage
          src={image}
          alt={`${name} — Onravel`}
          className="aspect-[4/5]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="mt-4">
          <h3 className="truncate text-[clamp(0.9rem,1.4vw,1.15rem)] font-normal text-brand-black">
            {name}
          </h3>

          <p className="mt-1 text-sm text-brand-black">
            ₦{price.toLocaleString("en-NG")}
          </p>
        </div>
      </Link>
    </article>
  );
}

