"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PlannerPreset } from "./PlannerContext";
import { PlannerFlow } from "./PlannerFlow";

type Props = { open: boolean; preset: PlannerPreset; onClose: () => void };

// The Project Planner modal: focus trapped, Esc closes, body scroll locked, focus returns on close.
export default function PlannerModal({ open, preset, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    // First focus: the step heading, so screen readers hear the question.
    window.setTimeout(() => {
      const h = ref.current?.querySelector<HTMLElement>("h2[tabindex='-1']");
      (h ?? focusables()[0])?.focus();
    }, 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active && ref.current?.contains(active);
      if (e.shiftKey && (active === first || !inside || active?.tabIndex === -1)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-stretch justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" className="planner-backdrop absolute inset-0 bg-ink/70" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Project Planner: get your free estimate"
        className="planner-panel relative flex h-full w-full flex-col bg-white sm:h-auto sm:max-h-[min(860px,calc(100dvh-48px))] sm:max-w-[680px] sm:rounded-[2px] sm:border sm:border-ink"
      >
        <PlannerFlow
          preset={preset}
          headerSlot={
            <button
              type="button"
              onClick={onClose}
              aria-label="Close the Project Planner"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[2px] hover:bg-paper"
            >
              <X aria-hidden="true" size={22} strokeWidth={2} />
            </button>
          }
        />
      </div>
    </div>
  );
}
