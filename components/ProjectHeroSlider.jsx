'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProjectHeroSlider.module.css';

export default function ProjectHeroSlider({ item }) {
  const images = item.gallery && item.gallery.length > 0 
    ? item.gallery 
    : (item.images || ['/images/dubai.jpg']);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const total = images.length;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
  };

  return (
    <div 
      className={styles.sliderContainer} 
      role="region" 
      aria-label={`${item.title} photography slider`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Badges on Top Left */}
      <div className={styles.badgesTop}>
        <span className={`${styles.badgeItem} ${styles.badgeStatus}`}>{item.status}</span>
        <span className={styles.badgeItem}>{item.propertyType}</span>
        {item.lifestyle && <span className={styles.badgeItem}>{item.lifestyle}</span>}
      </div>

      {/* Slide Counter Top Right */}
      <div className={styles.counterBadge} aria-live="polite">
        0{currentIndex + 1} / 0{total}
      </div>

      {/* Slide Track */}
      <div className={styles.slideTrack}>
        {images.map((src, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === currentIndex ? styles.slideActive : ''}`}
            aria-hidden={i !== currentIndex}
          >
            <Image
              src={src}
              alt={`${item.title} photography photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1400px"
              className={styles.slideImage}
            />
            <div className={styles.slideShade} />
          </div>
        ))}
      </div>

      {/* Previous / Next Controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnPrev}`}
            onClick={handlePrev}
            aria-label="Previous photograph"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={handleNext}
            aria-label="Next photograph"
          >
            ›
          </button>

          {/* Bottom Dot Indicators */}
          <div className={styles.dotsTrack}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to photo ${i + 1}`}
                aria-current={i === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
