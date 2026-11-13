import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";
import { business } from "@/lib/business";
import { Tape } from "../Tape";

// Native <details> accordion: keyboard and screen reader friendly with no JavaScript.
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-t border-line">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Tape tilt="r">FAQ</Tape>
          <h2 id="faq-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[60px]">
            Straight answers.
          </h2>
          <p className="mt-5 max-w-[34ch] text-[17px] leading-[1.6] text-muted">
            Something else on your mind? Call or text{" "}
            <a href={business.telHref} className="link font-semibold text-ink">
              {business.phoneDisplay}
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-ink">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[18px] font-semibold leading-[1.35] sm:text-[20px]">{f.q}</h3>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-line transition-colors group-open:border-tape group-open:bg-tape">
                      <Plus aria-hidden="true" size={20} strokeWidth={2} className="transition-transform group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 pr-14 text-[17px] leading-[1.65] text-muted">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
