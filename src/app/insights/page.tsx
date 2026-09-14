import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights | Two Roots Realty',
  description: 'Property stories, community perspectives and considered questions from the Two Roots journal.',
};

import { INSIGHTS } from '@/data/mockData';
export default function InsightsPage() {
  return (
    <>
      <header className="page-hero ">
        <div className="container">
          <p className="eyebrow">The Two Roots journal</p>
          <h1>A little more perspective.</h1>
          <p className="lead">Ideas, questions and places to explore. These sample articles demonstrate the future journal.</p>
        </div>
      </header>

      <section className="section container">
        <div className="directory-controls">
          <label>Search insights<input defaultValue="" /></label>
          <label>Category
            <select defaultValue="All">
              <option value="All">All</option>
              <option value="Buying Guide">Buying Guide</option>
              <option value="Investment">Investment</option>
              <option value="Communities">Communities</option>
              <option value="Off-Plan">Off-Plan</option>
              <option value="Selling Guide">Selling Guide</option>
              <option value="Market Updates">Market Updates</option>
              <option value="Dubai Real Estate">Dubai Real Estate</option>
            </select>
          </label>
        </div>

        <div className="blog-grid">
          {INSIGHTS.map((insight) => (
            <article key={insight.id} className="blog-card">
              <Link href={`/insights/${insight.slug}`}>
                <div className="photo ">
                  <Image
                    alt="Illustrative architecture and living spaces"
                    src={insight.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </Link>
              <p className="eyebrow">{insight.category} · Demo article</p>
              <h3>
                <Link href={`/insights/${insight.slug}`}>
                  {insight.title}
                </Link>
              </h3>
              <p className="muted">{insight.date} · {insight.readingTime}</p>
              <p>{insight.summary}</p>
              <Link className="text-link" href={`/insights/${insight.slug}`}>
                Read the story ↗
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>A question worth asking?</h2>
          <p>Bring it to a conversation with our team.</p>
          <Link className="button " href="/contact?intent=consultation">
            Talk to an Advisor<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
