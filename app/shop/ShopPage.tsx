"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProductCardsGrid from "@/app/components/ui/product/ProductCardGrid";
import { shopCategories, shopProducts } from "@/app/data/products";
import ShopFilters from "@/app/shop/ShopFilters";
import ShopHeader from "@/app/shop/ShopHeader";

type ShopPageProps = {
  categorySlug?: string;
};

export default function ShopPage({ categorySlug }: ShopPageProps) {
  const router = useRouter();

  const [sort, setSort] = useState("best-selling");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [occasionsOpen, setOccasionsOpen] = useState(true);
  const [bestsellersOpen, setBestsellersOpen] = useState(true);

  const category = shopCategories.find(
    ({ slug }) => slug === categorySlug,
  );

  const visibleProducts = useMemo(() => {
    const filteredProducts = category
      ? shopProducts.filter(
          (product) => product.category === category.productCategory,
        )
      : [...shopProducts];

    switch (sort) {
      case "name-ascending":
        return filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name),
        );

      case "name-descending":
        return filteredProducts.sort((a, b) =>
          b.name.localeCompare(a.name),
        );

      case "price-ascending":
        return filteredProducts.sort((a, b) => a.price - b.price);

      case "price-descending":
        return filteredProducts.sort((a, b) => b.price - a.price);

      default:
        return filteredProducts;
    }
  }, [category, sort]);

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    router.push("/shop");
    setFiltersOpen(false);
  };

  return (
    <main className="min-h-screen flex-1 bg-brand-ivory">
      <div className="container page-top-padding pb-16">
        <ShopHeader
          categoryName={category?.name ?? "All"}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((open) => !open)}
          sort={sort}
          onSortChange={setSort}
        />

        <div
          className={`
            grid gap-8 lg:gap-10
            transition-[grid-template-columns]
            duration-500 ease-out
            ${
              filtersOpen
                ? "lg:grid-cols-[250px_minmax(0,1fr)]"
                : "lg:grid-cols-[0_minmax(0,1fr)]"
            }
          `}
        >
          <ShopFilters
            categorySlug={categorySlug}
            filtersOpen={filtersOpen}
            categoriesOpen={categoriesOpen}
            occasionsOpen={occasionsOpen}
            bestsellersOpen={bestsellersOpen}
            onCloseFilters={closeFilters}
            onClearFilters={clearFilters}
            onToggleCategories={() =>
              setCategoriesOpen((open) => !open)
            }
            onToggleOccasions={() =>
              setOccasionsOpen((open) => !open)
            }
            onToggleBestsellers={() =>
              setBestsellersOpen((open) => !open)
            }
          />

          <section
            aria-label={`${category?.name ?? "All"} products`}
            className="min-w-0"
          >
            <div className="mb-7 text-center">
              {category && (
                <Link
                  href="/shop"
                  className="mt-2 inline-flex border-b border-brand-black pb-0.5 text-xs uppercase tracking-[0.14em] transition-colors hover:text-brand-bronze"
                >
                  Clear filter
                </Link>
              )}
            </div>

            <ProductCardsGrid products={visibleProducts} />
          </section>
        </div>
      </div>
    </main>
  );
}
