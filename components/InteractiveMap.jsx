'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from '@/components/ui';
import styles from './InteractiveMap.module.css';

// Master Dubai Communities Dataset matching masterplan layout
const dubaxCommunities = [
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    tagline: 'The Centre of Now • Home to Burj Khalifa & Dubai Mall',
    lat: 25.1972,
    lng: 55.2744,
    developer: 'Emaar Properties',
    type: 'Apartments & Penthouses',
    priceRange: 'From AED 1.8M',
    description: 'Dubai’s iconic flagship master community featuring world-class shopping, dining, and ultra-luxury residential towers.',
    slug: 'downtown-dubai'
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    tagline: 'Waterfront Promenade & Riviera Lifestyle',
    lat: 25.081,
    lng: 55.140,
    developer: 'Emaar / Select Group',
    type: 'Waterfront Apartments & Mansions',
    priceRange: 'From AED 1.5M',
    description: 'A vibrant waterfront community surrounding a 3.5 km man-made canal, lined with dining, luxury yachts, and beaches.',
    slug: 'dubai-marina'
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    tagline: 'World-Famous Iconic Island Masterpiece',
    lat: 25.112,
    lng: 55.139,
    developer: 'Nakheel',
    type: 'Beachfront Villas & Branded Residences',
    priceRange: 'From AED 3.2M',
    description: 'The world-famous tree-shaped artificial island offering private beachfront villas, 5-star resorts, and luxury apartments.',
    slug: 'palm-jumeirah'
  },
  {
    id: 'new-marina-jebel-ali',
    name: 'Palm Jebel Ali & New Marina',
    tagline: 'The Future of Dubai Beachfront Living',
    lat: 24.997,
    lng: 54.986,
    developer: 'Nakheel',
    type: 'Ultra-Luxury Beachfront Villas',
    priceRange: 'From AED 18M',
    description: 'Dubai’s newest mega-island masterplan twice the size of Palm Jumeirah, setting new benchmarks in eco-luxury beachfront living.',
    slug: 'palm-jebel-ali'
  },
  {
    id: 'dubai-creek-harbour',
    name: 'Dubai Creek Harbour',
    tagline: 'The Next Downtown • Waterfront Green Metropolis',
    lat: 25.207,
    lng: 55.345,
    developer: 'Emaar Properties',
    type: 'Waterfront Apartments & Townhouses',
    priceRange: 'From AED 1.4M',
    description: 'A futuristic waterfront destination offering uninterrupted views of the Dubai skyline and Ras Al Khor Wildlife Sanctuary.',
    slug: 'dubai-creek-harbour'
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    tagline: 'The Green Heart of Dubai • Golf Course Masterplan',
    lat: 25.106,
    lng: 55.247,
    developer: 'Emaar Properties',
    type: 'Villas, Townhouses & Apartments',
    priceRange: 'From AED 1.6M',
    description: 'An elegantly planned 18-hole championship golf course community featuring expansive parks, Dubai Hills Mall, and top schools.',
    slug: 'dubai-hills-estate'
  },
  {
    id: 'expo-city',
    name: 'Expo City & Expo Living',
    tagline: 'Future-Ready Sustainable Master Community',
    lat: 24.960,
    lng: 55.150,
    developer: 'Emaar / Expo City',
    type: 'Garden Villas & Modern Apartments',
    priceRange: 'From AED 1.6M',
    description: 'A legacy smart city destination framed by lush parks, tech hubs, and direct walking access to Dubai Expo Mall.',
    slug: 'expo-city'
  },
  {
    id: 'dubai-south',
    name: 'Dubai South & Al Maktoum Airport',
    tagline: 'The World’s Largest Aerotropolis & Logistics City',
    lat: 24.948,
    lng: 55.154,
    developer: 'Dubai South / Emaar / Sobha',
    type: 'Villas, Townhouses & Residences',
    priceRange: 'From AED 1.1M',
    description: 'An expansive 145 sq km urban ecosystem surrounding Al Maktoum International Airport (DWC), driving Dubai’s future growth.',
    slug: 'dubai-south'
  },
  {
    id: 'the-oasis',
    name: 'The Oasis by Emaar',
    tagline: 'Ultra-Luxury Sanctuary Water Villa Community',
    lat: 24.980,
    lng: 55.210,
    developer: 'Emaar Properties',
    type: 'Waterfront Mansions & Estate Villas',
    priceRange: 'From AED 8.5M',
    description: 'A resort-style sanctuary featuring pristine blue lagoons, swimming channels, and grand estate mansions.',
    slug: 'the-oasis'
  },
  {
    id: 'tilal-al-ghaf',
    name: 'Tilal Al Ghaf',
    tagline: 'Resort-Style Lagoon Community by Majid Al Futtaim',
    lat: 25.035,
    lng: 55.228,
    developer: 'Majid Al Futtaim',
    type: 'Lagoon Villas & Luxury Townhouses',
    priceRange: 'From AED 2.4M',
    description: 'Centered around the stunning crystal-clear Lagoon Al Ghaf with sandy white beaches, parks, and walking trails.',
    slug: 'tilal-al-ghaf'
  },
  {
    id: 'damac-lagoons',
    name: 'DAMAC Lagoons & DAMAC Hills',
    tagline: 'Mediterranean-Inspired Water Masterplan',
    lat: 25.020,
    lng: 55.245,
    developer: 'DAMAC Properties',
    type: 'Mediterranean Villas & Townhouses',
    priceRange: 'From AED 1.9M',
    description: 'A resort-inspired master development featuring crystal lagoons, tropical islands, kayaking, and golf course vistas.',
    slug: 'damac-lagoons'
  },
  {
    id: 'sobha-hartland-meydan',
    name: 'Meydan & Sobha Hartland',
    tagline: 'Lagoon Living Minutes from Downtown',
    lat: 25.154,
    lng: 55.299,
    developer: 'Sobha Realty / Meydan',
    type: 'Waterfront Apartments & Mansions',
    priceRange: 'From AED 1.4M',
    description: 'Prime waterfront master development in Meydan with crystal lagoons, international schools, and lush green parks.',
    slug: 'meydan'
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    tagline: 'Dubai’s Central Business & Luxury Canal District',
    lat: 25.185,
    lng: 55.265,
    developer: 'Deyaar / Select Group / Omniyat',
    type: 'Canal-Front Apartments & Penthouses',
    priceRange: 'From AED 1.2M',
    description: 'A dynamic commercial and luxury residential hub along the Dubai Water Canal, bordering Downtown Dubai.',
    slug: 'business-bay'
  },
  {
    id: 'jumeirah-village-circle',
    name: 'Jumeirah Village Circle (JVC)',
    tagline: 'Family-Friendly Community with High Rental Yields',
    lat: 25.059,
    lng: 55.208,
    developer: 'Nakheel / Ellington',
    type: 'Apartments & Townhouses',
    priceRange: 'From AED 650K',
    description: 'A peaceful, central family community with 30+ parks, international schools, and high investment yields.',
    slug: 'jumeirah-village-circle'
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches 1, 2 & 3',
    tagline: 'Desert Monitored Gated Villa Masterpiece',
    lat: 25.070,
    lng: 55.300,
    developer: 'Emaar Properties',
    type: 'Gated Villa & Townhouse Communities',
    priceRange: 'From AED 2.8M',
    description: 'Emaar’s classic suburban villa master community with golf courses, polo club, parks, and retail centers.',
    slug: 'arabian-ranches'
  },
  {
    id: 'al-furjan',
    name: 'Al Furjan',
    tagline: 'Connected Family Neighbourhood near Metro',
    lat: 25.026,
    lng: 55.144,
    developer: 'Nakheel',
    type: 'Villas, Townhouses & Apartments',
    priceRange: 'From AED 950K',
    description: 'A vibrant residential community with direct Dubai Metro connectivity, clubhouses, and community centers.',
    slug: 'al-furjan'
  },
  {
    id: 'rashid-yachts-marina',
    name: 'Rashid Yachts & Marina',
    tagline: 'Heritage Waterfront Yachting Destination',
    lat: 25.273,
    lng: 55.278,
    developer: 'Emaar Properties',
    type: 'Marina-Front Luxury Apartments',
    priceRange: 'From AED 1.7M',
    description: 'Emaar’s new luxury coastal destination for yacht owners, blending historic charm with modern waterfront living.',
    slug: 'rashid-yachts-marina'
  }
];

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});

  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet dynamically
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

  // Initialize Satellite Masterplan Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || leafletMapRef.current) return;

    const L = window.L;
    // Bounds centered on Dubai master developments
    const map = L.map(mapContainerRef.current, {
      center: [25.08, 55.22],
      zoom: 11,
      zoomControl: false,
      minZoom: 9,
      maxZoom: 17
    });

    // High-Resolution Esri World Satellite Imagery (Aerial Masterplan View)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri, Maxar, Earthstar Geographics',
      maxZoom: 17
    }).addTo(map);

    // Zoom Controls
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    leafletMapRef.current = map;

    // Render Master Community Markers (Matching black luxury blocks from reference)
    dubaxCommunities.forEach(comm => {
      const markerHtml = `
        <div class="${styles.masterplanTag}">
          <div class="${styles.tagTitle}">${comm.name}</div>
          <div class="${styles.tagSub}">${comm.priceRange}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: styles.masterplanIconWrap,
        iconSize: [160, 48],
        iconAnchor: [80, 24]
      });

      const marker = L.marker([comm.lat, comm.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedCommunity(comm);
        map.flyTo([comm.lat, comm.lng], 13, { duration: 1 });
      });

      markersRef.current[comm.id] = marker;
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  const handlePillClick = (comm) => {
    setSelectedCommunity(comm);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([comm.lat, comm.lng], 13, { duration: 1.2 });
    }
  };

  const handleReset = () => {
    setSelectedCommunity(null);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([25.08, 55.22], 11, { duration: 1.2 });
    }
  };

  return (
    <div className={styles.masterplanPageWrap}>
      {/* Floating Header Controls */}
      <div className={styles.topControlBar}>
        <div className={styles.barHeader}>
          <span className={styles.eyebrow}>Dubai Masterplan &amp; Community Map</span>
          <h1 className={styles.title}>Explore Dubai Communities</h1>
        </div>

        {/* Quick Community Quick-Pills */}
        <div className={styles.communityPillsRow}>
          <button 
            className={`${styles.pillBtn} ${!selectedCommunity ? styles.activePill : ''}`}
            onClick={handleReset}
          >
            Overview Map
          </button>
          {dubaxCommunities.map(comm => (
            <button 
              key={comm.id}
              className={`${styles.pillBtn} ${selectedCommunity?.id === comm.id ? styles.activePill : ''}`}
              onClick={() => handlePillClick(comm)}
            >
              {comm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <div className={styles.mapCanvasWrap}>
        {!leafletLoaded && (
          <div className={styles.mapLoadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading Dubai Satellite Masterplan Map…</p>
          </div>
        )}
        <div ref={mapContainerRef} className={styles.mapCanvas}></div>
      </div>

      {/* Selected Community Popup Modal / Card Overlay */}
      {selectedCommunity && (
        <div className={styles.communityModalOverlay}>
          <div className={styles.communityCard}>
            <button className={styles.closeCardBtn} onClick={() => setSelectedCommunity(null)}>✕</button>
            <span className={styles.cardEyebrow}>{selectedCommunity.developer}</span>
            <h2 className={styles.cardTitle}>{selectedCommunity.name}</h2>
            <p className={styles.cardTagline}>{selectedCommunity.tagline}</p>

            <div className={styles.cardSpecsGrid}>
              <div>
                <span>Property Types</span>
                <strong>{selectedCommunity.type}</strong>
              </div>
              <div>
                <span>Price Guidance</span>
                <strong>{selectedCommunity.priceRange}</strong>
              </div>
            </div>

            <p className={styles.cardDesc}>{selectedCommunity.description}</p>

            <div className={styles.cardActions}>
              <Link 
                href={`/projects?location=${encodeURIComponent(selectedCommunity.name)}`}
                className={styles.primaryBtn}
              >
                <span>Explore Projects in {selectedCommunity.name}</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link 
                href="#speak-to-advisor"
                className={styles.secondaryBtn}
              >
                <span>Enquire Allocation</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
