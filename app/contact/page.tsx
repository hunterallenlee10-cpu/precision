import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { PlannerFlow } from "@/components/ProjectPlanner/PlannerFlow";
import { MarylandMap } from "@/components/MarylandMap";
import { Tape, Ticks } from "@/components/Tape";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/lib/business";
import { contactJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Precision Home Services | Pasadena, MD Remodeling",
  description:
    "Call, text or send your project to Precision Home Services in Pasadena, MD. Free estimates on remodeling and repairs, with a reply within one business day.",
  path: "/contact",
});

const tiles = [
  { href: business.telHref, Icon: Phone, label: "Call", value: business.phoneDisplay, note: "Talk it through." },
  { href: business.smsHref, Icon: MessageSquare, label: "Text", value: business.phoneDisplay, note: "Send photos too." },
  { href: `mailto:${business.email}`, Icon: Mail, label: "Email", value: business.email, note: "Plans and drawings." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section aria-labelledby="contact-title" className="pb-12 pt-10 sm:pt-16 lg:pb-16 lg:pt-20">
          <div className="wrap">
            <h1 id="contact-title">
              <span className="flex items-start gap-3 text-[12px] font-semibold uppercase leading-[1.6] tracking-[0.13em]">
                <span aria-hidden="true" className="mt-[5px] h-[10px] w-[18px] shrink-0 bg-tape" />
                <span>Contact Precision Home Services, home remodeling in Pasadena, MD</span>
              </span>{" "}
              <span className="display mt-5 block text-[42px] sm:text-[64px] lg:text-[80px]">Tell us about the project.</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.6] text-muted">
              Free, no-pressure estimates. We get back to you within one business day.
            </p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-14 lg:gap-5">
              {tiles.map(({ href, Icon, label, value, note }) => (
                <li key={label}>
                  <a href={href} className="card group flex h-full items-start gap-4 p-5 transition-colors hover:border-ink sm:flex-col sm:p-6">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-tape">
                      <Icon aria-hidden="true" size={22} strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="display block text-[24px] leading-none">{label}</span>
                      <span className="mt-2 block break-all font-semibold underline decoration-tape decoration-[3px] underline-offset-[5px]">
                        {value}
                      </span>
                      <span className="mt-1 block text-[15px] text-muted">{note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Ticks className="wrap text-ink/35" />

        <section aria-labelledby="planner-inline" className="section !pt-12 lg:!pt-16">
          <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Tape>Project Planner</Tape>
              <h2 id="planner-inline" className="display mt-5 text-[32px] sm:text-[40px]">
                Five quick questions.
              </h2>
              <div className="card mt-6 flex min-h-[600px] flex-col overflow-hidden">
                <PlannerFlow />
              </div>
            </div>

            <div className="grid content-start gap-5 lg:col-span-5">
              <article className="card p-6 lg:p-7">
                <h2 className="display text-[26px] leading-[1.1]">Find us.</h2>
                <address className="mt-5 flex gap-3 not-italic leading-[1.6]">
                  <MapPin aria-hidden="true" size={20} strokeWidth={1.75} className="mt-[3px] shrink-0" />
                  <span>
                    {business.legalName}
                    <br />
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
                <p className="mt-4 flex gap-3 leading-[1.6]">
                  <Phone aria-hidden="true" size={20} strokeWidth={1.75} className="mt-[3px] shrink-0" />
                  <a href={business.telHref} className="link font-semibold">
                    {business.phoneDisplay}
                  </a>
                </p>
                <a
                  href={business.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-6 w-full"
                >
                  <MapPin aria-hidden="true" size={18} strokeWidth={2} />
                  Get directions
                  <span className="sr-only">to 8009 Jumpers Hole Rd, Pasadena (opens Google Maps)</span>
                </a>
              </article>
              <article className="card p-6 lg:p-7">
                <h2 className="sr-only">Service area</h2>
                <MarylandMap />
              </article>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
