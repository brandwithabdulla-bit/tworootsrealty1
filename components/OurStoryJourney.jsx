import styles from './OurStoryJourney.module.css';

export default function OurStoryJourney() {
  return (
    <section className={`container ${styles.storyJourneySection}`}>
      <article className={styles.culminationCard}>
        <div className={styles.culminationLeft}>
          <h2 className={styles.culminationTitle}>Our Story</h2>

          <div className={styles.culminationDesc}>
            <p>
              Two Roots Realty was born from a friendship spanning more than a decade and a shared belief in what property advice should be: personal, transparent and grounded in trust.
            </p>
            <p>
              Founded in Dubai in 2026, we bring local insight and international perspective to every relationship. Our purpose is to understand what matters to each client, build the right connections and turn considered decisions into lasting opportunities.
            </p>
          </div>

          <div className={styles.culminationTagline}>
            Two roots. One vision. Infinite opportunities
          </div>
        </div>

        <div className={styles.culminationRight}>
          <div className={styles.pillarEyebrow}>The Core Philosophy</div>
          <div className={styles.pillarEquation}>
            People <span>→</span> Connection <span>→</span> Opportunity <span>→</span> Growth
          </div>
          <div className={styles.pillarDetails}>
            <div className={styles.pillarMetric}>
              <strong>2026</strong>
              <span>Founded in Dubai, UAE</span>
            </div>
            <div className={styles.pillarMetric}>
              <strong>10+ Yrs</strong>
              <span>Shared Foundation & Trust</span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
