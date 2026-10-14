import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import LogoMark from './LogoMark';
import { Link } from '../router';

const WHATSAPP =
  "https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project.";

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/why-us', label: 'Why us' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar({ route, onCtaClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock page scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [route]);

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="INTheBOX Studio — home">
            <LogoMark className="brand-mark" />
            <span className="brand-word">
              <span className="brand-name">INTheBOX</span>
              <span className="brand-sub">STUDIO</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="nav-link" aria-current={route === l.to ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="nav-text-link">
              WhatsApp
            </a>
            <button type="button" className="btn btn-primary btn-sm nav-cta" onClick={onCtaClick}>
              <span>Start a project</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="drawer-links" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="drawer-link"
              aria-current={route === l.to ? 'page' : undefined}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-foot">
          <button
            type="button"
            className="btn btn-primary btn-block"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={() => {
              setMobileOpen(false);
              onCtaClick();
            }}
          >
            <span>Start a project</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a className="btn btn-outline btn-block" href={WHATSAPP} target="_blank" rel="noreferrer" tabIndex={mobileOpen ? 0 : -1}>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
