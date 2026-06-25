'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
});

/* ─── Background ──────────────────────────────────────────────────────────── */

function LineGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 48px)',
      }}
    />
  );
}

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute"
        style={{
          top: '5%', right: '5%',
          width: '55%', height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          bottom: '5%', left: '5%',
          width: '40%', height: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 12, -6, 0], y: [0, -12, 6, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
}

/* ─── Neural network data ─────────────────────────────────────────────────── */

const NODES = [
  { id: 0,  x: 200, y: 200, r: 14, primary: true  },
  { id: 1,  x: 120, y: 140, r: 8,  primary: true  },
  { id: 2,  x: 280, y: 130, r: 7,  primary: true  },
  { id: 3,  x: 80,  y: 220, r: 6,  primary: false },
  { id: 4,  x: 320, y: 210, r: 6,  primary: false },
  { id: 5,  x: 160, y: 290, r: 7,  primary: true  },
  { id: 6,  x: 240, y: 280, r: 6,  primary: false },
  { id: 7,  x: 60,  y: 310, r: 5,  primary: false },
  { id: 8,  x: 340, y: 300, r: 5,  primary: false },
  { id: 9,  x: 190, y: 80,  r: 5,  primary: false },
  { id: 10, x: 100, y: 80,  r: 4,  primary: false },
  { id: 11, x: 300, y: 75,  r: 4,  primary: false },
  { id: 12, x: 50,  y: 160, r: 5,  primary: false },
  { id: 13, x: 350, y: 150, r: 4,  primary: false },
  { id: 14, x: 210, y: 340, r: 5,  primary: false },
  { id: 15, x: 130, y: 350, r: 4,  primary: false },
  { id: 16, x: 360, y: 360, r: 4,  primary: false },
  { id: 17, x: 270, y: 50,  r: 4,  primary: false },
  { id: 18, x: 380, y: 240, r: 4,  primary: false },
  { id: 19, x: 30,  y: 380, r: 3,  primary: false },
] as const;

function computeEdges() {
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i].x - NODES[j].x;
      const dy = NODES[i].y - NODES[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 140) {
        edges.push({ x1: NODES[i].x, y1: NODES[i].y, x2: NODES[j].x, y2: NODES[j].y, key: `${i}-${j}` });
      }
    }
  }
  return edges;
}

const EDGES = computeEdges();
const ACTIVE_EDGE_KEYS = new Set(['0-1', '0-2', '0-5', '0-6', '1-3', '2-4', '1-9', '5-6', '3-7']);
const PULSE_NODE_IDS = [0, 1, 2, 5] as const;

/* ─── Floating product badges ─────────────────────────────────────────────── */

const FLOAT_LABELS = [
  { text: 'Mobile App',       sub: 'iOS + Android',    x: '68%',  y: '4%',   delay: 0   },
  { text: 'Web App',          sub: 'React / Next.js',  x: '72%',  y: '65%',  delay: 0.5 },
  { text: 'SaaS Platform',    sub: 'Full-stack',        x: '-5%',  y: '10%',  delay: 1.0 },
  { text: 'Admin Dashboard',  sub: 'Analytics',         x: '-8%',  y: '65%',  delay: 0.7 },
] as const;

/* ─── Neural net visual ───────────────────────────────────────────────────── */

