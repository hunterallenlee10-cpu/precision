import { ArrowUpRight, Fence, KeyRound, Sofa, Wrench } from "lucide-react";
import { photos } from "@/lib/photos";
import { services, type Service } from "@/lib/services";
import { EstimateButton } from "../EstimateButton";
import { Photo } from "../Photo";
import { Tape } from "../Tape";

// Bento placement on large screens. Mobile stacks, tablet is two columns.
const place: Record<string, string> = {
  "kitchen-remodeling": "lg:col-span-7 lg:row-start-1",
  "bathroom-remodeling": "lg:col-span-5 lg:row-start-1",
  "tile-and-flooring": "lg:col-span-4 lg:row-span-2 lg:row-start-2",
  "built-ins-and-carpentry": "lg:col-span-4 lg:row-start-2",
  "drywall-and-painting": "lg:col-span-4 lg:row-start-2",
  "doors-windows-trim": "lg:col-span-4 lg:row-start-3",
  "club-basements": "lg:col-span-4 lg:row-start-3",
  "stairs-railings-decks": "lg:col-span-4 lg:row-start-4",
  "rental-turnovers": "lg:col-span-4 lg:row-start-4",
  "repairs-handyman": "lg:col-span-4 lg:row-start-4",
};

const photoAspect: Record<Service["size"], string> = {
  large: "aspect-[4/3] lg:aspect-auto",
  tall: "aspect-[4/5] lg:aspect-auto",
  medium: "aspect-[16/10] lg:aspect-auto",
  small: "",
};

const icons = { stairs: Fence, key: KeyRound, wrench: Wrench };

function TileButton({ s }: { s: Service }) {
  // The stretched button makes the whole tile clickable while staying one real <button>.
  return (
    <EstimateButton
      variant="bare"
      project={s.project}
      ariaLabel={`Free estimate: ${s.name}`}
      className="group/btn mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold after:absolute after:inset-0 after:content-['']"
    >
      <span className="underline decoration-tape decoration-[3px] underline-offset-[6px]">Free estimate</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </EstimateButton>
  );
}

function Tile({ s }: { s: Service }) {
  const Icon = s.icon ? icons[s.icon] : null;
  const big = s.size === "large";
  return (
    <article
      id={s.id}
      className={`group card relative flex scroll-mt-24 flex-col overflow-hidden transition-colors hover:border-ink ${place[s.id]}`}
    >
      {s.photo ? (
        <div className={`relative min-h-0 flex-1 overflow-hidden border-b border-line ${photoAspect[s.size]}`}>
          <Photo
            photo={photos[s.photo]}
            fill
            sizes={
              big
                ? "(min-width: 1280px) 700px, (min-width: 1024px) 58vw, (min-width: 768px) 50vw, 94vw"
                : "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 94vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={s.photo === "p08" ? { objectPosition: "50% 78%" } : undefined}
          />
        </div>
      ) : null}
      {s.placeholder ? (
        <div className={`placeholder relative min-h-[180px] flex-1 p-5 ${photoAspect[s.size]}`}>
          <Sofa aria-hidden="true" size={28} strokeWidth={1.75} className="absolute right-5 top-5 text-muted" />
          <p className="max-w-[30ch] border-l-2 border-ink pl-3 text-[14px] leading-[1.5]">{s.placeholder}</p>
        </div>
      ) : null}
      <div className={`relative ${big ? "p-6 lg:p-7" : "p-5 lg:p-6"} ${s.size === "small" ? "flex h-full flex-col" : ""}`}>
        {Icon ? (
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-ink">
            <Icon aria-hidden="true" size={22} strokeWidth={1.75} />
          </span>
        ) : null}
        <h3 className={`display ${big ? "text-[26px] lg:text-[30px]" : "text-[21px] lg:text-[22px]"} leading-[1.1]`}>
          {s.name}
        </h3>
        {s.blurb ? <p className="mt-2 text-[16px] leading-[1.55] text-muted">{s.blurb}</p> : null}
        <div className={s.size === "small" ? "mt-auto" : ""}>
          <TileButton s={s} />
        </div>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section border-t border-line">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tape tilt="r">Services</Tape>
            <h2 id="services-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[72px]">
              What we do.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.6] text-muted">
            From a full kitchen to the punch list. Pick a service and tell us about it. Estimates are free.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[480px_390px_390px_auto] lg:gap-5">
          {services.map((s) => (
            <Tile key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
