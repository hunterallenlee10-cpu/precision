// Converts the owner's real photos in public/images/raw into web-ready files in public/images.
// Run with: npm run images
// Fixes applied (see the build brief, section 0):
//  - 08 and 09: the TV is showing a broadcast, so the screen is covered with a flat near-black shape.
//  - 08: cropped off the top (rounded screenshot corners). The brief said 12px, but the rounded
//    corners run about 40px deep, so 30px comes off the top and 22px off each side.
//  - 15: 40px cropped off the bottom (appliance sticker).
//  - 00 logo: transparent margin trimmed, kept as PNG and WebP. Always shown on a #000000 plate.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("public/images/raw");
const OUT = path.resolve("public/images");
const SCREEN = "#101215";

// TV outlines measured on the original files (x,y in px).
const TV_MASKS = {
  "08-MEDIAWALL-STAGE-3-finished-shiplap-lit-shelves": [
    [309, 212],
    [694, 297],
    [659, 527],
    [287, 498],
  ],
  "09-mediawall-finished-front-fireplace-on": [
    [354, 235],
    [754, 238],
    [751, 463],
    [359, 463],
  ],
};

function maskSvg(w, h, pts) {
  const p = pts.map(([x, y]) => `${x},${y}`).join(" ");
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><polygon points="${p}" fill="${SCREEN}" stroke="${SCREEN}" stroke-width="2" stroke-linejoin="round"/></svg>`,
  );
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, "");
  let img = sharp(path.join(RAW, file));
  const meta = await img.metadata();
  let { width: w, height: h } = meta;

  if (name.startsWith("00-logo")) {
    const trimmed = await sharp(path.join(RAW, file)).trim().toBuffer({ resolveWithObject: true });
    const logo = sharp(trimmed.data).resize({ width: 640, withoutEnlargement: true });
    const png = await logo.clone().png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, `${name}.png`));
    await logo.clone().webp({ quality: 88, alphaQuality: 90 }).toFile(path.join(OUT, `${name}.webp`));
    manifest[name] = { width: png.width, height: png.height };
    continue;
  }

  if (TV_MASKS[name]) {
    const buf = await img.composite([{ input: maskSvg(w, h, TV_MASKS[name]), top: 0, left: 0 }]).toBuffer();
    img = sharp(buf);
  }
  if (name.startsWith("08-")) {
    img = sharp(await img.extract({ left: 22, top: 30, width: w - 44, height: h - 30 }).toBuffer());
    w -= 44;
    h -= 30;
  }
  if (name.startsWith("15-")) {
    img = sharp(await img.extract({ left: 0, top: 0, width: w, height: h - 40 }).toBuffer());
    h -= 40;
  }

  const out = await img.webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`));
  manifest[name] = { width: out.width, height: out.height };
}

console.log(JSON.stringify(manifest, null, 2));
