-- ============================================================
-- Migration 003: Add URL fields to case_studies + create partners
-- Run AFTER 001_create_tables.sql
-- ============================================================

-- Add live URL fields to case_studies
alter table case_studies
  add column if not exists live_url       text,
  add column if not exists app_store_url  text,
  add column if not exists play_store_url text;

-- Partners table (companies / clients you've worked with)
create table if not exists partners (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null    default now(),
  display_order integer     not null    default 0,
  name          text        not null,
  logo_url      text,                        -- full public URL to the logo image
  website_url   text                         -- optional link on the logo
);

create index if not exists partners_order_idx on partners (display_order);

alter table partners enable row level security;

create policy "Public can read partners"
  on partners for select
  using (true);

-- Public storage bucket for partner logos
-- Setting public = true means no RLS policy is needed for reads.
-- Upload logos to: Storage → partner-logos → upload file
-- Then copy the public URL and paste into the logo_url column.
insert into storage.buckets (id, name, public)
values ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;
