"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { PlannerPreset } from "./PlannerContext";
import {
  areaChips,
  emailError,
  labelOf,
  phoneError,
  projectTypes,
  propertyTypes,
  startOptions,
  type PlannerState,
} from "./options";
import { PlannerSuccess } from "./PlannerSuccess";
import { ProgressTape } from "./ProgressTape";

const TOTAL = 5;
const titles = [
  "What is the project?",
  "What kind of property?",
  "Where is it?",
  "When do you want to start?",
  "Your info",
];

type Props = {
  preset?: PlannerPreset;
  headingLevel?: "h2" | "h3";
  headerSlot?: React.ReactNode;
};

export function PlannerFlow({ preset = {}, headingLevel = "h2", headerSlot }: Props) {
  const uid = useId();
  const [s, setS] = useState<PlannerState>({
    project: preset.project,
    property: preset.property,
    town: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  // Open on the first question that is not already answered by the button that opened it.
  const [step, setStep] = useState(() => (!preset.project ? 0 : preset.property ? 2 : 1));
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState<{ phone?: boolean; email?: boolean; name?: boolean }>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const H = headingLevel;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, done]);

  const set = <K extends keyof PlannerState>(k: K, v: PlannerState[K]) => setS((prev) => ({ ...prev, [k]: v }));
  const canNext = [
    !!s.project,
    !!s.property,
    !!(s.area || s.town.trim()),
    !!s.start,
    !!s.name.trim() && !phoneError(s.phone) && !emailError(s.email),
  ][step];

  const next = () => setStep((n) => Math.min(TOTAL - 1, n + 1));
  const back = () => setStep((n) => Math.max(0, n - 1));
  // Tapping an answer moves on by itself. Arrow keys in the radio group only select, so keyboard
  // users are never skipped past a question.
  const lastPointer = useRef(0);
  const pickAndGo = (fn: () => void) => {
    fn();
    if (Date.now() - lastPointer.current < 800) window.setTimeout(next, 160);
  };
  const markPointer = () => (lastPointer.current = Date.now());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ phone: true, email: true, name: true });
    if (step < TOTAL - 1) {
      if (canNext) next();
      return;
    }
    if (!canNext) return;
    setDone(true);
  };

  if (done) {
    return <PlannerSuccess state={s} headingRef={headingRef} headingLevel={H} headerSlot={headerSlot} />;
  }

  const answered = [labelOf.project(s.project), labelOf.property(s.property)].filter(Boolean);
  const phoneErr = touched.phone ? phoneError(s.phone) : "";
  const emailErr = touched.email ? emailError(s.email) : "";
  const nameErr = touched.name && !s.name.trim() ? "Tell us who to ask for." : "";

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line px-5 pb-5 pt-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="display-caps text-[12px]">
            Step {step + 1} of {TOTAL}
          </p>
          {headerSlot}
        </div>
        <ProgressTape step={step + 1} total={TOTAL} />
        {answered.length && step > 0 ? (
          <p className="mt-3 truncate text-[14px] text-muted">{answered.slice(0, step).join(" · ")}</p>
        ) : null}
      </div>

      <div key={step} className="planner-step flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        <H ref={headingRef} tabIndex={-1} id={`${uid}-title`} className="display text-[28px] leading-[1.1] outline-none sm:text-[32px]">
          {titles[step]}
        </H>

        {step === 0 ? (
          <Choices
            onPointer={markPointer}
            name={`${uid}-project`}
            legend={titles[0]}
            options={projectTypes}
            value={s.project}
            onPick={(id) => pickAndGo(() => set("project", id))}
          />
        ) : null}

        {step === 1 ? (
          <Choices
            onPointer={markPointer}
            name={`${uid}-property`}
            legend={titles[1]}
            options={propertyTypes}
            value={s.property}
            onPick={(id) => pickAndGo(() => set("property", id))}
          />
        ) : null}

        {step === 2 ? (
          <div className="mt-6">
            <label htmlFor={`${uid}-town`} className="block text-[16px] font-semibold">
              Town or ZIP
            </label>
            <input
              id={`${uid}-town`}
              type="text"
              autoComplete="postal-code"
              value={s.town}
              onChange={(e) => set("town", e.target.value)}
              placeholder="e.g. Pasadena or 21122"
              className="field mt-2"
            />
            <fieldset className="mt-6">
              <legend className="text-[16px] font-semibold">Or pick an area</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {areaChips.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={s.area === a}
                    onClick={() => set("area", s.area === a ? undefined : a)}
                    className={`chip ${s.area === a ? "chip-on" : ""}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 3 ? (
          <Choices
            onPointer={markPointer}
            name={`${uid}-start`}
            legend={titles[3]}
            options={startOptions}
            value={s.start}
            onPick={(id) => pickAndGo(() => set("start", id))}
          />
        ) : null}

        {step === 4 ? (
          <div className="mt-6 grid gap-5">
            <Field id={`${uid}-name`} label="Your name" error={nameErr}>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                required
                value={s.name}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                aria-invalid={!!nameErr}
                aria-describedby={nameErr ? `${uid}-name-err` : undefined}
                className="field"
              />
            </Field>
            <Field id={`${uid}-phone`} label="Phone" hint="Required. We call or text you back." error={phoneErr}>
              <input
                id={`${uid}-phone`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={s.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                aria-invalid={!!phoneErr}
                aria-describedby={`${uid}-phone-hint${phoneErr ? ` ${uid}-phone-err` : ""}`}
                className="field"
              />
            </Field>
            <Field id={`${uid}-email`} label="Email (optional)" error={emailErr}>
              <input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                value={s.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={!!emailErr}
                aria-describedby={emailErr ? `${uid}-email-err` : undefined}
                className="field"
              />
            </Field>
            <Field id={`${uid}-notes`} label="Notes (optional)">
              <textarea
                id={`${uid}-notes`}
                rows={3}
                value={s.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Sizes, what's there now, anything we should know."
                className="field min-h-[96px] py-3"
              />
            </Field>
            <p className="border-l-2 border-ink pl-3 text-[15px] text-muted">
              Photos help. You can text them to us after you send this.
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-paper px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn btn-ghost !px-4 disabled:invisible"
        >
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={2} />
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          {step === TOTAL - 1 ? (
            <>
              Send my request <Check aria-hidden="true" size={18} strokeWidth={2.25} />
            </>
          ) : (
            <>
              Next <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Choices<T extends string>({
  name,
  legend,
  options,
  value,
  onPick,
  onPointer,
}: {
  onPointer: () => void;
  name: string;
  legend: string;
  options: readonly { id: T; label: string }[];
  value?: T;
  onPick: (id: T) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <label key={o.id} className={`option ${on ? "option-on" : ""}`} onPointerDown={onPointer}>
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={on}
                onChange={() => onPick(o.id)}
                onClick={() => on && onPick(o.id)}
                className="sr-only"
              />
              <span aria-hidden="true" className="option-dot" />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[16px] font-semibold">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[14px] text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-2 border-l-2 border-ink pl-3 text-[15px] font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
