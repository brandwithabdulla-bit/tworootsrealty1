import styles from './AboutMissionVisionValues.module.css';

export default function AboutMissionVisionValues() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="foundation-heading">
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Foundation & Principles</span>
        <h2 id="foundation-heading" className={styles.title}>
          Our mission, vision<br />
          <em>& guiding values.</em>
        </h2>
        <p className={styles.lead}>
          Building enduring relationships and opening lasting opportunities through clarity, trust, and global connection.
        </p>
      </div>

      {/* 3-Card Luxury Suite */}
      <div className={styles.cardsGrid}>
        
        {/* Card 1: Our Mission */}
        <article className={styles.card}>
          <div>
            <div className={styles.cardTop}>
              <span className={styles.badge}>
                <span className={styles.badgeDot}></span>
                Our Mission
              </span>
              <span className={styles.cardNum}>01</span>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardHeading}>
                Confident decisions.<br />
                <em>Honest guidance.</em>
              </h3>
              <p className={styles.cardText}>
                To help people make confident property decisions through honest advice, carefully selected opportunities and personal guidance. We connect clients and partners across borders, building relationships that create lasting value.
              </p>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.pillList}>
              <span className={styles.pill}>Honest Advice</span>
              <span className={styles.pill}>Curated Opportunities</span>
              <span className={styles.pill}>Personal Guidance</span>
            </div>
          </div>
        </article>

        {/* Card 2: Our Vision (Featured Centerpiece) */}
        <article className={styles.cardFeatured}>
          <div>
            <div className={styles.cardTop}>
              <span className={styles.badgeGold}>
                <span className={styles.badgeGoldDot}></span>
                Our Vision
              </span>
              <span className={styles.cardNumGold}>02</span>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardHeadingLight}>
                A global brand.<br />
                <em>Meaningful connections.</em>
              </h3>
              <p className={styles.cardTextLight}>
                To become a globally recognised real estate and investment brand that connects people, markets, property and business opportunities — creating meaningful connections that help people and businesses grow.
              </p>
            </div>
          </div>

          <div className={styles.cardFooterLight}>
            <div className={styles.pillList}>
              <span className={styles.pillLight}>Global Advisory</span>
              <span className={styles.pillLight}>Market Synergy</span>
              <span className={styles.pillLight}>Enduring Growth</span>
            </div>
          </div>
        </article>

        {/* Card 3: Our Values */}
        <article className={styles.card}>
          <div>
            <div className={styles.cardTop}>
              <span className={styles.badge}>
                <span className={styles.badgeDot}></span>
                Our Values
              </span>
              <span className={styles.cardNum}>03</span>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardHeading}>
                Grounded in integrity.<br />
                <em>Committed for the long term.</em>
              </h3>
              <p className={styles.cardText}>
                We act with Integrity, bring Clarity to complex decisions, and create Connections that open meaningful opportunities. We apply Discernment to every recommendation and show Commitment long after the first conversation.
              </p>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.pillList}>
              <span className={styles.pill}>Integrity</span>
              <span className={styles.pill}>Clarity</span>
              <span className={styles.pill}>Connection</span>
              <span className={styles.pill}>Discernment</span>
              <span className={styles.pill}>Commitment</span>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
