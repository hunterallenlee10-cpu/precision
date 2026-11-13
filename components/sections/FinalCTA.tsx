import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { EstimateButton } from "../EstimateButton";
import { Photo } from "../Photo";
import { CornerTape } from "../Tape";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="on-ink section border-b border-ink-line bg-ink text-ink-paper">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="cta-title" className="display text-[40px] sm:text-[56px] lg:text-[64px]">
            Let&rsquo;s talk about your next project.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.6] text-ink-muted">
            Send it over and we will get back to you within one business day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <EstimateButton className="w-full sm:w-auto" />
            <a href={business.telHref} className="btn btn-ghost w-full sm:w-auto">
              <Phone aria-hidden="true" size={18} strokeWidth={2} />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative mx-auto w-[90%] max-w-[640px] sm:w-full">
            <Photo photo={photos.p02} sizes="(min-width: 1024px) 600px, 94vw" className="rounded-[2px]" />
            <CornerTape corner="tl" length={110} />
            <CornerTape corner="br" length={110} />
          </div>
        </div>
      </div>
    </section>
  );
}
