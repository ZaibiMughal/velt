-- ============================================================
-- Migration 007: Add theme_color + key_points, drop duration/budget
-- Run this INSTEAD of 006 (007 supersedes it).
-- ============================================================

-- Schema changes
alter table case_studies
  add column if not exists theme_color  text not null default '#6366f1',
  add column if not exists key_points   text[] not null default '{}',
  alter column duration drop not null,
  alter column budget   drop not null;

-- Full replacement with real projects
delete from case_studies;

insert into case_studies (
  display_order, slug, title, category, tech,
  tagline, theme_color,
  challenge, key_points, solution,
  outcome_metric, outcome_description, outcomes,
  live_url, app_store_url, play_store_url,
  cover_image, images
) values

-- ── Mobile 1: RideSpotr ──────────────────────────────────────────
(
  1, 'ridespotr', 'RideSpotr', 'Mobile App',
  array['Flutter', 'Dart', 'Supabase', 'OpenAI', 'Mapbox', 'Stream.io', 'Firebase', 'Plate Recognizer'],
  'A gamified car-spotting community with AI plate recognition, rarity scoring, and a global marketplace — millions of spots and counting.',
  '#FE1E00',
  'The client wanted to turn the casual hobby of spotting rare and exotic cars into a competitive, social experience enjoyed by enthusiasts worldwide. The platform needed AI-powered vehicle identification from photos, a rarity engine that awarded XP per spot, real-time social feeds, an interactive city map, in-app group chat, a car marketplace, and event management — all in a single mobile app that had to feel fast and premium at a global scale.',
  array[
    'AI vehicle identification from a single photo using OpenAI',
    'Automatic number plate extraction and car lookup via Plate Recognizer',
    'Custom rarity engine that awards XP tiers per spot based on vehicle scarcity',
    'Real-time social feed with community spot photos and engagement',
    'Interactive Mapbox zones map showing spot density across cities worldwide',
    'In-app car marketplace for listing and buying vehicles',
    'Group chat and event management powered by Stream.io',
    'Supabase Edge Functions handling all scoring, rewards, and push notifications'
  ],
  'We built a Flutter app for iOS and Android backed by Supabase Edge Functions. OpenAI identifies vehicles from photos while Plate Recognizer extracts number plates automatically. A custom rarity engine assigns XP and tier badges per spot. Mapbox powers an interactive zones map and Stream.io handles real-time group chat. A full in-app marketplace lets users list and browse cars for sale.',
  'Millions of cars spotted by a global community',
  'RideSpotr has grown into a worldwide platform with millions of cars spotted by enthusiasts across the globe. The app runs on iOS and Android with AI vehicle identification, social spot feeds, an interactive city map, car marketplace, community events, leaderboards, and group chat.',
  '[
    {"label": "Cars Spotted",       "value": "Millions"},
    {"label": "Community",          "value": "Global"},
    {"label": "Platforms",          "value": "iOS + Android"},
    {"label": "AI Services",        "value": "OpenAI + Plate Recognizer"}
  ]'::jsonb,
  'https://www.ridespotr.com/',
  'https://apps.apple.com/au/app/ridespotr/id6755753643',
  'https://play.google.com/store/apps/details?id=com.ridespotr.mobile&hl=en&pli=1',
  '/case-studies/ridespotr/cover.jpeg',
  array['/case-studies/ridespotr/screen-1.jpeg', '/case-studies/ridespotr/screen-2.jpeg']
),

