export interface Package {
  id: string;
  name: string;
  price: string;
  /** Caption shown next to the price. Defaults to 'Fixed' when omitted. */
  priceNote?: string;
  delivery: string;
  description: string;
  highlighted: boolean;
  badge?: string;
  features: string[];
  cta: string;
  idealFor: string[];
}

/**
 * Shown in the Packages section scarcity line.
 * Update this monthly so repeat visitors see it change.
 */
export const SLOTS_AVAILABLE = 2;

export const packages: Package[] = [
  {
    id: 'mvp',
    name: 'Launch MVP',
    price: '$10,000',
    delivery: 'From 2 Weeks',
    description: 'For founders validating an idea fast.',
    highlighted: false,
    features: [
      'Mobile App OR Web Application',
      'Core Business Features',
      'Authentication & User Accounts',
      'User Profiles & Database Setup',
      'Essential API Integrations',
      'Push Notifications (mobile)',
      'UX/UI Design Adaptation',
      'Responsive Design',
      'Production Deployment',
      'Source Code Ownership',
      '30 Days Post-Launch Support',
    ],
    cta: 'Get Started',
    idealFor: ['Startup MVPs', 'Booking Systems', 'Membership Products', 'Early-Stage SaaS'],
  },
  {
    id: 'growth',
    name: 'Growth Platform',
    price: '$18,000',
    delivery: 'From 3–4 Weeks',
    description: 'Everything in Launch MVP, plus full admin control.',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in Launch MVP',
      'Admin Dashboard',
      'User Management',
      'Role-Based Access Control',
      'Content Management',
      'Reporting & Analytics Dashboard',
      'Advanced Workflows',
      'Business Logic Implementation',
      'Additional Integrations',
      'Data Management Tools',
      'Activity Monitoring',
    ],
    cta: 'Get Started',
    idealFor: ['Marketplace Platforms', 'Logistics Systems', 'Healthcare Portals', 'Education Platforms'],
  },
  {
    id: 'saas',
    name: 'SaaS Platform',
    price: '$25,000',
    priceNote: 'Starting from',
    delivery: 'From 6 Weeks',
    description: 'Full-stack SaaS with web, mobile, and subscriptions.',
    highlighted: false,
    features: [
      'Everything in Growth Platform',
      'Web Application + Mobile App',
      'Backend APIs',
      'Payment Gateway Integration',
      'Subscription Management',
      'Email & Push Notifications',
      'Third-Party & CRM Integrations',
      'Analytics Platform Integration',
      'Scalable Architecture',
      'Security Best Practices',
      'Performance Optimization',
    ],
    cta: 'Get Started',
    idealFor: ['SaaS Startups', 'AI Products', 'FinTech Solutions', 'Multi-Tenant Platforms'],
  },
];
