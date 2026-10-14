import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import LogoMark from './LogoMark';
import { Link, navigate } from '../router';

const WHATSAPP =
  "https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project.";

export default function Footer({ showCta = true }) {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`site-footer ${showCta ? '' : 'no-cta'}`}>
      <div className="wrap">
        {showCta && (
        <div className="footer-cta">
          <h2 className="footer-cta-title">Have a project in mind? Let's build it.</h2>
          <div className="footer-cta-side">
            <p>
              We take on a limited number of builds each month. Tell us what you are making and we will reply with a
              roadmap and a fixed quote within 24 hours.
            </p>
            <div className="footer-cta-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/contact')}>
                <span>Start a project</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <a className="btn btn-outline" href={WHATSAPP} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        )}

        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label="INTheBOX Studio — home">
              <LogoMark className="brand-mark" />
              <span className="brand-word">
              <span className="brand-name">INTheBOX</span>
              <span className="brand-sub">STUDIO</span>
            </span>
            </Link>
            <p>We put your website in a box.</p>
          </div>

          <nav className="footer-col" aria-label="Services">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services">Web development</Link></li>
              <li><Link to="/services">Branding and design</Link></li>
              <li><Link to="/services">SEO and visibility</Link></li>
              <li><Link to="/services">Advertising and leads</Link></li>
              <li><Link to="/services">Software and automation</Link></li>
              <li><Link to="/services">Maintenance and support</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Studio">
            <h3>Studio</h3>
            <ul>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/why-us">Why INTheBOX</Link></li>
              <li><Link to="/process">Our process</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="https://wa.me/918121653893" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="mailto:hello@intheboxstudio.in">hello@intheboxstudio.in</a></li>
              <li><a href="tel:+918121653893">+91 81216 53893</a></li>
              <li className="footer-note">Replies within 24 hours</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 INTheBOX Studio. All rights reserved.</p>
          <button type="button" className="to-top" onClick={toTop}>
            <span>Back to top</span>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
