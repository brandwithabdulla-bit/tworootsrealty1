'use client';

import { useState, useEffect } from 'react';
import { countryCodes } from '@/data/countries';
import SearchableCountrySelect from '@/components/SearchableCountrySelect';
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
    if (!countryCode) newErrors.countryCode = 'Please select a country code.';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else if (!/^[0-9\s()-]{5,20}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: `${countryCode} ${phone.trim()}`,
          countryCode,
          phoneNumber: phone.trim(),
          email: email.trim(),
          variant: 'brochure',
          context: `Brochure request: ${projectTitle || 'Project'}`,
          consent: true
        })
      }).catch(() => {});
    } catch {}

    // Do not download PDF. Show submitted confirmation message.
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
                Please provide your details below to receive the verified project brochure for <strong>{projectTitle}</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <label className={styles.formField}>
                Your Name *
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  autoFocus
                  required
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </label>

              <label className={styles.formField}>
                Mobile Number *
                <div className={styles.phoneRow}>
                  <SearchableCountrySelect
                    value={countryCode}
                    onChange={(val) => {
                      setCountryCode(val);
                      if (errors.countryCode) setErrors((prev) => ({ ...prev, countryCode: undefined }));
                    }}
                    theme="light"
                    required
                    ariaLabel="Country calling code"
                  />
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    required
                  />
                </div>
                {errors.countryCode && <span className={styles.fieldError}>{errors.countryCode}</span>}
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </label>

              <label className={styles.formField}>
                Email Address *
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  required
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
            <h2 className={styles.successTitle}>Request Submitted</h2>
            <p className={styles.successMsg}>
              Thank you, <strong>{name}</strong>! Your request for <strong>{projectTitle}</strong> has been submitted. Our team will connect with you at <strong>{countryCode} {phone}</strong> shortly.
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
