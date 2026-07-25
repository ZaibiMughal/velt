'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { CAL_URL, BOOKING_ENABLED } from '@/lib/site';

/**
 * Escape hatch for visitors the FAQ didn't convince: point them at real
 * proof (client videos, shipped work) or a zero-commitment call.
 */

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

const btnStyle: React.CSSProperties = {
  background: 'var(--color-bg-accent)',
  border: '2px solid var(--color-border-emphasis)',
  color: 'var(--color-text)',
  textDecoration: 'none',
  transition: 'background 0.2s ease',
};

const btnClass = 'ask-proof-btn inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold';

export default function AskAI() {
  return (
    <section aria-label="Still not sure" className="px-4 pb-24 md:px-6">
      <AnimatedSection>
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] px-6 py-12 text-center md:py-14"
          style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-emphasis)' }}
        >
          <h2
            className="mx-auto mb-4 max-w-2xl text-xl font-extrabold uppercase md:text-2xl"
            style={{ color: 'var(--color-text)', letterSpacing: '0.01em', lineHeight: 1.25 }}
          >
            Still not sure Hexspire is the right fit?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed md:text-base" style={{ color: 'var(--color-muted)' }}>
            Fair enough. Hear it straight from the founders we&apos;ve shipped for,
            look at the work itself, or just talk to us. No pitch, no pressure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={() => scrollTo('#testimonials')} className={btnClass} style={btnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <polygon points="10 8.5 16 12 10 15.5" fill="currentColor" stroke="none" />
              </svg>
              Watch client stories
            </button>
            <Link href="/work" className={btnClass} style={btnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="8" height="8" rx="2" />
                <rect x="13" y="3" width="8" height="8" rx="2" />
                <rect x="3" y="13" width="8" height="8" rx="2" />
                <rect x="13" y="13" width="8" height="8" rx="2" />
              </svg>
              See 30+ shipped products
            </Link>
            {BOOKING_ENABLED ? (
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className={btnClass} style={btnStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2.5" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" />
                </svg>
                Book a free 15-minute call
              </a>
            ) : (
              <button type="button" onClick={() => scrollTo('#contact')} className={btnClass} style={btnStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Ask us anything
              </button>
            )}
          </div>

          {/* Sticker magnifier peeking from the bottom-right corner */}
          <div className="pointer-events-none absolute -bottom-4 right-8 hidden md:block" aria-hidden="true">
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-12deg)' }}>
              <g stroke="var(--color-bg)" strokeWidth="10" fill="var(--color-bg)">
                <circle cx="42" cy="38" r="20" />
                <rect x="52" y="52" width="30" height="10" rx="5" transform="rotate(45 52 52)" />
              </g>
              <circle cx="42" cy="38" r="20" fill="var(--color-bg-accent)" stroke="var(--color-border-emphasis)" strokeWidth="3" />
              <circle cx="42" cy="38" r="12" fill="var(--color-surface)" stroke="var(--color-border-emphasis)" strokeWidth="2.5" />
              <rect x="52" y="52" width="30" height="10" rx="5" transform="rotate(45 52 52)" fill="var(--color-primary)" stroke="var(--color-border-emphasis)" strokeWidth="2.5" />
              <path d="M74 22 l3.2 7.6 7.6 3.2 -7.6 3.2 -3.2 7.6 -3.2 -7.6 -7.6 -3.2 7.6 -3.2 Z" fill="var(--color-secondary)" stroke="var(--color-border-emphasis)" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>

          <style>{`
            .ask-proof-btn:hover { background: var(--color-primary) !important; color: #fff !important; }
          `}</style>
        </div>
      </AnimatedSection>
    </section>
  );
}
