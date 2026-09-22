'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './DeveloperPartners.module.css';

export const PARTNER_DEVELOPERS = [
  { name: 'wasl', logo: '/logos/wasl.png', slug: 'wasl' },
  { name: 'Danube Properties', logo: '/logos/danube.webp', slug: 'danube' },
  { name: 'OMNIYAT', logo: '/logos/omniyat.svg', slug: 'omniyat' },
  { name: 'Meraas', logo: '/logos/meraas.svg', slug: 'meraas' },
  { name: 'Nakheel', logo: '/logos/nakheel.svg', slug: 'nakheel' },
  { name: 'Arada', logo: '/logos/arada.svg', slug: 'arada' },
  { name: 'elysian', logo: '/logos/elysian.svg', slug: 'elysian' },
  { name: 'Emaar', logo: '/logos/emaar.svg', slug: 'emaar' },
  { name: 'Damac', logo: '/logos/damac.svg', slug: 'damac' },
  { name: 'Sobha Realty', logo: '/logos/sobha.svg', slug: 'sobha' },
  { name: 'Binghatti', logo: '/logos/binghatti.svg', slug: 'binghatti' },
  { name: 'Ellington', logo: '/logos/ellington.png', slug: 'ellington' },
];

export default function DeveloperPartners() {
  return (
    <section className={styles.partnersSection} aria-label="Leading Developer Partners">
      <div className={styles.partnersContainer}>
        {/* Centered Marquee Scroller */}
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {/* Group 1 */}
            <ul className={styles.marqueeGroup}>
              {PARTNER_DEVELOPERS.map((dev, idx) => (
                <li key={`partner-1-${idx}`} className={styles.marqueeItem}>
                  <Link 
                    href={`/projects?developer=${encodeURIComponent(dev.name)}`}
                    title={`View projects by ${dev.name}`}
                    className={styles.partnerLink}
                  >
                    <img
                      src={dev.logo}
                      alt={`${dev.name} Logo`}
                      className={styles.logoImg}
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Group 2 (Duplicate for infinite seamless loop) */}
            <ul className={styles.marqueeGroup} aria-hidden="true">
              {PARTNER_DEVELOPERS.map((dev, idx) => (
                <li key={`partner-2-${idx}`} className={styles.marqueeItem}>
                  <Link 
                    href={`/projects?developer=${encodeURIComponent(dev.name)}`}
                    tabIndex={-1}
                    className={styles.partnerLink}
                  >
                    <img
                      src={dev.logo}
                      alt=""
                      className={styles.logoImg}
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
