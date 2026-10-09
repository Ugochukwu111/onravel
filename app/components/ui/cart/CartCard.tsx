import Link from "next/link";
import OptimizedImage from "@/app/components/ui/VisualOptimizers/OptimizedImage";
import { getProductHref, type Product } from "@/app/data/products";

type CartCardProps = {
  product: Product;
  onRemove: (productId: Product["id"]) => void;
};

function getOrderHref(product: Product) {
  const message = `Hello Onravel, I would like to order ${product.name} for ₦${product.price.toLocaleString("en-NG")}.`;

  return `https://api.whatsapp.com/send/?phone=2349167636839&text=${encodeURIComponent(message)}`;
}

export default function CartCard({
  product,
  onRemove,
}: CartCardProps) {
  return (
    <article className="flex min-w-0 gap-3">
      {/* Product image */}
      <Link
        href={getProductHref(product)}
        aria-label={`See product details for ${product.name}`}
        className="block w-20 shrink-0 sm:w-24"
      >
        <OptimizedImage
          src={product.image}
          alt={`${product.name} — Onravel`}
          className="aspect-square"
          sizes="96px"
        />
      </Link>

      {/* Product content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate text-xs font-medium sm:text-sm">
          {product.name}
        </h3>

        <p className="mt-0.5 text-xs text-neutral-700 sm:text-sm">
          ₦{product.price.toLocaleString("en-NG")}
        </p>

        <Link
          href={getProductHref(product)}
          className=" link mt-1 inline-block w-fit text-[10px] text-neutral-600 underline underline-offset-4 transition-colors hover:text-brand-bronze sm:text-[11px]"
        >
          See product details
        </Link>

        <div className="mt-auto pt-3">
          <a
            href={getOrderHref(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit border border-brand-black px-2 text-[8px] uppercase transition-colors hover:bg-brand-black hover:text-white sm:text-[10px]"
          >
            Order this
          </a>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="mt-2  text-left text-[10px] text-neutral-500 transition-colors hover:text-red-600 sm:text-[11px]"
          >
            Remove from cart
          </button>
        </div>
      </div>
    </article>
  );
}
