# Hexspire — Developer Guide

This file is the single source of truth for working on this codebase. Read it before making any changes.

---

## What this is

**Hexspire** (`hexspire.io`) is a premium software development studio website. It is a conversion-focused site for founders and businesses with software budgets of $5K–$50K+. The primary goal is to get visitors to book a strategy call.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, server components) |
| Language | TypeScript |
| Font | Geist (via `next/font/google`) |
| Styling | Tailwind utility classes mixed with inline styles (inline styles for computed/dynamic values like `theme_color`, `<style>` tags for pseudo-classes and keyframes) |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (`portfolio-assets`, `brief-uploads`, `testimonial-assets` buckets) |
| Email | Resend |
| SEO | Next.js Metadata API + JSON-LD structured data |

---

## Environment variables

All required. Set in `.env.local`:

```
SUPABASE_URL=https://epiqtwwszkrmmzyzhxzm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
CONTACT_EMAIL=info@hexspire.io
```

The Supabase client is created server-side only using the service role key. There is no anon key — no client-side Supabase access.

**`CONTACT_EMAIL` must also be set directly in Vercel** (Production and Preview environments via `vercel env add`), not just `.env.local`. Production reads from Vercel's env vars, not the local file — editing `.env.local` alone has no effect on the live site. Same applies to any other env var change that needs to reach production.

