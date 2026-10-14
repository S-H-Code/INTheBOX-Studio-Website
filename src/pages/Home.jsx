import React from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import Hero from '../components/Hero';
import LogoMark from '../components/LogoMark';
import { Link } from '../router';
import useReveal from '../useReveal';
import { SERVICES, PACKAGES } from '../data';

const TICKER = ['Web development', 'Branding & design', 'SEO & visibility', 'Ads & lead generation', 'Software & automation', 'Maintenance & support'];

const WORK = [
  { img: '/showcase/creative-1000.jpg', alt: 'Concept design: dark, gradient-rich homepage for a creative AI studio', title: 'Creative studio', rot: '-2deg' },
  { img: '/showcase/luxury-1000.jpg', alt: 'Concept design: calm, editorial online store for home goods', title: 'Luxury e-commerce', rot: '1.5deg' },
  { img: '/showcase/saas-1000.jpg', alt: 'Concept design: analytics dashboard for a SaaS product', title: 'SaaS dashboard', rot: '-1deg' }
];

const WHY = [
  { tone: 'blue', title: 'Hand-coded in React', text: 'No WordPress, no drag-and-drop builders. Clean code that stays fast.' },
  { tone: 'orange', title: 'Under a second to load', text: 'Images, CSS and bundles tuned for mobile networks and for Google.' },
  { tone: 'green', title: 'You own everything', text: 'Full source code and IP. No subscriptions, no lock-in.' }
];

const STEPS = [
  { title: 'Discover', text: 'Goals, audience, competitors and funnel.' },
  { title: 'Design', text: 'Typography, spacing and brand in Figma.' },
  { title: 'Build', text: 'Custom React and Node, tuned for speed.' },
  { title: 'Launch', text: 'Domain, SSL, SEO checks and lead alerts.' }
];

function TileArrow() {
  return (
    <span className="bento-arrow" aria-hidden="true">
      <ArrowUpRight size={20} />
    </span>
  );
}

export default function Home({ onStartClick }) {
  useReveal();

  return (
    <>
      <Hero onStartClick={onStartClick} />

      {/* Ticker */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker">
          <div className="ticker-track">
            {[0, 1].map((k) => (
              <ul className="ticker-list" key={k}>
                {TICKER.map((t) => (
                  <li key={t + k}>
                    <span>{t}</span>
                    <LogoMark className="ticker-mark" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* What we do */}
      <section className="home-build">
        <div className="wrap">
          <div className="home-head reveal">
            <h2 className="home-title">Six services. One studio.</h2>
            <Link to="/services" className="text-link">
              <span>All services</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="bento">
            {SERVICES.map((s, i) => {
              const cls = i === 0 ? 'bento-big' : i === SERVICES.length - 1 ? 'bento-wide' : '';
              return (
                <Link
                  key={s.id}
                  to="/services"
                  className={`bento-tile ${cls} reveal`}
                  data-tone={s.tone}
                  style={{ '--d': `${(i % 3) * 0.08}s` }}
                >
                  {i === 0 && <LogoMark className="bento-watermark" />}
                  {i === 0 && <span className="bento-flag">Start here</span>}
                  <div className="bento-main">
                    <h3>{s.title}</h3>
                    <p className="bento-text">{i === 0 ? s.summary : s.items.slice(0, 3).join(', ') + ' and more.'}</p>
                  </div>
                  {i === 0 && (
                    <ul className="bento-points">
                      {s.items.slice(0, 4).map((p) => (
                        <li key={p}><Check size={16} strokeWidth={2.5} aria-hidden="true" /><span>{p}</span></li>
                      ))}
                    </ul>
                  )}
                  <div className="bento-foot">
                    <span className="bento-price">{s.no}</span>
                    <TileArrow />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="home-packages">
        <div className="wrap">
          <div className="home-head reveal">
            <h2 className="home-title">Simple packages. Priced in the open.</h2>
            <Link to="/packages" className="text-link">
              <span>All packages</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mini-packages">
            {PACKAGES.map((p, i) => (
              <li key={p.id} className="reveal" style={{ '--d': `${i * 0.1}s` }}>
                <Link to="/packages" className="mini-package" data-tone={p.tone}>
                  <span className="mini-goal">{p.goal}</span>
                  <h3>{p.name}</h3>
                  <p className="mini-price"><strong>{p.price}</strong><span>{p.per}</span></p>
                  <p className="mini-includes">{p.includes.join(' · ')}</p>
                  <TileArrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="home-why">
        <div className="wrap home-why-grid">
          <div className="reveal">
            <h2 className="home-title">No templates. No page builders. No lock-in.</h2>
            <Link to="/why-us" className="text-link home-why-link">
              <span>Why teams choose us</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="why-list">
            {WHY.map((w, i) => (
              <li key={w.title} className="why-row reveal" data-tone={w.tone} style={{ '--d': `${i * 0.1}s` }}>
                <span className="why-face" aria-hidden="true" />
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Concept work */}
      <section className="home-work">
        <div className="wrap">
          <div className="home-head reveal">
            <h2 className="home-title">Concept designs from the studio.</h2>
            <p className="home-lede">Three directions we can build for you. Every site is coded from scratch around your brand.</p>
          </div>
          <ul className="work">
            {WORK.map((w, i) => (
              <li key={w.title} className="work-card reveal" style={{ '--r': w.rot, '--d': `${i * 0.1}s` }}>
                <div className="browser">
                  <div className="browser-bar" aria-hidden="true"><i /><i /><i /></div>
                  <img src={w.img} alt={w.alt} width="1000" height="558" loading="lazy" />
                </div>
                <p className="work-cap"><strong>{w.title}</strong><span>Concept design</span></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="home-process">
        <div className="wrap">
          <div className="home-head reveal">
            <h2 className="home-title">From first call to launch in four steps.</h2>
            <Link to="/process" className="text-link">
              <span>See the full process</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ol className="p-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="p-step reveal" style={{ '--d': `${i * 0.1}s` }}>
                <span className="p-num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
