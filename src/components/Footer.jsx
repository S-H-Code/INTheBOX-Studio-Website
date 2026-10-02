import React from 'react';
import { ArrowUp, ArrowUpRight, MessageSquare, Mail, Phone, Zap, Shield, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="studio-footer">
      {/* Big Impact Pre-Footer Callout Banner */}
      <div className="footer-cta-banner">
        <div className="cta-banner-content">
          <span className="cta-banner-tag">
            <span className="dot-pulse"></span>
            NEXT STEP // INITIATE TRANSMISSION
          </span>
          <h2 className="cta-banner-title">
            Have a project in mind?<br />
            <span className="text-white-em">Let's build something extraordinary.</span>
          </h2>
          <p className="cta-banner-desc">
            We take on select website and digital product builds each month. Tell us what you are building and we'll reply with a clear roadmap and fixed quote within 24 hours.
          </p>
        </div>

        <div className="cta-banner-actions">
          <button className="footer-action-btn primary" onClick={scrollToContact}>
            <span>Start Your Project</span>
            <ArrowUpRight size={18} />
          </button>
          <a
            href="https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project."
            target="_blank"
            rel="noreferrer"
            className="footer-action-btn secondary"
          >
            <MessageSquare size={17} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <div className="footer-brand-header">
            <img src="/logo-icon.png" alt="INTheBOX Studio" className="footer-brand-logo" />
            <div className="footer-brand-titles">
              <span className="footer-brand-name">INTheBOX</span>
              <span className="footer-brand-tagline">STUDIO</span>
            </div>
          </div>
          <p className="footer-mission-text">
            Bespoke digital flagships, high-velocity landing pages, and web applications engineered for ambitious founders. Built with clean React and Node with zero page-builder bloat.
          </p>
          <div className="footer-status-pill">
            <span className="live-dot"></span>
            <span>Studio Engine: Active · Direct Senior Engineering</span>
          </div>
        </div>

        {/* Directory Column 1: Capabilities */}
        <div className="footer-nav-column">
          <span className="footer-column-title">CAPABILITIES</span>
          <ul className="footer-links-list">
            <li><a href="#services">High-Converting Landing Pages</a></li>
            <li><a href="#services">Full Business Websites</a></li>
            <li><a href="#services">Custom Web Apps &amp; Catalogs</a></li>
            <li><a href="#services">Website Redesign &amp; Overhaul</a></li>
            <li><a href="#services">Speed &amp; Core Web Vitals 99+</a></li>
          </ul>
        </div>

        {/* Directory Column 2: Studio Promises */}
        <div className="footer-nav-column">
          <span className="footer-column-title">WHY INTHEBOX</span>
          <ul className="footer-links-list">
            <li><a href="#why-us">Zero Page-Builder Bloat</a></li>
            <li><a href="#why-us">Sub-Second Speed Latency</a></li>
            <li><a href="#why-us">100% Full IP &amp; Code Ownership</a></li>
            <li><a href="#why-us">Transparent Milestone Delivery</a></li>
            <li><a href="#approach">Our 4-Step Engineering Process</a></li>
          </ul>
        </div>

        {/* Directory Column 3: Direct Lines */}
        <div className="footer-nav-column">
          <span className="footer-column-title">DIRECT DESK</span>
          <ul className="footer-links-list">
            <li>
              <a href="https://wa.me/918121653893" target="_blank" rel="noreferrer" className="footer-direct-link highlight">
                <span>WhatsApp Desk ↗</span>
              </a>
            </li>
            <li>
              <a href="mailto:hello@intheboxstudio.in" className="footer-direct-link">
                <span>hello@intheboxstudio.in</span>
              </a>
            </li>
            <li>
              <a href="tel:+918121653893" className="footer-direct-link">
                <span className="footer-direct-info">+91 81216 53893</span>
              </a>
            </li>
            <li>
              <span className="footer-sla-badge">Response SLA: &lt; 24 Hours</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-legal-copy">
          <strong>INTheBOX Studio</strong>
          <span> · Handcrafted digital flagships for ambitious businesses · © 2026. All rights reserved.</span>
        </div>

        <button className="footer-back-to-top" onClick={scrollToTop} title="Scroll to top of page">
          <span>BACK TO TOP</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
