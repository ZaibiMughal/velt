'use client';

import { useEffect, useRef } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';
import StickerBadge from '@/components/ui/StickerBadge';
import { FaCircleCheck } from 'react-icons/fa6';
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

/* ─── Stat sticker chips ─────────────────────────────────────────────────── */

const STATS = [
  { value: 30, suffix: '+', label: 'Projects Shipped', rotate: -2 },
  { value: 8, suffix: '+', label: 'Years Experience', rotate: 1.5 },
  { value: 10, suffix: '+', label: 'Countries', rotate: -1.5 },
  { value: 1, suffix: 'M+', label: 'Monthly Users', rotate: 2 },
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

function StatChips() {
  return (
    <div className="flex flex-wrap gap-3">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: s.rotate }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="rounded-2xl px-5 py-3"
          style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-emphasis)' }}
        >
          <p className="font-serif" style={{ fontSize: 25, fontWeight: 500, color: 'var(--color-text)', margin: 0, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            <StatNumber value={s.value} delay={0.6 + i * 0.1} />
            <span style={{ color: 'var(--color-primary)' }}>{s.suffix}</span>
          </p>
          <p style={{ fontSize: 11, color: 'var(--color-muted)', margin: '1px 0 0', whiteSpace: 'nowrap' }}>
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
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
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pt-32 sm:px-12 lg:w-1/2 lg:pt-36 lg:pb-20 lg:pl-20 lg:pr-12">
        <motion.div {...fadeUp(0)} style={{ marginBottom: 28 }}>
          <Badge dot>Product Development Studio</Badge>
        </motion.div>

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
          Fixed price, full source code, shipped in weeks.
        </motion.p>

        <motion.div {...fadeUp(0.3)} style={{ marginBottom: '1.75rem' }}>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: 'var(--color-bg-accent)',
              border: '2px solid var(--color-border-emphasis)',
            }}
          >
            <FaCircleCheck size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              Fixed pricing, no hidden costs
            </span>
          </div>
          <p className="text-[11px] mt-1.5 pl-1" style={{ color: 'var(--color-muted-dark)' }}>
            30% advance · 70% on handover · Source code always yours
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          <Button size="lg" variant="primary" onClick={() => scrollTo('#contact')}>
            Claim Your Build Slot
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollTo('#packages')}>
            View Plans →
          </Button>
        </motion.div>

        {/* Stat sticker chips */}
        <StatChips />
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
