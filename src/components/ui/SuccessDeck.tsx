'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A deck of client outcome cards cycling like flipping through physical
 * cards, shown beside the contact form. Replaces the old tech-stack
 * deck: the person about to write to us should see proof of results,
 * not tool names.
 */

const WINS = [
  { project: 'RideSpotr', win: 'Millions of cars spotted' },
  { project: 'TruckTuck', win: '1M+ monthly visitors' },
  { project: 'NutritionUP', win: '4-platform ecosystem' },
  { project: 'KeyOS', win: '4 portals, one codebase' },
  { project: 'IbisPrep', win: 'Full marketplace, 3 platforms' },
  { project: 'SalesPulse', win: 'Reporting automated with AI' },
] as const;

const VISIBLE = 4;

export default function SuccessDeck({ className }: { className?: string }) {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFront((f) => (f + 1) % WINS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={className} style={{ position: 'relative', width: 220, height: 170 }}>
      {WINS.map((w, i) => {
        const p = (i - front + WINS.length) % WINS.length; // 0 = front
        return (
          <motion.div
            key={w.project}
            animate={{
              y: -p * 18,
              scale: 1 - p * 0.055,
              opacity: p < VISIBLE ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: WINS.length - p,
              padding: '14px 18px',
              borderRadius: 16,
              background: p === 0 ? '#ffffff' : 'var(--color-bg)',
              border: '2px solid var(--color-border-emphasis)',
            }}
          >
            <span className="block text-[10px] font-bold uppercase" style={{ letterSpacing: '0.14em', color: 'var(--color-primary)' }}>
              {w.project}
            </span>
            <span className="mt-0.5 block text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {w.win}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
