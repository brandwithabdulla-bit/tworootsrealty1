"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Link className="wordmark" aria-label="Two Roots Realty home" href="/">
                <Image src="/logo.png" alt="Two Roots Realty" width={180} height={45} style={{ objectFit: 'contain' }} />
              </Link>
              <p>Rooted in relationships.<br/>Connected to opportunity.</p>
              <p className="muted">Dubai, UAE · Established August 2026</p>
            </div>
            <div className="newsletter">
              <h3>A little more perspective.</h3>
              <p>Property stories and considered insights.</p>
              <form noValidate className="enquiry-form newsletter-form">
                <p className="form-note">Demo form · details are validated but are not sent or saved. Please use test details.</p>
                <div className="form-grid">
                  <label htmlFor="newsletter-email">
                    Email *
                    <input id="newsletter-email" type="email" required autoComplete="email" aria-invalid="false" name="email"/> 
                  </label>
                </div>
                <label className="consent">
                  <input type="checkbox" aria-invalid="false" name="consent"/>
                  <span>I understand this is a demo form. See the <Link href="/privacy-policy">privacy notice</Link>.</span>
                </label>
                <button className="button">Join the newsletter <span aria-hidden="true">↗</span></button>
                <div role="status" aria-live="polite"></div>
              </form>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              <Link href="/about">About</Link>
              <Link href="/properties">Properties</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/services">Services</Link>
              <Link href="/developers">Developers</Link>
              <Link href="/areas">Areas</Link>
            </div>
            <div>
              <h3>Connect</h3>
              <Link href="/investment">Investment</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/testimonials">Testimonials</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/careers">Careers</Link>
            </div>
            <div>
              <h3>Properties</h3>
              <Link href="/properties?propertyType=Apartment">Apartment</Link>
              <Link href="/properties?propertyType=Villa">Villa</Link>
              <Link href="/properties?propertyType=Townhouse">Townhouse</Link>
              <Link href="/properties?propertyType=Penthouse">Penthouse</Link>
              <Link href="/properties?propertyType=Commercial">Commercial</Link>
              <Link href="/properties?propertyType=Branded%20Residence">Branded Residence</Link>
            </div>
            <div>
              <h3>Popular locations</h3>
              <Link href="/areas/downtown-dubai">Downtown Dubai</Link>
              <Link href="/areas/dubai-marina">Dubai Marina</Link>
              <Link href="/areas/dubai-hills-estate">Dubai Hills Estate</Link>
              <Link href="/areas/dubai-creek-harbour">Dubai Creek Harbour</Link>
              <p>Instagram · LinkedIn<br/>Facebook · YouTube</p>
              <small>[Social URLs to be added]</small>
            </div>
          </div>
          <div className="footer-disclaimer">
            <p>[Phone number to be added] · [Email address to be added]<br/>[Office address to be added]</p>
            <p>Development preview: all listings and projects are illustrative. Official logo, regulatory registration, advertising permits and authorised partnership credentials are pending client supply. No partnership is implied.</p>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Two Roots Realty</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </footer>
      
      <button className="whatsapp floating" aria-label="WhatsApp Two Roots Realty" onClick={() => setWhatsappOpen(true)}>
        <span aria-hidden="true">◌</span> WhatsApp
      </button>

      <dialog open={whatsappOpen} aria-labelledby="floating-whatsapp-heading">
        <div className="modal-top">
          <h2 id="floating-whatsapp-heading">Continue on WhatsApp</h2>
          <button className="icon-button" aria-label="Close dialog" onClick={() => setWhatsappOpen(false)}>×</button>
        </div>
        <p>[WhatsApp number to be added]</p>
        <p>The business number has not been supplied yet. Your message is ready to copy; it has not been sent.</p>
        <blockquote>Hi Two Roots Realty, I would like to speak to an advisor.</blockquote>
        <button className="button">Copy message</button>
        <p role="status"></p>
        <Link className="text-link" href="/contact?context=" onClick={() => setWhatsappOpen(false)}>
          Open enquiry form ↗
        </Link>
      </dialog>
    </>
  );
}
