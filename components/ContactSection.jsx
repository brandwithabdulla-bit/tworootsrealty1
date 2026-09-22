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
                <p className={styles.channelValue}>[Phone number to be added]</p>
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
                <p className={styles.channelValue}>[Email address to be added]</p>
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
                <span className={styles.channelLabel}>Office address</span>
                <p className={styles.channelValue}>[Office address to be added]</p>
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
                <span className={styles.channelLabel}>Social connections</span>
                <p className={styles.channelValue}>[Social URLs to be added]</p>
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
              Consultation scheduling will be connected when the business calendar is supplied.
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
