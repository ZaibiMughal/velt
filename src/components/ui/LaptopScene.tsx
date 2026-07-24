'use client';

import { motion } from 'framer-motion';

/**
 * Large flat illustrated scene for dark panels: a laptop mid-build with
 * two speech bubbles (a code/waveform one and a scribble one). Every
 * shape carries a cream outer stroke behind its black ink outline, the
 * die-cut sticker treatment that makes flat art read as layered paper
 * on a dark background.
 */

const INK = '#09090b';
const PAPER = '#fdfbf6';
const INDIGO = '#6366f1';
const VIOLET = '#a78bfa';
const LAVENDER = '#ebe9ff';

const stage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const fillBox: React.CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' };

export default function LaptopScene({ className }: { className?: string }) {
  const codeLines = [
    { x: 108, y: 74, w: 56, c: PAPER, o: 0.9 },
    { x: 108, y: 88, w: 84, c: VIOLET, o: 1 },
    { x: 122, y: 102, w: 62, c: PAPER, o: 0.45 },
    { x: 122, y: 116, w: 74, c: INDIGO, o: 1 },
    { x: 108, y: 130, w: 44, c: PAPER, o: 0.7 },
  ];

  return (
    <motion.svg
      viewBox="0 0 380 300"
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
      variants={stage}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      aria-hidden="true"
    >
      {/* ── Laptop (die-cut group) ── */}
      <motion.g
        variants={pop}
        style={fillBox}
        animate={{ rotate: [0, 1.2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Cream die-cut silhouette behind everything */}
        <g stroke={PAPER} strokeWidth="14" strokeLinejoin="round" fill={PAPER}>
          <rect x="92" y="52" width="196" height="118" rx="12" transform="rotate(-4 190 111)" />
          <path d="M70 214 L310 214 L290 172 L90 172 Z" transform="rotate(-4 190 193)" />
        </g>

        <g transform="rotate(-4 190 140)">
          {/* Screen */}
          <rect x="92" y="52" width="196" height="118" rx="12" fill={INK} stroke={INK} strokeWidth="3" />
          <rect x="100" y="60" width="180" height="102" rx="8" fill="#17171a" />
          {codeLines.map((l, i) => (
            <motion.rect
              key={i}
              x={l.x}
              y={l.y}
              width={l.w}
              height="7"
              rx="3.5"
              fill={l.c}
              opacity={l.o}
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.4, delay: 0.5 + i * 0.14, ease: [0.22, 1, 0.36, 1] } },
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            />
          ))}
          {/* Blinking cursor */}
          <motion.rect
            x="156" y="128" width="3" height="11" fill={INDIGO}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />

          {/* Keyboard deck */}
          <path d="M70 214 L310 214 L290 172 L90 172 Z" fill={LAVENDER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {/* Key rows */}
          {[0, 1, 2].map((row) =>
            Array.from({ length: 9 - row }, (_, i) => (
              <rect
                key={`${row}-${i}`}
                x={97 + row * 7 + i * 21}
                y={177 + row * 12}
                width="17"
                height="9"
                rx="3"
                fill="#ffffff"
                stroke={INK}
                strokeWidth="1.6"
              />
            )),
          )}
          {/* Trackpad strip */}
          <rect x="158" y="204" width="66" height="6" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        </g>
      </motion.g>

      {/* ── Waveform speech bubble (left) ── */}
      <motion.g
        variants={pop}
        style={fillBox}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g stroke={PAPER} strokeWidth="12" strokeLinejoin="round" fill={PAPER}>
          <rect x="18" y="34" width="96" height="56" rx="18" />
          <path d="M50 88 L44 108 L68 90 Z" />
        </g>
        <rect x="18" y="34" width="96" height="56" rx="18" fill="#ffffff" stroke={INK} strokeWidth="3" />
        <path d="M50 88 L44 108 L68 90 Z" fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {[38, 50, 62, 74, 86].map((bx, i) => (
          <motion.rect
            key={bx}
            x={bx}
            y={52}
            width="5"
            height={[16, 24, 20, 26, 14][i]}
            rx="2.5"
            fill={INDIGO}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </motion.g>

      {/* ── Scribble speech bubble (right) ── */}
      <motion.g
        variants={pop}
        style={fillBox}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <g stroke={PAPER} strokeWidth="12" strokeLinejoin="round" fill={PAPER}>
          <rect x="286" y="18" width="82" height="52" rx="17" />
          <path d="M312 68 L308 88 L332 70 Z" />
        </g>
        <rect x="286" y="18" width="82" height="52" rx="17" fill={VIOLET} stroke={INK} strokeWidth="3" />
        <path d="M312 68 L308 88 L332 70 Z" fill={VIOLET} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path
          d="M300 44 q6 -10 12 0 q6 10 12 0 q6 -10 12 0 q6 10 12 0"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>

      {/* ── Question-mark chip ── */}
      <motion.g
        variants={pop}
        style={fillBox}
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <circle cx="330" cy="196" r="22" fill={PAPER} stroke={INK} strokeWidth="3" />
        <text x="330" y="198" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="700" fill={INDIGO}>
          ?
        </text>
      </motion.g>

      {/* ── Sparkle ── */}
      <motion.g
        variants={pop}
        style={fillBox}
        animate={{ rotate: [0, 14, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M52 150 l5.5 13 13 5.5 -13 5.5 -5.5 13 -5.5 -13 -13 -5.5 13 -5.5 Z"
          fill={VIOLET}
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  );
}
