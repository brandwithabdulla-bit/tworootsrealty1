'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { nationalities } from '@/data/nationalities';
import styles from './NationalitySelect.module.css';

export default function NationalitySelect({
  value = '',
  onChange,
  name = 'nationality',
  id,
  placeholder = 'Enter your nationality',
  required = false,
  ariaLabel = 'Select nationality'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // Parse currently selected country if any
  const selectedItem = useMemo(() => {
    if (!value) return null;
    const cleanVal = value.trim();
    return (
      nationalities.find((c) => {
        const full = `${c.flag} ${c.name}`;
        return (
          c.name.toLowerCase() === cleanVal.toLowerCase() ||
          full.toLowerCase() === cleanVal.toLowerCase() ||
          cleanVal.includes(c.name) ||
          c.demonym?.toLowerCase() === cleanVal.toLowerCase()
        );
      }) || null
    );
  }, [value]);

  // Filter countries in real-time
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return nationalities;

    return nationalities.filter((c) => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchDemonym = c.demonym?.toLowerCase().includes(q);
      return matchName || matchDemonym;
    });
  }, [searchQuery]);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
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
    const formatted = `${country.flag} ${country.name}`;
    if (onChange) {
      onChange(formatted, country);
    }
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange('', null);
    }
    setSearchQuery('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredList.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredList.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredList.length) {
        handleSelect(filteredList[highlightedIndex]);
      }
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className={styles.container} ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Hidden input for standard HTML FormData capture */}
      <input
        type="hidden"
        name={name}
        value={value || ''}
        required={required}
      />

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        className={styles.triggerBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <div className={styles.triggerContent}>
          {selectedItem ? (
            <>
              <span className={styles.selectedFlag}>{selectedItem.flag}</span>
              <span className={styles.selectedName}>{selectedItem.name}</span>
            </>
          ) : value ? (
            <span className={styles.selectedName}>{value}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        <div className={styles.triggerActions}>
          {(value || selectedItem) && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear nationality"
              title="Clear"
            >
              ✕
            </button>
          )}
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.searchHeader}>
            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
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
                placeholder="Search country or demonym..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                aria-label="Search nationality"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.searchClearBtn}
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <ul
            className={styles.optionsList}
            role="listbox"
            ref={listRef}
            aria-label="Nationalities"
          >
            {filteredList.length === 0 ? (
              <li className={styles.emptyState}>No nationality found</li>
            ) : (
              filteredList.map((country, index) => {
                const isSelected = selectedItem?.name === country.name;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={country.name}
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.optionItem} ${
                      isHighlighted ? styles.optionActive : ''
                    }`}
                    onClick={() => handleSelect(country)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className={styles.optionMain}>
                      <span className={styles.flag}>{country.flag}</span>
                      <span className={styles.countryName}>{country.name}</span>
                    </div>
                    {isSelected && <span className={styles.checkIcon}>✓</span>}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
