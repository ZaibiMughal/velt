import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { CaseStudy } from '@/data/work/index';
import { getAllCaseStudies, getCaseStudy, getCaseStudySlugs, getSignedImageUrls, getTestimonialForSlug } from '@/lib/data';
import type { Testimonial } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';
import DeepDive from '@/components/sections/DeepDive';
import { DEEP_DIVES } from '@/data/work/deep-dives';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: 'Not Found | Hexspire' };

  const techPreview = study.tech.slice(0, 4).join(', ');
  const full = `${study.tagline} Built with ${techPreview}. ${study.outcome.metric}.`;
  // Google truncates meta descriptions past ~155-160 chars, so keep every
  // case study's dynamic description (built from a variable-length tagline)
  // inside that limit regardless of how long the tagline is.
  const description = full.length <= 155
    ? full
    : `${full.slice(0, 152).replace(/\s+\S*$/, '')}...`;

  return {
    title: { absolute: `${study.title}: ${study.category} Case Study | Hexspire` },
    description,
    keywords: [
      study.title, study.category, ...study.tech,
      'case study', 'software development', 'Hexspire',
    ],
    alternates: { canonical: `https://hexspire.io/work/${slug}` },
    openGraph: {
      title: `${study.title}: ${study.category} Case Study`,
      description,
      url: `https://hexspire.io/work/${slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hexspire, Software Development' }],
    },
  };
}

/* ── icons ─────────────────────────────────────────────────────── */

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── helpers ───────────────────────────────────────────────────── */

function rgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─────────────────────────────────────────────────────────────────
   SHOWCASE LAYOUTS
   Each one is a different visual style to match the project vibe.
   Flat 2D treatment: hard outlines instead of shadows, no glow.
   ───────────────────────────────────────────────────────────────── */

/**
 * CASCADE — fanned screens (RideSpotr)
 * Raw screenshots fanning out from center, no hardware chrome.
 */
function ShowcaseCascade({ urls, t, title }: { urls: string[]; t: string; title: string }) {
  const [cover, left, right] = urls;

  return (
    <div className="cs-cascade" style={{ position: 'relative', height: 500 }}>
      <div className="cs-cascade-inner" style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        {/* left screen — behind, tilted */}
        {left && (
          <div style={{
            position: 'absolute', bottom: 0,
            transform: 'translateX(-170px) rotate(-7deg) scale(0.82)',
            transformOrigin: 'bottom center',
            zIndex: 1, width: 200,
          }}>
            <Image src={left} alt={`${title} screen`} width={0} height={0} sizes="200px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 28, border: `2px solid ${rgba(t, 0.4)}` }} />
          </div>
        )}

        {/* right screen — behind, tilted */}
        {right && (
          <div style={{
            position: 'absolute', bottom: 0,
            transform: 'translateX(170px) rotate(7deg) scale(0.82)',
            transformOrigin: 'bottom center',
            zIndex: 1, width: 200,
          }}>
            <Image src={right} alt={`${title} screen`} width={0} height={0} sizes="200px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 28, border: `2px solid ${rgba(t, 0.4)}` }} />
          </div>
        )}

        {/* center — cover, front and prominent */}
        <div style={{
          position: 'absolute', bottom: 0,
          transform: 'translateX(-50%) translateX(0)',
          left: '50%', zIndex: 3, width: 230,
        }}>
          <Image src={cover} alt={title} width={0} height={0} priority sizes="230px"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 32, border: `2px solid ${t}` }} />
        </div>
      </div>
    </div>
  );
}

/**
 * ROW — clean horizontal row (Wagerr)
 * Center screen sits slightly higher. No rotation.
 */
function ShowcaseRow({ urls, t, title }: { urls: string[]; t: string; title: string }) {
  return (
    <div className="cs-row" style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
      {urls.map((url, i) => {
        const isCenter = i === Math.floor(urls.length / 2);
        return (
          <div key={i} style={{
            flex: '0 0 auto',
            width: urls.length >= 4 ? 160 : 190,
            transform: isCenter ? 'translateY(-16px)' : 'none',
            zIndex: isCenter ? 2 : 1,
            position: 'relative',
          }}>
            <Image src={url} alt={`${title} screen ${i + 1}`} width={0} height={0}
              priority={isCenter}
              sizes={urls.length >= 4 ? '160px' : '190px'}
              style={{
                width: '100%', height: 'auto', display: 'block', borderRadius: 24,
                border: `2px solid ${isCenter ? t : rgba(t, 0.4)}`,
              }} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * ECOSYSTEM — mixed mobile + web (NutritionUP)
 * Left: pair of mobile screenshots staggered.
 * Right: web portal screenshots in minimal browser frames.
 */
function ShowcaseEcosystem({
  mobileUrls, webUrls, t, title, liveUrl,
}: {
  mobileUrls: string[]; webUrls: string[]; t: string; title: string; liveUrl?: string | null;
}) {
  return (
    <div className="cs-eco">

      {/* ── mobile pair ── */}
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t, marginBottom: 20 }}>
          Mobile App
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {mobileUrls[0] && (
            <div style={{ flex: 1 }}>
              <Image src={mobileUrls[0]} alt={`${title} mobile`} width={0} height={0} priority sizes="45vw"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 22, border: `2px solid ${t}` }} />
            </div>
          )}
          {mobileUrls[1] && (
            <div style={{ flex: 1, marginTop: 32 }}>
              <Image src={mobileUrls[1]} alt={`${title} mobile`} width={0} height={0} sizes="45vw"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 22, border: `2px solid ${rgba(t, 0.4)}` }} />
            </div>
          )}
        </div>
      </div>

      {/* ── web portals ── */}
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t, marginBottom: 20 }}>
          Web Portals
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {webUrls.map((url, i) => (
            <div key={i} style={{
              borderRadius: 10, overflow: 'hidden',
              border: `2px solid var(--color-border-muted)`,
              background: 'var(--color-surface)',
            }}>
              {/* minimal browser chrome */}
              <div style={{
                padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8,
                borderBottom: '2px solid var(--color-border-muted)',
                background: 'var(--color-surface)',
              }}>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, maxWidth: 220, margin: '0 auto',
                  padding: '2px 10px', borderRadius: 4,
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border-muted)',
                  fontSize: 9, color: 'var(--color-muted-dark)', textAlign: 'center',
                }}>
                  {liveUrl?.replace('https://', '') ?? 'portal'}
                </div>
              </div>
              <Image src={url} alt={`${title} web portal`} width={0} height={0} sizes="65vw"
                style={{ width: '100%', height: 'auto', display: 'block', objectPosition: 'top' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * BROWSER — web app style (KeyOS, TruckTuck, SalesPulse)
 * Single large browser frame for cover + optional grid of extras.
 */
function ShowcaseBrowser({
  coverUrl, extraUrls, t, title, liveUrl,
}: {
  coverUrl: string; extraUrls: string[]; t: string; title: string; liveUrl?: string | null;
}) {
  const BrowserWrap = ({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) => (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: `2px solid var(--color-border-muted)`,
      background: 'var(--color-surface)',
    }}>
      <div style={{
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '2px solid var(--color-border-muted)',
        background: 'var(--color-surface)',
      }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, maxWidth: 260, margin: '0 auto',
          padding: '3px 10px', borderRadius: 5,
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border-muted)',
          fontSize: 10, color: 'var(--color-muted-dark)', textAlign: 'center',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
        }}>
          {liveUrl?.replace('https://', '') ?? 'app'}
        </div>
      </div>
      <Image src={src} alt={alt} width={0} height={0} priority={priority} sizes="(max-width: 768px) 100vw, 1000px" style={{ width: '100%', height: 'auto', display: 'block', objectPosition: 'top' }} />
    </div>
  );

  return (
    <div>
      <BrowserWrap src={coverUrl} alt={title} priority />
      {extraUrls.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(extraUrls.length, 2)}, 1fr)`,
          gap: 16, marginTop: 16,
        }}>
          {extraUrls.map((url, i) => (
            <BrowserWrap key={i} src={url} alt={`${title} ${i + 2}`} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Case Study Testimonial ────────────────────────────────────── */

function AvatarBlock({ name, url }: { name: string; url: string | null }) {
  const palette = [
    ['#6366f1', '#818cf8'], ['#8b5cf6', '#a78bfa'], ['#ec4899', '#f472b6'],
    ['#14b8a6', '#2dd4bf'], ['#f59e0b', '#fbbf24'], ['#3b82f6', '#60a5fa'],
  ];
  const [c1] = palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (url) {
    return <Image src={url} alt={name} width={52} height={52} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--color-border-muted)' }} />;
  }
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
      background: c1, border: '2px solid var(--color-border-emphasis)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, fontWeight: 700, color: '#fff',
    }}>
      {initials}
    </div>
  );
}

