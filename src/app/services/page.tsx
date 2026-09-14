import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | Two Roots Realty',
  description: 'Selling, renting, leasing and property management with personalised support from Two Roots Realty.',
  robots: 'noindex, nofollow',
};

export default function ServicesPage() {
  return (
    <>
      <header className="page-hero with-image">
        <div className="container">
          <p className="eyebrow">Your property. Our priority.</p>
          <h1>
            Support for every<br />
            <em>next step.</em>
          </h1>
          <p className="lead">Selling comes first. Lasting relationships carry everything forward.</p>
        </div>
        <div className="photo">
          <Image
            src="/images/villa.jpg"
            alt="Illustrative architectural photography"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </header>

      <section className="container section">
        <article className="service-feature" id="selling">
          <span className="number">01</span>
          <div>
            <h2>Selling</h2>
            <p className="lead">Professional support to market and sell your property at the best possible value.</p>
          </div>
          <div>
            <ul>
              <li>Understand your property and priorities</li>
              <li>Shape the marketing approach</li>
              <li>Support negotiation and the next steps</li>
            </ul>
            <Link href="/contact?context=Selling" className="button secondary">
              Discuss Your Requirements<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <article className="service-feature" id="renting">
          <span className="number">02</span>
          <div>
            <h2>Renting</h2>
            <p className="lead">Helping clients find the right rental property based on their lifestyle, location and budget.</p>
          </div>
          <div>
            <ul>
              <li>Define your lifestyle and budget</li>
              <li>Discover a focused shortlist</li>
              <li>Support your move</li>
            </ul>
            <Link href="/contact?context=Renting" className="button secondary">
              Discuss Your Requirements<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <article className="service-feature" id="leasing">
          <span className="number">03</span>
          <div>
            <h2>Leasing</h2>
            <p className="lead">End-to-end assistance for property owners and tenants, from marketing and tenant screening to documentation and handover.</p>
          </div>
          <div>
            <ul>
              <li>Present your property</li>
              <li>Coordinate tenant screening</li>
              <li>Support documentation and handover</li>
            </ul>
            <Link href="/contact?context=Leasing" className="button secondary">
              Discuss Your Requirements<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <article className="service-feature" id="property-management">
          <span className="number">04</span>
          <div>
            <h2>Property Management</h2>
            <p className="lead">Complete property care, including tenant management, rent collection, maintenance coordination and regular inspections.</p>
          </div>
          <div>
            <ul>
              <li>Understand the asset</li>
              <li>Coordinate ongoing care</li>
              <li>Maintain a clear owner relationship</li>
            </ul>
            <Link href="/contact?context=Property%20Management" className="button secondary">
              Discuss Your Requirements<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="section sand">
        <div className="container">
          <p className="eyebrow">Room to grow</p>
          <h2>A broader relationship, over time.</h2>
          <p>Future service areas below are planned for expansion and are not presented as currently available. Ask the team about your requirements.</p>
          <div className="future-services">
            <span>Off-plan advisory</span>
            <span>Ready property advisory</span>
            <span>Investment consultation</span>
            <span>Portfolio building</span>
            <span>Portfolio management</span>
            <span>Asset management</span>
            <span>Relocation assistance</span>
            <span>International investor support</span>
            <span>Golden Visa-related property guidance</span>
            <span>After-sales support</span>
            <span>Handover support</span>
            <span>Developer partnerships</span>
            <span>Referral partnerships</span>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Thinking of selling? Let's start there.</h2>
          <p>Share your property and your priorities. We will help you consider the next step.</p>
          <Link href="/contact?intent=selling" className="button">
            List Your Property<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
