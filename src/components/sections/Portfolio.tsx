'use client';

import { useState } from 'react';
import Link from 'next/link';
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

interface CardProps {
  project: CaseStudy;
  gradientIndex: number;
  height?: string;
}

function ProjectCard({ project, gradientIndex, height = '260px' }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const hasImage = Boolean(project.cover_image?.startsWith('http'));

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
          background: hasImage ? '#09090b' : GRADIENTS[gradientIndex % GRADIENTS.length],
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image!}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              opacity: hovered ? 0.85 : 0.75,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.5) 38%, rgba(9,9,11,0.08) 70%, transparent 100%)',
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
}

export default function Portfolio({ caseStudies }: PortfolioProps) {
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
            <ProjectCard project={shown[0]} gradientIndex={0} height="480px" />
          ) : shown.length === 2 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {shown.map((p, i) => (
                <ProjectCard key={p.slug} project={p} gradientIndex={i} height="420px" />
              ))}
            </div>
          ) : (
            /* 3-card bento: large left, two stacked right */
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-3">
                <ProjectCard project={shown[0]} gradientIndex={0} height="520px" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-4">
                <ProjectCard project={shown[1]} gradientIndex={1} height="250px" />
                <ProjectCard project={shown[2]} gradientIndex={2} height="250px" />
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
                View all {caseStudies.length} projects
                <ArrowIcon />
              </Link>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
