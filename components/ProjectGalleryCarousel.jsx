'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Modal } from './interactive';
import styles from './ProjectGalleryCarousel.module.css';

export default function ProjectGalleryCarousel({ item = {} }) {
  // Extract images
  const rawList = (Array.isArray(item?.gallery) && item.gallery.length > 0)
    ? item.gallery
    : ((Array.isArray(item?.images) && item.images.length > 0)
      ? item.images
      : (item?.gallery || item?.images || ['/images/dubai.jpg']));

  const imageList = (Array.isArray(rawList) ? rawList : [rawList])
    .map(img => {
      if (!img) return null;
      if (typeof img === 'string') return img;
      if (typeof img === 'object' && img.asset && img.asset.url) return img.asset.url;
      if (typeof img === 'object' && img.url) return img.url;
      return null;
    })
    .filter(Boolean);

  const images = imageList.length > 0 ? imageList : ['/images/dubai.jpg'];
  const total = images.length;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const viewportRef = useRef(null);

  // Manual scroll previous / next
  const scrollPrev = () => {
    if (!viewportRef.current) return;
    const cardWidth = viewportRef.current.querySelector(`.${styles.galleryCard}`)?.clientWidth || 380;
    viewportRef.current.scrollBy({ left: -(cardWidth + 22), behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!viewportRef.current) return;
    const cardWidth = viewportRef.current.querySelector(`.${styles.galleryCard}`)?.clientWidth || 380;
    // Check if near end, loop back
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      viewportRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      viewportRef.current.scrollBy({ left: cardWidth + 22, behavior: 'smooth' });
    }
  };

  // Autoplay slider effect
  useEffect(() => {
    if (total <= 1 || isPaused || modalOpen) return;

    const timer = setInterval(() => {
      if (!viewportRef.current) return;
      const cardWidth = viewportRef.current.querySelector(`.${styles.galleryCard}`)?.clientWidth || 380;
      const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 30) {
        viewportRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        viewportRef.current.scrollBy({ left: cardWidth + 22, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [total, isPaused, modalOpen]);

  const handleCardClick = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  const handleModalPrev = (e) => {
    if (e) e.stopPropagation();
    setModalIndex(prev => (prev - 1 + total) % total);
  };

  const handleModalNext = (e) => {
    if (e) e.stopPropagation();
    setModalIndex(prev => (prev + 1) % total);
  };

  return (
    <section className={styles.gallerySection} aria-label={`${item.title || 'Project'} Gallery`}>
      {/* Header matching Image 2 */}
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Gallery</h2>
        {total > 1 && (
          <div className={styles.navControls}>
            <button
              type="button"
              className={styles.navArrow}
              onClick={scrollPrev}
              aria-label="Previous gallery images"
              title="Previous images"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.navArrow}
              onClick={scrollNext}
              aria-label="Next gallery images"
              title="Next images"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Carousel Viewport */}
      <div
        ref={viewportRef}
        className={styles.carouselViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        <div className={styles.carouselTrack}>
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.galleryCard}
              onClick={() => handleCardClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${i + 1} of ${item.title || 'Project'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(i);
                }
              }}
            >
              <Image
                src={src}
                alt={`${item.title || 'Project'}: photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 82vw, 480px"
                className={styles.galleryCardImage}
              />
              <div className={styles.cardOverlay} />
              <span className={styles.zoomBadge}>
                <span>View</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${item.title || 'Project'} — Gallery`}
        className="gallery-dialog"
      >
        <div
          className="lightbox"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') handleModalNext(e);
            if (e.key === 'ArrowLeft') handleModalPrev(e);
          }}
        >
          <Image
            src={images[modalIndex]}
            fill
            sizes="90vw"
            alt={`Photo ${modalIndex + 1} of ${total}`}
            priority
          />
        </div>
        <div className="gallery-controls">
          <button
            type="button"
            className="button secondary"
            onClick={handleModalPrev}
          >
            ← Previous
          </button>
          <span aria-live="polite">
            {modalIndex + 1} / {total}
          </span>
          <button
            type="button"
            className="button secondary"
            onClick={handleModalNext}
          >
            Next →
          </button>
        </div>
      </Modal>
    </section>
  );
}
