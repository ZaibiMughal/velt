'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, animate, useMotionValue } from 'framer-motion';
import Button from '@/components/ui/Button';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';
import StickerBadge from '@/components/ui/StickerBadge';
import { FaBriefcase } from 'react-icons/fa6';
import { PhoneIcon, GlobeIcon, LayersIcon, ChartIcon, SparkIcon } from '@/components/ui/ProductIcons';

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

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

function StatNumber({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.1,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [mv, value, delay]);

  return <span ref={ref}>0</span>;
}

/* One quiet line of numbers, no boxes: the quote card above carries the
   emotional proof, this line carries the scale. */
function InlineStats() {
  return (
    <motion.p
      {...fadeUp(0.55)}
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
            <StatNumber value={s.value} delay={0.7 + i * 0.15} />
            <span style={{ color: 'var(--color-primary)' }}>{s.suffix}</span>
          </span>
          <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{s.label}</span>
        </span>
      ))}
    </motion.p>
  );
}

function QuoteCard() {
  return (
    <motion.figure
      {...fadeUp(0.45)}
      className="rounded-2xl px-5 py-4"
      style={{
        margin: '1.75rem 0 0',
        maxWidth: 440,
        background: 'var(--color-surface)',
        border: '2px solid var(--color-border-emphasis)',
        rotate: -0.8,
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
    </motion.figure>
  );
}

/* ─── Flat scattered product cards (right column) ────────────────────────── */

const PRODUCT_CARDS = [
  { text: 'Mobile App', sub: 'iOS + Android', x: '4%', y: '0%', rotate: -4, fill: 'var(--color-surface)', delay: 0, Icon: PhoneIcon, badgeFill: 'var(--color-bg-accent)', badgeRotate: 5, highlight: false },
  { text: 'Web App', sub: 'React / Next.js', x: '50%', y: '10%', rotate: 3, fill: 'var(--color-bg-accent)', delay: 0.5, Icon: GlobeIcon, badgeFill: 'var(--color-surface)', badgeRotate: -6, highlight: false },
  { text: 'AI Automations', sub: 'Agents + workflows', x: '16%', y: '30%', rotate: -2, fill: 'var(--color-bg-accent)', delay: 1.3, Icon: SparkIcon, badgeFill: 'var(--color-surface)', badgeRotate: 6, highlight: false },
  { text: 'SaaS Platform', sub: 'Full-stack', x: '2%', y: '58%', rotate: 2, fill: 'var(--color-primary)', delay: 1.0, Icon: LayersIcon, badgeFill: 'var(--color-surface)', badgeRotate: 6, highlight: true },
  { text: 'Admin Dashboard', sub: 'Analytics', x: '46%', y: '64%', rotate: -3, fill: 'var(--color-surface)', delay: 0.7, Icon: ChartIcon, badgeFill: 'var(--color-bg-accent)', badgeRotate: -5, highlight: false },
] as const;

function ProductCards() {
  return (
    <div className="relative" style={{ width: 460, height: 460, flexShrink: 0 }}>
      {/* Hand-drawn connecting squiggle behind the scattered cards */}
      <svg viewBox="0 0 460 460" className="absolute inset-0" aria-hidden="true">
        <motion.path
          d="M120 90 C180 160, 140 220, 230 250 C300 275, 260 330, 340 360"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 14"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
        />
      </svg>

      {PRODUCT_CARDS.map((card) => (
        <motion.div
          key={card.text}
          className="absolute"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0], rotate: card.rotate }}
          transition={{
            opacity: { duration: 0.5, delay: card.delay },
            rotate: { duration: 0.5, delay: card.delay },
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
          }}
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
              <div className="text-xs mt-0.5" style={{ color: card.highlight ? 'rgba(255,255,255,0.75)' : 'var(--color-muted)' }}>{card.sub}</div>
            </div>
          </div>
        </motion.div>
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
        /* The scale lives on this inner div, not the Framer wrapper: the
           entrance animation writes an inline transform that would override
           any CSS transform on the same element. Width/height shrink with
           the scale so flex centering uses the visual size, otherwise the
           460px layout box centers and the scaled content clips off-edge. */
        .hero-cards-scale { width: 460px; height: 460px; }
        @media (max-width: 640px) {
          .hero-cards-scale { transform: scale(0.68); transform-origin: top left; width: 313px; height: 313px; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .hero-cards-scale { transform: scale(0.85); transform-origin: top left; width: 391px; height: 391px; }
        }
      `}</style>

      {/* Left text column */}
      {/* lg top padding must clear the fixed nav (top 16px + 64px tall) with
          real air beneath it, not land flush against its bottom edge */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pt-24 sm:px-12 lg:w-1/2 lg:pt-28 lg:pb-16 lg:pl-20 lg:pr-12">
        <motion.h1
          {...fadeUp(0.1)}
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
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontSize: 17,
            color: 'var(--color-muted)',
            maxWidth: 460,
            lineHeight: 1.7,
            marginBottom: '1.75rem',
          }}
        >
          Trusted by founders and businesses across the US, Australia, Europe, and the Middle East.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Button size="lg" variant="primary" onClick={() => scrollTo('#contact')}>
            Start Your Project
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollTo('#packages')}>
            View Plans →
          </Button>
        </motion.div>

        {/* The honest terms as one quiet caption: specifics beat a badge
            shouting the same thing */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-xs mt-3 pl-1"
          style={{ color: 'var(--color-muted-dark)', margin: '0.75rem 0 0' }}
        >
          Fixed pricing · 30% advance, 70% on handover · Source code always yours
        </motion.p>

        {/* V8 "Human Proof": a named client vouching, instead of stat chips */}
        <QuoteCard />
        <InlineStats />

        {/* Second path: the semi-technical visitor with a half-built product */}
        <motion.button
          {...fadeUp(0.65)}
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
        </motion.button>
        <style>{`
          .hero-rescue-link:hover span { color: var(--color-primary) !important; }
        `}</style>

        {/* Pedigree line: honestly framed employment experience, not a
            client claim, so it stays out of the trusted-by strip */}
        <motion.p
          {...fadeUp(0.75)}
          className="mt-5 flex items-center gap-2 text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          <FaBriefcase size={12} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
          Engineering experience from inside Bayt.com, the Middle East&apos;s largest job platform.
        </motion.p>
      </div>

      {/* Right: scattered flat product cards */}
      <div className="relative z-10 flex w-full flex-1 items-center justify-center pb-16 pt-6 lg:w-auto lg:pb-0 lg:pt-0 lg:pr-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <div className="hero-cards-scale">
            <ProductCards />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
