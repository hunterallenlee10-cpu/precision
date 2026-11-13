import { business } from "@/lib/business";
import { EstimateButton } from "../EstimateButton";
import { Tape } from "../Tape";

export function QuoteBand() {
  return (
    <section aria-label="In his words" className="on-ink section bg-ink text-ink-paper">
      <div className="wrap">
        <Tape as="p">In his words</Tape>
        <blockquote className="mt-8 lg:mt-10">
          <p className="display max-w-[20ch] text-[36px] leading-[1.04] sm:text-[56px] lg:text-[80px]">
            &ldquo;Understanding the need for exceptional service at an{" "}
            <span className="text-tape">affordable price.</span>&rdquo;
          </p>
          <footer className="mt-6 text-[16px] text-ink-muted">{business.name}, on Facebook</footer>
        </blockquote>
        <div className="mt-10 flex flex-col gap-5 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-[22px] sm:text-[26px]">Free, no-pressure estimates.</p>
          <EstimateButton className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
