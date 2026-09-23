'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { countryCodes } from '@/data/countries';
import styles from './SearchableCountrySelect.module.css';

export default function SearchableCountrySelect({
  value = '+971',
  onChange,
  mode = 'code', // 'code' (for phone prefix) or 'country' (for full country name)
  theme = 'dark', // 'dark' | 'light'
  name = 'countryCode',
  id,
  required = false,
  ariaLabel = 'Select country',
  placeholder = 'Search country or code...'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Find currently selected country
  const selectedCountry = useMemo(() => {
    if (!value) return null;
    if (mode === 'code') {
      return countryCodes.find((c) => c.code === value) || countryCodes[0];
    }
    return (
      countryCodes.find(
        (c) =>
          c.country.toLowerCase() === value.toLowerCase() ||
          c.name.toLowerCase() === value.toLowerCase()
      ) || null
    );
  }, [value, mode]);

  // Filter countries alphabetically based on search query
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return countryCodes;

    const qDigits = q.replace(/^\+/, '');

    return countryCodes.filter((c) => {
      const matchCountry = c.country.toLowerCase().includes(q);
      const matchName = c.name.toLowerCase().includes(q);
      const codeDigits = c.code.replace(/^\+/, '');
      const matchCode = c.code.includes(q) || codeDigits.startsWith(qDigits);
      return matchCountry || matchName || matchCode;
    });
  }, [searchQuery]);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country) => {
    const newVal = mode === 'code' ? country.code : country.name;
    if (onChange) {
      onChange(newVal, country);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const isDark = theme === 'dark';
  const triggerThemeClass = isDark ? styles.darkTrigger : styles.lightTrigger;
  const dropdownThemeClass = isDark ? styles.darkDropdown : styles.lightDropdown;

  // Render label inside trigger button
  const renderTriggerLabel = () => {
    if (mode === 'code') {
      if (selectedCountry) {
        return (
          <span className={styles.triggerContent}>
            <span className={styles.flag}>{selectedCountry.flag}</span>
            <span className={styles.label}>{selectedCountry.code}</span>
          </span>
        );
      }
      return <span className={styles.label}>Code *</span>;
    }

    if (selectedCountry) {
      return (
        <span className={styles.triggerContent}>
          <span className={styles.flag}>{selectedCountry.flag}</span>
          <span className={styles.label}>{selectedCountry.name || selectedCountry.country}</span>
        </span>
      );
    }
    return <span className={styles.label}>{value || 'Select Country'}</span>;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${mode === 'code' ? styles.codeMode : styles.countryMode}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        id={id}
        className={`${styles.triggerBtn} ${triggerThemeClass}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {renderTriggerLabel()}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {/* Hidden input for standard form submission */}
      <input
        type="hidden"
        name={name}
        value={value || ''}
        required={required}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`${styles.dropdownMenu} ${dropdownThemeClass} ${
            mode === 'code' ? styles.dropdownCode : styles.dropdownCountry
          }`}
          role="listbox"
        >
          {/* Auto-populated search bar */}
          <div className={styles.searchHeader}>
            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter countries"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filtered list of options in alphabetical order */}
          <ul className={styles.optionsList}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected =
                  mode === 'code'
                    ? selectedCountry?.code === c.code
                    : selectedCountry?.country === c.country;

                return (
                  <li
                    key={`${c.country}-${c.code}`}
                    className={`${styles.optionItem} ${isSelected ? styles.optionActive : ''}`}
                    onClick={() => handleSelect(c)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className={styles.optionMain}>
                      <span className={styles.flag}>{c.flag}</span>
                      <span className={styles.optionCountry}>{c.country}</span>
                    </div>
                    <div className={styles.optionRight}>
                      <span className={styles.optionCode}>{c.code}</span>
                      <span className={styles.checkSlot}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className={styles.emptyState}>No matching country found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
