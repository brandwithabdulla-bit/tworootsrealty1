'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import styles from './page.module.css';

const categories = ['All', 'Waterfront', 'Villas', 'Mansions', 'Architecture', 'Interiors'];

export default function GalleryClient({ items = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <>
      <PageHero 
        eyebrow="Portfolio & Visuals" 
        title="Curated Gallery." 
        description="A visual showcase of Dubai's most compelling residences, prime waterfront developments and architectural landmarks."
        image="/images/hero/hero-1.jpg"
        imageAlt="Panoramic Dubai Skyline and luxury architectural developments"
      />

      <section className={`container ${styles.gallerySection}`}>
        {/* Category Filter Tabs */}
        <div className={styles.filterTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, index) => (
            <div 
              key={item.id || item._id || index} 
              className={styles.galleryCard}
              onClick={() => setActiveImage(item)}
              role="button"
              tabIndex={0}
              aria-label={`View gallery image ${index + 1}`}
            >
              <div className={styles.imageInner}>
                <Image
                  src={item.src}
                  alt={item.title || 'Dubai luxury property gallery image'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={index < 3}
                  unoptimized
                />
                <div className={styles.overlay}>
                  <span className={styles.zoomIcon}>⊕</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.galleryCta}>
          <div className={styles.ctaGlass}>
            <h2>Looking for a specific property style?</h2>
            <p>Our private client team can curate tailored collections and walkthroughs.</p>
            <div className={styles.ctaActions}>
              <Link href="/projects" className="button">Explore All Projects</Link>
              <Link href="/contact" className="button secondary">Speak to an Advisor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className={styles.lightboxOverlay} onClick={() => setActiveImage(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setActiveImage(null)}>✕</button>
            <div className={styles.lightboxImageWrapper}>
              <Image 
                src={activeImage.src} 
                alt={activeImage.title || 'Dubai luxury showcase enlarged view'} 
                fill 
                className={styles.lightboxImage}
                unoptimized
              />
            </div>
            <div className={styles.lightboxFooter}>
              <Link href="/contact?intent=callback" className="button" onClick={() => setActiveImage(null)}>
                Inquire With an Advisor ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
