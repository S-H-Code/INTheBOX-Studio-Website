import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle, AlertCircle, MessageSquare, Mail, Info } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { SERVICES, PACKAGES } from '../data';

// Dropdown choices: every service and package, straight from data.js
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), ...PACKAGES.map((p) => p.name)];

// The enquiry API only accepts six legacy values, so map each choice to the closest one.
// The visitor's exact choice is always appended to the message, so nothing is lost.
const API_SERVICE = {
  'Web Development': 'Business Website',
  'Branding & Graphic Design': 'Business Website',
  'SEO & Online Visibility': 'SEO / Growth',
  'Digital Advertising & Lead Generation': 'SEO / Growth',
  'Software & Automation': 'Web App Development',
  'Website Maintenance & Technical Support': 'Business Website',
  'Launch Box': 'Business Website',
  'Growth Box': 'SEO / Growth',
  'Scale Box': 'SEO / Growth'
};

const toApiPayload = (f) => ({
  name: f.name,
  email: f.email,
  phone: f.phone,
  service: API_SERVICE[f.service] || 'Business Website',
  budgetTier: 'Custom',
  timeline: f.timeline,
  estimatedBudget: f.estimatedBudget,
  details: `${f.details.trim()}\n\nService or package requested: ${f.service}`
});

export default function ContactSection({ preselectedData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    timeline: 'Standard (7-10 Days)',
    estimatedBudget: null,
    details: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync props when preselected from PricingPlans or ServiceGrid
  useEffect(() => {
    if (preselectedData) {
      if (typeof preselectedData === 'string') {
        setFormData((prev) => ({ ...prev, service: SERVICE_OPTIONS.includes(preselectedData) ? preselectedData : prev.service }));
      } else if (typeof preselectedData === 'object') {
        setFormData((prev) => ({
          ...prev,
          service: preselectedData.service || prev.service,
          timeline: preselectedData.timeline || prev.timeline,
          estimatedBudget: preselectedData.estimatedBudget || prev.estimatedBudget,
          details: preselectedData.details ? preselectedData.details : prev.details
        }));
      }
    }
  }, [preselectedData]);

  // Real-time validation logic
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Please enter your name.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^\S+@\S+\.\S+$/.test(value.trim())) return 'Invalid email address.';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone / WhatsApp is required.';
        if (value.trim().replace(/\D/g, '').length < 8) return 'Please enter a valid phone number.';
        return '';
      case 'details':
        if (!value.trim()) return 'Project details are required.';
        if (value.trim().length < 10) return 'Please share a brief note about what you are looking to build.';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      details: validateField('details', formData.details)
    };

    setTouched({ name: true, email: true, phone: true, details: true });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) {
      setResponseStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.'
      });
      return;
    }

    setLoading(true);
    setResponseStatus(null);

    setToast({
      type: 'info',
      title: 'Sending your brief',
      desc: 'This takes a moment.'
    });

    try {
      const result = await submitEnquiry(toApiPayload(formData));

      setResponseStatus({
        type: 'success',
        message: result.message || 'Project brief received! We will message you on WhatsApp or email within 24 hours.'
      });

      setToast({
        type: 'success',
        title: 'Brief sent',
        desc: 'We will reach out on WhatsApp or email within 24 hours.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Web Development',
        timeline: 'Standard (7-10 Days)',
        estimatedBudget: null,
        details: ''
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      setResponseStatus({
        type: 'error',
        message: 'We could not reach our server. Please message us on WhatsApp instead and we will pick it up there.'
      });
      setToast({
        type: 'error',
        title: 'Could not send your brief',
        desc: 'Message us on WhatsApp instead and we will pick it up there.'
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast(null);
      }, 7000);
    }
  };

  return (
    <section className="content-section contact">
      {toast && (
        <div className={`toast ${toast.type}`} role="status" aria-live="polite">
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </span>
          <div className="toast-body">
            <strong>{toast.title}</strong>
            <p>{toast.desc}</p>
          </div>
          <button type="button" className="toast-close" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      <div className="wrap contact-grid">
        <div className="contact-main">

          <form onSubmit={handleSubmit} noValidate className="form">
            <div className="form-row">
              <div className={`field ${errors.name && touched.name ? 'has-error' : ''}`}>
                <label htmlFor="f-name">Your name *</label>
                <input
                  id="f-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Alex Turner"
                  autoComplete="name"
                  aria-invalid={!!(errors.name && touched.name)}
                />
                {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className={`field ${errors.email && touched.email ? 'has-error' : ''}`}>
                <label htmlFor="f-email">Email address *</label>
                <input
                  id="f-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="alex@company.com"
                  autoComplete="email"
                  aria-invalid={!!(errors.email && touched.email)}
                />
                {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className={`field ${errors.phone && touched.phone ? 'has-error' : ''}`}>
                <label htmlFor="f-phone">WhatsApp or phone number *</label>
                <input
                  id="f-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 81216 53893"
                  autoComplete="tel"
                  aria-invalid={!!(errors.phone && touched.phone)}
                />
                {errors.phone && touched.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="field">
                <label htmlFor="f-service">Service or package *</label>
                <select id="f-service" name="service" value={formData.service} onChange={handleChange}>
                  <optgroup label="Services">
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Packages">
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} · {p.price} {p.per}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="form-row single">
              <div className="field">
                <label htmlFor="f-timeline">Target launch timeline</label>
                <input
                  id="f-timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="For example: within 2 weeks, or as soon as possible"
                />
              </div>
            </div>

            <div className={`field ${errors.details && touched.details ? 'has-error' : ''}`}>
              <label htmlFor="f-details">Project goals and reference sites *</label>
              <textarea
                id="f-details"
                rows={5}
                name="details"
                value={formData.details}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What are you building, which sites do you like, and when do you want to launch?"
                aria-invalid={!!(errors.details && touched.details)}
              />
              {errors.details && touched.details && <span className="field-error">{errors.details}</span>}
            </div>

            <button className="btn btn-dark btn-lg submit" type="submit" disabled={loading}>
              <span>{loading ? 'Sending…' : 'Send enquiry'}</span>
              {!loading && <ArrowUpRight size={18} aria-hidden="true" />}
            </button>

            {responseStatus && (
              <div className={`form-status ${responseStatus.type}`} role="status">
                {responseStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{responseStatus.message}</span>
              </div>
            )}
          </form>
        </div>

        <aside className="contact-side" aria-label="Other ways to reach us">
          <div className="side-block" data-tone="green">
            <MessageSquare size={22} aria-hidden="true" />
            <h3>Prefer to chat?</h3>
            <p>Skip the form and message the developer directly for a quick feasibility check.</p>
            <a
              className="btn btn-dark"
              href="https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noreferrer"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="side-block" data-tone="blue">
            <Mail size={22} aria-hidden="true" />
            <h3>Email the studio</h3>
            <p>Send Figma links, brand references or briefs to our inbox.</p>
            <a className="side-link" href="mailto:hello@intheboxstudio.in">hello@intheboxstudio.in</a>
          </div>

          <dl className="side-stats" data-tone="lilac">
            <div>
              <dt>&lt; 24h</dt>
              <dd>Response time</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Code ownership</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
