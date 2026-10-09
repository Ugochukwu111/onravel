import type { Product } from "@/app/data/products";
import ProductBackButton from "@/app/shop/ProductBackButton";
import ProductColors from "@/app/shop/ProductColors";
import ProductCustomMessage from "@/app/shop/ProductCustomMessage";
import ProductCustomization from "@/app/shop/ProductCustomization";
import ProductGallery from "@/app/shop/ProductGallery";
import ProductInfo from "@/app/shop/ProductInfo";
import ProductPurchaseActions from "@/app/shop/ProductPurchaseActions";
import ProductCarousel from "@/app/components/ui/product/ProductCarousel";
import { shopProducts } from "@/app/data/products";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const relatedProducts = shopProducts.filter(
    (relatedProduct) =>
      relatedProduct.category === product.category &&
      relatedProduct.id !== product.id,
  );

  return (
    <main className="min-h-screen flex-1 bg-brand-ivory">
      <div className="container page-top-padding pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-16">
        <div className="mb-6">
          <ProductBackButton />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery key={product.id} product={product} />

          <div className="space-y-6 lg:py-2">
            <ProductInfo product={product} />
            <ProductCustomization key={product.id} product={product} />
            <ProductColors key={product.id} />
            <ProductCustomMessage key={product.id} />
            <ProductPurchaseActions />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16">
            <ProductCarousel
              title="You May Also Like"
              products={relatedProducts}
              compact
              showViewMore={false}
            />
          </div>
        )}
      </div>
    </main>
  );
}
