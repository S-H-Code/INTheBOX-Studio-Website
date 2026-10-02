import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers, Compass, ShoppingBag, RefreshCw, Code2, TrendingUp, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: 'landing-page',
    title: 'High-Velocity Landing Page',
    tier: 'From ₹7,500',
    code: '01 // CONVERSION',
    popular: false,
    icon: Compass,
    color: '#0ea5e9',
    summary: 'Single-page conversion engines engineered for product launches, Google/Meta ad traffic, and fast startup validation.',
    features: [
      'Sub-Second Time-to-Interactive (< 1.0s)',
      'Psychology-backed Visual Section Flow',
      'Lead Capture Form & Direct WhatsApp CTA',
      'Mobile-First Responsive Polish',
      'Basic On-Page SEO & Social Cards'
    ]
  },
  {
    id: 'business-site',
    title: 'Business Flagship Website',
    tier: 'From ₹11,999',
    code: '02 // AUTHORITY',
    popular: true,
    icon: Layers,
    color: '#6366f1',
    summary: 'Multi-page digital flagships engineered to command industry authority, establish instant trust, and systematically convert qualified leads.',
    features: [
      'Up to 5 Custom React Multi-Page Sections',
      'Editorial Modern White Design System',
      'Smooth Micro-Interactions & Hover Polish',
      'Connected Lead Form & Database Storage',
      '100/100 Core Web Vitals Optimization'
    ]
  },
  {
    id: 'catalog-showcase',
    title: 'Product Catalog & Showcase',
    tier: 'From ₹19,999',
    code: '03 // CATALOG',
    popular: false,
    icon: ShoppingBag,
    color: '#10b981',
    summary: 'Bespoke product showcases engineered for dynamic category filtering, inquiry carts, direct WhatsApp order routing, and zero bloat.',
    features: [
      'Interactive Product Catalog & Filtering',
      'Direct WhatsApp Ordering & Inquiry Cart',
      'Dynamic Category & Tag Navigation',
      'Automated WhatsApp / Email Inquiries Alert',
      'Fast Mobile-Optimized Product Showcase'
    ]
  },
  {
    id: 'redesign',
    title: 'Full Website Redesign',
    tier: 'From ₹9,999',
    code: '04 // ELEVATION',
    popular: false,
    icon: RefreshCw,
    color: '#f59e0b',
    summary: 'Total architectural overhaul of an outdated or sluggish site into a modern, lightning-fast digital asset that founders are proud to share.',
    features: [
      'Complete SEO & Legacy URL Migration',
      '3x-5x Speed & Performance Upgrade',
      'Contemporary Design System & Color Tokens',
      'Zero Downtime Production Deployment',
      'Clean Codebase Refactor (No Page Builder)'
    ]
  },
  {
    id: 'webapp',
    title: 'Custom Web Application',
    tier: 'Custom Scope',
    code: '05 // FULL-STACK',
    popular: false,
    icon: Code2,
    color: '#8b5cf6',
    summary: 'Custom client portals, internal founder dashboards, workflow automation tools, and secure MERN stack web applications.',
    features: [
      'React SPA Frontend + Node/Express REST API',
      'MongoDB Data Modeling & Indexes',
      'Secure User Authentication & Roles',
      'Rate Limiting & Helmet Security Headers',
      'Clean Modular Component Architecture'
    ]
  },
  {
    id: 'seo-speed',
    title: 'Speed & SEO Optimization',
    tier: 'From ₹4,999',
    code: '06 // PERFORMANCE',
    popular: false,
    icon: TrendingUp,
    color: '#ec4899',
    summary: 'Deep architectural audits, structured JSON-LD data schema, programmatic SEO templates, and page-speed acceleration to win rank.',
    features: [
      '100/100 Google Lighthouse Core Web Vitals',
      'Structured Semantic JSON-LD Schema',
      'Image Optimization & Asset Compression',
      'XML Sitemaps & Search Console Config',
      'Competitor Page-Speed Benchmark Audit'
    ]
  }
];

export default function ServiceGrid({ onSelectService }) {
  return (
    <section id="services" className="services-section">
      <div className="section-head">
        <div className="section-tag-wrap">
          <span className="section-tag">
            <span className="dot-pulse"></span>
            STUDIO CAPABILITIES
          </span>
        </div>
        <h2 className="section-title">
          Engineered for impact.<br />
          <span className="text-gradient">Built without compromise.</span>
        </h2>
        <p className="section-desc">
          Every project is built 100% custom in modern React and Node. Select a service below to get an instant quote or discussion.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className={`service-card service-card-${service.id} ${service.popular ? 'popular' : ''}`}
              style={{ '--service-accent': service.color, '--stagger-delay': `${idx * 0.08}s` }}
            >
              {/* Gloss Light Sweep Reflection Container */}
              <div className="card-sheen" />

              {/* Top Accent Gradient Bar */}
              <div className="card-top-accent-bar" style={{ background: service.color }} />

              {service.popular && (
                <div className="popular-badge">
                  <Sparkles size={13} className="sparkle-spin" />
                  <span>MOST REQUESTED</span>
                </div>
              )}

              <div className="service-top">
                <span className="service-code">{service.code}</span>
                <span className="service-tier-badge">{service.tier}</span>
              </div>

              <div className="service-header">
                <div className="service-icon-wrap" style={{ color: service.color, backgroundColor: `${service.color}14` }}>
                  <Icon size={24} />
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>

              <p className="service-summary">{service.summary}</p>

              <div className="service-features">
                <span className="features-title">DELIVERABLES INCLUDED:</span>
                <ul>
                  {service.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="service-select-btn"
                onClick={() => onSelectService(service.title)}
              >
                <span>Select &amp; Discuss</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