**Optional, for ad conversion tracking** (site works identically with none of these set):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
```

See `src/components/ui/AdTracking.tsx` (loads the tags) and `src/lib/tracking.ts`
(fires the `contact_submit` / `brief_submit` conversion events) for how these are used. Ads are on hold per the client as of this writing — only wire in real IDs if explicitly given new ones.

---

## Project structure

```
src/
  app/
    layout.tsx              Global layout — Geist font, metadata, CustomCursor, PageTransition, GlobalBackground, JsonLd, MobileStickyCTA, Vercel Analytics
    page.tsx                Homepage (imports all section components)
    pricing/
      page.tsx               /pricing — full plan comparison table (see Pricing section below)
    work/
      page.tsx              /work listing page — 3-column grid, filter by mobile/web
      [slug]/page.tsx       Case study detail page
    api/
      contact/route.ts      POST handler — validates with zod, sends email via Resend
      brief/route.ts        Guided brief submission — email via Resend + brief_submissions table
      brief/upload-url/route.ts  Returns signed upload URLs for brief file attachments (brief-uploads bucket)

  components/
    layout/
      Navbar.tsx             See "Z-index layering" below for the mobile menu's stacking rules
      Footer.tsx
    sections/               One file per homepage section
      Hero.tsx
      Trust.tsx              NOT currently imported/rendered anywhere — orphaned. Kept content-correct anyway; wire it back in or delete it, don't just leave it drifting.
      Packages.tsx            Desktop: 3D fan of cards + horizontal pill tab bar. Mobile (<768px): single centered card + vertical stacked plan list (not the pill tabs — those don't fit and centering pushed the first tab off-screen with no way to reach it)
      HowWeWork.tsx
      WhyHexspire.tsx
      Portfolio.tsx         Shows 3 featured case studies from DB
      Testimonials.tsx        See "Testimonials" section below for the read-more modal and video modal
      FAQ.tsx
      PaymentStructure.tsx
      Contact.tsx
      Partners.tsx
      GuidedBrief.tsx         See "Guided brief" section below — modal is portaled to <body>, don't move it back inline
      DeepDive.tsx          'use client' — expand/collapse per-platform breakdown on case study pages
    ui/
      CustomCursor.tsx
      PageTransition.tsx
      GlobalBackground.tsx  Starfield canvas — pauses when tab hidden, respects prefers-reduced-motion
      MobileStickyCTA.tsx   Mobile-only bottom CTA bar, appears after 600px scroll, hides near contact form. z-index 90.
      LogoMark.tsx            THE brand mark (dim outer hexagon ring + solid gradient inner hexagon). This is the source of truth for "the logo" — see "Logo" section below, do not confuse with icon.svg
      Wordmark.tsx            "Hex" + gradient "Spire" text lockup, used next to LogoMark in Navbar/Footer/GuidedBrief
      Badge.tsx, Button.tsx, CheckIcon.tsx, Accordion.tsx, AnimatedSection.tsx   Shared primitives
      AdTracking.tsx         Loads GA/Google Ads/Meta Pixel tags when env vars are set
    JsonLd.tsx              Structured data (Organization, Service, WebSite, FAQPage schemas)

  data/
    faqs.ts
    features.ts
    packages.ts              3 pricing tiers — see "Pricing" section below for the priceNote field
    pricing-comparison.ts     Full categorized feature-comparison table data for /pricing (separate from packages.ts — see "Pricing" section)
    process.ts
    work/
      index.ts              CaseStudy TypeScript interface
      deep-dives.ts         Per-platform breakdown content (NOT in DB — see below)
      placeholder.ts        Fallback data when DB is unavailable

  lib/
    supabase.ts             Typed Supabase client + full Database interface
    data.ts                 getAllCaseStudies, getCaseStudy, getSignedImageUrl, etc. — see "Images" section for the signed-URL caching gotcha
    email.ts                Resend send function
    utils.ts                cn() helper

supabase/
  migrations/               SQL migration files (001–010)
```

---

## Data flow

### Case studies (main content)

All case study data lives in Supabase (`case_studies` table). The `getAllCaseStudies()` and `getCaseStudy(slug)` functions in `src/lib/data.ts` fetch from it server-side.

Fields in `case_studies`:
- `slug`, `title`, `category`, `tech[]`, `tagline`, `theme_color`
- `challenge`, `key_points[]`, `solution`
- `outcome_metric`, `outcome_description`, `outcomes[]` — `{ label, value }` pairs
- `live_url`, `app_store_url`, `play_store_url`
- `cover_image` — storage path (see Images section)
- `images[]` — array of storage paths
- `display_order` — controls listing order

### Deep dives (per-platform breakdowns)

The expanded "Full Breakdown" section on each case study page is **not in the DB**. It lives in `src/data/work/deep-dives.ts` as a `Record<string, DeepDive>` keyed by slug. Edit that file to update breakdown content. The `DeepDive` component on the case study page checks `DEEP_DIVES[slug]` and renders the CTA card + expandable section if data exists.

Current slugs with deep dives: `ridespotr`, `wagerr`, `nutritionup`, `pipa`, `keyos`, `trucktuck`, `salespulse`.

**Deep dives are factual project history, not general marketing copy.** E.g. Wagerr's deep dive correctly says its mobile app was built in React Native on Expo — don't "balance" that with a Flutter mention just because Flutter is promoted elsewhere on the site. Keep case-specific tech descriptions accurate to what was actually built, even when it creates asymmetry with the site's general capability claims.

### Images

`getSignedImageUrl(path)` in `src/lib/data.ts` handles two cases:
- Path starts with `/` → returned as-is (served from `public/`)
- Any other path → Supabase Storage signed URL from the `portfolio-assets` bucket, server-side cached via `unstable_cache`

All current images are in Supabase Storage. Paths in the DB look like `pipa/cover.png`, `ridespotr/screen-1.jpeg` — no leading slash.

**Signed URL caching — read this before touching the expiry/revalidate values.** The signed URL's real token lifetime is **7 days**, and the `unstable_cache` revalidate window is **1 hour**. This gap is intentional and load-bearing, not sloppy:

`unstable_cache`'s `revalidate` is a *minimum staleness age*, not a hard refresh guarantee. The actual re-fetch only happens on the *next request* after the window passes — under uneven traffic, a cached entry can sit stale far longer than the `revalidate` value implies, with no upper bound. The original version of this code had a 1-hour token with a 50-minute revalidate window (a 10-minute "safety margin"), which was not actually safe: any traffic gap longer than that margin served an already-expired token, and the portfolio image would just silently fail to load client-side, with no error surfaced anywhere, only fixable by however long it took for some other request to trigger a fresh fetch (a hard refresh sometimes "worked" by luck, not by design). The fix was to make the token's real lifetime vastly outlast any plausible revalidation delay (7 days vs. 1 hour), not to fiddle with the margin. **If you ever touch these numbers, keep the token lifetime at least an order of magnitude longer than the revalidate window** — these are public portfolio screenshots, so a long-lived signed URL has no real security cost.

**To upload new images:**
1. Put images in `public/case-studies/{slug}/` named `cover.{ext}`, `screen-1.{ext}`, etc.
2. Run the upload script pattern (see below) or use the Supabase dashboard Storage UI
3. Update the DB `cover_image` and `images` fields for that slug
4. Delete local copies from `public/case-studies/`

Upload script pattern (Node.js, run from project root):
```js
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
await supabase.storage.from('portfolio-assets').upload('slug/cover.png', readFileSync('./public/case-studies/slug/cover.png'), { contentType: 'image/png', upsert: true });
await supabase.from('case_studies').update({ cover_image: 'slug/cover.png', images: ['slug/screen-1.png'] }).eq('slug', 'slug');
```

### Testimonial avatars and videos

The `testimonial-assets` bucket (created 2026-07-04) holds `testimonials.avatar_url`, `video_url`, and `video_thumbnail_url` files. Unlike `portfolio-assets`, this bucket is **public** — those three fields are read directly as ready-to-use URLs in `Testimonials.tsx` and the case study `AvatarBlock`, with no signed-URL step. Store the full public URL in the DB, not a bare path.

Allowed types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `video/mp4`, `video/quicktime`, `video/webm`. 50MB file size limit.

To upload:
```js
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase.storage.from('testimonial-assets').upload('client-name-avatar.jpg', readFileSync('./avatar.jpg'), { contentType: 'image/jpeg', upsert: true });
const { data: { publicUrl } } = supabase.storage.from('testimonial-assets').getPublicUrl(data.path);
await supabase.from('testimonials').update({ avatar_url: publicUrl }).eq('id', 'testimonial-id');
```

Video testimonials shot on a phone are typically 4K and absurdly large (~900MB for ~1 minute). Compress before uploading: extract audio if a transcript is also needed (`ffmpeg -i in.MOV -vn -acodec pcm_s16le -ar 16000 -ac 1 audio.wav`, then `whisper audio.wav --model small --language en`), then two-pass H.264 encode down to ~1080px wide at a bitrate sized to land safely under whatever limit applies (44MB target for a 50MB limit, etc). Watch for portrait-orientation source video with `rotation` side-data metadata (`ffprobe -show_entries stream_side_data=rotation`) — a plain `-vf scale=...` through a real browser/ffmpeg pipeline handles it correctly, but verify the output's `width`/`height` via `ffprobe` actually came out portrait, not still-landscape-with-a-rotation-flag.

---

## Pricing

Two places show pricing, driven by two related but separate data files:

- **`src/data/packages.ts`** — the 3 tiers shown on the homepage `Packages` section (3D fan cards + tab bar/mobile list). Each `Package` has a `price` string and an optional `priceNote` (defaults to `'Fixed'` if omitted). SaaS Platform uses `priceNote: 'Starting from'` since it's the tier where actual scope can run higher than the listed number — the other two tiers are genuinely fixed-price and don't set this field.
- **`src/data/pricing-comparison.ts`** — the full categorized row-by-row comparison table on `/pricing`. Kept as a separate data structure (not derived from `packages.ts`) because its rows need per-tier variant text (e.g. "1 platform" vs "Both platforms") and category grouping that a flat `features: string[]` array can't express cleanly.

**Current prices** (as of this writing): Launch MVP $10,000, Growth Platform $15,000, SaaS Platform $20,000 (starting from). If these change again, update `packages.ts` — `pricing-comparison.ts` doesn't duplicate the dollar amounts, only feature-level differences, so it needs no changes for a pure price update. The dollar amounts are also mirrored in the `hasOfferCatalog` offers in `src/components/JsonLd.tsx`'s `serviceSchema` — keep those in sync too, they're not auto-derived from `packages.ts`.

**Foundation-level items are universal, not tier-gated.** Scalable architecture, security best practices, and performance optimization show as included on *all three* tiers (grouped under "Foundation and quality" in the comparison table), not just the top tier. Implying the cheaper tiers ship insecure or unoptimized work reads badly on a comparison table — these are baseline standards, not upsells. The SaaS-only "Advanced" category is real premium differentiation instead: real-time communication, third-party analytics integration, Core Web Vitals monitoring, multi-tenant architecture support.

The homepage's `Packages` section links to `/pricing` via a small "See the full plan comparison" link near the payment-terms line — that's the only cross-link between the two; the homepage cards intentionally stay a quick-glance summary (7 features max, "+N more included") rather than growing into the full table.

---

## Testimonials

`Testimonials.tsx` renders a marquee of cards, each quote clamped to 5 lines (`WebkitLineClamp: 5`). Cards **detect actual truncation** at runtime (comparing `scrollHeight` to `clientHeight` in a `useEffect` after mount, not a hardcoded character-length guess) and only show a "Read full testimonial" link when the quote is genuinely cut off. Clicking it opens a modal with the complete quote, avatar, name, role/company, and — if the testimonial has a video — a "Watch video" button that closes this modal and opens the existing video-playback modal in its place.

Video testimonials additionally need `video_thumbnail_url` (a still frame) for the card's video-preview treatment; without it the card falls back to a plain radial-gradient placeholder instead of a thumbnail.

---

## Guided brief

`GuidedBrief.tsx` is a 7-step full-screen modal, triggered from a link inside `Contact.tsx`.

**The modal is portaled to `document.body` via `createPortal` — do not move it back to rendering inline.** It used to render in place inside `Contact.tsx`'s `motion.form`. Framer Motion elements keep a `transform` style applied even at rest (even an identity `translateY(0px)`), and *any* non-`none` transform on an ancestor creates a new CSS stacking context. That trapped the modal's `z-index: 300` inside that ancestor's local stacking context, so it no longer competed against `MobileStickyCTA`'s `z-index: 90` on the *global* scale — the sticky CTA rendered on top of the modal's own Next button regardless of the modal's much higher z-index number. This is a general trap, not a one-off: **any full-screen overlay nested inside a Framer Motion ancestor should be portaled to `<body>`**, not just given a higher z-index (a higher number inside a trapped stacking context still loses).

Other things baked into this component worth knowing before changing it:
- The close button is a proper `X` icon + "Back to site" label, not just a bare "Esc" text button — "Esc" reads as a keyboard hint, not a tappable control, and mobile has no Escape key at all.
- Steps 3, 6, and 7 each show a live hint explaining exactly why "Next"/"Submit Brief" is disabled (`MinLengthHint` component for the two textareas, inline logic for step 7's name/email pair). A disabled button with zero explanation reads as broken to users, not as "you're not done yet" — any new required-field step should follow this pattern, not skip it.

---

## Logo

**`src/components/ui/LogoMark.tsx` is the canonical brand mark** — a dim outer hexagon ring (stroke `#4c4c9e`) framing a smaller solid hexagon filled with the indigo-to-violet gradient (`#6366f1` → `#a78bfa`). This is what actually renders in the Navbar/Footer.

**`src/app/icon.svg` (the favicon) is a *different*, simpler design** — a single gradient-filled hexagon on a solid dark rounded-square background, no outer ring. It exists for favicon/app-icon purposes (browsers want a filled background there), not as an interchangeable export of "the logo."

`public/logo.png` (referenced in `JsonLd.tsx`'s Organization schema, and the general-purpose exportable logo file) must be rendered from **`LogoMark.tsx`**, not `icon.svg` — they look genuinely different, and using the wrong one produces a logo that doesn't match what's on the actual site. It should be transparent (no background), not flattened onto white. ImageMagick's built-in SVG renderer silently drops `<linearGradient>` fills (falls back to solid black) — render through an actual browser (e.g. a local static HTML file + Playwright screenshot with the white canvas keyed to transparent afterward) instead of `magick -background none icon.svg out.png`.

---

## Z-index layering

Collected here because getting this wrong is easy and the failure mode (an element silently unreachable/invisible behind another) doesn't throw an error — it just looks broken:

| Element | z-index | Notes |
|---|---|---|
| Homepage section content | auto/0 | |
| Navbar header (`Navbar.tsx`) | 65 | Must stay above the mobile menu overlay so the hamburger→X toggle stays visible and clickable while the menu is open |
| Mobile menu overlay (`Navbar.tsx`) | 60 (`z-[60]`) | |
| `MobileStickyCTA.tsx` | 90 | |
| `GuidedBrief.tsx` modal | 300 | Portaled to `document.body` — see "Guided brief" section above for why this matters more than the number itself |

**The number alone doesn't decide what renders on top if a lower-numbered element's ancestor establishes its own stacking context** (via `transform`, `filter`, `opacity < 1`, `will-change`, etc. — Framer Motion elements do this by default). When adding a new fixed/absolute-positioned overlay, check what it's nested inside, not just what z-index to give it. When in doubt, portal to `document.body`.

---

## Adding a new project

1. **Add the case study to Supabase** — insert a row into `case_studies` with all fields. Set `display_order` to control where it appears.
2. **Upload images** — follow the Images section above.
3. **Add a deep dive** — add an entry to `DEEP_DIVES` in `src/data/work/deep-dives.ts`. Research the actual project source code before writing content (do not guess or use AI-generated assumptions).
4. **No code changes needed** for the listing page or routing — both are dynamic from the DB.

---

## /work page card layout

Cards use `const isMobile = study.category === 'Mobile App'` to switch between two display modes:

- **Mobile** — 272px image area, portrait screenshot anchored to bottom with `objectFit: contain`, floating on a radial gradient in the project `theme_color`
- **Web/SaaS** — 210px image area, screenshot with `brightness(0.55) saturate(0.85)` filter + a `rgba(theme_color, 0.18)` wash overlay to tie it into the dark card

Each card uses a CSS custom property `--t` set to the project's `theme_color`. Hover effects use `color-mix(in srgb, var(--t) 38%, transparent)`.

---

## Case study page

`src/app/work/[slug]/page.tsx` — server component. Renders:
1. Hero with title, category, tech pills, links
2. Challenge + key points
3. Solution
4. Outcomes grid
5. Image gallery (cover + screens from DB)
6. Testimonial (from `testimonials` table — falls back to hardcoded mock data if table missing)
7. DeepDive section (if entry exists in `DEEP_DIVES`)

The `DeepDive` component is `'use client'` and uses `useState` for open/close. It renders a CTA card when collapsed, and the full per-platform breakdown when expanded.

---

## Migrations

Migration files in `supabase/migrations/` are numbered 001–010. They must be run manually in the Supabase SQL editor for project `epiqtwwszkrmmzyzhxzm`.

**Status as of project setup:**
- 001–007: Run (core tables, seed data, theme colors, key points)
- 008: May not be run — creates `testimonials` table and seeds placeholder quotes
- 009: **Do NOT run the image UPDATE statements** — images were already uploaded to Supabase Storage and DB paths were updated directly via script. **Only the em dash fix statements** from 009 still need to be applied if content looks wrong.
- 010: **Table creation still needs to be run** — creates `brief_submissions`. The `brief-uploads` storage bucket part was already created live via the service key. Until the table exists, brief submissions still arrive by email but are not persisted to the DB.

To apply only the em dash fixes from 009, run just the `UPDATE case_studies SET ...` and `UPDATE testimonials SET ...` blocks (not the `/case-studies/...` path updates at the top).

---

## Content rules

**No dashes as sentence connectors anywhere in user-facing content.** This is a hard rule, and it's broader than just em dashes — it covers em dashes (`—`) and the spaced-hyphen pattern (`word - word`) alike. Both read as an AI-generated writing tic.

- Do not write `—` or ` - ` as a connector in any component, data file, migration, or DB content
- Use a comma, colon, period, or rewrite the sentence instead
- This applies to: taglines, challenges, key points, solutions, outcomes, testimonials, deep dive descriptions, component copy, section subtitles, everything
- Exception: a plain hyphen inside a genuine compound word (`role-based`, `third-party`, `SaaS-style`) or a number range (`3-4 weeks`) is fine — those aren't sentence-connector dashes, don't "fix" them

The previous pattern was AI-generated text that used em dashes heavily (e.g. "The team built X — and then Y"). Replace with: "The team built X, then Y" or "The team built X. Then Y."

**Wherever React Native is mentioned in general marketing/capability copy, pair it with Flutter.** Both are real service offerings; SEO metadata, JSON-LD, the features list, FAQ answers, and any tech-stack marquee should mention them together. This does **not** apply to case-study-specific factual descriptions of what was actually built for a given client (see the Deep dives note above) — don't insert a technology into a project's history that wasn't actually used there.

---

## Design system

Background: `#09090b`  
Surface (cards): `#0d0d10` / `#111114`  
Border: `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.1)`  
Primary accent: `#6366f1` (indigo)  
Muted text: `rgba(255,255,255,0.42)`  
Dim text: `rgba(255,255,255,0.28)`

Each project has its own `theme_color` (hex) that drives all accent colors on its card and case study page (borders, pills, gradients, glow effects).

Typography uses Geist with tight negative letter-spacing on headings (`-0.03em` to `-0.04em`).

---

## SEO

- Global metadata in `src/app/layout.tsx`
- Page-specific metadata in each `page.tsx` via `export const metadata` or `generateMetadata`
- JSON-LD structured data in `src/components/JsonLd.tsx` (Organization, Service, WebSite, FAQPage)
- Case study pages generate their own metadata from DB data
- Target domain: `hexspire.io`

---

## Contact form

`src/app/api/contact/route.ts` — validates the POST body with zod, sends a formatted HTML email via Resend to `CONTACT_EMAIL`, and saves the submission to the `contact_submissions` table in Supabase.

---

## Key decisions

- **Tailwind + inline styles, mixed** — Tailwind utility classes for layout/spacing/typography, inline styles for anything computed or dynamic (a project's `theme_color`, animated values). Not "no Tailwind" — that was stale guidance, the codebase uses it extensively.
- **Server-only Supabase** — the service role key is never exposed to the browser; all DB reads happen in server components or API routes
- **Images via signed URLs, long-lived and server-cached** — see the "Images" section above for the token-lifetime-vs-revalidate-window gotcha before changing either number
- **Deep dives in TypeScript** — keeping them in a `.ts` file rather than the DB keeps the case study page query simple and avoids an extra round-trip; edit via code deploy
- **No placeholder images** — if `cover_image` is null, a branded gradient placeholder renders using the project's `theme_color`
- **Overlays get portaled when nested inside animated ancestors** — see "Z-index layering" above; a stacking context trap doesn't announce itself, it just silently breaks click targets
