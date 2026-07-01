-- ============================================================
-- Migration 010: Guided brief submissions table + upload bucket
-- ============================================================

create table if not exists brief_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_types text[] not null default '{}',
  stage text not null,
  description text not null,
  features text[] not null default '{}',
  budget text not null,
  timeline text not null,
  success text not null,
  file_paths text[] not null default '{}'
);

alter table brief_submissions enable row level security;

-- No public policies: only the service role key (server-side) can read/write.

-- Private bucket for brief file uploads
insert into storage.buckets (id, name, public)
values ('brief-uploads', 'brief-uploads', false)
on conflict (id) do nothing;
