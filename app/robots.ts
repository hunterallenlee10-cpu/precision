import type { MetadataRoute } from "next";
import { IS_LIVE, absoluteUrl } from "@/lib/site";

// Crawling stays allowed in both modes so crawlers can read the page-level robots meta.
// Demo pages carry noindex, nofollow; only live mode lists the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(IS_LIVE ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
