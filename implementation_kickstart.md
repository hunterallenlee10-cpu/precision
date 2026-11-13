# Precision Home Services: implementation kickstart

Concept site for Precision Home Services LLC, Pasadena, MD. Built by Lee Enterprises Unlimited as a spec demo.
Direction: **"Blue Tape"**. The site looks like a finish job at layout stage: primed drywall, pencil ink, blue painter's tape doing the pointing.

## Plan

- Next.js (App Router) + TypeScript + Tailwind CSS v4. `lucide-react` icons. Framer Motion only inside `components/BuildStages/`.
- The hero tape-off is CSS keyframes (no JS needed), so it starts on first paint, never waits for hydration and adds nothing to the bundle. Still only one of the two motion sections.
- One component per section in `components/sections/`. Planner in `components/ProjectPlanner/`, stages tool in `components/BuildStages/`. No file over 500 lines.
- Facts in `lib/business.ts`, services in `lib/services.ts`, gallery in `lib/gallery.ts`, photo metadata (size + alt) in `lib/photos.ts`.
- Images: `scripts/process-images.mjs` (sharp) turns `public/images/raw/*` into `public/images/*.webp` with the TV screens covered on 08 and 09 and the crops on 08 and 15. Rendered via `next/image` with explicit width and height and a `max-width` equal to native width.
- One switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, `live`) and `NEXT_PUBLIC_SITE_URL`. Drives robots meta, robots.txt, sitemap and the concept footer line.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `paper` | `#F3F1EA` | Page background (primed drywall) |
| `white` | `#FFFFFF` | Cards, surfaces |
| `line` | `#DAD6CB` | 1px borders |
| `tape` | `#1C93E6` | Primary button fill, tape strips, key numbers on ink, active states, stages control. Never text or thin lines on light surfaces |
| `ink` | `#0C1420` | Text. Ink bands |
| `muted` | `#566070` | Muted text on light |
| `ink-paper` | `#F3F1EA` | Text on ink bands |
| `ink-muted` | `#A9B4C2` | Muted text on ink bands |

- Display: Archivo, variable `wdth` axis at 122, weight 800. Body: IBM Plex Sans 400 / 500 / 600.
- 8px grid. Section padding 112 to 128px desktop, 72px mobile. Radius 2px. 1px borders. No shadows.
- Tape strip: accent fill, ink text, Archivo caps 12px, wide tracking, rotated 1 to 2 degrees, zigzag torn ends, faint grain from a repeating gradient.
- Divider: tape-measure ticks, 1px ink lines every 8px, every eighth taller.
- Buttons: accent with ink text (5.6:1), or ghost with 1px ink border. Links on light: ink with a tape-blue underline.
- Focus: 2px ink ring on light, 2px tape ring on ink.

## Phases

- [x] Phase 1: scaffold, design tokens, fonts, tape strip component, nav, hero with the tape-off, footer
- [x] Phase 2: Who we work for, Tape. Frame. Finish. (C.H.A.P. source cited in a comment)
- [x] Phase 3: services bento, gallery with filters, three showers set, lightbox
- [x] Phase 4: licence and proof, how it works, quote band, reviews, FAQ, final call-to-action
- [ ] Phase 5: Project Planner modal with pre-selects, prefilled SMS, mobile sticky bar, `/contact`
- [ ] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD, robots, sitemap, `llms.txt`, OG image, favicon, 404, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse on a production build, both modes, mobile and desktop
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [ ] The hero alone would sell the job. Tape-off plays once. At 375px the headline and primary button show without scrolling.
- [ ] Tape. Frame. Finish. steps 06, 07, 08 in order, auto-plays once, works with mouse, touch, keyboard.
- [ ] C.H.A.P. wording sourced in a code comment with the "general guide" line. Licence link goes to the State of Maryland.
- [ ] Every "Get My Free Estimate" opens the Planner with the right pre-selects. Phone, text, directions links work.
- [ ] Every "things only this business has" item is on the page.
- [ ] Zero em dashes, zero "--", zero stock or AI images, zero invented facts. No photo larger than native. TV screens in 08 and 09 covered.
- [ ] Sample reviews, Josh H review, hours, guarantee and other draft copy labelled or commented.
- [ ] Max 2 fonts, 3 colours plus text, motion in 2 sections only. Accent never text on light.
- [ ] 375px: no overflow, burger works, sticky call / text / estimate bar works.
- [ ] Footer on both pages with concept line in demo mode. Demo = noindex, nofollow. Live = index, follow, sitemap, no concept line.
- [ ] OG image and favicon are his.
- [ ] Lighthouse SEO 100 live mode. Perf, A11y, BP 90+. Demo: only the indexing audit fails.
- [ ] One h1 per page with service and town. Unique titles and descriptions. JSON-LD valid and true.
