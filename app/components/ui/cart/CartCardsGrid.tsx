import CartCard from "@/app/components/ui/cart/CartCard";
import type { Product } from "@/app/data/products";

type CartCardsGridProps = {
  products: Product[];
  onRemove: (productId: Product["id"]) => void;
};

export default function CartCardsGrid({
  products,
  onRemove,
}: CartCardsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-5 md:gap-y-8">
      {products.map((product) => (
        <CartCard
          key={product.id}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
