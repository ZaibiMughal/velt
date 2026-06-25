'use client';

import { HTMLAttributes, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right';

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: Direction;
}

function getInitial(direction: Direction) {
  switch (direction) {
    case 'up':
      return { opacity: 0, y: 20 };
    case 'left':
      return { opacity: 0, x: -20 };
    case 'right':
      return { opacity: 0, x: 20 };
  }
}

function getAnimate(direction: Direction) {
  switch (direction) {
    case 'up':
      return { opacity: 1, y: 0 };
    case 'left':
      return { opacity: 1, x: 0 };
    case 'right':
      return { opacity: 1, x: 0 };
  }
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  ...rest
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={inView ? getAnimate(direction) : getInitial(direction)}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
      {...(rest as React.ComponentPropsWithoutRef<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
