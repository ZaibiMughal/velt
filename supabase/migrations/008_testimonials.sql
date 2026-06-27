-- ============================================================
-- Migration 008: Testimonials table
-- ============================================================

create table if not exists testimonials (
  id                  uuid primary key default gen_random_uuid(),
  case_study_slug     text references case_studies(slug) on delete set null,
  client_name         text not null,
  client_role         text,
  client_company      text,
  quote               text not null,
  avatar_url          text,            -- Supabase Storage path OR /public path
  video_url           text,            -- Supabase Storage path
  video_thumbnail_url text,            -- Supabase Storage path
  display_order       int not null default 0,
  created_at          timestamptz default now()
);

alter table testimonials enable row level security;
create policy "public read testimonials" on testimonials for select using (true);

create index if not exists testimonials_order_idx on testimonials (display_order);
create index if not exists testimonials_slug_idx  on testimonials (case_study_slug);

-- ── Seed placeholder testimonials ────────────────────────────────────
-- Replace quotes / names with real ones once you have them.
insert into testimonials (case_study_slug, client_name, client_role, client_company, quote, display_order) values

(
  'ridespotr',
  'Alex Thompson', 'Co-Founder', 'RideSpotr',
  'Velt turned our car-spotting concept into a platform with millions of spots in a fraction of the time we expected. The AI plate recognition alone would have taken us months elsewhere — they shipped it in weeks and it just works.',
  1
),
(
  'wagerr',
  'Marcus Reid', 'Founder', 'Wagerr',
  'We had a complex on-chain settlement system that needed to be bulletproof. Velt nailed the architecture — the Ethereum smart contract, the embedded wallets, the scoring logic — and somehow made it feel effortless to the end user.',
  2
),
(
  'nutritionup',
  'Sarah Chen', 'CEO', 'NutritionUP',
  'Four platforms, one team, delivered on schedule. The AI meal coaching, the corporate HR portal, the admin panel — all of it polished and production-ready. Velt thinks like a product team, not just engineers.',
  3
),
(
  'pipa',
  'Ryan Nakamura', 'Operations Director', 'PIPA',
  'Our farm managers went from paper timesheets to real-time GPS tracking overnight. The Xero payroll sync alone saves us hours every week. I couldn''t ask for a better development partner.',
  4
),
(
  'keyos',
  'David Park', 'CTO', 'KeyOS',
  'The multi-tenant data isolation Velt built is rock solid. Fifty-six migrations, zero data leaks, enterprise clients fully confident. They understand that infrastructure has to be invisible — and they delivered exactly that.',
  5
),
(
  'trucktuck',
  'James Wilson', 'Co-Founder', 'TruckTuck',
  'Over a million visitors a month and not a single missed booking. The Redis and BullMQ architecture they designed handles our peak loads without breaking a sweat. We scaled without rewriting anything.',
  6
),
(
  'salespulse',
  'Emma Torres', 'Head of Sales', 'Scholarly',
  'The AI automation workflows Velt built replaced hours of manual work every week. Our team now spends that time on growth instead of copy-pasting between tools. The ROI was visible within the first month.',
  7
);
