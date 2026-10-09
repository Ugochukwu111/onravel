import ProductCard from "@/app/components/ui/product/ProductCard";
import { shopProducts, type Product } from "@/app/data/products";
import FadeUp from "@/app/components/animations/FadeUp";

type ProductCardsGridProps = {
  products?: Product[];
};

export default function ProductCardsGrid({
  products = shopProducts,
}: ProductCardsGridProps) {
  return (
    <div className="container grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product, index) => (
        <FadeUp key={product.id} delay={(index % 4) * 0.1} >
        <ProductCard
        product={product}
        />
        </FadeUp>
      ))}
    </div>
  );
}
