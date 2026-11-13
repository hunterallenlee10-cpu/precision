"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { EstimateButton } from "../EstimateButton";
import { CornerTape } from "../Tape";
import { stages } from "./stages";

const LAST = stages.length - 1;
const STEP_MS = 1400;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

// Motion here is plain CSS (opacity cross-fade, 350ms) so the tool adds no animation library to the page.
export function BuildStages() {
  const reduce = usePrefersReducedMotion();
  // Server render and reduced motion: rest on the finished wall.
  const [stage, setStage] = useState(LAST);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const played = useRef(false);

  const stopAuto = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Auto-play once, 1 to 2 to 3, the first time the tool scrolls into view.
  useEffect(() => {
    if (played.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Only rewind to stage 1 if the visitor has not already seen the tool.
    if (rect.top > window.innerHeight) setStage(0);
    else return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        timers.current.push(window.setTimeout(() => setStage(1), STEP_MS));
        timers.current.push(window.setTimeout(() => setStage(2), STEP_MS * 2));
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopAuto();
    };
  }, []);

  const go = (i: number) => {
    played.current = true;
    stopAuto();
    setStage(Math.max(0, Math.min(LAST, i)));
  };

  const s = stages[stage];
  const pct = (stage / LAST) * 100;

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Photo frame, fixed 3:4, no wider than 520px. */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-line bg-white">
              {stages.map((st, i) => (
                <div
                  key={st.n}
                  className={`absolute inset-0 transition-opacity ease-out ${reduce ? "duration-0" : "duration-[350ms]"} ${
                    i === stage ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== stage}
                >
                  <Image
                    src={photos[st.photo].src}
                    alt={photos[st.photo].alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 94vw"
                    className="object-cover"
                    style={{ objectPosition: st.position }}
                  />
                </div>
              ))}
            </div>
            <CornerTape corner="tl" length={120} />
            <span
              aria-hidden="true"
              className="tape tape-label absolute bottom-5 right-[-10px] z-10 tape-tilt-r"
            >
              Stage {s.n} of 3
            </span>
          </div>
        </div>

        {/* Readout and control. */}
        <div className="lg:col-span-6 lg:pl-4">
          <div aria-live="polite" className="min-h-[150px] sm:min-h-[118px]">
            <div key={s.n} className="stage-readout flex items-start gap-5">
                {/* The number sits on tape: the accent is never text on a light surface. */}
                <span className="tape display flex h-[76px] min-w-[76px] items-center justify-center px-3 text-[52px] leading-none">
                  {s.n}
                </span>
                <div>
                  <p className="display text-[30px] sm:text-[36px]">{s.name}</p>
                  <p className="mt-2 max-w-[40ch] text-[18px] leading-[1.55]">{s.line}</p>
                </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="stage-range" className="sr-only">
              Build stage
            </label>
            <input
              id="stage-range"
              type="range"
              min={0}
              max={LAST}
              step={1}
              value={stage}
              onChange={(e) => go(Number(e.target.value))}
              onPointerDown={() => {
                played.current = true;
                stopAuto();
              }}
              aria-valuetext={`Stage ${s.n} of 3: ${s.name}`}
              className="stage-range"
              style={{ ["--pct" as string]: `${pct}%` }}
            />
            <div className="mt-2 grid grid-cols-3">
              {stages.map((st, i) => (
                <button
                  key={st.n}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === stage}
                  className={`display-caps flex min-h-[44px] items-center text-[12px] ${
                    i === 0 ? "justify-start" : i === LAST ? "justify-end" : "justify-center"
                  } ${i === stage ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  <span className={`border-b-[3px] pb-1 ${i === stage ? "border-tape" : "border-transparent"}`}>
                    {st.n} {st.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <blockquote className="mt-8 border-l-2 border-line pl-4 text-[15px] leading-[1.6] text-muted">
            <p>&ldquo;{business.lines.mediaWall}&rdquo;</p>
          </blockquote>

          <EstimateButton label="Plan a built-in like this" project="builtins" className="mt-8 w-full sm:w-auto" />
        </div>
    </div>
  );
}
