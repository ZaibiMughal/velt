import type { NextConfig } from "next";
import path from "path";

/* Every external host the site's code actually loads, kept in one place
   so the CSP doesn't silently drift from reality:
   - Supabase (epiqtwwszkrmmzyzhxzm.supabase.co) — portfolio/testimonial images
   - googletagmanager.com, connect.facebook.net — ad tracking tags
     (src/components/ui/AdTracking.tsx), only active once their env vars
     are set; listed now so turning them on later doesn't need a CSP change
   - Vercel Analytics is NOT listed separately: @vercel/analytics proxies
     its script and beacon through the site's own origin, so 'self' covers it
   - Fonts (Geist, Fraunces) are self-hosted via next/font/google at build
     time, never fetched from Google at runtime — no fonts.gstatic.com needed
   - cal.com is only ever a plain <a href> link, never embedded, so no
     frame-src entry is needed */
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required here: AdTracking.tsx renders inline
  // next/script blocks (gtag/meta-pixel init) with no nonce plumbing
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  // 'unsafe-inline' is required here: the whole site styles via React's
  // style={{...}} prop plus inline <style> blocks for keyframes/pseudo-
  // classes (CLAUDE.md "Tailwind + inline styles, mixed") — both forms
  // are governed by style-src, not just <style> tags
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://epiqtwwszkrmmzyzhxzm.supabase.co https://www.googletagmanager.com https://www.facebook.com",
  // Video testimonials (Testimonials.tsx) stream straight from Supabase Storage
  "media-src 'self' https://epiqtwwszkrmmzyzhxzm.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Portfolio screenshots only change via deliberate content updates, so
    // keep optimized variants cached at the edge for 30 days instead of
    // re-fetching whenever the upstream max-age (1h) lapses
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        // Supabase Storage — partner logos + portfolio assets
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
