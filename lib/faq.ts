import { serviceListSentence } from "./services";

// Visible FAQ and the FAQPage JSON-LD both read from this list, so they always match word for word.
// Answers use only facts from lib/business.ts.
export const faqs: { q: string; a: string; draft?: string }[] = [
  {
    q: "Are you licensed and insured?",
    a: "Yes. Licensed and insured in Maryland, MHIC #161406. You can look the number up with the Maryland Home Improvement Commission.",
  },
  {
    q: "Where do you work?",
    a: "We are based in Pasadena and work across Anne Arundel County, Baltimore, Frederick, Ocean City, Washington, D.C. and the rest of Maryland.",
  },
  {
    q: "Does an estimate cost anything?",
    a: "No. Estimates are free, with no pressure.",
  },
  {
    q: "What kinds of projects do you take on?",
    a: serviceListSentence,
  },
  {
    q: "Do you work on historic homes?",
    a: "Yes. We do doors, windows and trim, including projects with historical oversight (C.H.A.P.). Call or text and we will talk through yours.",
  },
  {
    q: "Do you work with landlords and property managers?",
    a: "Yes. Rental turnovers, ongoing maintenance and upkeep.",
  },
  {
    q: "How fast will I hear back?",
    a: "Within one business day.",
  },
  {
    q: "Is the work guaranteed?",
    a: "Every project carries our workmanship guarantee. Ask us for the details when we quote.",
    draft: "DRAFT: confirm guarantee terms with the owner",
  },
];
