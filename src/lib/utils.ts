import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const f = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(l1: number, l2: number): number {
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function blend(rgb: [number, number, number], alpha: number, bg: [number, number, number]): [number, number, number] {
  return [
    rgb[0] * alpha + bg[0] * (1 - alpha),
    rgb[1] * alpha + bg[1] * (1 - alpha),
    rgb[2] * alpha + bg[2] * (1 - alpha),
  ];
}

const PAGE_BG: [number, number, number] = hexToRgb('#f7f8fa');
const WHITE: [number, number, number] = [255, 255, 255];

/**
 * Each case study carries its own theme_color for accents, reused in three
 * ways: as literal text on a white card, as literal text on the porcelain
 * page background, and as white text sitting directly on the raw color as
 * a solid fill (buttons, badges). A few colors are too light for one or
 * more of these and read below 4.5:1 (e.g. NutritionUp's #1FC65D reaches
 * only 2.26:1 as text on white). Darkens the color just enough to clear
 * 4.5:1 against all three contexts at once, preserving its hue/identity,
 * and returns colors that already pass unchanged. Only use this where
 * theme_color becomes real text or a solid fill under white text — a
 * `border` or a `background: rgba(t, 0.1)` tint stays on the raw color,
 * those are decorative and don't need it.
 */
export function accessibleOnWhite(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const tintBg = blend([r, g, b], 0.1, PAGE_BG); // the badges' rgba(t, 0.1) background, from the original color
  const round = (k: number): [number, number, number] => [Math.round(r * k), Math.round(g * k), Math.round(b * k)];
  const passes = (k: number, threshold: number): boolean => {
    const [rr, gg, bb] = round(k);
    const L = relativeLuminance(rr, gg, bb);
    return (
      contrastRatio(L, relativeLuminance(...WHITE)) >= threshold &&
      contrastRatio(L, relativeLuminance(...PAGE_BG)) >= threshold &&
      contrastRatio(L, relativeLuminance(...tintBg)) >= threshold
    );
  };
  if (passes(1, 4.5)) return hex;
  let k = 1;
  while (k > 0.05 && !passes(k, 4.55)) k -= 0.005;
  const [rr, gg, bb] = round(k);
  return `#${[rr, gg, bb].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}
