export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  description?: string;
  images?: string[];
  video?: {
    src: string;
    poster?: string;
  };
  details?: {
    label: string;
    value: string;
  }[];
};

export function getProductHref(product: Pick<Product, "id" | "name">) {
  const nameSlug = product.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `/shop/${nameSlug}-${product.id}`;
}

export const shopCategories = [
  { slug: "senator-wears", name: "Senator Wears", productCategory: "senator" },
  { slug: "scrubs", name: "Scrubs", productCategory: "scrub" },
] as const;

export const shopProducts: Product[] = [
  {
    id: 1,
    name: "Senator 1",
    price: 85000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator1.jpg",
    slug: "senator-1",
    category: "senator",
  },
  {
    id: 2,
    name: "Senator 2",
    price: 90000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator-2.jpg",
    slug: "senator-2",
    category: "senator",
  },
  {
    id: 3,
    name: "Senator 3",
    price: 90000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-3.jpg",
    slug: "senator-3",
    category: "senator",
  },
  {
    id: 4,
    name: "Senator 3 — II",
    price: 90000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-3.jpg",
    slug: "senator-3-ii",
    category: "senator",
  },
  {
    id: 5,
    name: "Senator 4",
    price: 95000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-4.jpg",
    slug: "senator-4",
    category: "senator",
  },
  {
    id: 6,
    name: "Senator 5",
    price: 95000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-5.jpg",
    slug: "senator-5",
    category: "senator",
  },
  {
    id: 7,
    name: "Senator 6",
    price: 98000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-6.jpg",
    slug: "senator-6",
    category: "senator",
  },
  {
    id: 8,
    name: "Abada 1",
    price: 100000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-3.jpg",
    slug: "abada-1",
    category: "senator",
  },
  {
    id: 9,
    name: "Abada 2",
    price: 100000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-5.jpg",
    slug: "abada-2",
    category: "senator",
  },
  {
    id: 10,
    name: "Senator 7",
    price: 88000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator1.jpg",
    slug: "senator-7",
    category: "senator",
  },
  {
    id: 11,
    name: "Senator 8",
    price: 92000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator-2.jpg",
    slug: "senator-8",
    category: "senator",
  },
  {
    id: 12,
    name: "Senator 9",
    price: 90000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-3.jpg",
    slug: "senator-9",
    category: "senator",
  },
  {
    id: 13,
    name: "Senator 10",
    price: 95000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-4.jpg",
    slug: "senator-10",
    category: "senator",
  },
  {
    id: 14,
    name: "Senator 11",
    price: 95000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-5.jpg",
    slug: "senator-11",
    category: "senator",
  },
  {
    id: 15,
    name: "Senator 12",
    price: 98000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-6.jpg",
    slug: "senator-12",
    category: "senator",
  },
  {
    id: 16,
    name: "Abada 3",
    price: 105000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-3.jpg",
    slug: "abada-3",
    category: "senator",
  },
  {
    id: 17,
    name: "Senator 13",
    price: 88000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator1.jpg",
    slug: "senator-13",
    category: "senator",
  },
  {
    id: 18,
    name: "Senator 14",
    price: 92000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419356/senator-2.jpg",
    slug: "senator-14",
    category: "senator",
  },
  {
    id: 19,
    name: "Senator 15",
    price: 96000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-4.jpg",
    slug: "senator-15",
    category: "senator",
  },
  {
    id: 20,
    name: "Senator 16",
    price: 100000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/senator-6.jpg",
    slug: "senator-16",
    category: "senator",
  },
  {
    id: 21,
    name: "Scrub 1",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419363/scrub1.jpg",
    slug: "scrub-1",
    category: "scrub",
  },
  {
    id: 22,
    name: "Scrub 2",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub2.jpg",
    slug: "scrub-2",
    category: "scrub",
  },
  {
    id: 23,
    name: "Scrub 3",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub3.jpg",
    slug: "scrub-3",
    category: "scrub",
  },
  {
    id: 24,
    name: "Scrub 4",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub4.jpg",
    slug: "scrub-4",
    category: "scrub",
  },
  {
    id: 25,
    name: "Scrub 5",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub5.jpg",
    slug: "scrub-5",
    category: "scrub",
  },
  {
    id: 26,
    name: "Scrub 6",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419360/scrub6.jpg",
    slug: "scrub-6",
    category: "scrub",
  },
  {
    id: 27,
    name: "Scrub 7",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419358/scrub-7.jpg",
    slug: "scrub-7",
    category: "scrub",
  },
  {
    id: 28,
    name: "Scrub 8",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419358/scrub-8.jpg",
    slug: "scrub-8",
    category: "scrub",
  },
  {
    id: 29,
    name: "Scrub 9",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419358/scrub-9.jpg",
    slug: "scrub-9",
    category: "scrub",
  },
  {
    id: 30,
    name: "Scrub 10",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/scrubu-10.jpg",
    slug: "scrub-10",
    category: "scrub",
  },
  {
    id: 31,
    name: "Scrub 11",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419357/scrub-11.jpg",
    slug: "scrub-11",
    category: "scrub",
  },
  {
    id: 32,
    name: "Scrub 12",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419358/scrub-12.jpg",
    slug: "scrub-12",
    category: "scrub",
  },
  {
    id: 33,
    name: "Scrub 14",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419358/scrub-14.jpg",
    slug: "scrub-14",
    category: "scrub",
  },
  {
    id: 34,
    name: "Scrub 15",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419363/scrub1.jpg",
    slug: "scrub-15",
    category: "scrub",
  },
  {
    id: 35,
    name: "Scrub 16",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub2.jpg",
    slug: "scrub-16",
    category: "scrub",
  },
  {
    id: 36,
    name: "Scrub 17",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub3.jpg",
    slug: "scrub-17",
    category: "scrub",
  },
  {
    id: 37,
    name: "Scrub 18",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub4.jpg",
    slug: "scrub-18",
    category: "scrub",
  },
  {
    id: 38,
    name: "Scrub 19",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419362/scrub5.jpg",
    slug: "scrub-19",
    category: "scrub",
  },
  {
    id: 39,
    name: "Scrub 20",
    price: 45000,
    image: "https://res.cloudinary.com/afsrpjwx/image/upload/v1791419360/scrub6.jpg",
    slug: "scrub-20",
    category: "scrub",
  },
];
