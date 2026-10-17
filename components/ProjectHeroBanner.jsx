'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectHeroBanner.module.css';

export default function ProjectHeroBanner({ item = {} }) {
  // Resolve hero image: prioritize dedicated heroImage from schema, fallback to first gallery image
  const rawHero = item?.heroImage;
  const rawGallery = item?.gallery || item?.images || [];
  const rawFirst = Array.isArray(rawGallery) ? rawGallery[0] : rawGallery;
  const targetImage = rawHero || rawFirst;
  
  let heroImage = '/images/dubai.jpg';
  if (typeof targetImage === 'string' && targetImage) {
    heroImage = targetImage;
  } else if (targetImage && typeof targetImage === 'object') {
    heroImage = targetImage?.asset?.url || targetImage?.url || '/images/dubai.jpg';
  }

  // Calculate payment plan ratio
  const getPaymentPlanRatio = () => {
    if (item?.paymentPlanRatio) return item.paymentPlanRatio;
    if (typeof item?.paymentPlan === 'string' && item.paymentPlan.trim()) {
      return item.paymentPlan.trim();
    }
    if (Array.isArray(item?.paymentPlan) && item.paymentPlan.length > 0) {
      const handoverStep = item.paymentPlan.find(s => 
        s.label?.toLowerCase().includes('handover') || 
        s.label?.toLowerCase().includes('completion')
      );
      if (handoverStep && handoverStep.percent) {
        const during = 100 - handoverStep.percent;
        return `${during}/${handoverStep.percent}`;
      }
    }
    return '80/20';
  };

  const startingPrice = item?.priceLabel || (item?.price ? `AED ${item.price.toLocaleString('en-AE')}` : 'Price on Application');
  const handoverDate = item?.handover || 'Q4 2028';
  const paymentPlanRatio = getPaymentPlanRatio();

  const handleEnquireClick = (e) => {
    e.preventDefault();
    const enquiryElem = document.getElementById('enquiry-form') || document.querySelector('.sticky-enquiry');
    if (enquiryElem) {
      enquiryElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = enquiryElem.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 600);
    }
  };

  return (
    <section className={styles.heroWrapper} aria-label={`${item.title || 'Project'} Hero`}>
      {/* Background Image */}
      <div className={styles.heroBackground}>
        <Image
          src={heroImage}
          alt={`${item.title || 'Project'} hero photograph`}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/projects">PROJECTS</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{item.title}</span>
        </nav>

        {/* Title Area */}
        <div className={styles.titleArea}>
          {item.developer && (
            <div className={styles.developerBadge}>
              <span>{item.developer}</span>
            </div>
          )}
          <h1 className={styles.heroTitle}>{item.title}</h1>
          {item.location && <p className={styles.heroLocation}>{item.location}</p>}
        </div>

        {/* Bottom Bar: Stats Cards & Enquire Now */}
        <div className={styles.heroBottomBar}>
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>STARTING FROM</span>
              <p className={styles.statValue}>{startingPrice}</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>HANDOVER</span>
              <p className={styles.statValue}>{handoverDate}</p>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>PAYMENT PLAN</span>
              <p className={styles.statValue}>{paymentPlanRatio}</p>
            </div>
          </div>

          <a href="#enquiry-form" className={styles.enquireBtn} onClick={handleEnquireClick}>
            <span>Enquire now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
