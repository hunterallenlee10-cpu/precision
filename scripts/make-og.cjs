// Renders public/og-image.png (1200x630) from HTML with the real fonts, using Playwright's Chromium.
// Run: node scripts/make-og.cjs   (needs `playwright` available, e.g. NODE_PATH=$(npm root -g))
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const root = path.resolve(__dirname, "..");
const photo = fs.readFileSync(path.join(root, "public/images/01-white-kitchen-island-remodel-BEST.webp")).toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,800&family=IBM+Plex+Sans:wght@500;600&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F3F1EA;font-family:'IBM Plex Sans',sans-serif;color:#0C1420;position:relative;overflow:hidden}
.d{font-family:'Archivo',sans-serif;font-weight:800;font-variation-settings:"wdth" 122}
.tape{background:#1C93E6;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px);
clip-path:polygon(6px 0,calc(100% - 5px) 0,100% 16%,calc(100% - 5px) 33%,100% 50%,calc(100% - 4px) 67%,100% 84%,calc(100% - 6px) 100%,5px 100%,0 84%,5px 67%,0 50%,4px 33%,0 16%)}
.left{position:absolute;left:72px;top:92px;width:520px}
.word{font-size:70px;line-height:.9;letter-spacing:.005em}
.sub{display:inline-block;margin-top:14px;padding:8px 16px 7px;font-size:17px;letter-spacing:.2em;text-transform:uppercase;transform:rotate(-1.5deg)}
.line{margin-top:52px;font-size:42px;line-height:1.08}
.meta{position:absolute;left:72px;bottom:64px;font-size:20px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
.meta span{display:inline-block;width:22px;height:4px;background:#1C93E6;vertical-align:middle;margin-right:12px}
.photo{position:absolute;right:60px;top:112px;width:500px}
.photo img{width:500px;height:auto;display:block;border-radius:2px}
.s{position:absolute;height:18px}
.ticks{position:absolute;left:0;right:0;bottom:0;height:18px;color:rgba(12,20,32,.35);
background-image:repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px 64px),repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px 8px);
background-size:100% 18px,100% 8px;background-repeat:no-repeat;background-position:0 100%,0 100%}
</style></head><body>
<div class="left">
  <div class="d word">PRECISION</div>
  <div class="tape d sub">Home Services LLC</div>
  <div class="d line">Home remodeling<br>in Pasadena, MD</div>
</div>
<div class="meta"><span></span>MHIC #161406 · Free estimates · (410) 320-4659</div>
<div class="photo">
  <img src="data:image/webp;base64,${photo}">
  <div class="tape s" style="left:-14px;right:-10px;top:-9px;transform:rotate(-.6deg)"></div>
  <div class="tape s" style="left:-10px;right:-14px;bottom:-9px;transform:rotate(.5deg)"></div>
  <div class="tape s" style="width:18px;height:auto;top:-14px;bottom:-10px;left:-9px"></div>
  <div class="tape s" style="width:18px;height:auto;top:-10px;bottom:-14px;right:-9px"></div>
</div>
<div class="ticks"></div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "public/og-image.png") });
  await browser.close();
  console.log("wrote public/og-image.png");
})();
