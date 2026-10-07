"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ctas = [
  { label: "Shop Kaftans", href: "/shop/kaftans" },
  { label: "Shop Scrubs", href: "/shop/scrubs" },
  { label: "Shop African Wears", href: "/shop/african-wears" },
  { label: "Shop Senator Wears", href: "/shop/senator-wears" },
];

export default function RotatingCTA() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsSweeping(true);

      // Change the CTA while the white sweep is covering the button.
      setTimeout(() => {
        setIndex((current) => (current + 1) % ctas.length);
      }, 350);

      // Sweep has completely left through the right.
      setTimeout(() => {
        setIsSweeping(false);
      }, 700);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const cta = ctas[index];

  return (
    <Link
      href={cta.href}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="btn btn-inverse-2 relative mt-8 min-w-[300px] overflow-hidden"
    >
      {/* White sweep */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-white ${
          isSweeping
            ? "animate-cta-sweep"
            : "translate-x-[-100%]"
        }`}
      />

      {/* CTA text */}
      <span className="relative z-20">
        {cta.label}
        <span aria-hidden="true" className="ml-3">
          →
        </span>
      </span>
    </Link>
  );
}


