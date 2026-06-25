-- ============================================================
-- Migration 005: Seed partner companies
-- Run AFTER 003_url_fields_and_partners.sql
--
-- logo_url: after running this, go to Supabase Storage → partner-logos
-- Upload each company's logo (SVG or PNG, transparent bg recommended)
-- Then update logo_url with the public URL from the storage bucket.
-- ============================================================

insert into partners (display_order, name, logo_url, website_url) values
(1,  'Acme Corp',       null, 'https://example.com'),
(2,  'Nexus Digital',   null, 'https://example.com'),
(3,  'PeakFlow',        null, 'https://example.com'),
(4,  'Zentric Labs',    null, 'https://example.com'),
(5,  'Momentum Co',     null, 'https://example.com'),
(6,  'Forge Ventures',  null, 'https://example.com'),
(7,  'Orbit Studio',    null, 'https://example.com'),
(8,  'Catalyst Group',  null, 'https://example.com');
