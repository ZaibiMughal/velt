'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

/**
 * Escape hatch for visitors the FAQ didn't convince: deep-link into the
 * major AI chat products with a prefilled prompt about Hexspire, so a
 * third party makes the case. Modeled on the reference site's
 * "Ask ChatGPT / Ask Claude / Ask Perplexity" trust band.
 */

const PROMPT = encodeURIComponent(
  'I am a founder evaluating Hexspire (hexspire.io), a fixed-price software studio for mobile apps, web apps, SaaS platforms, and AI automations. Look at their site and tell me: what do they offer, how does their fixed-price model work, and would they be a good choice to build my product?'
);

const PROVIDERS = [
  {
    name: 'Ask ChatGPT',
    href: `https://chatgpt.com/?q=${PROMPT}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5 v5 M12 15.5 v5 M3.5 12 h5 M15.5 12 h5" transform="rotate(30 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Ask Claude',
    href: `https://claude.ai/new?q=${PROMPT}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M12 3 v18 M3 12 h18 M5.6 5.6 l12.8 12.8 M18.4 5.6 L5.6 18.4" />
      </svg>
    ),
  },
  {
    name: 'Ask Perplexity',
    href: `https://www.perplexity.ai/search?q=${PROMPT}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" />
        <path d="M7 7 L3.5 3.5 M17 7 l3.5 -3.5 M7 17 l-3.5 3.5 M17 17 l3.5 3.5" />
      </svg>
    ),
  },
] as const;

export default function AskAI() {
  return (
    <section aria-label="Ask an AI about Hexspire" className="px-4 pb-24 md:px-6">
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
            Don&apos;t take our word for it. Click a button and let your favorite AI
            look us up and give you its honest take.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROVIDERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ask-ai-btn inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold"
                style={{
                  background: 'var(--color-bg-accent)',
                  border: '2px solid var(--color-border-emphasis)',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
              >
                {p.icon}
                {p.name}
              </a>
            ))}
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
            .ask-ai-btn:hover { background: var(--color-primary) !important; color: #fff !important; }
          `}</style>
        </div>
      </AnimatedSection>
    </section>
  );
}
