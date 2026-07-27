'use client';

import { FaRobot, FaPuzzlePiece, FaBug } from 'react-icons/fa6';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';

/**
 * Speaks to the semi-technical client who already has a partial product:
 * AI-built prototypes that hit a wall, codebases abandoned mid-build, or
 * live apps that need fixing. The CTA opens the guided brief, whose
 * "How far along is your idea?" step already routes existing products.
 */

const SCENARIOS = [
  {
    Icon: FaRobot,
    title: 'Built with AI tools and hit a wall',
    body: 'You got far with Lovable, Cursor, or v0, then the bugs, auth, or deployment got real. We audit what you have, keep what works, and take it to production.',
  },
  {
    Icon: FaPuzzlePiece,
    title: 'A freelancer or agency left it unfinished',
    body: 'Half-built codebase, missing handover, no documentation. We map what exists, give you an honest status, and finish the job properly.',
  },
  {
    Icon: FaBug,
    title: 'Live, but buggy or slow',
    body: 'Your product works until it does not. We stabilize crashes, fix performance, and set it up to handle growth without a rewrite.',
  },
] as const;

export default function Rescue() {
  function openBrief() {
    window.dispatchEvent(new CustomEvent('hexspire:open-brief'));
  }

  return (
    <section id="rescue" className="py-24 md:py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-14">
          <Badge>Product Rescue</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
            Already started?{' '}
            <span className="relative inline-block italic">
              We take it from here.
              <HandDrawnUnderline className="absolute left-0 -bottom-2 h-3 w-full" />
            </span>
          </h2>
          <p className="max-w-lg" style={{ color: 'var(--color-muted)' }}>
            You do not need to start from scratch to work with us. Most of our
            clients today arrive with something half-built.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SCENARIOS.map((s, i) => (
            <AnimatedSection
              key={s.title}
              delay={i * 0.08}
              className="rounded-2xl p-7 flex flex-col gap-3"
              style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-muted)' }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: 'var(--color-bg-accent)', border: '2px solid var(--color-border-emphasis)' }}
              >
                <s.Icon size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{s.body}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.25} className="mt-10 flex flex-col items-center gap-3 text-center">
          <Button size="lg" variant="primary" onClick={openBrief}>
            Get a free code review
          </Button>
          <p className="text-xs max-w-sm" style={{ color: 'var(--color-muted-dark)' }}>
            Tell us what you have and where it stands. You get an honest
            assessment within 48 hours, whether or not we work together.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
