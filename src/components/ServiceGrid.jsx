import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '../data';

export default function ServiceGrid({ onSelectService }) {
  return (
    <section className="content-section">
      <div className="wrap">
        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className={`service ${s.tone === 'blue' ? 'is-featured' : ''}`} data-tone={s.tone}>
              <span className="service-no" aria-hidden="true">{s.no}</span>
              <h2 className="service-title">{s.title}</h2>
              <p className="service-summary">{s.summary}</p>

              <ul className="service-list">
                {s.items.map((f) => (
                  <li key={f}>
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="service-cta" onClick={() => onSelectService(s.title)}>
                <span>Discuss this service</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
