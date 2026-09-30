import Link from 'next/link';
import Image from 'next/image';
import HeroSlideshow from './hero-slideshow';
import { defaultSlides } from '@/data/slides';
import {images} from '@/data/images';

export function ArrowUpRight({className='', size=14}){
  return (
    <svg
      className={`arrow-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

export function Button({href,children,secondary=false,...props}){return <Link className={`button ${secondary?'secondary':''}`} href={href} {...props}><span>{children}</span><ArrowUpRight size={14}/></Link>}
export function Eyebrow({children}){return <p className="eyebrow">{children}</p>}
export function SectionHeader({eyebrow,title,href,label='Explore more'}){return <div className="section-heading"><div>{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2></div>{href&&<Link className="text-link" href={href}><span>{label}</span> <ArrowUpRight size={13}/></Link>}</div>}
export function Photo({src,alt,priority=false,className='',sizes='(max-width: 768px) 100vw, 50vw'}){return <div className={`photo ${className}`}><Image src={src} alt={alt} fill sizes={sizes} priority={priority}/></div>}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'center center',
  slides,
  children
}){
  let heroSlides = slides;
  if (!heroSlides && image) {
    const remaining = defaultSlides.filter(s => s.src !== image);
    heroSlides = [
      { src: image, alt: imageAlt || 'Dubai luxury property', position: imagePosition },
      ...remaining
    ];
  }

  return (
    <header className="page-hero">
      <HeroSlideshow slides={heroSlides} />
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="container page-hero-content">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {description && <p className="lead">{description}</p>}
        {children}
      </div>
    </header>
  );
}
export function Breadcrumbs({items}){return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((x,i)=><span key={i}> / {x.href?<Link href={x.href}>{x.label}</Link>:x.label}</span>)}</nav>}
export function DemoNote({children}){if(!children)return null;return <p className="demo-note">{children}</p>}
import CTASection from './CTASection';
export { CTASection };
export function PropertyCard({ item = {}, kind = 'properties' }) {
  if (!item || !item.title) return null;
  const imageSrc = (Array.isArray(item.images) && item.images.length > 0 && item.images[0])
    ? item.images[0]
    : (typeof item.image === 'string' ? item.image : '/images/dubai.jpg');
  const statusLabel = item.status || (kind === 'projects' ? 'Off-Plan' : 'Ready');
  const priceDisplay = item.priceLabel || (item.price ? `AED ${item.price.toLocaleString('en-AE')}` : 'Price on Application');
  const beds = item.bedrooms === 0 ? 'Studio' : (item.bedrooms ? `${item.bedrooms} beds` : 'N/A');
  const baths = item.bathrooms ? `${item.bathrooms} baths` : 'N/A';
  const areaDisplay = item.area ? `${item.area.toLocaleString()} sq ft` : 'On Request';

  return (
    <article className="property-card">
      <Photo className="card-backdrop" src={imageSrc} alt={`${item.title} photography`} sizes="(max-width: 700px) 95vw, (max-width: 1100px) 50vw, 33vw"/>
      <div className="card-top">
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          <span className="badge">{statusLabel}</span>
          {item.lifestyle && <span className="badge lifestyle-badge">{item.lifestyle}</span>}
        </div>
        <Link className="card-open" href={`/${kind}/${item.slug}`} aria-label={`View ${item.title}`}>
          <ArrowUpRight size={16}/>
        </Link>
      </div>
      <div className="card-copy">
        <div className="card-meta">
          <span>{item.propertyType || 'Residential'}</span>
          <span>{item.lifestyle ? `${item.lifestyle} · Selected` : 'Collection'}</span>
        </div>
        <h3>
          <Link href={`/${kind}/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="card-location">
          {item.location} {item.developer ? <span>· {item.developer}</span> : null}
        </p>
        <div className="card-facts">
          <span>{beds}</span>
          <span>{baths}</span>
          <span>{areaDisplay}</span>
        </div>
        <div className="card-bottom">
          <p className="price">{priceDisplay}</p>
          <Link href={`/${kind}/${item.slug}`} className="card-details" aria-label={`Explore ${item.title}`}>
            <span>Explore</span> <ArrowUpRight size={13}/>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PropertyGrid({ items = [], kind = 'properties', carousel = false }) {
  const validItems = (items || []).filter(Boolean);
  return (
    <div className={`property-grid ${carousel ? 'mobile-carousel' : ''}`}>
      {validItems.map((x, idx) => (
        <PropertyCard key={x.id || x._id || idx} item={x} kind={kind} />
      ))}
    </div>
  );
}
export function DeveloperCard({item,projectCount=0}){return <article className="developer-card"><Photo src={item.image||images.architecture} alt={`${item.name} architecture and developments`}/><div className="developer-card-content"><div className="developer-card-heading"><h3>{item.name}</h3><span className="developer-monogram" aria-hidden="true">{item.name.slice(0,1)}</span></div><p>{item.description}</p><div className="developer-card-bottom"><span>{projectCount} {projectCount === 1 ? 'project' : 'projects'}</span><Link className="card-open" href={`/developers/${item.slug}`} aria-label={`Explore ${item.name}`}><ArrowUpRight size={16}/></Link></div></div></article>}
export function LocationCard({item}){
  return (
    <Link className="property-card location-card" href={`/areas/${item.slug}`}>
      <Photo className="card-backdrop" src={item.image} alt={`Representative community imagery for ${item.name}`} sizes="(max-width: 700px) 95vw, (max-width: 1100px) 50vw, 33vw"/>
      <div className="card-top">
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          <span className="badge">{item.category}</span>
        </div>
        <span className="card-open" aria-label={`Explore ${item.name}`}><ArrowUpRight size={16}/></span>
      </div>
      <div className="card-copy">
        <div className="card-meta">
          <span>Community</span>
          <span>{item.category} · Dubai</span>
        </div>
        <h3>{item.name}</h3>
        <p className="card-location">Explore prime communities &amp; residences</p>
        <div className="card-bottom">
          <p className="price" style={{fontSize:'0.88rem',opacity:0.85}}>Prime Location</p>
          <span className="card-details" aria-label={`Explore ${item.name}`}>
            <span>Explore area</span> <ArrowUpRight size={13}/>
          </span>
        </div>
      </div>
    </Link>
  );
}
export function BlogCard({item}){return <article className="blog-card"><Link href={`/insights/${item.slug}`}><Photo src={item.image} alt={item.title}/></Link><p className="eyebrow">{item.category}</p><h3><Link href={`/insights/${item.slug}`}>{item.title}</Link></h3><p className="muted">1 September 2026 · {item.readingTime}</p><p>{item.summary}</p><Link className="text-link" href={`/insights/${item.slug}`}><span>Read the story</span> <ArrowUpRight size={13}/></Link></article>}

