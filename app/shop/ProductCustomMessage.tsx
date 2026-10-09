"use client";

import { useState } from "react";

export default function ProductCustomMessage() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <label
        htmlFor="product-custom-message"
        className="mb-2 block text-xs font-medium uppercase tracking-[0.14em]"
      >
        Custom message (optional)
      </label>
      <textarea
        id="product-custom-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={4}
        placeholder="Share a color, delivery, or other special request."
        className="min-h-28 resize-y border border-neutral-300 bg-transparent p-3 text-sm leading-6 focus:border-brand-black focus:outline-none"
      />
      <p className="mt-2 text-xs leading-5 text-neutral-600">
        Standard delivery is estimated at 3–7 days. You can request earlier
        delivery here.
      </p>
    </div>
  );
}
