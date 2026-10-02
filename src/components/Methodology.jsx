import React from 'react';
import { Terminal, Zap, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    step: 'DISCOVERY & ARCHITECTURE',
    title: 'Deconstruct before designing.',
    desc: 'We dissect your commercial goals, audience psychology, competitor weaknesses, and conversion funnel before crafting a single pixel.',
    tag: 'Strategic Blueprint',
    color: '#6366f1'
  },
  {
    num: '02',
    step: 'BESPOKE EDITORIAL DESIGN',
    title: 'Make your brand impossible to ignore.',
    desc: 'High-contrast typography, mathematical spacing, subtle micro-interactions, and pristine white-space that commands immediate respect.',
    tag: 'Figma & Design Tokens',
    color: '#0ea5e9'
  },
  {
    num: '03',
    step: 'PRECISION ENGINEERING',
    title: 'Custom code. Zero template bloat.',
    desc: 'Engineered with React 18, Vite, and Node/Express. Optimized for sub-second page loads, SEO crawlers, and bulletproof security.',
    tag: 'MERN & Clean React',
    color: '#10b981'
  },
  {
    num: '04',
    step: 'DEPLOYMENT & SCALE',
    title: 'Launch with compounding momentum.',
    desc: 'Seamless domain connection, SSL provisioning, schema markup verification, and automated lead capture with direct WhatsApp notifications.',
    tag: 'Lighthouse 99+ Pass',
    color: '#f59e0b'
  }
];

export default function Methodology({ onStartClick }) {
  return (
    <section id="approach" className="methodology-section">
      <div className="section-head">
        <div className="section-tag-wrap">
          <span className="section-tag">
            <span className="dot-pulse"></span>
            OUR PROCESS // 05
          </span>
        </div>
        <h2 className="section-title">
          The INTheBOX standard.<br />
          <span className="text-gradient">Engineered to outperform.</span>
        </h2>
        <p className="section-desc">
          How we turn ambitious ideas into market-defining digital products in weeks, not months.
        </p>
      </div>

      <div className="methodology-grid">
        {STEPS.map((step, idx) => (
          <div key={idx} className="method-card" style={{ '--step-color': step.color }}>
            <div className="card-top-accent-bar" style={{ background: step.color }} />
            <div className="method-header">
              <span className="method-num" style={{ color: step.color }}>{step.num}</span>
              <span className="method-step-pill">{step.step}</span>
            </div>
            <h3 className="method-title">{step.title}</h3>
            <p className="method-desc">{step.desc}</p>
            <div className="method-footer">
              <span className="method-tag" style={{ borderColor: `${step.color}30`, color: step.color }}>
                {step.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
