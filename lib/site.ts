// The launch switch. Everything about indexing is driven from here.
// demo (default): noindex, nofollow, no sitemap, concept footer line shows.
// live: index, follow, sitemap listed, concept footer line hidden.
export const SITE_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

export const IS_LIVE = SITE_MODE === "live";

// Falls back to the Vercel production domain, so a demo deploy gets working absolute URLs
// (canonical, Open Graph image) without any setup, then to localhost.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// Real last-modified dates for the sitemap. Update when a page's content changes.
export const LAST_MODIFIED = {
  home: "2026-11-13",
  contact: "2026-11-13",
};
