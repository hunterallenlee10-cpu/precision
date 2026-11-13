"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Appears only after scrolling 1.5 screens.
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.5);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-[88px] right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-ink bg-paper text-ink transition-opacity duration-200 hover:bg-white md:bottom-6 md:right-6 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" size={20} strokeWidth={2} />
    </a>
  );
}
