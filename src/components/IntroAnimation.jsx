import React, { useEffect, useRef, useState } from 'react';

/**
 * Entrance Animation for INTheBOX Studio
 * Pure black-and-white vector SVG entrance animation powered by GSAP.
 */
export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const SHOW_ONCE_PER_SESSION = false; // true = only show the intro on a visitor's first page load
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;

    const cleanup = () => {
      html.classList.remove('itb-lock');
      setIsVisible(false);
      document.dispatchEvent(new CustomEvent('itb:done'));
    };

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = SHOW_ONCE_PER_SESSION && sessionStorage.getItem('itb-seen');
    } catch (e) {}

    if (reduce || seen) {
      cleanup();
      return;
    }

    const runTimeline = (gsapInstance) => {
      try {
        sessionStorage.setItem('itb-seen', '1');
      } catch (e) {}
      html.classList.add('itb-lock');

      const q = (s) => root.querySelector(s);
      const P = (n) => q(`[data-n="${n}"]`);
      const all = root.querySelectorAll('.itb-p');
      const g = q('.itb-g');
      const texts = root.querySelectorAll('.itb-name, .itb-tag');

      // each piece rotates around its own centre
      function origin(el) {
        return el ? el.getAttribute('data-c') : null;
      }

      // GSAP Context to allow clean reversion and strict-mode safety
      const ctx = gsapInstance.context(() => {
        // starting state: outlines only, nothing drawn yet
        gsapInstance.set(all, { fillOpacity: 0, strokeDasharray: 1, strokeDashoffset: 1 });
        gsapInstance.set(texts, { yPercent: 115 });
        gsapInstance.set(g, { svgOrigin: '768 352' }); // the open mouth of the box (used for the final dive)

        // where each piece comes from (SVG units)
        const from = {
          barL:  { y: 170 },
          barM:  { y: 170 },
          face:  { y: 170, x: 40 },
          flapL: { x: -260, y: -170, rotation: -10 },
          flapR: { x: 260,  y: -170, rotation: 8 },
          flapB: { y: -230, rotation: 4 },
          tri:   { scale: 0 }
        };
        const order = ['barL', 'barM', 'face', 'flapL', 'flapR', 'flapB', 'tri'];

        const tl = gsapInstance.timeline({
          onComplete: () => {
            cleanup();
          }
        });
        tlRef.current = tl;

        order.forEach((n, i) => {
          const el = P(n);
          if (!el) return;
          const t = 0.15 + i * 0.16;
          const f = Object.assign({ svgOrigin: origin(el), opacity: 0 }, from[n]);

          // piece slides into place
          tl.from(el, Object.assign({}, f, { duration: 1.3, ease: n === 'tri' ? 'back.out(2)' : 'expo.out' }), t);
          // outline draws itself
          tl.to(el, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, t);
          // then fills solid white
          tl.to(el, { fillOpacity: 1, duration: 0.6, ease: 'power1.out' }, t + 0.8);
        });

        // outlines melt into the fill
        tl.to(all, { strokeOpacity: 0, duration: 0.5 }, 2.4)

          // the box "breathes" open: flaps lift a little, then settle
          .to([P('flapL'), P('flapB')], { y: -14, x: (i) => (i ? 6 : -8), duration: 0.5, ease: 'power2.out', yoyo: true, repeat: 1 }, 2.5)
          .to(P('flapR'), { y: -14, x: 8, duration: 0.5, ease: 'power2.out', yoyo: true, repeat: 1 }, 2.55)

          // name + tagline rise out of the box
          .to(texts, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.12 }, 2.6)

          // dive into the box and reveal the site
          .to(texts, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 4.3)
          .to(g, { scale: 60, duration: 1.3, ease: 'power4.in' }, 4.4)
          .to(root, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 5.35);
      }, rootRef);

      return ctx;
    };

    let ctx = null;
    let checkInterval = null;

    if (window.gsap) {
      ctx = runTimeline(window.gsap);
    } else {
      checkInterval = setInterval(() => {
        if (window.gsap && rootRef.current) {
          clearInterval(checkInterval);
          ctx = runTimeline(window.gsap);
        }
      }, 30);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (ctx) ctx.revert();
      if (tlRef.current) tlRef.current.kill();
      html.classList.remove('itb-lock');
    };
  }, []);

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    const root = rootRef.current;
    const html = document.documentElement;
    const gsap = window.gsap;

    const finish = () => {
      html.classList.remove('itb-lock');
      setIsVisible(false);
      document.dispatchEvent(new CustomEvent('itb:done'));
    };

    if (root && gsap) {
      gsap.to(root, {
        opacity: 0,
        duration: 0.45,
        ease: 'power1.out',
        onComplete: finish
      });
    } else {
      finish();
    }
  };

  if (!isVisible) return null;

  return (
    <div id="itb-intro" ref={rootRef} role="presentation">
      <svg className="itb-logo" viewBox="300 117 937 773" aria-hidden="true">
        <g className="itb-g">
          <path className="itb-p" data-n="barL" data-c="506 600" pathLength="1" fillRule="evenodd" d="M459 431 458 711 556 770 557 492Z" />
          <path className="itb-p" data-n="barM" data-c="662 681" pathLength="1" fillRule="evenodd" d="M595 495 593 791 732 868 733 574 729 569Z" />
          <path className="itb-p" data-n="face" data-c="918 649" pathLength="1" fillRule="evenodd" d="M1070 443 1060 439 1047 439 1026 445 761 572 761 866 1034 755 1057 742 1072 727 1081 703 1080 633 1068 614 1046 606 1071 581 1081 557 1081 461 1077 450ZM1003 664 1004 694 1002 701 994 709 845 774 839 772 839 728 990 661 999 660ZM1002 532 1004 578 998 588 848 656 839 655 839 605 843 601 991 531Z" />
          <path className="itb-p" data-n="flapL" data-c="523 351" pathLength="1" fillRule="evenodd" d="M320 304 323 312 569 474 731 395 731 391 475 232 465 233Z" />
          <path className="itb-p" data-n="flapR" data-c="926 408" pathLength="1" fillRule="evenodd" d="M1215 320 1207 314 1093 266 921 349 641 478 640 482 753 548 766 552 1084 396 1211 329Z" />
          <path className="itb-p" data-n="flapB" data-c="886 243" pathLength="1" fillRule="evenodd" d="M773 145 773 267 904 334 915 335 1060 261 1059 257 792 139 782 137Z" />
          <path className="itb-p" data-n="tri" data-c="724 327" pathLength="1" fillRule="evenodd" d="M761 388 760 272 653 321 660 329Z" />
        </g>
      </svg>

      <div className="itb-text">
        <div className="itb-mask"><span className="itb-name">intheboxstudio</span></div>
        <div className="itb-mask"><span className="itb-tag">We put your website in a box.</span></div>
      </div>

      <button className="itb-skip" type="button" onClick={handleSkip}>Skip</button>
    </div>
  );
}
