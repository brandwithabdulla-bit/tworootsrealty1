'use client';

import Link from 'next/link';
import { ImageGallery, EnquiryForm } from './interactive';
import { DemoNote, ArrowUpRight, PropertyGrid } from './ui';
import ProjectBrochureSection from './ProjectBrochureSection';
import SpeakToAdvisorLink from './SpeakToAdvisorLink';

export function ListingDetail({ item, kind = 'properties', similar = [] }) {
  if (!item) return null;

  const isProject = kind === 'projects' || item.offPlan;

  return (
    <div className="detail-page-container container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href={`/${kind}`}>{kind === 'projects' ? 'Projects' : 'Properties'}</Link>
        <span> / </span>
        <span aria-current="page">{item.title}</span>
      </nav>

      {/* Detail Header */}
      <div className="detail-title">
        <div>
          <span className="eyebrow">
            {item.developer ? `${item.developer} • ` : ''}{item.location}
          </span>
          <h1>{item.title}</h1>
          {item.tagline && <p className="lead">{item.tagline}</p>}
        </div>
        <div>
          <p className="price">{item.priceLabel || (item.price ? `AED ${item.price.toLocaleString('en-AE')}` : 'Price on Application')}</p>
          <span className="badge">{item.status || (isProject ? 'Off-Plan' : 'Ready')}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery item={item} />

      {/* Main Layout Grid */}
      <div className="detail-layout">
        <div className="detail-content">
          {/* Key Facts */}
          <section className="facts-section">
            <dl className="facts">
              <div>
                <dt>Property type</dt>
                <dd>{item.propertyType || 'Residential'}</dd>
              </div>
              <div>
                <dt>Bedrooms</dt>
                <dd>{item.bedrooms ? `${item.bedrooms} Bedrooms` : 'Studio'}</dd>
              </div>
              <div>
                <dt>Bathrooms</dt>
                <dd>{item.bathrooms || 'N/A'}</dd>
              </div>
              <div>
                <dt>Built-up Area</dt>
                <dd>{item.area ? `${item.area.toLocaleString('en-AE')} sq ft` : 'On Request'}</dd>
              </div>
              {item.handover && (
                <div>
                  <dt>Handover / Status</dt>
                  <dd>{item.handover}</dd>
                </div>
              )}
              {item.developer && (
                <div>
                  <dt>Developer</dt>
                  <dd>{item.developer}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Description */}
          <section>
            <h2>A considered place to begin.</h2>
            <p className="editorial-copy">{item.description}</p>
          </section>

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <section>
              <h2>Key Highlights</h2>
              <ul className="amenities">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Amenities */}
          {item.amenities && item.amenities.length > 0 && (
            <section>
              <h2>Amenities &amp; Features</h2>
              <ul className="amenities">
                {item.amenities.map(x => <li key={x}>{x}</li>)}
              </ul>
              <DemoNote>Amenities are representative and sourced directly from developer project specifications.</DemoNote>
            </section>
          )}

          {/* Payment Plan */}
          {item.paymentPlan && item.paymentPlan.length > 0 && (
            <section>
              <h2>Payment plan</h2>
              <div className="payment-plan">
                {item.paymentPlan.map((step, idx) => (
                  <div key={idx} className="payment-step">
                    <strong>{step.percent}%</strong>
                    <span>{step.label}</span>
                    {step.date && <small>{step.date}</small>}
                  </div>
                ))}
              </div>
              <DemoNote>Payment schedules are subject to developer terms and official reservation contract.</DemoNote>
            </section>
          )}

          {/* Brochure & Factsheet Download */}
          {isProject && (
            <section>
              <ProjectBrochureSection project={item} />
            </section>
          )}

          {/* Location Map Preview */}
          <section className="map-section">
            <span className="eyebrow">Location &amp; Neighbourhood</span>
            <h2 className="map-label">{item.location}</h2>
            <p>Explore nearby amenities, connectivity, and real estate market performance on our interactive map.</p>
            <div style={{ marginTop: '20px' }}>
              <Link href="/map" className="button">
                <span>View on Dubai Real Estate Map</span> <ArrowUpRight size={14} />
              </Link>
            </div>
          </section>
        </div>

        {/* Sticky Enquiry Sidebar */}
        <aside className="sticky-enquiry">
          <h2>Request Allocation &amp; Details</h2>
          <p className="small muted">Speak directly with our senior advisory desk regarding this listing.</p>
          <EnquiryForm 
            variant="sticky" 
            context={`${item.title} (${item.location})`} 
            submitLabel="Request Details"
          />
        </aside>
      </div>

      {/* Similar Listings */}
      {similar.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <h2>Similar {kind === 'projects' ? 'Projects' : 'Properties'}</h2>
            <Link href={`/${kind}`} className="text-link">View all</Link>
          </div>
          <PropertyGrid items={similar} kind={kind} />
        </section>
      )}
    </div>
  );
}

export function MapSection({ item = {} }) {
  const locationName = item.name || item.location || 'Dubai';
  return (
    <div className="map-section">
      <span className="eyebrow">Location &amp; Neighbourhood</span>
      <h2 className="map-label">{locationName}</h2>
      <p>Explore nearby amenities, connectivity, and real estate market performance on our interactive map.</p>
      <div style={{ marginTop: '20px' }}>
        <Link href={`/map?location=${encodeURIComponent(locationName)}`} className="button">
          <span>View {locationName} on Interactive Map</span> <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

