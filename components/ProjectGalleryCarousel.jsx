'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  // Manual change next / previous with arrows (no auto-slide)
  const handlePrev = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const goToSlide = (idx, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
  };

  return (
    <div className={styles.gallerySection} aria-label={`${item.title || 'Project'} Gallery`}>
      {/* Header with Title, Counter and Arrows */}
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Gallery</h2>

        {total > 1 && (
          <div className={styles.headerControls}>
            <span className={styles.counterBadge} aria-live="polite">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <div className={styles.navControls}>
              <button
                type="button"
                className={styles.navArrow}
                onClick={handlePrev}
                aria-label="Previous image"
                title="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navArrow}
                onClick={handleNext}
                aria-label="Next image"
                title="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Single Item Stage (Full Width, No Right-Side Whitespace) */}
      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label={`${item.title || 'Project'} photo ${currentIndex + 1} of ${total}`}
      >
        <div className={styles.slideTrack}>
          {images.map((src, i) => (
            <div
              key={i}
              className={`${styles.slide} ${i === currentIndex ? styles.slideActive : ''}`}
              aria-hidden={i !== currentIndex}
            >
              <Image
                src={src}
                alt={`${item.title || 'Project'}: photo ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 1300px"
                className={styles.slideImage}
              />
              <div className={styles.slideOverlay} />
            </div>
          ))}
        </div>

        {/* Previous & Next Navigation Arrows on Image */}
        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.stageArrow} ${styles.stageArrowPrev}`}
              onClick={handlePrev}
              aria-label="Previous photograph"
              title="Previous photograph"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.stageArrow} ${styles.stageArrowNext}`}
              onClick={handleNext}
              aria-label="Next photograph"
              title="Next photograph"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {total > 1 && (
          <div className={styles.dotsTrack} onClick={(e) => e.stopPropagation()}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                onClick={(e) => goToSlide(i, e)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
