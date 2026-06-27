export interface Platform {
  name: string;
  type: string;
  description: string;
  highlights: string[];
  tech?: string[];
}

export interface DeepDive {
  intro: string;
  platforms: Platform[];
}

export const DEEP_DIVES: Record<string, DeepDive> = {
  ridespotr: {
    intro: 'RideSpotr is a single Flutter app for iOS and Android, but under the hood it is a full product ecosystem: an AI identification pipeline, a gamification engine, a real-time social layer, an in-app marketplace, and a live events system — all running on Supabase Edge Functions.',
    platforms: [
      {
        name: 'Spotting & AI Engine',
        type: 'Core Feature',
        description: 'The heart of RideSpotr. Users photograph a car and the app immediately identifies the make, model, and year using OpenAI Vision, while Plate Recognizer extracts the number plate automatically. The spot is then scored by a custom rarity engine that assigns XP and tier badges based on how rarely that vehicle appears in the community.',
        highlights: [
          'OpenAI Vision integration for make, model, and year identification from a single photo',
          'Plate Recognizer API for automatic number plate extraction and car lookup',
          'Custom rarity scoring engine with XP tiers: Common, Rare, Epic, Legendary',
          'Duplicate spot detection to prevent the same car being scored multiple times',
          'Supabase Edge Function handling all scoring logic server-side for fairness',
        ],
        tech: ['OpenAI Vision', 'Plate Recognizer', 'Supabase Edge Functions', 'Dart'],
      },
      {
        name: 'Social Feed & Community',
        type: 'Social Layer',
        description: 'A real-time social feed where users share their spots, react, comment, and follow other enthusiasts. The feed is personalised by location, vehicle type, and rarity tier, and supports video as well as photo posts.',
        highlights: [
          'Real-time spot feed with photo and video support',
          'Follow system, likes, and comment threads per spot',
          'Location-based feed filtering by city and radius',
          'Push notifications for new followers, reactions, and community events',
          'User profiles with spot history, total XP, tier badge, and leaderboard ranking',
        ],
        tech: ['Supabase Realtime', 'Firebase Cloud Messaging', 'Flutter'],
      },
      {
        name: 'Interactive Zones Map',
        type: 'Map Feature',
        description: 'A Mapbox-powered live map showing community spots clustered across cities worldwide. Users can explore zones, see what rare vehicles have been spotted nearby, and plan spotting routes based on historical data.',
        highlights: [
          'Mapbox GL map with real-time spot pins clustered by density',
          'Zone heat maps showing spotting activity across cities',
          'Filter by vehicle rarity, date range, and make/model',
          'Spot detail view on pin tap with photo, XP value, and spotter profile',
          'Location-based push notifications when rare vehicles are spotted nearby',
        ],
        tech: ['Mapbox', 'Supabase PostGIS', 'Flutter'],
      },
      {
        name: 'Car Marketplace',
        type: 'Marketplace',
        description: 'An in-app marketplace where users can list and browse cars for sale. Listings are tied to the spotter community, so buyers can see the seller\'s credibility, their spot history, and the rarity of cars they own.',
        highlights: [
          'Create listings with photos, price, mileage, and vehicle details',
          'Buyer and seller messaging within the app',
          'Seller credibility tied to community XP and spot history',
          'Saved listings and price change notifications',
          'Moderation tools for admin review of flagged listings',
        ],
        tech: ['Supabase', 'Stream.io', 'Flutter'],
      },
      {
        name: 'Group Chat & Events',
        type: 'Community Features',
        description: 'Stream.io-powered group chat rooms let enthusiasts organise meetups and spotting events. Event organisers can create public and invite-only events, track RSVPs, and post real-time updates to attendees.',
        highlights: [
          'Group chat channels powered by Stream.io for real-time messaging',
          'Public and invite-only car spotting events with RSVP tracking',
          'Event location, schedule, and description with in-app map pin',
          'Event notifications and reminders via push',
          'Post-event spot leaderboard showing who scored the most XP on the day',
        ],
        tech: ['Stream.io', 'Supabase', 'Firebase Cloud Messaging'],
      },
    ],
  },

  wagerr: {
    intro: 'Wagerr is four interconnected products: a React Native mobile app, a PHP/Yii2 backend API, a Next.js marketing website, and an Ethereum smart contract. Each product handles a distinct part of the wager lifecycle from game creation through to on-chain settlement.',
    platforms: [
      {
        name: 'Mobile App',
        type: 'iOS + Android',
        description: 'The primary product. A React Native app for iOS and Android where users create wager games, invite friends, enter scores hole by hole, and track payouts in real time. Five sport verticals are supported, each with custom scoring rules.',
        highlights: [
          'Golf: hole-by-hole scoring with carry-over logic for tied holes and Nassau formats',
          'Pickleball, tennis, poker, and chess: each with sport-specific scoring and payout rules',
          'Game lobby showing active, upcoming, and completed games with friend avatars',
          'Privy embedded wallets for USDC deposits and withdrawals — no crypto experience required',
          'Real-time score updates pushed to all players in the game via websocket',
          'End-of-round payout summary showing winner, amount, and settlement status',
        ],
        tech: ['React Native', 'Expo', 'TypeScript', 'Privy', 'Firebase'],
      },
      {
        name: 'Backend API',
        type: 'API Server',
        description: 'A PHP/Yii2 REST API that manages all game state, scoring logic, and player accounts. The backend enforces all payout rules server-side so no client can manipulate outcomes, and it maintains a reconciled ledger that stays in sync with the Ethereum smart contract.',
        highlights: [
          'RESTful API for all game CRUD operations, score entry, and payout calculation',
          'Payout engine enforcing all sport-specific rules: ties, did-not-play exclusions, partial settlements',
          'Alchemy webhook listener keeping the on-chain ledger reconciled with the database in real time',
          'Player account management, friend connections, and game invitation system',
          'PostgreSQL database with full game history and audit log',
        ],
        tech: ['PHP', 'Yii2', 'PostgreSQL', 'Alchemy Webhooks'],
      },
      {
        name: 'Marketing Website',
        type: 'Web',
        description: 'A Next.js marketing site that doubles as a game invite hub. Shareable invite links deep-link directly into the app or prompt download for new users, with each link pre-loading the specific game the sender is inviting them to.',
        highlights: [
          'Landing page with feature overview and App Store / Google Play download CTAs',
          'Dynamic invite link pages: clicking opens the app or routes to download',
          'Deep linking that pre-loads the specific game after app install',
          'SEO-optimised sport-specific landing pages for organic acquisition',
        ],
        tech: ['Next.js', 'TypeScript', 'Vercel'],
      },
      {
        name: 'Ethereum Smart Contract',
        type: 'Blockchain',
        description: 'An Ethereum smart contract that holds the wager funds in escrow and releases them automatically to the winner when the backend signals settlement. This makes payouts trustless — no one can withhold winnings or dispute the outcome once scores are locked.',
        highlights: [
          'USDC escrow: funds locked at game start, released automatically on settlement signal',
          'Settlement triggered by the backend API after all scores are confirmed',
          'Transparent on-chain payout history viewable by all players',
          'Alchemy monitoring for transaction confirmation and failure handling',
        ],
        tech: ['Ethereum', 'Solidity', 'USDC', 'Alchemy'],
      },
    ],
  },

  nutritionup: {
    intro: 'NutritionUP is a four-platform ecosystem: a Flutter mobile app for end users, a React web platform for browser-based access, a corporate HR portal for employers, and an internal admin portal for the operations team — all sharing a single Supabase backend.',
    platforms: [
      {
        name: 'Mobile App',
        type: 'iOS + Android',
        description: 'The flagship product. A Flutter app for iOS and Android with a 14-step personalised onboarding flow, daily nutrition logging, an AI meal coach, a 1,090-recipe library with a weekly meal planner, and before/after progress photo tracking.',
        highlights: [
          '14-step onboarding capturing goals, activity level, health conditions, dietary restrictions, and body metrics',
          'Daily nutrition log with barcode scanning tied to the Australian AFCD food database (AUSNUT 2023)',
          'AI meal coaching via Gemini that adapts suggestions to remaining daily macro targets',
          '1,090+ recipes filterable by goal, dietary preference, and preparation time',
          'Weekly meal planner with auto-generated grocery shopping lists',
          'Before-and-after progress photo timeline with date-stamped entries',
          'Corporate wellness flow: employees enter employer-issued company codes to access subsidised plans',
        ],
        tech: ['Flutter', 'Dart', 'Supabase', 'Gemini AI', 'Firebase', 'BLoC'],
      },
      {
        name: 'Web Platform',
        type: 'Web App',
        description: 'A React/Vite web application giving users who prefer a browser experience access to the same nutrition tracking, recipe library, and AI coaching features as the mobile app. Fully responsive and feature-parity with the mobile product.',
        highlights: [
          'Browser-based nutrition logging and macro tracking dashboard',
          'Full recipe library access with search, filtering, and meal planning',
          'AI coaching chat interface powered by Gemini',
          'Progress tracking and body metrics history',
          'Shared Supabase backend — data syncs seamlessly between web and mobile',
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Resend'],
      },
      {
        name: 'HR Portal',
        type: 'Corporate Dashboard',
        description: 'A React web portal for corporate clients where HR managers and employers can manage employee access to NutritionUP\'s wellness program. Employers issue company codes, monitor usage, and manage licence counts without needing app access themselves.',
        highlights: [
          'Company code generation and distribution management for employee onboarding',
          'Real-time dashboard showing employee activation rate and active user count',
          'Licence management: add seats, deactivate lapsed employees, and view renewal dates',
          'Usage reporting exportable to CSV for internal wellness program reporting',
          'Domain-based access control to restrict corporate plans to company email addresses',
        ],
        tech: ['React', 'TypeScript', 'Supabase', 'Resend'],
      },
      {
        name: 'Admin Portal',
        type: 'Internal Tool',
        description: 'An internal React portal for the NutritionUP operations team to manage the full platform. Admins can view and edit any user account, manage promo codes, review AI coaching conversations for quality, and oversee corporate client accounts.',
        highlights: [
          'Full user management: view, edit, suspend, and delete user accounts',
          'Promo code creation with usage limits, expiry dates, and discount tiers',
          'Corporate client management: activate, deactivate, and adjust employer accounts',
          'AI conversation audit log for quality review and edge-case improvement',
          'Platform analytics: daily active users, onboarding completion rates, most-logged foods',
        ],
        tech: ['React', 'TypeScript', 'Supabase', 'Python'],
      },
    ],
  },

  pipa: {
    intro: 'PIPA is two Flutter mobile apps sharing a single Supabase backend — one built specifically for farm workers, and one for farm managers. Each app has a completely different feature set and UX tailored to its audience, but all data flows between them in real time.',
    platforms: [
      {
        name: 'Worker App',
        type: 'iOS + Android',
        description: 'Built for farm workers who may be in the field with limited time and connectivity. The app focuses on quick, single-tap interactions: clock in with one tap, submit an incident report in under two minutes, complete a safety checklist before starting a shift, and message the manager directly.',
        highlights: [
          'One-tap clock in and clock out with automatic shift timer and overtime tracking',
          'Incident and hazard report submission with photo attachments and category selection',
          'Safety pre-start checklists with mandatory sign-off before each shift begins',
          'Task assignment view showing daily and weekly tasks assigned by the manager',
          'Direct messaging with the farm manager via Firebase push notifications',
          'Farm join flow: workers enter a code to connect to their employer\'s account',
          'Multi-language support: English, French, German, Spanish, Indonesian, Portuguese, Chinese',
        ],
        tech: ['Flutter', 'Dart', 'Supabase', 'Firebase', 'BLoC', 'GoRouter'],
      },
      {
        name: 'Manager App',
        type: 'iOS + Android',
        description: 'Built for farm managers who need real-time visibility across multiple workers and locations. The app gives managers a live GPS map of all on-site workers, a timesheet approval queue, payroll export tools, and full employee management — all from their phone.',
        highlights: [
          'Live GPS location map showing all clocked-in workers across farm locations via Google Maps',
          'Timesheet review queue with line-by-line approval, editing, and rejection',
          'One-click payroll data export ready for Xero integration and accounting submission',
          'Xero API sync for direct payroll reconciliation without manual data entry',
          'Incident and hazard report inbox with status tracking and resolution notes',
          'Employee onboarding: add workers, assign to locations, manage certificates and licences',
          'Push notifications for new incident reports, clock-in anomalies, and pending approvals',
        ],
        tech: ['Flutter', 'Dart', 'Supabase', 'Google Maps', 'Xero API', 'Firebase', 'BLoC'],
      },
    ],
  },

  keyos: {
    intro: 'KeyOS is four distinct web portals built on a single Next.js codebase, each serving a different user role in the building credential workflow. All four portals share the same Supabase database with row-level security ensuring each building\'s data stays completely isolated.',
    platforms: [
      {
        name: 'Public Portal',
        type: 'Web App',
        description: 'The public-facing entry point where anyone can search for their building, track an existing order, or learn about the platform. No login required for building search and order lookup, lowering the barrier for tenants and prospective clients.',
        highlights: [
          'Building search by name, address, and postcode across all managed properties',
          'Order tracking: enter an order reference to view current status and estimated delivery',
          'Feature overview pages targeting building managers looking to onboard their property',
          'Tenant login redirect routing users to their building-specific tenant portal',
          'SEO-optimised landing pages for each supported state and city',
        ],
        tech: ['Next.js', 'TypeScript', 'Supabase'],
      },
      {
        name: 'Manager Dashboard',
        type: 'Client Portal',
        description: 'The primary portal for property managers. Managers get a full overview of credential inventory for their buildings, can place and track stock orders, review billing history, and see which credentials are issued, in stock, or flagged as lost.',
        highlights: [
          'Multi-building overview with per-building credential inventory and stock levels',
          'Credential detail view: serial number, type, current status, issued tenant, and history',
          'Stock order placement with Shippit fulfillment integration for delivery tracking',
          'Low-stock alerts and reorder recommendations based on historical usage',
          'Stripe billing history and invoice download per building',
          'Tenant list management and credential assignment per unit',
        ],
        tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Shippit', 'Twilio'],
      },
      {
        name: 'Admin Panel',
        type: 'Internal Tool',
        description: 'The internal operations portal for the KeyOS team. Admins manage the full fulfillment pipeline from order receipt through picking, packing, and Shippit dispatch, as well as user management, building onboarding, and platform-wide reporting.',
        highlights: [
          'Order fulfillment pipeline: pending, processing, dispatched, and delivered status columns',
          'Shippit integration for label generation, carrier selection, and tracking updates',
          'User management: onboard new building managers, reset access, and manage permissions',
          'Building configuration: set up credential product catalogues and pricing per property',
          'HubSpot CRM integration for sales pipeline and client communication tracking',
          'Platform analytics: order volume, fulfilment times, and stock turnover by building',
        ],
        tech: ['Next.js', 'TypeScript', 'Supabase', 'Shippit', 'Twilio', 'Resend', 'Playwright'],
      },
      {
        name: 'Tenant Portal',
        type: 'Self-Serve Web App',
        description: 'A streamlined self-serve portal for building tenants to request replacement fobs, keycards, or remotes without calling the manager. Requests go through a manager approval flow before fulfillment, keeping the manager in control while eliminating manual inbox handling.',
        highlights: [
          'Building search and unit selection to identify the correct credential product catalogue',
          'Self-serve credential request form with product selection and quantity',
          'Manager approval flow: requests are held until the building manager approves them',
          'Stripe payment at checkout for approved orders with per-unit pricing',
          'Order status tracking from approval through to Shippit delivery',
          'SMS notifications at each status change via Twilio',
        ],
        tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Twilio'],
      },
    ],
  },

  trucktuck: {
    intro: 'TruckTuck is three interconnected systems deployed independently: a public-facing Next.js booking website, an operator admin panel, and a Node.js/Express backend API. Together they handle over a million visitors and 200+ bookings every month without missing a reservation.',
    platforms: [
      {
        name: 'Public Booking Site',
        type: 'Web App',
        description: 'The customer-facing Next.js website where commercial truck drivers find parking locations, compare pricing, and complete bookings via Stripe. The site is optimised for high traffic and handles location browsing, coupon redemption, and booking confirmation entirely in the browser.',
        highlights: [
          'Location search with state-based filtering across US parking facilities',
          'Location detail pages with photos, amenities, access instructions, and availability',
          'Three pricing tiers per location: daily, weekly, and monthly rates',
          'Coupon and discount code application at checkout with real-time price updates',
          'Stripe payment processing with automated booking confirmation emails via SendGrid',
          'Order history and booking management for returning customers',
          'SEO-optimised location pages ranking for city and state-specific truck parking searches',
        ],
        tech: ['Next.js', 'TypeScript', 'Stripe', 'SendGrid', 'Redis'],
      },
      {
        name: 'Operator Admin Panel',
        type: 'Admin Dashboard',
        description: 'A Next.js admin portal with three permission levels — Admin, Manager, and User — giving operators everything they need to manage locations, pricing, and booking volume without touching code.',
        highlights: [
          'Role-based access: Admin sees all locations, Manager sees assigned locations, User is read-only',
          'Location management: add, edit, activate, and deactivate parking facilities with pricing config',
          'Booking management: view, search, and export all bookings with status filters',
          'Coupon management: create and expire discount codes with usage limit controls',
          'Content management for location descriptions, photos, and amenity lists',
          'Revenue reporting with date-range filters and per-location breakdown',
          'Promo lead management: capture and track enquiries from the public site',
        ],
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      },
      {
        name: 'Backend API',
        type: 'API Server',
        description: 'A Node.js/Express API server that sits behind both the public site and admin panel, handling all booking logic, availability checks, and payment processing. Redis caching and BullMQ job queues ensure that no booking is ever lost under peak traffic — even at over a million monthly visitors.',
        highlights: [
          'RESTful API handling all booking creation, modification, and cancellation logic',
          'Redis caching for fast availability and pricing lookups under high concurrent load',
          'BullMQ job queues ensuring booking confirmation emails are sent reliably even under traffic spikes',
          'Stripe webhook handler reconciling payment success and failure events with booking status',
          'PM2 deployment scripts for zero-downtime deploys across all three systems',
          'PostgreSQL database with Prisma ORM for type-safe queries and migration management',
          'SendGrid transactional email for booking confirmations, reminders, and receipts',
        ],
        tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'SendGrid'],
      },
    ],
  },

  salespulse: {
    intro: 'SalesPulse is two separate but connected products built for the Scholarly team: an internal analytics dashboard for tracking sales performance, and a suite of n8n AI automation workflows replacing manual repetitive tasks across their tool stack.',
    platforms: [
      {
        name: 'Analytics Dashboard',
        type: 'Internal Web App',
        description: 'A Next.js dashboard giving the Scholarly sales team a real-time view of team performance without any manual reporting. Six KPI cards update automatically as data is imported, and filterable charts break down productivity by team and time period.',
        highlights: [
          'Six live KPI cards: total hours, calls made, productivity score, active staff, conversion rate, and more',
          'Filterable charts: calls per hour and productivity broken down by Sales team and Success team',
          'Staff management: create teams, assign members, and track individual performance over time',
          'Full audit log of every import, edit, and action for accountability and rollback',
          'Duplicate detection preventing the same data being counted twice across imports',
          'Date-range filtering across all charts and KPI cards',
        ],
        tech: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Recharts', 'Tailwind CSS'],
      },
      {
        name: 'AI Import Pipeline',
        type: 'Data Processing',
        description: 'The core technical problem: every team member used different column names in their spreadsheets. The AI import pipeline accepts any CSV or Google Sheets URL and uses OpenAI to normalise over 40 different column name variations into a consistent schema — automatically, with no manual mapping required.',
        highlights: [
          'Drag-and-drop CSV upload or Google Sheets URL import for any spreadsheet format',
          'OpenAI-powered field name normalisation handling 40+ column name variations automatically',
          'Pre-import preview table showing the normalised data before it is committed',
          'Duplicate row detection comparing against all previously imported data',
          'Import history log with row counts, timestamps, and the ability to revert',
          'Error reporting for rows that could not be normalised with suggested corrections',
        ],
        tech: ['Node.js', 'Express', 'OpenAI', 'MongoDB'],
      },
      {
        name: 'n8n AI Automations',
        type: 'Workflow Automation',
        description: 'A suite of n8n automation workflows built to replace hours of manual copy-pasting and repetitive tasks across the Scholarly team\'s tool stack. Each workflow is triggered automatically by events across their existing tools.',
        highlights: [
          'Automated lead routing from web forms into CRM with AI-assigned priority scores',
          'Daily performance summary emails generated from dashboard data and sent to managers',
          'Slack notification workflows for key sales milestones and team alerts',
          'Data sync workflows keeping spreadsheets, CRM, and dashboard in sync automatically',
          'AI-powered email drafting workflow for common sales follow-up scenarios',
        ],
        tech: ['n8n', 'OpenAI', 'Slack API', 'Google Sheets API'],
      },
    ],
  },
};
