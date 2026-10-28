import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationBySlug, getProperties, getProjects } from '@/lib/sanity-data';
import { PageHero, SectionHeader, PropertyGrid, CTASection, Breadcrumbs, Photo, ArrowUpRight } from '@/components/ui';
import { MapSection } from '@/components/detail';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getLocationBySlug(slug);
  return a 
    ? pageMetadata(
        a.name, 
        a.tagline || a.description || `Explore ${a.name}, community highlights and available properties in Dubai.`, 
        `/areas/${slug}`
      ) 
    : {};
}

// Helper to extract non-empty guide sections
// STRICT RULE: If any item has no description, its title and subtitle MUST NOT show!
function getAreaGuideSections(location) {
  const sections = [];

  const maybeAdd = (id, defaultTitle, item) => {
    if (!item) return;
    const desc = item.description?.trim();
    const subs = (item.subsections || []).filter(
      s => s && ((s.description && s.description.trim().length > 0) || (s.subtitle && s.subtitle.trim().length > 0))
    );
    
    // Strict requirement: Only display if there is a description (or populated subsections)
    if (!desc && subs.length === 0) return;

    sections.push({
      id,
      index: sections.length + 1,
      title: item.title?.trim() || defaultTitle,
      subtitle: item.subtitle?.trim() || '',
      description: desc || '',
      subsections: subs
    });
  };

  // 1. An Introduction to (Location)
  maybeAdd('intro', `An Introduction to ${location.name}`, location.guideIntro);

  // 2. Lifestyle and Living Experience
  maybeAdd('lifestyle', 'Lifestyle and Living Experience', location.guideLifestyle);

  // 3. Who is (Location) ideal for?
  maybeAdd('ideal-for', `Who is ${location.name} ideal for?`, location.guideIdealFor);

  // 4. Connectivity and strategic location
  maybeAdd('connectivity', 'Connectivity and strategic location', location.guideConnectivity);

  // 5. Property landscape and housing choices
  maybeAdd('property-landscape', 'Property landscape and housing choices', location.guidePropertyLandscape);

  // 6. Investment potential and growth drivers
  maybeAdd('investment', 'Investment potential and growth drivers', location.guideInvestment);

  // 7. Everyday conveniences and Nearby destinations
  maybeAdd('conveniences', 'Everyday conveniences and Nearby destinations', location.guideConveniences);

  // 8. The future of (Location)
  maybeAdd('future', `The future of ${location.name}`, location.guideFuture);

  // Dynamic CMS sections from array (if added by editor)
  if (Array.isArray(location.guideSections)) {
    location.guideSections.forEach((item, idx) => {
      if (!item) return;
      const desc = item.description?.trim();
      const subs = (item.subsections || []).filter(
        s => s && ((s.description && s.description.trim().length > 0) || (s.subtitle && s.subtitle.trim().length > 0))
      );

      // Strict requirement: Only display if there is a description (or populated subsections)
      if (!desc && subs.length === 0) return;

      sections.push({
        id: `custom-guide-${idx + 1}`,
        index: sections.length + 1,
        title: item.title?.trim() || `Guide Topic ${sections.length + 1}`,
        subtitle: item.subtitle?.trim() || '',
        description: desc || '',
        subsections: subs
      });
    });
  }

  return sections;
}

