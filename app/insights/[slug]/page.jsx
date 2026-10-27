import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles, getArticleBySlug } from '@/lib/sanity-data';
import { PageHero, CTASection, SectionHeader, BlogCard, Breadcrumbs, Button, ArrowUpRight } from '@/components/ui';
import { WHATSAPP_URL } from '@/data/brand';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getArticleBySlug(slug);
  return p ? pageMetadata(p.title, p.summary, `/insights/${slug}`) : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const p = await getArticleBySlug(slug);
  if (!p) notFound();
  const blog = await getArticles();

  const formattedDate = p.date
    ? new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '1 September 2026';

  const descriptionParagraphs = (p.summary || '')
    .split(/\r?\n+/)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(s => s.toLowerCase() !== p.title?.toLowerCase());

  return (
    <>
      <PageHero
        eyebrow={p.category || 'Insights'}
        title={p.title}
        description={`${p.author || 'Two Roots Editorial'} · ${formattedDate} · ${p.readingTime || '3 min read'}`}
        image={p.image}
        imageAlt={`${p.title} - Two Roots Realty Journal`}
      />

      <section className="container section article-section-container">
        <Breadcrumbs
          items={[
            { label: 'Insights', href: '/insights' },
            { label: p.title }
          ]}
        />

        <div className="article-layout">
          {/* Main Article Content Column */}
          <article className="article-main">
            {/* Description / Overview Section */}
            {descriptionParagraphs.length > 0 && (
              <section id="overview" className="article-intro-section">
                <div className="article-intro-badge-row">
                  <span className="eyebrow">Executive Summary</span>
                  <span className="article-meta-inline">
                    {p.readingTime || '3 min read'}
                  </span>
                </div>

                <div className="article-intro-copy">
                  {descriptionParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={i === 0 ? 'article-lead-p' : 'article-body-p'}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {descriptionParagraphs.length >= 2 && (
                  <div className="article-quote-box">
                    <span className="quote-mark" aria-hidden="true">“</span>
                    <p className="quote-text">{descriptionParagraphs[0]}</p>
                    <span className="quote-source">Two Roots Realty · Strategic Property Brief</span>
                  </div>
                )}
              </section>
            )}

            {/* Content Sections */}
            <div className="article-sections-flow">
              {(p.content || []).map((x, idx) => (
                <section key={x.heading || idx} id={`section-${idx + 1}`} className="article-section-block">
                  <div className="article-section-header">
                    <span className="article-step-num">0{idx + 1}</span>
                    <h2>{x.heading}</h2>
                  </div>
                  <p className="article-section-text">{x.text}</p>
                </section>
              ))}
            </div>

            {/* Author / Brand Footnote Card */}
            <div className="article-author-card">
              <div className="author-badge-mark">TR</div>
              <div className="author-bio">
                <h4>{p.author || 'Two Roots Editorial Team'}</h4>
                <p>
                  Providing investors and buyers with clear analysis, trusted market perspective, and disciplined real estate advisory in Dubai.
                </p>
              </div>
              <Link href="/contact" className="button secondary author-action-btn">
                <span>Talk to an Advisor</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </article>

          {/* Sticky Sidebar Companion */}
          <aside className="article-sidebar">
            <div className="article-sidebar-sticky">
              {/* Table of Contents */}
              <div className="sidebar-card toc-card">
                <h3 className="sidebar-card-title">In This Article</h3>
                <nav className="toc-list" aria-label="Article sections">
                  {descriptionParagraphs.length > 0 && (
                    <a href="#overview" className="toc-link">
                      <span className="toc-dot" />
                      <span>Executive Overview</span>
                    </a>
                  )}
                  {(p.content || []).map((x, idx) => (
                    <a key={idx} href={`#section-${idx + 1}`} className="toc-link">
                      <span className="toc-index">0{idx + 1}</span>
                      <span>{x.heading}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Advisory Consultation Card */}
              <div className="sidebar-card advisory-card">
                <span className="eyebrow advisory-eyebrow">Personal Advisory</span>
                <h3 className="advisory-title">Have questions about your Dubai property brief?</h3>
                <p className="advisory-text">
                  Our advisors provide transparent, personalized guidance — from shortlisting prime properties to negotiation and final handover.
                </p>
                <div className="advisory-actions">
                  <Button href="/contact?intent=consultation" className="advisory-btn">
                    Book a Consultation
                  </Button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="advisory-whatsapp-link"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Article Meta Details */}
              <div className="sidebar-card meta-card">
                <div className="meta-card-row">
                  <span className="meta-card-label">Category</span>
                  <span className="meta-card-val">{p.category || 'Dubai Real Estate'}</span>
                </div>
                <div className="meta-card-row">
                  <span className="meta-card-label">Date</span>
                  <span className="meta-card-val">{formattedDate}</span>
                </div>
                <div className="meta-card-row">
                  <span className="meta-card-label">Read Time</span>
                  <span className="meta-card-val">{p.readingTime || '3 min read'}</span>
                </div>
                <div className="meta-card-row">
                  <span className="meta-card-label">Market</span>
                  <span className="meta-card-val">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* More to Consider */}
      <section className="section container">
        <SectionHeader title="More to consider." href="/insights" label="All insights" />
        <div className="blog-grid">
          {blog
            .filter(x => x.id !== p.id)
            .slice(0, 3)
            .map(x => (
              <BlogCard key={x.id} item={x} />
            ))}
        </div>
      </section>

      <CTASection title="Bring your questions. We'll bring perspective." label="Talk to Our Team" />
    </>
  );
}
