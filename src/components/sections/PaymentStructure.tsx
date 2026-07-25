'use client';

import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CheckIcon from '@/components/ui/CheckIcon';

/**
 * Visual-first payment terms: one segmented bar instead of paragraph
 * cards, since the whole story is "30 now, 70 when you're happy".
 */

const HANDOVER_ITEMS = [
  'Complete source code',
  'Repository access',
  'Deployment credentials',
  'Technical documentation',
  'Admin access',
  'Knowledge transfer session',
];

export default function PaymentStructure() {
  return (
    <section className="py-24 md:py-32" style={{ background: 'var(--color-bg-accent)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 mb-14">
          <Badge>Transparency</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
            Two payments. That&apos;s it.
          </h2>
        </AnimatedSection>

        {/* Segmented payment bar */}
        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto mb-6">
          {/* The in-view trigger lives on this full-width parent: the segment
              itself starts at scaleX(0), a zero-area rect that
              IntersectionObserver never reports as visible, so a
              whileInView on the segment never fires. */}
          <motion.div
            className="relative flex h-20 overflow-hidden rounded-2xl"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-emphasis)' }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* 30% segment */}
            <motion.div
              className="flex items-center justify-center"
              style={{ width: '30%', background: 'var(--color-primary)', borderRight: '2px solid var(--color-border-emphasis)', transformOrigin: 'left center' }}
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <span className="font-serif text-2xl md:text-3xl" style={{ color: '#fff' }}>30%</span>
            </motion.div>
            {/* 70% segment */}
            <div className="flex flex-1 items-center justify-center gap-3">
              <span className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>70%</span>
            </div>
          </motion.div>

          {/* Milestone labels under the bar */}
          <div className="mt-3 flex text-left">
            <div style={{ width: '30%' }} className="pr-2">
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Kickoff</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Starts the build</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Handover</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Only when you&apos;re happy with the product</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Handover chips */}
        <AnimatedSection delay={0.2} className="max-w-2xl mx-auto">
          <p
            className="mb-4 mt-10 text-center text-[10px] font-bold uppercase"
            style={{ letterSpacing: '0.18em', color: 'var(--color-muted)' }}
          >
            Handover includes
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {HANDOVER_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-muted)', color: 'var(--color-text)' }}
              >
                <CheckIcon />
                {item}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Contextual CTA */}
        <AnimatedSection delay={0.3} className="mt-10 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Ready to start?{' '}
            <a
              href="#contact"
              className="font-semibold transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Claim your build slot →
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
