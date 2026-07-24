'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import LogoMark from '@/components/ui/LogoMark';
import Wordmark from '@/components/ui/Wordmark';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
      style={{ textDecoration: 'none', color: 'var(--color-text)' }}
    >
      <LogoMark size={26} />
      <Wordmark />
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-[5px] w-5 h-5">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] w-full origin-center"
        style={{ backgroundColor: 'var(--color-text)' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] w-full"
        style={{ backgroundColor: 'var(--color-text)' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] w-full origin-center"
        style={{ backgroundColor: 'var(--color-text)' }}
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleOverlayKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!mobileOpen) return;
    if (e.key === 'Escape') { setMobileOpen(false); return; }
    if (e.key !== 'Tab') return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first)?.focus();
    }
  }, [mobileOpen]);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/' + href;
    }
  }

  function handleBookingClick() {
    if (BOOKING_ENABLED) {
      setMobileOpen(false);
      window.open(CAL_URL, '_blank', 'noopener');
    } else {
      handleNavClick('#contact');
    }
  }

  return (
    <>
      {/* Floating cream pill, inset from the viewport edges at all times —
          it stays a "card on top of the page" rather than an edge-to-edge bar. */}
      <header
        className="pointer-events-auto fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6"
        style={{
          zIndex: 65,
          borderRadius: '20px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-muted)',
        }}
      >
        <div className="px-5 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={handleBookingClick}
              className="hidden md:inline-flex"
            >
              {PRIMARY_CTA_LABEL}
            </Button>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — inverted to the dark panel color for a clear "menu open" state */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={overlayRef}
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10"
            style={{ background: 'var(--color-bg-dark)' }}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={-1}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-semibold transition-colors duration-150"
                style={{ color: 'var(--color-text-inverse)' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.2 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookingClick}
              >
                {PRIMARY_CTA_LABEL}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
