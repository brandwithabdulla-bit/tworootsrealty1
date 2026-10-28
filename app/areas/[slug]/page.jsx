import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationBySlug, getProperties, getProjects } from '@/lib/sanity-data';
import { PageHero, SectionHeader, PropertyGrid, CTASection, Breadcrumbs, ArrowUpRight } from '@/components/ui';
import { MapSection } from '@/components/detail';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getLocationBySlug(slug);
  return a ? pageMetadata(a.name, `Explore ${a.name}, community highlights and available properties in Dubai.`, `/areas/${slug}`) : {};
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

  return (
    <div className="area-detail-page">
      <PageHero 
        eyebrow={`${a.category || 'Popular'} Community · Dubai Area Guide`} 
        title={a.name} 
        description="Find a setting for the way you want to live. Explore community perspectives, architecture and connected residences." 
        image={a.image} 
        imageAlt={`${a.name} community guide and lifestyle perspective in Dubai`}
      />

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <Breadcrumbs items={[{ label: 'Areas', href: '/areas' }, { label: a.name }]} />
      </div>

      {/* Community Overview & Lifestyle Dynamics (Structured luxury cards instead of raw document) */}
      <section className="container area-overview-section">
        <div className="area-overview-grid">
          {/* Card 1: Sense of Place */}
          <div className="area-overview-card">
            <div>
              <span className="eyebrow">Community Character</span>
              <h2>A sense of place.</h2>
              <p className="area-lead-text">{a.description}</p>
            </div>
            
            <div className="area-stats-strip">
              <div className="area-stat-item">
                <span className="area-stat-label">Category</span>
                <span className="area-stat-val">{a.category || 'Popular'}</span>
              </div>
              <div className="area-stat-item">
                <span className="area-stat-label">Residences</span>
                <span className="area-stat-val">{portfolio.length} Available</span>
              </div>
              <div className="area-stat-item">
                <span className="area-stat-label">Projects</span>
                <span className="area-stat-val">{related.length} Active</span>
              </div>
            </div>
          </div>

          {/* Card 2: Everyday Life & Property Types */}
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
              <span className="area-types-heading">Property Types to Explore</span>
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
              <p>Our private office has direct access to off-market inventory, verified developer launches and upcoming phases across {a.name}.</p>
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

      {/* Local Investment Perspective & Developers */}
      <section className="container area-content-block">
        <div className="area-investment-panel">
          <div className="area-investment-copy">
            <span className="eyebrow">Market Intelligence</span>
            <h2>The local investment perspective.</h2>
            <p>
              Look at ongoing ownership costs, competing supply, accessibility and the needs of potential future occupiers. A location label alone does not establish value — strategic infrastructure, genuine yield performance and long-term livability define true capital resilience.
            </p>
          </div>

          <div className="area-investment-side">
            {uniqueDevelopers.length > 0 ? (
              <>
                <h3>Developers in this collection</h3>
                <div className="area-dev-tags">
                  {uniqueDevelopers.map(p => (
                    <Link key={p.developerSlug} href={`/developers/${p.developerSlug}`} className="area-dev-tag">
                      <span>{p.developer}</span>
                      <ArrowUpRight size={12} className="arrow-icon" />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="area-investment-pillars">
                <h3>Key Area Drivers</h3>
                <ul className="area-pillar-list">
                  <li>
                    <strong>Sustained Appreciation</strong>
                    <span>High occupier demand in master-planned communities.</span>
                  </li>
                  <li>
                    <strong>Yield Stability</strong>
                    <span>Consistent tenant retention and robust gross rental returns.</span>
                  </li>
                  <li>
                    <strong>Infrastructure Connectivity</strong>
                    <span>Direct arterial transit corridors and community conveniences.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
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
              <p>We frequently source private off-market residences, re-sales and exclusive developer allocations in this neighbourhood.</p>
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
