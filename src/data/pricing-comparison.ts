/**
 * Full plan-comparison table for the dedicated /pricing page. Kept separate
 * from packages.ts since the categorized row structure here (with per-tier
 * variant text, not just a flat feature list) doesn't map cleanly onto the
 * homepage summary cards' plain string arrays.
 */

export type Cell = true | false | string;

export interface ComparisonRow {
  label: string;
  note?: string;
  values: [Cell, Cell, Cell]; // [Launch MVP, Growth Platform, SaaS Platform]
}

export interface ComparisonCategory {
  title: string;
  subtitle?: string;
  rows: ComparisonRow[];
}

export const COMPARISON: ComparisonCategory[] = [
  {
    title: 'Platform',
    rows: [
      {
        label: 'Platform(s) built',
        values: ['1 platform (mobile or web)', '1 platform (mobile or web)', 'Both platforms (mobile and web)'],
      },
    ],
  },
  {
    title: 'Core build',
    rows: [
      { label: 'Core business features', values: [true, true, true] },
      { label: 'Authentication and user accounts', values: [true, true, true] },
      { label: 'User profiles and database setup', values: [true, true, true] },
      { label: 'Backend server', note: 'Supabase, Node.js, etc.', values: [true, true, true] },
      { label: 'API integrations', values: ['Essential', '+ additional', '+ third-party and CRM'] },
      { label: 'UX/UI design adaptation', values: [true, true, true] },
      { label: 'Responsive design', values: [true, true, true] },
      { label: 'Notifications', values: ['Push (mobile)', 'Push (mobile)', 'Push + Email'] },
    ],
  },
  {
    title: 'Foundation and quality',
    subtitle: 'Every project, every tier',
    rows: [
      { label: 'Scalable architecture', values: [true, true, true] },
      { label: 'Security best practices', values: [true, true, true] },
      { label: 'Performance optimization', values: [true, true, true] },
    ],
  },
  {
    title: 'Admin and management',
    rows: [
      { label: 'Admin dashboard', values: [false, true, true] },
      { label: 'User management', values: [false, true, true] },
      { label: 'Role-based access control', values: [false, true, true] },
      { label: 'Content management', values: [false, true, true] },
      { label: 'Advanced workflows and business logic', values: [false, true, true] },
      { label: 'Data management tools', values: [false, true, true] },
      { label: 'Activity monitoring', values: [false, true, true] },
    ],
  },
  {
    title: 'Reporting',
    rows: [
      { label: 'Reporting and analytics dashboard', values: [false, true, true] },
    ],
  },
  {
    title: 'Monetization',
    rows: [
      { label: 'Custom backend APIs', values: [false, false, true] },
      { label: 'Payment gateway integration', values: [false, false, true] },
      { label: 'Subscription management', values: [false, false, true] },
    ],
  },
  {
    title: 'Advanced',
    subtitle: 'SaaS Platform only',
    rows: [
      { label: 'Real-time communication', note: 'Live updates, WebSockets', values: [false, false, true] },
      { label: 'Third-party analytics integration', note: 'e.g. GA, Mixpanel', values: [false, false, true] },
      { label: 'Core Web Vitals monitoring and tuning', values: [false, false, true] },
      { label: 'Multi-tenant architecture support', values: [false, false, true] },
    ],
  },
  {
    title: 'Delivery',
    rows: [
      { label: 'Production deployment', values: [true, true, true] },
      { label: 'Source code ownership', values: [true, true, true] },
      { label: 'Post-launch support', values: ['30 days', '30 days', '30 days'] },
    ],
  },
];

export const POST_LAUNCH_SUPPORT_NOTE =
  "Post-launch support covers bug fixes, stability monitoring, and minor adjustments to what was delivered. It does not include new feature development, that gets scoped separately if you need it.";
