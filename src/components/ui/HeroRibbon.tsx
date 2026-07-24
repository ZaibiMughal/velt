'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';

/**
 * The hero's signature animated moment: a near-black ribbon undulating
 * across the section carrying a looping stream of process words, with a
 * small code pill riding the curve.
 *
 * The loop works by measuring one phrase's rendered width (W) and the
 * path's total length (L), rendering enough phrase repeats to cover
 * L + W, then scrolling startOffset from 0 to -W each cycle. A shift of
 * exactly one phrase width produces an identical frame, so the loop has
 * no seam by construction, unlike the two-offset-copies approximation.
 */

const PHRASE = 'IDEA · DESIGN · BUILD · SHIP · ';
const SPEED = 42; // px per second along the path

export default function HeroRibbon({ className }: { className?: string }) {
  const measureRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [dims, setDims] = useState<{ w: number; repeats: number } | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = measureRef.current;
    const path = pathRef.current;
    if (!measure || !path) return;
    const w = measure.getComputedTextLength();
    const l = path.getTotalLength();
    if (w > 0) setDims({ w, repeats: Math.ceil((l + w) / w) + 1 });
  }, []);

  useAnimationFrame((time) => {
    if (!dims || reduced) return;
    const el = textPathRef.current;
    if (!el) return;
    const offset = -((time / 1000) * SPEED) % dims.w;
    el.setAttribute('startOffset', String(offset));
  });

  return (
    <svg
      viewBox="0 0 1440 210"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}
    >
      <path
        ref={pathRef}
        id="hero-ribbon-path"
        d="M-60 130 C 220 40, 470 190, 740 115 C 990 45, 1210 165, 1500 85"
        fill="none"
        stroke="var(--color-bg-dark)"
        strokeWidth="42"
        strokeLinecap="round"
      />

      {/* Hidden single-phrase copy used only to measure phrase width */}
      <text
        ref={measureRef}
        fontSize="15"
        fontWeight="600"
        letterSpacing="0.08em"
        style={{ visibility: 'hidden' }}
      >
        {PHRASE}
      </text>

      {dims && (
        <text
          fontSize="15"
          fontWeight="600"
          letterSpacing="0.08em"
          fill="var(--color-text-inverse)"
          dominantBaseline="middle"
          dy="1"
        >
          <textPath ref={textPathRef} href="#hero-ribbon-path" startOffset="0">
            {PHRASE.repeat(dims.repeats)}
          </textPath>
        </text>
      )}

      {/* Code pill riding the curve */}
      <g transform="translate(712 96) rotate(-9)">
        <rect x="-38" y="-19" width="76" height="38" rx="19" fill="var(--color-bg)" stroke="var(--color-border-emphasis)" strokeWidth="2.5" />
        <text
          x="0"
          y="1"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="700"
          fill="var(--color-primary)"
          fontFamily="var(--font-geist-mono), monospace"
        >
          {'</>'}
        </text>
      </g>
    </svg>
  );
}
