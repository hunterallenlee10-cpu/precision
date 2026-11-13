import type { MetadataRoute } from "next";
import { IS_LIVE, LAST_MODIFIED, absoluteUrl } from "@/lib/site";

// Demo mode lists nothing. Live mode lists every page with its real last-modified date.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return [];
  return [
    { url: absoluteUrl("/"), lastModified: LAST_MODIFIED.home, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/contact"), lastModified: LAST_MODIFIED.contact, changeFrequency: "yearly", priority: 0.7 },
  ];
}
