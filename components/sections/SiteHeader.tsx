"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { EstimateButton } from "../EstimateButton";
import { Wordmark } from "../Wordmark";

export const navLinks = [
  { href: "/#who", label: "Who we work for" },
  { href: "/#how-we-build", label: "How we build" },
  { href: "/#services", label: "Services" },
  { href: "/#our-work", label: "Our work" },
  { href: "/#licence", label: "Licence" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const burger = burgerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const f = sheetRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Link href="/" aria-label="Precision Home Services, home" className="-my-2 py-2">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="py-3 hover:underline hover:decoration-tape hover:decoration-[3px] hover:underline-offset-[6px]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={business.telHref}
            className="hidden items-center gap-2 px-1 py-3 font-semibold sm:inline-flex"
          >
            <Phone aria-hidden="true" size={18} strokeWidth={2} />
            <span>{business.phoneDisplay}</span>
          </a>
          <EstimateButton className="hidden !min-h-[44px] !px-4 text-[15px] md:inline-flex" arrow={false} />
          <button
            ref={burgerRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-ink fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-ink-paper"
        >
          <div className="wrap flex h-[68px] items-center justify-between border-b border-ink-line">
            <span className="display text-[22px]">PRECISION</span>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink-paper"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" size={22} strokeWidth={2} />
            </button>
          </div>
          <nav aria-label="Menu" className="wrap flex-1 py-6">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-ink-line">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[64px] items-center justify-between gap-4 py-3"
                  >
                    <span className="display text-[26px]">{l.label}</span>
                    <span className="text-[13px] tabular-nums text-ink-muted">0{i + 1}</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-ink-line">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[64px] items-center py-3"
                >
                  <span className="display text-[26px]">Contact</span>
                </Link>
              </li>
            </ul>
            <div className="mt-8 grid gap-3">
              <EstimateButton className="w-full" />
              <a href={business.telHref} className="btn btn-ghost w-full">
                <Phone aria-hidden="true" size={18} strokeWidth={2} />
                Call {business.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
