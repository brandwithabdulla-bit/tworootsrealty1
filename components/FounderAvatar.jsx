'use client';

import React from 'react';
import styles from './FounderAvatar.module.css';

export default function FounderAvatar({
  name = 'Founder',
  role = 'Co-Founder',
  initials,
  hasApprovedPhoto = false,
  imageSrc,
  className = '',
}) {
  // Extract initials if not explicitly provided
  const computedInitials = initials || (
    name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  ) || 'TR';

  // If approved photo is ready in the future, render image
  if (hasApprovedPhoto && imageSrc) {
    return (
      <div className={`${styles.avatarCard} ${className}`} style={{ padding: 0 }}>
        <img
          src={imageSrc}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.avatarCard} ${className}`}
      role="img"
      aria-label={`Avatar for ${name}`}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.ringAccent} aria-hidden="true" />

      <div className={styles.avatarGraphicWrap}>
        <div className={styles.avatarMedallion}>
          <svg
            className={styles.avatarSvg}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Elegant executive silhouette vector */}
            <circle cx="24" cy="16" r="7.5" fill="currentColor" opacity="0.9" />
            <path
              d="M11 38C11 31.3726 16.3726 26 23 26H25C31.6274 26 37 31.3726 37 38V40H11V38Z"
              fill="currentColor"
              opacity="0.85"
            />
            {/* Stylized suit lapel lines */}
            <path
              d="M20 27L24 35L28 27"
              stroke="#07121e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 35V40"
              stroke="#07121e"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={styles.initialsBadge}>
          <span className={styles.monogram}>{computedInitials}</span>
          <span className={styles.founderLabel}>Founder</span>
        </div>
      </div>
    </div>
  );
}
