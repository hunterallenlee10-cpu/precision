// Real photos only, from the owner's website and Facebook page. Sizes are the processed files in
// public/images (see scripts/process-images.mjs). Alt text is written from the photo map, nothing added.

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const p = (file: string, width: number, height: number, alt: string): Photo => ({
  src: `/images/${file}.webp`,
  width,
  height,
  alt,
});

export const photos = {
  logo: {
    src: "/images/00-logo-logo-emblem.png",
    width: 640,
    height: 461,
    alt: "Precision Home Services LLC emblem: three rooflines over a saw blade and the PRECISION wordmark",
  } as Photo,
  p01: p(
    "01-white-kitchen-island-remodel-BEST",
    1339,
    839,
    "Finished white kitchen with shaker cabinets, a quartz island, stainless appliances, a vertical subway tile backsplash and light plank flooring",
  ),
  p02: p(
    "02-kitchen-open-plan-peninsula",
    1332,
    830,
    "Open-plan kitchen with a peninsula and white shaker cabinets, grey plank flooring running into a living area with a board and batten wall",
  ),
  p03: p(
    "03-bathroom-freestanding-tub-glass-shower",
    1338,
    827,
    "Finished bathroom with a freestanding tub, a frameless glass shower in large marble-look tile and matte black fixtures",
  ),
  p04: p(
    "04-bathroom-sliding-glass-shower-vanity",
    1334,
    842,
    "Finished bathroom with a walk-in shower behind a black-framed sliding door, a white vanity and a black-framed mirror",
  ),
  p05: p(
    "05-bonus-room-skylights-grid-accent-wall",
    1075,
    675,
    "Large vaulted room with four skylights, a full-height grid panel accent wall, fresh paint and plank flooring",
  ),
  p06: p(
    "06-MEDIAWALL-STAGE-1-blue-tape-layout",
    689,
    921,
    "Stage 1: a bare living room wall with a built-in marked out in blue painter's tape around an empty TV mount",
  ),
  p07: p(
    "07-MEDIAWALL-STAGE-2-timber-framing",
    689,
    921,
    "Stage 2: the same wall framed in fresh timber, with shelf bays, TV backing blocks, a fireplace opening and floor protection down",
  ),
  p08: p(
    "08-MEDIAWALL-STAGE-3-finished-shiplap-lit-shelves",
    773,
    879,
    "Stage 3: the same wall finished as a white shiplap media wall with six lit shelf niches, a TV and a linear electric fireplace",
  ),
  p09: p(
    "09-mediawall-finished-front-fireplace-on",
    1096,
    821,
    "The finished shiplap media wall seen straight on with the lights low and the electric fireplace on",
  ),
  p10: p(
    "10-shower-navy-herringbone-tile-niche",
    641,
    855,
    "Custom shower in glossy navy herringbone tile with a double niche in hex mosaic",
  ),
  p11: p(
    "11-shower-white-herringbone-black-fixtures",
    641,
    855,
    "Custom shower in white herringbone tile with a matte black rain head, a hex mosaic floor and a dark stone curb",
  ),
  p12: p(
    "12-tub-surround-grey-vertical-stack-tile",
    641,
    855,
    "Tub surround in grey vertical stacked tile with a transom window and two niches",
  ),
  p13: p(
    "13-shower-WATERPROOFED-before-tile",
    641,
    855,
    "A shower before tile: cement board coated edge to edge in waterproofing membrane",
  ),
  p14: p(
    "14-kitchen-backsplash-pendant-lights",
    1096,
    821,
    "Kitchen sink wall with grey shaker uppers with glass doors, a plank-look tile backsplash to the ceiling and two black cage pendants",
  ),
  p15: p(
    "15-kitchen-backsplash-black-range-hood",
    1096,
    781,
    "Kitchen range wall with grey shaker cabinets, a black range hood and a plank-look tile backsplash",
  ),
  p16: p(
    "16-accent-wall-grid-panel-finished",
    723,
    855,
    "Finished white grid panel accent wall in a bedroom with sunlight across it",
  ),
  p17: p(
    "17-accent-wall-geometric-trim-in-progress",
    1096,
    826,
    "Geometric trim accent wall, primed, before final paint",
  ),
  p18: p(
    "18-bathroom-floor-tile-in-progress",
    641,
    855,
    "Bathroom floor in large dark tile, mid-install",
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
