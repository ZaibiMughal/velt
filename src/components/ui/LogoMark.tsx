import { useId } from 'react';

/**
 * The Hexspire icon mark: a dim outer hexagon framing a bright, solid
 * inner hexagon (indigo to violet). Chosen for holding up cleanly at
 * favicon scale, where thin or highly detailed marks tend to blur.
 *
 * Uses useId for the gradient so multiple instances on one page (e.g.
 * Navbar + Footer rendered simultaneously) don't collide on the same id.
 */
export default function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  const gradientId = `hexspire-logo-gradient-${useId()}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        d="M50,16 L79.4,33 L79.4,67 L50,84 L20.6,67 L20.6,33 Z"
        fill="none"
        stroke="#4c4c9e"
        strokeWidth="4"
      />
      <path
        d="M50,34 L63.9,42 L63.9,58 L50,66 L36.1,58 L36.1,42 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
