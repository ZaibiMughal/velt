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
| Styling | Inline styles + CSS custom properties (no Tailwind) |
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
CONTACT_EMAIL=zohaibumar6@gmail.com
```

The Supabase client is created server-side only using the service role key. There is no anon key — no client-side Supabase access.

**Optional, for ad conversion tracking** (site works identically with none of these set):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
```

See `src/components/ui/AdTracking.tsx` (loads the tags) and `src/lib/tracking.ts`
(fires the `contact_submit` / `brief_submit` conversion events) for how these are used.

---

## Project structure

```
src/
  app/
    layout.tsx              Global layout — Geist font, metadata, CustomCursor, PageTransition, GlobalBackground, JsonLd, MobileStickyCTA, Vercel Analytics
    page.tsx                Homepage (imports all section components)
    work/
      page.tsx              /work listing page — 3-column grid, filter by mobile/web
      [slug]/page.tsx       Case study detail page
    api/
      contact/route.ts      POST handler — validates with zod, sends email via Resend
      brief/route.ts        Guided brief submission — email via Resend + brief_submissions table
      brief/upload-url/route.ts  Returns signed upload URLs for brief file attachments (brief-uploads bucket)

  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/               One file per homepage section
      Hero.tsx
      Trust.tsx
      Packages.tsx
      HowWeWork.tsx
      WhyHexspire.tsx
      Portfolio.tsx         Shows 3 featured case studies from DB
      Testimonials.tsx
      FAQ.tsx
      PaymentStructure.tsx
      Contact.tsx
      Partners.tsx
      GuidedBrief.tsx
      DeepDive.tsx          'use client' — expand/collapse per-platform breakdown on case study pages
    ui/
      CustomCursor.tsx
      PageTransition.tsx
      GlobalBackground.tsx  Starfield canvas — pauses when tab hidden, respects prefers-reduced-motion
      MobileStickyCTA.tsx   Mobile-only bottom CTA bar, appears after 600px scroll, hides near contact form
    JsonLd.tsx              Structured data (Organization, Service, WebSite, FAQPage schemas)

  data/
    faqs.ts
    features.ts
    packages.ts
    process.ts
    work/
      index.ts              CaseStudy TypeScript interface
      deep-dives.ts         Per-platform breakdown content (NOT in DB — see below)
      placeholder.ts        Fallback data when DB is unavailable

  lib/
    supabase.ts             Typed Supabase client + full Database interface
    data.ts                 getAllCaseStudies, getCaseStudy, getSignedImageUrl, etc.
    email.ts                Resend send function
    utils.ts                cn() helper

supabase/
  migrations/               SQL migration files (001–009)
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

### Images

`getSignedImageUrl(path)` in `src/lib/data.ts` handles two cases:
- Path starts with `/` → returned as-is (served from `public/`)
- Any other path → Supabase Storage signed URL (1-hour expiry) from the `portfolio-assets` bucket

All current images are in Supabase Storage. Paths in the DB look like `pipa/cover.png`, `ridespotr/screen-1.jpeg` — no leading slash.

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

**No em dashes anywhere in user-facing content.** This is a hard rule.

- Do not write `—` in any component, data file, migration, or DB content
- Use a comma, colon, or rewrite the sentence instead
- This applies to: taglines, challenges, key points, solutions, outcomes, testimonials, deep dive descriptions, component copy, everything

The previous pattern was AI-generated text that used em dashes heavily (e.g. "The team built X — and then Y"). Replace with: "The team built X, then Y" or "The team built X. Then Y."

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

- **No Tailwind** — everything uses inline styles with occasional `<style>` tags for pseudo-class/hover effects that can't be done inline
- **Server-only Supabase** — the service role key is never exposed to the browser; all DB reads happen in server components or API routes
- **Images via signed URLs** — Supabase Storage signed URLs expire in 1 hour; this is fine for SSR since pages are rendered on demand
- **Deep dives in TypeScript** — keeping them in a `.ts` file rather than the DB keeps the case study page query simple and avoids an extra round-trip; edit via code deploy
- **No placeholder images** — if `cover_image` is null, a branded gradient placeholder renders using the project's `theme_color`
