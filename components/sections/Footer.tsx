import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageSquare, Phone, Mail } from "lucide-react";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { services } from "@/lib/services";
import { IS_LIVE } from "@/lib/site";

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="on-ink bg-ink pb-28 text-ink-paper md:pb-0">
      <div className="wrap grid gap-12 pb-12 pt-16 md:grid-cols-12 lg:pt-24">
        <div className="md:col-span-5 lg:col-span-4">
          {/* Logo always sits on a pure black plate so its cut-out box disappears. */}
          <div className="inline-block rounded-[2px] bg-[#000000] px-5 py-4">
            <Image
              src={photos.logo.src}
              alt={photos.logo.alt}
              width={photos.logo.width}
              height={photos.logo.height}
              sizes="200px"
              className="h-auto w-[200px]"
            />
          </div>
          <p className="display mt-7 text-[26px] leading-[1.05]">
            Built with precision.
            <br />
            Finished with pride.
          </p>
          <a href={business.telHref} className="display mt-8 block text-[32px] text-tape hover:underline sm:text-[36px]">
            {business.phoneDisplay}
          </a>
          <ul className="mt-4 grid gap-1 text-[16px]">
            <li>
              <a href={business.smsHref} className="inline-flex min-h-[44px] items-center gap-3 hover:underline">
                <MessageSquare aria-hidden="true" size={18} strokeWidth={2} className="text-tape" />
                Text {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-flex min-h-[44px] items-center gap-3 break-all hover:underline">
                <Mail aria-hidden="true" size={18} strokeWidth={2} className="shrink-0 text-tape" />
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-4">
          <h2 className="display-caps text-[12px] text-ink-muted">Visit or write</h2>
          <address className="mt-4 not-italic leading-[1.7]">
            {business.legalName}
            <br />
            {business.address.streetLine1}, {business.address.streetLine2}
            <br />
            {business.address.city}, {business.address.region} {business.address.postalCode}
          </address>
          <a href={business.directionsHref} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold underline decoration-tape decoration-2 underline-offset-4">
            <MapPin aria-hidden="true" size={18} strokeWidth={2} />
            Get directions to our Pasadena shop
          </a>
          <h2 className="display-caps mt-8 text-[12px] text-ink-muted">Hours</h2>
          {/* DRAFT: confirm hours with the owner */}
          <p className="mt-3">{business.hours}</p>
          <h2 className="display-caps mt-8 text-[12px] text-ink-muted">Where we work</h2>
          <p className="mt-3 text-ink-muted">{business.serviceAreaSentence}.</p>
        </div>

        <nav aria-label="Services" className="md:col-span-4">
          <h2 className="display-caps text-[12px] text-ink-muted">What we do</h2>
          <ul className="mt-3 grid gap-x-6">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} className="inline-flex min-h-[44px] items-center py-1 hover:underline">
                  {s.name}
                </a>
              </li>
            ))}
            <li>
              <Link href="/contact" className="inline-flex min-h-[44px] items-center py-1 font-semibold hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-4 border-t border-ink-line py-8 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-semibold text-ink-paper">{business.licence.number}</span>
            <span>© 2026 {business.legalName}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={business.facebookHref}
              aria-label="Precision Home Services on Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink-line text-ink-paper hover:border-tape"
            >
              <FacebookIcon />
            </a>
            <a
              href={business.telHref}
              aria-label={`Call ${business.phoneDisplay}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink-line text-ink-paper hover:border-tape"
            >
              <Phone aria-hidden="true" size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
        {!IS_LIVE ? (
          <p className="pb-8 text-[13px] text-ink-muted">Concept preview by Lee Enterprises Unlimited.</p>
        ) : null}
      </div>
    </footer>
  );
}
