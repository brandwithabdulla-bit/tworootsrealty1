'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import styles from './page.module.css';

const galleryItems = [
  {
    id: 1,
    category: 'Waterfront',
    src: '/images/waterfront.jpg',
  },
  {
    id: 2,
    category: 'Villas',
    src: '/images/villa.jpg',
  },
  {
    id: 3,
    category: 'Interiors',
    src: '/images/interior.jpg',
  },
  {
    id: 4,
    category: 'Waterfront',
    src: '/images/dubai.jpg',
  },
  {
    id: 5,
    category: 'Penthouses',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'Architecture',
    src: '/images/architecture.jpg',
  },
  {
    id: 7,
    category: 'Waterfront',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    category: 'Villas',
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 9,
    category: 'Penthouses',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 10,
    category: 'Architecture',
    src: '/images/community.jpg',
  },
  {
    id: 11,
    category: 'Interiors',
    src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 12,
    category: 'Waterfront',
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  }
];

const categories = ['All', 'Waterfront', 'Villas', 'Penthouses', 'Architecture', 'Interiors'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <PageHero 
        eyebrow="Portfolio & Visuals" 
        title="Curated Gallery." 
        description="A visual showcase of Dubai's most compelling residences, prime waterfront developments and architectural landmarks."
      />

      <section className={`container ${styles.gallerySection}`}>
        {/* Category Filter Pills */}
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

        {/* Gallery Grid - Pure fully-filled image cards without text overlays */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={styles.galleryCard}
              onClick={() => setActiveImage(item)}
              role="button"
              tabIndex={0}
              aria-label={`View gallery image ${index + 1}`}
            >
              <div className={styles.imageInner}>
                <Image
                  src={item.src}
                  alt="Dubai luxury property gallery image"
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
                alt="Dubai luxury showcase enlarged view" 
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
