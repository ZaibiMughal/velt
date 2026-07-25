'use client';

import StickerBadge from '@/components/ui/StickerBadge';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';
import { CodeIcon } from '@/components/ui/ProductIcons';

/**
 * "What we build" band: a rounded dark panel with a serif heading and
 * the service categories as flat chips. The tech-stack marquee lives in
 * its own strip near the footer (TechMarquee), since tool names speak
 * to developers rather than the clients this band addresses.
 */

const SERVICES = [
  'Mobile Apps',
  'Web Applications',
  'SaaS Platforms',
  'Admin Dashboards',
  'AI Automations',
] as const;

export default function Trust() {
  return (
    <section aria-label="What we build" className="px-4 py-6 md:px-6">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden py-14 md:py-16"
        style={{ background: 'var(--color-bg-dark)', borderRadius: 40 }}
      >
        {/* Header */}
        <div className="mb-8 px-6 text-center">
          <p
            className="mb-4 text-[10px] font-bold uppercase"
            style={{ letterSpacing: '0.18em', color: 'var(--color-muted-inverse-dark)' }}
          >
            What we build
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl"
            style={{ color: 'var(--color-text-inverse)', letterSpacing: '-0.02em' }}
          >
            Mobile, web, and{' '}
            <span className="relative inline-block italic">
              SaaS platforms.
              <HandDrawnUnderline color="var(--color-secondary)" className="absolute left-0 -bottom-1.5 h-3 w-full" />
            </span>
          </h2>
        </div>

        {/* Service chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 px-6">
          {SERVICES.map((s) => {
            const highlight = s === 'SaaS Platforms';
            return (
              <span
                key={s}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={
                  highlight
                    ? { background: 'var(--color-bg-accent)', border: '2px solid var(--color-border-emphasis)', color: 'var(--color-text)' }
                    : { border: '2px solid rgba(247,248,250,0.45)', color: 'var(--color-text-inverse)' }
                }
              >
                {s}
              </span>
            );
          })}
        </div>

        {/* Sticker badge slapped over the panel's bottom-left corner */}
        <div className="absolute bottom-4 left-6 hidden md:block">
          <StickerBadge size={52} rotate={-8}>
            <CodeIcon />
          </StickerBadge>
        </div>
      </div>
    </section>
  );
}
