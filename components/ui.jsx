import Link from 'next/link';
import Image from 'next/image';
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
export function PageHero({eyebrow,title,description,image}){return <header className={`page-hero ${image?'with-image':''}`}><div className="container">{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}<h1>{title}</h1>{description&&<p className="lead">{description}</p>}</div>{image&&<Photo src={image} alt="Illustrative architectural photography" priority sizes="100vw"/>}</header>}
export function Breadcrumbs({items}){return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((x,i)=><span key={i}> / {x.href?<Link href={x.href}>{x.label}</Link>:x.label}</span>)}</nav>}
export function DemoNote({children='Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.'}){return <p className="demo-note">{children}</p>}
export function CTASection({title="Let's Find the Right Property for You",text='Whether you are buying a home or building an investment portfolio, our team is ready to guide you.',label='Book a Consultation',href='/contact?intent=consultation'}){return <section className="cta"><div className="container"><Eyebrow>A conversation is a good beginning</Eyebrow><h2>{title}</h2><p>{text}</p><Button href={href}>{label}</Button></div></section>}
export function PropertyCard({item,kind='properties'}){return <article className="property-card"><Photo className="card-backdrop" src={item.images[0]} alt={`${item.title} photography`} sizes="(max-width: 700px) 95vw, (max-width: 1100px) 50vw, 33vw"/><div className="card-top"><div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}><span className="badge">{item.status}</span>{item.lifestyle&&<span className="badge lifestyle-badge">{item.lifestyle}</span>}</div><Link className="card-open" href={`/${kind}/${item.slug}`} aria-label={`View ${item.title}`}><ArrowUpRight size={16}/></Link></div><div className="card-copy"><div className="card-meta"><span>{item.propertyType}</span><span>{item.lifestyle?`${item.lifestyle} · Selected`:'Demo collection'}</span></div><h3><Link href={`/${kind}/${item.slug}`}>{item.title}</Link></h3><p className="card-location">{item.location} <span>· {item.developer}</span></p><div className="card-facts"><span>{item.bedrooms===0?'Studio':`${item.bedrooms} beds`}</span><span>{item.bathrooms} baths</span><span>{item.area.toLocaleString()} sq ft</span></div><div className="card-bottom"><p className="price">{item.priceLabel}</p><Link href={`/${kind}/${item.slug}`} className="card-details" aria-label={`Explore ${item.title}`}><span>Explore</span> <ArrowUpRight size={13}/></Link></div></div></article>}
export function PropertyGrid({items,kind='properties',carousel=false}){return <div className={`property-grid ${carousel?'mobile-carousel':''}`}>{items.map(x=><PropertyCard key={x.id} item={x} kind={kind}/>)}</div>}
export function DeveloperCard({item,projectCount=0}){return <article className="developer-card"><Photo src={item.image||images.architecture} alt={`Illustrative architecture for ${item.name}; not an official developer asset`}/><span className="developer-image-label">Illustrative architecture</span><div className="developer-card-content"><div className="developer-card-heading"><h3>{item.name}</h3><span className="developer-monogram" aria-hidden="true">{item.name.slice(0,1)}</span></div><p className="developer-placeholder">Official logo to be supplied</p><p>{item.description}</p><div className="developer-card-bottom"><span>{projectCount} demo projects</span><Link className="card-open" href={`/developers/${item.slug}`} aria-label={`Explore ${item.name}`}><ArrowUpRight size={16}/></Link></div></div></article>}
export function LocationCard({item}){return <Link className="location-card" href={`/areas/${item.slug}`}><Photo src={item.image} alt={`Representative community imagery for ${item.name}`}/><div><span className="eyebrow">{item.category}</span><h3>{item.name}</h3><span>Explore the area <ArrowUpRight size={13}/></span></div></Link>}
export function BlogCard({item}){return <article className="blog-card"><Link href={`/insights/${item.slug}`}><Photo src={item.image} alt="Illustrative architecture and living spaces"/></Link><p className="eyebrow">{item.category} · Demo article</p><h3><Link href={`/insights/${item.slug}`}>{item.title}</Link></h3><p className="muted">1 September 2026 · {item.readingTime}</p><p>{item.summary}</p><Link className="text-link" href={`/insights/${item.slug}`}><span>Read the story</span> <ArrowUpRight size={13}/></Link></article>}

