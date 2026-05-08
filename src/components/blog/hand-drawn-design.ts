import type { CSSProperties } from 'react';

export const handDrawnColors = {
  background: '#fdfbf7',
  foreground: '#2d2d2d',
  muted: '#e5e0d8',
  accent: '#ff4d4d',
  secondary: '#2d5da1',
  border: '#2d2d2d',
} as const;

export const handDrawnRadii = {
  wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
  wobblyMd: '68% 32% 57% 43% / 39% 62% 38% 61%',
  blob: '56% 44% 63% 37% / 39% 57% 43% 61%',
  tag: '77% 23% 59% 41% / 37% 67% 33% 63%',
} as const;

export const handDrawnShadows = {
  hard: '4px 4px 0px 0px #2d2d2d',
  hardHover: '2px 2px 0px 0px #2d2d2d',
  emphasis: '8px 8px 0px 0px #2d2d2d',
} as const;

export function wobblyRadius(key: keyof typeof handDrawnRadii): CSSProperties {
  return { borderRadius: handDrawnRadii[key] };
}
