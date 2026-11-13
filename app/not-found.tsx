import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Tape } from "@/components/Tape";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Precision Home Services" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="section">
        <div className="wrap max-w-[860px]">
          <Tape>Error 404</Tape>
          <h1 className="display mt-6 text-[44px] sm:text-[72px]">This wall isn&rsquo;t on the plan.</h1>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.6] text-muted">
            The page you asked for does not exist. Head back to the home page or give us a call.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to the home page
            </Link>
            <a href={business.telHref} className="btn btn-ghost">
              <Phone aria-hidden="true" size={18} strokeWidth={2} />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
