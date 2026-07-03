'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/data';

/* ── Fallback data (shown when DB table doesn't exist yet) ──────── */

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'f1', case_study_slug: 'ridespotr', display_order: 1,
    client_name: 'Alex Thompson', client_role: 'Co-Founder', client_company: 'RideSpotr',
    quote: 'Hexspire turned our car-spotting concept into a platform with millions of spots in a fraction of the time we expected. The AI plate recognition alone would have taken us months elsewhere, they shipped it in weeks and it just works.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f2', case_study_slug: 'wagerr', display_order: 2,
    client_name: 'Marcus Reid', client_role: 'Founder', client_company: 'Wagerr',
    quote: 'We had a complex on-chain settlement system that needed to be bulletproof. Hexspire nailed the architecture: the Ethereum smart contract, the embedded wallets, the scoring logic, and somehow made it feel effortless to the end user.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f3', case_study_slug: 'nutritionup', display_order: 3,
    client_name: 'Sarah Chen', client_role: 'CEO', client_company: 'NutritionUP',
    quote: 'Four platforms, one team, delivered on schedule. The AI meal coaching, the corporate HR portal, the admin panel, all of it polished and production-ready. Hexspire thinks like a product team, not just engineers.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f4', case_study_slug: 'pipa', display_order: 4,
    client_name: 'Ryan Nakamura', client_role: 'Operations Director', client_company: 'PIPA',
    quote: 'Our farm managers went from paper timesheets to real-time GPS tracking overnight. The Xero payroll sync alone saves us hours every week. I couldn\'t ask for a better development partner.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f5', case_study_slug: 'keyos', display_order: 5,
    client_name: 'David Park', client_role: 'CTO', client_company: 'KeyOS',
    quote: 'The multi-tenant data isolation Hexspire built is rock solid. Fifty-six migrations, zero data leaks, enterprise clients fully confident. They understand that infrastructure has to be invisible, and they delivered exactly that.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f6', case_study_slug: 'trucktuck', display_order: 6,
    client_name: 'James Wilson', client_role: 'Co-Founder', client_company: 'TruckTuck',
    quote: 'Over a million visitors a month and not a single missed booking. The Redis and BullMQ architecture they designed handles our peak loads without breaking a sweat. We scaled without rewriting anything.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
  {
    id: 'f7', case_study_slug: 'salespulse', display_order: 7,
    client_name: 'Emma Torres', client_role: 'Head of Sales', client_company: 'Scholarly',
    quote: 'The AI automation workflows Hexspire built replaced hours of manual work every week. Our team now spends that time on growth instead of copy-pasting between tools. The ROI was visible within the first month.',
    avatar_url: null, video_url: null, video_thumbnail_url: null,
  },
];

/* ── helpers ────────────────────────────────────────────────────── */

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function gradientForName(name: string) {
  const palette = [
    ['#6366f1', '#818cf8'],
    ['#8b5cf6', '#a78bfa'],
    ['#ec4899', '#f472b6'],
    ['#14b8a6', '#2dd4bf'],
    ['#f59e0b', '#fbbf24'],
    ['#3b82f6', '#60a5fa'],
    ['#10b981', '#34d399'],
  ];
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}

/* ── Avatar ─────────────────────────────────────────────────────── */

function Avatar({ name, url }: { name: string; url: string | null }) {
  const [c1, c2] = gradientForName(name);
  if (url) {
    return (
      <Image
        src={url}
        alt={name}
        width={36}
        height={36}
        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: '#fff',
    }}>
      {initials(name)}
    </div>
  );
}

/* ── PlayIcon ───────────────────────────────────────────────────── */

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

/* ── Video Modal ─────────────────────────────────────────────────── */

function VideoModal({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: 800,
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chrome bar */}
        <div style={{
          padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{name}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: 18, lineHeight: 1,
              padding: '0 4px',
            }}
            aria-label="Close video"
          >
            ×
          </button>
        </div>
        <video
          src={url}
          controls
          autoPlay
          style={{ width: '100%', display: 'block', background: '#000' }}
        />
      </div>
    </div>
  );
}

/* ── Testimonial Card ────────────────────────────────────────────── */

function TestimonialCard({ t, onPlay }: { t: Testimonial; onPlay?: (url: string) => void }) {
  return (
    <div style={{
      flexShrink: 0, width: 340,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Video thumbnail */}
      {t.video_url && (
        <button
          onClick={() => onPlay?.(t.video_url!)}
          style={{
            position: 'relative', width: '100%', aspectRatio: '16/9',
            background: 'rgba(255,255,255,0.04)',
            border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label={`Play ${t.client_name}'s video testimonial`}
        >
          {t.video_thumbnail_url ? (
            <Image
              src={t.video_thumbnail_url}
              alt={`${t.client_name} video`}
              fill
              sizes="340px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 40% 50%, rgba(99,102,241,0.25) 0%, transparent 65%)',
            }} />
          )}
          {/* Play button */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <PlayIcon />
          </div>
        </button>
      )}

      {/* Content */}
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Quote mark */}
        <div style={{
          fontSize: 48, lineHeight: 0.8, color: '#6366f1', opacity: 0.5,
          fontFamily: 'Georgia, serif', userSelect: 'none',
        }}>
          &ldquo;
        </div>

        {/* Quote text */}
        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7,
          margin: 0, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        } as React.CSSProperties}>
          {t.quote}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={t.client_name} url={t.avatar_url} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>
              {t.client_name}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>
              {[t.client_role, t.client_company].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee Row ─────────────────────────────────────────────────── */

function MarqueeRow({
  items, direction, duration, onPlay,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  duration: number;
  onPlay: (url: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate 4× for seamless looping
  const repeated = [...items, ...items, ...items, ...items];

  const animation =
    direction === 'left'
      ? `marquee-left ${duration}s linear infinite`
      : `marquee-right ${duration}s linear infinite`;

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex', gap: 20,
          width: 'max-content',
          animation,
          willChange: 'transform',
        }}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
      >
        {repeated.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials Section ────────────────────────────────────────── */

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoName, setActiveVideoName] = useState('');

  const items = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  function handlePlay(url: string, name: string) {
    setActiveVideo(url);
    setActiveVideoName(name);
  }

  return (
    <>
      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)',
        }} />

        {/* Edge fade masks */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, #09090b, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, #09090b, transparent)',
        }} />

        {/* Section header */}
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 48px 56px',
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6366f1', marginBottom: 16,
          }}>
            Client Stories
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
            letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.05,
          }}>
            What clients say
          </h2>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.42)',
            maxWidth: 440, margin: '0 auto', lineHeight: 1.65,
          }}>
            From first call to final handover - here&apos;s what working with Hexspire is actually like.
          </p>
        </div>

        {/* Marquee row */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <MarqueeRow
            items={items}
            direction="left"
            duration={140}
            onPlay={(url) => {
              const t = items.find((t) => t.video_url === url);
              handlePlay(url, t?.client_name ?? '');
            }}
          />
        </div>

        {/* Contextual CTA */}
        <div style={{ textAlign: 'center', marginTop: 48, position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Want results like these?{' '}
            <a href="#contact" style={{ color: '#818cf8', fontWeight: 500, textDecoration: 'none' }}>
              Start your project →
            </a>
          </p>
        </div>
      </section>

      {/* Video modal */}
      {activeVideo && (
        <VideoModal
          url={activeVideo}
          name={activeVideoName}
          onClose={() => { setActiveVideo(null); setActiveVideoName(''); }}
        />
      )}
    </>
  );
}
