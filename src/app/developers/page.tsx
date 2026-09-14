import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers | Two Roots Realty',
  description: 'Discover the developers in our illustrative collection and explore their connected projects and locations.',
};

import { DEVELOPERS } from '@/data/mockData';
import Image from 'next/image';

export default function DevelopersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">The people shaping places</p>
          <h1>Discover by developer.</h1>
          <p className="lead">A different way into your property search. Explore the makers, the places and the possibilities.</p>
        </div>
      </header>

      <section className="section container">
        <p className="demo-note">
          Developer names are supplied by the client. These are text placeholders, not official logos. Demo project associations do not imply a partnership or authorisation.
        </p>
        
        <div className="developer-grid">
          {DEVELOPERS.map((dev) => (
            <article key={dev.slug} className="developer-card">
              <Link className="card-image" aria-label={`View ${dev.name}`} href={`/developers/${dev.slug}`}>
                <div className="photo">
                  <Image src={dev.image || '/images/dubai.jpg'} alt={`${dev.name} projects`} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
              </Link>
              <div className="card-copy">
                <h3><Link href={`/developers/${dev.slug}`}>{dev.name}</Link></h3>
                <p>Explore the illustrative {dev.name} collection, with connected projects and communities to help shape your shortlist.</p>
                <p className="muted">{dev.projects} illustrative projects</p>
                <Link className="text-link" href={`/developers/${dev.slug}`}>
                  Explore Developer ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>A developer is part of the decision.</h2>
          <p>Talk through your priorities, compare your options and ask the questions that matter.</p>
          <Link className="button " href="/contact?intent=consultation">
            Talk to an Advisor<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
