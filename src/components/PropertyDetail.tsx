"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { notFound } from "next/navigation";

export default function PropertyDetail({ item, type }: { item: any, type: 'property' | 'project' }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return notFound();

  // For demo, we just duplicate the single image a few times if the item doesn't have a gallery array.
  const galleryImages = item.gallery || [
    item.image,
    '/images/interior.jpg',
    '/images/architecture.jpg',
    '/images/waterfront.jpg'
  ];

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span> / <Link href={type === 'project' ? "/projects" : "/properties"}>{type === 'project' ? 'Projects' : 'Properties'}</Link></span>
          <span> / {item.title}</span>
        </nav>

        <div className="gallery">
          <button className="gallery-main" aria-label={`Open gallery for ${item.title}`} onClick={() => { setGalleryOpen(true); setCurrentImageIndex(0); }}>
            <Image 
              src={galleryImages[0]} 
              alt={`${item.title}: illustrative photo 1`} 
              fill 
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <span className="badge">View gallery · 1 / {galleryImages.length}</span>
          </button>
          
          <div className="gallery-thumbs">
            {galleryImages.map((img: string, i: number) => (
              <button key={i} aria-label={`Show photo ${i+1}`} aria-pressed={i === 0} onClick={() => { setGalleryOpen(true); setCurrentImageIndex(i); }}>
                <Image 
                  src={img} 
                  alt={`Illustrative view ${i+1}`} 
                  fill 
                  sizes="25vw"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>

          <dialog open={galleryOpen} className="gallery-dialog" aria-labelledby="gallery-heading">
            <div className="modal-top">
              <h2 id="gallery-heading">{item.title} — gallery</h2>
              <button className="icon-button" aria-label="Close dialog" onClick={() => setGalleryOpen(false)}>×</button>
            </div>
            <div className="lightbox">
              <Image 
                src={galleryImages[currentImageIndex]} 
                alt={`Illustrative photo ${currentImageIndex + 1} of ${galleryImages.length}`} 
                fill 
                sizes="90vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="gallery-controls">
              <button className="button secondary" onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1))}>← Previous</button>
              <span aria-live="polite">{currentImageIndex + 1} / {galleryImages.length}</span>
              <button className="button secondary" onClick={() => setCurrentImageIndex(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0))}>Next →</button>
            </div>
            <p className="demo-note">Representative stock photography, not photographs of this fictional property.</p>
          </dialog>
        </div>

        <div className="detail-title">
          <div>
            <p className="eyebrow">{item.status} · {item.propertyType} · Demo project</p>
            <h1>{item.title}</h1>
            <p>
              <Link className="text-link" href="/areas">{item.location}</Link> · <Link className="text-link" href="/developers">{item.developer}</Link>
            </p>
          </div>
          <p className="price">{item.priceLabel}</p>
        </div>

        <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>

        <div className="detail-layout">
          <div className="detail-content">
            <dl className="facts">
              <div>
                <dt>Bedrooms</dt>
                <dd>{item.bedrooms === 0 ? 'Studio' : item.bedrooms}</dd>
              </div>
              <div>
                <dt>Bathrooms</dt>
                <dd>{item.bathrooms}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{item.area} sq ft</dd>
              </div>
              <div>
                <dt>Handover</dt>
                <dd>{item.status}</dd>
              </div>
            </dl>

            <section>
              <h2>A considered place to begin.</h2>
              <p>The {item.title} is a fictional project created to demonstrate the Two Roots discovery experience. The illustrative collection explores spacious homes and a considered connection to {item.location}. Every specification, price, handover date and developer relationship requires replacement with verified inventory before launch.</p>
            </section>

            <section>
              <h2>Amenities</h2>
              <ul className="amenities">
                <li>Pool</li>
                <li>Fitness studio</li>
                <li>Covered parking</li>
                <li>Residents’ lounge</li>
                <li>Outdoor spaces</li>
                <li>Concierge</li>
              </ul>
              <p className="demo-note">Amenities are illustrative and need verification.</p>
            </section>

            <section>
              <h2>Payment plan</h2>
              <p>Payment terms will be confirmed for a specific property and transaction.</p>
            </section>

            <section>
              <h2>Investment perspective</h2>
              <p>Consider the purchase price alongside ongoing costs, financing, your intended holding period and the depth of future resale demand. Ask for verified evidence before relying on a projected income or valuation.</p>
              <p>Capital values and rental income can fall as well as rise. This demo listing does not forecast returns.</p>
              <Link className="text-link" href="/investment">Explore our investment approach ↗</Link>
            </section>

            <section>
              <h2>Explore the location</h2>
              <div className="map-section map-grid">
                <p className="eyebrow">Location context</p>
                <p className="map-label">{item.location}</p>
                <p>Community-level reference only. The exact address and property pin have not been supplied.</p>
                <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location + ", UAE")}`} target="_blank" rel="noopener noreferrer">Explore community on Google Maps ↗</a>
              </div>
            </section>

            <section>
              <h2>A closer look</h2>
              <div className="document-row">
                <h3>Floor plans</h3>
                <p>Approved floor plans have not been supplied. No illustrative measurements should be used for a purchase decision.</p>
                <Link className="button secondary" href={`/contact?context=${encodeURIComponent(item.title + ' — floor plans')}`}>Request floor plan information<span aria-hidden="true">↗</span></Link>
              </div>
              <div className="document-row">
                <h3>Project brochure</h3>
                <p>Brochure to be added. Videos and presentations can be attached here when approved assets are available.</p>
                <Link className="button secondary" href={`/contact?context=${encodeURIComponent(item.title + ' — brochure')}`}>Ask about the brochure<span aria-hidden="true">↗</span></Link>
              </div>
            </section>
          </div>

          <aside className="sticky-enquiry" id="enquiry">
            <p className="eyebrow">Your next step</p>
            <h2>Request Project Details</h2>
            <form noValidate className="enquiry-form">
              <p className="form-note">Demo form · details are validated but are not sent or saved. Please use test details.</p>
              <p className="context-note">Enquiry: <strong>{item.title}</strong></p>
              <div className="form-grid">
                <label>Name *<input type="text" required name="name" /></label>
                <label>Email *<input type="email" required name="email" /></label>
                <label>Phone *<input type="tel" required name="phone" /></label>
                <label>Preferred contact method
                  <select name="contactMethod">
                    <option value="">Select an option</option>
                    <option>Email</option>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                  </select>
                </label>
              </div>
              <label>Message
                <textarea name="message" rows={3} maxLength={4000}></textarea>
              </label>
              <label className="consent">
                <input type="checkbox" name="consent" />
                <span>I understand this is a demo form. See the <Link href="/privacy-policy">privacy notice</Link>.</span>
              </label>
              <button className="button">Request Project Details <span aria-hidden="true">↗</span></button>
            </form>

            <button className="button secondary"><span aria-hidden="true">◌</span> WhatsApp Us</button>
          </aside>
        </div>
      </div>

      <div className="mobile-enquire">
        <Link className="button" href="#enquiry">Enquire Now ↗</Link>
      </div>
    </>
  );
}
