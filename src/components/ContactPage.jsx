import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AMRUTHAM_PHONE, AMRUTHAM_PHONE_RAW } from '../data/products';
import './ContactPage.css';

const LOCATIONS = [
  {
    id: 'manufacturing-mill',
    title: 'Thirupandiyur Workshop & Mill',
    subheading: 'Manufacturing Unit & Traditional Flour Mill',
    coordinates: '12°57\'29.6"N 79°52\'53.9"E',
    addressLines: [
      'No 4, Vadamangalam Main Road',
      'Thirupandiyur Village, Kadampathur Block',
      'Thiruvallur District, Tamil Nadu – 602108'
    ],
    phone: AMRUTHAM_PHONE,
    phoneRaw: AMRUTHAM_PHONE_RAW,
    whatsapp: AMRUTHAM_PHONE,
    whatsappRaw: AMRUTHAM_PHONE_RAW,
    email: 'amruthammasala@gmail.com',
    hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST'
  },
  {
    id: 'support-orders',
    title: 'Customer Care & Direct Inquiries',
    subheading: 'Support, Retail & Bulk Orders',
    coordinates: 'Kadampathur Block, Tamil Nadu',
    addressLines: [
      'Dispatch Center: Thirupandiyur Village',
      'Kadampathur Block, Tamil Nadu – 602108'
    ],
    phone: AMRUTHAM_PHONE,
    phoneRaw: AMRUTHAM_PHONE_RAW,
    whatsapp: AMRUTHAM_PHONE,
    whatsappRaw: AMRUTHAM_PHONE_RAW,
    email: 'amruthammasala@gmail.com',
    hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST'
  }
];

const TOPIC_OPTIONS = [
  'General Inquiry',
  'Product Inquiry',
  'Order Support',
  'Feedback',
  'Other'
];

