import React from 'react';
import { Check, ArrowRight, Sparkles, Zap, ShieldCheck, Clock, Star } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter Landing Page',
    price: '₹7,500',
    rawPrice: 7500,
    timeline: '3 - 5 Days Delivery',
    popular: false,
    tagline: 'Ideal for rapid product launches, paid ad traffic, and early startup validation.',
    features: [
      { bold: 'Single High-Converting Page', desc: 'optimized for Meta/Google ad conversions' },
      { bold: 'Mobile-First Responsive Design', desc: 'flawless on iOS and Android devices' },
      { bold: 'Sub-Second Load Speed', desc: 'scores 95+ on Google Lighthouse' },
      { bold: 'Direct WhatsApp CTA & Form', desc: 'instant notifications straight to your phone' },
      { bold: 'On-Page SEO & Social Cards', desc: 'clean OpenGraph cards for WhatsApp & Twitter' },
      { bold: '14-Day Post-Launch Support', desc: 'complimentary bug fixes & adjustments' }
    ],
    ctaText: 'Select Starter Plan'
  },
  {
    id: 'growth',
    name: 'Full Business Website',
    price: '₹11,999',
    rawPrice: 11999,
    timeline: '7 - 10 Days Delivery',
    popular: true,
    tagline: 'Our flagship package for ambitious businesses demanding an undisputed authority presence.',
    features: [
      { bold: 'Up to 5 Multi-Page Sections', desc: 'Home, About, Services, Process, Contact' },
      { bold: 'Custom Modern Light Design', desc: 'editorial typography & brand design tokens' },
      { bold: 'Kinetic Micro-Animations', desc: 'smooth interactive hover effects & reveals' },
      { bold: 'Connected Lead Form & Database', desc: 'reliable lead storage with studio API' },
      { bold: '100/100 Core Web Vitals Pass', desc: 'guaranteed speed audit with zero bloat' },
      { bold: 'Google Search Console Setup', desc: 'sitemap submitted & Google indexed' },
      { bold: '30-Day Dedicated Support', desc: 'ongoing priority engineer assistance' }
    ],
    ctaText: 'Select Growth Plan'
  },
  {
    id: 'custom',
    name: 'Custom Web App & Catalog',
    price: '₹19,999+',
    rawPrice: 19999,
    timeline: '12 - 18 Days Delivery',
    popular: false,
    tagline: 'For businesses needing dynamic data, interactive product catalogs, or custom founder dashboards.',
    features: [
      { bold: 'Full-Stack MERN Architecture', desc: 'custom React SPA + Node.js/Express API' },
      { bold: 'Interactive Catalog & Inquiry Cart', desc: 'browse products with direct WhatsApp order routing' },
      { bold: 'Dynamic Search & Filtering', desc: 'instant client-side filtering & category tags' },
      { bold: 'Custom Database & Admin Panel', desc: 'secure MongoDB data modeling & endpoints' },
      { bold: '100% Full Code Ownership', desc: 'private GitHub repo transferred to you' },
      { bold: 'Direct WhatsApp Line Access', desc: 'daily progress updates & direct dev contact' }
    ],
    ctaText: 'Select Custom Plan'
  }
];

export default function PricingPlans({ onSelectPlan }) {
  return (
    <section id="pricing" className="pricing-section">
      <div className="section-head">
        <div className="section-tag-wrap">
          <span className="section-tag bold-tag">
            <span className="dot-pulse"></span>
            TRANSPARENT PRICING // NO HIDDEN FEES
          </span>
        </div>
        <h2 className="section-title">
          Honest, flat-rate pricing.<br />
          <span className="text-gradient">Zero recurring builder fees.</span>
        </h2>
        <p className="section-desc">
          Every project includes modern React &amp; Node architecture, complete source code ownership, and direct senior developer communication.
        </p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan, idx) => (
          <div
            key={plan.id}
            className={`pricing-card pricing-card-${plan.id} ${plan.popular ? 'popular' : ''}`}
            style={{ '--plan-idx': idx }}
          >
            {/* Gloss Light Sweep Reflection Container */}
            <div className="card-sheen" />

            {/* Top Colored Accent Strip */}
            <div className="card-top-accent-bar" />

            {plan.popular && (
              <div className="popular-badge">
                <Star size={13} fill="#ffffff" className="star-spin" />
                <span>MOST POPULAR // BEST VALUE</span>
              </div>
            )}

            <div className="pricing-top">
              <span className="plan-name">{plan.name}</span>
              <p className="plan-tagline">{plan.tagline}</p>
            </div>

            <div className="pricing-figure">
              <span className="price-amount">{plan.price}</span>
              <span className="price-type">INR / Flat Project Rate · No Monthly Fees</span>
            </div>

            <div className="plan-timeline">
              <Clock size={15} className="timeline-icon" />
              <span>{plan.timeline}</span>
            </div>

            <div className="plan-divider" />

            <div className="plan-features">
              <span className="features-label">WHAT'S INCLUDED:</span>
              <ul>
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <Check size={17} className="feature-check" />
                    <span>
                      <strong className="feat-bold">{feat.bold}</strong> — {feat.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`plan-cta-btn ${plan.popular ? 'primary' : 'outline'}`}
              onClick={() => onSelectPlan({
                service: plan.name,
                budgetTier: plan.price,
                estimatedBudget: plan.rawPrice,
                timeline: plan.timeline,
                details: `Selected package: ${plan.name} (${plan.price}). Target timeline: ${plan.timeline}.`
              })}
            >
              <span>{plan.ctaText}</span>
              <ArrowRight size={17} />
            </button>
          </div>
        ))}
      </div>

      {/* Pricing Guarantee Strip */}
      <div className="pricing-guarantee-strip">
        <div className="guarantee-item">
          <div className="guarantee-icon-box">
            <ShieldCheck size={20} />
          </div>
          <div>
            <strong className="guarantee-title">50 / 50 Milestone Payment</strong>
            <p className="guarantee-desc">50% deposit to commence work, 50% only when the website is completed and approved by you.</p>
          </div>
        </div>

        <div className="guarantee-item">
          <div className="guarantee-icon-box">
            <Zap size={20} />
          </div>
          <div>
            <strong className="guarantee-title">Zero Template Bloat</strong>
            <p className="guarantee-desc">High-performance React code that outranks sluggish WordPress &amp; Wix page builders on search engines.</p>
          </div>
        </div>

        <div className="guarantee-item">
          <div className="guarantee-icon-box">
            <Clock size={20} />
          </div>
          <div>
            <strong className="guarantee-title">Guaranteed On-Time Delivery</strong>
            <p className="guarantee-desc">We commit to firm delivery windows. Direct WhatsApp milestone checks throughout the build.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
