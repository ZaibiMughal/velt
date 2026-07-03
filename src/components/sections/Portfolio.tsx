'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { CaseStudy } from '@/data/work/index';

/* Gradient meshes shown when a project has no cover image */
const GRADIENTS = [
  'radial-gradient(ellipse at 25% 35%, rgba(99,102,241,0.6) 0%, rgba(124,58,237,0.3) 38%, transparent 65%), radial-gradient(ellipse at 75% 70%, rgba(139,92,246,0.35) 0%, transparent 55%)',
  'radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.55) 0%, rgba(99,102,241,0.28) 42%, transparent 68%), radial-gradient(ellipse at 25% 75%, rgba(79,70,229,0.3) 0%, transparent 50%)',
  'radial-gradient(ellipse at 45% 55%, rgba(139,92,246,0.55) 0%, rgba(99,102,241,0.25) 40%, transparent 68%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.3) 0%, transparent 45%)',
];

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

interface CardProps {
  project: CaseStudy;
  coverUrl: string | null;
  gradientIndex: number;
  height?: string;
  /**
   * 'compact' anchors the phone screenshot right so bottom-left text stays clear (small stacked cards).
   * 'feature' is the large hero card — mobile apps get a split content/image layout so a portrait
   * screenshot doesn't float in a mostly-empty box.
   */
  variant?: 'default' | 'compact' | 'feature';
}

function ProjectCard({ project, coverUrl, gradientIndex, height = '260px', variant = 'default' }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const hasImage = Boolean(coverUrl);
  const isMobileApp = project.category === 'Mobile App';
  const t = project.theme_color || '#6366f1';
  const compact = variant === 'compact';

  /* Featured mobile app: split layout — content panel + phone anchored in its own image panel.
     Avoids a small centered phone floating in a mostly-empty wide card. */
  if (variant === 'feature' && isMobileApp) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className="relative flex flex-col overflow-hidden rounded-2xl md:flex-row"
        style={{
          height,
          cursor: 'none',
          /* One continuous gradient across the whole card (not two separately-colored
             sibling panels) so there's no seam where the content panel meets the image panel. */
          background: `radial-gradient(ellipse 85% 120% at 84% 105%, ${rgba(t, 0.24)} 0%, ${rgba(t, 0.09)} 26%, #111114 46%, #0d0d10 72%)`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Content panel */}
        <div className="relative z-10 flex shrink-0 flex-col justify-between p-7 md:w-[44%] md:p-8">
          <div>
            <span
              className="mb-5 inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest"
              style={{ background: rgba(t, 0.12), border: `1px solid ${rgba(t, 0.3)}`, color: t }}
            >
              {project.category}
            </span>
            {project.tagline && (
              <p className="mb-5 max-w-[280px] text-sm leading-relaxed text-white/45">
                {project.tagline}
              </p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#818cf8' }}>
              {project.outcome.metric}
            </p>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold leading-snug text-white">{project.title}</h3>
              <motion.div
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{ background: rgba(t, 0.85) }}
                >
                  <ArrowIcon />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image panel — no own background; the card-wide gradient above shows through */}
        <div className="relative min-h-[240px] flex-1 overflow-hidden md:min-h-0">
          {hasImage && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: `translateX(-50%) scale(${hovered ? 1.03 : 1})`,
                height: '94%',
                width: '78%',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <Image
                src={coverUrl!}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 78vw, 460px"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  borderRadius: '14px 14px 0 0',
                  boxShadow: `0 -4px 40px ${rgba(t, 0.22)}`,
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 100%)',
                }}
              />
            </div>
          )}
        </div>

        {/* Border ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: hovered
              ? '0 0 0 1px rgba(99,102,241,0.55), inset 0 0 0 1px rgba(99,102,241,0.12)'
              : '0 0 0 1px rgba(255,255,255,0.07)',
            transition: 'box-shadow 0.35s ease',
          }}
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="relative block overflow-hidden rounded-2xl"
      style={{ height, cursor: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual fill — image or gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: !hasImage
            ? GRADIENTS[gradientIndex % GRADIENTS.length]
            : isMobileApp
              ? `radial-gradient(ellipse 180% 140% at 50% 108%, ${rgba(t, 0.24)} 0%, ${rgba(t, 0.08)} 32%, #111114 58%, #0d0d10 100%)`
              : '#09090b',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {hasImage && isMobileApp && (
          /* Portrait screenshot floating on themed gradient, anchored to bottom */
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              ...(compact
                ? { right: '7%', left: 'auto' }
                : { left: '50%', transform: 'translateX(-50%)' }),
              height: '86%',
              width: compact ? '42%' : '62%',
            }}
          >
            <Image
              src={coverUrl!}
              alt={project.title}
              fill
              sizes={compact ? '(max-width: 768px) 42vw, 220px' : '(max-width: 768px) 62vw, 340px'}
              style={{
                objectFit: 'contain',
                objectPosition: compact ? 'bottom right' : 'bottom center',
                borderRadius: '14px 14px 0 0',
                boxShadow: `0 -4px 40px ${rgba(t, 0.2)}`,
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 100%)',
              }}
            />
          </div>
        )}
        {hasImage && !isMobileApp && (
          /* Web/SaaS screenshot, dimmed with theme wash to sit in the dark card */
          <>
            <Image
              src={coverUrl!}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 660px"
              style={{
                objectFit: 'cover',
                objectPosition: 'top center',
                filter: 'brightness(0.6) saturate(0.85)',
                opacity: hovered ? 1 : 0.9,
                transition: 'opacity 0.4s ease',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: rgba(t, 0.15) }}
            />
          </>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobileApp
            ? 'linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.35) 26%, transparent 48%)'
            : 'linear-gradient(to top, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.5) 38%, rgba(9,9,11,0.08) 70%, transparent 100%)',
        }}
      />

      {/* Animated border ring */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: hovered
            ? '0 0 0 1px rgba(99,102,241,0.55), inset 0 0 0 1px rgba(99,102,241,0.12)'
            : '0 0 0 1px rgba(255,255,255,0.07)',
          transition: 'box-shadow 0.35s ease',
        }}
      />

      {/* Category chip — top left */}
      <div className="absolute top-4 left-4">
        <span
          className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(9,9,11,0.55)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-1.5 truncate"
            style={{ color: '#818cf8' }}
          >
            {project.outcome.metric}
          </p>
          <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
        </div>

        {/* Arrow — slides in on hover */}
        <motion.div
          animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(99,102,241,0.85)', backdropFilter: 'blur(6px)' }}
          >
            <ArrowIcon />
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

