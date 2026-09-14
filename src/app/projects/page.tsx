"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { DEMO_PROJECTS } from '@/data/mockData';

export default function Projects() {
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter States
  const [q, setQ] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredProjects = useMemo(() => {
    return DEMO_PROJECTS.filter(p => {
      if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.location.toLowerCase().includes(q.toLowerCase())) return false;
      if (propertyType && p.propertyType.toLowerCase() !== propertyType.replace(/s$/, '')) return false;
      if (bedrooms && p.bedrooms.toString() !== bedrooms.replace('+', '')) return false;
      if (status && p.status.toLowerCase() !== status) return false;
      if (priceRange) {
        if (priceRange === 'under-1m' && p.priceValue >= 1000000) return false;
        if (priceRange === '1m-3m' && (p.priceValue < 1000000 || p.priceValue >= 3000000)) return false;
        if (priceRange === '3m-5m' && (p.priceValue < 3000000 || p.priceValue >= 5000000)) return false;
        if (priceRange === 'over-5m' && p.priceValue < 5000000) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceValue - b.priceValue;
      if (sortBy === 'price-desc') return b.priceValue - a.priceValue;
      return 0; // recommended
    });
  }, [q, propertyType, bedrooms, status, priceRange, sortBy]);

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Premium Portfolio</p>
          <h1>Discover Exceptional Projects.</h1>
          <p className="lead">Explore off-plan launches, branded residences, and luxury developments.</p>
        </div>
      </header>

      <section className="container section discovery">
        <div className="discovery-layout">
          <aside className="desktop-filters">
            <div className="filter-title">
              <h2>Refine your search</h2>
              <button className="text-link" onClick={() => { setQ(""); setPropertyType(""); setBedrooms(""); setPriceRange(""); setStatus(""); }}>Reset</button>
            </div>
            <div className="filter-fields">
              <label className="search-field">
                Search location, community or project
                <input placeholder="A place to begin…" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
              
              <label>Property type
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                  <option value="">Any property type</option>
                  <option value="apartments">Apartments</option>
                  <option value="villas">Villas</option>
                  <option value="townhouses">Townhouses</option>
                  <option value="penthouses">Penthouses</option>
                  <option value="commercial">Commercial</option>
                </select>
              </label>

              <label>Bedrooms
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  <option value="">Any bedrooms</option>
                  <option value="Studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </label>

              <label>Price Range
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                  <option value="">Any price</option>
                  <option value="under-1m">Under AED 1M</option>
                  <option value="1m-3m">AED 1M - 3M</option>
                  <option value="3m-5m">AED 3M - 5M</option>
                  <option value="over-5m">Over AED 5M</option>
                </select>
              </label>

              <label>Status
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Any status</option>
                  <option value="off-plan">Off-Plan</option>
                  <option value="ready">Ready</option>
                </select>
              </label>
            </div>
          </aside>

          <div>
            <div className="results-bar">
              <p aria-live="polite">Showing <strong>{filteredProjects.length}</strong> premium projects</p>
              <button className="button mobile-filters" onClick={() => setFilterOpen(true)}>Filters</button>
              <label>Sort by
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </label>
            </div>

            <div className="property-grid">
              {filteredProjects.map((property) => (
                <article key={property.id} className="property-card">
                  <Link className="card-image" aria-label={`View ${property.title}`} href={`/projects/${property.slug}`}>
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
                      <Link href={`/projects/${property.slug}`}>{property.title}</Link>
                    </h3>
                    <p className="muted">{property.location}</p>
                    <p className="price">{property.priceLabel}</p>
                    <div className="card-facts">
                      <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} beds`}</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.area} sq ft</span>
                    </div>
                    <Link className="text-link" href={`/projects/${property.slug}`}>
                      View Details <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="empty">
                <h2>No projects found</h2>
                <p style={{ maxWidth: '400px', margin: '0 auto 24px', opacity: 0.8 }}>We couldn't find any projects matching your exact criteria.</p>
                <button className="button secondary" onClick={() => { setQ(""); setPropertyType(""); setBedrooms(""); setPriceRange(""); setStatus(""); }}>Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
