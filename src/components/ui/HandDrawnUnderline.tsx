'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface HandDrawnUnderlineProps {
  /** CSS color value. Defaults to the primary indigo accent. */
  color?: string;
  className?: string;
  delay?: number;
}

/**
 * A hand-sketched squiggle underline that draws itself in on scroll.
 * Position it absolutely under an emphasized word, e.g.:
 *   <span className="relative inline-block">
 *     word
 *     <HandDrawnUnderline className="absolute left-0 -bottom-1 w-full h-3" />
 *   </span>
 */
export default function HandDrawnUnderline({ color = 'var(--color-primary)', className, delay = 0 }: HandDrawnUnderlineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M3 9C24 4 46 13 68 7C90 1 112 12 134 6C152 1 170 10 197 5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
