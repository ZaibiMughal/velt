'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { AnimatedPhone, AnimatedBrowser } from '@/components/ui/IllustratedDevices';
import type { CaseStudy } from '@/data/work/index';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function rgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function ArrowBadge({ hovered, t }: { hovered: boolean; t: string }) {
  return (
    <motion.div
      animate={{ x: hovered ? 3 : 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="shrink-0"
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
        style={{
          border: `2px solid ${hovered ? t : 'var(--color-border-emphasis)'}`,
          background: hovered ? t : 'transparent',
          color: hovered ? '#fff' : 'var(--color-text)',
        }}
      >
        <ArrowIcon />
      </div>
    </motion.div>
  );
}

interface CardProps {
  project: CaseStudy;
  coverUrl?: string | null;
  height?: string;
  /**
   * 'compact' is the small stacked card. 'feature' is the large hero card —
   * mobile apps get a split content/illustration layout so a portrait phone
   * doesn't float in a mostly-empty box.
   */
  variant?: 'default' | 'compact' | 'feature';
}

function ProjectCard({ project, coverUrl = null, height = '260px', variant = 'default' }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const isMobileApp = project.category === 'Mobile App';
  const t = project.theme_color || '#6366f1';
  const compact = variant === 'compact';

  /* Featured mobile app: split layout — content panel + phone anchored in its own image panel. */
  if (variant === 'feature' && isMobileApp) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className="relative flex flex-col overflow-hidden rounded-2xl md:flex-row transition-colors duration-200"
        style={{
          height,
          background: 'var(--color-surface)',
          border: `2px solid ${hovered ? t : 'var(--color-border-muted)'}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Content panel */}
        <div className="relative z-10 flex shrink-0 flex-col justify-between p-7 md:w-[44%] md:p-8">
          <div>
            <span
              className="mb-5 inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest"
              style={{ background: rgba(t, 0.1), border: `2px solid ${t}`, color: t }}
            >
              {project.category}
            </span>
            {project.tagline && (
              <p className="mb-5 max-w-[280px] text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {project.tagline}
              </p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: t }}>
              {project.outcome.metric}
            </p>
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-2xl leading-snug" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
              <ArrowBadge hovered={hovered} t={t} />
            </div>
          </div>
        </div>

        {/* Illustration panel — flat tinted background, animated phone anchored bottom */}
        <div
          className="relative min-h-[240px] flex-1 overflow-hidden md:min-h-0"
          style={{ background: rgba(t, 0.08) }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '-4%',
              left: '50%',
              transform: `translateX(-50%) scale(${hovered ? 1.02 : 1})`,
              height: '94%',
              aspectRatio: '240 / 440',
              transition: 'transform 0.4s ease',
            }}
          >
            <AnimatedPhone t={t} screenshot={coverUrl} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="relative flex flex-col overflow-hidden rounded-2xl transition-colors duration-200"
      style={{
        height,
        background: 'var(--color-surface)',
        border: `2px solid ${hovered ? t : 'var(--color-border-muted)'}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Illustration area */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ background: rgba(t, 0.08) }}
      >
        {isMobileApp ? (
          /* Animated illustrated phone, anchored to bottom */
          <div
            style={{
              position: 'absolute',
              bottom: '-6%',
              ...(compact
                ? { right: '6%', left: 'auto' }
                : { left: '50%', transform: 'translateX(-50%)' }),
              height: '100%',
              aspectRatio: '240 / 440',
            }}
          >
            <AnimatedPhone t={t} screenshot={coverUrl} />
          </div>
        ) : (
          /* Animated illustrated browser window */
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <div style={{ width: '92%', aspectRatio: '480 / 300', maxHeight: '100%' }}>
              <AnimatedBrowser t={t} screenshot={coverUrl} />
            </div>
          </div>
        )}

        {/* Category chip — top left */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: 'var(--color-surface)',
              border: `2px solid ${t}`,
              color: t,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Caption strip — below the image, not overlaid on top of it */}
      <div
        className="flex items-end justify-between gap-3 p-4"
        style={{ borderTop: '2px solid var(--color-border-muted)' }}
      >
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-1 truncate"
            style={{ color: t }}
          >
            {project.outcome.metric}
          </p>
          <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
        </div>
        <ArrowBadge hovered={hovered} t={t} />
      </div>
    </Link>
  );
}

/* Placeholder card shown when there are no real projects yet */
function PlaceholderCard({ index, height = '260px' }: { index: number; height?: string }) {
  return (
    <div
      className="relative flex items-end overflow-hidden rounded-2xl p-5"
      style={{ height, background: 'var(--color-bg-accent)', border: '2px solid var(--color-border-muted)' }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>Coming soon</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Case Study {String(index + 1).padStart(2, '0')}</p>
      </div>
    </div>
  );
}

interface PortfolioProps {
  caseStudies: CaseStudy[];
  coverUrls?: (string | null)[];
}

export default function Portfolio({ caseStudies, coverUrls = [] }: PortfolioProps) {
  const isEmpty = caseStudies.length === 0;
  const shown = caseStudies.slice(0, 3);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header — minimal, no paragraph */}
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-14">
          <Badge>Work</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ color: 'var(--color-text)' }}>
            Products we&apos;ve shipped.
          </h2>
        </AnimatedSection>

        {/* Bento grid */}
        <AnimatedSection delay={0.1}>
          {isEmpty ? (
            /* Placeholder state */
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-3">
                <PlaceholderCard index={0} height="520px" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-4">
                <PlaceholderCard index={1} height="250px" />
                <PlaceholderCard index={2} height="250px" />
              </div>
            </div>
          ) : shown.length === 1 ? (
            <ProjectCard project={shown[0]} coverUrl={coverUrls[0]} height="480px" variant="feature" />
          ) : shown.length === 2 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {shown.map((p, i) => (
                <ProjectCard key={p.slug} project={p} coverUrl={coverUrls[i]} height="420px" variant="feature" />
              ))}
            </div>
          ) : (
            /* 3-card bento: large left, two stacked right */
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-3">
                <ProjectCard project={shown[0]} coverUrl={coverUrls[0]} height="520px" variant="feature" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-4">
                <ProjectCard project={shown[1]} coverUrl={coverUrls[1]} height="250px" variant="compact" />
                <ProjectCard project={shown[2]} coverUrl={coverUrls[2]} height="250px" variant="compact" />
              </div>
            </div>
          )}

          {/* View all — only if more than 3 projects */}
          {caseStudies.length > 3 && (
            <div className="flex justify-center mt-10">
              <Link
                href="/work"
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--color-muted)' }}
              >
                View all
                <ArrowIcon />
              </Link>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
