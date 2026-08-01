'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CheckIcon from '@/components/ui/CheckIcon';
import { packages } from '@/data/packages';

const EXPAND = 'cubic-bezier(0.16,1,0.3,1)';

export default function Packages() {
  const [active, setActive] = useState(1);

  /* Tell the contact form which plan was chosen (it listens for this
     event and preselects the matching plan pill), then scroll to it. */
  function claimPlan(planName: string) {
    window.dispatchEvent(new CustomEvent('hexspire:select-plan', { detail: planName }));
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="packages" className="py-24 md:py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-14">
          <Badge>Pricing</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
            Fixed price. No surprises.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Mobile: vertical list, all 3 plans visible at once. Desktop: flat pill tab bar. */}
          <div className="flex md:hidden flex-col gap-2 mb-8">
            {packages.map((pkg, i) => {
              const isActive = i === active;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-150"
                  style={{
                    background: isActive ? 'var(--color-bg-accent)' : 'var(--color-surface)',
                    border: `2px solid ${isActive ? 'var(--color-border-emphasis)' : 'var(--color-border-muted)'}`,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: isActive ? 'var(--color-primary)' : 'transparent' }}
                    />
                    <span className="text-sm font-medium" style={{ color: isActive ? 'var(--color-text)' : 'var(--color-muted)' }}>
                      {pkg.name}
                    </span>
                    {pkg.highlighted && (
                      <span
                        className="text-[9px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5"
                        style={{ background: 'var(--color-primary)', color: '#fff' }}
                      >
                        Popular
                      </span>
                    )}
                  </span>
                  <span
                    className="text-sm font-semibold tabular-nums shrink-0"
                    style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-muted-dark)' }}
                  >
                    {pkg.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop tab bar — flat fill, no blur */}
          <div className="hidden md:flex justify-center mb-10">
            <div
              className="flex gap-1 p-1 rounded-2xl"
              style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-muted)' }}
            >
              {packages.map((pkg, i) => (
                <button
                  key={pkg.id}
                  onClick={() => setActive(i)}
                  className="relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-150 outline-none"
                  style={{ color: active === i ? 'var(--color-text)' : 'var(--color-muted)' }}
                >
                  {active === i && (
                    <motion.div
                      layoutId="pkg-tab"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'var(--color-bg-accent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {pkg.highlighted && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                    )}
                    {pkg.name}
                    <span
                      className="text-xs font-semibold rounded-full px-2 py-0.5 tabular-nums"
                      style={{
                        background: active === i ? 'var(--color-primary)' : 'var(--color-border-muted)',
                        color: active === i ? '#fff' : 'var(--color-muted-dark)',
                      }}
                    >
                      {pkg.price}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flat 3-up grid — no 3D fan, no perspective */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg, i) => {
              const isActive = i === active;

              return (
                <motion.div
                  key={pkg.id}
                  onClick={() => !isActive && setActive(i)}
                  className={`relative flex-col rounded-[32px] ${isActive ? 'flex' : 'hidden md:flex'}`}
                  style={{
                    background: 'var(--color-surface)',
                    border: `2px solid ${pkg.highlighted ? 'var(--color-border-emphasis)' : 'var(--color-border-muted)'}`,
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div className="flex flex-col gap-5 p-7">
                    {/* Plan name + badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{pkg.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted-dark)' }}>{pkg.delivery}</p>
                      </div>
                      {pkg.highlighted && (
                        <span
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                          style={{ background: 'var(--color-primary)', color: '#fff' }}
                        >
                          Most Picked
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-serif font-medium leading-none"
                        style={{ fontSize: '2.6rem', color: 'var(--color-text)' }}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest pb-1" style={{ color: 'var(--color-muted-dark)' }}>
                        {pkg.priceNote ?? 'Fixed'}
                      </span>
                    </div>

                    {/* Feature list */}
                    <div className="flex flex-col gap-2">
                      <ul className="flex flex-col gap-2">
                        {pkg.features.slice(0, 4).map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
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
                              <li key={fi} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                                <CheckIcon />
                                {f}
                              </li>
                            ))}
                            {pkg.features.length > 7 && (
                              <li className="text-xs pl-[22px]" style={{ color: 'var(--color-muted-dark)' }}>
                                +{pkg.features.length - 7} more included
                              </li>
                            )}
                          </ul>

                          <div className="flex flex-col gap-2 mt-4">
                            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-muted-dark)' }}>Ideal for</p>
                            <div className="flex flex-wrap gap-1.5">
                              {pkg.idealFor.map(tag => (
                                <span
                                  key={tag}
                                  className="text-[11px] px-2.5 py-1 rounded-full"
                                  style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border-muted)', color: 'var(--color-muted)' }}
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
                            onClick={() => claimPlan(pkg.name)}
                          >
                            Start Your Project
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
                            style={{ color: 'var(--color-muted)', border: '2px solid var(--color-border-muted)' }}
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
          <p className="text-center text-sm mt-8" style={{ color: 'var(--color-muted-dark)' }}>
            30% advance · 70% on handover · Source code always yours
          </p>

          {/* Full-comparison banner: styled as an obvious clickable card,
              not a bare text link */}
          <div className="mt-8 flex justify-center px-2">
            <Link
              href="/pricing"
              className="compare-banner flex w-full max-w-xl items-center gap-4 rounded-2xl px-6 py-5"
              style={{
                background: 'var(--color-surface)',
                border: '2px solid var(--color-border-emphasis)',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'var(--color-bg-accent)', border: '2px solid var(--color-border-emphasis)' }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                  <circle cx="9" cy="7" r="1.6" fill="var(--color-primary)" stroke="none" />
                  <circle cx="14" cy="12" r="1.6" fill="var(--color-primary)" stroke="none" />
                  <circle cx="11" cy="17" r="1.6" fill="var(--color-primary)" stroke="none" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Compare all three plans, feature by feature
                </span>
                <span className="block text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  The complete side-by-side breakdown, nothing hidden until a call.
                </span>
              </span>
              <span
                className="compare-banner-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'var(--color-primary)', border: '2px solid var(--color-border-emphasis)', color: '#fff' }}
                aria-hidden="true"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
          <style>{`
            .compare-banner:hover { background: var(--color-bg-accent) !important; }
            .compare-banner-arrow { transition: transform 0.2s ease; }
            .compare-banner:hover .compare-banner-arrow { transform: translateX(3px); }
          `}</style>
        </AnimatedSection>
      </div>
    </section>
  );
}