function CaseStudyTestimonial({ testimonial: tm, t }: { testimonial: Testimonial; t: string }) {
  return (
    <div style={{ borderTop: `2px solid var(--color-border-muted)` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px clamp(20px, 5vw, 48px)' }}>

        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: t, marginBottom: 48,
        }}>
          Client Voice
        </p>

        <div className="cs-testimonial-grid">
          {/* Quote */}
          <div>
            {/* Large decorative quote mark */}
            <div className="font-serif" style={{
              fontSize: 96, lineHeight: 0.7, color: t,
              marginBottom: 24, userSelect: 'none',
            }}>
              &ldquo;
            </div>

            <blockquote style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 500,
              color: 'var(--color-text)', lineHeight: 1.7,
              margin: '0 0 36px', borderLeft: `3px solid ${t}`, paddingLeft: 28,
              fontStyle: 'italic',
            }}>
              {tm.quote}
            </blockquote>

            {/* Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 28 }}>
              <AvatarBlock name={tm.client_name} url={tm.avatar_url} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                  {tm.client_name}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-muted)', margin: '3px 0 0' }}>
                  {[tm.client_role, tm.client_company].filter(Boolean).join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Accent mark */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%', flexShrink: 0,
            background: rgba(t, 0.08),
            border: `2px solid ${t}`,
            alignSelf: 'center',
          }} />
        </div>

        {/* Inline video */}
        {tm.video_url && (
          <div style={{ marginTop: 48, maxWidth: 680 }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              border: `2px solid var(--color-border-muted)`,
              background: 'var(--color-surface)',
            }}>
              {/* Minimal chrome */}
              <div style={{
                padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border-muted)',
              }}>
                {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--color-muted-dark)' }}>
                  {tm.client_name}&apos;s testimonial
                </span>
              </div>
              <video
                src={tm.video_url}
                controls
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Fallback testimonials (used until migration 008 is run) ────── */

