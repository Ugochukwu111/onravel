import Link from "next/link";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { getProductHref, type Product } from "@/app/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Link
        href={getProductHref(product)}
        className="group block"
        aria-label={`View ${product.name}`}
      >
        <OptimizedImage
          src={product.image}
          alt={`${product.name} — Onravel`}
          className="aspect-[4/5]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="mt-4">
          <h3 className="truncate text-[clamp(0.9rem,1.4vw,1.15rem)] font-normal text-brand-black">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-brand-black">
            ₦{product.price.toLocaleString("en-NG")}
          </p>
        </div>
      </Link>
    </article>
  );
}
