import { PageHero, Eyebrow, ArrowUpRight } from '@/components/ui';
import { EnquiryForm } from '@/components/interactive';
import ScrollToLink from '@/components/ScrollToLink';
import { pageMetadata } from '@/lib/seo';
import styles from '@/components/CareersSection.module.css';

export const metadata = pageMetadata(
  'Careers',
  'Explore the culture of Two Roots Realty and the future careers experience.',
  '/careers'
);

export default function Page() {
  const roles = [
    {
      title: 'Property Advisor',
      tag: 'Demo position',
      description:
        'This sample role demonstrates how future openings can be presented. Responsibilities, location, eligibility and application deadlines will be supplied for confirmed vacancies.'
    },
    {
      title: 'Client Relations Coordinator',
      tag: 'Demo position',
      description:
        'This sample role demonstrates how future openings can be presented. Responsibilities, location, eligibility and application deadlines will be supplied for confirmed vacancies.'
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Grow with us"
        title="Join Two Roots Realty."
        description="Bring your perspective. Build meaningful relationships. Help people find their next opportunity."
        image="/images/hero/hero-4.jpg"
        imageAlt="Two Roots Realty modern career culture and Dubai growth environment"
      />

      {/* Culture Section */}
      <section className={styles.cultureSection}>
        <div className={`container ${styles.cultureGrid}`}>
          <div className={styles.cultureLeft}>
            <Eyebrow>Why Two Roots</Eyebrow>
            <h2 className={styles.cultureTitle}>A culture rooted in connection.</h2>
          </div>

          <div className={styles.cultureRight}>
            <p className={styles.cultureLead}>
              Trust, integrity and partnership shape how we work.
            </p>
            <p className={styles.cultureBody}>
              We value a transparent, approachable and relationship-focused way of supporting clients.
              Our founders bring international experience and complementary perspectives.
            </p>

            <div className={styles.culturePillars}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIcon} aria-hidden="true">✦</span>
                <h3 className={styles.pillarTitle}>Trust &amp; Integrity</h3>
                <p className={styles.pillarText}>Principled advisory shaped by authentic relationships.</p>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIcon} aria-hidden="true">✦</span>
                <h3 className={styles.pillarTitle}>Global Perspective</h3>
                <p className={styles.pillarText}>International acumen grounded in Dubai&apos;s prime developments.</p>
              </div>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIcon} aria-hidden="true">✦</span>
                <h3 className={styles.pillarTitle}>True Partnership</h3>
                <p className={styles.pillarText}>Founder-led mentorship with long-term career growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className={styles.jobsSection}>
        <div className="container">
          <div className={styles.jobsHeader}>
            <Eyebrow>Opportunities</Eyebrow>
            <h2 className={styles.jobsTitle}>Open positions</h2>
            <p className={styles.jobsDescription}>
              Demo listings for the careers layout. These are not confirmed vacancies.
            </p>
          </div>

          <div className={styles.jobsGrid}>
            {roles.map((role) => (
              <div key={role.title} className={styles.jobCard}>
                <div>
                  <div className={styles.jobCardTop}>
                    <span className={styles.jobBadge}>{role.tag}</span>
                  </div>
                  <h3 className={styles.jobRoleTitle}>{role.title}</h3>
                  <p className={styles.jobSummary}>{role.description}</p>
                </div>

                <ScrollToLink className={styles.jobLink} targetId="application">
                  <span>Explore the application form</span>
                  <ArrowUpRight size={14} />
                </ScrollToLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Application Section */}
      <section className={styles.applicationSection} id="application">
        <div className={styles.applicationContainer}>
          {/* Left Luxury Info Card */}
          <aside className={styles.applicationInfoCard}>
            <div className={styles.applicationInfoCardHeader}>
              <span className={styles.applicationInfoBadge}>Make an introduction</span>
              <h2 className={styles.applicationInfoTitle}>General application.</h2>
            </div>

            <p className={styles.applicationInfoDesc}>
              The demonstration form accepts a CV or portfolio link. It does not upload or send a document.
            </p>

            <div className={styles.applicationHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>✦</span>
                <p className={styles.highlightText}>
                  Direct review by founding partners and advisory leadership.
                </p>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>✦</span>
                <p className={styles.highlightText}>
                  Transparent, collaborative team culture with global reach.
                </p>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>✦</span>
                <p className={styles.highlightText}>
                  Exposure to Dubai&apos;s leading architectural master-developments.
                </p>
              </div>
            </div>

            <p className={styles.applicationQuote}>
              &ldquo;We look for curious, authentic individuals who value trust and long-term client relationships.&rdquo;
            </p>
          </aside>

          {/* Right Elevated Form Card */}
          <div className={styles.applicationFormCard}>
            <div className={styles.applicationFormHeader}>
              <h3 className={styles.applicationFormTitle}>Submit Application</h3>
              <p className={styles.applicationFormSubtitle}>
                Introduce yourself and share your portfolio or background.
              </p>
            </div>

            <div className={styles.applicationFormBody}>
              <EnquiryForm
                variant="career"
                context="General career application"
                submitLabel="Preview Application"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
