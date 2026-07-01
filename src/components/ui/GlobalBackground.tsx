'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  depth: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  dx: number;
  dy: number;
  r: number;
  g: number;
  b: number;
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced-motion preference: render nothing animated
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId: number;
    let scrollY = 0;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    const stars: Star[] = [];

    const seed = () => {
      stars.length = 0;
      const w = canvas.width;
      const h = canvas.height;

      // Far layer — tiny white stars, barely visible
      for (let i = 0; i < 90; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          depth: 0.05 + Math.random() * 0.2,
          size: 0.4 + Math.random() * 0.5,
          baseOpacity: 0.03 + Math.random() * 0.07,
          twinkleSpeed: 0.4 + Math.random() * 0.6,
          twinkleOffset: Math.random() * Math.PI * 2,
          dx: (Math.random() - 0.5) * 0.06,
          dy: -0.015 - Math.random() * 0.025,
          r: 200, g: 210, b: 255,
        });
      }

      // Mid layer — indigo particles
      for (let i = 0; i < 35; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          depth: 0.25 + Math.random() * 0.35,
          size: 0.7 + Math.random() * 1.1,
          baseOpacity: 0.05 + Math.random() * 0.1,
          twinkleSpeed: 0.2 + Math.random() * 0.35,
          twinkleOffset: Math.random() * Math.PI * 2,
          dx: (Math.random() - 0.5) * 0.1,
          dy: -0.02 - Math.random() * 0.04,
          r: 99, g: 102, b: 241,
        });
      }

      // Near layer — glowing violet dots with parallax
      for (let i = 0; i < 18; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          depth: 0.6 + Math.random() * 0.4,
          size: 1.2 + Math.random() * 1.8,
          baseOpacity: 0.07 + Math.random() * 0.12,
          twinkleSpeed: 0.15 + Math.random() * 0.2,
          twinkleOffset: Math.random() * Math.PI * 2,
          dx: (Math.random() - 0.5) * 0.14,
          dy: -0.025 - Math.random() * 0.05,
          r: 139, g: 92, b: 246,
        });
      }
    };
    seed();
    window.addEventListener('resize', seed);

    const draw = (ts: number) => {
      const t = ts * 0.001;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        // Drift
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < -4) s.x = w + 4;
        if (s.x > w + 4) s.x = -4;
        if (s.y < -4) s.y = h + 4;
        if (s.y > h + 4) s.y = -4;

        // Twinkle
        const twinkle = 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.baseOpacity * twinkle;

        // Parallax — near stars shift more on scroll
        const parallaxShift = (scrollY * s.depth * 0.12) % h;
        const drawY = ((s.y - parallaxShift) % h + h) % h;

        const { r, g, b } = s;

        // Glow halo for near-layer stars
        if (s.depth > 0.55) {
          const grd = ctx.createRadialGradient(s.x, drawY, 0, s.x, drawY, s.size * 5);
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.45})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(s.x, drawY, s.size * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    // Pause the loop entirely while the tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animId);
      } else if (!running) {
        running = true;
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', seed);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
