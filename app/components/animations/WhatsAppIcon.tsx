"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppIcon() {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hideAfterDelay = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    const handleScroll = () => {
      setVisible(true);
      hideAfterDelay();
    };

    // Show immediately on page load, then hide after 3 seconds.
    hideAfterDelay();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <a
      href="https://api.whatsapp.com/send/?phone=2349167636839&text=Hello%20Onravel%2C%20I%27d%20like%20to%20learn%20more."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Onravel on WhatsApp"
      title="Chat with us on WhatsApp"
      className={`
        fixed
        right-5
        bottom-5
        z-[100]
        flex
        size-[clamp(50px,5vw,74px)]
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_20px_rgba(0,0,0,0.3)]
        transition-opacity
        duration-300
        ease-in-out
        hover:scale-105
        hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#25D366]
        ${
          visible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
    >
      <FaWhatsapp className="size-[55%]" />
    </a>
  );
}