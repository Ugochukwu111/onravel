"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/shop");
        }
      }}
      aria-label="Go back"
      className="inline-flex size-10 items-center justify-center border border-black/10 transition-colors hover:border-brand-black hover:text-brand-bronze"
    >
      <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.5} />
    </button>
  );
}
