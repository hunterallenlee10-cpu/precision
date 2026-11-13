// The wordmark set in type, never the logo PNG. "PRECISION" over a strip of tape.
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className={`display ${big ? "text-[44px]" : "text-[22px] sm:text-[24px]"} tracking-[0.01em]`}>
        PRECISION
      </span>
      <span
        className={`tape ${big ? "mt-2 px-3 py-[5px] text-[13px]" : "mt-[5px] px-2 py-[3px] text-[10px]"} display-caps !tracking-[0.2em] leading-none`}
      >
        Home Services LLC
      </span>
    </span>
  );
}
