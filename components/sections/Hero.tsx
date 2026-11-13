import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { EstimateButton } from "../EstimateButton";
import { Photo } from "../Photo";
import { Ticks } from "../Tape";

const facts = ["MHIC #161406", "Licensed and insured in Maryland", "Free, no-pressure estimates"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div className="wrap grid items-center gap-x-10 pb-14 pt-7 sm:pt-12 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-5">
          {/* The eyebrow and headline together are the page's single h1. */}
          <h1 id="hero-title">
            <span className="flex items-start gap-3 text-[12px] font-semibold uppercase leading-[1.6] tracking-[0.13em]">
              <span aria-hidden="true" className="mt-[5px] h-[10px] w-[18px] shrink-0 bg-tape" />
              <span>
                <span className="whitespace-nowrap">Home remodeling in Pasadena, MD</span>
                <span aria-hidden="true" className="hidden xl:inline"> · </span>{" "}
                <span className="block whitespace-nowrap xl:inline">Serving Maryland</span>
              </span>
            </span>{" "}
            <span className="display mt-4 block text-[42px] sm:mt-6 sm:text-[64px] lg:text-[60px] xl:text-[72px]">
              <span className="block">Built with precision.</span>{" "}
              <span className="mt-1 block sm:mt-2">Finished with pride.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[36ch] text-[17px] leading-[1.55] text-muted sm:mt-7 sm:text-[19px]">
            Kitchens, baths, club basements, tile, trim and rental turnovers.
            <span className="hidden sm:inline">
              {" "}
              One licensed Maryland crew that shows up and stands behind the work.
            </span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <EstimateButton className="w-full sm:w-auto" />
            <a href={business.telHref} className="btn btn-ghost hidden sm:inline-flex">
              <Phone aria-hidden="true" size={18} strokeWidth={2} />
              Call {business.phoneDisplay}
            </a>
          </div>

          <ul className="mt-10 hidden max-w-[520px] grid-cols-3 border-t border-ink sm:grid">
            {facts.map((f, i) => (
              <li
                key={f}
                className={`pr-4 pt-4 text-[12px] font-semibold uppercase leading-[1.45] tracking-[0.12em] ${i > 0 ? "border-l border-line pl-4" : ""}`}
              >
                <span aria-hidden="true" className="mb-2 block h-[3px] w-6 bg-tape" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 lg:col-span-7 lg:mt-0">
          <HeroPhotos />
        </div>

        <ul className="mt-14 grid gap-2 border-t border-line pt-5 text-[12px] font-semibold uppercase tracking-[0.14em] sm:hidden">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-4 bg-ink" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Ticks className="wrap text-ink/35" />
    </section>
  );
}

// Photo 01 in a taped frame, photo 04 overlapping its bottom-right corner, held by one strip.
// The four edge strips play the "tape-off": top, right, bottom, left, then the label presses on.
function HeroPhotos() {
  return (
    <div className="relative mx-auto w-full max-w-[760px] pb-[13%] pr-[3%] sm:pr-[5%]">
      <div className="relative">
        <Photo
          photo={photos.p01}
          priority
          sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 94vw"
          className="block rounded-[2px]"
        />
        {/* Tape-off strips. Decorative. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span
            className="tape-strip tapeoff tapeoff-top h-[14px] sm:h-[18px]"
            style={{ top: -8, left: -16, right: -12, ["--r" as string]: "-0.6deg" }}
          />
          <span
            className="tape-strip tape-strip-v tapeoff tapeoff-right !h-auto w-[14px] sm:w-[18px]"
            style={{ top: -14, bottom: -10, right: -8, ["--r" as string]: "0.5deg" }}
          />
          <span
            className="tape-strip tapeoff tapeoff-bottom h-[14px] sm:h-[18px]"
            style={{ bottom: -9, left: -10, right: -16, ["--r" as string]: "0.4deg" }}
          />
          <span
            className="tape-strip tape-strip-v tapeoff tapeoff-left !h-auto w-[14px] sm:w-[18px]"
            style={{ top: -10, bottom: -14, left: -8, ["--r" as string]: "-0.5deg" }}
          />
        </span>
        <span
          aria-hidden="true"
          className="tape tape-label tapeoff-label absolute bottom-[14%] left-[-8px] z-20 sm:left-[-14px]"
        >
          Our work. Kitchen remodel.
        </span>
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-[38%] sm:w-[36%]">
        <div className="relative border-[5px] border-white bg-white sm:border-[7px]">
          <Photo photo={photos.p04} sizes="(min-width: 1024px) 270px, 36vw" />
          <span
            aria-hidden="true"
            className="tape-strip left-1/2 top-[-12px] w-[46%] -translate-x-1/2 -rotate-[4deg]"
          />
        </div>
      </div>
    </div>
  );
}
