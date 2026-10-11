'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Modal } from './interactive';
import styles from './ProjectHeroSlider.module.css';

export default function ProjectHeroSlider({ item = {} }) {
  // Extract and normalize image URLs from gallery or images
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
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const touchStartX = useRef(0);

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

  const goToSlide = useCallback((index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(index);
  }, []);

  // Autoplay functionality: cycle slides every 4.5 seconds when not hovered and not in modal
  useEffect(() => {
    if (total <= 1 || isHovered || modalOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 4500);

    return () => clearInterval(timer);
  }, [total, isHovered, modalOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, modalOpen]);

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
    <>
      <div 
        className={styles.sliderContainer} 
        role="region" 
        aria-label={`${item.title || 'Project'} photography gallery slider`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setModalOpen(true)}
      >
        {/* Badges on Top Left */}
        <div className={styles.badgesTop} onClick={(e) => e.stopPropagation()}>
          {item.status && (
            <span className={`${styles.badgeItem} ${styles.badgeStatus}`}>
              {item.status}
            </span>
          )}
          {item.propertyType && (
            <span className={styles.badgeItem}>
              {item.propertyType}
            </span>
          )}
          {item.lifestyle && (
            <span className={styles.badgeItem}>
              {item.lifestyle}
            </span>
          )}
        </div>

        {/* Top Right Controls: Slide Counter & Fullscreen trigger */}
        <div className={styles.topRightControls} onClick={(e) => e.stopPropagation()}>
          <div className={styles.counterBadge} aria-live="polite">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <button
            type="button"
            className={styles.expandBtn}
            onClick={() => setModalOpen(true)}
            aria-label="Open fullscreen gallery"
            title="Open fullscreen gallery"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            <span className={styles.expandText}>Gallery</span>
          </button>
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
                alt={`${item.title || 'Project'}: photography photo ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 1400px"
                className={styles.slideImage}
              />
              <div className={styles.slideShade} />
            </div>
          ))}
        </div>

        {/* Previous / Next Arrow Navigation */}
        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
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
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={handleNext}
              aria-label="Next photograph"
              title="Next photograph"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Bottom Dots Navigation */}
            <div className={styles.dotsTrack} onClick={(e) => e.stopPropagation()}>
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                  onClick={(e) => goToSlide(i, e)}
                  aria-label={`Jump to photo ${i + 1}`}
                  aria-current={i === currentIndex}
                />
              ))}
            </div>
          </>
        )}
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
            if (e.key === 'ArrowRight') handleNext(e);
            if (e.key === 'ArrowLeft') handlePrev(e);
          }} 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd}
        >
          <Image 
            src={images[currentIndex]} 
            fill 
            sizes="90vw" 
            alt={`Photo ${currentIndex + 1} of ${total}`}
            priority
          />
        </div>
        <div className="gallery-controls">
          <button 
            type="button"
            className="button secondary" 
            onClick={handlePrev}
          >
            ← Previous
          </button>
          <span aria-live="polite">
            {currentIndex + 1} / {total}
          </span>
          <button 
            type="button"
            className="button secondary" 
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </Modal>
    </>
  );
}
