-- ============================================================
-- Migration 006: Real case studies
-- Replaces all placeholder/demo data with real projects.
-- UPDATE: duration, budget, live_url, app_store_url, play_store_url
--         for each project before running in production.
-- ============================================================

delete from case_studies;

insert into case_studies (
  display_order, slug, title, category, duration, budget, tech,
  tagline, challenge, solution,
  outcome_metric, outcome_description, outcomes,
  live_url, app_store_url, play_store_url
) values

-- ── MOBILE 1 ─────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Feed screen: grid of spotted car photos with XP badges and rarity tiers visible
--   Shot 1 → Spot upload: camera view with number plate highlighted / detected
--   Shot 2 → Zones map: Mapbox map with spot pins clustered across a city area
--   Shot 3 → Leaderboard or user profile showing XP, tier badge, and spot count
--   Style  → Dark phone frame, portrait orientation, no status bar chrome
-- ─────────────────────────────────────────────────────────────────────────
(
  1,
  'ridespotr',
  'RideSpotr',
  'Mobile App',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Flutter', 'Dart', 'Supabase', 'OpenAI', 'Mapbox', 'Stream.io', 'Firebase', 'Plate Recognizer'],
  'A gamified car-spotting community with AI plate recognition, rarity scoring, and a built-in marketplace.',
  'The client wanted to turn the casual hobby of spotting rare and exotic cars into a competitive, social experience. The platform needed AI-powered vehicle identification from photos, a rarity engine that awarded XP per spot, real-time social feeds, an interactive map of spots, in-app group chat, a car marketplace, and event management — all in a single mobile app that felt fast and polished.',
  'We built a Flutter app for iOS and Android backed by Supabase Edge Functions. OpenAI identifies vehicles from photos while Plate Recognizer extracts number plates automatically. A custom rarity engine assigns XP and tier badges per spot based on vehicle scarcity. Mapbox powers an interactive zones map showing community spots across cities. Stream.io handles real-time group chat, and a full in-app marketplace lets users list and browse cars for sale.',
  'iOS + Android, full ecosystem',
  'Delivered a complete car-spotting platform: Flutter app on iOS and Android with AI vehicle identification, social spot feeds, interactive city map, car marketplace, events, leaderboards, group chat, and a Supabase backend with custom rarity scoring and push notifications.',
  '[
    {"label": "Platforms",          "value": "iOS + Android"},
    {"label": "AI Integrations",    "value": "OpenAI + Plate Recognizer"},
    {"label": "Key Features",       "value": "10+"},
    {"label": "Backend",            "value": "Supabase Edge Functions"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── MOBILE 2 ─────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Active game screen: live golf scorecard showing hole-by-hole scores and current wager amount
--   Shot 1 → Score entry: hole input screen with score fields and carry-over indicator
--   Shot 2 → Payout summary: end-of-round screen showing winner, amount won, and settlement status
--   Shot 3 → Home/lobby: list of active and upcoming games with friends' avatars
--   Style  → Dark phone frame, portrait orientation
-- ─────────────────────────────────────────────────────────────────────────
(
  2,
  'wagerr',
  'Wagerr',
  'Mobile App',
  'UPDATE_ME',
  'UPDATE_ME',
  array['React Native', 'Expo', 'TypeScript', 'PHP', 'Yii2', 'PostgreSQL', 'Ethereum', 'Privy', 'Next.js', 'Firebase'],
  'Friendly sports wagers settled on-chain — hole by hole, with automatic payouts and zero disputes.',
  'A group of sports enthusiasts wanted to move their friendly wagers off group chats and into an app that tracked scores fairly, calculated payouts automatically, and left no room for disagreements. The platform needed to cover multiple sports, handle crypto-backed settlement through simple embedded wallets, and feel as straightforward to use as sending a text.',
  'We built a React Native app with hole-by-hole scoring for golf, pickleball, tennis, poker, and chess. Payout calculations follow agreed rules automatically — ties carry over, did-not-play entries are excluded from round prizes. Privy embedded wallets let users deposit and withdraw without any crypto background. A PHP/Yii2 backend manages all game state, with an Alchemy webhook keeping the on-chain ledger reconciled in real time.',
  '5 sport verticals, one platform',
  'Delivered a React Native mobile app, a PHP backend API, a Next.js marketing website with invite links, and a React admin panel — all connected to an Ethereum smart contract for transparent, automatic payout settlement.',
  '[
    {"label": "Platforms",        "value": "iOS + Android"},
    {"label": "Sport Verticals",  "value": "Golf, Pickleball, Tennis, Poker, Chess"},
    {"label": "Settlement",       "value": "On-chain (Ethereum)"},
    {"label": "Systems Built",    "value": "App, API, Website, Admin"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── MOBILE 3 ─────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Home tab: daily nutrition overview with macro rings (protein/carbs/fats) and progress bars
--   Shot 1 → Meals tab: recipe browser showing recipe cards with nutrition info
--   Shot 2 → Coach tab: AI chat conversation with meal suggestion
--   Shot 3 → Track tab: food logging screen with barcode scanner active or food search results
--   Style  → Dark phone frame, portrait orientation
-- ─────────────────────────────────────────────────────────────────────────
(
  3,
  'nutritionup',
  'NutritionUP',
  'Mobile App',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Flutter', 'Dart', 'Supabase', 'React', 'TypeScript', 'Vite', 'Python', 'Gemini AI', 'Firebase', 'Resend'],
  'A full-stack nutrition coaching platform for individuals and corporate wellness programs — with AI meal advice and 1,000+ recipes.',
  'The client needed more than a food tracker. They wanted an AI nutrition coach, barcode scanning tied to an Australian food database, over a thousand recipes with a weekly meal planner, photo-based progress tracking, and a corporate wellness arm where employers could manage employee access through a separate HR portal — all shipped across mobile and web at the same time.',
  'We built a Flutter mobile app with a 14-step onboarding flow, daily nutrition logging, AI meal coaching via Gemini, a recipe planner with 1,090+ recipes, and before/after photo tracking. Alongside it, a React web platform for public users, an HR portal for corporate employers to manage team access, and an admin portal for internal staff. A Python pipeline imported the full Australian AFCD food database (AUSNUT 2023) into Supabase.',
  '4-platform ecosystem delivered',
  'iOS and Android mobile app, public website, corporate HR portal, and internal admin panel — all backed by a shared Supabase backend with AI coaching, real-time subscriptions, and a complete Australian nutrition database.',
  '[
    {"label": "Platforms",        "value": "iOS, Android + Web"},
    {"label": "Recipes",          "value": "1,090+"},
    {"label": "Portals",          "value": "4 (Mobile, Web, HR, Admin)"},
    {"label": "Onboarding Steps", "value": "14"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── MOBILE 4 ─────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (4 screenshots needed — show both apps):
--   Cover  → Manager app: dashboard showing employee list with clock-in status and today's timesheets
--   Shot 1 → Worker app: home screen with prominent clock in/clock out button and current shift timer
--   Shot 2 → Manager app: live location map showing worker GPS pins across the farm
--   Shot 3 → Worker app: incident/hazard report form with category selection and photo attachment
--   Style  → Dark phone frame, portrait orientation
-- ─────────────────────────────────────────────────────────────────────────
(
  4,
  'pipa',
  'PIPA',
  'Mobile App',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Flutter', 'Dart', 'Supabase', 'Firebase', 'BLoC', 'Google Maps', 'Xero API', 'GoRouter'],
  'Digital workforce tools for farming operations — from clock-in to payroll approval, without the paperwork.',
  'Farm managers had no real-time visibility into who was on-site, were collecting timesheets on paper at the end of each week, and had no centralised way to track safety incidents, pre-start checks, or hazard reports across multiple locations. Workers needed something simple to clock in, flag issues, and message their manager without any training.',
  'We built two Flutter apps sharing a Supabase backend. The worker app handles clock in and out, incident and hazard reporting, safety pre-start checks, task tracking, and direct messaging with managers. The manager app provides timesheet review and approval, live GPS location tracking via Google Maps, payroll data export, Xero accounting integration, and full employee management across all farm locations.',
  '2 apps, one connected platform',
  'A worker mobile app and a manager web and mobile app — both on iOS and Android — with live GPS location tracking, Xero payroll integration, incident and safety reporting, timesheet approval, and real-time push notifications via Firebase.',
  '[
    {"label": "Apps Built",       "value": "2 (Worker + Manager)"},
    {"label": "Platforms",        "value": "iOS + Android"},
    {"label": "Payroll",          "value": "Xero Integration"},
    {"label": "Location",         "value": "Live GPS Tracking"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── WEB 1 ────────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Manager dashboard: buildings overview with stock levels and recent orders list
--   Shot 1 → Admin fulfillment pipeline: orders table with status columns (Pending, Processing, Shipped)
--   Shot 2 → Tenant portal: clean order form for requesting a credential (fob/keycard)
--   Style  → Desktop browser frame (1440px wide), dark or light theme (whichever the app uses)
-- ─────────────────────────────────────────────────────────────────────────
(
  5,
  'keyos',
  'KeyOS',
  'SaaS Platform',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Next.js', 'React', 'TypeScript', 'Supabase', 'Stripe', 'Prisma', 'Shippit', 'Twilio', 'Resend', 'Playwright'],
  'A multi-portal credential management platform for property managers, tenants, and operations teams.',
  'A proptech operator was managing building access fobs, keycards, and remotes through email chains and spreadsheets. As they scaled to more buildings, they needed a platform where managers could order credentials and track stock, tenants could self-serve their requests, and internal staff could manage fulfillment, billing, and inventory — all in one place, with every building''s data kept completely separate.',
  'We built four role-based portals on a single Next.js codebase: a public portal for building search and order tracking; a manager dashboard for stock levels, credential history, and invoicing; an admin panel for fulfillment, user management, and operations reporting; and a tenant portal for self-serve credential requests. Stripe handles subscription billing and per-order payments. Shippit manages the fulfillment pipeline. Supabase row-level security ensures each building''s data is fully isolated at the database level.',
  '4 portals, one codebase',
  'A unified Next.js platform with four distinct role-based portals, Stripe subscription billing, Shippit fulfillment, Twilio SMS notifications, HubSpot CRM integration, and 56 database migrations covering a complete multi-tenant credential management workflow.',
  '[
    {"label": "Portals Built",    "value": "4"},
    {"label": "Billing",          "value": "Stripe Subscriptions"},
    {"label": "Fulfillment",      "value": "Shippit"},
    {"label": "DB Migrations",    "value": "56"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── WEB 2 ────────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Public site: location search results page showing parking facility cards with pricing
--   Shot 1 → Booking checkout: pricing breakdown page with daily/weekly/monthly options and Stripe form
--   Shot 2 → Admin panel: location management table with status toggles and pricing config
--   Style  → Desktop browser frame (1440px wide)
-- ─────────────────────────────────────────────────────────────────────────
(
  6,
  'trucktuck',
  'TruckTuck',
  'Web Application',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Next.js', 'React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Redis', 'BullMQ', 'SendGrid'],
  'Find, book, and pay for secure truck parking across the US — in under a minute.',
  'Commercial truck drivers across the US had no easy way to find and reserve secure parking in advance. The client needed a public-facing booking platform with flexible pricing, an operator dashboard for managing locations and inventory, and a backend that could handle booking reliability under peak demand without dropping a reservation.',
  'We built three interconnected systems: a Next.js public website with location browsing, search filters, coupon support, and Stripe checkout for bookings; a Next.js admin panel with role-based access for operators to manage locations, pricing packages, and fulfillment; and a Node.js/Express API backend with Redis caching and BullMQ job queues to ensure no booking is ever lost under load.',
  '3-app platform delivered',
  'A public-facing Next.js booking site, an operator admin panel with role-based access, and a Node.js API backend — all deployed via PM2 automation with daily, weekly, and monthly pricing tiers, coupon management, and Stripe payments.',
  '[
    {"label": "Systems Built",    "value": "3 (Site, Admin, API)"},
    {"label": "Pricing Tiers",    "value": "Daily, Weekly, Monthly"},
    {"label": "Payments",         "value": "Stripe"},
    {"label": "Infrastructure",   "value": "Redis + BullMQ"}
  ]'::jsonb,
  null,
  null,
  null
),

-- ── WEB 3 ────────────────────────────────────────────────────────────────
-- IMAGE INSTRUCTIONS (3 screenshots needed):
--   Cover  → Main dashboard: full view with 6 KPI cards at top and charts below (calls per hour, productivity by team)
--   Shot 1 → Data import screen: CSV drag-and-drop zone with the AI normalization preview table showing before/after field names
--   Shot 2 → Staff/metrics table: filterable table showing team members with their performance numbers
--   Style  → Desktop browser frame (1440px wide), dark mode if available
-- ─────────────────────────────────────────────────────────────────────────
(
  7,
  'salespulse',
  'SalesPulse',
  'Admin Dashboard',
  'UPDATE_ME',
  'UPDATE_ME',
  array['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'OpenAI', 'Recharts', 'Tailwind CSS'],
  'A real-time sales performance dashboard with AI-powered data import from any spreadsheet format.',
  'A sales team was manually copying call data and productivity numbers from spreadsheets into charts every week. The problem was that different team members used different column names, so the data never lined up cleanly. They needed a dashboard that could accept uploads in any format, normalise the data automatically, and show team performance at a glance without a manual cleanup step every time.',
  'We built a Next.js analytics dashboard with six KPI cards, filterable charts for calls-per-hour and productivity by team, and a staff management system. An AI-powered import pipeline uses OpenAI to normalise inconsistent field names from any CSV or Google Sheets source — handling over 40 column name variations automatically. A Node.js/Express backend with MongoDB stores all metrics, import history, and a full audit log.',
  'Weekly reporting fully automated',
  'A Next.js dashboard with live KPI cards, Recharts visualisations, AI-normalised data import from CSV and Google Sheets, staff and team management, and a complete audit log — replacing manual weekly reporting with an always-current view.',
  '[
    {"label": "Data Sources",     "value": "CSV + Google Sheets"},
    {"label": "AI Normalisation", "value": "40+ field variations"},
    {"label": "KPI Cards",        "value": "6"},
    {"label": "Audit Logging",    "value": "Full history"}
  ]'::jsonb,
  null,
  null,
  null
);
