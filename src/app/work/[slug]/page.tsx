import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CaseStudy } from '@/data/work/index';
import { getAllCaseStudies, getCaseStudy, getCaseStudySlugs, getSignedImageUrls, getTestimonialForSlug } from '@/lib/data';
import type { Testimonial } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
  if (!study) return { title: 'Not Found | Velt Studio' };

  const techPreview = study.tech.slice(0, 4).join(', ');
  const description = `${study.tagline} Built with ${techPreview}. ${study.outcome.metric}.`;

  return {
    title: { absolute: `${study.title} — ${study.category} Case Study | Velt Studio` },
    description,
    keywords: [
      study.title, study.category, ...study.tech,
      'case study', 'software development', 'Velt Studio',
    ],
    openGraph: {
      title: `${study.title} — ${study.category} Case Study`,
      description,
      url: `https://veltstudio.com/work/${slug}`,
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
   ───────────────────────────────────────────────────────────────── */

/**
 * CASCADE — dark-app style (RideSpotr)
 * Raw screenshots fanning out from center, no hardware chrome.
 * Works great when the app itself is dark (blends into page background).
 */
function ShowcaseCascade({ urls, t, title }: { urls: string[]; t: string; title: string }) {
  const [cover, left, right] = urls;
  const screenShadow = `0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px ${rgba(t, 0.25)}`;
  const coverShadow  = `0 32px 80px rgba(0,0,0,0.8), 0 0 0 1.5px ${rgba(t, 0.45)}, 0 0 80px ${rgba(t, 0.18)}`;

  return (
    <div style={{ position: 'relative', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
      {/* floor glow */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        width: 560, height: 100, pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, ${rgba(t, 0.22)} 0%, transparent 70%)`,
      }} />

      {/* left screen — behind, tilted */}
      {left && (
        <div style={{
          position: 'absolute', bottom: 0,
          transform: 'translateX(-170px) rotate(-7deg) scale(0.82)',
          transformOrigin: 'bottom center',
          zIndex: 1, width: 200,
        }}>
          <img src={left} alt={`${title} screen`}
            style={{ width: '100%', display: 'block', borderRadius: 28, boxShadow: screenShadow }} />
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
          <img src={right} alt={`${title} screen`}
            style={{ width: '100%', display: 'block', borderRadius: 28, boxShadow: screenShadow }} />
        </div>
      )}

      {/* center — cover, front and prominent */}
      <div style={{
        position: 'absolute', bottom: 0,
        transform: 'translateX(-50%) translateX(0)',
        left: '50%', zIndex: 3, width: 230,
      }}>
        <img src={cover} alt={title}
          style={{ width: '100%', display: 'block', borderRadius: 32, boxShadow: coverShadow }} />
      </div>
    </div>
  );
}

/**
 * ROW — light-app style (Wagerr)
 * Screens in a clean horizontal row; center sits slightly higher.
 * No rotation — lets the UI content speak clearly against the dark page.
 */
function ShowcaseRow({ urls, t, title }: { urls: string[]; t: string; title: string }) {
  return (
    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
      {/* floor glow */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: 80, pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, ${rgba(t, 0.15)} 0%, transparent 70%)`,
      }} />

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
            <img src={url} alt={`${title} screen ${i + 1}`}
              style={{
                width: '100%', display: 'block', borderRadius: 24,
                boxShadow: isCenter
                  ? `0 28px 70px rgba(0,0,0,0.7), 0 0 0 1.5px ${rgba(t, 0.5)}, 0 0 50px ${rgba(t, 0.2)}`
                  : `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${rgba(t, 0.25)}`,
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 32, alignItems: 'start' }}>

      {/* ── mobile pair ── */}
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: rgba(t, 0.6), marginBottom: 20 }}>
          Mobile App
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {mobileUrls[0] && (
            <div style={{ flex: 1 }}>
              <img src={mobileUrls[0]} alt={`${title} mobile`}
                style={{ width: '100%', display: 'block', borderRadius: 22,
                  boxShadow: `0 20px 56px rgba(0,0,0,0.7), 0 0 0 1.5px ${rgba(t, 0.4)}` }} />
            </div>
          )}
          {mobileUrls[1] && (
            <div style={{ flex: 1, marginTop: 32 }}>
              <img src={mobileUrls[1]} alt={`${title} mobile`}
                style={{ width: '100%', display: 'block', borderRadius: 22,
                  boxShadow: `0 20px 56px rgba(0,0,0,0.6), 0 0 0 1px ${rgba(t, 0.25)}` }} />
            </div>
          )}
        </div>
      </div>

      {/* ── web portals ── */}
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: rgba(t, 0.6), marginBottom: 20 }}>
          Web Portals
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {webUrls.map((url, i) => (
            <div key={i} style={{
              borderRadius: 10, overflow: 'hidden',
              border: `1px solid ${rgba(t, 0.25)}`,
              boxShadow: `0 16px 48px rgba(0,0,0,0.55)`,
              background: '#0d0d0d',
            }}>
              {/* minimal browser chrome */}
              <div style={{
                padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, maxWidth: 220, margin: '0 auto',
                  padding: '2px 10px', borderRadius: 4,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  fontSize: 9, color: 'rgba(255,255,255,0.18)', textAlign: 'center',
                }}>
                  {liveUrl?.replace('https://', '') ?? 'portal'}
                </div>
              </div>
              <img src={url} alt={`${title} web portal`}
                style={{ width: '100%', display: 'block', objectPosition: 'top' }} />
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
  const BrowserWrap = ({ src, alt }: { src: string; alt: string }) => (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: `1px solid ${rgba(t, 0.3)}`,
      background: '#0d0d0d',
      boxShadow: `0 32px 64px rgba(0,0,0,0.6), 0 0 80px ${rgba(t, 0.08)}`,
    }}>
      <div style={{
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{
          flex: 1, maxWidth: 260, margin: '0 auto',
          padding: '3px 10px', borderRadius: 5,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.05)',
          fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
        }}>
          {liveUrl?.replace('https://', '') ?? 'app'}
        </div>
      </div>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', objectPosition: 'top' }} />
    </div>
  );

  return (
    <div>
      <BrowserWrap src={coverUrl} alt={title} />
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
  const [c1, c2] = palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (url) {
    return <img src={url} alt={name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
  }
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, fontWeight: 700, color: '#fff',
    }}>
      {initials}
    </div>
  );
}