-- ── Mobile 2: Wagerr ─────────────────────────────────────────────
(
  2, 'wagerr', 'Wagerr', 'Mobile App',
  array['React Native', 'Expo', 'TypeScript', 'PHP', 'Yii2', 'PostgreSQL', 'Ethereum', 'Privy', 'Next.js', 'Firebase'],
  'Friendly sports wagers settled on-chain — hole by hole, with automatic payouts and zero disputes.',
  '#1A1AFF',
  'A group of sports enthusiasts wanted to move their friendly wagers off group chats and into an app that tracked scores fairly, calculated payouts automatically, and left no room for disagreements. The platform needed to span multiple sports, handle crypto-backed settlement through simple embedded wallets, and be as easy to use as sending a text message.',
  array[
    'Hole-by-hole golf scoring with automatic carry-over logic for tied holes',
    'Five sport verticals: golf, pickleball, tennis, poker, and chess',
    'Automatic payout calculation — no manual splitting or disputes possible',
    'Privy embedded wallets for deposits and withdrawals, no crypto knowledge needed',
    'Ethereum smart contract for transparent, tamper-proof on-chain settlement',
    'Alchemy webhook keeping the on-chain ledger synced with the database in real time',
    'Marketing website with shareable game invite links and deep linking into the app',
    'React admin panel for game oversight and dispute management'
  ],
  'We built a React Native app with hole-by-hole scoring for golf, pickleball, tennis, poker, and chess. Payout calculations follow agreed rules automatically. Privy embedded wallets let users deposit and withdraw without any crypto background. A PHP/Yii2 backend manages all game state, with an Alchemy webhook keeping the on-chain ledger reconciled in real time.',
  '5 sport verticals, one platform',
  'A React Native mobile app, a PHP backend API, a Next.js marketing website with invite links, and a React admin panel — all connected to an Ethereum smart contract for transparent, automatic payout settlement across five sport categories.',
  '[
    {"label": "Platforms",        "value": "iOS + Android"},
    {"label": "Sport Verticals",  "value": "5"},
    {"label": "Settlement",       "value": "On-chain"},
    {"label": "Systems Built",    "value": "4"}
  ]'::jsonb,
  'https://www.wagerr.app/',
  'https://apps.apple.com/us/app/wagerr-app/id6776876907',
  null,
  '/case-studies/wagerr/cover.jpeg',
  array['/case-studies/wagerr/screen-1.jpeg', '/case-studies/wagerr/screen-2.jpeg', '/case-studies/wagerr/screen-3.jpeg']
),

-- ── Mobile 3: NutritionUP ────────────────────────────────────────
(
  3, 'nutritionup', 'NutritionUP', 'Mobile App',
  array['Flutter', 'Dart', 'Supabase', 'React', 'TypeScript', 'Vite', 'Python', 'Gemini AI', 'Firebase', 'Resend'],
  'A full-stack nutrition coaching platform for individuals and corporate wellness programs, with AI meal advice and 1,000+ recipes.',
  '#1FC65D',
  'The client needed more than a food tracker. They wanted an AI nutrition coach, barcode scanning tied to an Australian food database, over a thousand curated recipes with a weekly meal planner, progress photo tracking, and a corporate wellness arm where employers could manage employee access through a separate portal — all shipped across mobile and web at the same time.',
  array[
    '14-step onboarding capturing goals, health conditions, and body metrics',
    'Daily nutrition logging with barcode scanning tied to the Australian AFCD food database',
    'AI meal coaching via Gemini that adapts suggestions to remaining daily targets',
    '1,090+ recipes with a weekly meal planner and auto-generated grocery lists',
    'Before-and-after progress photo timeline for visual tracking over time',
    'Corporate wellness flow with employer-issued company codes and domain-based access control',
    'Separate React HR portal for employers to manage team licences and access',
    'Internal admin portal for support staff to manage users and promo codes',
    'Python pipeline to import and maintain the full AUSNUT 2023 food database'
  ],
  'We built a Flutter mobile app with a 14-step onboarding flow, daily nutrition logging, AI meal coaching via Gemini, a recipe planner with 1,090+ recipes, and progress photo tracking. Alongside it, a React web platform, an HR portal for corporate employers, and an admin portal for internal staff. A Python pipeline seeded the full Australian AFCD food database into Supabase.',
  '4-platform ecosystem delivered',
  'iOS and Android mobile app, a public web platform, a corporate HR portal, and an internal admin panel — all backed by a shared Supabase backend with real-time subscriptions, AI coaching, and a complete Australian nutrition database.',
  '[
    {"label": "Platforms",        "value": "iOS, Android + Web"},
    {"label": "Recipes",          "value": "1,090+"},
    {"label": "Portals",          "value": "4"},
    {"label": "Onboarding Steps", "value": "14"}
  ]'::jsonb,
  'https://www.nutritionup.com.au/',
  null,
  null,
  '/case-studies/nutritionup/cover.png',
  array['/case-studies/nutritionup/screen-1.png', '/case-studies/nutritionup/screen-2.png', '/case-studies/nutritionup/screen-3.png']
),

