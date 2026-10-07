"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type CTAProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  loading?: boolean;
};

export default function CTA({
  children = "Get Started",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...props
}: CTAProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn  group ${className}`}
      {...props}
    >
      {loading ? (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin"
        />
      ) : (
        <>
          <span>{children}</span>

          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </>
      )}
    </button>
  );
}