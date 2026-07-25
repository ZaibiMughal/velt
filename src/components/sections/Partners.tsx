'use client';

import Image from 'next/image';
import type { Partner } from '@/lib/data';

interface PartnersProps {
  partners: Partner[];
}

/*
 * Every logo sits in an identical outlined tile so the row reads as a
 * consistent rhythm regardless of each asset's intrinsic padding. The
 * per-logo tuning map corrects optical weight (filled icon marks read
 * far heavier than thin wordmarks at the same box size) and flags the
 * white-source assets whose true colors need an ink tile behind them
 * on hover. At rest all logos render as uniform darkened grayscale;
 * hover drops the filter to reveal native brand colors.
 */
const LOGO_TUNING: Record<string, { scale?: number; darkChip?: boolean }> = {
  PIPA: { scale: 1.15, darkChip: true },
  RideSpotr: { darkChip: true },
  IbisPrep: { scale: 0.72, darkChip: true },
  TruckTuck: { darkChip: true },
  NutritionUP: { scale: 0.9 },
  Wagerr: { scale: 0.78 },
  KeyOS: { scale: 0.85 },
  Scholarly: { scale: 0.72 },
  'Step Saga': { scale: 0.72 },
};

const TILE_W = 150;
const TILE_H = 60;
const LOGO_W = 116;
const LOGO_H = 36;

function PartnerItem({ partner }: { partner: Partner }) {
  const tuning = LOGO_TUNING[partner.name] ?? {};
  const scale = tuning.scale ?? 1;

  const content = partner.logo_url ? (
    <div
      className={tuning.darkChip ? 'partner-tile partner-tile--dark' : 'partner-tile'}
      style={{
        width: TILE_W,
        height: TILE_H,
        borderRadius: 14,
        border: '2px solid var(--color-border-muted)',
        background: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div style={{ position: 'relative', width: Math.round(LOGO_W * scale), height: Math.round(LOGO_H * scale) }}>
        <Image
          src={partner.logo_url}
          alt={partner.name}
          fill
          sizes="130px"
          className="partner-logo-img"
          style={{
            objectFit: 'contain',
            /* grayscale + darken keeps white-source marks visible on the
               light tile while preserving internal detail in filled
               app-icon logos. */
            filter: 'grayscale(1) brightness(0.45)',
            opacity: 0.55,
            transition: 'opacity 0.25s ease, filter 0.25s ease',
          }}
        />
      </div>
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
        className="partner-logo-link flex items-center justify-center px-3"
        aria-label={`Visit ${partner.name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="partner-logo-link flex items-center justify-center px-3">
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
        .partner-logo-link:hover .partner-logo-img,
        .partner-logo-link:focus-visible .partner-logo-img {
          filter: none !important;
          opacity: 1 !important;
        }
        .partner-logo-link:hover .partner-tile,
        .partner-logo-link:focus-visible .partner-tile {
          border-color: var(--color-border-emphasis);
        }
        .partner-logo-link:hover .partner-tile--dark,
        .partner-logo-link:focus-visible .partner-tile--dark {
          background: var(--color-bg-dark);
        }
      `}</style>
    </section>
  );
}
