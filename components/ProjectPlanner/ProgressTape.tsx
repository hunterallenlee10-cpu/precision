// The planner's progress bar, drawn as a tape measure with an accent fill.
export function ProgressTape({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div
      role="progressbar"
      aria-label="Planner progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={step}
      aria-valuetext={`Step ${step} of ${total}`}
      className="relative mt-3 h-[18px] overflow-hidden rounded-[2px] border border-ink bg-white"
    >
      <div
        className="absolute inset-y-0 left-0 bg-tape transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
      <div aria-hidden="true" className="ticks absolute inset-x-0 top-0 !h-[10px] text-ink/70" />
    </div>
  );
}
