import React, { useEffect, useRef, useState } from 'react';
import { LOGO_PIECES, LOGO_VIEWBOX } from './LogoMark';

/**
 * Entrance animation — the new INTheBOX mark assembles piece by piece,
 * the box opens, the wordmark rises out of it, then the camera dives
 * into the open mouth of the box to reveal the site.
 * Powered by GSAP (loaded from the CDN in index.html).
 */
const MOUTH = '400 165'; // the dark opening between the flaps (viewBox units)

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const SHOW_ONCE_PER_SESSION = false; // true = only show on a visitor's first page load
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;

    const finish = () => {
      html.classList.remove('itb-lock');
      window.__itbDone = true;
      setIsVisible(false);
      document.dispatchEvent(new CustomEvent('itb:done'));
    };

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = SHOW_ONCE_PER_SESSION && sessionStorage.getItem('itb-seen');
    } catch (e) {}

    if (reduce || seen) {
      finish();
      return;
    }

    const run = (gsap) => {
      try {
        sessionStorage.setItem('itb-seen', '1');
      } catch (e) {}
      html.classList.add('itb-lock');

      const q = (s) => root.querySelector(s);
      const P = (n) => q(`[data-n="${n}"]`);
      const all = root.querySelectorAll('.itb-p');
      const g = q('.itb-g');
      const texts = root.querySelectorAll('.itb-name, .itb-sub, .itb-tag');

      return gsap.context(() => {
        // start: outlines only, nothing drawn
        gsap.set(all, { fillOpacity: 0, strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(texts, { yPercent: 115 });
        gsap.set(g, { svgOrigin: MOUTH });

        // where each piece travels from (viewBox units)
        const from = {
          barL: { y: 150 },
          barM: { y: 150 },
          face: { y: 150, x: 40 },
          flapL: { x: -220, y: -150, rotation: -10 },
          flapR: { x: 220, y: -150, rotation: 8 },
          flapB: { y: -200, rotation: 4 },
          tri: { scale: 0 }
        };
        const order = ['barL', 'barM', 'face', 'flapL', 'flapR', 'flapB', 'tri'];

        const tl = gsap.timeline({ onComplete: finish });
        tlRef.current = tl;

        order.forEach((n, i) => {
          const el = P(n);
          if (!el) return;
          const piece = LOGO_PIECES.find((p) => p.n === n);
          const t = 0.15 + i * 0.16;
          const f = Object.assign({ svgOrigin: piece.c, opacity: 0 }, from[n]);
          tl.from(el, Object.assign({}, f, { duration: 1.3, ease: n === 'tri' ? 'back.out(2)' : 'expo.out' }), t);
          tl.to(el, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, t);
          tl.to(el, { fillOpacity: 1, duration: 0.6, ease: 'power1.out' }, t + 0.8);
        });

        tl.to(all, { strokeOpacity: 0, duration: 0.5 }, 2.4)
          // the box breathes open
          .to([P('flapL'), P('flapB')], { y: -12, x: (i) => (i ? 5 : -7), duration: 0.5, ease: 'power2.out', yoyo: true, repeat: 1 }, 2.5)
          .to(P('flapR'), { y: -12, x: 7, duration: 0.5, ease: 'power2.out', yoyo: true, repeat: 1 }, 2.55)
          // wordmark + tagline rise
          .to(texts, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.12 }, 2.6)
          // dive in and reveal
          .to(texts, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 4.3)
          .to(g, { scale: 60, duration: 1.3, ease: 'power4.in' }, 4.4)
          .to(root, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 5.35);
      }, rootRef);
    };

    let ctx = null;
    let poll = null;
    if (window.gsap) {
      ctx = run(window.gsap);
    } else {
      // GSAP loads from the CDN; if it never arrives, don't trap the visitor
      const giveUp = setTimeout(() => {
        clearInterval(poll);
        finish();
      }, 4000);
      poll = setInterval(() => {
        if (window.gsap && rootRef.current) {
          clearInterval(poll);
          clearTimeout(giveUp);
          ctx = run(window.gsap);
        }
      }, 30);
    }

    return () => {
      if (poll) clearInterval(poll);
      if (ctx) ctx.revert();
      if (tlRef.current) tlRef.current.kill();
      html.classList.remove('itb-lock');
    };
  }, []);

  const handleSkip = () => {
    if (tlRef.current) tlRef.current.kill();
    const root = rootRef.current;
    const gsap = window.gsap;
    const finish = () => {
      document.documentElement.classList.remove('itb-lock');
      window.__itbDone = true;
      setIsVisible(false);
      document.dispatchEvent(new CustomEvent('itb:done'));
    };
    if (root && gsap) {
      gsap.to(root, { opacity: 0, duration: 0.45, ease: 'power1.out', onComplete: finish });
    } else {
      finish();
    }
  };

  if (!isVisible) return null;

  return (
    <div id="itb-intro" ref={rootRef} role="presentation">
      <svg className="itb-logo" viewBox={LOGO_VIEWBOX} aria-hidden="true">
        <g className="itb-g">
          {LOGO_PIECES.map((p) => (
            <path key={p.n} className="itb-p" data-n={p.n} pathLength="1" d={p.d} />
          ))}
        </g>
      </svg>

      <div className="itb-text">
        <div className="itb-mask"><span className="itb-name">INTheBOX</span></div>
        <div className="itb-mask"><span className="itb-sub">STUDIO</span></div>
        <div className="itb-mask"><span className="itb-tag">We put your website in a box.</span></div>
      </div>

      <button className="itb-skip" type="button" onClick={handleSkip}>Skip intro</button>
    </div>
  );
}
