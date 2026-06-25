-- ============================================================
-- Velt Website — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Contact form submissions
create table if not exists contact_submissions (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  name         text        not null,
  email        text        not null,
  company      text,
  budget       text        not null,
  project_type text        not null,
  description  text        not null
);

-- Case studies (portfolio)
create table if not exists case_studies (
  id                  uuid        primary key default gen_random_uuid(),
  created_at          timestamptz not null    default now(),
  display_order       integer     not null    default 0,
  slug                text        not null    unique,
  title               text        not null,
  category            text        not null,
  duration            text        not null,
  budget              text        not null,
  tech                text[]      not null    default '{}',
  tagline             text        not null,
  challenge           text        not null,
  solution            text        not null,
  outcome_metric      text        not null,
  outcome_description text        not null,
  outcomes            jsonb       not null    default '[]'
);

-- Index for slug lookups (used on every case study page)
create index if not exists case_studies_slug_idx on case_studies (slug);
-- Index for ordered listing
create index if not exists case_studies_order_idx on case_studies (display_order);

-- Row-level security: public read, no public write
alter table case_studies        enable row level security;
alter table contact_submissions enable row level security;

-- Anyone can read published case studies
create policy "Public can read case studies"
  on case_studies for select
  using (true);

-- No direct public inserts to contact_submissions
-- (inserts go through the Next.js API route using the service role key)
