'use client';

import { useRef, useState } from 'react';
import type { Testimonial } from '@/lib/data';

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
      <img
        src={url}
        alt={name}
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
            <img
              src={t.video_thumbnail_url}
              alt={`${t.client_name} video`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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

  if (testimonials.length === 0) return null;

  // Split into two rows; if odd number, first row gets the extra
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);
  // If only one row worth, duplicate it for row 2
  const row2Items = row2.length > 0 ? row2 : [...row1].reverse();

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
            From first call to final handover — here&apos;s what working with Velt is actually like.
          </p>
        </div>

        {/* Marquee rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          <MarqueeRow
            items={row1}
            direction="left"
            duration={45}
            onPlay={(url) => {
              const t = testimonials.find((t) => t.video_url === url);
              handlePlay(url, t?.client_name ?? '');
            }}
          />
          <MarqueeRow
            items={row2Items}
            direction="right"
            duration={38}
            onPlay={(url) => {
              const t = testimonials.find((t) => t.video_url === url);
              handlePlay(url, t?.client_name ?? '');
            }}
          />
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
