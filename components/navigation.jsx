'use client';
import {useState,useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Modal,EnquiryForm} from './interactive';
import {ArrowUpRight} from './ui';
const links=[['Home','/'],['About','/about',[['About Two Roots','/about'],['Our Story','/about/our-story'],['Founders & Team','/about/team']]],['Projects','/projects',[['All Projects','/projects'],['Off-Plan','/projects?status=Off-Plan'],['Ready Projects','/projects?status=Ready'],['Investment Opportunities','/investment']]],['Services','/services'],['Developers','/developers'],['Areas','/areas'],['Insights','/insights',[['Blog','/insights'],['Market Insights','/insights?category=Market%20Updates']]],['Contact','/contact']];
export function Wordmark(){return <Link href="/" className="wordmark-img" aria-label="Two Roots Realty home"><img src="/logo.png" alt="Two Roots Realty" className="logo-img" /></Link>}
export { default as Navbar } from './Navbar';

export function Footer(){
  const pathname=usePathname();
  if(pathname?.startsWith('/studio'))return null;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Wordmark/>
            <p>Rooted in relationships.<br/>Connected to opportunity.</p>
            <p className="muted">Dubai, UAE · Established August 2026</p>
          </div>
          <div className="newsletter">
            <h3>A little more perspective.</h3>
            <p>Property stories and considered insights.</p>
            <EnquiryForm variant="newsletter" submitLabel="Join the newsletter"/>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            {[['About','/about'],['Home','/'],['Projects','/projects'],['Services','/services'],['Developers','/developers'],['Areas','/areas']].map(([n,h])=><Link key={n} href={h}>{n}</Link>)}
          </div>
          <div>
            <h3>Connect</h3>
            {[['Investment','/investment'],['Insights','/insights'],['Testimonials','/testimonials'],['Contact','/contact'],['Careers','/careers']].map(([n,h])=><Link key={n} href={h}>{n}</Link>)}
          </div>
          <div>
            <h3>Project types</h3>
            {['Apartment','Townhouse','Villa','Mansion','Commercial'].map(n=><Link key={n} href={`/projects?propertyType=${encodeURIComponent(n)}`}>{n}</Link>)}
          </div>
          <div>
            <h3>Popular locations</h3>
            {[['Downtown Dubai','downtown-dubai'],['Dubai Marina','dubai-marina'],['Dubai Hills Estate','dubai-hills-estate'],['Dubai Creek Harbour','dubai-creek-harbour']].map(([n,s])=><Link key={n} href={`/areas/${s}`}>{n}</Link>)}
            <div className="footer-social-section">
              <span className="footer-social-label">Follow Us</span>
              <div className="footer-social-icons">
                <a href="https://instagram.com/tworootsrealty" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/tworootsrealty" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://facebook.com/tworootsrealty" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@tworootsrealty" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                </a>
                <a href="https://wa.me/971585830569" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-contact-bar">
          <div className="footer-contact-col">
            <span className="footer-bar-label">Office Location</span>
            <p>
              Office (707)<br />
              City Avenue Building<br />
              Port Saeed, Deira, Dubai
            </p>
          </div>
          <div className="footer-contact-col">
            <span className="footer-bar-label">Direct Enquiries</span>
            <p>
              <a href="tel:+971585830569">+971 585830569</a>
              <span className="sep">·</span>
              <a href="mailto:Info@tworootsrealty.com">Info@tworootsrealty.com</a>
              <span className="sep">·</span>
              <a href="https://www.tworootsrealty.com" target="_blank" rel="noopener noreferrer">www.tworootsrealty.com</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 All Rights Reserved to Two Roots Realty LLC | ORN 64022</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
