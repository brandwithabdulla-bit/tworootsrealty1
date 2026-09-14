import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AREAS, DEMO_PROJECTS, DEMO_PROPERTIES } from "@/data/mockData";

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const area = AREAS.find(a => a.slug === resolvedParams.slug);
  
  if (!area) return notFound();

  const areaProjects = DEMO_PROJECTS.filter(p => p.location === area.name);
  const areaProperties = DEMO_PROPERTIES.filter(p => p.location === area.name);

  // Extract unique developers for the "Key developers" section
  const developers = Array.from(new Set([
    ...areaProjects.map(p => p.developer),
    ...areaProperties.map(p => p.developer)
  ])).filter(Boolean);

  // Extract unique property types
  const propertyTypes = Array.from(new Set([
    ...areaProjects.map(p => p.propertyType),
    ...areaProperties.map(p => p.propertyType)
  ])).filter(Boolean);

  return (
    <main id="main-content">
      <header className="page-hero with-image">
        <div className="container">
          <p className="eyebrow">{area.category} location · Demo guide</p>
          <h1>{area.name}</h1>
          <p className="lead">Find a setting for the way you want to live.</p>
        </div>
        <div className="photo">
          <Image src={area.image} alt={`Illustrative architectural photography of ${area.name}`} fill sizes="100vw" priority />
        </div>
      </header>

      <section className="section container split">
        <div>
          <h2>A sense of place.</h2>
          <p>Discover {area.name} through the places, homes and everyday priorities that matter to you. This demonstration guide connects representative property types with a starting point for a personal conversation.</p>
        </div>
        <div>
          <h3>Everyday life, considered.</h3>
          <ul>
            <li>Consider your everyday journey</li>
            <li>Compare neighbourhood amenities</li>
            <li>Visit at different times of day</li>
          </ul>
          <p>Property types to explore: {propertyTypes.join(', ')}.</p>
          <p className="demo-note">This is an illustrative community guide. Current amenities and transport information need verification.</p>
        </div>
      </section>

      {areaProjects.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <div><h2>Featured projects</h2></div>
          </div>
          <div className="property-grid">
            {areaProjects.map((project) => (
              <article key={project.id} className="property-card">
                <Link className="card-image" aria-label={`View ${project.title}`} href={`/projects/${project.slug}`}>
                  <div className="photo">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <span className="badge">{project.status}</span>
                  <span className="image-note">DEMO</span>
                </Link>
                <div className="card-copy">
                  <div className="card-meta">{project.propertyType} <span>{project.developer}</span></div>
                  <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                  <p className="muted">{project.location}</p>
                  <p className="price">{project.priceLabel}</p>
                  <div className="card-facts">
                    <span>{project.bedrooms === 0 ? 'Studio' : project.bedrooms + ' beds'}</span>
                    <span>{project.bathrooms} baths</span>
                    <span>{project.area} sq ft</span>
                  </div>
                  <Link className="text-link" href={`/projects/${project.slug}`}>View Details <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section navy">
        <div className="container split">
          <div>
            <h2>The local investment perspective.</h2>
            <p>Look at ongoing ownership costs, competing supply, accessibility and the needs of potential future occupiers. A location label alone does not establish value.</p>
          </div>
          <div>
            <h3>Developers in this demo collection</h3>
            <div className="tag-links">
              {developers.length > 0 ? developers.map(dev => {
                const devSlug = dev.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={dev} href={`/developers/${devSlug}`}>{dev} ↗</Link>
                );
              }) : <p>Developers pending</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="map-section map-grid">
          <p className="eyebrow">Location context</p>
          <p className="map-label">{area.name}</p>
          <p>Community-level reference only. The exact address and property pin have not been supplied.</p>
          <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(area.name + ', UAE')}`} target="_blank" rel="noopener noreferrer">
            Explore community on Google Maps ↗
          </a>
        </div>
      </section>

      {areaProperties.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <div><h2>Properties in {area.name}</h2></div>
            <Link className="text-link" href={`/properties?location=${encodeURIComponent(area.name)}`}>
              View area collection <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>
          <div className="property-grid">
            {areaProperties.map((property) => (
              <article key={property.id} className="property-card">
                <Link className="card-image" aria-label={`View ${property.title}`} href={`/properties/${property.slug}`}>
                  <div className="photo">
                    <Image src={property.image} alt={property.title} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <span className="badge">{property.status}</span>
                  <span className="image-note">DEMO</span>
                </Link>
                <div className="card-copy">
                  <div className="card-meta">{property.propertyType} <span>{property.developer}</span></div>
                  <h3><Link href={`/properties/${property.slug}`}>{property.title}</Link></h3>
                  <p className="muted">{property.location}</p>
                  <p className="price">{property.priceLabel}</p>
                  <div className="card-facts">
                    <span>{property.bedrooms === 0 ? 'Studio / open plan' : property.bedrooms + ' beds'}</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.area} sq ft</span>
                  </div>
                  <Link className="text-link" href={`/properties/${property.slug}`}>View Details <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Make a connection with {area.name}.</h2>
          <p>Whether you are buying a home or building an investment portfolio, our team is ready to guide you.</p>
          <Link className="button" href={`/properties?location=${encodeURIComponent(area.name)}`}>Explore Properties in {area.name}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return AREAS.map((area) => ({
    slug: area.slug,
  }));
}
