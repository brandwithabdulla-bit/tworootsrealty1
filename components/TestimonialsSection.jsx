import { SectionHeader } from './ui';
import { testimonials } from '@/data/testimonials';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  return (
    <section className={`section container ${styles.testimonialsSection}`}>
      <SectionHeader
        eyebrow="Relationships that matter"
        title="The trust we build."
        href="/testimonials"
        label="Client experiences"
      />

      <div className={styles.grid}>
        {testimonials.map((x, i) => (
          <div key={x.id} className={styles.card}>
            <div>
              <div className={styles.cardHeader}>
                <div className={styles.stars} aria-label="5 star rating">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className={styles.quoteIcon} aria-hidden="true">“</span>
              </div>

              <blockquote className={styles.quoteText}>
                &ldquo;{x.quote}&rdquo;
              </blockquote>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.clientMeta}>
                <div className={styles.avatarPill}>
                  {i === 0 ? 'TR' : 'CL'}
                </div>
                <div className={styles.clientDetails}>
                  <span className={styles.clientName}>Client Experience</span>
                  <span className={styles.statusBadge}>Awaiting approved client feedback</span>
                </div>
              </div>

              <span className={styles.verifiedPill}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Verified Client</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
