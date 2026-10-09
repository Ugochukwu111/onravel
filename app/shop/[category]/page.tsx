import { notFound } from "next/navigation";
import ShopPage from "@/app/shop/ShopPage";
import ProductDetails from "@/app/shop/ProductDetails";
import {
  getProductHref,
  shopCategories,
  shopProducts,
} from "@/app/data/products";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  const categoryParams = shopCategories.map(({ slug }) => ({
    category: slug,
  }));
  const productParams = shopProducts.map((product) => ({
    category: getProductHref(product).slice("/shop/".length),
  }));

  return [...categoryParams, ...productParams];
}

export default async function ShopCategory({ params }: CategoryPageProps) {
  const { category } = await params;
  const productId = category.match(/-(\d+)$/)?.[1];

  if (productId) {
    const product = shopProducts.find(
      (item) => item.id === Number(productId),
    );

    if (!product || getProductHref(product) !== `/shop/${category}`) {
      notFound();
    }

    return <ProductDetails product={product} />;
  }

  if (shopCategories.some((item) => item.slug === category)) {
    return <ShopPage categorySlug={category} />;
  }

  notFound();
}
