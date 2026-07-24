'use client';

import Image from 'next/image';
import type { Partner } from '@/lib/data';

interface PartnersProps {
  partners: Partner[];
}

/**
 * Logos that are naturally monochrome (no brand color in the source file)
 * don't get anything from the grayscale->color hover trick, since desaturating
 * a colorless image is a no-op. For these, swap to a separate colored asset
 * on hover instead of just removing a filter.
 */
const HOVER_LOGO_OVERRIDES: Record<string, string> = {
  PIPA: 'https://epiqtwwszkrmmzyzhxzm.supabase.co/storage/v1/object/public/partner-logos/pipa-pink-hover.png',
};

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
  const hoverSrc = HOVER_LOGO_OVERRIDES[partner.name];

  const content = partner.logo_url ? (
    <div style={{ position: 'relative', width: LOGO_BOX_WIDTH, height: LOGO_BOX_HEIGHT }}>
      <Image
        src={partner.logo_url}
        alt={partner.name}
        fill
        sizes="130px"
        className="partner-logo-img"
        style={{
          objectFit: 'contain',
          filter: hoverSrc ? 'none' : 'grayscale(1)',
          opacity: 0.5,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="130px"
          className="partner-logo-hover"
          style={{
            objectFit: 'contain',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
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
      style={{ borderTop: '2px solid var(--color-border-muted)', borderBottom: '2px solid var(--color-border-muted)' }}
      aria-label="Companies we've worked with"
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-14" style={{ color: 'var(--color-muted-dark)' }}>
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
        .partner-logo-link:hover .partner-logo-img,
        .partner-logo-link:focus-visible .partner-logo-img {
          filter: grayscale(0) !important;
          opacity: 1 !important;
        }
        .partner-logo-link:hover .partner-logo-hover,
        .partner-logo-link:focus-visible .partner-logo-hover {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
