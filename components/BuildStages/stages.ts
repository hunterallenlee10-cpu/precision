import type { PhotoKey } from "@/lib/photos";

// One real job, start to end: the media wall in photos 06, 07 and 08.
export const stages: { n: number; name: string; photo: PhotoKey; position: string; line: string }[] = [
  {
    n: 1,
    name: "Tape",
    photo: "p06",
    position: "42% 50%",
    // DRAFT: confirm process wording with the owner
    line: "We mark it out on your wall first, so you see the size before anything is cut.",
  },
  {
    n: 2,
    name: "Frame",
    photo: "p07",
    position: "50% 50%",
    line: "Framed in timber. Shelf bays, backing for the TV, an opening for the fireplace.",
  },
  {
    n: 3,
    name: "Finish",
    photo: "p08",
    position: "44% 50%",
    line: "Shiplap, lit shelves, electric fireplace. Done.",
  },
];
