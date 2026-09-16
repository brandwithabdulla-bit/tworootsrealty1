'use client';

import { useState, useRef } from 'react';
import { PropertyCard } from './ui';
import styles from './ProjectCarousel.module.css';

export default function ProjectCarousel({ items, kind = 'projects', itemsPerPage = 3, theme = 'light' }) {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(null);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const isDark = theme === 'dark';

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && currentPage < totalPages - 1) {
      nextPage();
    } else if (diff < -50 && currentPage > 0) {
      prevPage();
    }
    touchStartX.current = null;
  };

  // Group items into chunks of itemsPerPage
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div 
      className={styles.carouselWrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Viewport */}
      <div className={styles.carouselViewport}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((pageItems, pageIdx) => (
            <div key={pageIdx} className={styles.carouselSlide}>
              <div className="property-grid">
                {pageItems.map(item => (
                  <PropertyCard key={item.id} item={item} kind={kind} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation & Progress Option Bar */}
      <div className={`${styles.navBar} ${isDark ? styles.darkNavBar : ''}`}>
        {/* Left: Counter and Track */}
        <div className={styles.counterProgressGroup}>
          <div className={styles.counter}>
            <span className={`${styles.counterCurrent} ${isDark ? styles.darkCounterCurrent : ''}`}>
              {String(currentPage + 1).padStart(2, '0')}
            </span>
            <span className={`${styles.counterDivider} ${isDark ? styles.darkCounterDivider : ''}`}>/</span>
            <span className={`${styles.counterTotal} ${isDark ? styles.darkCounterTotal : ''}`}>
              {String(totalPages).padStart(2, '0')}
            </span>
          </div>

          <div 
            className={`${styles.progressTrack} ${isDark ? styles.darkProgressTrack : ''}`}
            role="progressbar"
            aria-valuenow={currentPage + 1}
            aria-valuemin={1}
            aria-valuemax={totalPages}
            aria-label="Project carousel progress"
          >
            <div 
              className={`${styles.progressBar} ${isDark ? styles.darkProgressBar : ''}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Next / Previous Buttons */}
        <div className={styles.navButtons}>
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`${styles.navBtn} ${isDark ? styles.darkNavBtn : ''}`}
            aria-label="Previous page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`${styles.navBtn} ${isDark ? styles.darkNavBtn : ''}`}
            aria-label="Next page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
