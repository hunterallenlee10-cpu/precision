# SEO launch checklist

The site ships in **demo mode**: every page says `noindex, nofollow`, `robots.txt` lists no sitemap, the sitemap is empty and the footer shows "Concept preview by Lee Enterprises Unlimited." One switch flips all of it.

## Launch day

1. **Replace every DRAFT and Sample item first** (search the code for `DRAFT` and `Sample`):
   - Hours (`lib/business.ts` `hours`, then set `hoursConfirmed: true` so they go into the JSON-LD).
   - Guarantee terms (`lib/business.ts` `guarantee`, `lib/faq.ts`, `components/sections/HowItWorks.tsx`).
   - Stage 1 process wording (`components/BuildStages/stages.ts`).
   - The Josh H review: confirm it is real and where it was left, or remove it (`lib/business.ts` `confirmedReview`).
   - The two sample review cards (`components/sections/Reviews.tsx`): swap in real Google reviews, word for word, with permission.
   - Planner success wording and reply time (`components/ProjectPlanner/PlannerSuccess.tsx`).
   - Photo placeholders: club basement, historic door/window/trim job, crew and truck.
   - Which email is current (precisiondp4u@gmail.com or mbirch.phs@gmail.com) and whether (410) 599-8729 (Yelp) is still his.
2. **Hook the Project Planner to a real inbox.** It is front-end only today; the "Text now" button carries the answers by SMS. Add a form endpoint (email service or CRM) before relying on it.
3. In Vercel, Project Settings, Environment Variables (Production):
   - `NEXT_PUBLIC_SITE_MODE=live`
   - `NEXT_PUBLIC_SITE_URL=https://precisionhomemd.com` (the real domain, no trailing slash)
4. **Redeploy** (these values are read at build time).
5. Confirm on the live domain:
   - View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`, canonical points at the live domain.
   - `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`.
   - `/sitemap.xml` lists `/` and `/contact`.
   - The footer no longer shows the concept line.
   - Paste both URLs into https://validator.schema.org and https://search.google.com/test/rich-results.
6. **Google Search Console**: add the domain property, verify by DNS, submit `sitemap.xml`, request indexing for `/` and `/contact`.
7. **Bing Webmaster Tools**: import from Search Console or add the site, submit `sitemap.xml`.
8. **Google Business Profile**: the knowledge panel that shows today for "Precision Home Services" (5.0 from 4 reviews, a 609 number) belongs to a different company in another state. Claim or create his own profile with exactly:
   - Name: Precision Home Services LLC
   - Address: 8009 Jumpers Hole Rd, Suite L, Pasadena, MD 21122
   - Phone: (410) 320-4659
   - Website: the live domain
   - Category: General contractor (plus Remodeler, Bathroom remodeler, Kitchen remodeler)
   - Service area: Anne Arundel County, Baltimore, Frederick, Ocean City, Washington, D.C., Maryland
   Then ask past customers for reviews there, and add the best ones to the site.
9. Keep name, address and phone identical everywhere (Facebook, Yelp, directories). Fix the directory that lists a different address and the Yelp phone if it is out of date.
10. Re-run Lighthouse on the live URL (mobile and desktop). SEO should be 100.
