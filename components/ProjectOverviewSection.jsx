'use client';

import { useState } from 'react';
import BrochureModal from './BrochureModal';
import styles from './ProjectOverviewSection.module.css';

export default function ProjectOverviewSection({ item = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!item || !item.title) return null;

  // Build the "About [Title] at [Location]" heading
  const locationName = item.location || '';
  const titleHasLocation = locationName && item.title.toLowerCase().includes(locationName.toLowerCase());
  const heading = locationName && !titleHasLocation 
    ? `About ${item.title} at ${locationName}` 
    : `About ${item.title}`;

  // Helper to determine Down Payment
  const getDownPayment = () => {
    if (item.downPayment) return item.downPayment;
    if (Array.isArray(item.paymentPlan) && item.paymentPlan.length > 0) {
      const first = item.paymentPlan[0];
      if (first && first.percent) return `${first.percent}%`;
    }
    return '10%';
  };

  // Helper to determine Unit Options
  const getUnitOptions = () => {
    if (item.unitOptions) return item.unitOptions;
    if (Array.isArray(item.unitBreakdown) && item.unitBreakdown.length > 0) {
      const types = item.unitBreakdown.map(u => u.type).filter(Boolean);
      const nums = types
        .map(t => {
          const m = t.match(/(\d+)/);
          return m ? parseInt(m[1], 10) : null;
        })
        .filter(n => n !== null);
      if (nums.length > 1) {
        return `${Math.min(...nums)} - ${Math.max(...nums)} Bedrooms`;
      }
    }
    if (item.bedrooms) {
      if (item.bedrooms > 1) return `1 - ${item.bedrooms} Bedrooms`;
      return `${item.bedrooms} Bedrooms`;
    }
    if (item.propertyType?.toLowerCase().includes('villa')) {
      return '3 - 6 Bedrooms';
    }
    return '1 - 4 Bedrooms';
  };

  // Helper to determine Unit Size From
  const getUnitSize = () => {
    if (item.sizeFrom) return item.sizeFrom;
    if (item.minSize) return item.minSize;
    if (Array.isArray(item.unitBreakdown) && item.unitBreakdown.length > 0) {
      const firstWithSize = item.unitBreakdown.find(u => u.size || u.bua || u.plot);
      if (firstWithSize) return firstWithSize.size || firstWithSize.bua || firstWithSize.plot;
    }
    if (item.area) {
      return `${item.area.toLocaleString('en-AE')} sq. ft.`;
    }
    return '821 sq. ft.';
  };

  const specs = [
    { label: 'DOWN PAYMENT', value: getDownPayment() },
    { label: 'TYPE', value: item.propertyType || 'Apartment' },
    { label: 'UNIT OPTIONS', value: getUnitOptions() },
    { label: 'UNIT SIZE FROM', value: getUnitSize() },
    { label: 'STATUS', value: item.status || (item.offPlan ? 'Off-plan' : 'Ready') },
  ];

  if (item.handover) {
    specs.push({ label: 'HANDOVER', value: item.handover });
  }

  const description = item.description || '';
  const isLongDescription = description.length > 220;

  return (
    <section className={styles.overviewSection}>
      <div className={styles.overviewGrid}>
        {/* Left Column: About Title & Description */}
        <div className={styles.overviewLeft}>
          <h2 className={styles.overviewTitle}>{heading}</h2>
          <p className={`${styles.editorialCopy} ${isLongDescription && !isExpanded ? styles.clamped : styles.expanded}`}>
            {description}
          </p>

          {isLongDescription && (
            <button
              type="button"
              className={styles.readMoreBtn}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Read less' : 'Read more'}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${styles.chevronIcon} ${isExpanded ? styles.chevronIconRotated : ''}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>

        {/* Right Column: Specs Card with Brochure Button */}
        <div className={styles.overviewRight}>
          <div className={styles.specsCard}>
            {specs.map(({ label, value }) => (
              <div key={label} className={styles.specRow}>
                <span className={styles.specLabel}>{label}</span>
                <span className={styles.specValue}>{value}</span>
              </div>
            ))}

            <button
              type="button"
              className={styles.brochureBtn}
              onClick={() => setModalOpen(true)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Brochure</span>
            </button>
          </div>
        </div>
      </div>

      <BrochureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={item.title}
        brochureUrl={item.brochure}
      />
    </section>
  );
}
