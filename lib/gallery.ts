import type { PhotoKey } from "./photos";

export const galleryFilters = ["All", "Kitchens", "Bathrooms", "Tile", "Carpentry", "In progress"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];

export type GalleryItem = {
  photo: PhotoKey;
  category: Exclude<GalleryFilter, "All">;
  caption: string; // only what the photo shows, never invented job details, towns or dates
};

export const gallery: GalleryItem[] = [
  { photo: "p01", category: "Kitchens", caption: "White shaker kitchen with a quartz island" },
  { photo: "p03", category: "Bathrooms", caption: "Freestanding tub and frameless glass shower" },
  { photo: "p10", category: "Tile", caption: "Navy herringbone shower with hex mosaic niches" },
  { photo: "p05", category: "Carpentry", caption: "Vaulted room with a full-height grid panel wall" },
  { photo: "p06", category: "In progress", caption: "Media wall, stage 1: marked out in blue tape" },
  { photo: "p14", category: "Kitchens", caption: "Plank-look backsplash to the ceiling, cage pendants" },
  { photo: "p11", category: "Tile", caption: "White herringbone shower, matte black fixtures" },
  { photo: "p08", category: "Carpentry", caption: "Shiplap media wall with lit shelf niches" },
  { photo: "p13", category: "In progress", caption: "Before tile: waterproofed edge to edge" },
  { photo: "p04", category: "Bathrooms", caption: "Walk-in shower with a black-framed sliding door" },
  { photo: "p02", category: "Kitchens", caption: "Open-plan kitchen with a peninsula" },
  { photo: "p16", category: "Carpentry", caption: "Grid panel accent wall, finished" },
  { photo: "p07", category: "In progress", caption: "Media wall, stage 2: timber framing" },
  { photo: "p12", category: "Tile", caption: "Grey vertical stacked tile tub surround" },
  { photo: "p15", category: "Kitchens", caption: "Range wall with a black hood and plank-look tile" },
  { photo: "p17", category: "In progress", caption: "Geometric trim accent wall, primed" },
  { photo: "p09", category: "Carpentry", caption: "The finished media wall, straight on" },
  { photo: "p18", category: "In progress", caption: "Bathroom floor tile, mid-install" },
];

// The featured set above the grid. Caption is his own words from Facebook.
export const showerSet: PhotoKey[] = ["p10", "p11", "p12"];
