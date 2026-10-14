import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LOGO_PIECES, LOGO_VIEWBOX } from './LogoMark';
import { navigate } from '../router';

/**
 * Depth of each piece: how far it drifts with the pointer (px in viewBox
 * units) and how far it lifts when the box is hovered. The flaps lift,
 * the body stays planted — the box "opens" for you.
 */
const MOTION = {
  barL: { dx: 3, dy: 2, lift: 0 },
  barM: { dx: 3, dy: 2, lift: 0 },
  face: { dx: 4, dy: 3, lift: 0 },
  flapL: { dx: -10, dy: -7, lift: -16 },
  flapR: { dx: 10, dy: -7, lift: -20 },
  flapB: { dx: 6, dy: -10, lift: -26 },
  tri: { dx: 8, dy: -8, lift: -12 }
};

function HeroMark() {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--mx', Math.max(-1, Math.min(1, x)).toFixed(3));
    el.style.setProperty('--my', Math.max(-1, Math.min(1, y)).toFixed(3));
  };
  const onEnter = () => ref.current?.style.setProperty('--lift', '1');
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--lift', '0');
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  return (
    <div
      className="hero-mark"
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <svg viewBox={LOGO_VIEWBOX} role="img" aria-label="The intheboxstudio box mark, lid open">
        {LOGO_PIECES.map((p) => (
          <path
            key={p.n}
            d={p.d}
            className="hero-piece"
            style={{ '--dx': MOTION[p.n].dx, '--dy': MOTION[p.n].dy, '--ly': MOTION[p.n].lift }}
          />
        ))}
      </svg>
    </div>
  );
}

const METRICS = [
  { value: 'React 18', label: 'Hand-coded, modern stack' },
  { value: '< 1.0s', label: 'Target page load' },
  { value: '100%', label: 'Source code and IP is yours' },
  { value: '< 24h', label: 'Reply time on WhatsApp' }
];

export default function Hero({ onStartClick }) {
  // Let the page-load reveal wait until the intro has finished
  const [ready, setReady] = useState(() => typeof window !== 'undefined' && !!window.__itbDone);

  useEffect(() => {
    if (window.__itbDone) {
      setReady(true);
      return;
    }
    const done = () => setReady(true);
    document.addEventListener('itb:done', done, { once: true });
    return () => document.removeEventListener('itb:done', done);
  }, []);

  const goServices = () => navigate('/services');

  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">Your website, brand and growth, packed in one box.</h1>
          <p className="hero-lede">
            Hand-coded websites, branding, SEO, ads and the software behind them. One studio, clear pricing, and you own all of it.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-light" onClick={onStartClick}>
              <span>Start a project</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-ghost" onClick={goServices}>
              <span>Explore services</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-stage">
            <HeroMark />
            <span className="chip chip-1" style={{ '--r': '-6deg' }}>&lt; 1.0s load</span>
            <span className="chip chip-2" style={{ '--r': '5deg' }}>100/100 Lighthouse</span>
            <span className="chip chip-3" style={{ '--r': '-3deg' }}>You own the code</span>
          </div>
          <p className="hero-tagline">We put your website in a box.</p>
        </div>
      </div>

      <div className="wrap">
        <dl className="metrics">
          {METRICS.map((m) => (
            <div className="metric" key={m.label}>
              <dt>{m.value}</dt>
              <dd>{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
