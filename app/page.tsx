import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { WhoWeWorkFor } from "@/components/sections/WhoWeWorkFor";
import { HowWeBuild } from "@/components/sections/HowWeBuild";
import { Services } from "@/components/sections/Services";
import { OurWork } from "@/components/sections/OurWork";
import { Licence } from "@/components/sections/Licence";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homeJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Home Remodeling in Pasadena, MD | Precision Home Services";
const description =
  "Kitchens, bathrooms, tile, drywall, decks and rental turnovers in Pasadena and across Maryland. Licensed and insured, MHIC #161406. Get a free estimate today.";

export const metadata: Metadata = pageMeta({ title, description, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhoWeWorkFor />
        <HowWeBuild />
        <Services />
        <OurWork />
        <Licence />
        <HowItWorks />
        <QuoteBand />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
