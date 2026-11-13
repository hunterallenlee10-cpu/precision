"use client";

import { Check, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { labelOf, smsHref, whereText, type PlannerState } from "./options";

type Props = {
  state: PlannerState;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  headingLevel: "h2" | "h3";
  headerSlot?: React.ReactNode;
};

export function PlannerSuccess({ state: s, headingRef, headingLevel: H, headerSlot }: Props) {
  const rows: [string, string | undefined][] = [
    ["Project", labelOf.project(s.project)],
    ["Property", labelOf.property(s.property)],
    ["Where", whereText(s)],
    ["Start", labelOf.start(s.start)],
    ["Name", s.name.trim()],
    ["Phone", s.phone.trim()],
    ["Email", s.email.trim() || undefined],
    ["Notes", s.notes.trim() || undefined],
  ];
  return (
    <div className="planner-step flex min-h-0 flex-1 flex-col overflow-y-auto">
      {headerSlot ? <div className="flex justify-end px-5 pt-4 sm:px-8">{headerSlot}</div> : null}
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {/* The check sits on a tape square: the accent is never a thin line on a light surface. */}
        <span className="tape inline-flex h-14 w-14 items-center justify-center">
          <Check aria-hidden="true" size={30} strokeWidth={2.5} />
        </span>
        {/* DRAFT: confirm reply method and timing with the owner */}
        <H ref={headingRef} tabIndex={-1} className="display mt-5 text-[28px] leading-[1.1] outline-none sm:text-[32px]">
          Got it. We will get back to you within one business day.
        </H>
        <p className="mt-3 text-[16px] text-muted">
          Want it to reach us right now? Tap Text now. Your answers are already filled in.
        </p>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-line py-5 text-[15px]">
          {rows
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-semibold">{k}</dt>
                <dd className="break-words text-muted">{v}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={business.telHref} className="btn btn-primary min-h-[60px] text-[18px]">
            <Phone aria-hidden="true" size={20} strokeWidth={2} />
            Call now
          </a>
          <a href={smsHref(s)} className="btn btn-ghost min-h-[60px] text-[18px]">
            <MessageSquare aria-hidden="true" size={20} strokeWidth={2} />
            Text now
          </a>
        </div>
        <p className="mt-4 text-[14px] text-muted">
          {business.phoneDisplay}. Photos help, so add a few to the text.
        </p>
      </div>
    </div>
  );
}