-- ── Mobile 4: PIPA ───────────────────────────────────────────────
(
  4, 'pipa', 'PIPA', 'Mobile App',
  array['Flutter', 'Dart', 'Supabase', 'Firebase', 'BLoC', 'Google Maps', 'Xero API', 'GoRouter'],
  'Digital workforce apps for farming operations — from clock-in to payroll approval, without the paperwork.',
  '#F1008C',
  'Farm managers had no real-time visibility into who was on-site, were collecting timesheets on paper, and had no centralised way to track safety incidents or pre-start checks across locations. Workers needed something simple to clock in, flag issues, and message their manager — without any training.',
  array[
    'Worker app for digital clock in and out with a live shift timer',
    'Incident, hazard, and maintenance report submission with photo attachments',
    'Safety pre-start checklists completed before each shift begins',
    'Direct worker-to-manager messaging with Firebase push notifications',
    'Manager app with real-time GPS location tracking of all workers via Google Maps',
    'Timesheet review, one-click approval, and export-ready payroll data',
    'Xero accounting integration for direct payroll sync',
    'Employee onboarding, certificate and licence management within the manager app'
  ],
  'We built the Flutter mobile apps for iOS and Android: a worker app and a manager app. The worker app handles clock in/out, incident and hazard reporting, safety pre-start checks, task tracking, and direct messaging. The manager app provides timesheet approval, live GPS location tracking, payroll data export, Xero integration, and full employee management.',
  'Live on iOS and Android across farms',
  'Two Flutter mobile apps — a worker app and a manager app — both live on iOS and Android, with live GPS location tracking, Xero payroll integration, incident and safety reporting, timesheet approval, and real-time push notifications via Firebase.',
  '[
    {"label": "Apps Built",       "value": "2"},
    {"label": "Platforms",        "value": "iOS + Android"},
    {"label": "Payroll",          "value": "Xero Integration"},
    {"label": "Location",         "value": "Live GPS Tracking"}
  ]'::jsonb,
  'https://peopleinpaddocks.com.au/',
  'https://apps.apple.com/au/app/pipa-people-in-paddocks/id6695726549',
  'https://play.google.com/store/apps/details?id=com.pipa.app&hl=en',
  null,
  array[]::text[]
),

-- ── Web 1: KeyOS ─────────────────────────────────────────────────
(
  5, 'keyos', 'KeyOS', 'SaaS Platform',
  array['Next.js', 'React', 'TypeScript', 'Supabase', 'Stripe', 'Prisma', 'Shippit', 'Twilio', 'Resend', 'Playwright'],
  'A multi-portal credential management platform for property managers, tenants, and operations teams.',
  '#0066CC',
  'A proptech operator was managing building access fobs, keycards, and remotes through email chains and spreadsheets. As they scaled to more buildings, they needed a platform where managers could order credentials and track stock, tenants could self-serve requests, and internal staff could handle fulfillment, billing, and inventory — all in one place, with each building''s data kept completely separate.',
  array[
    'Four role-based portals: public, manager, admin, and tenant — built on a single Next.js codebase',
    'Manager dashboard for stock levels, credential inventory, and billing history per building',
    'Tenant portal for self-serve credential requests with manager approval flow',
    'Admin fulfillment pipeline from order receipt through to Shippit dispatch',
    'Stripe subscription billing for building contracts plus per-order payments at checkout',
    'Supabase row-level security ensuring each building''s data is fully isolated at the database level',
    'Twilio SMS notifications at every key order status update',
    '56 database migrations managing a complex multi-tenant data model with full audit trail'
  ],
  'We built four role-based portals on a single Next.js codebase: a public portal for building search and order tracking, a manager dashboard for stock and credentials, an admin panel for fulfillment and operations, and a tenant portal for self-serve requests. Stripe handles subscription billing. Shippit manages fulfillment. Supabase row-level security keeps each building''s data fully isolated.',
  '4 portals, one codebase',
  'A unified Next.js platform with four distinct role-based portals, Stripe subscription billing, Shippit fulfillment integration, Twilio SMS, HubSpot CRM, and 56 database migrations covering a complete multi-tenant credential management workflow.',
  '[
    {"label": "Portals Built",    "value": "4"},
    {"label": "Billing",          "value": "Stripe Subscriptions"},
    {"label": "Fulfillment",      "value": "Shippit"},
    {"label": "DB Migrations",    "value": "56"}
  ]'::jsonb,
  'https://www.keyos.com.au/',
  null,
  null,
  null,
  array[]::text[]
),

