import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import type { ProjectTypeId, PropertyTypeId } from "@/lib/services";
import type { PhotoKey } from "@/lib/photos";
import { EstimateButton } from "../EstimateButton";
import { Photo } from "../Photo";
import { Tape } from "../Tape";

type Client = {
  title: string;
  text: string;
  button: string;
  property: PropertyTypeId;
  project?: ProjectTypeId;
  photo?: PhotoKey;
  placeholder?: string;
};

const clients: Client[] = [
  {
    title: "Homeowners",
    text: "Kitchens, bathrooms, club basements and the punch list you keep putting off.",
    button: "Plan a home project",
    property: "home",
    photo: "p03",
  },
  {
    title: "Landlords and property managers",
    text: "Rental turnovers, ongoing maintenance and upkeep, so the unit is ready for the next tenant.",
    button: "Plan a rental turnover",
    property: "rental",
    project: "turnover",
    photo: "p02",
  },
  {
    title: "Historic homes",
    text: "Doors, windows and trim, including projects with historical oversight (C.H.A.P.).",
    button: "Talk through a historic project",
    property: "historic",
    placeholder: "Photo: door, window or trim work on a historic home, from Precision Home Services",
  },
];

export function WhoWeWorkFor() {
  return (
    <section id="who" aria-labelledby="who-title" className="on-ink section bg-ink text-ink-paper">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Tape>Who we work for</Tape>
            <h2 id="who-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[64px]">
              One crew.
              <br />
              Three kinds of client.
            </h2>
          </div>
          <p className="max-w-[46ch] text-[18px] leading-[1.6] text-ink-muted lg:col-span-5 lg:col-start-8">
            Precision Home Services is a licensed home remodeling and repair contractor in Pasadena,
            Maryland, working across Anne Arundel County, Baltimore and the rest of the state.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {clients.map((c, i) => (
            <li key={c.title} className="flex flex-col rounded-[2px] border border-ink-line bg-[#111b29]">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-ink-line">
                {c.photo ? (
                  <Photo
                    photo={photos[c.photo]}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 94vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-end bg-[#16212f] bg-[repeating-linear-gradient(-45deg,rgb(243_241_234/0.05)_0_1px,transparent_1px_12px)] p-5">
                    <p className="max-w-[30ch] border-l-2 border-tape pl-3 text-[14px] leading-[1.5] text-ink-muted">
                      {c.placeholder}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <p aria-hidden="true" className="display text-[15px] text-tape">
                  0{i + 1}
                </p>
                <h3 className="display mt-3 text-[24px] leading-[1.08] lg:text-[26px]">{c.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-ink-muted">{c.text}</p>
                <div className="mt-auto pt-7">
                  <EstimateButton
                    variant="ghost"
                    label={c.button}
                    property={c.property}
                    project={c.project}
                    className="w-full justify-between"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* C.H.A.P. checked against the official source, Nov 2026: https://www.baltimorecity.gov/chap/
            "The Commission for Historical and Architectural Preservation (CHAP) was created in 1964."
            Nothing here about approval, permits or timelines. */}
        <p className="mt-8 max-w-[80ch] text-[14px] leading-[1.6] text-ink-muted">
          <span className="font-semibold text-ink-paper">On C.H.A.P.:</span> {business.chap.plain}{" "}
          {business.chap.disclaimer}
        </p>
      </div>
    </section>
  );
}
