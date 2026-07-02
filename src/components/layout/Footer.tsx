import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

function Logo() {
  return (
    <span className="text-lg font-extrabold text-white tracking-tight">
      velt
      <span style={{ color: '#6366f1' }}>.</span>
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
    <footer className={cn('border-t border-white/[0.06]', className)}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-xs text-white/30 tracking-wide">
              Built for founders. Shipped for growth.
            </p>
            <p className="text-xs text-white/25 leading-relaxed max-w-[260px]">
              Fixed-price mobile apps, web platforms, and SaaS products.
              Full source code, shipped in weeks.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Explore
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Start a project */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Start a project
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              Tell us what you need. A real engineer replies within 24 hours.
            </p>
            <Link
              href={BOOKING_ENABLED ? CAL_URL : '/#contact'}
              {...(BOOKING_ENABLED ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_4px_24px_rgba(99,102,241,0.45)]"
              style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
            >
              {PRIMARY_CTA_LABEL}
            </Link>
            <a
              href="mailto:zohaibumar6@gmail.com"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              zohaibumar6@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Velt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