const MOCK_TESTIMONIALS: Record<string, { client_name: string; client_role: string; client_company: string; quote: string }> = {
  ridespotr: {
    client_name: 'Alex Thompson', client_role: 'Co-Founder', client_company: 'RideSpotr',
    quote: 'Hexspire turned our car-spotting concept into a platform with millions of spots in a fraction of the time we expected. The AI plate recognition alone would have taken us months elsewhere, they shipped it in weeks and it just works.',
  },
  wagerr: {
    client_name: 'Marcus Reid', client_role: 'Founder', client_company: 'Wagerr',
    quote: 'We had a complex on-chain settlement system that needed to be bulletproof. Hexspire nailed the architecture: the Ethereum smart contract, the embedded wallets, the scoring logic, and somehow made it feel effortless to the end user.',
  },
  nutritionup: {
    client_name: 'Sarah Chen', client_role: 'CEO', client_company: 'NutritionUP',
    quote: 'Four platforms, one team, delivered on schedule. The AI meal coaching, the corporate HR portal, the admin panel, all of it polished and production-ready. Hexspire thinks like a product team, not just engineers.',
  },
  pipa: {
    client_name: 'Ryan Nakamura', client_role: 'Operations Director', client_company: 'PIPA',
    quote: "Our farm managers went from paper timesheets to real-time GPS tracking overnight. The Xero payroll sync alone saves us hours every week. I couldn't ask for a better development partner.",
  },
  keyos: {
    client_name: 'David Park', client_role: 'CTO', client_company: 'KeyOS',
    quote: 'The multi-tenant data isolation Hexspire built is rock solid. Fifty-six migrations, zero data leaks, enterprise clients fully confident. They understand that infrastructure has to be invisible, and they delivered exactly that.',
  },
  trucktuck: {
    client_name: 'James Wilson', client_role: 'Co-Founder', client_company: 'TruckTuck',
    quote: 'Over a million visitors a month and not a single missed booking. The Redis and BullMQ architecture they designed handles our peak loads without breaking a sweat. We scaled without rewriting anything.',
  },
  salespulse: {
    client_name: 'Emma Torres', client_role: 'Head of Sales', client_company: 'Scholarly',
    quote: 'The AI automation workflows Hexspire built replaced hours of manual work every week. Our team now spends that time on growth instead of copy-pasting between tools. The ROI was visible within the first month.',
  },
};

