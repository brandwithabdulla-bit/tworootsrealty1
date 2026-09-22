import Link from 'next/link';
import { ArrowUpRight } from './ui';
import styles from './CTASection.module.css';

export default function CTASection({
  title = "Let's Find the Right Property for You",
  text = 'Whether you are buying a home or building an investment portfolio, our team is ready to guide you.',
  label = 'Book a Consultation',
  href = '/contact?intent=consultation'
}) {
  return (
    <section className={styles.ctaWrapper}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.cardInner}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>A conversation is a good beginning</span>
            </div>

            <h2 className={styles.title}>{title}</h2>

            <p className={styles.text}>{text}</p>

            <div>
              <Link href={href} className={styles.actionBtn}>
                <span>{label}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className={styles.trustRow}>
              <span className={styles.trustItem}>
                <span className={styles.trustDot}>✓</span> Independent Advisory
              </span>
              <span className={styles.trustItem}>
                <span className={styles.trustDot}>✓</span> Direct Developer Access
              </span>
              <span className={styles.trustItem}>
                <span className={styles.trustDot}>✓</span> Tailored Portfolio Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
