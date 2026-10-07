import ProductCard from "@/app/components/ui/product/ProductCard";

const products = [
  {
    id: 1,
    name: "Classic Medical Scrub",
    price: 45000,
    image: "/images/products/classic-scrub.jpg",
    slug: "classic-medical-scrub",
  },
  {
    id: 2,
    name: "Signature Kaftan",
    price: 85000,
    image: "/images/products/signature-kaftan.jpg",
    slug: "signature-kaftan",
  },
  {
    id: 3,
    name: "Modern Senator Wear",
    price: 95000,
    image: "/images/products/modern-senator.jpg",
    slug: "modern-senator-wear",
  },
  {
    id: 4,
    name: "Heritage African Wear",
    price: 75000,
    image: "/images/products/heritage-african-wear.jpg",
    slug: "heritage-african-wear",
  },
];

export default function ProductCardsGrid() {
  return (
    <div className=" container  grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product ) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          slug={product.slug}
        />
      ))}
    </div>
  );
}


