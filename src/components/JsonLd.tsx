import { faqs } from '@/data/faqs';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Velt',
  url: 'https://veltstudio.com',
  logo: 'https://veltstudio.com/og-image.png',
  description: 'Premium software development studio for founders and businesses.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Software Product Development',
  provider: { '@type': 'Organization', name: 'Velt' },
  serviceType: [
    'Mobile App Development',
    'Web Application Development',
    'SaaS Platform Development',
    'Admin Dashboard Development',
  ],
  description: 'Fixed-price software development packages from $5,000 to $18,000+',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Development Packages',
    itemListElement: [
      { '@type': 'Offer', name: 'Launch MVP', price: '5000', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Growth Platform', price: '9000', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'SaaS Platform', price: '18000', priceCurrency: 'USD' },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
