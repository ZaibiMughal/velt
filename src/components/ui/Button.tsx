'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white border-2 border-[var(--color-text)] font-semibold',
  secondary:
    'bg-transparent border-2 border-[var(--color-border-emphasis)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] font-semibold',
  ghost:
    'bg-transparent border-2 border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-muted)] font-medium',
  dark:
    'bg-[var(--color-text)] hover:bg-black text-[var(--color-bg)] border-2 border-[var(--color-text)] font-semibold',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2 rounded-full transition-colors duration-150 select-none',
        'disabled:opacity-40 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
