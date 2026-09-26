'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from '@/components/ui';
import styles from './InteractiveMap.module.css';

export default function InteractiveMap({ initialItems = [] }) {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [activeItemId, setActiveItemId] = useState(null);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Extract unique communities
  const communities = [
    'All',
    'Downtown Dubai',
    'Dubai Marina',
    'Palm Jumeirah',
    'Dubai Creek Harbour',
    'Dubai Hills Estate',
    'Meydan',
    'Expo City',
    'Dubai South',
    'Business Bay'
  ];

  // Filter items
  const filteredItems = initialItems.filter(item => {
    const matchesSearch = 
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.developer && item.developer.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCommunity = 
      selectedCommunity === 'All' || 
      item.location.toLowerCase().includes(selectedCommunity.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'All' || 
      (selectedStatus === 'Off-Plan' && (item.offPlan || item.status === 'Off-Plan')) ||
      (selectedStatus === 'Ready' && (item.ready || item.status === 'Ready'));

    const matchesType = 
      selectedType === 'All' || 
      item.propertyType.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesCommunity && matchesStatus && matchesType;
  });

  // Load Leaflet CSS & JS dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    cssLink.crossOrigin = '';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      // Keep script cached for sub-navs
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || leafletMapRef.current) return;

    const L = window.L;
    // Center of Dubai
    const map = L.map(mapContainerRef.current, {
      center: [25.08, 55.25],
      zoom: 11,
      zoomControl: false
    });

    // Elegant luxury carto voyager tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    leafletMapRef.current = map;

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Update Markers when filtered items change
  useEffect(() => {
    if (!leafletMapRef.current || !window.L) return;

    const L = window.L;
    const map = leafletMapRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    if (filteredItems.length === 0) return;

    const bounds = L.latLngBounds();

    filteredItems.forEach(item => {
      if (!item.latitude || !item.longitude) return;

      const isHovered = hoveredItemId === item.id;
      const isActive = activeItemId === item.id;

      // Price label formatting for pin badge
      let badgePrice = item.priceLabel || 'AED 1M+';
      if (typeof item.price === 'number') {
        if (item.price >= 1000000) {
          badgePrice = `AED ${(item.price / 1000000).toFixed(1)}M`;
        } else {
          badgePrice = `AED ${(item.price / 1000).toFixed(0)}K`;
        }
      }

      const markerHtml = `
        <div class="${styles.customMarkerPin} ${isHovered || isActive ? styles.activeMarkerPin : ''}">
          <span class="${styles.markerBadge}">${badgePrice}</span>
          <div class="${styles.markerPoint}"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: styles.markerContainer,
        iconSize: [90, 40],
        iconAnchor: [45, 40]
      });

      const marker = L.marker([item.latitude, item.longitude], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div class="${styles.mapPopupContent}">
          <div class="${styles.popupImageWrap}">
            <img src="${Array.isArray(item.images) ? item.images[0] : item.image || '/images/dubai.jpg'}" alt="${item.title}" />
            <span class="${styles.popupStatus}">${item.status || 'Off-Plan'}</span>
          </div>
          <div class="${styles.popupBody}">
            <span class="${styles.popupSub}">${item.developer ? item.developer + ' • ' : ''}${item.location}</span>
            <h4 class="${styles.popupTitle}">${item.title}</h4>
            <p class="${styles.popupPrice}">${item.priceLabel || badgePrice}</p>
            <a href="${item.slug ? (item.offPlan !== false ? `/projects/${item.slug}` : `/properties/${item.slug}`) : '/projects'}" class="${styles.popupBtn}">
              View Masterplan & Details ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: styles.customLeafletPopup,
        maxWidth: 280,
        minWidth: 260
      });

      marker.on('click', () => {
        setActiveItemId(item.id);
        // Scroll card into view in sidebar
        const el = document.getElementById(`map-card-${item.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });

      markersRef.current[item.id] = marker;
      bounds.extend([item.latitude, item.longitude]);
    });

    // Fit map bounds if items exist
    if (filteredItems.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [filteredItems, hoveredItemId, activeItemId, leafletLoaded]);

  // Handle Card Click
  const handleCardClick = (item) => {
    setActiveItemId(item.id);
    if (leafletMapRef.current && item.latitude && item.longitude) {
      leafletMapRef.current.flyTo([item.latitude, item.longitude], 14, {
        duration: 1.2
      });
      const marker = markersRef.current[item.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className={styles.mapPageWrapper}>
      {/* Header Bar */}
      <div className={styles.mapHeaderBar}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <span className={styles.eyebrow}>Dubai Masterplan &amp; Location Intelligence</span>
              <h1 className={styles.pageTitle}>Dubai Real Estate Map</h1>
            </div>
            
            <div className={styles.statsStrip}>
              <div className={styles.statItem}>
                <strong>{filteredItems.length}</strong>
                <span>Properties Mapped</span>
              </div>
              <div className={styles.statItem}>
                <strong>6.5% – 8.8%</strong>
                <span>Est. Rental Yield</span>
              </div>
              <div className={styles.statItem}>
                <strong>10+ Prime</strong>
                <span>Dubai Communities</span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className={styles.filtersBar}>
            {/* Search Input */}
            <div className={styles.searchBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search area, project, or developer..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Select Filters */}
            <div className={styles.filterDropdowns}>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Off-Plan">Off-Plan Projects</option>
                <option value="Ready">Ready to Move</option>
              </select>

              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="All">All Property Types</option>
                <option value="Apartment">Apartments</option>
                <option value="Villa">Villas</option>
                <option value="Townhouse">Townhouses</option>
                <option value="Branded Residence">Branded Residences</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Community Pills */}
          <div className={styles.communityPills}>
            {communities.map(comm => (
              <button 
                key={comm}
                className={`${styles.pillBtn} ${selectedCommunity === comm ? styles.pillActive : ''}`}
                onClick={() => setSelectedCommunity(comm)}
              >
                {comm}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Drawer Sidebar + Map Canvas */}
      <div className={styles.splitLayout}>
        {/* Left Drawer / Listing Stream */}
        <aside className={styles.sidebarStream}>
          <div className={styles.sidebarHeader}>
            <h3>Showing {filteredItems.length} Locations</h3>
            <p>Click any project to locate on the map or explore details.</p>
          </div>

          <div className={styles.cardsList}>
            {filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                <h4>No properties found</h4>
                <p>Try resetting your search query or community filter.</p>
                <button 
                  className={styles.resetBtn} 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCommunity('All');
                    setSelectedStatus('All');
                    setSelectedType('All');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredItems.map(item => {
                const img = Array.isArray(item.images) ? item.images[0] : item.image || '/images/dubai.jpg';
                const linkHref = item.slug 
                  ? (item.offPlan !== false ? `/projects/${item.slug}` : `/properties/${item.slug}`)
                  : '/projects';

                return (
                  <div 
                    key={item.id}
                    id={`map-card-${item.id}`}
                    className={`${styles.projectCard} ${activeItemId === item.id ? styles.activeCard : ''}`}
                    onClick={() => handleCardClick(item)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <div className={styles.cardPhotoWrap}>
                      <Image 
                        src={img} 
                        alt={item.title} 
                        fill 
                        sizes="180px" 
                        unoptimized
                      />
                      <span className={styles.cardStatusBadge}>
                        {item.status || 'Off-Plan'}
                      </span>
                    </div>

                    <div className={styles.cardInfo}>
                      <div className={styles.cardMetaRow}>
                        <span className={styles.cardLocation}>{item.location}</span>
                        {item.developer && <span className={styles.cardDeveloper}>{item.developer}</span>}
                      </div>

                      <h4 className={styles.cardTitle}>{item.title}</h4>
                      
                      <div className={styles.cardDetailsRow}>
                        <span>{item.bedrooms ? `${item.bedrooms} Bed` : 'Studio'} • {item.propertyType}</span>
                      </div>

                      <div className={styles.cardBottomRow}>
                        <strong className={styles.cardPrice}>{item.priceLabel}</strong>
                        <Link href={linkHref} className={styles.cardLinkBtn} onClick={(e) => e.stopPropagation()}>
                          Details <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Interactive Map */}
        <div className={styles.mapCanvasWrap}>
          {!leafletLoaded && (
            <div className={styles.mapLoader}>
              <div className={styles.spinner}></div>
              <p>Loading Dubai Interactive Map…</p>
            </div>
          )}
          <div ref={mapContainerRef} className={styles.mapContainer}></div>
        </div>
      </div>

      {/* Advisory Bar at Bottom */}
      <section className={styles.mapAdvisoryBanner}>
        <div className="container">
          <div className={styles.advisoryInner}>
            <div>
              <h3>Looking for Off-Plan Allocation in a Specific Dubai Community?</h3>
              <p>Our senior real estate advisors provide direct developer access, payment plan analysis, and inventory availability.</p>
            </div>
            <Link href="#speak-to-advisor" className={styles.advisoryBtn}>
              <span>Speak to an Advisor</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
