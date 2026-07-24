'use client';

import Image from 'next/image';
import type { Partner } from '@/lib/data';

interface PartnersProps {
  partners: Partner[];
}

/*
 * The partner logo assets are a mix of white marks (drawn for the old dark
 * site) and dark marks, so no single treatment shows every logo's native
 * colors on the light page. At rest all logos render as uniform darkened
 * grayscale. On hover the filter drops to reveal true brand colors, and
 * the white-source marks listed below additionally get a flat ink chip
 * behind them, since their true colors are invisible on porcelain.
 */
const LIGHT_SOURCE_LOGOS = new Set(['RideSpotr', 'PIPA', 'IbisPrep', 'TruckTuck']);

/*
 * A fixed box (not just a fixed height) with object-fit: contain, so a
 * square/vertical icon mark scales up to fill the box's height while a wide
 * wordmark gets capped by the box's width instead of visually dominating.
 * Without the width cap, icons and wordmarks at the same height alone read
 * as wildly different sizes even after trimming each source file's padding.
 */
const LOGO_BOX_WIDTH = 130;
const LOGO_BOX_HEIGHT = 46;

function PartnerItem({ partner }: { partner: Partner }) {
  const needsDarkChip = LIGHT_SOURCE_LOGOS.has(partner.name);

  const content = partner.logo_url ? (
    <div
      className={needsDarkChip ? 'partner-chip partner-chip--dark' : 'partner-chip'}
      style={{ position: 'relative', width: LOGO_BOX_WIDTH, height: LOGO_BOX_HEIGHT }}
    >
      <Image
        src={partner.logo_url}
        alt={partner.name}
        fill
        sizes="130px"
        className="partner-logo-img"
        style={{
          objectFit: 'contain',
          /* grayscale + darken keeps white-source marks visible on cream
             while preserving internal detail in filled app-icon logos,
             which a flat brightness(0) silhouette erases. */
          filter: 'grayscale(1) brightness(0.45)',
          opacity: 0.6,
          transition: 'opacity 0.3s ease, filter 0.3s ease',
        }}
      />
    </div>
  ) : (
    <span className="text-sm font-semibold tracking-wide whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
      {partner.name}
    </span>
  );

  if (partner.website_url) {
    return (
      <a
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="partner-logo-link flex items-center justify-center px-8"
        aria-label={`Visit ${partner.name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="partner-logo-link flex items-center justify-center px-8">
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
      aria-label="Companies we've worked with"
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-12" style={{ color: 'var(--color-muted-dark)', letterSpacing: '0.18em' }}>
        Trusted by founders &amp; businesses
      </p>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
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
        .partner-chip {
          border-radius: 12px;
          transition: background 0.25s ease;
          box-sizing: content-box;
          padding: 6px 10px;
          margin: -6px -10px;
        }
        .partner-logo-link:hover .partner-logo-img,
        .partner-logo-link:focus-visible .partner-logo-img {
          filter: none !important;
          opacity: 1 !important;
        }
        .partner-logo-link:hover .partner-chip--dark,
        .partner-logo-link:focus-visible .partner-chip--dark {
          background: var(--color-bg-dark);
        }
      `}</style>
    </section>
  );
}
