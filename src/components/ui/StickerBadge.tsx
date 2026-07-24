import { ReactNode } from 'react';

interface StickerBadgeProps {
  children: ReactNode;
  fill?: string;
  rotate?: number;
  size?: number;
}

/**
 * A flat "sticker" icon badge: a black-outlined color tile sitting in front
 * of a slightly rotated cream card of the same shape, mimicking the
 * die-cut-outline effect of a vinyl sticker peeled off a sheet. This is the
 * one recurring illustration motif used sparingly across the 2D redesign
 * (Hero product cards, Trust anchor) rather than bespoke character art.
 */
export default function StickerBadge({ children, fill = 'var(--color-bg-accent)', rotate = -6, size = 44 }: StickerBadgeProps) {
  return (
    <div className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute rounded-xl"
        style={{
          inset: -3,
          background: 'var(--color-bg)',
          border: '2px solid var(--color-border-emphasis)',
          transform: `rotate(${rotate}deg)`,
        }}
        aria-hidden="true"
      />
      <div
        className="relative rounded-xl flex items-center justify-center w-full h-full"
        style={{ background: fill, border: '2px solid var(--color-border-emphasis)' }}
      >
        {children}
      </div>
    </div>
  );
}
