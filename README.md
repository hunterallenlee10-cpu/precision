# Precision Home Services: concept site

Front-end-only concept site for Precision Home Services LLC, Pasadena, MD. Built by Lee Enterprises Unlimited.
Next.js (App Router), TypeScript, Tailwind CSS v4, `lucide-react`. Design direction "Blue Tape": see `implementation_kickstart.md`.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production build
```

## The launch switch

| Variable | Values | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` (default), `live` | demo: `noindex, nofollow`, empty sitemap, concept footer line. live: `index, follow`, sitemap in robots.txt, no concept line |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://precisionhomemd.com` | Base for canonicals, Open Graph and JSON-LD |

Both are read at build time. Keep the deployed demo in demo mode. Launch steps are in `SEO-LAUNCH.md`.

## Where things live

- `lib/business.ts`: every business fact (name, address, phone, licence, hours, his own lines). Edit here.
- `lib/services.ts`, `lib/gallery.ts`, `lib/faq.ts`, `lib/photos.ts`: services, gallery, FAQ (also feeds FAQPage JSON-LD), photo sizes and alt text.
- `lib/schema.ts`: JSON-LD. `lib/site.ts`: the launch switch.
- `components/sections/`: one file per section. `components/ProjectPlanner/`, `components/BuildStages/`, `components/Gallery/`.
- `public/images/raw/`: the owner's original photos. `npm run images` rebuilds `public/images/*.webp` (TV screens covered on 08 and 09, crops on 08 and 15).
- `scripts/make-og.cjs`: re-renders `public/og-image.png` with Playwright.

## Deploy on Vercel

Import the repo as its own project (framework preset: Next.js). No environment variables are needed for the demo.
`@vercel/analytics` only loads on Vercel.

## Before launch

Everything marked `DRAFT` or `Sample` needs the owner's confirmation. The list is in `SEO-LAUNCH.md`.
The Project Planner does not send anywhere yet: its success screen hands the answers to his phone by SMS.
