"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery, galleryFilters, type GalleryFilter } from "@/lib/gallery";
import { photos } from "@/lib/photos";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter our work" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {galleryFilters.map((f) => {
          const count = f === "All" ? gallery.length : gallery.filter((g) => g.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-[2px] border px-4 text-[15px] font-medium transition-colors ${
                active ? "border-tape bg-tape text-ink" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {f}
              <span className={`text-[13px] tabular-nums ${active ? "text-ink" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {items.length} photos{filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
        {items.map((g, i) => {
          const ph = photos[g.photo];
          return (
            <li key={g.photo} className="mb-4 break-inside-avoid lg:mb-5">
              <figure className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full cursor-zoom-in"
                  aria-label={`Open larger: ${g.caption}`}
                >
                  <Image
                    src={ph.src}
                    alt={ph.alt}
                    width={ph.width}
                    height={ph.height}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 94vw"
                    className="h-auto w-full transition-opacity group-hover:opacity-90"
                    style={{ maxWidth: ph.width }}
                  />
                </button>
                <figcaption className="flex items-baseline justify-between gap-3 border-t border-line px-4 py-3 text-[15px]">
                  <span>{g.caption}</span>
                  <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {g.category}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {open !== null ? (
        <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      ) : null}
    </div>
  );
}
