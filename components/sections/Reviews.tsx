import { Quote } from "lucide-react";
import { confirmedReview } from "@/lib/business";
import { Tape } from "../Tape";

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <Tape>Reviews</Tape>
        <h2 id="reviews-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[64px]">
          What customers say.
        </h2>

        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* DRAFT: confirm this review is real and where it was left. Taken from his current site. */}
          <li className="card flex flex-col p-6 sm:p-8 lg:col-span-6">
            <Quote aria-hidden="true" size={28} strokeWidth={1.75} />
            <blockquote className="mt-5 flex-1">
              <p className="display text-[24px] leading-[1.2] sm:text-[30px]">&ldquo;{confirmedReview.quote}&rdquo;</p>
            </blockquote>
            <p className="mt-8 border-t border-line pt-5 text-[16px]">
              <span className="font-semibold">{confirmedReview.author}</span>
              <span className="text-muted">, {confirmedReview.place}</span>
            </p>
          </li>

          {[1, 2].map((n) => (
            <li key={n} className="placeholder flex flex-col items-stretch p-6 sm:p-8 lg:col-span-3">
              <p className="tape tape-label self-start">Sample review</p>
              <p className="mt-6 flex-1 text-[16px] leading-[1.6]">
                Sample review: replace with real Google reviews. A customer&rsquo;s own words about their project go here.
              </p>
              <p className="mt-6 border-t border-[#b9b4a6] pt-4 text-[15px]">Customer name, town</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
