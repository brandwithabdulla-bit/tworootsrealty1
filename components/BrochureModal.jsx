'use client';

import { useState, useEffect } from 'react';
import { countryCodes } from '@/data/countries';
import styles from './BrochureModal.module.css';

export default function BrochureModal({ open, onClose, projectTitle, brochureUrl }) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!phone.trim()) newErrors.phone = 'Please enter your mobile number.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trigger download of the brochure
    if (brochureUrl) {
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-brochure.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setSubmitted(true);
  };

  return (
    <div className={styles.dialogBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close dialog">
          ×
        </button>

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.eyebrow}>Official Documentation</span>
              <h2 className={styles.modalTitle}>Download Brochure</h2>
              <p className={styles.modalSubtitle}>
                Please provide your details below to download the verified project brochure for <strong>{projectTitle}</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <label className={styles.formField}>
                Your Name *
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </label>

              <label className={styles.formField}>
                Mobile Number *
                <div className={styles.phoneRow}>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {countryCodes.map((c) => (
                      <option key={`${c.code}-${c.dial_code}`} value={c.dial_code}>
                        {c.code} {c.dial_code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </label>

              <label className={styles.formField}>
                Email Address *
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
              </label>

              <button type="submit" className={styles.submitBtn}>
                <span>Download Brochure</span>
                <span>↗</span>
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>We will reach you</h2>
            <p className={styles.successMsg}>
              Thank you, <strong>{name}</strong>! Your official brochure download has started. Our team has received your enquiry and will reach out to you shortly.
            </p>
            <button className={styles.submitBtn} onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