// Target Coordinates: 12°57'29.6"N 79°52'53.9"E
const PRIMARY_COORDS = {
  lat: 12.958222,
  lng: 79.881639,
  label: '12°57\'29.6"N 79°52\'53.9"E'
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submissionState, setSubmissionState] = useState('idle'); // 'idle' | 'notice'
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Map refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(13);

  // Initialize Interactive Leaflet Map matching the template screenshot
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet map centered at 12°57'29.6"N 79°52'53.9"E
    const map = L.map(mapContainerRef.current, {
      center: [PRIMARY_COORDS.lat, PRIMARY_COORDS.lng],
      zoom: 13,
      minZoom: 4,
      maxZoom: 18,
      scrollWheelZoom: true, // Smooth scroll wheel zoom enabled (scroll down to zoom out)
      wheelDebounceTime: 40,
      zoomControl: false, // Custom styled controls
      attributionControl: false
    });

    // Standard free OpenStreetMap tiles (100% free, zero API key required, no watermarks)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom teardrop pin matching the reference screenshot:
    // - White rounded pill tooltip badge above
    // - Deep teal-green teardrop circular pin with wheat/grain icon
    // - Sharp bottom pointer anchored to exact coordinates
    const createMarkerHtml = (name, isPrimary = true) => `
      <div class="template-pin-container ${isPrimary ? 'is-primary' : 'is-secondary'}">
        <div class="template-pin-pill">
          <span class="pill-text">${name}</span>
        </div>
        <div class="template-pin-circle">
          <svg class="template-pin-grain-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 22 16 8"/>
            <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
            <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/>
            <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
            <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
          </svg>
        </div>
        <div class="template-pin-tip"></div>
      </div>
    `;

    // 1. Primary Verified Location: Thirupandiyur Workshop & Mill at 12°57'29.6"N 79°52'53.9"E
    const primaryIcon = L.divIcon({
      html: createMarkerHtml('Amrutham Workshop & Mill', true),
      className: 'template-leaflet-div-icon',
      iconSize: [210, 84],
      iconAnchor: [105, 82],
    });
    L.marker([PRIMARY_COORDS.lat, PRIMARY_COORDS.lng], { icon: primaryIcon }).addTo(map);

    // Track zoom state
    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Zoom handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleResetMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([PRIMARY_COORDS.lat, PRIMARY_COORDS.lng], 13);
    }
  };

  const validate = (values) => {
    const errs = {};

    if (!values.name.trim()) {
      errs.name = 'Please enter your name.';
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!values.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!values.topic) {
      errs.topic = 'Please select a topic.';
    }

    if (!values.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (values.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const currentErrors = validate(updated);
      setErrors(currentErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      company: true,
      topic: true,
      message: true
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setSubmissionState('notice');
  };

  const formattedMessage = `Topic: ${formData.topic || 'General Inquiry'}
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}${formData.company.trim() ? `\nCompany: ${formData.company.trim()}` : ''}
Message: ${formData.message.trim()}`;

  const directWhatsAppUrl = `https://wa.me/${AMRUTHAM_PHONE_RAW}?text=${encodeURIComponent(
    `Hello Amrutham, I have a ${formData.topic || 'contact'} inquiry from your website:\n\n${formattedMessage}`
  )}`;

  const directMailtoUrl = `mailto:amruthammasala@gmail.com?subject=${encodeURIComponent(
    `[${formData.topic || 'Inquiry'}] Website message from ${formData.name.trim()}`
  )}&body=${encodeURIComponent(formattedMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard?.writeText(formattedMessage).then(() => {
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3000);
    });
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${PRIMARY_COORDS.lat},${PRIMARY_COORDS.lng}`;

  return (
    <div className="amrutham-contact-page">
      {/* ══════════════════════════════════════════════════════════════════
          MAIN TWO-COLUMN EDITORIAL CONTACT SECTION
          ══════════════════════════════════════════════════════════════════ */}
      <section className="contact-editorial-section" aria-labelledby="contact-main-heading">
        <div className="contact-editorial-container">
          <div className="contact-editorial-grid">

            {/* ────────────────────────────────────────────────────────
                LEFT COLUMN: OUR LOCATIONS
                ──────────────────────────────────────────────────────── */}
            <div className="contact-locations-col">
              <h1 id="contact-main-heading" className="contact-column-heading">
                Our Locations
              </h1>

              <div className="locations-groups-container">
                {LOCATIONS.map((loc) => (
                  <article key={loc.id} className="location-group">
                    <h2 className="location-group-title">{loc.title}</h2>
                    <p className="location-group-subheading">{loc.subheading}</p>

                    {/* Coordinates & Address */}
                    <div className="location-info-row">
                      <span className="location-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      </span>
                      <address className="location-address">
                        {loc.addressLines.map((line, idx) => (
                          <span key={idx} className="address-line-item">{line}</span>
                        ))}
                        <span className="address-coords-badge">{loc.coordinates}</span>
                      </address>
                    </div>

                    {/* Phone Number */}
                    <div className="location-info-row">
                      <span className="location-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <a
                        href={`tel:${loc.phoneRaw}`}
                        className="location-link"
                        aria-label={`Call ${loc.title} at ${loc.phone}`}
                      >
                        {loc.phone}
                      </a>
                    </div>

                    {/* WhatsApp */}
                    {loc.whatsapp && (
                      <div className="location-info-row">
                        <span className="location-icon" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        </span>
                        <a
                          href={`https://wa.me/${loc.whatsappRaw}?text=${encodeURIComponent('Hi Amrutham, I have an inquiry about your products.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="location-link"
                          aria-label={`WhatsApp message ${loc.title} at ${loc.whatsapp}`}
                        >
                          WhatsApp: {loc.whatsapp}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    {loc.email && (
                      <div className="location-info-row">
                        <span className="location-icon" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </span>
                        <a
                          href={`mailto:${loc.email}`}
                          className="location-link"
                          aria-label={`Email ${loc.title} at ${loc.email}`}
                        >
                          {loc.email}
                        </a>
                      </div>
                    )}

                    {/* Working Hours */}
                    {loc.hours && (
                      <p className="location-hours-note">
                        Hours: {loc.hours}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────
                RIGHT COLUMN: CONTACT FORM ("Send us a message")
                ──────────────────────────────────────────────────────── */}
            <div className="contact-form-col">
              <h2 className="contact-column-heading">
                Send us a message
              </h2>

              {submissionState === 'notice' ? (
                /* ── Honest Submission State Notice ── */
                <div className="form-editorial-notice" role="region" aria-label="Message Status">
                  <div className="notice-editorial-header">
                    <span className="notice-badge">MESSAGE PREPARED</span>
                    <h3 className="notice-headline">Almost There!</h3>
                  </div>

                  <p className="notice-text">
                    Thank you, <strong>{formData.name}</strong>. Because this site operates as a static client without an automated backend email gateway, messages cannot be delivered silently behind the scenes.
                  </p>

                  <p className="notice-text">
                    Your complete message has been formatted. Choose how you would like to send it directly to our team:
                  </p>

                  <div className="notice-preview-box">
                    <pre className="notice-preview-text">{formattedMessage}</pre>
                  </div>

                  <div className="notice-action-row">
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="notice-pill-btn whatsapp-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span>Send on WhatsApp</span>
                    </a>

                    <a
                      href={directMailtoUrl}
                      className="notice-pill-btn email-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span>Send via Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="notice-pill-btn copy-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>{copiedNotice ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmissionState('idle')}
                    className="notice-edit-link"
                  >
                    ← Edit your message
                  </button>
                </div>
              ) : (
                /* ── Clean Pill-Form ── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="contact-pill-form"
                  aria-label="Send us a message"
                >
                  {/* Name (Required) */}
                  <div className="pill-form-group">
                    <label htmlFor="field-name" className="pill-form-label">
                      Name <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your full name"
                      aria-required="true"
                      aria-invalid={touched.name && Boolean(errors.name)}
                      aria-describedby={touched.name && errors.name ? 'err-name' : undefined}
                      className={`pill-input ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    />
                    {touched.name && errors.name && (
                      <span id="err-name" className="pill-error-text" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email address (Required) */}
                  <div className="pill-form-group">
                    <label htmlFor="field-email" className="pill-form-label">
                      Email address <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="field-email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="your.email@example.com"
                      aria-required="true"
                      aria-invalid={touched.email && Boolean(errors.email)}
                      aria-describedby={touched.email && errors.email ? 'err-email' : undefined}
                      className={`pill-input ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    {touched.email && errors.email && (
                      <span id="err-email" className="pill-error-text" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Company (Optional) */}
                  <div className="pill-form-group">
                    <div className="label-with-optional">
                      <label htmlFor="field-company" className="pill-form-label">
                        Company
                      </label>
                      <span className="optional-tag">Optional</span>
                    </div>
                    <input
                      type="text"
                      id="field-company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Company or organization"
                      className="pill-input"
                    />
                  </div>

                  {/* Topic dropdown (Required) */}
                  <div className="pill-form-group">
                    <label htmlFor="field-topic" className="pill-form-label">
                      Topic <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <div className="select-pill-wrapper">
                      <select
                        id="field-topic"
                        name="topic"
                        value={formData.topic}
                        onChange={(e) => handleChange('topic', e.target.value)}
                        onBlur={() => handleBlur('topic')}
                        aria-required="true"
                        aria-invalid={touched.topic && Boolean(errors.topic)}
                        aria-describedby={touched.topic && errors.topic ? 'err-topic' : undefined}
                        className={`pill-select ${touched.topic && errors.topic ? 'is-invalid' : ''}`}
                      >
                        <option value="" disabled>Select a topic</option>
                        {TOPIC_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <span className="select-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                    {touched.topic && errors.topic && (
                      <span id="err-topic" className="pill-error-text" role="alert">
                        {errors.topic}
                      </span>
                    )}
                  </div>

                  {/* Message (Required) */}
                  <div className="pill-form-group">
                    <label htmlFor="field-message" className="pill-form-label">
                      Message <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="field-message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Write your message here..."
                      aria-required="true"
                      aria-invalid={touched.message && Boolean(errors.message)}
                      aria-describedby={touched.message && errors.message ? 'err-message' : undefined}
                      className={`pill-textarea ${touched.message && errors.message ? 'is-invalid' : ''}`}
                    ></textarea>
                    {touched.message && errors.message && (
                      <span id="err-message" className="pill-error-text" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="pill-submit-button"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. LARGE WIDE LOCATION MAP SECTION (MATCHING TEMPLATE REFERENCE)
          - Large rounded corners (36px)
          - Soft, minimal light map tiles
          - Coordinates: 12°57'29.6"N 79°52'53.9"E
          - Scroll wheel zooms out / zooms in smoothly
          - Custom pins with speech bubble pill label and grain stalk icon
          ══════════════════════════════════════════════════════════════════ */}
      <section className="contact-map-section" aria-label="Workshop and Mill Location Map">
        <div className="contact-editorial-container">
          <div className="template-map-card">

            {/* Top Interactive Bar with Coordinates & Live Controls */}
            <div className="template-map-bar">
              <div className="map-meta-left">
                <span className="map-status-pill">
                  <span className="pulse-dot" aria-hidden="true"></span>
                  <span>VERIFIED LOCATION</span>
                </span>
                <span className="map-coords-text">
                  12°57'29.6"N 79°52'53.9"E &bull; Thirupandiyur Village
                </span>
              </div>

              <div className="map-controls-group">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="map-control-btn"
                  title="Zoom in"
                  aria-label="Zoom in on map"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="map-control-btn"
                  title="Zoom out (or scroll down on map)"
                  aria-label="Zoom out on map"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleResetMap}
                  className="map-control-btn reset-btn"
                  title="Reset to Mill Center"
                  aria-label="Reset map view to Amrutham mill"
                >
                  Reset View
                </button>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-open-link-btn"
                  aria-label="Open in Google Maps"
                >
                  <span>Google Maps</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Interactive Leaflet Map Container */}
            <div className="template-map-canvas-wrapper">
              <div
                ref={mapContainerRef}
                className="template-map-canvas"
                aria-label="Interactive map centered at 12°57'29.6N 79°52'53.9E"
              ></div>

              {/* Scroll Zoom Hint Badge */}
              <div className="scroll-zoom-hint" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="m8 12 4 4 4-4" />
                </svg>
                <span>Scroll on map to zoom out ({currentZoom}x)</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Spacing before footer */}
      <div className="contact-bottom-spacer" aria-hidden="true" />
    </div>
  );
}
