import Link from 'next/link';
import { cn } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';
import Wordmark from '@/components/ui/Wordmark';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

function Logo() {
  return (
    <span
      className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
      style={{ color: 'var(--color-text-inverse)' }}
    >
      <LogoMark size={22} />
      <Wordmark />
    </span>
  );
}

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/#packages', label: 'Pricing' },
  { href: '/#services', label: 'Process' },
  { href: '/#faq', label: 'FAQ' },
];

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(className)}
      style={{ background: 'var(--color-bg-dark)', color: 'var(--color-text-inverse)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-xs tracking-wide" style={{ color: 'var(--color-muted-inverse)' }}>
              Built for founders. Shipped for growth.
            </p>
            <p className="text-xs leading-relaxed max-w-[260px]" style={{ color: 'var(--color-muted-inverse-dark)' }}>
              Fixed-price mobile apps, web platforms, and SaaS products.
              Full source code, shipped in weeks.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-inverse-dark)' }}>
              Explore
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--color-muted-inverse)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Start a project */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-inverse-dark)' }}>
              Start a project
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-inverse)' }}>
              Tell us what you need. A real engineer replies within 24 hours.
            </p>
            <Link
              href={BOOKING_ENABLED ? CAL_URL : '/#contact'}
              {...(BOOKING_ENABLED ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white border-2"
              style={{ background: 'var(--color-primary)', borderColor: 'var(--color-text-inverse)' }}
            >
              {PRIMARY_CTA_LABEL}
            </Link>
            <a
              href="mailto:info@hexspire.io"
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted-inverse)' }}
            >
              info@hexspire.io
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid rgba(253,251,246,0.14)' }}>
          <p className="text-xs" style={{ color: 'var(--color-muted-inverse-dark)' }}>
            &copy; {new Date().getFullYear()} Hexspire. All rights reserved.
          </p>
        </div>

        {/* Closing brand moment — oversized wordmark lockup */}
        <div className="mt-10 flex items-center gap-4 select-none" aria-hidden="true">
          <LogoMark size={56} className="shrink-0" />
          <span
            className="font-extrabold tracking-tight leading-none"
            style={{ fontSize: 'clamp(48px, 12vw, 140px)', color: 'var(--color-text-inverse)' }}
          >
            Hex<span style={{ color: 'var(--color-primary)' }}>Spire</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
