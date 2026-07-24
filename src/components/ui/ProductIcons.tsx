/**
 * Small single-stroke line icons used inside StickerBadge tiles.
 * Consistent stroke weight, no fill, matching the flat 2D icon convention.
 */

const common = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'var(--color-text)',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function PhoneIcon() {
  return (
    <svg {...common}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

export function LayersIcon() {
  return (
    <svg {...common}>
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 13 12 18 21 13" />
      <polyline points="3 17.5 12 22.5 21 17.5" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg {...common}>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg {...common}>
      <line x1="5" y1="21" x2="5" y2="12" />
      <line x1="12" y1="21" x2="12" y2="6" />
      <line x1="19" y1="21" x2="19" y2="15" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}
