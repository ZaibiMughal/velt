'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CheckIcon from '@/components/ui/CheckIcon';
import { packages, SLOTS_AVAILABLE } from '@/data/packages';

const EXPAND = 'cubic-bezier(0.16,1,0.3,1)';

export default function Packages() {
  const [active, setActive] = useState(1);

  function scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="packages" className="py-24 md:py-32 overflow-x-clip">
      {/* Below md, the 3D fan collapses to a single centered card, switched via the tab bar above.
          The side cards' partial-visibility slivers only read correctly at desktop widths. */}
      <style>{`
        @media (max-width: 767px) {
          .pkg-card:not(.pkg-card-active) { display: none; }
          .pkg-card-active { margin-left: 0 !important; }
        }
        .pkg-tab-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-14">
          <Badge>Pricing</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Fixed price. No surprises.
          </h2>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
              style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite' }}
            />
            <span className="text-sm text-white/55">{SLOTS_AVAILABLE} project slots available this month</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Tab bar — scrolls horizontally below md, since all 3 tabs together
              don't fit a phone width and centering would push the first tab
              off-screen with no way to scroll back to it. */}
          <div
            className="pkg-tab-scroll flex justify-start md:justify-center mb-10 overflow-x-auto"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <div
              className="flex gap-1 p-1 rounded-2xl shrink-0 mx-auto"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {packages.map((pkg, i) => (
                <button
                  key={pkg.id}
                  onClick={() => setActive(i)}
                  className="relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 outline-none"
                  style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.4)' }}
                >
                  {active === i && (
                    <motion.div
                      layoutId="pkg-tab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'rgba(99,102,241,0.14)',
                        boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.35)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {pkg.highlighted && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    {pkg.name}
                    <span
                      className="text-xs font-semibold rounded-full px-2 py-0.5 tabular-nums"
                      style={{
                        background: active === i ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.06)',
                        color: active === i ? '#a5b4fc' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {pkg.price}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3D fan — all 3 cards always visible, top-aligned so they grow downward */}
          <div
            className="flex items-start justify-center"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 45%' }}
          >
            {packages.map((pkg, i) => {
              const isActive = i === active;
              const dist     = i - active;

              return (
                <motion.div
                  key={pkg.id}
                  onClick={() => !isActive && setActive(i)}
                  animate={{
                    rotateY: dist * -18,
                    scale:   isActive ? 1 : pkg.highlighted ? 0.89 : 0.84,
                    opacity: isActive ? 1 : pkg.highlighted ? 0.78 : 0.48,
                    z:       isActive ? 0 : -80,
                    x:       dist * (isActive ? 0 : -32),
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 34, mass: 0.8 }}
                  className={`pkg-card relative flex flex-col rounded-2xl ${isActive ? 'pkg-card-active' : ''}`}
                  style={{
                    width: '340px',
                    maxWidth: '100%',
                    flexShrink: 0,
                    marginLeft: i > 0 ? '-48px' : '0',
                    zIndex:     isActive ? 10 : i < active ? 4 : 3,
                    cursor:     isActive ? 'default' : 'pointer',
                    boxShadow: isActive
                      ? pkg.highlighted
                        ? '0 0 0 1.5px rgba(99,102,241,0.75), 0 -16px 60px rgba(99,102,241,0.55), 0 24px 72px rgba(0,0,0,0.7)'
                        : '0 0 0 1px rgba(99,102,241,0.38), 0 -6px 32px rgba(99,102,241,0.2), 0 20px 50px rgba(0,0,0,0.55)'
                      : pkg.highlighted
                        ? '0 0 0 1.5px rgba(99,102,241,0.45), 0 0 40px rgba(99,102,241,0.18), 0 8px 28px rgba(0,0,0,0.4)'
                        : '0 0 0 1px rgba(255,255,255,0.07), 0 8px 24px rgba(0,0,0,0.35)',
                    background: isActive
                      ? pkg.highlighted ? 'rgba(14,12,26,0.92)' : 'rgba(11,11,14,0.88)'
                      : pkg.highlighted ? 'rgba(12,10,22,0.75)' : 'rgba(11,11,14,0.65)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  {/* Outer glow halo — highlighted card only, bleeds outside card bounds */}
                  {pkg.highlighted && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        inset: '-60px',
                        zIndex: -1,
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse at 50% 42%, rgba(99,102,241,0.32) 0%, rgba(124,58,237,0.14) 42%, transparent 68%)',
                        opacity: isActive ? 1 : 0.55,
                        transition: 'opacity 0.5s ease',
                        filter: 'blur(8px)',
                      }}
                    />
                  )}

                  {/* Top accent line — 2px + glow for highlighted */}
                  {(isActive || pkg.highlighted) && (
                    <div
                      className="absolute inset-x-0 top-0 rounded-t-2xl pointer-events-none"
                      style={{
                        height: pkg.highlighted ? '2px' : '1px',
                        background: 'linear-gradient(90deg, transparent 8%, rgba(99,102,241,0.95) 40%, rgba(139,92,246,0.95) 60%, transparent 92%)',
                        opacity: isActive ? 1 : pkg.highlighted ? 0.65 : 0.4,
                      }}
                    />
                  )}

                  <div className="flex flex-col gap-5 p-7">
                    {/* Plan name + badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                        <p className="text-xs text-white/35 mt-0.5">{pkg.delivery}</p>
                      </div>
                      {pkg.highlighted && (
                        <span
                          className="text-[10px] font-medium px-2.5 py-1 rounded-full shrink-0"
                          style={{
                            background: isActive ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.1)',
                            color: isActive ? '#a5b4fc' : 'rgba(165,180,252,0.5)',
                            border: `1px solid ${isActive ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.18)'}`,
                          }}
                        >
                          Most Picked
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-bold leading-none"
                        style={{
                          fontSize:   isActive ? '2.8rem' : '2rem',
                          color:      isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                          transition: `font-size 0.35s ${EXPAND}, color 0.3s ease`,
                        }}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-[11px] text-white/30 uppercase tracking-widest pb-1">fixed</span>
                    </div>

                    {/* Feature list */}
                    <div className="flex flex-col gap-2">
                      {/* Always visible: first 4 features */}
                      <ul className="flex flex-col gap-2">
                        {pkg.features.slice(0, 4).map((f, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)' }}
                          >
                            <CheckIcon />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* Extra features + Ideal for — CSS grid accordion (no JS height measurement) */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: isActive ? '1fr' : '0fr',
                          transition: `grid-template-rows 0.42s ${EXPAND}`,
                        }}
                      >
                        <div
                          style={{
                            overflow: 'hidden',
                            minHeight: 0,
                            opacity: isActive ? 1 : 0,
                            transition: `opacity 0.28s ease ${isActive ? '0.1s' : '0s'}`,
                          }}
                        >
                          <ul className="flex flex-col gap-2">
                            {pkg.features.slice(4, 7).map((f, fi) => (
                              <li
                                key={fi}
                                className="flex items-start gap-2.5 text-sm"
                                style={{ color: 'rgba(255,255,255,0.65)' }}
                              >
                                <CheckIcon />
                                {f}
                              </li>
                            ))}
                            {pkg.features.length > 7 && (
                              <li className="text-xs pl-[22px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                                +{pkg.features.length - 7} more included
                              </li>
                            )}
                          </ul>

                          <div className="flex flex-col gap-2 mt-4">
                            <p className="text-[10px] text-white/25 uppercase tracking-wider">Ideal for</p>
                            <div className="flex flex-wrap gap-1.5">
                              {pkg.idealFor.map(tag => (
                                <span
                                  key={tag}
                                  className="text-[11px] px-2.5 py-1 rounded-full"
                                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA — grid accordion for primary; inverse for ghost */}
                    <div className="mt-2 flex flex-col gap-2">
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: isActive ? '1fr' : '0fr',
                          transition: `grid-template-rows 0.35s ${EXPAND}`,
                        }}
                      >
                        <div style={{ overflow: 'hidden', minHeight: 0 }}>
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full justify-center"
                            onClick={scrollToContact}
                          >
                            Claim Your Build Slot
                          </Button>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: isActive ? '0fr' : '1fr',
                          transition: `grid-template-rows 0.3s ${EXPAND}`,
                        }}
                      >
                        <div style={{ overflow: 'hidden', minHeight: 0 }}>
                          <button
                            className="w-full text-sm py-2.5 rounded-xl"
                            style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}
                            onClick={() => setActive(i)}
                          >
                            View {pkg.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Payment terms */}
          <p className="text-center text-sm text-white/25 mt-8">
            30% advance · 70% on handover · Source code always yours
          </p>

          <div className="flex justify-center mt-5">
            <Link
              href="/pricing"
              className="text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
            >
              See the full plan comparison <span style={{ color: '#818cf8' }}>&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
