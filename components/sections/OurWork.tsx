import { business } from "@/lib/business";
import { showerSet } from "@/lib/gallery";
import { photos } from "@/lib/photos";
import { Gallery } from "../Gallery/Gallery";
import { Photo } from "../Photo";
import { CornerTape, Tape } from "../Tape";

export function OurWork() {
  return (
    <section id="our-work" aria-labelledby="work-title" className="section border-t border-line">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tape>Our work</Tape>
            <h2 id="work-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[72px]">
              Our work.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.6] text-muted">
            Real jobs, real photos, finished and in progress. No stock images.
          </p>
        </div>

        {/* Featured set: three custom showers built for one customer. */}
        <div className="relative mb-16 rounded-[2px] border border-line bg-white p-5 sm:p-8 lg:mb-20 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="min-w-0 lg:col-span-4">
              <Tape as="p" className="sm:whitespace-nowrap">
                Three showers, one customer
              </Tape>
              <h3 className="display mt-6 text-[28px] leading-[1.08] sm:text-[34px]">Three custom tile showers.</h3>
              <blockquote className="mt-4 text-[17px] leading-[1.6] text-muted">
                <p>&ldquo;{business.lines.showers}&rdquo;</p>
              </blockquote>
            </div>
            <ul className="-mx-5 flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-8">
              {showerSet.map((k, i) => (
                <li key={k} className="relative w-[78%] shrink-0 snap-center sm:w-auto">
                  <Photo
                    photo={photos[k]}
                    sizes="(min-width: 1280px) 260px, (min-width: 640px) 30vw, 78vw"
                    className="rounded-[2px] border border-line"
                  />
                  <span className="display mt-3 block text-[14px]">Shower 0{i + 1}</span>
                  {i === 1 ? <CornerTape corner="tr" length={80} /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Gallery />
      </div>
    </section>
  );
}