/* Placeholder card shown when there are no real projects yet */
function PlaceholderCard({ index, height = '260px' }: { index: number; height?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ height }}
    >
      <div
        className="absolute inset-0"
        style={{ background: GRADIENTS[index % GRADIENTS.length], opacity: 0.45 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(9,9,11,0.9) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.05)' }}
      />
      <div className="absolute bottom-5 left-5">
        <p className="text-[10px] uppercase tracking-widest text-white/20 mb-1">Coming soon</p>
        <p className="text-sm font-semibold text-white/30">Case Study {String(index + 1).padStart(2, '0')}</p>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
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
            <ProjectCard project={shown[0]} coverUrl={coverUrls[0] ?? null} gradientIndex={0} height="480px" variant="feature" />
          ) : shown.length === 2 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {shown.map((p, i) => (
                <ProjectCard key={p.slug} project={p} coverUrl={coverUrls[i] ?? null} gradientIndex={i} height="420px" variant="feature" />
              ))}
            </div>
          ) : (
            /* 3-card bento: large left, two stacked right */
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-3">
                <ProjectCard project={shown[0]} coverUrl={coverUrls[0] ?? null} gradientIndex={0} height="520px" variant="feature" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-4">
                <ProjectCard project={shown[1]} coverUrl={coverUrls[1] ?? null} gradientIndex={1} height="250px" variant="compact" />
                <ProjectCard project={shown[2]} coverUrl={coverUrls[2] ?? null} gradientIndex={2} height="250px" variant="compact" />
              </div>
            </div>
          )}

          {/* View all — only if more than 3 projects */}
          {caseStudies.length > 3 && (
            <div className="flex justify-center mt-10">
              <Link
                href="/work"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
                style={{ cursor: 'none' }}
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
