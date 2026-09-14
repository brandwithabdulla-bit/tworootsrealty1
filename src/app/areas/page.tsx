import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Areas | Two Roots Realty',
  description: 'Discover Dubai and UAE locations through community guides and connected property collections.',
};

import { AREAS } from '@/data/mockData';

export default function AreasPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Find your place</p>
          <h1>Your life. Your neighbourhood.</h1>
          <p className="lead">City energy, waterfront calm or space to grow. Start with the setting that feels like you.</p>
        </div>
      </header>

      <section className="section container">
        <div className="directory-controls">
          <label>
            Search locations
            <input placeholder="Find a neighbourhood" defaultValue="" />
          </label>
          <div className="tabs">
            <button aria-pressed="true">All</button>
            <button aria-pressed="false">Popular</button>
            <button aria-pressed="false">Emerging</button>
            <button aria-pressed="false">Investment</button>
          </div>
        </div>
        <p aria-live="polite">{AREAS.length} locations</p>
        
        <div className="locations-grid">
          {AREAS.map((area) => (
            <Link key={area.id} className="location-card" href={`/areas/${area.slug}`}>
              <div className="photo ">
                <Image
                  alt={`Representative community imagery for ${area.name}`}
                  src={area.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div>
                <span className="eyebrow">{area.category}</span>
                <h3>{area.name}</h3>
                <span>Explore the area ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="map-section map-grid">
          <p className="eyebrow">Location context</p>
          <p className="map-label">Dubai</p>
          <p>Community-level reference only. The exact address and property pin have not been supplied.</p>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Dubai%2C%20UAE" target="_blank" rel="noopener noreferrer">
            Explore community on Google Maps ↗
          </a>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Not sure where to begin?</h2>
          <p>Tell us about your everyday life, your priorities and your plans. We can help you explore the right locations.</p>
          <Link className="button " href="/contact?intent=consultation">
            Find your community<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
