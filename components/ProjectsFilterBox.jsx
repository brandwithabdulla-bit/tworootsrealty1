'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ProjectsFilter.module.css';
import { locationDatabase, budgetOptions, propertyTypeOrder, developerDatabase } from '@/data/locations-database';
import { developers } from '@/data/developers';
import { locations } from '@/data/locations';

function AutocompleteField({
  label,
  value,
  onChange,
  placeholder,
  suggestions = [],
  icon,
  getLabel = (item) => (typeof item === 'string' ? item : item.name),
  getSub = (item) => (typeof item === 'string' ? '' : (item.sub || item.areas || item.city || item.type || '')),
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const hasQuery = query.trim().length > 0;
  const trimmed = query.trim().toLowerCase();
  const filtered = !hasQuery
    ? []
    : suggestions.filter(item => {
        const str = getLabel(item).toLowerCase();
        const sub = getSub(item).toLowerCase();
        const areas = (item.areas || '').toLowerCase();
        return str.includes(trimmed) || sub.includes(trimmed) || areas.includes(trimmed);
      }).sort((a, b) => {
        const aName = getLabel(a).toLowerCase();
        const bName = getLabel(b).toLowerCase();
        const aExact = aName === trimmed;
        const bExact = bName === trimmed;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        const aStarts = aName.startsWith(trimmed);
        const bStarts = bName.startsWith(trimmed);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      }).slice(0, 8);

  function handleSelect(item) {
    const val = getLabel(item);
    setQuery(val);
    onChange(val);
    setOpen(false);
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setOpen(val.trim().length > 0);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e) {
    if (!open) {
      if ((e.key === 'ArrowDown' || e.key === 'Enter') && hasQuery) {
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
        handleSelect(filtered[highlightedIndex]);
      } else if (filtered.length > 0) {
        handleSelect(filtered[0]);
      } else {
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className={`${styles.fieldGroup} ${open && hasQuery && filtered.length > 0 ? styles.fieldGroupOpen : ''}`} ref={wrapRef}>
      <label className={styles.fieldLabel}>
        <span>{label}</span>
      </label>
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.fieldIcon}>{icon}</span>}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onClick={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.textInput}
          autoComplete="off"
          style={{ paddingLeft: icon ? '36px' : '14px' }}
        />
        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuery('');
              onChange('');
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label={`Clear ${label}`}
          >
            ×
          </button>
        )}
      </div>

      {open && hasQuery && filtered.length > 0 && (
        <ul className={styles.dropdownMenu} role="listbox">
          {filtered.map((item, idx) => (
            <li
              key={getLabel(item)}
              role="option"
              aria-selected={highlightedIndex === idx}
              className={`${styles.dropdownItem} ${highlightedIndex === idx ? styles.highlighted : ''}`}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              onClick={() => handleSelect(item)}
            >
              <span className={styles.itemName}>{getLabel(item)}</span>
              {getSub(item) && <span className={styles.itemSub}>{getSub(item)}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProjectsFilterBox({ filters, setFilters, onReset }) {
  // Pre-aggregated suggestions
  const communitySuggestions = locationDatabase.map(l => ({
    name: l.name,
    type: l.type || 'Community',
    city: l.city || 'Dubai'
  }));

  const locationSuggestions = [
    ...locationDatabase.map(l => ({ name: l.name, city: l.city, type: l.type })),
    ...locations.filter(loc => !locationDatabase.some(d => d.name.toLowerCase() === loc.name.toLowerCase())).map(l => ({ name: l.name, city: 'Dubai', type: 'District' }))
  ];

  const developerSuggestions = developerDatabase.map(d => ({
    name: d.name,
    type: d.type,
    areas: d.areas,
    sub: `${d.type} · ${d.areas}`
  }));

  // Count active filters
  const activeCount = [
    filters.q,
    filters.location,
    filters.developer,
    filters.propertyType,
    filters.budget,
    filters.bedrooms
  ].filter(Boolean).length;

  return (
    <div className={styles.filterCard}>
      <div className={styles.filterHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.filterTitle}>Refine Projects</h3>
          {activeCount > 0 && (
            <span className={styles.activeBadge}>{activeCount} active</span>
          )}
        </div>
        {activeCount > 0 && onReset && (
          <button type="button" className={styles.resetBtn} onClick={onReset}>
            Clear all
          </button>
        )}
      </div>

      {/* 1. Search by Community with auto-populated suggestions (Req 19) */}
      <AutocompleteField
        label="Search by Community"
        value={filters.q || ''}
        onChange={(val) => setFilters({ ...filters, q: val })}
        placeholder="Search community..."
        suggestions={communitySuggestions}
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        }
      />

      {/* 2. Location filter with auto-populated suggestions (Req 16) */}
      <AutocompleteField
        label="Location"
        value={filters.location || ''}
        onChange={(val) => setFilters({ ...filters, location: val })}
        placeholder="All locations"
        suggestions={locationSuggestions}
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        }
      />

      {/* 3. Developer filter with auto-populated suggestions (Req 16) */}
      <AutocompleteField
        label="Developer"
        value={filters.developer || ''}
        onChange={(val) => setFilters({ ...filters, developer: val })}
        placeholder="All developers & areas"
        suggestions={developerSuggestions}
        getSub={(item) => item.sub || item.areas || item.type || ''}
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="9" y1="6" x2="9" y2="6.01"></line>
            <line x1="15" y1="6" x2="15" y2="6.01"></line>
            <line x1="9" y1="10" x2="9" y2="10.01"></line>
            <line x1="15" y1="10" x2="15" y2="10.01"></line>
            <line x1="9" y1="14" x2="9" y2="14.01"></line>
            <line x1="15" y1="14" x2="15" y2="14.01"></line>
            <line x1="9" y1="18" x2="15" y2="18"></line>
          </svg>
        }
      />

      {/* 4. Property Type (Req 17: Apartment -> Townhouse -> Villa -> Mansion -> Commercial; NO Penthouse) */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span>Property Type</span>
        </label>
        <div className={styles.inputWrapper}>
          <select
            value={filters.propertyType || ''}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className={styles.selectInput}
          >
            <option value="">Any property type</option>
            {propertyTypeOrder.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <span className={styles.selectArrow}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </div>

      {/* 5. Budget Dropdown (Standardized) */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span>Budget</span>
        </label>
        <div className={styles.inputWrapper}>
          <select
            value={filters.budget || ''}
            onChange={(e) => {
              const val = e.target.value;
              const matched = budgetOptions.find(b => b.label === val || b.value === val);
              setFilters({
                ...filters,
                budget: val,
                minPrice: matched ? matched.minPrice : '',
                maxPrice: matched ? matched.maxPrice : ''
              });
            }}
            className={styles.selectInput}
          >
            <option value="">Any budget</option>
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.label}>{b.label}</option>
            ))}
          </select>
          <span className={styles.selectArrow}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </div>

      {/* 6. Bedrooms Dropdown */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <span>Bedrooms</span>
        </label>
        <div className={styles.inputWrapper}>
          <select
            value={filters.bedrooms || ''}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className={styles.selectInput}
          >
            <option value="">Any bedrooms</option>
            {['Studio', '1', '2', '3', '4', '5+'].map((beds) => (
              <option key={beds} value={beds}>{beds}</option>
            ))}
          </select>
          <span className={styles.selectArrow}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </div>

      {/* Purpose is NOT included here (Req 18) */}
    </div>
  );
}
