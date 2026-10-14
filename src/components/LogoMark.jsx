import React from 'react';

/**
 * INTheBOX Studio brand mark — vector redraw of the supplied logo.
 * Seven pieces so the intro and the hero can move them independently.
 * `c` is each piece's centre in viewBox units (used as rotation origin by GSAP).
 */
export const LOGO_VIEWBOX = '8 8 654 546';

export const LOGO_PIECES = [
  { n: 'barL',  c: '170 359', d: 'M135 231 135 444 206 484 206 274Z' },
  { n: 'barM',  c: '269 411', d: 'M230 281 230 496 308 541 308 325Z' },
  { n: 'face',  c: '436 384', d: 'M540 222 467 257 467 341 409 368 409 284 332 321 332 546 409 509 409 432 467 404 467 481 540 444Z' },
  { n: 'flapL', c: '170 170', d: 'M19 138 125 86 320 202 206 257Z' },
  { n: 'flapR', c: '450 208', d: 'M650 148 569 113 253 264 332 305Z' },
  { n: 'flapB', c: '448 90',  d: 'M348 20 348 107 439 160 550 108Z' },
  { n: 'tri',   c: '311 148', d: 'M337 191 337 109 261 144Z' }
];

/** Static mark. Colour follows `currentColor`. */
export default function LogoMark({ className = '', title, children, ...rest }) {
  return (
    <svg
      className={className}
      viewBox={LOGO_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      <g fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        {LOGO_PIECES.map((p) => (
          <path key={p.n} data-n={p.n} d={p.d} />
        ))}
      </g>
      {children}
    </svg>
  );
}
