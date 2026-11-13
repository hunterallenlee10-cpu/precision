import type { PhotoKey } from "./photos";

// Planner step 1 options. The `id` is what tiles and buttons pass to pre-select a project.
export const projectTypes = [
  { id: "kitchen", label: "Kitchen remodel" },
  { id: "bathroom", label: "Bathroom remodel" },
  { id: "flooring", label: "Tile, laminate or carpet" },
  { id: "basement", label: "Club basement" },
  { id: "drywall", label: "Drywall and painting" },
  { id: "doors", label: "Doors, windows and trim" },
  { id: "builtins", label: "Built-ins, trim and accent walls" },
  { id: "decks", label: "Stairs, railings or deck" },
  { id: "turnover", label: "Rental turnover" },
  { id: "repairs", label: "Repairs and punch list" },
  { id: "other", label: "Something else" },
] as const;

export type ProjectTypeId = (typeof projectTypes)[number]["id"];

export const propertyTypes = [
  { id: "home", label: "My home" },
  { id: "rental", label: "A rental I own" },
  { id: "managed", label: "A property I manage" },
  { id: "historic", label: "A historic home" },
] as const;

export type PropertyTypeId = (typeof propertyTypes)[number]["id"];

export type Service = {
  id: string; // stable anchor id, so each tile can become its own page later
  name: string;
  blurb?: string;
  size: "large" | "tall" | "medium" | "small";
  photo?: PhotoKey;
  placeholder?: string;
  icon?: "stairs" | "key" | "wrench";
  project: ProjectTypeId;
  schemaDescription: string;
};

export const services: Service[] = [
  {
    id: "kitchen-remodeling",
    name: "Kitchen remodels",
    blurb: "Cabinets, counters, backsplash, flooring, lighting.",
    size: "large",
    photo: "p01",
    project: "kitchen",
    schemaDescription: "Kitchen remodeling: cabinets, counters, backsplash, flooring and lighting.",
  },
  {
    id: "bathroom-remodeling",
    name: "Bathroom remodels",
    blurb: "Showers, tubs, vanities, tile.",
    size: "large",
    photo: "p03",
    project: "bathroom",
    schemaDescription: "Bathroom remodeling: showers, tubs, vanities and tile.",
  },
  {
    id: "tile-and-flooring",
    name: "Tile, laminate and carpet",
    blurb: "Custom tile showers, backsplashes and floors.",
    size: "tall",
    photo: "p11",
    project: "flooring",
    schemaDescription: "Carpet, laminate and tile, including custom tile showers, backsplashes and floors.",
  },
  {
    id: "built-ins-and-carpentry",
    name: "Built-ins and finish carpentry",
    blurb: "Media walls, accent walls, framing.",
    size: "medium",
    photo: "p08",
    project: "builtins",
    schemaDescription: "Framing, built-ins, media walls, accent walls and finish carpentry.",
  },
  {
    id: "drywall-and-painting",
    name: "Drywall and painting",
    blurb: "Repair, installation, interior and exterior paint.",
    size: "medium",
    photo: "p05",
    project: "drywall",
    schemaDescription: "Drywall repair and installation, interior and exterior painting.",
  },
  {
    id: "doors-windows-trim",
    name: "Doors, windows and trim",
    blurb: "Including historic projects under C.H.A.P. oversight.",
    size: "medium",
    photo: "p16",
    project: "doors",
    schemaDescription:
      "Doors, windows and trim, including projects with historical oversight (C.H.A.P.).",
  },
  {
    id: "club-basements",
    name: "Club basements",
    blurb: "Small spaces can add big value.",
    size: "medium",
    placeholder: "Photo: a finished club basement, from Precision Home Services",
    project: "basement",
    schemaDescription: "Club basements: finished basements.",
  },
  {
    id: "stairs-railings-decks",
    name: "Stairs, railings and decks",
    size: "small",
    icon: "stairs",
    project: "decks",
    schemaDescription: "Stairs, railings and custom decks.",
  },
  {
    id: "rental-turnovers",
    name: "Rental turnovers and property maintenance",
    blurb: "Ongoing maintenance, turnovers and upkeep for rentals and owners.",
    size: "small",
    icon: "key",
    project: "turnover",
    schemaDescription: "Rental turnovers and property management: ongoing maintenance, turnovers and upkeep for rentals and owners.",
  },
  {
    id: "repairs-handyman",
    name: "Repairs and handyman",
    blurb: "Drywall, paint, flooring, doors, fixtures. The punch list, handled.",
    size: "small",
    icon: "wrench",
    project: "repairs",
    schemaDescription: "Repairs and handyman work: drywall, paint, flooring, doors, fixtures and the punch list.",
  },
];

// Plain list used by the FAQ and footer.
export const serviceListSentence =
  "Kitchen and bathroom remodels, club basements, full-home renovations, drywall repair and installation, interior and exterior painting, carpet, laminate and tile, custom tile showers and backsplashes, doors, windows and trim (including projects with historical oversight, C.H.A.P.), framing, built-ins, accent walls and finish carpentry, stairs, railings and custom decks, rental turnovers and property maintenance, and repairs and handyman work.";
