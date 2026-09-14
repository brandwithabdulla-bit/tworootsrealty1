import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { INSIGHTS } from "@/data/mockData";

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = INSIGHTS.find(a => a.slug === resolvedParams.slug);
  
  if (!article) return notFound();

  // Get other articles for the "More to consider" section
  const relatedArticles = INSIGHTS.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <main id="main-content">
      <header className="page-hero with-image">
        <div className="container">
          <p className="eyebrow">{article.category} · Demo article</p>
          <h1>{article.title}</h1>
          <p className="lead">Two Roots editorial preview · {article.date} · {article.readingTime}</p>
        </div>
        <div className="photo">
          <Image src={article.image} alt="Illustrative architectural photography" fill sizes="100vw" priority />
        </div>
      </header>

      <section className="container section">
        <div className="article-body">
          <p className="demo-note">Sample editorial content for layout demonstration. Not a verified market report or professional recommendation.</p>
          <section>
            <h2>Start with your priorities</h2>
            <p>Write down what matters most: the purpose of the property, your preferred timeline, the space you need and the places you want to be close to. A clear brief makes it easier to compare options consistently.</p>
          </section>
          <section>
            <h2>Make room for the details</h2>
            <p>Ask what information is confirmed, what is provisional and what still needs checking. Keep documents, questions and assumptions together so each conversation builds on the last.</p>
          </section>
          <section>
            <h2>Take the next step with context</h2>
            <p>Bring your shortlist and the questions you cannot yet answer to an advisor. This demonstration article illustrates the publishing layout; it is not a market report, legal opinion or personalised investment recommendation.</p>
          </section>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><h2>More to consider.</h2></div>
        </div>
        <div className="blog-grid">
          {relatedArticles.map((related) => (
            <article key={related.id} className="blog-card">
              <Link href={`/insights/${related.slug}`}>
                <div className="photo">
                  <Image src={related.image} alt="Illustrative architecture and living spaces" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </Link>
              <p className="eyebrow">{related.category} · Demo article</p>
              <h3><Link href={`/insights/${related.slug}`}>{related.title}</Link></h3>
              <p className="muted">{related.date} · {related.readingTime}</p>
              <p>{related.summary}</p>
              <Link className="text-link" href={`/insights/${related.slug}`}>Read the story <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Bring your questions. We'll bring perspective.</h2>
          <p>Whether you are buying a home or building an investment portfolio, our team is ready to guide you.</p>
          <Link className="button" href="/contact?intent=consultation">Talk to Our Team<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({
    slug: article.slug,
  }));
}
