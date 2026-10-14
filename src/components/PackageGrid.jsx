import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import LogoMark from './LogoMark';
import { PACKAGES } from '../data';

export default function PackageGrid({ onSelectPackage }) {
  return (
    <section className="content-section">
      <div className="wrap">
        <div className="packages">
          {PACKAGES.map((p, i) => (
            <article key={p.id} className="package" data-tone={p.tone} style={{ '--wm': 0.62 + i * 0.19 }}>
              <LogoMark className="package-watermark" />
              <p className="package-goal">{p.goal}</p>
              <h2 className="package-name">{p.name}</h2>
              <p className="package-price">
                <span className="package-amount">{p.price}</span>
                <span className="package-per">{p.per}</span>
              </p>

              <ul className="package-list">
                {p.includes.map((f) => (
                  <li key={f}>
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="package-cta" onClick={() => onSelectPackage(p.name)}>
                <span>Choose {p.name}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <p className="packages-note">
          Need something that is not covered here? <strong>Tell us what you are building</strong> and we will quote it separately.
        </p>
      </div>
    </section>
  );
}
