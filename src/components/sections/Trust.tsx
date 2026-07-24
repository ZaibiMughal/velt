'use client';

import { motion } from 'framer-motion';
import StickerBadge from '@/components/ui/StickerBadge';
import HandDrawnUnderline from '@/components/ui/HandDrawnUnderline';
import { CodeIcon } from '@/components/ui/ProductIcons';

/**
 * "What we build" band: a rounded dark panel with a serif heading, the
 * service categories as flat chips, and a single marquee of outlined
 * tech pills. Modeled on the reference site's dark logo-band panels
 * rather than a bare full-bleed text ticker.
 */

const SERVICES = [
  'Mobile Apps',
  'Web Applications',
  'SaaS Platforms',
  'Admin Dashboards',
  'AI Automations',
] as const;

const TECH = [
  'Flutter', 'React Native', 'Next.js', 'TypeScript', 'React', 'Node.js',
  'Supabase', 'PostgreSQL', 'Stripe', 'Firebase', 'OpenAI', 'AWS',
  'Vercel', 'Expo', 'GraphQL', 'REST APIs', 'TailwindCSS', 'Framer Motion', 'Figma',
] as const;

function TechPillRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden}>
      {TECH.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium"
          style={{
            border: '2px solid rgba(247,248,250,0.22)',
            color: 'var(--color-muted-inverse)',
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

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
              AI automations.
              <HandDrawnUnderline color="var(--color-secondary)" className="absolute left-0 -bottom-1.5 h-3 w-full" />
            </span>
          </h2>
        </div>

        {/* Service chips */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5 px-6">
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

        {/* Tech pill marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            <TechPillRow />
            <TechPillRow hidden />
          </motion.div>
          {/* Edge fades into the panel color */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{ background: 'linear-gradient(to right, var(--color-bg-dark), transparent)' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{ background: 'linear-gradient(to left, var(--color-bg-dark), transparent)' }}
          />
        </div>

        {/* Sticker badge slapped over the panel's bottom-left corner */}
        <div className="absolute bottom-5 left-6 hidden md:block">
          <StickerBadge size={52} rotate={-8}>
            <CodeIcon />
          </StickerBadge>
        </div>
      </div>
    </section>
  );
}
