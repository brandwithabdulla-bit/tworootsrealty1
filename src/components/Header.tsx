"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  
  return (
    <>
      <header className="site-header glass-header">
        <Link className="wordmark" aria-label="Two Roots Realty home" href="/">
          <Image src="/logo.png" alt="Two Roots Realty" width={180} height={45} style={{ objectFit: 'contain' }} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-item" onMouseEnter={(e) => e.currentTarget.querySelector('details')?.setAttribute('open', '')} onMouseLeave={(e) => e.currentTarget.querySelector('details')?.removeAttribute('open')}>
            <details>
              <summary>About <span aria-hidden="true">⌄</span></summary>
              <div className="dropdown glass-panel">
                <Link href="/about" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>About Two Roots</Link>
                <Link href="/about/our-story" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Our Story</Link>
                <Link href="/about/team" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Founders & Team</Link>
              </div>
            </details>
          </div>
          <div className="nav-item" onMouseEnter={(e) => e.currentTarget.querySelector('details')?.setAttribute('open', '')} onMouseLeave={(e) => e.currentTarget.querySelector('details')?.removeAttribute('open')}>
            <details>
              <summary>Projects <span aria-hidden="true">⌄</span></summary>
              <div className="dropdown glass-panel">
                <Link href="/projects" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>All Projects</Link>
                <Link href="/properties?status=Off-Plan" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Off-Plan</Link>
                <Link href="/properties?status=Ready" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Ready</Link>
                <Link href="/investment" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Investment</Link>
              </div>
            </details>
          </div>
          <Link href="/services">Services</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/areas">Areas</Link>
          <div className="nav-item" onMouseEnter={(e) => e.currentTarget.querySelector('details')?.setAttribute('open', '')} onMouseLeave={(e) => e.currentTarget.querySelector('details')?.removeAttribute('open')}>
            <details>
              <summary>Insights <span aria-hidden="true">⌄</span></summary>
              <div className="dropdown">
                <Link href="/insights" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Blog</Link>
                <Link href="/insights?category=Market%20Updates" onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>Market Insights</Link>
              </div>
            </details>
          </div>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="button header-cta" href="/contact?intent=consultation" style={{ background: 'var(--sand)', color: 'var(--navy)', borderColor: 'var(--sand)' }}>
          Book a Consultation ↗
        </Link>
        <button 
          className="menu-button" 
          aria-expanded={mobileMenuOpen} 
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>
      </header>

      <dialog className="mobile-menu" open={mobileMenuOpen} aria-labelledby="mobile-menu-heading">
        <div className="modal-top">
          <h2 id="mobile-menu-heading">Explore Two Roots</h2>
          <button className="icon-button" aria-label="Close dialog" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>
        <Link className="wordmark" aria-label="Two Roots Realty home" href="/" onClick={() => setMobileMenuOpen(false)}>
          <Image src="/logo.png" alt="Two Roots Realty" width={150} height={38} style={{ objectFit: 'contain' }} />
        </Link>
        <nav aria-label="Mobile navigation">
          <div>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <div className="mobile-subnav">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Two Roots</Link>
              <Link href="/about/our-story" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
              <Link href="/about/team" onClick={() => setMobileMenuOpen(false)}>Founders & Team</Link>
            </div>
          </div>
          <div>
            <Link href="/properties" onClick={() => setMobileMenuOpen(false)}>Properties</Link>
            <div className="mobile-subnav">
              <Link href="/properties" onClick={() => setMobileMenuOpen(false)}>All Properties</Link>
              <Link href="/properties?status=Off-Plan" onClick={() => setMobileMenuOpen(false)}>Off-Plan</Link>
              <Link href="/properties?status=Ready" onClick={() => setMobileMenuOpen(false)}>Ready Properties</Link>
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <Link href="/investment" onClick={() => setMobileMenuOpen(false)}>Investment Opportunities</Link>
            </div>
          </div>
          <div><Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link></div>
          <div><Link href="/developers" onClick={() => setMobileMenuOpen(false)}>Developers</Link></div>
          <div><Link href="/areas" onClick={() => setMobileMenuOpen(false)}>Areas</Link></div>
          <div>
            <Link href="/insights" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            <div className="mobile-subnav">
              <Link href="/insights" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/insights?category=Market%20Updates" onClick={() => setMobileMenuOpen(false)}>Market Insights</Link>
            </div>
          </div>
          <div><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></div>
          <Link href="/investment" onClick={() => setMobileMenuOpen(false)}>Investment</Link>
          <Link href="/testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
          <Link href="/careers" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
        </nav>
        <Link className="button" href="/contact?intent=consultation" onClick={() => setMobileMenuOpen(false)}>
          Book a Consultation ↗
        </Link>
        <button className="button secondary" onClick={() => setWhatsappOpen(true)}>
          <span aria-hidden="true">◌</span> WhatsApp Us
        </button>

        <dialog open={whatsappOpen} aria-labelledby="whatsapp-heading">
          <div className="modal-top">
            <h2 id="whatsapp-heading">Continue on WhatsApp</h2>
            <button className="icon-button" aria-label="Close dialog" onClick={() => setWhatsappOpen(false)}>×</button>
          </div>
          <p>[WhatsApp number to be added]</p>
          <p>The business number has not been supplied yet. Your message is ready to copy; it has not been sent.</p>
          <blockquote>Hi Two Roots Realty, I would like to speak to an advisor.</blockquote>
          <button className="button">Copy message</button>
          <p role="status"></p>
          <Link className="text-link" href="/contact?context=" onClick={() => { setWhatsappOpen(false); setMobileMenuOpen(false); }}>
            Open enquiry form ↗
          </Link>
        </dialog>

        <p className="muted">
          Instagram · LinkedIn · Facebook · YouTube<br/>
          [Social URLs to be added]
        </p>
      </dialog>
    </>
  );
}
