-- ============================================================
-- Migration 009: Add images for pipa/keyos/trucktuck + fix em dashes
-- ============================================================

-- ── Images ────────────────────────────────────────────────────

UPDATE case_studies SET
  cover_image = '/case-studies/pipa/cover.png',
  images = array[
    '/case-studies/pipa/screen-1.png',
    '/case-studies/pipa/screen-2.png',
    '/case-studies/pipa/screen-3.png',
    '/case-studies/pipa/screen-4.png'
  ]
WHERE slug = 'pipa';

UPDATE case_studies SET
  cover_image = '/case-studies/keyos/cover.png',
  images = array[
    '/case-studies/keyos/screen-1.png',
    '/case-studies/keyos/screen-2.png',
    '/case-studies/keyos/screen-3.png',
    '/case-studies/keyos/screen-4.png'
  ]
WHERE slug = 'keyos';

UPDATE case_studies SET
  cover_image = '/case-studies/trucktuck/cover.png',
  images = array[
    '/case-studies/trucktuck/screen-1.png',
    '/case-studies/trucktuck/screen-2.png'
  ]
WHERE slug = 'trucktuck';

-- ── Em dash fixes ─────────────────────────────────────────────
-- Replace em dashes in user-facing content fields across all projects

-- RideSpotr
UPDATE case_studies SET
  tagline = 'A gamified car-spotting community with AI plate recognition, rarity scoring, and a global marketplace. Millions of spots and counting.',
  challenge = replace(challenge,
    'car marketplace, and event management — all in a single mobile app',
    'car marketplace, and event management, all in a single mobile app')
WHERE slug = 'ridespotr';

-- Wagerr
UPDATE case_studies SET
  tagline = 'Friendly sports wagers settled on-chain, hole by hole, with automatic payouts and zero disputes.',
  key_points = array[
    'Hole-by-hole golf scoring with automatic carry-over logic for tied holes',
    'Five sport verticals: golf, pickleball, tennis, poker, and chess',
    'Automatic payout calculation with no manual splitting or disputes possible',
    'Privy embedded wallets for deposits and withdrawals, no crypto knowledge needed',
    'Ethereum smart contract for transparent, tamper-proof on-chain settlement',
    'Alchemy webhook keeping the on-chain ledger synced with the database in real time',
    'Marketing website with shareable game invite links and deep linking into the app',
    'React admin panel for game oversight and dispute management'
  ],
  outcome_description = replace(outcome_description,
    'and a React admin panel — all connected to an Ethereum smart contract',
    'and a React admin panel, all connected to an Ethereum smart contract')
WHERE slug = 'wagerr';

-- NutritionUP
UPDATE case_studies SET
  challenge = replace(challenge,
    'through a separate portal — all shipped across mobile and web at the same time',
    'through a separate portal, all shipped across mobile and web at the same time'),
  outcome_description = replace(outcome_description,
    'and an internal admin panel — all backed by a shared Supabase backend',
    'and an internal admin panel, all backed by a shared Supabase backend')
WHERE slug = 'nutritionup';

-- PIPA
UPDATE case_studies SET
  tagline = 'Digital workforce apps for farming operations, from clock-in to payroll approval, with no paperwork.',
  challenge = replace(challenge,
    'and message their manager — without any training',
    'and message their manager, all without any training'),
  outcome_description = replace(outcome_description,
    'Two Flutter mobile apps — a worker app and a manager app — both live on iOS and Android',
    'Two Flutter mobile apps, a worker app and a manager app, both live on iOS and Android')
WHERE slug = 'pipa';

-- KeyOS
UPDATE case_studies SET
  key_points = array[
    'Four role-based portals: public, manager, admin, and tenant, all built on a single Next.js codebase',
    'Manager dashboard for stock levels, credential inventory, and billing history per building',
    'Tenant portal for self-serve credential requests with manager approval flow',
    'Admin fulfillment pipeline from order receipt through to Shippit dispatch',
    'Stripe subscription billing for building contracts plus per-order payments at checkout',
    'Supabase row-level security ensuring each building''s data is fully isolated at the database level',
    'Twilio SMS notifications at every key order status update',
    '56 database migrations managing a complex multi-tenant data model with full audit trail'
  ]
WHERE slug = 'keyos';

-- TruckTuck
UPDATE case_studies SET
  tagline = 'Find, book, and pay for secure truck parking across the US. Over a million visitors and 200+ bookings every month.'
WHERE slug = 'trucktuck';

-- SalesPulse
UPDATE case_studies SET
  challenge = replace(challenge,
    'The team at Scholarly — a fast-growing SaaS platform — needed two things',
    'Scholarly, a fast-growing SaaS platform, needed two things'),
  key_points = array[
    'Six live KPI cards: hours, calls, productivity, active staff count, and more',
    'AI-powered import that normalises over 40 different column name variations automatically',
    'Drag-and-drop CSV upload and Google Sheets URL import, compatible with any spreadsheet format',
    'Duplicate detection preventing the same data from being counted twice',
    'Filterable charts for calls per hour and team productivity breakdowns',
    'Team management with Sales and Success team creation and staff assignment',
    'Full audit log of every import, edit, and system action for accountability',
    'Numerous n8n AI automation workflows replacing manual tasks across their tool stack'
  ],
  outcome_description = replace(outcome_description,
    'and a complete audit log — plus a suite of n8n AI automation workflows',
    'and a complete audit log, plus a suite of n8n AI automation workflows')
WHERE slug = 'salespulse';

-- Also fix testimonials table if it exists
UPDATE testimonials SET
  quote = replace(quote, ' — ', ', ')
WHERE quote LIKE '% — %';
