'use client';

import Image from 'next/image';
import type { Partner } from '@/lib/data';

interface PartnersProps {
  partners: Partner[];
}

function PartnerItem({ partner }: { partner: Partner }) {
  const content = partner.logo_url ? (
    <Image
      src={partner.logo_url}
      alt={partner.name}
      width={120}
      height={40}
      className="h-7 w-auto object-contain filter grayscale"
    />
  ) : (
    <span className="text-sm font-semibold tracking-wide whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.35)' }}>
      {partner.name}
    </span>
  );

  if (partner.website_url) {
    return (
      <a
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-8 opacity-40 hover:opacity-70 transition-opacity duration-300"
        aria-label={`Visit ${partner.name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center justify-center px-8 opacity-40">
      {content}
    </div>
  );
}

/* Placeholder items shown when no partners are loaded yet */
const PLACEHOLDER_NAMES = [
  'Acme Corp', 'Stellar', 'Nexus', 'Orbit', 'Apex', 'Vertex', 'Prism', 'Zenith',
];

export default function Partners({ partners }: PartnersProps) {
  const items: Partner[] = partners.length > 0
    ? partners
    : PLACEHOLDER_NAMES.map((name, i) => ({ id: String(i), name, logo_url: null, website_url: null, display_order: i }));

  /* Duplicate for seamless loop */
  const track = [...items, ...items, ...items];

  return (
    <section
      className="py-14"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="Companies we've worked with"
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Trusted by founders &amp; businesses
      </p>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #09090b, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #09090b, transparent)' }}
        />

        <div
          className="flex items-center"
          style={{
            animation: `marquee ${items.length * 3}s linear infinite`,
            width: 'max-content',
          }}
        >
          {track.map((partner, i) => (
            <PartnerItem key={`${partner.id}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${Math.round(100 / 3)}%); }
        }
      `}</style>
    </section>
  );
}
