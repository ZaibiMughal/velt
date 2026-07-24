import type { Metadata } from 'next';
import Link from 'next/link';
import type { CaseStudy } from '@/data/work/index';
import { getAllCaseStudies, getSignedImageUrl } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AnimatedPhone, AnimatedBrowser } from '@/components/ui/IllustratedDevices';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Portfolio | 30+ Projects, Hexspire' },
  description: "Explore Hexspire's work: Flutter mobile apps, React Native, and Next.js SaaS platforms shipped for startups and enterprises across 3 continents.",
  keywords: [
    'software development portfolio', 'Flutter app developer', 'React Native developer',
    'Next.js developer', 'mobile app case studies', 'SaaS development portfolio',
    'software studio work', 'full stack developer portfolio',
  ],
  alternates: { canonical: 'https://hexspire.io/work' },
  openGraph: {
    title: 'Portfolio | 30+ Projects Shipped, Hexspire',
    description: 'Flutter mobile apps, Next.js platforms, SaaS ecosystems - shipped for founders and enterprise clients worldwide.',
    url: 'https://hexspire.io/work',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hexspire, Software Development' }],
  },
};

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function rgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type Filter = 'all' | 'mobile' | 'web';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Web & SaaS', value: 'web' },
];

const STATS = [
  { value: '30+', label: 'Projects Shipped' },
  { value: '8+', label: 'Years Experience' },
  { value: '10+', label: 'Countries' },
  { value: '1M+', label: 'Monthly Users' },
];

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: rawFilter } = await searchParams;
  const filter: Filter =
    rawFilter === 'mobile' ? 'mobile'
    : rawFilter === 'web' ? 'web'
    : 'all';

  const allStudies = await getAllCaseStudies();

  const studies =
    filter === 'mobile' ? allStudies.filter((s) => s.category === 'Mobile App')
    : filter === 'web'  ? allStudies.filter((s) => s.category !== 'Mobile App')
    : allStudies;

  const coverUrls = await Promise.all(
    studies.map((s: CaseStudy) => getSignedImageUrl(s.cover_image))
  );

  return (
    <>
      <Navbar />

      {/* Per-card hover via CSS custom properties */}
      <style>{`
        .work-card {
          transition: border-color 0.2s ease;
        }
        .work-card:hover {
          border-color: var(--t) !important;
        }
        .work-card-img {
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .work-card:hover .work-card-img {
          transform: scale(1.025);
        }
        .work-card-arrow {
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .work-card:hover .work-card-arrow {
          color: var(--t);
          transform: translateX(3px);
        }
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .work-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .work-stats { display: grid !important; grid-template-columns: 1fr 1fr; }
          .work-stats > div { border-left: none !important; }
        }
      `}</style>

      <main style={{ background: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 128, paddingBottom: 56 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', textAlign: 'center' }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 24,
            }}>
              Selected Work
            </p>
            <h1 className="font-serif" style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 0.98, color: 'var(--color-text)',
              margin: '0 0 22px',
            }}>
              30+ products shipped
            </h1>
            <p style={{
              fontSize: 18, color: 'var(--color-muted)',
              maxWidth: 520, margin: '0 auto 16px', lineHeight: 1.65,
            }}>
              Built for founders, scaleups, and multinational enterprises across three continents.
              Mobile apps, web platforms, SaaS ecosystems - fully owned by you on day one.
            </p>
            <p style={{
              fontSize: 13, color: 'var(--color-muted-dark)',
              margin: '0 auto 52px', letterSpacing: '0.02em',
            }}>
              Showing most recent featured work
            </p>

            {/* Stats strip */}
            <div className="work-stats" style={{
              display: 'inline-flex', gap: 0,
              background: 'var(--color-surface)',
              border: '2px solid var(--color-border-muted)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {STATS.map(({ value, label }, i) => (
                <div key={label} style={{
                  padding: '16px 32px', textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid var(--color-border-muted)' : 'none',
                }}>
                  <p className="font-serif" style={{ fontSize: 24, fontWeight: 500, color: 'var(--color-text)', margin: 0, letterSpacing: '-0.01em' }}>
                    {value}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--color-muted-dark)', margin: '4px 0 0', whiteSpace: 'nowrap' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FILTERS ──────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px) 48px',
          display: 'flex', justifyContent: 'center', gap: 8,
        }}>
          {FILTERS.map((f) => {
            const active = f.value === filter;
            return (
              <Link
                key={f.value}
                href={f.value === 'all' ? '/work' : `/work?filter=${f.value}`}
                style={{
                  padding: '8px 22px', borderRadius: 999,
                  fontSize: 13, fontWeight: 500, textDecoration: 'none',
                  background: active ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: active ? '#fff' : 'var(--color-muted)',
                  border: active ? '2px solid var(--color-text)' : '2px solid var(--color-border-muted)',
                }}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px) 120px' }}>
          {studies.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-muted-dark)', padding: '80px 0' }}>
              No projects found.
            </p>
          ) : (
            <div className="work-grid">
              {studies.map((study: CaseStudy, i: number) => {
                const coverUrl = coverUrls[i];
                const t = study.theme_color;

                const isMobile = study.category === 'Mobile App';

                return (
                  <article
                    key={study.slug}
                    className="work-card"
                    style={{
                      '--t': t,
                      position: 'relative', borderRadius: 20, overflow: 'hidden',
                      background: 'var(--color-surface)',
                      border: '2px solid var(--color-border-muted)',
                      display: 'flex', flexDirection: 'column',
                    } as React.CSSProperties}
                  >
                    {/* Full-card link overlay */}
                    <Link
                      href={`/work/${study.slug}`}
                      style={{ position: 'absolute', inset: 0, zIndex: 5 }}
                      aria-label={`View case study: ${study.title}`}
                    />

                    {/* ── Illustration area: real screenshot inside a drawn
                        device frame, on a panel tinted with the project's
                        theme color (matches the homepage portfolio cards) ── */}
                    <div
                      style={{
                        position: 'relative',
                        height: 260,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: rgba(t, 0.08),
                        borderBottom: '2px solid var(--color-border-muted)',
                      }}
                    >
                      {isMobile ? (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-7%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: '102%',
                            aspectRatio: '240 / 440',
                          }}
                        >
                          <div className="work-card-img" style={{ width: '100%', height: '100%' }}>
                            <AnimatedPhone t={t} screenshot={coverUrl} />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center p-5">
                          <div className="work-card-img" style={{ width: '90%', aspectRatio: '480 / 300', maxHeight: '100%' }}>
                            <AnimatedBrowser t={t} screenshot={coverUrl} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Content ── */}
                    <div style={{
                      padding: '18px 22px 22px',
                      flex: 1, display: 'flex', flexDirection: 'column', gap: 10,
                    }}>
                      {/* Category pill */}
                      <span style={{
                        display: 'inline-block', alignSelf: 'flex-start',
                        padding: '3px 10px', borderRadius: 999,
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                        background: rgba(t, 0.1), border: `2px solid ${t}`, color: t,
                      }}>
                        {study.category}
                      </span>

                      {/* Title */}
                      <h2 style={{
                        fontSize: 18, fontWeight: 700, color: 'var(--color-text)',
                        margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
                      }}>
                        {study.title}
                      </h2>

                      {/* Tagline */}
                      <p style={{
                        fontSize: 13, color: 'var(--color-muted)',
                        margin: 0, lineHeight: 1.65, flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      } as React.CSSProperties}>
                        {study.tagline}
                      </p>

                      {/* Divider */}
                      <div style={{ height: 1, background: 'var(--color-border-muted)', margin: '2px 0' }} />

                      {/* Bottom: outcome metric + arrow */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 8,
                      }}>
                        <span style={{
                          fontSize: 13, fontWeight: 600,
                          color: t, lineHeight: 1.3,
                        }}>
                          {study.outcome.metric}
                        </span>
                        <span className="work-card-arrow" style={{ color: 'var(--color-muted-dark)', flexShrink: 0, display: 'flex' }}>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ── CTA BAND ─────────────────────────────────────────────── */}
        <div style={{ borderTop: '2px solid var(--color-border-muted)' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '88px clamp(20px, 5vw, 48px)',
            textAlign: 'center',
          }}>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text)',
              margin: '0 0 16px',
            }}>
              Your product could be next.
            </h2>
            <p style={{
              fontSize: 16, color: 'var(--color-muted)', maxWidth: 480,
              margin: '0 auto 36px', lineHeight: 1.65,
            }}>
              Fixed price, full source code, shipped in weeks. Tell us what you need and get a scoped plan within 24 hours.
            </p>
            <Link
              href={BOOKING_ENABLED ? CAL_URL : '/#contact'}
              {...(BOOKING_ENABLED ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="border-2"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
                background: 'var(--color-primary)',
                borderColor: 'var(--color-text)',
                color: '#fff', fontSize: 15, fontWeight: 600,
              }}
            >
              {PRIMARY_CTA_LABEL}
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
