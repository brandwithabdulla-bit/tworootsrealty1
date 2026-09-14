import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | Two Roots Realty',
  description: 'Join the Two Roots Realty team in Dubai.',
};

export default function CareersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Join Us</p>
          <h1>Grow with Two Roots.</h1>
          <p className="lead">We are always looking for driven, relationship-focused professionals to join our growing team in Dubai.</p>
        </div>
      </header>
      
      <section className="section container">
        <div className="empty">
          <h2>No open positions at the moment</h2>
          <p>Please check back later or send us your CV to be considered for future opportunities.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link className="button" href="/contact">
              Contact Us<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
