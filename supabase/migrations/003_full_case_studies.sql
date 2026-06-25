-- ============================================================
-- Migration 004: Full case studies with demo data
-- 3 Mobile + 3 Web projects
-- Run AFTER 003_url_fields_and_partners.sql
-- This replaces the seed data from 002 — delete old rows first.
-- ============================================================

delete from case_studies;

insert into case_studies (
  display_order, slug, title, category, duration, budget, tech,
  tagline, challenge, solution,
  outcome_metric, outcome_description, outcomes,
  live_url, app_store_url, play_store_url
) values

-- ── MOBILE PROJECTS ───────────────────────────────────────────

(
  1,
  'bookease-booking-platform',
  'BookEase — Booking Platform',
  'Mobile App',
  '18 Days',
  '$9,000',
  array['React Native', 'Expo', 'Node.js', 'Stripe', 'PostgreSQL'],
  'A full-featured cross-platform booking app with real-time availability and payments — shipped in 18 days.',
  'The founder needed a complete booking system with real-time slot availability, Stripe payment processing, automated SMS confirmations, and user profile management — all within an 18-day hard deadline tied to a marketing campaign launch. Previous agencies had quoted 3 months and $45,000.',
  'We built a cross-platform React Native app using Expo for rapid iteration across iOS and Android simultaneously. A lightweight Node.js API handled slot availability with optimistic locking to prevent double-bookings. Stripe handled payments and automated refunds. Expo push notifications kept users informed of booking confirmations and reminders in real time.',
  'Launched in 18 days',
  'The app launched on schedule, processed its first 50 bookings within 24 hours, and received zero critical bug reports in the first month of operation. The client''s marketing campaign ran on time and hit its user acquisition targets.',
  '[
    {"label": "Days to Launch",     "value": "18"},
    {"label": "Platforms",          "value": "iOS + Android"},
    {"label": "Day-1 Bookings",     "value": "50"},
    {"label": "Critical Bugs",      "value": "0"}
  ]'::jsonb,
  null,
  'https://apps.apple.com',
  'https://play.google.com'
),

(
  2,
  'fittrack-fitness-app',
  'FitTrack — Fitness Tracker',
  'Mobile App',
  '3 Weeks',
  '$11,000',
  array['React Native', 'Expo', 'Supabase', 'Apple HealthKit', 'Google Fit'],
  'A cross-platform fitness tracker synced with Apple Health and Google Fit — 5,000 downloads in the first week.',
  'A fitness startup needed a native-feeling workout tracker that integrated with both Apple HealthKit and Google Fit, supported fully offline workouts with background sync, and displayed real-time progress charts without sacrificing performance. Previous web-based wrapper attempts had poor scroll performance and a 60% Day-7 retention rate — far below the 75% target.',
  'We built a React Native app with Expo and used Supabase for cloud sync with an offline-first local SQLite cache so workouts are never lost. Native HealthKit and Google Fit bridges were implemented via Expo modules. Custom SVG progress charts displayed weekly goals without any third-party chart library overhead, keeping the bundle under 12 MB. Background sync ran silently after each session.',
  '5,000 downloads in week 1',
  'The app launched to a waitlisted audience and hit 5,000 downloads in its first 7 days, with a 78% Day-7 retention rate — more than double the industry average for fitness apps. The App Store rating reached 4.8 stars within two weeks.',
  '[
    {"label": "Week-1 Downloads",   "value": "5,000"},
    {"label": "Day-7 Retention",    "value": "78%"},
    {"label": "App Store Rating",   "value": "4.8★"},
    {"label": "Crash Rate",         "value": "<0.1%"}
  ]'::jsonb,
  null,
  'https://apps.apple.com',
  'https://play.google.com'
),

(
  3,
  'swiftdeliver-delivery-app',
  'SwiftDeliver — Delivery Platform',
  'Mobile App',
  '5 Weeks',
  '$18,000',
  array['React Native', 'Expo', 'Google Maps SDK', 'Stripe Connect', 'Socket.io', 'Node.js'],
  'Two apps, one dashboard, real-time GPS tracking — 300 orders processed on launch day.',
  'A logistics startup needed three products built simultaneously and in parallel: a customer delivery app, a driver app with turn-by-turn navigation, and an operations admin dashboard — all with live GPS order tracking, multi-party payments, and automated driver payouts. Timeline was 6 weeks to hit a city-wide public launch date with press coverage already booked.',
  'We shipped all three products in parallel: a customer React Native app, a driver app with Google Maps SDK turn-by-turn navigation and background location tracking, and a Next.js admin panel showing a live map of all active orders. Socket.io powered real-time location updates at 5-second intervals. Stripe Connect handled customer payments and automated driver payouts on delivery completion.',
  '300 orders on launch day',
  'The platform processed 300 orders on its first day across 45 onboarded drivers, with a 99.9% payment success rate and zero GPS tracking outages during peak-hour load. The press launch ran smoothly and the client secured a seed round six weeks later, citing the flawless launch as proof of execution capability.',
  '[
    {"label": "Launch Day Orders",  "value": "300"},
    {"label": "Active Drivers",     "value": "45"},
    {"label": "Payment Success",    "value": "99.9%"},
    {"label": "GPS Uptime",         "value": "100%"}
  ]'::jsonb,
  null,
  'https://apps.apple.com',
  'https://play.google.com'
),

