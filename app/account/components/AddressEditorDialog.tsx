"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import AddressForm from "@/app/account/components/AddressForm";
import type { DeliveryAddress } from "@/app/account/components/account-data";

type AddressEditorDialogProps = {
  open: boolean;
  initialValues: DeliveryAddress;
  isSaving?: boolean;
  onClose: () => void;
  onSubmit: (values: DeliveryAddress) => Promise<void> | void;
};

export default function AddressEditorDialog({
  open,
  initialValues,
  isSaving = false,
  onClose,
  onSubmit,
}: AddressEditorDialogProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (previousFocusRef.current && previousFocusRef.current.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, onClose]);

  if (!isMounted || !open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/40 pb-4 pt-8 sm:items-center sm:p-8">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Delivery address editor"
        className="relative z-10 w-full max-w-2xl border border-black/10 bg-brand-ivory shadow-[0_20px_60px_rgba(11,11,11,0.18)]"
      >
        <header className="flex items-center justify-between border-b border-black/10 px-4 py-4 sm:px-6">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Delivery details
            </p>
            <h2 className="mt-2 font-heading text-3xl font-normal tracking-normal">
              Edit address
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close address editor"
            className="inline-flex size-10 items-center justify-center border border-black/10 text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        <div className="max-h-[75vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <AddressForm
            initialValues={initialValues}
            submitLabel="Save address"
            isSubmitting={isSaving}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </section>
    </div>
  );
}
