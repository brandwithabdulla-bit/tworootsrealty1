"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { DEMO_PROPERTIES } from "@/data/mockData";

export default function Properties() {
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter States
  const [q, setQ] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [developer, setDeveloper] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProperties = useMemo(() => {
    return DEMO_PROPERTIES.filter(p => {
      if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.location.toLowerCase().includes(q.toLowerCase())) return false;
      if (propertyType && p.propertyType !== propertyType) return false;
      if (location && p.location !== location) return false;
      if (developer && p.developer !== developer) return false;
      if (bedrooms && p.bedrooms.toString() !== bedrooms) return false;
      if (status && p.status !== status) return false;
      if (minPrice && p.priceValue < parseInt(minPrice)) return false;
      if (maxPrice && p.priceValue > parseInt(maxPrice)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceValue - b.priceValue;
      if (sortBy === 'price-desc') return b.priceValue - a.priceValue;
      if (sortBy === 'area-desc') return b.area - a.area;
      return 0; // featured (original order)
    });
  }, [q, propertyType, location, developer, bedrooms, status, minPrice, maxPrice, sortBy]);

  return (
    <main id="main-content">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Your place. Your perspective.</p>
          <h1>Find what feels right.</h1>
          <p className="lead">A considered collection of homes and investment possibilities. Begin with what matters to you.</p>
        </div>
      </header>

      <section className="container section discovery">
        <div className="discovery-layout">
          <aside className="desktop-filters">
            <div className="filter-title">
              <h2>Refine your search</h2>
              <button className="text-link" onClick={() => { setQ(""); setPropertyType(""); setLocation(""); setDeveloper(""); setBedrooms(""); setStatus(""); setMinPrice(""); setMaxPrice(""); }}>Reset</button>
            </div>
            <div className="filter-fields">
              <label className="search-field">
                Search by name or area
                <input placeholder="A place to begin…" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
              <label>
                Property type
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                  <option value="">Any property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Branded Residence">Branded Residence</option>
                </select>
              </label>
              <label>
                Location
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Any location</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Business Bay">Business Bay</option>
                  <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                  <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                  <option value="Dubai South">Dubai South</option>
                  <option value="Palm Jebel Ali">Palm Jebel Ali</option>
                  <option value="Dubai Islands">Dubai Islands</option>
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Jumeirah Village Circle">Jumeirah Village Circle</option>
                  <option value="Meydan">Meydan</option>
                  <option value="Al Furjan">Al Furjan</option>
                  <option value="Rashid Yachts &amp; Marina">Rashid Yachts &amp; Marina</option>
                  <option value="Expo City">Expo City</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                </select>
              </label>
              <label>
                Developer
                <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
                  <option value="">Any developer</option>
                  <option value="Emaar">Emaar</option>
                  <option value="Damac">Damac</option>
                  <option value="Sobha">Sobha</option>
                  <option value="Ellington">Ellington</option>
                  <option value="Dubai Holdings">Dubai Holdings</option>
                  <option value="Omniyat">Omniyat</option>
                  <option value="Beyond">Beyond</option>
                  <option value="Dubai South">Dubai South</option>
                  <option value="Leos">Leos</option>
                  <option value="Object1">Object1</option>
                  <option value="Marquis">Marquis</option>
                  <option value="Imtiaz">Imtiaz</option>
                  <option value="Samana">Samana</option>
                  <option value="Binghatti">Binghatti</option>
                  <option value="Azizi">Azizi</option>
                </select>
              </label>
              <label>
                Bedrooms
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  <option value="">Any bedrooms</option>
                  <option value="0">Studio / open plan</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              <label>
                Status
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Any status</option>
                  <option value="Ready">Ready</option>
                  <option value="Off-Plan">Off-Plan</option>
                </select>
              </label>
              <label>
                Minimum price (AED)
                <input type="number" min="0" step="1000" placeholder="No minimum" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              </label>
              <label>
                Maximum price (AED)
                <input type="number" min="0" step="1000" placeholder="No maximum" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </label>
            </div>
          </aside>
          
          <div>
            <div className="results-bar">
              <p aria-live="polite"><strong>{filteredProperties.length}</strong> properties</p>
              <button className="button mobile-filters" onClick={() => setFilterOpen(true)}>Filters</button>
              <label>
                Sort by
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="area-desc">Largest area</option>
                </select>
              </label>
            </div>
            
            <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>
            
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <article key={property.id} className="property-card">
                  <Link className="card-image" aria-label={`View ${property.title}`} href={`/properties/${property.slug}`}>
                    <div className="photo">
                      <Image 
                        src={property.image} 
                        alt={`Illustrative ${property.propertyType.toLowerCase()} photography`} 
                        fill 
                        sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span className="badge">{property.status}</span>
                    <span className="image-note">DEMO</span>
                  </Link>
                  <div className="card-copy">
                    <div className="card-meta">
                      {property.propertyType} <span>{property.developer}</span>
                    </div>
                    <h3>
                      <Link href={`/properties/${property.slug}`}>{property.title}</Link>
                    </h3>
                    <p className="muted">{property.location}</p>
                    <p className="price">{property.priceLabel}</p>
                    <div className="card-facts">
                      <span>{property.bedrooms === 0 ? 'Studio / open plan' : `${property.bedrooms} beds`}</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.area} sq ft</span>
                    </div>
                    <Link className="text-link" href={`/properties/${property.slug}`}>
                      View Details <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredProperties.length === 0 && (
              <div className="empty">
                <h2>No properties found</h2>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            )}
            
            {filteredProperties.length > 0 && (
              <div className="load-more">
                <button className="button secondary">Load more (0 remaining)</button>
              </div>
            )}
          </div>
        </div>

        <dialog open={filterOpen} className="filter-dialog" aria-labelledby="mobile-filter-heading">
          <div className="modal-top">
            <h2 id="mobile-filter-heading">Refine your search</h2>
            <button className="icon-button" aria-label="Close dialog" onClick={() => setFilterOpen(false)}>×</button>
          </div>
          <div className="filter-fields">
            <label className="search-field">
              Search by name or area
              <input placeholder="A place to begin…" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <label>
              Property type
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Any property type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Branded Residence">Branded Residence</option>
              </select>
            </label>
            <label>
              Location
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Any location</option>
                <option value="Downtown Dubai">Downtown Dubai</option>
                <option value="Business Bay">Business Bay</option>
                <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                <option value="Dubai South">Dubai South</option>
                <option value="Palm Jebel Ali">Palm Jebel Ali</option>
                <option value="Dubai Islands">Dubai Islands</option>
                <option value="Dubai Marina">Dubai Marina</option>
                <option value="Jumeirah Village Circle">Jumeirah Village Circle</option>
                <option value="Meydan">Meydan</option>
                <option value="Al Furjan">Al Furjan</option>
                <option value="Rashid Yachts &amp; Marina">Rashid Yachts &amp; Marina</option>
                <option value="Expo City">Expo City</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
              </select>
            </label>
            <label>
              Developer
              <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
                <option value="">Any developer</option>
                <option value="Emaar">Emaar</option>
                <option value="Damac">Damac</option>
                <option value="Sobha">Sobha</option>
                <option value="Ellington">Ellington</option>
                <option value="Dubai Holdings">Dubai Holdings</option>
                <option value="Omniyat">Omniyat</option>
                <option value="Beyond">Beyond</option>
                <option value="Dubai South">Dubai South</option>
                <option value="Leos">Leos</option>
                <option value="Object1">Object1</option>
                <option value="Marquis">Marquis</option>
                <option value="Imtiaz">Imtiaz</option>
                <option value="Samana">Samana</option>
                <option value="Binghatti">Binghatti</option>
                <option value="Azizi">Azizi</option>
              </select>
            </label>
            <label>
              Bedrooms
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                <option value="">Any bedrooms</option>
                <option value="0">Studio / open plan</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label>
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Any status</option>
                <option value="Ready">Ready</option>
                <option value="Off-Plan">Off-Plan</option>
              </select>
            </label>
            <label>
              Minimum price (AED)
              <input type="number" min="0" step="1000" placeholder="No minimum" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </label>
            <label>
              Maximum price (AED)
              <input type="number" min="0" step="1000" placeholder="No maximum" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button className="button" onClick={() => setFilterOpen(false)}>Show {filteredProperties.length} results</button>
            <button className="text-link" onClick={() => { setQ(""); setPropertyType(""); setLocation(""); setDeveloper(""); setBedrooms(""); setStatus(""); setMinPrice(""); setMaxPrice(""); }}>Reset Filters</button>
          </div>
        </dialog>
      </section>
    </main>
  );
}
