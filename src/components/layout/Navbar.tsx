'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from '@/components/ui/Button';
import { CAL_URL, BOOKING_ENABLED, PRIMARY_CTA_LABEL } from '@/lib/site';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
];

/* left/right transitions are GPU-accelerated and perfectly symmetric
   in both scroll directions — no width/flex measurement involved */
const PILL_TRANSITION = [
  'top 0.55s cubic-bezier(0.16,1,0.3,1)',
  'left 0.55s cubic-bezier(0.16,1,0.3,1)',
  'right 0.55s cubic-bezier(0.16,1,0.3,1)',
  'border-radius 0.55s cubic-bezier(0.16,1,0.3,1)',
  'background 0.45s ease',
  'backdrop-filter 0.45s ease',
  '-webkit-backdrop-filter 0.45s ease',
  'box-shadow 0.45s ease',
  'border-color 0.45s ease',
].join(', ');

function Logo() {
  return (
    <Link href="/" className="text-xl font-extrabold text-white tracking-tight cursor-none" style={{ textDecoration: 'none' }}>
      velt<span style={{ color: '#6366f1' }}>.</span>
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-[5px] w-5 h-5">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-white origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-white origin-center"
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

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
      {/* Direct fixed positioning — left/right animate symmetrically, no flex/width math */}
        <header
          className="pointer-events-auto"
          style={{
            position: 'fixed',
            zIndex: 50,
            /* left/right shrink inward on scroll → creates the floating pill */
            top:   scrolled ? '10px'  : '0px',
            left:  scrolled ? '5%'   : '0px',
            right: scrolled ? '5%'   : '0px',
            borderRadius: scrolled ? '14px' : '0px',

            /* Glass — fades in from fully transparent */
            background:           scrolled ? 'rgba(9,9,11,0.72)' : 'rgba(9,9,11,0)',
            backdropFilter:       scrolled ? 'blur(22px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'blur(0px)',
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0)'}`,
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 0px 0px rgba(0,0,0,0)',

            transition: PILL_TRANSITION,
          }}
        >
          <div className="px-6 h-16 flex items-center justify-between">
            <Logo />

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-none"
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
                className="md:hidden text-white cursor-none"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={overlayRef}
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10"
            style={{
              background: 'rgba(9,9,11,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={-1}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.07, duration: 0.25 }}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-semibold text-white/70 hover:text-white transition-colors duration-200 cursor-none"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ delay: NAV_LINKS.length * 0.07, duration: 0.25 }}
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
