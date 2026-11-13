import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
