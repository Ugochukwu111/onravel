"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CartCardsGrid from "@/app/components/ui/cart/CartCardsGrid";
import { shopProducts, type Product } from "@/app/data/products";

const initialCartProducts = shopProducts.slice(0, 15);

function getCheckoutHref(products: Product[]) {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  const items = products
    .map((product) => `${product.name} — ₦${product.price.toLocaleString("en-NG")}`)
    .join(", ");
  const message = `Hello Onravel, I would like to proceed with my cart order: ${items}. Total: ₦${total.toLocaleString("en-NG")}.`;

  return `https://api.whatsapp.com/send/?phone=2349167636839&text=${encodeURIComponent(message)}`;
}

export default function Cart() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const isOpen = searchParams.get("cart") === "true";

  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  const closeCart = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("cart");
    router.push(`${pathname}${url.search}${url.hash}`, { scroll: false });
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[101] bg-black/40 transition-opacity duration-500 ease-out ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-x-0 bottom-0 z-[110] flex h-[80vh] flex-col bg-brand-ivory text-brand-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[95vh] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4 md:px-8">
          <h3 className="text-lg font-normal uppercase tracking-[0.12em] md:text-xl">
            My cart <span className="text-neutral-500">({cartProducts.length})</span>
          </h3>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:text-brand-bronze"
          >
            Cancel
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-6">
          <CartCardsGrid
            products={cartProducts}
            onRemove={(productId) =>
              setCartProducts((products) =>
                products.filter((product) => product.id !== productId),
              )
            }
          />
        </div>

        <footer className="shrink-0 border-t border-black/10 bg-brand-ivory px-5 pb-5 pt-4 md:px-8 md:pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.16em]">
              Total
            </span>
            <span className="text-base font-medium">
              ₦{total.toLocaleString("en-NG")}
            </span>
          </div>
          <a
            href={getCheckoutHref(cartProducts)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex min-h-12 w-full items-center justify-center bg-success px-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-success-dark"
          >
            Proceed to checkout
          </a>
        </footer>
      </section>
    </>
  );
}
