import Image from "next/image";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { Photo } from "../Photo";
import { CornerTape, Tape } from "../Tape";

// This section exists because his current site shows no address and an AI stranger in place of proof.
export function Licence() {
  return (
    <section id="licence" aria-labelledby="licence-title" className="section border-t border-line">
      <div className="wrap">
        <div className="mb-12 max-w-[860px] lg:mb-16">
          <Tape>Licence and proof</Tape>
          <h2 id="licence-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[72px]">
            Licensed. Local.
            <br />
            Nothing hidden.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Licence card: the logo only ever sits on a pure black plate. */}
          <article className="card flex flex-col overflow-hidden lg:col-span-4">
            <div className="flex items-center justify-center bg-[#000000] px-8 py-8">
              <Image
                src={photos.logo.src}
                alt={photos.logo.alt}
                width={photos.logo.width}
                height={photos.logo.height}
                sizes="260px"
                className="h-auto w-[240px]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 lg:p-7">
              <h3 className="display text-[34px] leading-none">{business.licence.number}</h3>
              <p className="mt-3 text-[17px]">{business.licence.wording}.</p>
              <p className="mt-1 text-[15px] text-muted">
                Issued by the {business.licence.body}. Search by licence number {business.licence.numberPlain}.
              </p>
              <div className="mt-auto pt-6">
                <a
                  href={business.licence.lookupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-block py-2 font-semibold leading-[1.5]"
                >
                  Check our licence with the State of Maryland
                  <ExternalLink aria-hidden="true" size={16} strokeWidth={2} className="ml-2 inline-block align-[-2px]" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>

          {/* Behind the tile: the part of a shower nobody sees. Not claimed to be the same shower. */}
          <article className="card p-5 sm:p-6 lg:col-span-5 lg:p-7">
            <h3 className="display text-[24px] leading-[1.1] lg:text-[26px]">Behind the tile.</h3>
            <p className="mt-2 text-[16px] text-muted">The part of a shower nobody sees, done before the part everybody does.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <figure className="relative">
                <Photo photo={photos.p13} sizes="(min-width: 1280px) 250px, (min-width: 1024px) 20vw, 45vw" className="rounded-[2px]" />
                <CornerTape corner="tl" length={70} />
                <figcaption className="mt-3 text-[14px] leading-[1.45] sm:text-[15px]">
                  Before tile. Waterproofed edge to edge.
                </figcaption>
              </figure>
              <figure>
                <Photo photo={photos.p11} sizes="(min-width: 1280px) 250px, (min-width: 1024px) 20vw, 45vw" className="rounded-[2px]" />
                <figcaption className="mt-3 text-[14px] leading-[1.45] sm:text-[15px]">After. The part you see.</figcaption>
              </figure>
            </div>
          </article>

          {/* Location card. Name, address and phone written exactly as everywhere else. */}
          <article className="card flex flex-col p-6 lg:col-span-3 lg:p-7">
            <h3 className="display text-[24px] leading-[1.1] lg:text-[26px]">Find us.</h3>
            <address className="mt-5 flex gap-3 not-italic leading-[1.6]">
              <MapPin aria-hidden="true" size={20} strokeWidth={1.75} className="mt-[3px] shrink-0" />
              <span>
                {business.address.streetLine1}, {business.address.streetLine2}
                <br />
                {business.address.city}, {business.address.region} {business.address.postalCode}
              </span>
            </address>
            {/* DRAFT: confirm hours with the owner */}
            <p className="mt-4 flex gap-3 leading-[1.6]">
              <Clock aria-hidden="true" size={20} strokeWidth={1.75} className="mt-[3px] shrink-0" />
              <span>{business.hours}</span>
            </p>
            <p className="mt-4 border-t border-line pt-4 text-[15px] leading-[1.6] text-muted">
              Based in Pasadena, {business.address.county}. Working across Maryland.
            </p>
            <div className="mt-auto grid gap-2 pt-6">
              <a href={business.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                <MapPin aria-hidden="true" size={18} strokeWidth={2} />
                Get directions
                <span className="sr-only">to 8009 Jumpers Hole Rd, Pasadena (opens Google Maps)</span>
              </a>
              <a href={business.telHref} className="btn btn-ghost w-full">
                <Phone aria-hidden="true" size={18} strokeWidth={2} />
                Call {business.phoneDisplay}
              </a>
            </div>
          </article>
        </div>

        <div className="placeholder mt-5 min-h-[160px] p-5 sm:p-6 lg:mt-6 lg:min-h-[200px]">
          <p className="border-l-2 border-ink pl-3 text-[14px]">Photo: the crew and the truck, from Precision Home Services</p>
        </div>
      </div>
    </section>
  );
}
