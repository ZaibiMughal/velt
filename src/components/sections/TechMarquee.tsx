'use client';

import { motion } from 'framer-motion';

/**
 * Slim tech-stack ticker near the footer. Tool names matter to technical
 * evaluators, not to the client-facing sections higher up the page, so
 * this lives low and quiet.
 */

const TECH = [
  'Flutter', 'React Native', 'Next.js', 'TypeScript', 'React', 'Node.js',
  'Supabase', 'PostgreSQL', 'Stripe', 'Firebase', 'OpenAI', 'n8n', 'Airtable',
  'AWS', 'Vercel', 'Expo', 'GraphQL', 'REST APIs', 'TailwindCSS', 'Framer Motion', 'Figma',
] as const;

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 pr-2.5" aria-hidden={hidden}>
      {TECH.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium"
          style={{ border: '2px solid var(--color-border-muted)', color: 'var(--color-muted)' }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="py-10">
      <p
        className="mb-5 text-center text-[10px] font-bold uppercase"
        style={{ letterSpacing: '0.18em', color: 'var(--color-muted-dark)' }}
      >
        Built with
      </p>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <Row />
          <Row hidden />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
        />
      </div>
    </section>
  );
}
