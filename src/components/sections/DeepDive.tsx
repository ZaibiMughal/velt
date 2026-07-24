'use client';

import { useState } from 'react';
import type { DeepDive } from '@/data/work/deep-dives';

const TYPE_ICONS: Record<string, string> = {
  'iOS + Android': '📱',
  'Web App': '🌐',
  'Admin Dashboard': '⚙️',
  'Admin Panel': '⚙️',
  'Internal Tool': '🔧',
  'Corporate Dashboard': '🏢',
  'API Server': '🖥️',
  'API Backend': '🖥️',
  'Blockchain': '⛓️',
  'Smart Contract': '⛓️',
  'Marketing Site': '📣',
  'HR Portal': '🏢',
  'Self-Serve Web App': '🌐',
  'Client Portal': '🔑',
  'Core Feature': '⚡',
  'Social Layer': '💬',
  'Map Feature': '🗺️',
  'Marketplace': '🛒',
  'Community Features': '👥',
  'Data Processing': '🤖',
  'Workflow Automation': '⚡',
  'Internal Web App': '🔧',
};

function rgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function DeepDive({
  deepDive,
  themeColor,
}: {
  deepDive: DeepDive;
  themeColor: string;
}) {
  const [open, setOpen] = useState(false);
  const t = themeColor;

  return (
    <div style={{ marginTop: 80 }}>
      {!open ? (
        /* ── CTA ── */
        <div style={{
          border: `2px solid ${t}`,
          borderRadius: 20,
          padding: '32px 36px',
          background: 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: t, marginBottom: 8,
            }}>
              Full Breakdown
            </p>
            <h3 style={{
              fontSize: 22, fontWeight: 700, color: 'var(--color-text)',
              margin: '0 0 8px', letterSpacing: '-0.02em',
            }}>
              Want to know more about this product?
            </h3>
            <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: 0, lineHeight: 1.6 }}>
              See a detailed breakdown of each platform, app, and system that was built.
            </p>
          </div>
          <button
            onClick={() => { setOpen(true); setTimeout(() => window.scrollBy({ top: 200, behavior: 'smooth' }), 50); }}
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              border: `2px solid var(--color-text)`,
              background: t,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            See full breakdown →
          </button>
        </div>
      ) : (
        /* ── Expanded deep dive ── */
        <div>
          {/* Section header */}
          <div style={{ marginBottom: 48 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: t, marginBottom: 12,
            }}>
              Full Breakdown
            </p>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500,
              color: 'var(--color-text)', margin: '0 0 16px', letterSpacing: '-0.02em',
            }}>
              Every part of this product, detailed.
            </h2>
            <p style={{
              fontSize: 15, color: 'var(--color-muted)',
              margin: 0, lineHeight: 1.7, maxWidth: 600,
            }}>
              {deepDive.intro}
            </p>
          </div>

          {/* Platform cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {deepDive.platforms.map((platform, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  border: '2px solid var(--color-border-muted)',
                  background: 'var(--color-surface)',
                  overflow: 'hidden',
                }}
              >
                {/* Card header */}
                <div style={{
                  padding: '24px 28px 20px',
                  borderBottom: '2px solid var(--color-border-muted)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: rgba(t, 0.08),
                    border: `2px solid ${t}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {TYPE_ICONS[platform.type] ?? '📦'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h3 style={{
                        fontSize: 18, fontWeight: 700, color: 'var(--color-text)',
                        margin: 0, letterSpacing: '-0.02em',
                      }}>
                        {platform.name}
                      </h3>
                      <span style={{
                        padding: '2px 10px', borderRadius: 999,
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        background: rgba(t, 0.1), border: `2px solid ${t}`,
                        color: t,
                      }}>
                        {platform.type}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 13, color: 'var(--color-muted)',
                      margin: 0, lineHeight: 1.6,
                    }}>
                      {platform.description}
                    </p>
                  </div>
                </div>

                {/* Highlights + tech */}
                <div style={{ padding: '20px 28px 24px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  {/* Highlights */}
                  <div style={{ flex: '1 1 340px' }}>
                    <p style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--color-muted-dark)',
                      marginBottom: 12,
                    }}>
                      Key features
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {platform.highlights.map((h, j) => (
                        <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: t, flexShrink: 0, marginTop: 7,
                          }} />
                          <span style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.6 }}>
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  {platform.tech && platform.tech.length > 0 && (
                    <div style={{ flexShrink: 0 }}>
                      <p style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'var(--color-muted-dark)',
                        marginBottom: 12,
                      }}>
                        Tech used
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {platform.tech.map((tech, j) => (
                          <span key={j} style={{
                            padding: '4px 10px', borderRadius: 6,
                            fontSize: 11, fontWeight: 500,
                            background: 'var(--color-bg)',
                            border: '2px solid var(--color-border-muted)',
                            color: 'var(--color-muted)',
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Back to summary */}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button
              onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                border: '2px solid var(--color-border-muted)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ← Back to summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
