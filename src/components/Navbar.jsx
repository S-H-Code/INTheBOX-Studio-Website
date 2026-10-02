import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ onCtaClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`studio-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo */}
          <a
            href="#"
            className="studio-brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src="/logo-icon.png" alt="INTheBOX Studio" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-name">INTheBOX</span>
              <span className="brand-sub">STUDIO</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links hide-mobile">
            <button type="button" onClick={() => scrollToSection('services')} className="nav-link">
              Capabilities
            </button>
            <button type="button" onClick={() => scrollToSection('why-us')} className="nav-link">
              Why Us
            </button>
            <button type="button" onClick={() => scrollToSection('approach')} className="nav-link">
              Process
            </button>
            <button type="button" onClick={() => scrollToSection('contact-form')} className="nav-link">
              Contact
            </button>
          </nav>

          {/* Nav Right CTA */}
          <div className="nav-actions">
            <a
              href="https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noreferrer"
              className="nav-whatsapp-link hide-mobile"
              title="Chat directly on WhatsApp"
            >
              <span>WhatsApp Direct</span>
            </a>
            <button className="nav-cta-btn hide-mobile" onClick={onCtaClick}>
              <span>Start a Project</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo-icon.png" alt="INTheBOX Studio" className="brand-logo-img small" />
            <div className="brand-text">
              <span className="brand-name">INTheBOX</span>
              <span className="brand-sub">STUDIO</span>
            </div>
          </div>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <div className="drawer-links">
          <button onClick={() => scrollToSection('services')} className="drawer-link">
            <span className="num">01</span>
            <span>Capabilities</span>
          </button>
          <button onClick={() => scrollToSection('why-us')} className="drawer-link">
            <span className="num">02</span>
            <span>Why INTheBOX</span>
          </button>
          <button onClick={() => scrollToSection('approach')} className="drawer-link">
            <span className="num">03</span>
            <span>Our Process</span>
          </button>
          <button onClick={() => scrollToSection('contact-form')} className="drawer-link">
            <span className="num">04</span>
            <span>Start a Project</span>
          </button>
        </div>
        <div className="drawer-footer">
          <button
            className="drawer-cta"
            onClick={() => {
              setMobileOpen(false);
              onCtaClick();
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={18} />
          </button>
          <p className="drawer-note">Direct senior developer communication · Fast turnaround</p>
        </div>
      </div>
      {mobileOpen && <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