function CaseStudyTestimonial({ testimonial: tm, t }: { testimonial: Testimonial; t: string }) {
  return (
    <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>

        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: t, marginBottom: 48,
        }}>
          Client Voice
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'start',
          maxWidth: 860,
        }}>
          {/* Quote */}
          <div>
            {/* Large decorative quote mark */}
            <div style={{
              fontSize: 96, lineHeight: 0.7, color: t, opacity: 0.22,
              fontFamily: 'Georgia, serif', marginBottom: 24, userSelect: 'none',
            }}>
              &ldquo;
            </div>

            <blockquote style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 500,
              color: 'rgba(255,255,255,0.82)', lineHeight: 1.7,
              margin: '0 0 36px', borderLeft: `3px solid ${rgba(t, 0.35)}`, paddingLeft: 28,
              fontStyle: 'italic',
            }}>
              {tm.quote}
            </blockquote>

            {/* Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 28 }}>
              <AvatarBlock name={tm.client_name} url={tm.avatar_url} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>
                  {tm.client_name}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '3px 0 0' }}>
                  {[tm.client_role, tm.client_company].filter(Boolean).join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Accent glow orb */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%', flexShrink: 0,
            background: `radial-gradient(circle, ${rgba(t, 0.18)} 0%, transparent 70%)`,
            border: `1px solid ${rgba(t, 0.15)}`,
            alignSelf: 'center',
          }} />
        </div>

        {/* Inline video */}
        {tm.video_url && (
          <div style={{ marginTop: 48, maxWidth: 680 }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              border: `1px solid ${rgba(t, 0.25)}`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 60px ${rgba(t, 0.07)}`,
              background: '#000',
            }}>
              {/* Minimal chrome */}
              <div style={{
                padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                  {tm.client_name} — testimonial
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
    quote: 'Velt turned our car-spotting concept into a platform with millions of spots in a fraction of the time we expected. The AI plate recognition alone would have taken us months elsewhere, they shipped it in weeks and it just works.',
  },
  wagerr: {
    client_name: 'Marcus Reid', client_role: 'Founder', client_company: 'Wagerr',
    quote: 'We had a complex on-chain settlement system that needed to be bulletproof. Velt nailed the architecture: the Ethereum smart contract, the embedded wallets, the scoring logic, and somehow made it feel effortless to the end user.',
  },
  nutritionup: {
    client_name: 'Sarah Chen', client_role: 'CEO', client_company: 'NutritionUP',
    quote: 'Four platforms, one team, delivered on schedule. The AI meal coaching, the corporate HR portal, the admin panel, all of it polished and production-ready. Velt thinks like a product team, not just engineers.',
  },
  pipa: {
    client_name: 'Ryan Nakamura', client_role: 'Operations Director', client_company: 'PIPA',
    quote: "Our farm managers went from paper timesheets to real-time GPS tracking overnight. The Xero payroll sync alone saves us hours every week. I couldn't ask for a better development partner.",
  },
  keyos: {
    client_name: 'David Park', client_role: 'CTO', client_company: 'KeyOS',
    quote: 'The multi-tenant data isolation Velt built is rock solid. Fifty-six migrations, zero data leaks, enterprise clients fully confident. They understand that infrastructure has to be invisible, and they delivered exactly that.',
  },
  trucktuck: {
    client_name: 'James Wilson', client_role: 'Co-Founder', client_company: 'TruckTuck',
    quote: 'Over a million visitors a month and not a single missed booking. The Redis and BullMQ architecture they designed handles our peak loads without breaking a sweat. We scaled without rewriting anything.',
  },
  salespulse: {
    client_name: 'Emma Torres', client_role: 'Head of Sales', client_company: 'Scholarly',
    quote: 'The AI automation workflows Velt built replaced hours of manual work every week. Our team now spends that time on growth instead of copy-pasting between tools. The ROI was visible within the first month.',
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

  return (
    <>
      <Navbar />

      <main style={{ background: '#09090b', color: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 70% 60% at 15% 50%, ${rgba(t, 0.13)} 0%, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative' }}>
            <Link href="/work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: 40,
            }}>
              <ArrowLeftIcon /> All Work
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: 999,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: rgba(t, 0.15), border: `1px solid ${rgba(t, 0.35)}`, color: t,
              }}>
                {study.category}
              </span>

              {hasLiveUrls && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {study.live_url && (
                    <a href={study.live_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none', background: 'rgba(255,255,255,0.04)',
                    }}>
                      Live Site <ExternalLinkIcon />
                    </a>
                  )}
                  {study.app_store_url && (
                    <a href={study.app_store_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none', background: 'rgba(255,255,255,0.04)',
                    }}>
                      App Store <ExternalLinkIcon />
                    </a>
                  )}
                  {study.play_store_url && (
                    <a href={study.play_store_url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 999, fontSize: 11,
                      border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none', background: 'rgba(255,255,255,0.04)',
                    }}>
                      Play Store <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 0.95, color: 'white', margin: '0 0 28px',
            }}>
              {study.title}
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(255,255,255,0.5)',
              maxWidth: 580, lineHeight: 1.65, margin: '0 0 40px',
            }}>
              {study.tagline}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {study.tech.map((tech) => (
                <span key={tech} style={{
                  padding: '5px 14px', borderRadius: 999, fontSize: 12,
                  border: `1px solid ${rgba(t, 0.25)}`, color: 'rgba(255,255,255,0.4)',
                  background: rgba(t, 0.06),
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SCREENSHOTS ──────────────────────────────────────────── */}
        {coverUrl && (
          <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, overflow: 'hidden' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 48px' }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: t, marginBottom: 48,
              }}>
                {isEcosystem ? 'The Ecosystem' : isMobile ? 'In the App' : 'The Platform'}
              </p>

              {isEcosystem ? (
                <ShowcaseEcosystem
                  mobileUrls={[coverUrl, extraUrls[0]].filter(Boolean) as string[]}
                  webUrls={extraUrls.slice(1)}
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
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto', padding: '80px 48px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px 80px',
          }}>
            <div>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: t, marginBottom: 24,
              }}>
                The Brief
              </p>
              <div style={{ borderLeft: `2px solid ${rgba(t, 0.35)}`, paddingLeft: 24 }}>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0 }}>
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
                      <div style={{ width: 16, height: 1, background: rgba(t, 0.5), flexShrink: 0 }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: t, opacity: 0.8 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${rgba(t, 0.25)}, transparent)` }} />
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 18px', paddingLeft: 26 }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DELIVERED ────────────────────────────────────────────── */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: t, marginBottom: 40,
            }}>
              Delivered
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 60 }}>
              {study.outcomes.map((o) => (
                <div key={o.label} style={{
                  padding: '28px 24px', borderRadius: 16,
                  background: rgba(t, 0.07), border: `1px solid ${rgba(t, 0.2)}`,
                }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: t, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {o.value}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>
                    {o.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              padding: '36px 40px', borderRadius: 20,
              background: rgba(t, 0.05), border: `1px solid ${rgba(t, 0.15)}`, maxWidth: 760,
            }}>
              <p style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700,
                color: t, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                {study.outcome.metric}
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>
                {study.outcome.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── CLIENT TESTIMONIAL ───────────────────────────────────── */}
        {testimonial && <CaseStudyTestimonial testimonial={testimonial} t={t} />}

        {/* ── DEEP DIVE ─────────────────────────────────────────────── */}
        {DEEP_DIVES[slug] && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 80px' }}>
            <DeepDive deepDive={DEEP_DIVES[slug]} themeColor={t} />
          </div>
        )}

        {/* ── PREV / NEXT ───────────────────────────────────────────── */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <nav aria-label="Case study navigation" style={{
            maxWidth: 1100, margin: '0 auto', padding: '48px 48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
          }}>
            {prevStudy ? (
              <Link href={`/work/${prevStudy.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              }}>
                <ArrowLeftIcon />
                <span>
                  <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2, opacity: 0.5 }}>
                    Previous
                  </span>
                  {prevStudy.title}
                </span>
              </Link>
            ) : <span />}

            {nextStudy ? (
              <Link href={`/work/${nextStudy.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', textAlign: 'right',
              }}>
                <span>
                  <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2, opacity: 0.5 }}>
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
