import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare, Mail, Phone, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { submitEnquiry } from '../services/api';

export default function ContactSection({ preselectedData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Full Business Website',
    budgetTier: 'Discuss Scope / Flexible',
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
        setFormData((prev) => ({ ...prev, service: preselectedData }));
      } else if (typeof preselectedData === 'object') {
        setFormData((prev) => ({
          ...prev,
          service: preselectedData.service || prev.service,
          budgetTier: preselectedData.budgetTier || prev.budgetTier,
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
        message: 'Please resolve the highlighted fields above.'
      });
      return;
    }

    setLoading(true);
    setResponseStatus(null);

    setToast({
      type: 'info',
      title: 'Sending Your Project Brief...',
      desc: 'Connecting with our studio API.'
    });

    try {
      const result = await submitEnquiry(formData);

      setResponseStatus({
        type: 'success',
        message: result.message || 'Project brief received! We will message you on WhatsApp or email within 24 hours.'
      });

      setToast({
        type: 'success',
        title: 'Project Brief Sent!',
        desc: 'Our developer will reach out directly on WhatsApp.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Full Business Website',
        budgetTier: 'Discuss Scope / Flexible',
        timeline: 'Standard (7-10 Days)',
        estimatedBudget: null,
        details: ''
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      setResponseStatus({
        type: 'error',
        message: 'Could not connect to studio server. Please tap the WhatsApp button on the right to chat directly.'
      });
      setToast({
        type: 'error',
        title: 'Submission Notice',
        desc: 'Direct WhatsApp link on the right is active 24/7.'
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast(null);
      }, 7000);
    }
  };

  return (
    <section id="contact-form" className="contact-wrap">
      {/* Toast Feedback */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
            {toast.type === 'info' && <Sparkles size={20} />}
          </div>
          <div className="toast-body">
            <strong>{toast.title}</strong>
            <p>{toast.desc}</p>
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}

      <div className="contact-container">
        {/* Main Form Card */}
        <div className="contact-card">
          <div className="contact-card-head">
            <span className="eyebrow">
              <span className="dot-pulse"></span>
              START A PROJECT
            </span>
            <h2 className="contact-title">
              Let's build your brand's <br />
              <span className="text-gradient">high-converting website.</span>
            </h2>
            <p className="contact-sub">
              Share your project vision, timeline, and goals below. We respond within 24 hours with a transparent project breakdown and timeline.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className={`field ${errors.name && touched.name ? 'has-error' : ''}`}>
                <label>Your Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Alex Turner"
                  autoComplete="name"
                />
                {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className={`field ${errors.email && touched.email ? 'has-error' : ''}`}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. alex@company.com"
                  autoComplete="email"
                />
                {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className={`field ${errors.phone && touched.phone ? 'has-error' : ''}`}>
                <label>WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. +91 81216 53893"
                  autoComplete="tel"
                />
                {errors.phone && touched.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="field">
                <label>Service or Package *</label>
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                  <option value="Full Business Website">Full Business Website</option>
                  <option value="Custom Web App & Catalog">Custom Web App &amp; Catalog</option>
                  <option value="Full Website Redesign">Full Website Redesign</option>
                  <option value="Speed & SEO Optimization">Speed &amp; SEO Optimization</option>
                  <option value="Custom Enterprise">Custom Enterprise Build</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Project Scope / Tier</label>
                <select name="budgetTier" value={formData.budgetTier} onChange={handleChange}>
                  <option value="Discuss Scope / Flexible">Discuss Scope / Flexible</option>
                  <option value="Standard Build">Standard Build</option>
                  <option value="Growth & Custom Scope">Growth &amp; Custom Scope</option>
                  <option value="Enterprise Solution">Enterprise Solution</option>
                </select>
              </div>

              <div className="field">
                <label>Target Launch Timeline</label>
                <input
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g. 5-7 Days / ASAP"
                />
              </div>
            </div>

            <div className={`field ${errors.details && touched.details ? 'has-error' : ''}`}>
              <label>Project Scope, Goals &amp; Competitor References *</label>
              <textarea
                rows={4}
                name="details"
                value={formData.details}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us what you are building, any reference websites you like, and your target launch date..."
              />
              {errors.details && touched.details && <span className="field-error">{errors.details}</span>}
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <span>Transmitting Project Brief...</span>
              ) : (
                <>
                  <span>Send Project Enquiry</span>
                  <Send size={16} />
                </>
              )}
            </button>

            {responseStatus && (
              <div className={`status-banner ${responseStatus.type}`}>
                {responseStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{responseStatus.message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Side Panel: Direct Contacts & Guarantees */}
        <aside className="side-panel">
          <div className="info-card highlight-card">
            <div className="card-top-icon">
              <MessageSquare size={22} />
            </div>
            <h3>Prefer instant communication?</h3>
            <p>Skip the form and chat directly with our developer on WhatsApp for immediate feasibility checks and answers.</p>
            <a
              className="info-btn-whatsapp"
              href="https://wa.me/918121653893?text=Hi%20INTheBOX%20Studio,%20I'd%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noreferrer"
            >
              <span>Chat on WhatsApp Direct ↗</span>
            </a>
          </div>

          <div className="info-card">
            <div className="card-top-icon">
              <Mail size={22} />
            </div>
            <h3>Email Studio Desk</h3>
            <p>Send Figma links, brand references, or RFPs directly to our studio inbox.</p>
            <a className="info-link" href="mailto:hello@intheboxstudio.in">
              <span>hello@intheboxstudio.in ↗</span>
            </a>
          </div>

          <div className="info-card stats-subcard">
            <div className="stats-row">
              <div className="stats-col">
                <span className="val">&lt; 24h</span>
                <span className="lbl">Response SLA</span>
              </div>
              <div className="stats-col">
                <span className="val">100%</span>
                <span className="lbl">Code Ownership</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
