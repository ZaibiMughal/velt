import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import CheckIcon from '@/components/ui/CheckIcon';
import { packages } from '@/data/packages';
import { COMPARISON, POST_LAUNCH_SUPPORT_NOTE, type Cell as CellValue } from '@/data/pricing-comparison';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Pricing, in full | Hexspire' },
  description: 'The complete breakdown of what is included in every Hexspire plan: Launch MVP, Growth Platform, and SaaS Platform, side by side.',
  alternates: { canonical: 'https://hexspire.io/pricing' },
  openGraph: {
    title: 'Pricing, in full | Hexspire',
    description: 'The complete breakdown of what is included in every Hexspire plan, side by side.',
    url: 'https://hexspire.io/pricing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hexspire, Software Development' }],
  },
};

function ComparisonCell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <CheckIcon />
      </div>
    );
  }
  if (value === false) {
    return <span style={{ color: 'var(--color-muted-dark)' }}>&mdash;</span>;
  }
  return <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>{value}</span>;
}

export default function PricingPage() {
  const ctaHref = BOOKING_ENABLED ? CAL_URL : '/#contact';
  const ctaProps = BOOKING_ENABLED ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <>
      <Navbar />

      <style>{`
        .cmp-table-wrap { overflow-x: auto; }
        .cmp-table { width: 100%; border-collapse: collapse; min-width: 720px; }
        .cmp-table thead th {
          position: sticky; top: 76px; z-index: 2;
          background: var(--color-surface);
          padding: 18px 20px 16px; text-align: left; font-size: 13px; font-weight: 700;
          border-bottom: 2px solid var(--color-border-emphasis);
          color: var(--color-text);
        }
        .cmp-table thead th.plan-col { text-align: center; min-width: 170px; }
        .cmp-category td {
          padding: 22px 20px 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--color-primary); border-bottom: none;
        }
        .cmp-category:first-of-type td { padding-top: 18px; }
        .cmp-table tbody tr:not(.cmp-category) { border-bottom: 1px solid var(--color-border-muted); }
        .cmp-table tbody tr:not(.cmp-category):last-child { border-bottom: none; }
        .cmp-table tbody td { padding: 13px 20px; font-size: 13.5px; color: var(--color-text); vertical-align: middle; }
        .cmp-table tbody td.plan-col { text-align: center; }
        .cmp-col-popular { background: var(--color-bg-accent); }
      `}</style>

      <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px clamp(20px, 5vw, 48px) 0' }}>
          {/* Hero */}
          <div style={{ maxWidth: 640, margin: '0 auto 56px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <Badge>Pricing, in full</Badge>
            </div>
            <h1 className="font-serif" style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-0.02em',
              margin: '0 0 16px', lineHeight: 1.1, color: 'var(--color-text)',
            }}>
              See exactly what&apos;s in each plan.
            </h1>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--color-muted)', margin: 0 }}>
              The homepage shows the headline features. This is the complete breakdown. Every plan
              inherits everything from the tier below it, so nothing is hidden until a call.
            </p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 8 }}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  position: 'relative', padding: '24px 20px', borderRadius: 24,
                  border: pkg.highlighted ? '2px solid var(--color-border-emphasis)' : '2px solid var(--color-border-muted)',
                  background: 'var(--color-surface)',
                }}
              >
                {pkg.badge && (
                  <span style={{
                    position: 'absolute', top: -11, left: 20, fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 10px',
                    borderRadius: 999, color: '#fff',
                    background: 'var(--color-primary)',
                  }}>
                    {pkg.badge}
                  </span>
                )}
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: 'var(--color-text)' }}>{pkg.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--color-muted-dark)', margin: '0 0 14px' }}>{pkg.delivery}</p>
                <div className="font-serif" style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--color-text)' }}>
                  {pkg.price}
                  <span className="font-sans" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-dark)', marginLeft: 6 }}>
                    {pkg.priceNote ?? 'Fixed'}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--color-muted)', lineHeight: 1.5, margin: '10px 0 0' }}>
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="cmp-table-wrap" style={{
            marginTop: 56, border: '2px solid var(--color-border-muted)', borderRadius: 24,
            background: 'var(--color-surface)',
          }}>
            <table className="cmp-table">
              <thead>
                <tr>
                  <th>What&apos;s included</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className={`plan-col ${pkg.highlighted ? 'cmp-col-popular' : ''}`}>
                      {pkg.badge && (
                        <span style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 4 }}>
                          {pkg.badge}
                        </span>
                      )}
                      {pkg.name}
                      <span style={{ display: 'block', fontSize: 20, fontWeight: 800, marginTop: 4 }}>
                        {pkg.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((cat) => (
                  <Fragment key={cat.title}>
                    <tr className="cmp-category">
                      <td colSpan={4}>
                        {cat.title}
                        {cat.subtitle && (
                          <span style={{ textTransform: 'none', fontWeight: 500, color: 'var(--color-muted-dark)', letterSpacing: 0 }}>
                            {' '}({cat.subtitle})
                          </span>
                        )}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr key={row.label}>
                        <td>
                          {row.label}
                          {row.note && (
                            <span style={{ color: 'var(--color-muted-dark)' }}> ({row.note})</span>
                          )}
                        </td>
                        {row.values.map((v, i) => (
                          <td key={i} className={`plan-col ${i === 1 ? 'cmp-col-popular' : ''}`}>
                            <ComparisonCell value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 12, color: 'var(--color-muted-dark)', textAlign: 'center', margin: '16px 0 0', lineHeight: 1.6 }}>
            Every plan includes everything listed for the tiers below it. Growth Platform includes all of Launch MVP, and SaaS Platform includes all of Growth Platform.
          </p>
          <p style={{ fontSize: 12, color: 'var(--color-muted-dark)', textAlign: 'center', margin: '6px 0 0', lineHeight: 1.6 }}>
            {POST_LAUNCH_SUPPORT_NOTE}
          </p>

          {/* CTA band */}
          <div style={{ borderTop: '2px solid var(--color-border-muted)', marginTop: 64 }}>
            <div style={{
              padding: '80px clamp(20px, 5vw, 48px)', textAlign: 'center',
            }}>
              <h2 className="font-serif" style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500,
                letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text)',
                margin: '0 0 14px',
              }}>
                Not sure which plan fits?
              </h2>
              <p style={{
                fontSize: 15, color: 'var(--color-muted)', maxWidth: 460,
                margin: '0 auto 32px', lineHeight: 1.65,
              }}>
                Tell us what you are building and we will recommend the right tier. No pressure.
              </p>
              <Link
                href={ctaHref}
                {...ctaProps}
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
        </div>
      </main>

      <Footer />
    </>
  );
}
