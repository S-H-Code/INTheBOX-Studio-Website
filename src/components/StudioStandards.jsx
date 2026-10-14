import React from 'react';

const STANDARDS = [
  { tone: 'blue', title: 'No page-builder bloat', desc: 'No WordPress templates or drag-and-drop builders. Every project is written in clean, modern React 18 for speed and long-term maintainability.' },
  { tone: 'orange', title: 'Sub-second load times', desc: 'Google ranks fast sites higher. We tune images, CSS delivery and bundle size so pages load in under a second on mobile networks.' },
  { tone: 'yellow', title: 'You own the code', desc: 'You receive the complete production repository. No recurring builder subscriptions, no vendor lock-in, no hidden maintenance fees.' },
  { tone: 'green', title: 'Mobile-first by default', desc: 'Most of your customers arrive on a phone. We design for it first, with comfortable tap targets, crisp type and touch-friendly navigation.' },
  { tone: 'pink', title: 'Technical SEO built in', desc: 'Semantic HTML, JSON-LD structured data, social share previews and clean sitemaps, so search engines can index you properly.' },
  { tone: 'lilac', title: 'Talk to the developer', desc: 'No ticket queues or account managers. You speak directly with the person building your site on WhatsApp, with weekly milestones.' }
];

export default function StudioStandards() {
  return (
    <section className="content-section">
      <div className="wrap">
        <ul className="tiles">
          {STANDARDS.map((s) => (
            <li key={s.title} className="tile" data-tone={s.tone}>
              <span className="tile-face" aria-hidden="true" />
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