function mockTestimonial(slug: string): import('@/lib/data').Testimonial | null {
  const m = MOCK_TESTIMONIALS[slug];
  if (!m) return null;
  return {
    id: `mock-${slug}`,
    case_study_slug: slug,
    client_name: m.client_name,
    client_role: m.client_role,
    client_company: m.client_company,
    quote: m.quote,
    avatar_url: null,
    video_url: null,
    video_thumbnail_url: null,
    display_order: 0,
  };
}

/* ── page ──────────────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [study, allStudies, dbTestimonial] = await Promise.all([
    getCaseStudy(slug),
    getAllCaseStudies(),
    getTestimonialForSlug(slug),
  ]);
  const testimonial = dbTestimonial ?? mockTestimonial(slug);

  if (!study) notFound();

  const slugOrder = allStudies.map((s: CaseStudy) => s.slug);
  const currentIndex = slugOrder.indexOf(slug);
  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : null;

  const t = study.theme_color;
  const hasLiveUrls = study.live_url || study.app_store_url || study.play_store_url;

  const allImageUrls = await getSignedImageUrls(study.cover_image, study.images ?? []);
  const coverUrl = allImageUrls[0] ?? null;
  const extraUrls = allImageUrls.slice(1);

  /* determine which showcase style to use */
  const isMobile = study.category === 'Mobile App';
  // NutritionUP is a mobile app but also has web portal screenshots
  const isEcosystem = slug === 'nutritionup' && extraUrls.length >= 3;
  // RideSpotr has a dark app — cascade / fan works well
  const isCascade = slug === 'ridespotr';
  // IbisPrep: phone row for the app plus admin panel screenshots below.
  // Its last two images are the admin portal captures.
  const isIbisEco = slug === 'ibisprep' && extraUrls.length >= 7;
  const ibisMobileUrls = isIbisEco ? [coverUrl as string, ...extraUrls.slice(0, 5)] : [];
  const ibisAdminUrls = isIbisEco ? extraUrls.slice(5) : [];

  return (
    <>
      <Navbar />

      <style>{`
        .cs-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px 80px;
        }
        .cs-outcomes {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 60px;
        }
        .cs-testimonial-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: start;
          max-width: 860px;
        }
        .cs-eco {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .cs-two-col { grid-template-columns: 1fr; gap: 48px; }
          .cs-outcomes { grid-template-columns: repeat(2, 1fr); }
          .cs-eco { grid-template-columns: 1fr; }
          .cs-testimonial-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 760px) {
          .cs-row {
            justify-content: flex-start !important;
            overflow-x: auto;
            padding-bottom: 24px;
            -webkit-overflow-scrolling: touch;
          }
        }
        @media (max-width: 640px) {
          .cs-cascade { height: 330px !important; }
          .cs-cascade-inner { transform: scale(0.6); transform-origin: bottom center; }
        }
      `}</style>

      <main style={{ background: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative' }}>
            <Link href="/work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, color: 'var(--color-muted)', textDecoration: 'none', marginBottom: 40,
            }}>
              <ArrowLeftIcon /> All Work
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: 999,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: rgba(t, 0.1), border: `2px solid ${t}`, color: t,
              }}>
                {study.category}
              </span>

              {hasLiveUrls && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {study.live_url && (
                    <a href={study.live_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '2px solid var(--color-border-muted)', color: 'var(--color-muted)',
                      textDecoration: 'none', background: 'var(--color-surface)',
                    }}>
                      Live Site <ExternalLinkIcon />
                    </a>
                  )}
                  {study.app_store_url && (
                    <a href={study.app_store_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '2px solid var(--color-border-muted)', color: 'var(--color-muted)',
                      textDecoration: 'none', background: 'var(--color-surface)',
                    }}>
                      App Store <ExternalLinkIcon />
                    </a>
                  )}
                  {study.play_store_url && (
                    <a href={study.play_store_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '2px solid var(--color-border-muted)', color: 'var(--color-muted)',
                      textDecoration: 'none', background: 'var(--color-surface)',
                    }}>
                      Play Store <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              )}
            </div>

            <h1 className="font-serif" style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 0.98, color: 'var(--color-text)', margin: '0 0 28px',
            }}>
              {study.title}
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--color-muted)',
              maxWidth: 580, lineHeight: 1.65, margin: '0 0 40px',
            }}>
              {study.tagline}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {study.tech.map((tech) => (
                <span key={tech} style={{
                  padding: '5px 14px', borderRadius: 999, fontSize: 12,
                  border: `2px solid var(--color-border-muted)`, color: 'var(--color-muted)',
                  background: 'var(--color-surface)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SCREENSHOTS ──────────────────────────────────────────── */}
        {coverUrl && (
          <div style={{ borderTop: `2px solid var(--color-border-muted)`, overflow: 'hidden' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px clamp(20px, 5vw, 48px)' }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: t, marginBottom: 48,
              }}>
                {isEcosystem || isIbisEco ? 'The Ecosystem' : isMobile ? 'In the App' : 'The Platform'}
              </p>

              {isIbisEco ? (
                <>
                  <ShowcaseRow
                    urls={ibisMobileUrls}
                    t={t}
                    title={study.title}
                  />
                  <p style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: rgba(t, 0.7), margin: '56px 0 20px',
                  }}>
                    Operations Panel
                  </p>
                  <ShowcaseBrowser
                    coverUrl={ibisAdminUrls[0]}
                    extraUrls={ibisAdminUrls.slice(1)}
                    t={t}
                    title={`${study.title} admin panel`}
                    liveUrl={study.live_url}
                  />
                </>
              ) : isEcosystem ? (
                <ShowcaseEcosystem
                  mobileUrls={[coverUrl, extraUrls[0]].filter(Boolean) as string[]}
                  webUrls={extraUrls.slice(2)}
                  t={t}
                  title={study.title}
                  liveUrl={study.live_url}
                />
              ) : isCascade ? (
                <ShowcaseCascade
                  urls={[coverUrl, ...extraUrls]}
                  t={t}
                  title={study.title}
                />
              ) : isMobile ? (
                <ShowcaseRow
                  urls={[coverUrl, ...extraUrls]}
                  t={t}
                  title={study.title}
                />
              ) : (
                <ShowcaseBrowser
                  coverUrl={coverUrl}
                  extraUrls={extraUrls}
                  t={t}
                  title={study.title}
                  liveUrl={study.live_url}
                />
              )}
            </div>
          </div>
        )}

        {/* ── BRIEF + WHAT WE SHIPPED ──────────────────────────────── */}
        <div style={{ borderTop: `2px solid var(--color-border-muted)` }}>
          <div className="cs-two-col" style={{
            maxWidth: 1100, margin: '0 auto', padding: '80px clamp(20px, 5vw, 48px)',
          }}>
            <div>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: t, marginBottom: 24,
              }}>
                The Brief
              </p>
              <div style={{ borderLeft: `3px solid ${t}`, paddingLeft: 24 }}>
                <p style={{ fontSize: 16, color: 'var(--color-text)', lineHeight: 1.8, margin: 0 }}>
                  {study.challenge}
                </p>
              </div>
            </div>

            <div>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: t, marginBottom: 24,
              }}>
                What We Shipped
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {study.key_points.map((point, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 16, height: 2, background: t, flexShrink: 0 }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: t }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div style={{ flex: 1, height: 1, background: 'var(--color-border-muted)' }} />
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.65, margin: '0 0 18px', paddingLeft: 26 }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DELIVERED ────────────────────────────────────────────── */}
        <div style={{ borderTop: `2px solid var(--color-border-muted)` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px clamp(20px, 5vw, 48px)' }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: t, marginBottom: 40,
            }}>
              Delivered
            </p>

            <div className="cs-outcomes">
              {study.outcomes.map((o) => (
                <div key={o.label} style={{
                  padding: '28px 24px', borderRadius: 16,
                  background: 'var(--color-surface)', border: `2px solid var(--color-border-muted)`,
                }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: t, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {o.value}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-muted)', margin: 0, lineHeight: 1.4 }}>
                    {o.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              padding: '36px 40px', borderRadius: 20,
              background: rgba(t, 0.05), border: `2px solid ${t}`, maxWidth: 760,
            }}>
              <p style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700,
                color: t, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                {study.outcome.metric}
              </p>
              <p style={{ fontSize: 15, color: 'var(--color-text)', margin: 0, lineHeight: 1.75 }}>
                {study.outcome.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── CLIENT TESTIMONIAL ───────────────────────────────────── */}
        {testimonial && <CaseStudyTestimonial testimonial={testimonial} t={t} />}

        {/* ── DEEP DIVE ─────────────────────────────────────────────── */}
        {DEEP_DIVES[slug] && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px) 80px' }}>
            <DeepDive deepDive={DEEP_DIVES[slug]} themeColor={t} />
          </div>
        )}

        {/* ── CTA BAND ──────────────────────────────────────────────── */}
        <div style={{ borderTop: `2px solid var(--color-border-muted)` }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '88px clamp(20px, 5vw, 48px)',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: t, marginBottom: 20,
            }}>
              Your Turn
            </p>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text)',
              margin: '0 0 16px',
            }}>
              Want something like this built?
            </h2>
            <p style={{
              fontSize: 16, color: 'var(--color-muted)', maxWidth: 480,
              margin: '0 auto 36px', lineHeight: 1.65,
            }}>
              Fixed price, full source code, shipped in weeks. Tell us what you need and get a scoped plan within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              <Link href="/#packages" className="border-2" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
                borderColor: 'var(--color-border-muted)',
                color: 'var(--color-text)', fontSize: 15, fontWeight: 500,
                background: 'var(--color-surface)',
              }}>
                See Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* ── PREV / NEXT ───────────────────────────────────────────── */}
        <div style={{ borderTop: `2px solid var(--color-border-muted)` }}>
          <nav aria-label="Case study navigation" style={{
            maxWidth: 1100, margin: '0 auto', padding: '48px clamp(20px, 5vw, 48px)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
          }}>
            {prevStudy ? (
              <Link href={`/work/${prevStudy.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'var(--color-muted)', textDecoration: 'none',
              }}>
                <ArrowLeftIcon />
                <span>
                  <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2, color: 'var(--color-muted-dark)' }}>
                    Previous
                  </span>
                  {prevStudy.title}
                </span>
              </Link>
            ) : <span />}

            {nextStudy ? (
              <Link href={`/work/${nextStudy.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'var(--color-muted)', textDecoration: 'none', textAlign: 'right',
              }}>
                <span>
                  <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2, color: 'var(--color-muted-dark)' }}>
                    Next
                  </span>
                  {nextStudy.title}
                </span>
                <ArrowRightIcon />
              </Link>
            ) : <span />}
          </nav>
        </div>

      </main>

      <Footer />
    </>
  );
}