-- ── Web 2: TruckTuck ─────────────────────────────────────────────
(
  6, 'trucktuck', 'TruckTuck', 'Web Application',
  array['Next.js', 'React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Redis', 'BullMQ', 'SendGrid'],
  'Find, book, and pay for secure truck parking across the US — over a million visitors and 200+ bookings every month.',
  '#233E83',
  'Commercial truck drivers across the US had no reliable way to find and book secure parking in advance. The client needed a public-facing booking platform with flexible pricing, an operator dashboard for managing locations and inventory, and a backend that could handle booking reliability under the pressure of over a million monthly visitors without dropping a single reservation.',
  array[
    'Location search with state-based filtering across US parking facilities',
    'Three flexible pricing tiers per location: daily, weekly, and monthly rates',
    'Coupon and discount code system applied at checkout',
    'Stripe payment processing with automated booking confirmation emails via SendGrid',
    'Role-based admin panel with three permission levels: Admin, Manager, and User',
    'Redis caching for fast availability lookups under high concurrent load',
    'BullMQ job queues ensuring no booking is ever lost during peak traffic spikes',
    'PM2 deployment scripts for zero-downtime updates across all three systems'
  ],
  'We built three interconnected systems: a Next.js public website with location browsing, search filters, and Stripe checkout; a Next.js admin panel with role-based access for operators; and a Node.js/Express API backend with Redis caching and BullMQ job queues to ensure no booking is lost under load. All three deploy via scripted PM2 automation.',
  '1M+ monthly visitors, 200+ bookings/month',
  'TruckTuck serves over a million visitors every month and processes more than 200 bookings, running reliably on a three-system architecture: a public booking site, an operator admin panel, and a Node.js API backend with Redis caching and BullMQ queues.',
  '[
    {"label": "Monthly Visitors",  "value": "1M+"},
    {"label": "Monthly Bookings",  "value": "200+"},
    {"label": "Pricing Tiers",     "value": "Daily, Weekly, Monthly"},
    {"label": "Queue System",      "value": "Redis + BullMQ"}
  ]'::jsonb,
  'https://trucktuck.com/',
  null,
  null,
  null,
  array[]::text[]
),

-- ── Web 3: SalesPulse + AI Automations (Scholarly) ───────────────
(
  7, 'salespulse', 'SalesPulse', 'Admin Dashboard',
  array['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'OpenAI', 'n8n', 'Recharts', 'Tailwind CSS'],
  'An internal sales analytics dashboard and AI automation suite built for the team behind Scholarly.',
  '#4285f4',
  'The team at Scholarly — a fast-growing SaaS platform — needed two things: an internal dashboard to track sales team performance without manual spreadsheet work every week, and a suite of AI-powered automations to handle repetitive workflows across their tools. Different team members logged data with different column names, pipelines were fragmented, and hours were lost to manual reporting and copy-pasting between systems.',
  array[
    'Six live KPI cards: hours, calls, productivity, active staff count, and more',
    'AI-powered import that normalises over 40 different column name variations automatically',
    'Drag-and-drop CSV upload and Google Sheets URL import — works with any spreadsheet format',
    'Duplicate detection preventing the same data from being counted twice',
    'Filterable charts for calls per hour and team productivity breakdowns',
    'Team management with Sales and Success team creation and staff assignment',
    'Full audit log of every import, edit, and system action for accountability',
    'Numerous n8n AI automation workflows replacing manual tasks across their tool stack'
  ],
  'We built a Next.js analytics dashboard with six KPI cards, filterable team charts, and a staff management system. An AI-powered import pipeline uses OpenAI to normalise inconsistent field names from any CSV or Google Sheets source. We also designed and deployed multiple n8n automation workflows to eliminate manual repetitive tasks across Scholarly''s internal tools.',
  'Reporting automated, workflows rebuilt with AI',
  'An internal Next.js dashboard with live KPI tracking, AI-normalised data import, and a complete audit log — plus a suite of n8n AI automation workflows that replaced hours of manual work across the Scholarly team''s tool stack.',
  '[
    {"label": "Data Sources",     "value": "CSV + Google Sheets"},
    {"label": "AI Normalisation", "value": "40+ field variations"},
    {"label": "KPI Cards",        "value": "6"},
    {"label": "Automations",      "value": "n8n AI Workflows"}
  ]'::jsonb,
  null,
  null,
  null,
  null,
  array[]::text[]
);
