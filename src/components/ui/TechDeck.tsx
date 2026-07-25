'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A deck of tech-stack pills that cycles like flipping through physical
 * cards: the front pill tucks to the back every couple of seconds and the
 * stack shuffles forward. Brand-colored dots are the one deliberate
 * palette exception, matching how real product logos keep their native
 * colors elsewhere on the site.
 */

const STACK = [
  { name: 'Flutter', dot: '#54C5F8' },
  { name: 'React Native', dot: '#61DAFB' },
  { name: 'Next.js', dot: '#09090b' },
  { name: 'Node.js', dot: '#83CD29' },
  { name: 'Supabase', dot: '#3ECF8E' },
  { name: 'Stripe', dot: '#635BFF' },
  { name: 'n8n', dot: '#EA4B71' },
  { name: 'Airtable', dot: '#FCB400' },
] as const;

const VISIBLE = 4;

export default function TechDeck({ className }: { className?: string }) {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFront((f) => (f + 1) % STACK.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={className} style={{ position: 'relative', width: 190, height: 150 }}>
      {STACK.map((tech, i) => {
        const p = (i - front + STACK.length) % STACK.length; // 0 = front
        return (
          <motion.div
            key={tech.name}
            animate={{
              y: -p * 16,
              scale: 1 - p * 0.055,
              opacity: p < VISIBLE ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: STACK.length - p,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '13px 20px',
              borderRadius: 999,
              background: p === 0 ? '#ffffff' : 'var(--color-bg)',
              border: '2px solid var(--color-border-emphasis)',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                flexShrink: 0,
                background: tech.dot,
                border: '1.5px solid var(--color-border-emphasis)',
              }}
            />
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {tech.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
