import Hero from "@/app/home/Hero";
import Categories from "@/app/home/Categories";
import CustomWear from "@/app/home/CustomWear";
import FAQ from "@/app/home/FAQ";
import ProductCarousel from "@/app/components/ui/product/ProductCarousel";
import FinalCTA from "@/app/home/FinalCTA";
import { shopProducts } from "@/app/data/products";

export default function Home() {
  const senators = shopProducts.filter(
    (product) => product.category === "senator"
  );

  const scrubs = shopProducts.filter(
    (product) => product.category === "scrub"
  );

  return (
    <main className="flex-1">
      <Hero />
      <Categories />
      <CustomWear />

      <section className="section-padding">
        <div className="container space-y-8 md:space-y-10">
          <ProductCarousel
            title="Senator Wears"
            products={senators}
            viewMoreHref="/shop/senator-wears"
          />

          <ProductCarousel
            title="Scrubs"
            products={scrubs}
            viewMoreHref="/shop/scrubs"
          />
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </main>
  );
}