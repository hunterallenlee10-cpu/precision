"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { photos } from "@/lib/photos";

type Props = {
  items: GalleryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

export function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const item = items[index];
  const ph = photos[item.photo];
  const n = items.length;
  const prev = () => onIndex((index - 1 + n) % n);
  const next = () => onIndex((index + 1) % n);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
      else if (e.key === "ArrowRight") onIndex((index + 1) % n);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
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
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onClose, onIndex]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}: ${item.caption}`}
      className="on-ink fixed inset-0 z-[70] flex flex-col bg-ink text-ink-paper"
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="text-[14px] tabular-nums text-ink-muted">
          {index + 1} / {n}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink-line hover:border-tape"
        >
          <X aria-hidden="true" size={22} strokeWidth={2} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <figure className="flex max-h-full flex-col items-center">
          <Image
            key={ph.src}
            src={ph.src}
            alt={ph.alt}
            width={ph.width}
            height={ph.height}
            sizes="(min-width: 1440px) 1340px, 100vw"
            className="h-auto max-h-[calc(100dvh-170px)] w-auto select-none object-contain"
            style={{ maxWidth: `min(100%, ${ph.width}px)` }}
            draggable={false}
            loading="eager"
          />
          <figcaption className="mt-3 text-center text-[15px]">
            {item.caption} <span className="text-ink-muted">· {item.category}</span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[2px] border border-ink-line bg-ink hover:border-tape sm:inline-flex"
        >
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[2px] border border-ink-line bg-ink hover:border-tape sm:inline-flex"
        >
          <ChevronRight aria-hidden="true" size={24} strokeWidth={2} />
        </button>
      </div>
      <p className="pb-4 text-center text-[13px] text-ink-muted sm:hidden">Swipe for more</p>
    </div>
  );
}
