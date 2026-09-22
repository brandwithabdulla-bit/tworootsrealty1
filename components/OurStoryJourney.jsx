'use client';

import { useState } from 'react';
import styles from './OurStoryJourney.module.css';

const milestones = [
  {
    step: '01',
    phase: 'Origins & Roots',
    title: 'The same hometown',
    description: 'Sunand and Ashmid grew up in the same hometown in India. A friendship began that would last more than a decade.',
    tag: 'Kerala, India',
    indicator: 'Decade of Friendship'
  },
  {
    step: '02',
    phase: 'Global Pathways',
    title: 'Different journeys',
    description: 'Their individual paths took them across different countries and industries, building complementary perspectives.',
    tag: 'UK, Qatar & International',
    indicator: 'Diverse Experience'
  },
  {
    step: '03',
    phase: 'The Convergence',
    title: 'Together again in Dubai',
    description: 'Years later, they found themselves together again in Dubai, working in the same real estate company.',
    tag: 'Dubai Property Market',
    indicator: 'Shared Ground'
  },
  {
    step: '04',
    phase: 'Core Philosophy',
    title: 'A shared understanding',
    description: 'Their experiences brought a common belief into focus: strong relationships and transparent guidance belong at the heart of property decisions.',
    tag: 'Integrity First',
    indicator: 'Guiding Principle'
  },
  {
    step: '05',
    phase: 'The Inception · August 2026',
    title: 'Two Roots Realty',
    tagline: 'Two roots. One vision.',
    description: 'Established in August 2026, Two Roots Realty connects people, property, investment, business and opportunities. Two roots. One vision.',
    tag: 'Established 2026',
    indicator: 'Dubai Advisory'
  }
];

export default function OurStoryJourney() {
  const [activeStep, setActiveStep] = useState(null);

  const handleSelectStep = (step) => {
    setActiveStep(activeStep === step ? null : step);
    const cardEl = document.getElementById(`story-card-${step}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className={`container ${styles.storyJourneySection}`}>
      
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Milestones & Evolution</span>
        <h2 className={styles.sectionTitle}>
          The journey of two roots.<br />
          <em>One shared purpose.</em>
        </h2>
        <p className={styles.sectionLead}>
          How a friendship lasting more than a decade became the foundation of a modern real estate advisory in Dubai.
        </p>
      </div>

      {/* Interactive Quick-Nav Scrubber Bar */}
      <div className={styles.scrubberBar} role="navigation" aria-label="Story Milestones Navigation">
        <button
          type="button"
          className={`${styles.scrubberBtn} ${activeStep === null ? styles.scrubberBtnActive : ''}`}
          onClick={() => setActiveStep(null)}
        >
          All Milestones
        </button>
        {milestones.map((m) => (
          <button
            key={m.step}
            type="button"
            className={`${styles.scrubberBtn} ${activeStep === m.step ? styles.scrubberBtnActive : ''}`}
            onClick={() => handleSelectStep(m.step)}
          >
            <span className={styles.scrubberNum}>{m.step}</span>
            <span>{m.title}</span>
          </button>
        ))}
      </div>

      {/* Unified 1-5 Bento Grid */}
      <div className={styles.bentoGrid}>
        
        {/* Milestones 01 to 04 (2x2 Grid) */}
        {milestones.slice(0, 4).map((item) => {
          const isHighlighted = activeStep === item.step;
          return (
            <article 
              key={item.step} 
              id={`story-card-${item.step}`}
              className={`${styles.bentoCard} ${isHighlighted ? styles.cardHighlighted : ''}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.phaseBadge}>
                  <span className={styles.phaseDot}></span>
                  {item.phase}
                </span>
                <span className={styles.cardNum}>{item.step}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardTag}>{item.tag}</span>
                <span className={styles.cardIndicator}>{item.indicator}</span>
              </div>
            </article>
          );
        })}

        {/* Milestone 05: Culmination Hero Card (Full Width) */}
        {(() => {
          const m5 = milestones[4];
          const isHighlighted = activeStep === '05';
          return (
            <article 
              id="story-card-05"
              className={`${styles.culminationCard} ${isHighlighted ? styles.cardHighlighted : ''}`}
            >
              <div className={styles.culminationLeft}>
                <div className={styles.culminationTop}>
                  <span className={styles.culminationBadge}>
                    <span className={styles.culminationBadgeDot}></span>
                    {m5.phase}
                  </span>
                  <span className={styles.culminationNum}>{m5.step}</span>
                </div>

                <h3 className={styles.culminationTitle}>{m5.title}</h3>
                <span className={styles.culminationTagline}>{m5.tagline}</span>

                <p className={styles.culminationDesc}>
                  {m5.description}
                </p>
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
          );
        })()}

      </div>

    </section>
  );
}
