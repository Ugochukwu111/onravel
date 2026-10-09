import type { Product } from "@/app/data/products";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-tight tracking-tight">
        {product.name}
      </h1>
      <p className="mt-3 text-lg">
        ₦{product.price.toLocaleString("en-NG")}
      </p>
      <p className="mt-5  max-w-xl text-sm leading-6 text-neutral-700">
        {product.description ?? "Product description coming soon."}
      </p>
      <p className="mt-3 max-w-xl text-xs leading-5 text-neutral-600">
       <span className="font-medium text-neutral-700"> Material :</span> We carefully select and test our fabrics for quality, durability, and
        color retention, so your piece keeps its look with proper care.
      </p>
    </div>
  );
}