// Helper to generate short readable label for navigation pills
function getShortTitle(title, index) {
  if (!title) return `Topic ${index}`;
  const lower = title.toLowerCase();
  if (lower.includes('intro')) return 'Introduction';
  if (lower.includes('lifestyle')) return 'Lifestyle';
  if (lower.includes('ideal')) return 'Ideal For';
  if (lower.includes('connectivity') || lower.includes('strategic location')) return 'Connectivity';
  if (lower.includes('property') || lower.includes('housing')) return 'Property Landscape';
  if (lower.includes('investment') || lower.includes('growth')) return 'Investment';
  if (lower.includes('convenience') || lower.includes('nearby')) return 'Conveniences';
  if (lower.includes('future')) return 'Future Outlook';
  return title.length > 22 ? title.slice(0, 20) + '...' : title;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const a = await getLocationBySlug(slug);
  if (!a) notFound();

  const [properties, projects] = await Promise.all([
    getProperties(),
    getProjects()
  ]);

  const portfolio = properties.filter(x => 
    x.locationSlug === slug || 
    x.location?.toLowerCase() === a.name.toLowerCase()
  );

  const related = projects.filter(x => 
    x.locationSlug === slug || 
    x.location?.toLowerCase() === a.name.toLowerCase()
  );

  const uniqueDevelopers = [...new Map(portfolio.filter(p => p.developerSlug).map(p => [p.developerSlug, p])).values()];
  const propertyTypes = a.propertyTypes && a.propertyTypes.length > 0 
    ? a.propertyTypes 
    : ['Apartment', 'Villa', 'Townhouse'];

  const guideSections = getAreaGuideSections(a);

  return (
    <div className="area-detail-page">
      {/* 1. Cinematic PageHero Banner */}
      <PageHero 
        eyebrow={`${a.category || 'Popular'} Community · Dubai Area Guide`} 
        title={a.name} 
        description={a.tagline || a.description || "Find a setting for the way you want to live. Explore community perspectives, architecture and connected residences."} 
        image={a.image} 
        imageAlt={`${a.name} community guide and lifestyle perspective in Dubai`}
      />

      {/* Breadcrumb Navigation */}
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '12px' }}>
        <Breadcrumbs items={[{ label: 'Areas', href: '/areas' }, { label: a.name }]} />
      </div>

      {/* =========================================================================
          2. Location Overview Section (Matching Reference Image 1)
          Left: Location title, Tagline, Description, Stats & Actions
          Right: Photo of the Location
         ========================================================================= */}
      <section className="container area-intro-split-block">
        <div className="area-hero-split-grid">
          <div className="area-hero-split-copy">
            <span className="eyebrow">{a.category || 'Popular'} Community · Dubai Area Guide</span>
            <h1 className="area-hero-title">{a.name}</h1>
            
            {a.tagline && (
              <p className="area-hero-tagline">{a.tagline}</p>
            )}

            <p className="area-hero-lead">
              {a.description || 'Discover a setting for the way you want to live. Explore community perspectives, architecture and connected residences.'}
            </p>

            <div className="area-hero-meta-strip">
              <div className="area-hero-meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-val">{a.category || 'Popular'}</span>
              </div>
              <div className="area-hero-meta-item">
                <span className="meta-label">Residences</span>
                <span className="meta-val">{portfolio.length} Available</span>
              </div>
              <div className="area-hero-meta-item">
                <span className="meta-label">Projects</span>
                <span className="meta-val">{related.length} Active</span>
              </div>
            </div>

            <div className="area-hero-actions">
              <Link href={`/properties?location=${encodeURIComponent(a.name)}`} className="button">
                <span>View Residences in {a.name}</span>
                <ArrowUpRight size={14} className="arrow-icon" />
              </Link>
              <Link href={`/contact?context=${encodeURIComponent(a.name + ' Area Advisory')}`} className="button secondary">
                <span>Speak with an Advisor</span>
              </Link>
            </div>
          </div>

          <div className="area-hero-split-media">
            <div className="area-hero-media-wrap">
              <Photo 
                src={a.image || '/images/dubai.jpg'} 
                alt={`${a.name} community guide and architecture in Dubai`}
                className="area-hero-photo"
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className="area-hero-media-badge">
                <span className="badge-dot" aria-hidden="true" />
                <span>Prime Dubai Destination</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. The 8 Dynamic Guide Pillars ("About {a.name}")
          Editorial Luxury Presentation (Elevating Reference Image 2)
          Strict Rule: Items without a description are automatically omitted.
         ========================================================================= */}
      {guideSections.length > 0 && (
        <section className="container area-guide-container" id="area-guide">
          <div className="area-guide-header">
            <div className="area-guide-header-text">
              <span className="eyebrow">Location Intelligence &amp; Overview</span>
              <h2>About {a.name}</h2>
              <p className="area-guide-lead">
                An in-depth perspective on connectivity, lifestyle dynamics, property landscape, and long-term capital value.
              </p>
            </div>

            {/* Quick Navigation Jump Bar */}
            {guideSections.length > 1 && (
              <nav className="area-guide-nav" aria-label="Area guide navigation">
                <span className="area-guide-nav-label">Jump to pillar:</span>
                <div className="area-guide-nav-pills">
                  {guideSections.map(sec => (
                    <a key={sec.id} href={`#${sec.id}`} className="area-guide-nav-pill">
                      <span className="nav-pill-num">{sec.index < 10 ? `0${sec.index}` : sec.index}</span>
                      <span className="nav-pill-title">{getShortTitle(sec.title, sec.index)}</span>
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>

          {/* Render Active Guide Section Cards */}
          <div className="area-guide-list">
            {guideSections.map(sec => (
              <article key={sec.id} id={sec.id} className="area-guide-card">
                <div className="area-guide-card-header">
                  <div className="area-guide-card-num">
                    <span>{sec.index < 10 ? `0${sec.index}` : sec.index}</span>
                  </div>
                  <div className="area-guide-card-titles">
                    <span className="area-guide-card-kicker">Community Pillar {sec.index}</span>
                    <h3>{sec.title}</h3>
                    {sec.subtitle && (
                      <p className="area-guide-card-subtitle">{sec.subtitle}</p>
                    )}
                  </div>
                </div>

                {/* Primary Description Paragraphs */}
                {sec.description && (
                  <div className="area-guide-body">
                    {sec.description.split(/\n\s*\n/).map((para, pIdx) => (
                      <p key={pIdx}>{para.trim()}</p>
                    ))}
                  </div>
                )}

                {/* Structured Sub-Sections (e.g. Road connectivity & Public transport) */}
                {sec.subsections && sec.subsections.length > 0 && (
                  <div className="area-guide-subsections">
                    <div className="area-subsections-grid">
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="area-subsection-card">
                          <div className="area-subsection-header">
                            <span className="area-sub-dot" aria-hidden="true" />
                            <h4>{sub.subtitle}</h4>
                          </div>
                          <div className="area-subsection-text">
                            {sub.description.split(/\n\s*\n/).map((subPara, spIdx) => (
                              <p key={spIdx}>{subPara.trim()}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Living Dynamics & Property Types Strip */}
      <section className="container area-overview-section">
        <div className="area-overview-grid">
          {/* Lifestyle Notes */}
          <div className="area-overview-card area-lifestyle-card">
            <div>
              <span className="eyebrow">Living Dynamics</span>
              <h2>Everyday life, considered.</h2>
              <div className="area-lifestyle-tags">
                {(a.lifestyle && a.lifestyle.length > 0 ? a.lifestyle : [
                  'Consider your everyday journey and commute',
                  'Compare neighbourhood amenities and parks',
                  'Visit at different times of day'
                ]).map((point, idx) => (
                  <div key={idx} className="area-lifestyle-tag">
                    <span className="area-tag-dot" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="area-property-types-box">
              <span className="area-types-heading">Property Types to Explore in {a.name}</span>
              <div className="area-types-chips">
                {propertyTypes.map(type => (
                  <Link 
                    key={type} 
                    href={`/properties?location=${encodeURIComponent(a.name)}&propertyType=${encodeURIComponent(type)}`}
                    className="area-type-chip"
                    aria-label={`Explore ${type} in ${a.name}`}
                  >
                    <span>{type}</span>
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Perspective & Developers */}
          <div className="area-overview-card area-investment-card">
            <div>
              <span className="eyebrow">Market Intelligence</span>
              <h2>Capital resilience &amp; growth.</h2>
              <p className="area-lead-text">
                Look at ongoing ownership costs, competing supply, arterial connectivity, and tenant demand. In prime master communities, long-term livability and direct developer reputation define genuine capital resilience.
              </p>
            </div>

            <div className="area-dev-box">
              {uniqueDevelopers.length > 0 ? (
                <>
                  <span className="area-types-heading">Key Developers in {a.name}</span>
                  <div className="area-dev-tags">
                    {uniqueDevelopers.map(p => (
                      <Link key={p.developerSlug} href={`/developers/${p.developerSlug}`} className="area-dev-tag-dark">
                        <span>{p.developer}</span>
                        <ArrowUpRight size={12} className="arrow-icon" />
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="area-investment-pillars-inline">
                  <span className="area-types-heading">Market Pillars</span>
                  <ul className="area-pillar-list-inline">
                    <li><strong>Capital Appreciation:</strong> High occupier demand in master developments.</li>
                    <li><strong>Rental Stability:</strong> Sustained tenant retention and healthy gross yields.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects in this Area */}
      <section className="container area-content-block">
        <SectionHeader 
          title={`Featured Projects in ${a.name}`} 
          href="/projects" 
          label="Explore all projects" 
        />
        {related.length > 0 ? (
          <PropertyGrid items={related} kind="projects" />
        ) : (
          <div className="area-empty-card">
            <div className="area-empty-content">
              <span className="eyebrow">Project Allocation</span>
              <h3>Looking for new launches or off-plan opportunities in {a.name}?</h3>
              <p>Our private office has direct access to off-market inventory, verified developer launches, and upcoming phases across {a.name}.</p>
              <div className="area-empty-actions">
                <Link href={`/contact?context=${encodeURIComponent(a.name + ' Off-Plan Projects')}`} className="button">
                  <span>Inquire for {a.name} Projects</span>
                  <ArrowUpRight size={14} className="arrow-icon" />
                </Link>
                <Link href="/projects" className="button secondary">
                  <span>Browse all UAE projects</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Location Map */}
      <section className="container area-content-block">
        <MapSection item={a} />
      </section>

      {/* Properties in this Area */}
      <section className="container area-content-block">
        <SectionHeader 
          title={`Available Residences in ${a.name}`} 
          href={`/properties?location=${encodeURIComponent(a.name)}`} 
          label={`View all in ${a.name}`} 
        />
        {portfolio.length > 0 ? (
          <PropertyGrid items={portfolio} />
        ) : (
          <div className="area-empty-card">
            <div className="area-empty-content">
              <span className="eyebrow">Private Portfolio</span>
              <h3>No public listings currently displayed in {a.name}</h3>
              <p>We frequently source private off-market residences, re-sales, and exclusive developer allocations in this neighbourhood.</p>
              <div className="area-empty-actions">
                <Link href={`/contact?context=${encodeURIComponent(a.name + ' Properties')}`} className="button">
                  <span>Request Curated Shortlist</span>
                  <ArrowUpRight size={14} className="arrow-icon" />
                </Link>
                <Link href="/properties" className="button secondary">
                  <span>Explore all Dubai properties</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Call to action */}
      <CTASection 
        title={`Make a connection with ${a.name}.`} 
        text={`Speak directly with an advisor who understands ${a.name} inside and out — from upcoming handovers to genuine lifestyle nuances.`}
        label={`Explore Properties in ${a.name}`} 
        href={`/properties?location=${encodeURIComponent(a.name)}`}
      />
    </div>
  );
}
