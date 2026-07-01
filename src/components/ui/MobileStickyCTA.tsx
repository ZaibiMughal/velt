'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Slim bottom CTA bar, mobile only. Appears after the visitor scrolls past
 * the hero, hides while the contact section is on screen so it never covers
 * the form.
 */
export default function MobileStickyCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector('#contact');
    if (!el) {
      setContactInView(false);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  function onClick() {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  }

  const show = scrolled && !contactInView;

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 14,
        left: 16,
        right: 16,
        zIndex: 90,
        transform: show ? 'translateY(0)' : 'translateY(90px)',
        opacity: show ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        style={{
          width: '100%',
          padding: '15px 24px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(99,102,241,0.5), 0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        Book a Strategy Call
      </button>
    </div>
  );
}
