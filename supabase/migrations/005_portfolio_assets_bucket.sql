-- ============================================================
-- Migration 005: Portfolio assets storage bucket
-- Private bucket — images served via signed URLs (1 hour expiry)
-- Run AFTER 001_create_tables.sql
-- ============================================================

-- Private bucket (public = false means direct URLs don't work;
-- images are served via signed URLs generated server-side)
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', false)
on conflict (id) do nothing;

-- Add cover_image and images array to case_studies
alter table case_studies
  add column if not exists cover_image text,      -- path in bucket e.g. 'bookease/cover.jpg'
  add column if not exists images      text[] default '{}'; -- additional screenshot paths

-- Service role (used by Next.js API) can read and write
-- Anon/public cannot access directly — signed URLs bypass RLS
create policy "Service role can manage portfolio assets"
  on storage.objects
  for all
  using (
    bucket_id = 'portfolio-assets'
    and auth.role() = 'service_role'
  )
  with check (
    bucket_id = 'portfolio-assets'
    and auth.role() = 'service_role'
  );
