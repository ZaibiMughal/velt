import type { Metadata } from 'next';
import Link from 'next/link';
import type { CaseStudy } from '@/data/work/index';
import { getAllCaseStudies, getSignedImageUrl } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Portfolio | 30+ Projects — Velt Studio' },
  description: 'Explore selected work from Velt — Flutter mobile apps, React Native, Next.js web platforms, and full SaaS ecosystems shipped for startups and multinational enterprises across 3 continents.',
  keywords: [
    'software development portfolio', 'Flutter app developer', 'React Native developer',
    'Next.js developer', 'mobile app case studies', 'SaaS development portfolio',
    'software studio work', 'full stack developer portfolio',
  ],
  openGraph: {
    title: 'Portfolio | 30+ Projects Shipped — Velt Studio',
    description: 'Flutter mobile apps, Next.js platforms, SaaS ecosystems - shipped for founders and enterprise clients worldwide.',
    url: 'https://veltstudio.com/work',
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

      {/* Per-card hover via CSS custom properties + color-mix() */}
      <style>{`
        .work-card {
          transition: border-color 0.3s ease, box-shadow 0.35s ease;
          cursor: none;
        }
        .work-card:hover {
          border-color: color-mix(in srgb, var(--t) 38%, transparent) !important;
          box-shadow: 0 24px 60px color-mix(in srgb, var(--t) 10%, transparent);
        }
        .work-card-img img {
          transition: transform 0.55s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .work-card:hover .work-card-img img {
          transform: scale(1.06);
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

      <main style={{ background: '#09090b', color: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 128, paddingBottom: 56 }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', textAlign: 'center' }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#6366f1', marginBottom: 24,
            }}>
              Selected Work
            </p>
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff',
              margin: '0 0 22px',
            }}>
              30+ products shipped
            </h1>
            <p style={{
              fontSize: 18, color: 'rgba(255,255,255,0.42)',
              maxWidth: 520, margin: '0 auto 16px', lineHeight: 1.65,
            }}>
              Built for founders, scaleups, and multinational enterprises across three continents.
              Mobile apps, web platforms, SaaS ecosystems - fully owned by you on day one.
            </p>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.22)',
              margin: '0 auto 52px', letterSpacing: '0.02em',
            }}>
              Showing most recent featured work
            </p>

            {/* Stats strip */}
            <div className="work-stats" style={{
              display: 'inline-flex', gap: 0,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {STATS.map(({ value, label }, i) => (
                <div key={label} style={{
                  padding: '16px 32px', textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                    {value}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', margin: '4px 0 0', whiteSpace: 'nowrap' }}>
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
                  background: active ? '#6366f1' : 'rgba(255,255,255,0.04)',
                  color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                  border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
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
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '80px 0' }}>
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
                      background: '#0d0d10',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', flexDirection: 'column',
                    } as React.CSSProperties}
                  >
                    {/* Full-card link overlay */}
                    <Link
                      href={`/work/${study.slug}`}
                      style={{ position: 'absolute', inset: 0, zIndex: 5 }}
                      aria-label={`View case study: ${study.title}`}
                    />

                    {/* ── Image area ── */}
                    <div
                      className="work-card-img"
                      style={{
                        position: 'relative',
                        height: isMobile ? 272 : 210,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: isMobile
                          ? `radial-gradient(ellipse 160% 120% at 50% 100%, ${rgba(t, 0.28)} 0%, #111114 55%, #0d0d10 75%)`
                          : '#111114',
                      }}
                    >
                      {coverUrl ? (
                        isMobile ? (
                          /* Mobile: centered portrait screenshot floating on gradient */
                          <img
                            src={coverUrl}
                            alt={study.title}
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              height: '92%',
                              width: 'auto',
                              maxWidth: '58%',
                              objectFit: 'contain',
                              objectPosition: 'bottom center',
                              borderRadius: '14px 14px 0 0',
                              boxShadow: `0 -4px 40px ${rgba(t, 0.18)}, 0 0 0 1px ${rgba(t, 0.15)}`,
                              display: 'block',
                            }}
                          />
                        ) : (
                          /* Web/SaaS: darkened screenshot with theme color tint */
                          <>
                            <img
                              src={coverUrl}
                              alt={study.title}
                              style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover', objectPosition: 'top center',
                                display: 'block',
                                filter: 'brightness(0.55) saturate(0.85)',
                              }}
                            />
                            {/* Theme color wash — ties screenshot into card accent */}
                            <div style={{
                              position: 'absolute', inset: 0,
                              background: rgba(t, 0.18),
                              mixBlendMode: 'normal',
                              pointerEvents: 'none',
                            }} />
                            {/* Top fade */}
                            <div style={{
                              position: 'absolute', top: 0, left: 0, right: 0, height: 56,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                              pointerEvents: 'none',
                            }} />
                          </>
                        )
                      ) : (
                        /* No-image: branded gradient placeholder */
                        <div style={{
                          width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
                          background: `radial-gradient(ellipse at 25% 45%, ${rgba(t, 0.28)} 0%, transparent 60%), #0d0d10`,
                        }}>
                          <div style={{
                            position: 'absolute', top: 32, left: 32,
                            width: 72, height: 72, borderRadius: 18,
                            background: rgba(t, 0.1), border: `1px solid ${rgba(t, 0.22)}`,
                          }} />
                          <div style={{
                            position: 'absolute', top: 52, left: 52,
                            width: 72, height: 72, borderRadius: 18,
                            background: rgba(t, 0.06), border: `1px solid ${rgba(t, 0.14)}`,
                          }} />
                          <div style={{
                            position: 'absolute', bottom: 20, right: 20,
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: rgba(t, 0.3),
                          }}>
                            {study.category}
                          </div>
                        </div>
                      )}

                      {/* Bottom gradient fade into card body */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: isMobile ? 32 : 80,
                        background: 'linear-gradient(to bottom, transparent, #0d0d10)',
                        pointerEvents: 'none',
                      }} />
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
                        background: rgba(t, 0.1), border: `1px solid ${rgba(t, 0.28)}`, color: t,
                      }}>
                        {study.category}
                      </span>

                      {/* Title */}
                      <h2 style={{
                        fontSize: 18, fontWeight: 700, color: '#fff',
                        margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
                      }}>
                        {study.title}
                      </h2>

                      {/* Tagline */}
                      <p style={{
                        fontSize: 13, color: 'rgba(255,255,255,0.42)',
                        margin: 0, lineHeight: 1.65, flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      } as React.CSSProperties}>
                        {study.tagline}
                      </p>

                      {/* Divider */}
                      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '2px 0' }} />

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
                        <span className="work-card-arrow" style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, display: 'flex' }}>
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
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '88px clamp(20px, 5vw, 48px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 70%)',
            }} />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff',
              margin: '0 0 16px', position: 'relative',
            }}>
              Your product could be next.
            </h2>
            <p style={{
              fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480,
              margin: '0 auto 36px', lineHeight: 1.65, position: 'relative',
            }}>
              Fixed price, full source code, shipped in weeks. Tell us what you need and get a scoped plan within 24 hours.
            </p>
            <Link href="/#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              color: '#fff', fontSize: 15, fontWeight: 600,
              boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
              position: 'relative',
            }}>
              Book a Strategy Call
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
