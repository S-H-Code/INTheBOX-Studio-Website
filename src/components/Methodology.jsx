import React from 'react';

const STEPS = [
  { tone: 'blue', step: 'Discovery and architecture', title: 'Understand before designing.', desc: 'We study your goals, your audience, your competitors and your conversion funnel before a single pixel is drawn.', deliverable: 'Strategic blueprint' },
  { tone: 'orange', step: 'Design', title: 'Make the brand impossible to ignore.', desc: 'High-contrast typography, disciplined spacing, subtle interaction and generous white space that earns immediate respect.', deliverable: 'Figma files and design tokens' },
  { tone: 'yellow', step: 'Engineering', title: 'Custom code, zero template bloat.', desc: 'Built with React 18, Vite and Node/Express, and tuned for sub-second loads, search crawlers and solid security.', deliverable: 'Production-ready codebase' },
  { tone: 'green', step: 'Launch', title: 'Go live with momentum.', desc: 'Domain connection, SSL, schema verification and automated lead capture with WhatsApp notifications.', deliverable: 'Lighthouse 99+ audit pass' }
];

export default function Methodology() {
  return (
    <section className="content-section">
      <div className="wrap">
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.step} className="step" data-tone={s.tone}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <div className="step-body">
                <p className="step-name">{s.step}</p>
                <h2 className="step-title">{s.title}</h2>
                <p className="step-desc">{s.desc}</p>
                <p className="step-out"><span>You get:</span> {s.deliverable}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
