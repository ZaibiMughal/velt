import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  size?: BadgeSize;
}

export default function Badge({
  dot = false,
  size = 'sm',
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 text-white/60 font-medium',
        size === 'sm' ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5',
        className,
      )}
      {...rest}
    >
      {dot && (
        <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ backgroundColor: '#6366f1' }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: '#6366f1' }}
          />
        </span>
      )}
      {children}
    </span>
  );
}
