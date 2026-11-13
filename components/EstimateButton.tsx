"use client";

import { ArrowRight } from "lucide-react";
import { usePlanner, type PlannerPreset } from "./ProjectPlanner/PlannerContext";

type Props = PlannerPreset & {
  label?: string;
  className?: string;
  variant?: "primary" | "ghost" | "bare";
  arrow?: boolean;
  children?: React.ReactNode;
  ariaLabel?: string;
};

// Anything that opens the Project Planner is a real <button>, never a link.
export function EstimateButton({
  project,
  property,
  label = "Get My Free Estimate",
  className = "",
  variant = "primary",
  arrow = true,
  children,
  ariaLabel,
}: Props) {
  const { openPlanner } = usePlanner();
  const base = variant === "bare" ? "" : `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      className={`${base} ${className}`}
      onClick={() => openPlanner({ project, property })}
    >
      {children ?? (
        <>
          <span>{label}</span>
          {arrow ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /> : null}
        </>
      )}
    </button>
  );
}
