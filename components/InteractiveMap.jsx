'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DUBAI_MAP_AREAS, searchDubaiAreas } from '@/data/dubai-map-areas';
import styles from './InteractiveMap.module.css';

// SVG Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

function InteractiveMapContent() {
  const searchParams = useSearchParams();
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const activeTileLayerRef = useRef(null);
  const areaHighlightLayerRef = useRef(null);

  const [leafletLoaded, setLeafletLoaded] = useState(false);
  // Default to Satellite (Hybrid) with roads and lines, POI/shops turned off
  const [mapMode, setMapMode] = useState('hybrid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Dynamically load Leaflet library and CSS
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // Switch Map Layer: Satellite Hybrid vs Roadmap (with apistyle=s.t:2|p.v:off to turn off shop names & POIs)
  const setTileMode = useCallback((mode) => {
    if (!leafletMapRef.current || !window.L) return;
    const L = window.L;
    const map = leafletMapRef.current;

    if (activeTileLayerRef.current) {
      map.removeLayer(activeTileLayerRef.current);
    }

    let tileUrl = '';
    // apistyle=s.t:2|p.v:off turns off all POIs (shops, businesses, commercial names)
    if (mode === 'roadmap') {
      tileUrl = 'https://mt{s}.google.com/vt/lyrs=m&apistyle=s.t:2|p.v:off&x={x}&y={y}&z={z}';
    } else {
      tileUrl = 'https://mt{s}.google.com/vt/lyrs=y&apistyle=s.t:2|p.v:off&x={x}&y={y}&z={z}';
    }

    const newLayer = L.tileLayer(tileUrl, {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 19,
      attribution: '&copy; Google Maps'
    });

    newLayer.addTo(map);
    activeTileLayerRef.current = newLayer;
    setMapMode(mode);
  }, []);

  // Pan, zoom & highlight selected area on the map
  const selectArea = useCallback((area, shouldZoom = true) => {
    if (!area) {
      setSelectedArea(null);
      if (areaHighlightLayerRef.current && leafletMapRef.current) {
        leafletMapRef.current.removeLayer(areaHighlightLayerRef.current);
        areaHighlightLayerRef.current = null;
      }
      return;
    }

    setSelectedArea(area);
    setSearchQuery(area.name);
    setIsSearchOpen(false);

    if (!leafletMapRef.current || !window.L) return;
    const map = leafletMapRef.current;
    const L = window.L;

    const targetLatLng = L.latLng(area.lat, area.lng);
    const targetZoom = Number(area.zoom) || 15;

    // Smoothly pan & zoom to target area
    if (shouldZoom) {
      try {
        map.setView(targetLatLng, targetZoom, {
          animate: true,
          duration: 1.0
        });
      } catch (err) {
        map.setView(targetLatLng, targetZoom);
      }
    }

    // Clear old area highlight
    if (areaHighlightLayerRef.current) {
      map.removeLayer(areaHighlightLayerRef.current);
      areaHighlightLayerRef.current = null;
    }

    // Create stylish area boundary & highlight only for the selected area
    const highlightGroup = L.layerGroup();

    // Outer subtle glow circle representing the community perimeter
    const glowCircle = L.circle(targetLatLng, {
      radius: area.radius || 1700,
      color: '#0d9488',
      weight: 2.5,
      dashArray: '8, 6',
      fillColor: '#14b8a6',
      fillOpacity: 0.16,
      interactive: false
    });
    highlightGroup.addLayer(glowCircle);

    // Inner center pulse marker
    const pulseIcon = L.divIcon({
      className: styles.pulseIconWrapper,
      html: `
        <div class="${styles.pulseMarker}">
          <div class="${styles.pulseCenter}"></div>
          <div class="${styles.pulseRing}"></div>
          <div class="${styles.areaLabelBadge}">${area.shortName || area.name}</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const centerMarker = L.marker(targetLatLng, {
      icon: pulseIcon,
      zIndexOffset: 1000
    });
    highlightGroup.addLayer(centerMarker);

    highlightGroup.addTo(map);
    areaHighlightLayerRef.current = highlightGroup;
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || leafletMapRef.current) return;

    const L = window.L;

    // Centered on Dubai with initial overview
    const map = L.map(mapContainerRef.current, {
      center: [25.13, 55.23],
      zoom: 11,
      zoomControl: false,
      minZoom: 9,
      maxZoom: 19
    });

    leafletMapRef.current = map;

    // Default tile layer: Google Maps Satellite Hybrid (roads, highway lines, borders, NO shop names/POIs)
    const initialLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&apistyle=s.t:2|p.v:off&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 19,
      attribution: '&copy; Google Maps'
    }).addTo(map);
    activeTileLayerRef.current = initialLayer;

    // Invalidate size once DOM stabilizes
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 150);

    // Check if URL has ?location= parameter
    const locationParam = searchParams.get('location');
    if (locationParam) {
      const matched = DUBAI_MAP_AREAS.find(a => 
        a.name.toLowerCase().includes(locationParam.toLowerCase()) ||
        a.locationSlug === locationParam.toLowerCase() ||
        a.shortName.toLowerCase() === locationParam.toLowerCase() ||
        (a.aliases && a.aliases.some(al => al.includes(locationParam.toLowerCase())))
      );
      if (matched) {
        setTimeout(() => {
          selectArea(matched);
        }, 300);
      }
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [leafletLoaded, selectArea, searchParams]);

  // Search Results filtering: ONLY populated when there is an active search query
  const hasQuery = searchQuery.trim().length > 0;
  const filteredSuggestions = hasQuery ? searchDubaiAreas(searchQuery).slice(0, 8) : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredSuggestions.length > 0) {
      const target = highlightedIndex >= 0 ? filteredSuggestions[highlightedIndex] : filteredSuggestions[0];
      selectArea(target);
    }
  };

  const handleKeyDown = (e) => {
    if (!isSearchOpen && (e.key === 'ArrowDown' || e.key === 'Enter') && hasQuery) {
      setIsSearchOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % (filteredSuggestions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filteredSuggestions.length) % (filteredSuggestions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        selectArea(filteredSuggestions[highlightedIndex]);
      } else if (filteredSuggestions.length > 0) {
        selectArea(filteredSuggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
    }
  };

  const handleResetOverview = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([25.13, 55.23], 11, { animate: true });
      selectArea(null);
      setSearchQuery('');
    }
  };

  return (
    <div className={styles.masterplanPageWrap}>
      {/* Top Floating Google Maps Style Search Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.searchBarWrapper} ref={searchBoxRef}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <div className={styles.searchIconWrap}>
              <SearchIcon />
            </div>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              value={searchQuery}
              placeholder="Search Dubai areas (e.g. JVC, Marina, Downtown)…"
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                setIsSearchOpen(val.trim().length > 0);
                setHighlightedIndex(-1);
              }}
              onFocus={() => {
                if (hasQuery) setIsSearchOpen(true);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  setSearchQuery('');
                  selectArea(null);
                  setIsSearchOpen(false);
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <CloseIcon />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown: ONLY appears when user searches/types */}
          {isSearchOpen && hasQuery && (
            <div className={styles.searchDropdown}>
              <div className={styles.dropdownHeader}>
                <span>Matching Dubai Areas ({filteredSuggestions.length})</span>
              </div>
              <div className={styles.dropdownList} role="listbox">
                {filteredSuggestions.length === 0 ? (
                  <div className={styles.emptyResults}>
                    <p>No matching Dubai area found for &ldquo;{searchQuery}&rdquo;</p>
                    <span className={styles.emptyTip}>Try searching for JVC, Downtown, Marina, or Palm Jumeirah</span>
                  </div>
                ) : (
                  filteredSuggestions.map((area, idx) => (
                    <button
                      key={area.id}
                      type="button"
                      className={`${styles.suggestionItem} ${idx === highlightedIndex ? styles.highlightedItem : ''} ${selectedArea?.id === area.id ? styles.activeItem : ''}`}
                      onClick={() => selectArea(area)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      <div className={styles.suggestionIcon}>
                        <SearchIcon />
                      </div>
                      <div className={styles.suggestionMeta}>
                        <div className={styles.suggestionTitleRow}>
                          <span className={styles.suggestionName}>{area.name}</span>
                          <span className={styles.suggestionTag}>{area.type}</span>
                        </div>
                        <div className={styles.suggestionSubRow}>
                          <span>{area.tagline}</span>
                        </div>
                      </div>
                      <div className={styles.suggestionArrow}>
                        <ArrowRightIcon />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Google Maps Style Controls (Right Side) */}
      <div className={styles.mapControlsWrapper}>
        {/* Map Type Switcher: Satellite (Default) vs Map */}
        <div className={styles.mapTypeSwitcher}>
          <button
            type="button"
            className={`${styles.typeBtn} ${mapMode === 'hybrid' ? styles.activeTypeBtn : ''}`}
            onClick={() => setTileMode('hybrid')}
            title="Satellite Imagery with roads and borders"
          >
            Satellite
          </button>
          <button
            type="button"
            className={`${styles.typeBtn} ${mapMode === 'roadmap' ? styles.activeTypeBtn : ''}`}
            onClick={() => setTileMode('roadmap')}
            title="Google Roadmap with streets, lines and districts"
          >
            Map
          </button>
        </div>

        {/* Zoom & Overview Buttons */}
        <div className={styles.zoomButtonsGroup}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleZoomIn}
            title="Zoom In (+)"
            aria-label="Zoom in"
          >
            <PlusIcon />
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleZoomOut}
            title="Zoom Out (-)"
            aria-label="Zoom out"
          >
            <MinusIcon />
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleResetOverview}
            title="Dubai Overview (Reset Zoom)"
            aria-label="Reset overview"
          >
            <CompassIcon />
          </button>
        </div>
      </div>

      {/* Selected Area Place Details Card */}
      {selectedArea && (
        <div className={styles.areaDetailsCardWrap}>
          <div className={styles.areaDetailsCard}>
            <button
              type="button"
              className={styles.closeCardBtn}
              onClick={() => selectArea(null)}
              aria-label="Close area details"
            >
              <CloseIcon />
            </button>

            <div className={styles.cardHeader}>
              <div className={styles.cardBadgeRow}>
                <span className={styles.areaCategoryBadge}>{selectedArea.category}</span>
                <span className={styles.areaTypeBadge}>{selectedArea.type}</span>
              </div>
              <h2 className={styles.cardTitle}>{selectedArea.name}</h2>
              <p className={styles.cardTagline}>{selectedArea.tagline}</p>
            </div>

            <p className={styles.cardDesc}>{selectedArea.description}</p>

            {/* Quick Metrics */}
            <div className={styles.specsGrid}>
              <div className={styles.specBox}>
                <span className={styles.specLabel}>Avg. Rental Yield</span>
                <span className={styles.specValue}>{selectedArea.avgRoi}</span>
              </div>
              <div className={styles.specBox}>
                <span className={styles.specLabel}>Price Guide</span>
                <span className={styles.specValue}>{selectedArea.priceRange}</span>
              </div>
            </div>

            {/* Highlights List */}
            {selectedArea.highlights && (
              <div className={styles.highlightsWrap}>
                <span className={styles.highlightsTitle}>Key Features &amp; Connectivity:</span>
                <ul className={styles.highlightsList}>
                  {selectedArea.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.cardActions}>
              <Link
                href={`/properties?location=${encodeURIComponent(selectedArea.shortName === 'JVC' ? 'Jumeirah Village Circle' : selectedArea.name)}`}
                className={styles.primaryActionBtn}
              >
                <span>Browse {selectedArea.shortName} Properties</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href={`/projects?location=${encodeURIComponent(selectedArea.shortName === 'JVC' ? 'Jumeirah Village Circle' : selectedArea.name)}`}
                className={styles.secondaryActionBtn}
              >
                <span>View Off-Plan Projects</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Map Canvas Container */}
      <div className={styles.mapCanvasWrap}>
        {!leafletLoaded && (
          <div className={styles.mapLoadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading Dubai Interactive Map…</p>
          </div>
        )}
        <div ref={mapContainerRef} className={styles.mapCanvas}></div>
      </div>
    </div>
  );
}

export default function InteractiveMap() {
  return (
    <Suspense fallback={
      <div style={{ background: '#08121e', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <p>Loading Dubai Map…</p>
      </div>
    }>
      <InteractiveMapContent />
    </Suspense>
  );
}
