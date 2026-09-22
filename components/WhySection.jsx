import Link from 'next/link';
import { ArrowUpRight } from './ui';
import { why } from '@/data/brand';
import styles from './WhySection.module.css';

const WHY_ICONS = [
  // 01 Strong Dubai market knowledge (Skyline / Architecture)
  <svg key="01" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v8"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v11"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>,
  // 02 Personalised and transparent advice (Shield Check)
  <svg key="02" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>,
  // 03 Carefully evaluated opportunities (Compass / Evaluation)
  <svg key="03" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>,
  // 04 Trusted international network (Globe)
  <svg key="04" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  // 05 Complete assistance (Comprehensive Layers)
  <svg key="05" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>,
  // 06 Long-term relationships (Partnership / Connected Team)
  <svg key="06" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
];

export default function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>The Two Roots Approach</span>
          </div>
          <h2 className={styles.title}>
            Property is personal.<br />
            <em>So is our guidance.</em>
          </h2>
          <p className={styles.lead}>
            We understand these decisions are complex. We provide clarity.
          </p>
          <Link href="/contact" className={styles.advisorLink}>
            <span>Speak to an Advisor</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className={styles.cardsGrid}>
          {why.map((x, i) => (
            <div key={x} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.numberPill}>0{i + 1}</span>
                <div className={styles.iconWrap}>
                  {WHY_ICONS[i % WHY_ICONS.length]}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{x}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
