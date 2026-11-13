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

export default function Home() {
  return (
    <>
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
