import React from 'react';
import { Zap, ShieldCheck, Code2, Smartphone, Search, Headphones, CheckCircle2 } from 'lucide-react';

const STANDARDS = [
  {
    icon: Code2,
    color: '#6366f1',
    bgColor: '#eef2ff',
    title: 'Zero Page-Builder Bloat',
    desc: 'We never use generic WordPress templates or heavy drag-and-drop builders. Every project is engineered with clean, modern React 18 for peak efficiency and speed.'
  },
  {
    icon: Zap,
    color: '#0ea5e9',
    bgColor: '#e0f2fe',
    title: 'Sub-Second Load Latency',
    desc: 'Google ranks fast websites higher. We optimize images, CSS delivery, and bundle sizes to ensure your pages load in under 1 second on mobile networks.'
  },
  {
    icon: ShieldCheck,
    color: '#10b981',
    bgColor: '#ecfdf5',
    title: '100% Full Code Ownership',
    desc: 'You receive the entire production source code repository. No recurring page-builder subscriptions, no vendor lock-in, and zero hidden maintenance fees.'
  },
  {
    icon: Smartphone,
    color: '#f59e0b',
    bgColor: '#fef3c7',
    title: 'Flawless Mobile Experience',
    desc: 'Over 75% of your customers visit on smartphones. We design mobile-first with smooth tap targets, crisp typography, and touch-optimized navigation.'
  },
  {
    icon: Search,
    color: '#8b5cf6',
    bgColor: '#f3e8ff',
    title: 'Technical SEO Built-In',
    desc: 'Semantic HTML5 structure, structured JSON-LD schema markup, OpenGraph social share previews, and clean sitemaps so search engines index you easily.'
  },
  {
    icon: Headphones,
    color: '#f43f5e',
    bgColor: '#ffe4e6',
    title: 'Direct WhatsApp Communication',
    desc: 'No ticketing queues or junior account managers. You speak directly with the developer building your site for rapid feedback and weekly milestones.'
  }
];

export default function StudioStandards({ onCtaClick }) {
  return (
    <section id="why-us" className="standards-section">
      <div className="section-head">
        <div className="section-tag-wrap">
          <span className="section-tag">
            <span className="dot-pulse"></span>
            THE INTHEBOX PROMISE
          </span>
        </div>
        <h2 className="section-title">
          Why ambitious founders<br />
          <span className="text-gradient">build with INTheBOX.</span>
        </h2>
        <p className="section-desc">
          We combine aesthetic editorial craft with serious engineering discipline. Here is our baseline standard for every project we ship.
        </p>
      </div>

      <div className="standards-grid">
        {STANDARDS.map((std, idx) => {
          const Icon = std.icon;
          return (
            <div key={idx} className="standard-card" style={{ '--std-color': std.color }}>
              <div className="card-top-accent-bar" style={{ background: std.color }} />
              <div className="standard-icon-wrap" style={{ backgroundColor: std.bgColor, color: std.color }}>
                <Icon size={22} />
              </div>
              <h3 className="standard-title">{std.title}</h3>
              <p className="standard-desc">{std.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="standards-banner">
        <div className="banner-content">
          <span className="banner-tag">RISK-FREE COMMITMENT</span>
          <h3 className="banner-heading">Need a custom feature or urgent launch deadline?</h3>
          <p className="banner-text">Talk directly to our lead developer today. We review your requirements and outline a transparent roadmap before you commit to anything.</p>
        </div>
        <button className="btn-primary" onClick={onCtaClick}>
          <span>Talk to an Engineer</span>
          <CheckCircle2 size={16} />
        </button>
      </div>
    </section>
  );
}
