'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';
import StickerBadge from '@/components/ui/StickerBadge';
import { FaBriefcase } from 'react-icons/fa6';
import { PhoneIcon, GlobeIcon, LayersIcon, ChartIcon, SparkIcon } from '@/components/ui/ProductIcons';

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ─── Proof: client quote + quiet stat line ──────────────────────────────── */

/* Hero shows a deliberately short, distinct cut of Charlie's testimonial;
   the full quote lives in the Testimonials marquee, so the two never read
   as a repeat. Avatar is the stable public URL from testimonial-assets. */
const HERO_QUOTE = {
  text: 'I honestly wouldn’t even consider Zohaib a third-party agency, he really embodied someone as part of our core team.',
  name: 'Charlie Crozier',
  role: 'Project Lead, Wagerr',
  avatar: 'https://epiqtwwszkrmmzyzhxzm.supabase.co/storage/v1/object/public/testimonial-assets/charlier-wagerr.png',
} as const;

const STATS = [
  { value: 30, suffix: '+', label: 'products shipped' },
  { value: 1, suffix: 'M+', label: 'monthly users' },
] as const;

/* The real final numbers render directly in the server HTML, with no
   count-up-from-zero: a browser-only animation would otherwise leave a
   literal "0" in the markup search engines, link previews, and AI
   assistants actually read. */
function InlineStats() {
  return (
    <p
      className="mt-5 flex flex-wrap items-baseline"
      style={{ margin: '1.25rem 0 0', columnGap: 12, rowGap: 4 }}
    >
      {STATS.map((s, i) => (
        <span key={s.label} className="flex items-baseline gap-2">
          {i > 0 && (
            <span aria-hidden="true" style={{ color: 'var(--color-border-muted)', fontWeight: 700, marginRight: 12 }}>
              ·
            </span>
          )}
          <span className="font-serif" style={{ fontSize: 23, fontWeight: 500, color: 'var(--color-text)', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {s.value}
            <span style={{ color: 'var(--color-primary-strong)' }}>{s.suffix}</span>
          </span>
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{s.label}</span>
        </span>
      ))}
    </p>
  );
}

function QuoteCard() {
  return (
    <figure
      className="rounded-2xl px-5 py-4"
      style={{
        margin: '1.75rem 0 0',
        maxWidth: 440,
        background: 'var(--color-surface)',
        border: '2px solid var(--color-border-emphasis)',
        transform: 'rotate(-0.8deg)',
      }}
    >
      <blockquote style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--color-text)' }}>
        &ldquo;{HERO_QUOTE.text}&rdquo;
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-2.5" style={{ fontSize: 12, color: 'var(--color-muted)' }}>
        <Image
          src={HERO_QUOTE.avatar}
          alt={HERO_QUOTE.name}
          width={26}
          height={26}
          style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border-emphasis)', flexShrink: 0 }}
        />
        <span>
          <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{HERO_QUOTE.name}</span>
          {' · '}
          {HERO_QUOTE.role}
        </span>
      </figcaption>
    </figure>
  );
}

/* ─── Flat scattered product cards (right column) ────────────────────────── */

const PRODUCT_CARDS = [
  { text: 'Mobile App', sub: 'iOS + Android', x: '4%', y: '0%', rotate: -4, fill: 'var(--color-surface)', delay: 0, Icon: PhoneIcon, badgeFill: 'var(--color-bg-accent)', badgeRotate: 5, highlight: false },
  { text: 'Web App', sub: 'React / Next.js', x: '50%', y: '10%', rotate: 3, fill: 'var(--color-bg-accent)', delay: 0.5, Icon: GlobeIcon, badgeFill: 'var(--color-surface)', badgeRotate: -6, highlight: false },
  { text: 'AI Automations', sub: 'Agents + workflows', x: '16%', y: '30%', rotate: -2, fill: 'var(--color-bg-accent)', delay: 1.3, Icon: SparkIcon, badgeFill: 'var(--color-surface)', badgeRotate: 6, highlight: false },
  { text: 'SaaS Platform', sub: 'Full-stack', x: '2%', y: '58%', rotate: 2, fill: 'var(--color-primary-strong)', delay: 1.0, Icon: LayersIcon, badgeFill: 'var(--color-surface)', badgeRotate: 6, highlight: true },
  { text: 'Admin Dashboard', sub: 'Analytics', x: '46%', y: '64%', rotate: -3, fill: 'var(--color-surface)', delay: 0.7, Icon: ChartIcon, badgeFill: 'var(--color-bg-accent)', badgeRotate: -5, highlight: false },
] as const;

/* All cards render at full opacity in their final position immediately —
   this whole block is the hero's visual, so it must paint on the first
   frame like the text column does. The only animation left is a purely
   decorative idle float on margin-top (a property the static per-card
   `rotate()` transform doesn't use, so the two never fight over the same
   CSS property), switched off under prefers-reduced-motion. */
