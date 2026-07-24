'use client';

import { motion } from 'framer-motion';
import StickerBadge from '@/components/ui/StickerBadge';
import { CodeIcon } from '@/components/ui/ProductIcons';

const ROW_1 =
  'Mobile Apps · Web Applications · SaaS Platforms · Admin Dashboards · Flutter · React Native · Next.js · TypeScript · Node.js · Supabase · Stripe · PostgreSQL · ';

const ROW_2 =
  'React · TailwindCSS · Framer Motion · Firebase · AWS · Vercel · Expo · Flutter · GraphQL · REST APIs · Figma · ';

const ROW_1_REPEATED = ROW_1.repeat(4);
const ROW_2_REPEATED = ROW_2.repeat(4);

function MarqueeRow({ repeated, direction }: { repeated: string; direction: 'left' | 'right' }) {
  const isRight = direction === 'right';

  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: isRight ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-sm font-medium flex-shrink-0" style={{ color: 'var(--color-muted-inverse)' }}>
          {repeated.split('·').map((item, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="mx-2" style={{ color: 'var(--color-primary)' }}>
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </span>
        <span className="text-sm font-medium flex-shrink-0" style={{ color: 'var(--color-muted-inverse)' }} aria-hidden>
          {repeated.split('·').map((item, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="mx-2" style={{ color: 'var(--color-primary)' }}>
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </span>
      </motion.div>
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-bg-dark), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-bg-dark), transparent)' }}
      />
    </div>
  );
}

export default function Trust() {
  return (
    <section
      aria-label="Technology stack"
      className="relative py-14"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      <div className="hidden sm:block absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <StickerBadge size={40} rotate={-8}>
          <CodeIcon />
        </StickerBadge>
      </div>
      <div className="flex flex-col gap-4">
        <MarqueeRow repeated={ROW_1_REPEATED} direction="left" />
        <MarqueeRow repeated={ROW_2_REPEATED} direction="right" />
      </div>
    </section>
  );
}
