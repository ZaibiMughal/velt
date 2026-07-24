import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeSize = 'sm' | 'md';
type BadgeTone = 'light' | 'dark';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  size?: BadgeSize;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  light: 'bg-[var(--color-surface)] border-[var(--color-border-emphasis)] text-[var(--color-text)]',
  dark: 'bg-transparent border-[var(--color-text-inverse)] text-[var(--color-text-inverse)]',
};

export default function Badge({
  dot = false,
  size = 'sm',
  tone = 'light',
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border-2 font-semibold uppercase tracking-wide',
        toneClasses[tone],
        size === 'sm' ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5',
        className,
      )}
      {...rest}
    >
      {dot && (
        <span
          className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
      )}
      {children}
    </span>
  );
}
