import { faqs } from '@/data/faqs';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hexspire',
  url: 'https://hexspire.io',
  logo: 'https://hexspire.io/logo.png',
  description:
    'Software development studio with 30+ products shipped for startups and multinational enterprises. Specialising in Flutter mobile apps, React Native, Next.js web platforms, and full SaaS ecosystems at a fixed price.',
  foundingDate: '2019',
  inLanguage: 'en',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'Middle East' },
  ],
  knowsAbout: [
    'Flutter', 'Dart', 'React Native', 'Expo', 'Next.js', 'React', 'TypeScript',
    'Node.js', 'Supabase', 'PostgreSQL', 'Stripe', 'Firebase',
    'Mobile App Development', 'Web Application Development',
    'SaaS Platform Development', 'Admin Dashboard Development',
    'MVP Development', 'Custom Software Development',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: 'English',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Hexspire, Software Development',
  provider: { '@type': 'Organization', name: 'Hexspire' },
  serviceType: [
    'Flutter Mobile App Development',
    'React Native App Development',
    'Next.js Web Application Development',
    'SaaS Platform Development',
    'Admin Dashboard Development',
    'MVP Development',
    'Full Stack Development',
  ],
  description:
    'Fixed-price software development for founders and businesses. Mobile apps (iOS + Android), web platforms, SaaS ecosystems, and admin dashboards, delivered in weeks with full source code ownership.',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'Middle East' },
  ],
  priceRange: '$5,000 to $50,000+',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Development Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Launch MVP',
        description: 'Focused MVP: core feature set, shipped in 2–3 weeks.',
        price: '10000',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Growth Platform',
        description: 'Full product with advanced features, integrations, and admin panel.',
        price: '15000',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'SaaS Platform',
        description: 'Multi-tenant SaaS product with billing, auth, and analytics.',
        price: '20000',
        priceCurrency: 'USD',
      },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hexspire',
  url: 'https://hexspire.io',
  description: 'Software development studio, Flutter, React Native, Next.js, SaaS.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://hexspire.io/work' },
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
