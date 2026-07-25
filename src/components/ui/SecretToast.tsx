'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * One-time easter egg: after real engagement (reaching the page bottom
 * or three minutes of dwell), a sticker speech bubble pops in from the
 * corner offering a secret; clicking it reveals that this site itself
 * was built in under 30 hours, which doubles as proof of the studio's
 * whole "live in weeks" pitch. Shown once per visitor, dismissible,
 * never blocks content.
 */

const STORAGE_KEY = 'hexspire-secret-seen';
const DWELL_MS = 3 * 60 * 1000;

export default function SecretToast() {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      cleanup();
    };

    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 300;
      if (nearBottom) show();
    };
    const timer = setTimeout(show, DWELL_MS);
    window.addEventListener('scroll', onScroll, { passive: true });

    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    return cleanup;
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="fixed left-4 bottom-24 md:left-6 md:bottom-6"
          style={{ zIndex: 95, maxWidth: 300 }}
        >
          {/* Speech bubble */}
          <div
            className="relative rounded-2xl px-5 py-4"
            style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-emphasis)' }}
          >
            {/* Tail */}
            <svg
              width="26"
              height="20"
              viewBox="0 0 26 20"
              className="absolute -bottom-[16px] left-7"
              aria-hidden="true"
            >
              <path d="M2 2 L10 18 L22 2 Z" fill="var(--color-surface)" stroke="var(--color-border-emphasis)" strokeWidth="2" strokeLinejoin="round" />
              <rect x="3" y="0" width="20" height="3" fill="var(--color-surface)" />
            </svg>

            {/* Close */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border-emphasis)', color: 'var(--color-text)' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.button
                  key="tease"
                  type="button"
                  onClick={() => setRevealed(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  transition={{ duration: 0.2 }}
                  className="block w-full text-left"
                  style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit' }}
                >
                  <span className="block text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    Wanna know a secret? 👀
                  </span>
                  <span className="mt-1 block text-xs" style={{ color: 'var(--color-muted)' }}>
                    Click me.
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="secret"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                >
                  <span className="block text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    This whole website was built in under{' '}
                    <span style={{ color: 'var(--color-primary)' }}>30 hours</span>. 🤫
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    Now imagine what we&apos;d ship for you in a few weeks.
                  </span>
                  <a
                    href="#contact"
                    onClick={dismiss}
                    className="mt-2.5 inline-block text-xs font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Let&apos;s find out →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sparkle accents that pop when the secret is revealed */}
          <AnimatePresence>
            {revealed && (
              <>
                {[
                  { x: -14, y: -18, d: 0, s: 16, c: 'var(--color-secondary)' },
                  { x: 290, y: -14, d: 0.12, s: 13, c: 'var(--color-primary)' },
                  { x: 270, y: 60, d: 0.24, s: 10, c: 'var(--color-secondary)' },
                ].map((sp, i) => (
                  <motion.svg
                    key={i}
                    width={sp.s}
                    height={sp.s}
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute"
                    style={{ left: sp.x, top: sp.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [0, 1.4, 1], rotate: 20 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: sp.d, duration: 0.45 }}
                  >
                    <path
                      d="M10 1 l2.2 6.8 6.8 2.2 -6.8 2.2 -2.2 6.8 -2.2 -6.8 -6.8 -2.2 6.8 -2.2 Z"
                      fill={sp.c}
                      stroke="var(--color-border-emphasis)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