function ProductCards() {
  return (
    <div className="relative" style={{ width: 460, height: 460, flexShrink: 0 }}>
      <svg viewBox="0 0 460 460" className="absolute inset-0" aria-hidden="true">
        <path
          d="M120 90 C180 160, 140 220, 230 250 C300 275, 260 330, 340 360"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 14"
          fill="none"
          opacity={0.6}
        />
      </svg>

      {PRODUCT_CARDS.map((card) => (
        <div
          key={card.text}
          className="absolute hero-card-float"
          style={{ left: card.x, top: card.y, transform: `rotate(${card.rotate}deg)`, animationDelay: `${card.delay}s` }}
        >
          <div
            className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
            style={{
              background: card.fill,
              border: '2px solid var(--color-border-emphasis)',
              minWidth: 184,
            }}
          >
            <StickerBadge fill={card.badgeFill} rotate={card.badgeRotate} size={40}>
              <card.Icon />
            </StickerBadge>
            <div>
              <div className="text-sm font-semibold" style={{ color: card.highlight ? '#ffffff' : 'var(--color-text)' }}>{card.text}</div>
              <div className="text-xs mt-0.5" style={{ color: card.highlight ? '#ffffff' : 'var(--color-muted)' }}>{card.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden lg:flex-row"
      style={{ background: 'var(--color-bg)' }}
    >
      <style>{`
        /* The scale lives on this inner div, not a wrapper: width/height
           shrink with the scale so flex centering uses the visual size,
           otherwise the 460px layout box centers and the scaled content
           clips off-edge. */
        .hero-cards-scale { width: 460px; height: 460px; }
        @media (max-width: 640px) {
          .hero-cards-scale { transform: scale(0.68); transform-origin: top left; width: 313px; height: 313px; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .hero-cards-scale { transform: scale(0.85); transform-origin: top left; width: 391px; height: 391px; }
        }

        @keyframes hero-card-float {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -8px; }
        }
        .hero-card-float { animation: hero-card-float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-card-float { animation: none; }
        }

        .hero-rescue-link:hover span { color: var(--color-primary-strong) !important; }
      `}</style>

      {/* Left text column */}
      {/* lg top padding must clear the fixed nav (top 16px + 64px tall) with
          real air beneath it, not land flush against its bottom edge */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pt-24 sm:px-12 lg:w-1/2 lg:pt-28 lg:pb-16 lg:pl-20 lg:pr-12">
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.8rem, 4.6vw, 4.6rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 500,
            color: 'var(--color-text)',
            marginBottom: '1.5rem',
          }}
        >
          Your product,{' '}
          <span className="relative inline-block italic" style={{ fontWeight: 400 }}>
            live in weeks.
            <HandDrawnUnderline className="absolute left-0 -bottom-2 w-full h-4" />
          </span>
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'var(--color-muted)',
            maxWidth: 460,
            lineHeight: 1.7,
            marginBottom: '1.75rem',
          }}
        >
          Trusted by founders and businesses across the US, Australia, Europe, and the Middle East.
        </p>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="lg" variant="primary" onClick={() => scrollTo('#contact')}>
            Start Your Project
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollTo('#packages')}>
            View Plans →
          </Button>
        </div>

        {/* The honest terms as one quiet caption: specifics beat a badge
            shouting the same thing */}
        <p
          className="text-xs mt-3 pl-1"
          style={{ color: 'var(--color-muted-dark)', margin: '0.75rem 0 0' }}
        >
          Fixed pricing · 30% advance, 70% on handover · Source code always yours
        </p>

        {/* V8 "Human Proof": a named client vouching, instead of stat chips */}
        <QuoteCard />
        <InlineStats />

        {/* Second path: the semi-technical visitor with a half-built product */}
        <button
          type="button"
          onClick={() => scrollTo('#rescue')}
          className="hero-rescue-link mt-6 self-start text-sm text-left"
          style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', color: 'var(--color-muted)', cursor: 'pointer' }}
        >
          Have a half-built product?{' '}
          <span
            style={{ color: 'var(--color-text)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            We fix and finish those too →
          </span>
        </button>

        {/* Pedigree line: honestly framed employment experience, not a
            client claim, so it stays out of the trusted-by strip */}
        <p
          className="mt-5 flex items-center gap-2 text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          <FaBriefcase size={12} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
          Engineering experience from inside Bayt.com, the Middle East&apos;s largest job platform.
        </p>
      </div>

      {/* Right: scattered flat product cards — the hero's visual, painted
          fully visible on the first frame like the rest of the hero */}
      <div className="relative z-10 flex w-full flex-1 items-center justify-center pb-16 pt-6 lg:w-auto lg:pb-0 lg:pt-0 lg:pr-10">
        <div className="hero-cards-scale">
          <ProductCards />
        </div>
      </div>
    </section>
  );
}
