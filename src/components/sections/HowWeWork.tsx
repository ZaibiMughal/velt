'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { processSteps } from '@/data/process';

function StepText({ step, alignRight }: { step: typeof processSteps[0]; alignRight?: boolean }) {
  return (
    <div className={alignRight ? 'text-right max-w-xs' : 'max-w-xs'}>
      <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: 'var(--color-primary)' }}>
        {step.step}
      </span>
      <h3 className="text-base font-bold mt-1" style={{ color: 'var(--color-text)' }}>{step.title}</h3>
      <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{step.description}</p>
    </div>
  );
}

/**
 * Desktop: steps alternate left/right of a centered spine. Mobile: the
 * alternating layout squeezes text into cramped half-columns, so every
 * step sits right of a left-hand spine instead.
 */
function ZigItem({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center gap-0" style={{ minHeight: '90px' }}>
      {/* Left content — desktop only, even steps */}
      <div className="hidden md:flex flex-1 justify-end pr-8">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepText step={step} alignRight />
          </motion.div>
        )}
      </div>

      {/* Spine node — flips from outline to solid flat fill on scroll-in */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: '40px' }}>
        <motion.div
          className="relative z-10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '16px',
            height: '16px',
            background: inView ? 'var(--color-primary)' : 'transparent',
            border: `2px solid ${inView ? 'var(--color-border-emphasis)' : 'var(--color-border-muted)'}`,
            transition: 'border-color 0.4s, background-color 0.4s',
          }}
        />
      </div>

      {/* Right content — all steps on mobile, odd steps on desktop */}
      <div className="flex-1 pl-6 md:pl-8">
        <motion.div
          className={isLeft ? 'md:hidden' : ''}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <StepText step={step} />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Hand-drawn wavy spine, replacing the old straight gradient line. Draws
 * itself in once the whole timeline scrolls into view.
 *
 * The path is generated in real pixel space from the measured element
 * height. The previous fixed 100-unit viewBox stretched to fit, which
 * also stretched the dash pattern: on mobile, where the timeline is much
 * taller, the dotted line degraded into a few isolated specks.
 */
function WavySpine() {
  const ref = useRef<SVGSVGElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.clientHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // One gentle S-curve every 72px, alternating sides around the center.
  const SEG = 72;
  let d = 'M20,0';
  for (let y = 0; y < height; y += SEG) {
    const bulge = (y / SEG) % 2 === 0 ? 30 : 10;
    d += ` C${bulge},${y + SEG * 0.33} ${40 - bulge},${y + SEG * 0.66} 20,${Math.min(y + SEG, height)}`;
  }

  return (
    <svg
      ref={ref}
      className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2"
      style={{ width: '40px', height: '100%' }}
      viewBox={`0 0 40 ${Math.max(height, 1)}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Plain mount fade, no viewport detection: a pathLength draw-in
          overwrites stroke-dasharray (killing the dot pattern), and
          in-view observation proved unreliable for this absolutely
          positioned SVG. The spine is decoration; being simply present
          when the section scrolls in is fine. */}
      {height > 0 && (
        <motion.path
          d={d}
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 8"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
    </svg>
  );
}

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-16">
          <Badge>Process</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
            How we work
          </h2>
        </AnimatedSection>

        <div className="relative">
          <WavySpine />

          <div className="flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <ZigItem key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