function NeuralNet() {
  return (
    /* Container is larger than before (560px) so badges have room to breathe */
    <div className="relative flex items-center justify-center" style={{ width: 560, height: 560, flexShrink: 0 }}>
      {/* Ambient glow */}
      <div
        className="absolute"
        style={{
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.14), transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      {/* SVG rendered at 520×520, viewBox stays 0 0 400 400 → scales up ~1.3× */}
      <motion.svg
        width="520"
        height="520"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <filter id="glow-center">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-node">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map(e => (
          <line
            key={e.key}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={ACTIVE_EDGE_KEYS.has(e.key) ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.2)'}
            strokeWidth={ACTIVE_EDGE_KEYS.has(e.key) ? 0.9 : 0.5}
          />
        ))}

        {/* Animated travel dots — forward */}
        {EDGES.filter(e => ACTIVE_EDGE_KEYS.has(e.key)).map((e, idx) => (
          <circle key={`t-${e.key}`} r="3" fill="#818cf8" opacity="0.9" filter="url(#glow-node)">
            <animateMotion path={`M ${e.x1},${e.y1} L ${e.x2},${e.y2}`} dur={`${2.2 + idx * 0.4}s`} repeatCount="indefinite" calcMode="linear" />
          </circle>
        ))}

        {/* Travel dots — reverse */}
        {EDGES.filter(e => ACTIVE_EDGE_KEYS.has(e.key)).slice(0, 4).map((e, idx) => (
          <circle key={`tr-${e.key}`} r="2" fill="#a78bfa" opacity="0.7" filter="url(#glow-node)">
            <animateMotion path={`M ${e.x2},${e.y2} L ${e.x1},${e.y1}`} dur={`${3.0 + idx * 0.5}s`} repeatCount="indefinite" calcMode="linear" begin={`${0.8 + idx * 0.3}s`} />
          </circle>
        ))}

        {/* Nodes */}
        {NODES.map(node => (
          <g key={node.id}>
            {node.primary ? (
              <>
                <circle cx={node.x} cy={node.y} r={node.r + 6} fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
                <circle cx={node.x} cy={node.y} r={node.r} fill={node.id === 0 ? '#6366f1' : '#7c3aed'} filter="url(#glow-center)" />
              </>
            ) : (
              <circle cx={node.x} cy={node.y} r={node.r} fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            )}
          </g>
        ))}
      </motion.svg>

      {/* Pulse rings on primary nodes — counter-rotate to stay fixed */}
      {PULSE_NODE_IDS.map((nodeId, i) => {
        const node = NODES[nodeId];
        return (
          <motion.div
            key={nodeId}
            className="absolute rounded-full"
            style={{
              width: node.r * 2 + 16,
              height: node.r * 2 + 16,
              border: '1px solid rgba(99,102,241,0.4)',
              left: '50%',
              top: '50%',
              marginLeft: node.x - 200 - (node.r + 8),
              marginTop: node.y - 200 - (node.r + 8),
            }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
          />
        );
      })}

      {/* Floating product badges — absolute relative to container, don't rotate */}
      {FLOAT_LABELS.map((label, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: label.x, top: label.y }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: label.delay + 0.8 },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: label.delay },
          }}
        >
          <div
            className="rounded-xl px-3 py-2 text-left"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              minWidth: '130px',
            }}
          >
            <div className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{label.text}</div>
            <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{ background: '#060608' }}
    >
      <LineGrid />
      <Aurora />

      {/* Left text column */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{ width: '50%', padding: '80px 48px 80px 80px' }}
      >
        <motion.div {...fadeUp(0)} style={{ marginBottom: 28 }}>
          <Badge dot>Product Development Studio</Badge>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          style={{
            fontSize: 'clamp(2.6rem, 4.2vw, 4rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            fontWeight: 700,
            color: 'white',
            marginBottom: '1.25rem',
          }}
        >
          Your product,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            live in weeks.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 460,
            lineHeight: 1.7,
            marginBottom: '1.75rem',
          }}
        >
          We build mobile apps, web apps, and SaaS platforms at a fixed price.
          One team, full ownership, no surprises.
        </motion.p>

        <motion.div {...fadeUp(0.3)} style={{ marginBottom: '1.75rem' }}>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.32)',
              boxShadow: '0 0 24px rgba(99,102,241,0.12)',
            }}
          >
            <span style={{ color: '#818cf8', fontSize: 13 }}>✦</span>
            <span className="text-sm font-semibold" style={{ color: '#c7d2fe' }}>
              Fixed pricing - no hidden costs
            </span>
          </div>
          <p className="text-[11px] mt-1.5 pl-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
            30% advance · 70% on handover · Source code always yours
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}
        >
          <Button size="lg" variant="primary" onClick={() => scrollTo('#contact')}>
            Claim Your Build Slot
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollTo('#packages')}>
            View Plans →
          </Button>
        </motion.div>

      </div>

      {/* Right: neural network with floating badges */}
      <div className="relative z-10 flex flex-1 items-center justify-center" style={{ paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <NeuralNet />
        </motion.div>
      </div>
    </section>
  );
}
