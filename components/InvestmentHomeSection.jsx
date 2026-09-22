import Link from 'next/link';
import { ArrowUpRight } from './ui';
import styles from './InvestmentHomeSection.module.css';

export default function InvestmentHomeSection() {
  return (
    <section className={styles.investmentSection}>
      <div className={`container ${styles.container}`}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>Dubai Investment Perspective</span>
          </div>

          <h2 className={styles.title}>
            See the opportunity.<br />
            <em>Understand the bigger picture.</em>
          </h2>

          <div className={styles.focusPills}>
            <div className={styles.focusPill}>
              <span className={styles.focusPillNumber}>01</span>
              <span>Capital Growth &amp; Rental Yield Analysis</span>
            </div>
            <div className={styles.focusPill}>
              <span className={styles.focusPillNumber}>02</span>
              <span>Flexible Developer Payment Plans</span>
            </div>
            <div className={styles.focusPill}>
              <span className={styles.focusPillNumber}>03</span>
              <span>Long-Term Portfolio Diversification</span>
            </div>
          </div>
        </div>

        {/* Right Glass Card */}
        <div className={styles.glassCard}>
          <p className={styles.lead}>
            A property should fit your ambitions, your timeline and your appetite for risk.
          </p>

          <p className={styles.bodyText}>
            From payment plans to long-term ownership, we help you ask the right questions and make a more informed decision.
          </p>

          <div className={styles.btnWrap}>
            <Link href="/investment" className={styles.investBtn}>
              <span>Invest with perspective</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <p className={styles.disclaimer}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Property values and income can change. Returns are never guaranteed.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
