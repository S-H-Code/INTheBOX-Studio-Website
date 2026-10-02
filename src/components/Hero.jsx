import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, CheckCircle2, Zap, Shield, Code2, Terminal, Cpu, Check, Layers } from 'lucide-react';

const TABS = [
  { id: 'code', label: 'Clean React Architecture', icon: Code2 },
  { id: 'speed', label: '100/100 Lighthouse Audit', icon: Zap },
  { id: 'ownership', label: '100% Code & IP Ownership', icon: Shield }
];

export default function Hero({ onStartClick }) {
  const [activeTab, setActiveTab] = useState('code');
  const [isPaused, setIsPaused] = useState(false);

  const activeIndex = TABS.findIndex(t => t.id === activeTab);

  // Auto-scroll / horizontal slide tabs every 4.2 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.findIndex(t => t.id === prev);
        const nextIdx = (idx + 1) % TABS.length;
        return TABS[nextIdx].id;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      {/* Ambient background glows */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-grid-pattern" />

      <div className="hero-inner">
        {/* Eyebrow badge */}
        <div className="hero-badge-wrap anim-hero-1">
          <div className="hero-badge">
            <span className="live-pulse"></span>
            <span className="badge-text">INTHEBOX STUDIO // MODERN WEB ARCHITECTURE</span>
            <span className="badge-sep">/</span>
            <span className="badge-highlight">Bespoke React &amp; Node</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title anim-hero-2">
          We engineer websites that <br />
          <span className="hero-title-highlight">command authority</span> &amp; convert.
        </h1>

        {/* Hero Description */}
        <p className="hero-description anim-hero-3">
          We reject fragile page-builder templates and sluggish WordPress themes. INTheBOX constructs bespoke, lightning-fast digital flagships and web applications engineered with mathematical precision, clean code, and uncompromising visual craft.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions anim-hero-4">
          <button className="btn-primary" onClick={onStartClick}>
            <span>Start a Project</span>
            <ArrowUpRight size={18} />
          </button>
          <button className="btn-secondary" onClick={scrollToServices}>
            <span>Explore Capabilities</span>
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Trust Points */}
        <div className="hero-trust-bar anim-hero-5">
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <span><strong>Modern React &amp; Node Stack</strong> (Zero Page-Builder Bloat)</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <span><strong>Sub-Second Load Latency</strong> (&lt; 1.0s Guaranteed)</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <span><strong>100% Source Code &amp; IP</strong> Ownership Included</span>
          </div>
        </div>

        {/* Interactive Studio Engineering Preview Frame with Auto Horizontal Slide */}
        <div
          className="hero-code-frame anim-hero-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="frame-header">
            <div className="frame-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="frame-tab-pills">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`frame-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsPaused(true);
                    }}
                    title={`Switch to ${tab.label}`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    {isActive && !isPaused && <span className="tab-progress-indicator" />}
                  </button>
                );
              })}
            </div>
            <div className="frame-status hide-mobile">
              <span className="pulse-dot"></span>
              <span>React 18 + Node.js MERN</span>
            </div>
          </div>

          {/* Horizontal Slide Carousel Track */}
          <div className="frame-content-body">
            <div
              className="frame-slider-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {/* Slide 1: Clean React Architecture code view */}
              <div className="frame-slide">
                <div className="terminal-view">
                  <div className="terminal-header">
                    <div className="terminal-title-row">
                      <span className="file-name">DigitalFlagship.jsx</span>
                      <span className="file-lang">React 18 / JSX</span>
                    </div>
                    <span className="file-tag">Zero Template Bloat</span>
                  </div>
                  <div className="code-editor-display">
                    <div className="line-numbers">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => (
                        <span key={n}>{n}</span>
                      ))}
                    </div>
                    <pre className="code-block">
                      <code>
                        <span className="syn-comment">// ⚡ INTheBOX Production Architecture — Modern &amp; Clean</span>{'\n'}
                        <span className="syn-keyword">import</span> {'{'} <span className="syn-fn">createDigitalFlagship</span> {'}'} <span className="syn-keyword">from</span> <span className="syn-str">'@inthebox/studio'</span>;{'\n\n'}
                        <span className="syn-keyword">export default function</span> <span className="syn-comp">AmbitiousBrand</span>({'{'} <span className="syn-prop">founderVision</span> {'}'}) {'{'}{'\n'}
                        {'  '}<span className="syn-keyword">return</span> ({'\n'}
                        {'    '}<span className="syn-tag">&lt;<span className="syn-comp">StudioEngine</span></span>{'\n'}
                        {'      '}<span className="syn-prop">performance</span>=<span className="syn-brace">{'{'}</span> {'{'} <span className="syn-prop">speed</span>: <span className="syn-str">'&lt; 0.8s'</span>, <span className="syn-prop">lighthouse</span>: <span className="syn-num">100</span> {'}'} <span className="syn-brace">{'}'}</span>{'\n'}
                        {'      '}<span className="syn-prop">design</span>=<span className="syn-brace">{'{'}</span> {'{'} <span className="syn-prop">aesthetic</span>: <span className="syn-str">'Luminous White'</span>, <span className="syn-prop">typography</span>: <span className="syn-str">'Outfit'</span> {'}'} <span className="syn-brace">{'}'}</span>{'\n'}
                        {'      '}<span className="syn-prop">ownership</span>=<span className="syn-brace">{'{'}</span> {'{'} <span className="syn-prop">fullSourceCode</span>: <span className="syn-bool">true</span>, <span className="syn-prop">zeroLockIn</span>: <span className="syn-bool">true</span> {'}'} <span className="syn-brace">{'}'}</span>{'\n'}
                        {'      '}<span className="syn-prop">conversion</span>=<span className="syn-brace">{'{'}</span> {'{'} <span className="syn-prop">whatsAppDirect</span>: <span className="syn-bool">true</span>, <span className="syn-prop">fastDelivery</span>: <span className="syn-bool">true</span> {'}'} <span className="syn-brace">{'}'}</span>{'\n'}
                        {'    '}<span className="syn-tag">&gt;</span>{'\n'}
                        {'      '}<span className="syn-tag">&lt;<span className="syn-comp">HighConvertingFlagship</span></span> <span className="syn-prop">vision</span>=<span className="syn-brace">{'{'}</span>founderVision<span className="syn-brace">{'}'}</span> <span className="syn-tag">/&gt;</span>{'\n'}
                        {'    '}<span className="syn-tag">&lt;/<span className="syn-comp">StudioEngine</span>&gt;</span>{'\n'}
                        {'  '});{'\n'}
                        {'}'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Slide 2: 100/100 Lighthouse Audit speed view */}
              <div className="frame-slide">
                <div className="speed-view">
                  <div className="metric-circles-grid">
                    <div className="metric-circle-card">
                      <div className="circle-score score-green">100</div>
                      <span className="circle-label">Performance</span>
                      <span className="circle-sub">0.4s First Contentful Paint</span>
                    </div>
                    <div className="metric-circle-card">
                      <div className="circle-score score-green">100</div>
                      <span className="circle-label">Accessibility</span>
                      <span className="circle-sub">WCAG AA Standard</span>
                    </div>
                    <div className="metric-circle-card">
                      <div className="circle-score score-green">100</div>
                      <span className="circle-label">Best Practices</span>
                      <span className="circle-sub">Modern Web Standards</span>
                    </div>
                    <div className="metric-circle-card">
                      <div className="circle-score score-green">100</div>
                      <span className="circle-label">SEO Audit</span>
                      <span className="circle-sub">Semantic Schema Markup</span>
                    </div>
                  </div>
                  <div className="speed-live-bar">
                    <div className="speed-stat-item">
                      <span className="stat-highlight">0.52s</span>
                      <span className="stat-desc">Time to Interactive</span>
                    </div>
                    <div className="speed-stat-item">
                      <span className="stat-highlight">0.00</span>
                      <span className="stat-desc">Cumulative Layout Shift</span>
                    </div>
                    <div className="speed-stat-item">
                      <span className="stat-highlight">18KB</span>
                      <span className="stat-desc">Gzipped Core CSS</span>
                    </div>
                    <div className="speed-stat-item">
                      <span className="stat-highlight">0</span>
                      <span className="stat-desc">Third-Party Tracker Bloat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3: 100% Code & IP Ownership view */}
              <div className="frame-slide">
                <div className="ownership-view">
                  <div className="ownership-grid">
                    <div className="ownership-card">
                      <div className="card-top-badge">GIT REPOSITORY</div>
                      <h4>Private GitHub Ownership</h4>
                      <p>Clean, modular React 18 &amp; Node source code transferred directly to your GitHub organization with full commit records.</p>
                    </div>
                    <div className="ownership-card">
                      <div className="card-top-badge">ZERO HOSTING LOCK-IN</div>
                      <h4>Deploy Anywhere</h4>
                      <p>Deploy to Vercel, Netlify, Cloudflare Pages, or your own Linux VPS with 1-click CI/CD. Never pay monthly builder fees.</p>
                    </div>
                    <div className="ownership-card">
                      <div className="card-top-badge">COMMERCIAL SECURITY</div>
                      <h4>Production Express API</h4>
                      <p>Includes enterprise Helmet headers, IP rate limiting, and MongoDB backend ready for serious customer traffic.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Auto-Scrolling Horizontal Marquee Ticker */}
          <div className="frame-ticker-wrap">
            <div className="frame-ticker-track">
              <span className="ticker-item"><span className="ticker-dot"></span>REACT 18 &amp; VITE 5 STACK</span>
              <span className="ticker-item"><span className="ticker-dot"></span>SUB-SECOND LATENCY (&lt; 0.8s)</span>
              <span className="ticker-item"><span className="ticker-dot"></span>100/100 GOOGLE LIGHTHOUSE AUDIT</span>
              <span className="ticker-item"><span className="ticker-dot"></span>ZERO PAGE-BUILDER BLOAT</span>
              <span className="ticker-item"><span className="ticker-dot"></span>100% GIT SOURCE CODE OWNERSHIP</span>
              <span className="ticker-item"><span className="ticker-dot"></span>DIRECT WHATSAPP SENIOR DEV</span>
              <span className="ticker-item"><span className="ticker-dot"></span>PRODUCTION REST API &amp; MONGODB</span>
              <span className="ticker-item"><span className="ticker-dot"></span>FLAT-RATE NO MONTHLY SUBSCRIPTIONS</span>
              {/* Duplicate track for continuous seamless scroll */}
              <span className="ticker-item"><span className="ticker-dot"></span>REACT 18 &amp; VITE 5 STACK</span>
              <span className="ticker-item"><span className="ticker-dot"></span>SUB-SECOND LATENCY (&lt; 0.8s)</span>
              <span className="ticker-item"><span className="ticker-dot"></span>100/100 GOOGLE LIGHTHOUSE AUDIT</span>
              <span className="ticker-item"><span className="ticker-dot"></span>ZERO PAGE-BUILDER BLOAT</span>
              <span className="ticker-item"><span className="ticker-dot"></span>100% GIT SOURCE CODE OWNERSHIP</span>
              <span className="ticker-item"><span className="ticker-dot"></span>DIRECT WHATSAPP SENIOR DEV</span>
              <span className="ticker-item"><span className="ticker-dot"></span>PRODUCTION REST API &amp; MONGODB</span>
              <span className="ticker-item"><span className="ticker-dot"></span>FLAT-RATE NO MONTHLY SUBSCRIPTIONS</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="hero-stats-row anim-hero-7">
          <div className="stat-card">
            <span className="stat-number">React 18</span>
            <span className="stat-label">Modern Production Architecture</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">&lt; 1.0s</span>
            <span className="stat-label">Target Page Load Time</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Full Code &amp; IP Ownership</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">&lt; 24h</span>
            <span className="stat-label">Direct WhatsApp Developer SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
