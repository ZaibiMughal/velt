'use client';

import { motion } from 'framer-motion';

const ROW_1 =
  'Mobile Apps · Web Applications · SaaS Platforms · Admin Dashboards · React Native · Next.js · TypeScript · Node.js · Supabase · Stripe · PostgreSQL · ';

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
        <span className="text-sm font-medium text-white/25 flex-shrink-0">
          {repeated.split('·').map((item, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="mx-2" style={{ color: '#6366f1' }}>
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </span>
        <span className="text-sm font-medium text-white/25 flex-shrink-0" aria-hidden>
          {repeated.split('·').map((item, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="mx-2" style={{ color: '#6366f1' }}>
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
        style={{ background: 'linear-gradient(to right, #09090b, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #09090b, transparent)' }}
      />
    </div>
  );
}

export default function Trust() {
  return (
    <section
      aria-label="Technology stack"
      className="py-12 border-y"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="flex flex-col gap-4">
        <MarqueeRow repeated={ROW_1_REPEATED} direction="left" />
        <MarqueeRow repeated={ROW_2_REPEATED} direction="right" />
      </div>
    </section>
  );
}
