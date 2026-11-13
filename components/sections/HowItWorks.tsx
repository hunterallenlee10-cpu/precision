import { Tape, Ticks } from "../Tape";

const steps = [
  {
    title: "Tell us the project.",
    text: "Estimates are free, with no pressure, and we reply within one business day.",
  },
  {
    title: "Get a clear quote.",
    text: "Clear communication from quote to cleanup.",
  },
  {
    title: "We build it and clean up.",
    // DRAFT: confirm guarantee terms with the owner
    text: "Workmanship guarantee on every project.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="section border-t border-line">
      <div className="wrap">
        <Tape tilt="r">How it works</Tape>
        <h2 id="steps-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[64px]">
          Three steps. No surprises.
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 lg:mt-16">
          {steps.map((s, i) => (
            <li key={s.title} className="relative md:pr-10">
              <div className="flex items-center gap-3">
                <span className="tape display flex h-12 min-w-12 items-center justify-center px-3 text-[26px] leading-none">
                  {i + 1}
                </span>
                {/* Tape-measure ticks run between the steps. */}
                <Ticks className="flex-1 text-ink/40" />
              </div>
              <h3 className="display mt-6 text-[24px] leading-[1.1] lg:text-[28px]">{s.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[17px] leading-[1.6] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