-- ── WEB / SAAS PROJECTS ───────────────────────────────────────

(
  4,
  'nexus-analytics-dashboard',
  'Nexus — Analytics Dashboard',
  'SaaS Platform',
  '3 Weeks',
  '$12,000',
  array['Next.js', 'Supabase', 'Recharts', 'TypeScript', 'Tailwind CSS'],
  'Transforming raw event data into actionable insights — adopted by 200+ users on day one.',
  'The client had months of raw event data flowing into a database with no way to surface trends or share insights with their non-technical team. Manual reporting consumed 6 hours every week and delayed product decisions by days. They needed a dashboard that was both powerful enough for analysts and simple enough for executives to self-serve — with role-based access and data export.',
  'We built a Next.js SaaS dashboard backed by Supabase, with automated aggregation pipelines that refreshed visualisations every 15 minutes. Interactive Recharts graphs let users drill down by date range, segment, and event type. Role-based access control differentiated viewer and admin permissions. A one-click CSV export and shareable public report links shipped as part of the MVP scope.',
  'Adopted by 200+ users on day 1',
  'The dashboard launched to a waitlisted audience and hit 200 sign-ups in the first 24 hours with zero downtime during the surge. The client''s weekly reporting time dropped from 6 hours to under 10 minutes. The product became a revenue-generating SaaS within 30 days of launch.',
  '[
    {"label": "Day-1 Sign-ups",     "value": "200+"},
    {"label": "Reporting Time",     "value": "-6 hrs/wk"},
    {"label": "Uptime at Launch",   "value": "100%"},
    {"label": "SaaS MRR at D30",   "value": "$3,200"}
  ]'::jsonb,
  'https://example.com',
  null,
  null
),

(
  5,
  'trademark-marketplace',
  'TradeMark — Marketplace',
  'Web Application',
  '4 Weeks',
  '$15,000',
  array['Next.js', 'Stripe Connect', 'PostgreSQL', 'Prisma', 'NextAuth.js'],
  'A two-sided marketplace with split payments and 5-minute seller onboarding — $40K GMV in month one.',
  'The founder needed to validate a two-sided marketplace concept with real buyers and sellers before raising a seed round. The platform required seller onboarding with identity verification, Stripe Connect split payments with escrow-style payouts, buyer protection, and trust-building social proof features — all within a 4-week window before a planned investor demo.',
  'We built a Next.js marketplace with Stripe Connect for multi-party payouts and automated seller verification, Prisma-managed PostgreSQL for listings, transactions, and reviews, and NextAuth.js for secure buyer and seller authentication. A frictionless seller onboarding flow got vendors live in under 5 minutes. Buyer protection was implemented via Stripe payment holds, released on delivery confirmation.',
  '$40K GMV in month 1',
  'The MVP generated $40,000 in gross merchandise value in its first month across 35 active sellers, validating the business model and directly unlocking a $250K pre-seed round. The investor demo went live on a fully functional product rather than a prototype.',
  '[
    {"label": "GMV — Month 1",      "value": "$40K"},
    {"label": "Active Sellers",     "value": "35"},
    {"label": "Payment Success",    "value": "99.8%"},
    {"label": "Pre-seed Raised",    "value": "$250K"}
  ]'::jsonb,
  'https://example.com',
  null,
  null
),

(
  6,
  'pulsehr-saas-platform',
  'PulseHR — HR Platform',
  'SaaS Platform',
  '6 Weeks',
  '$22,000',
  array['Next.js', 'Supabase', 'Stripe', 'Resend', 'TypeScript', 'Tailwind CSS'],
  'A purpose-built HR platform that replaced spreadsheets for 12 companies — $2,400 MRR on day one.',
  'A B2B startup was building an HR management tool to replace spreadsheets for small teams. They needed multi-tenant architecture with strict data isolation, leave and absence management, payroll summary views, performance review cycles, and Stripe subscription billing with seat-based pricing — all production-ready and not a prototype. Previous development attempts had stalled at the multi-tenancy architecture.',
  'We architected a multi-tenant Next.js SaaS with Supabase Row Level Security ensuring complete data isolation between companies at the database level. Stripe Billing handled subscriptions with a 14-day free trial and seat-based pricing tiers. A Resend-powered email system automated leave approval workflows, onboarding sequences, payroll reminders, and performance review nudges. The admin panel allowed HR managers to configure approval chains without developer involvement.',
  '12 paying companies on day 1',
  'Twelve companies activated paid plans on launch day, generating $2,400 in MRR from day one. Trial-to-paid conversion hit 67% within the first month — well above the SaaS benchmark of 25%. Zero churn in month one, with four companies upgrading to higher seat tiers within 30 days.',
  '[
    {"label": "Paying Companies D1", "value": "12"},
    {"label": "MRR — Week 1",       "value": "$2,400"},
    {"label": "Trial → Paid",       "value": "67%"},
    {"label": "Month-1 Churn",      "value": "0%"}
  ]'::jsonb,
  'https://example.com',
  null,
  null
);
