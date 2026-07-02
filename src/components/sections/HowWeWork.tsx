'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { processSteps } from '@/data/process';

function ZigItem({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center gap-0" style={{ minHeight: '90px' }}>
      {/* Left content */}
      <div className="flex-1 flex justify-end pr-8">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-right max-w-xs"
          >
            <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#6366f1' }}>
              {step.step}
            </span>
            <h3 className="text-base font-bold text-white mt-1">{step.title}</h3>
            <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{step.description}</p>
          </motion.div>
        )}
      </div>

      {/* Center spine dot */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: '40px' }}>
        <motion.div
          className="relative z-10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '14px',
            height: '14px',
            background: inView ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
            border: `2px solid ${inView ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: inView ? '0 0 14px rgba(99,102,241,0.7)' : 'none',
            transition: 'border-color 0.5s, box-shadow 0.5s, background 0.5s',
          }}
        />
      </div>

      {/* Right content */}
      <div className="flex-1 pl-8">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs"
          >
            <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#6366f1' }}>
              {step.step}
            </span>
            <h3 className="text-base font-bold text-white mt-1">{step.title}</h3>
            <p className="text-sm text-white/40 mt-0.5 leading-relaxed">{step.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="flex flex-col items-center text-center gap-5 mb-16">
          <Badge>Process</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">How we work</h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical spine line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '50%',
              width: '1px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25) 10%, rgba(99,102,241,0.25) 90%, transparent)',
            }}
          />

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
