'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './InteractiveMap.module.css';

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
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
      center: [25.12, 55.22],
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

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  return (
    <div className={styles.masterplanPageWrap}>
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
    </div>
  );
}
