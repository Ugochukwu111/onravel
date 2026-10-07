import Hero from "@/app/home/Hero";
import Categories from "@/app/home/Categories";
import CustomWear from "@/app/home/CustomWear";
import FAQ from "@/app/home/FAQ";
import ProductCarousel from "@/app/components/ui/product/ProductCarousel";

const kaftans = [
  {
    id: 1,
    name: "Classic Black Kaftan",
    price: 85000,
    image: "/images/products/kaftan-1.jpg",
    slug: "classic-black-kaftan",
  },
  {
    id: 2,
    name: "Signature Bronze Kaftan",
    price: 95000,
    image: "/images/products/kaftan-2.jpg",
    slug: "signature-bronze-kaftan",
  },
  {
    id: 3,
    name: "Linen Relaxed Kaftan",
    price: 78000,
    image: "/images/products/kaftan-3.jpg",
    slug: "linen-relaxed-kaftan",
  },
  {
    id: 4,
    name: "Onravel Statement Kaftan",
    price: 110000,
    image: "/images/products/kaftan-4.jpg",
    slug: "onravel-statement-kaftan",
  },
  {
    id: 5,
    name: "Classic Ivory Kaftan",
    price: 90000,
    image: "/images/products/kaftan-5.jpg",
    slug: "classic-ivory-kaftan",
  },
  {
    id: 6,
    name: "Midnight Flow Kaftan",
    price: 98000,
    image: "/images/products/kaftan-6.jpg",
    slug: "midnight-flow-kaftan",
  },
  {
    id: 7,
    name: "Modern Embroidered Kaftan",
    price: 125000,
    image: "/images/products/kaftan-7.jpg",
    slug: "modern-embroidered-kaftan",
  },
  {
    id: 8,
    name: "Minimalist Sand Kaftan",
    price: 82000,
    image: "/images/products/kaftan-8.jpg",
    slug: "minimalist-sand-kaftan",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Categories />
      <CustomWear />

      <section className="section-padding">
        <div className="container space-y-8 md:space-y-10">
          <ProductCarousel
            title="Kaftans"
            products={kaftans}
            viewMoreHref="/shop/caftans"
          />
          <ProductCarousel
            title="Senators"
            products={kaftans}
            viewMoreHref="/shop/senator-wears"
          />
        </div>
      </section>

      <FAQ />
    </main>
  );
}