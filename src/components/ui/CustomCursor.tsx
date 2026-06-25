'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 20 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  // Runs before paint on client — avoids any flash of invisible cursor on desktop
  useLayoutEffect(() => {
    setIsMobile(
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    );
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
      );
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [isMobile, dotX, dotY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot — follows cursor exactly via MotionValue (no React re-renders) */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {/* Ring — spring lag follow */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          width: 28,
          height: 28,
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 20 }, opacity: { duration: 0.15 } }}
      />
    </>
  );
}
