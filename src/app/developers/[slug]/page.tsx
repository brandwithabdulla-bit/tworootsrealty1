import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DEVELOPERS, DEMO_PROJECTS, DEMO_PROPERTIES } from "@/data/mockData";

export default async function DeveloperPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const developer = DEVELOPERS.find(d => d.slug === resolvedParams.slug);
  
  if (!developer) return notFound();

  const developerProjects = DEMO_PROJECTS.filter(p => p.developer === developer.name);
  const developerProperties = DEMO_PROPERTIES.filter(p => p.developer === developer.name);

  // Extract unique locations for the "Key locations" section
  const locations = Array.from(new Set([
    ...developerProjects.map(p => p.location),
    ...developerProperties.map(p => p.location)
  ])).filter(Boolean);

  return (
    <main id="main-content">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Developer directory</p>
          <h1>{developer.name}</h1>
          <p className="lead">Explore the illustrative {developer.name} collection, with connected projects and communities to help shape your shortlist.</p>
        </div>
      </header>

      <section className="container section">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span> / <Link href="/developers">Developers</Link></span>
          <span> / {developer.name}</span>
        </nav>
        <div className="split">
          <div className="developer-mark">
            {developer.name}
            <small>OFFICIAL LOGO TO BE ADDED</small>
          </div>
          <div>
            <h2>A closer look at {developer.name}.</h2>
            <p>Approved developer background, credentials and project information will be added here. In the meantime, explore the example portfolio to see how the collection connects.</p>
            <p className="demo-note">No verified partnership claim is made.</p>
          </div>
        </div>
      </section>

      {developerProjects.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <div><h2>Featured projects</h2></div>
          </div>
          <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>
          <div className="property-grid">
            {developerProjects.map((project) => (
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

      {developerProperties.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <div><h2>Property portfolio</h2></div>
          </div>
          <div className="property-grid">
            {developerProperties.map((property) => (
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
                    <span>{property.bedrooms === 0 ? 'Studio' : property.bedrooms + ' beds'}</span>
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

      <section className="section sand">
        <div className="container split">
          <div>
            <h2>Key locations</h2>
            <div className="tag-links">
              {locations.length > 0 ? locations.map(loc => {
                const areaSlug = loc.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={loc} href={`/areas/${areaSlug}`}>{loc} ↗</Link>
                );
              }) : <p>Locations pending</p>}
            </div>
          </div>
          <div>
            <h2>Keep the full picture in view.</h2>
            <p>Compare project documentation, payment obligations, delivery history and the local context. Developer familiarity is one part of a considered property decision.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Explore {developer.name} with perspective.</h2>
          <p>Whether you are buying a home or building an investment portfolio, our team is ready to guide you.</p>
          <Link className="button" href={`/contact?context=${developer.name}`}>Discuss your shortlist<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return DEVELOPERS.map((dev) => ({
    slug: dev.slug,
  }));
}
