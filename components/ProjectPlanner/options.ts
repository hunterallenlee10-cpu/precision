import { business } from "@/lib/business";
import { projectTypes, propertyTypes, type ProjectTypeId, type PropertyTypeId } from "@/lib/services";

export { projectTypes, propertyTypes };

export const areaChips = [
  "Pasadena",
  "Anne Arundel County",
  "Baltimore",
  "Frederick",
  "Ocean City",
  "Washington, D.C.",
  "Elsewhere in Maryland",
] as const;

export const startOptions = [
  { id: "asap", label: "As soon as possible" },
  { id: "month", label: "Within a month" },
  { id: "quarter", label: "In 1 to 3 months" },
  { id: "planning", label: "Just planning" },
] as const;

export type StartId = (typeof startOptions)[number]["id"];

export type PlannerState = {
  project?: ProjectTypeId;
  property?: PropertyTypeId;
  area?: (typeof areaChips)[number];
  town: string;
  start?: StartId;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export const labelOf = {
  project: (id?: ProjectTypeId) => projectTypes.find((p) => p.id === id)?.label,
  property: (id?: PropertyTypeId) => propertyTypes.find((p) => p.id === id)?.label,
  start: (id?: StartId) => startOptions.find((p) => p.id === id)?.label,
};

export const whereText = (s: PlannerState) => [s.town.trim(), s.area].filter(Boolean).join(", ");

export function phoneDigits(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

export function phoneError(v: string) {
  const d = phoneDigits(v);
  if (!v.trim()) return "We need a number to call or text you back.";
  if (d.length !== 10) return "That number doesn't look right. Try all 10 digits, like 410 555 0123.";
  return "";
}

export function emailError(v: string) {
  if (!v.trim()) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "That email doesn't look right. Check it or leave it blank.";
}

// The request is front-end only, so the Text button carries every answer to his phone.
export function smsHref(s: PlannerState) {
  const lines = [
    "Hi Precision Home Services, I'd like a free estimate.",
    `Project: ${labelOf.project(s.project) ?? "Not sure yet"}`,
    `Property: ${labelOf.property(s.property) ?? "Not given"}`,
    `Where: ${whereText(s) || "Not given"}`,
    `Start: ${labelOf.start(s.start) ?? "Not given"}`,
    `Name: ${s.name.trim()}`,
    `Phone: ${s.phone.trim()}`,
    s.email.trim() ? `Email: ${s.email.trim()}` : "",
    s.notes.trim() ? `Notes: ${s.notes.trim()}` : "",
  ].filter(Boolean);
  // "?&body=" works on both iOS and Android.
  return `${business.smsHref}?&body=${encodeURIComponent(lines.join("\n"))}`;
}
