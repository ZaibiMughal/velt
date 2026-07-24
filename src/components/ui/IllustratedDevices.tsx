'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * Flat 2D illustrated device mockups used on the landing page's Portfolio
 * cards in place of raw screenshots. Each draws an abstracted, animated UI
 * in the project's theme color so every project reads in the site's
 * controlled palette (real screenshots still live on /work and the case
 * study pages). All shapes are hard-outlined, flat-filled, zero shadows,
 * matching the 2D system.
 */

function rgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const INK = '#09090b';
const PAPER = '#fdfbf6';

/* Shared variants: parent svg staggers children in when scrolled into view */
const stage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const grow = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideIn = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const draw = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const } },
};

const fillBox = (origin: string): React.CSSProperties => ({
  transformBox: 'fill-box',
  transformOrigin: origin,
});

/* ── Phone ──────────────────────────────────────────────────────── */

export function AnimatedPhone({ t, screenshot, className }: { t: string; screenshot?: string | null; className?: string }) {
  const bars = [
    { x: 48, h: 34 },
    { x: 76, h: 56 },
    { x: 104, h: 44 },
    { x: 132, h: 70 },
    { x: 160, h: 52 },
  ];
  const clipId = `phone-screen-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      <motion.svg
        viewBox="0 0 240 440"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        variants={stage}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        aria-hidden="true"
      >
        {/* Die-cut sticker halo behind the phone */}
        <rect x="14" y="10" width="212" height="420" rx="34" fill={PAPER} stroke={INK} strokeWidth="2.5" transform="rotate(-2.5 120 220)" />

        {/* Phone body */}
        <rect x="18" y="6" width="204" height="424" rx="32" fill="#ffffff" stroke={INK} strokeWidth="3" />

        {screenshot ? (
          /* Real product screenshot clipped to the screen area */
          <>
            <clipPath id={clipId}>
              <rect x="26" y="14" width="188" height="408" rx="24" />
            </clipPath>
            <image
              href={screenshot}
              x="26"
              y="14"
              width="188"
              height="408"
              preserveAspectRatio="xMidYMin slice"
              clipPath={`url(#${clipId})`}
            />
          </>
        ) : (
          /* Abstract illustrated UI fallback */
          <>
            {/* Greeting lines */}
            <motion.g variants={slideIn}>
              <rect x="40" y="56" width="92" height="10" rx="5" fill={INK} opacity="0.85" />
              <rect x="40" y="73" width="58" height="7" rx="3.5" fill={INK} opacity="0.3" />
            </motion.g>

            {/* Hero card with pulsing status dot */}
            <motion.g variants={pop} style={fillBox('center')}>
              <rect x="40" y="96" width="160" height="74" rx="14" fill={rgba(t, 0.14)} stroke={t} strokeWidth="2.5" />
              <motion.circle
                cx="62" cy="122" r="9" fill={t}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={fillBox('center')}
              />
              <rect x="82" y="112" width="90" height="8" rx="4" fill={INK} opacity="0.7" />
              <rect x="82" y="127" width="62" height="6" rx="3" fill={INK} opacity="0.3" />
              <rect x="40" y="150" width="160" height="2.5" fill={rgba(t, 0.35)} />
              <rect x="52" y="156" width="40" height="5" rx="2.5" fill={t} opacity="0.8" />
            </motion.g>

            {/* Bar chart card */}
            <rect x="40" y="186" width="160" height="110" rx="14" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
            <rect x="52" y="198" width="52" height="7" rx="3.5" fill={INK} opacity="0.55" />
            {bars.map((b, i) => (
              <motion.rect
                key={i}
                x={b.x}
                y={282 - b.h}
                width="16"
                height={b.h}
                rx="5"
                fill={i === 3 ? t : rgba(t, 0.35)}
                stroke={i === 3 ? INK : 'none'}
                strokeWidth={i === 3 ? 2 : 0}
                variants={grow}
                style={fillBox('50% 100%')}
              />
            ))}

            {/* List rows */}
            {[312, 348].map((y, i) => (
              <motion.g key={y} variants={slideIn}>
                <rect x="40" y={y} width="160" height="26" rx="9" fill={i === 0 ? rgba(t, 0.1) : '#ffffff'} stroke={i === 0 ? t : 'rgba(9,9,11,0.2)'} strokeWidth="2" />
                <circle cx="58" cy={y + 13} r="6" fill={i === 0 ? t : rgba(t, 0.3)} />
                <rect x="72" y={y + 9} width={i === 0 ? 74 : 96} height="7" rx="3.5" fill={INK} opacity="0.5" />
              </motion.g>
            ))}

            {/* Tab bar */}
            <rect x="40" y="390" width="160" height="24" rx="12" fill={PAPER} stroke={INK} strokeWidth="2" />
            {[70, 105, 140, 175].map((cx, i) => (
              <circle key={cx} cx={cx} cy="402" r="4.5" fill={i === 0 ? t : 'rgba(9,9,11,0.22)'} />
            ))}
          </>
        )}

        {/* Dynamic island — drawn over the screenshot/screen */}
        <rect x="90" y="20" width="60" height="14" rx="7" fill={INK} />
        {/* Screen outline re-inked on top so the screenshot edge reads as drawn */}
        {screenshot && (
          <rect x="26" y="14" width="188" height="408" rx="24" fill="none" stroke={INK} strokeWidth="2" />
        )}

        {/* Floating sparkle accent */}
        <motion.g
          variants={pop}
          animate={{ rotate: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={fillBox('center')}
        >
          <path d="M222 76 l4.5 11 11 4.5 -11 4.5 -4.5 11 -4.5 -11 -11 -4.5 11 -4.5 Z" fill={t} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        </motion.g>

        {/* Small notification pill peeking off the left edge */}
        <motion.g variants={pop} style={fillBox('center')}>
          <rect x="-4" y="230" width="52" height="24" rx="12" fill={PAPER} stroke={INK} strokeWidth="2.5" transform="rotate(-6 22 242)" />
          {[10, 17, 24, 31, 38].map((bx, i) => (
            <motion.rect
              key={bx}
              x={bx}
              y={236}
              width="3"
              height={[8, 13, 10, 14, 8][i]}
              rx="1.5"
              fill={t}
              transform="rotate(-6 22 242)"
              animate={{ scaleY: [1, 0.55, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
              style={fillBox('50% 50%')}
            />
          ))}
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

/* ── Browser ────────────────────────────────────────────────────── */

export function AnimatedBrowser({ t, screenshot, className }: { t: string; screenshot?: string | null; className?: string }) {
  const stats = [
    { x: 96, w: 96 },
    { x: 200, w: 96 },
    { x: 304, w: 96 },
  ];
  const clipId = `browser-screen-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      <motion.svg
        viewBox="0 0 480 300"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        variants={stage}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        aria-hidden="true"
      >
        {/* Sticker halo */}
        <rect x="18" y="14" width="452" height="278" rx="20" fill={PAPER} stroke={INK} strokeWidth="2.5" transform="rotate(-1.2 240 150)" />

        {/* Window */}
        <rect x="12" y="8" width="456" height="284" rx="18" fill="#ffffff" stroke={INK} strokeWidth="3" />

        {/* Chrome bar */}
        <line x1="12" y1="44" x2="468" y2="44" stroke={INK} strokeWidth="2.5" />
        <circle cx="36" cy="26" r="6" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="56" cy="26" r="6" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="76" cy="26" r="6" fill={t} stroke={INK} strokeWidth="2" />
        <rect x="150" y="16" width="180" height="20" rx="10" fill={PAPER} stroke={INK} strokeWidth="2" />
        <circle cx="164" cy="26" r="4" fill={t} />
        <rect x="174" y="23" width="100" height="6" rx="3" fill={INK} opacity="0.25" />

        {screenshot ? (
          /* Real product screenshot filling the window under the chrome bar */
          <>
            <clipPath id={clipId}>
              <path d="M14 46 H466 V274 Q466 290 450 290 H30 Q14 290 14 274 Z" />
            </clipPath>
            <image
              href={screenshot}
              x="14"
              y="46"
              width="452"
              height="244"
              preserveAspectRatio="xMidYMin slice"
              clipPath={`url(#${clipId})`}
            />
          </>
        ) : (
          /* Abstract illustrated dashboard fallback */
          <>
            {/* Sidebar */}
            <line x1="82" y1="44" x2="82" y2="292" stroke={INK} strokeWidth="2.5" />
            {[66, 92, 118, 144].map((y, i) => (
              <motion.g key={y} variants={slideIn}>
                <rect x="26" y={y} width="42" height="16" rx="8" fill={i === 0 ? t : 'transparent'} stroke={i === 0 ? INK : 'rgba(9,9,11,0.25)'} strokeWidth="2" />
              </motion.g>
            ))}

            {/* Stat cards */}
            {stats.map((s, i) => (
              <motion.g key={s.x} variants={pop} style={fillBox('center')}>
                <rect x={s.x} y="58" width={s.w} height="54" rx="10" fill={i === 1 ? rgba(t, 0.12) : '#ffffff'} stroke={i === 1 ? t : INK} strokeWidth="2.5" />
                <rect x={s.x + 12} y="70" width="40" height="6" rx="3" fill={INK} opacity="0.35" />
                <rect x={s.x + 12} y="84" width="56" height="12" rx="4" fill={i === 1 ? t : rgba(t, 0.4)} />
              </motion.g>
            ))}

            {/* Chart card */}
            <rect x="96" y="126" width="200" height="150" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
            <rect x="110" y="140" width="64" height="7" rx="3.5" fill={INK} opacity="0.5" />
            {/* Grid lines */}
            {[176, 206, 236].map((y) => (
              <line key={y} x1="110" y1={y} x2="282" y2={y} stroke={'rgba(9,9,11,0.1)'} strokeWidth="1.5" strokeDasharray="3 5" />
            ))}
            {/* Animated chart line */}
            <motion.path
              d="M112 246 C138 236, 150 202, 172 208 C194 214, 200 178, 222 172 C244 166, 254 186, 280 156"
              fill="none"
              stroke={t}
              strokeWidth="3.5"
              strokeLinecap="round"
              variants={draw}
            />
            <motion.circle cx="280" cy="156" r="6" fill={t} stroke={INK} strokeWidth="2" variants={pop} style={fillBox('center')} />

            {/* Activity list */}
            {[132, 168, 204, 240].map((y, i) => (
              <motion.g key={y} variants={slideIn}>
                <rect x="310" y={y} width="140" height="26" rx="9" fill={i === 0 ? rgba(t, 0.1) : '#ffffff'} stroke={i === 0 ? t : 'rgba(9,9,11,0.2)'} strokeWidth="2" />
                <circle cx="326" cy={y + 13} r="5" fill={i === 0 ? t : rgba(t, 0.35)} />
                <rect x="338" y={y + 10} width={[78, 92, 64, 86][i]} height="6" rx="3" fill={INK} opacity="0.45" />
              </motion.g>
            ))}
          </>
        )}

        {/* Cursor arrow accent */}
        <motion.g
          variants={pop}
          animate={{ x: [0, -10, 0], y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={fillBox('center')}
        >
          <path d="M448 236 l7 22 5 -8.5 9.5 3.5 Z" fill={t} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        </motion.g>

        {/* Sparkle accent */}
        <motion.g
          variants={pop}
          animate={{ rotate: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={fillBox('center')}
        >
          <path d="M462 64 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill={PAPER} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
