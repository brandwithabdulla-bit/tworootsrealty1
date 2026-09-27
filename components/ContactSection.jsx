'use client';

import { useState } from 'react';
import { ArrowUpRight } from '@/components/ui';
import { EnquiryForm } from '@/components/interactive';
import styles from './ContactSection.module.css';

export default function ContactSection({ initialTab = 'Quick enquiry', context = '' }) {
  const tabs = ['Quick enquiry', 'Property requirement', 'Partnership / Referral'];
  const [tab, setTab] = useState(tabs.includes(initialTab) ? initialTab : 'Quick enquiry');

  const handleBookConsultation = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`container ${styles.contactSection}`}>
      <div className={styles.contactContainer}>
        {/* Left Card: Direct Advisory Info ("Let's talk.") */}
        <aside className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoBadge}>Direct Advisory &amp; Inquiries</span>
            <h2 className={styles.infoTitle}>Let&apos;s talk.</h2>
          </div>

          <div className={styles.channelsList}>
            {/* Phone */}
            <div className={styles.channelItem}>
              <div className={styles.channelIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className={styles.channelDetails}>
                <span className={styles.channelLabel}>Phone</span>
                <p className={styles.channelValue}>
                  <a href="tel:+971585830569" className={styles.channelLink}>+971 585830569</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className={styles.channelItem}>
              <div className={styles.channelIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className={styles.channelDetails}>
                <span className={styles.channelLabel}>Email</span>
                <p className={styles.channelValue}>
                  <a href="mailto:Info@tworootsrealty.com" className={styles.channelLink}>Info@tworootsrealty.com</a>
                </p>
              </div>
            </div>

            {/* Website */}
            <div className={styles.channelItem}>
              <div className={styles.channelIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className={styles.channelDetails}>
                <span className={styles.channelLabel}>Website</span>
                <p className={styles.channelValue}>
                  <a href="https://www.tworootsrealty.com" target="_blank" rel="noopener noreferrer" className={styles.channelLink}>www.tworootsrealty.com</a>
                </p>
              </div>
            </div>

            {/* Office Address */}
            <div className={styles.channelItem}>
              <div className={styles.channelIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className={styles.channelDetails}>
                <span className={styles.channelLabel}>Office Address</span>
                <p className={styles.channelValue}>
                  Office (707)<br />
                  City Avenue Building<br />
                  Port Saeed, Deira, Dubai
                </p>
              </div>
            </div>

            {/* Social connections */}
            <div className={styles.channelItem}>
              <div className={styles.channelIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <div className={styles.channelDetails}>
                <span className={styles.channelLabel}>Social Connections</span>
                <div className={styles.socialRow}>
                  <a href="https://instagram.com/tworootsrealty" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/tworootsrealty" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com/tworootsrealty" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/@tworootsrealty" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/971585830569" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation scheduling notice */}
          <div className={styles.consultationNotice}>
            <div className={styles.noticeIconWrap}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p className={styles.consultationText}>
              Two Roots Realty LLC | ORN 64022 · Licensed Real Estate Brokerage in Dubai, UAE.
            </p>
          </div>

          <a href="#contact-form" onClick={handleBookConsultation} className={styles.bookBtn}>
            <span>Book a Consultation</span>
            <ArrowUpRight size={15} />
          </a>
        </aside>

        {/* Right Card: Interactive Form & Tabbed Requirements */}
        <div id="contact-form" className={styles.formCard}>
          {/* Tab Navigation Segmented Bar */}
          <div className={styles.tabsTrack} role="tablist" aria-label="Enquiry categories">
            {tabs.map((x) => (
              <button
                key={x}
                type="button"
                role="tab"
                aria-selected={tab === x}
                aria-pressed={tab === x}
                className={`${styles.tabBtn} ${tab === x ? styles.tabBtnActive : ''}`}
                onClick={() => setTab(x)}
              >
                {x}
              </button>
            ))}
          </div>

          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{tab}</h2>
          </div>

          <div className={styles.formBody}>
            <EnquiryForm
              key={tab}
              variant={tab === 'Quick enquiry' ? 'quick' : tab === 'Partnership / Referral' ? 'referral' : 'full'}
              context={context || tab}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
