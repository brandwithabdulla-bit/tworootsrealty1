"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HERO_IMAGES = [
  { src: '/images/dubai.jpg', alt: 'Dubai Marina skyline and waterfront' },
  { src: '/images/architecture.jpg', alt: 'Dubai modern architecture' },
  { src: '/images/waterfront.jpg', alt: 'Dubai waterfront and islands' }
];

export default function Home() {
  const [heroWhatsappOpen, setHeroWhatsappOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      router.push('/projects');
    }, 1500);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="photo">
          {HERO_IMAGES.map((img, index) => (
            <Image 
              key={index}
              src={img.src} 
              alt={img.alt} 
              fill 
              sizes="100vw"
              style={{ 
                objectFit: 'cover', 
                opacity: currentSlide === index ? 1 : 0, 
                transition: 'opacity 1.5s ease-in-out',
                position: 'absolute'
              }}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="hero-shade"></div>
        <div className="container hero-content">
          <p className="eyebrow">Dubai real estate · International perspective</p>
          <h1>Your Trusted Gateway<br/>to Dubai Real Estate</h1>
          <p>Carefully selected properties, transparent advice and personalised guidance — from your first enquiry to final handover.</p>
          <div className="actions">
            <Link className="button" href="/properties">
              Explore Properties<span aria-hidden="true">↗</span>
            </Link>
            <Link className="hero-link" href="/contact">
              Speak to an Advisor ↗
            </Link>
          </div>
          <div className="hero-bottom" style={{ paddingBottom: '160px' }}>
            <a href="#property-search">Discover your next chapter <span aria-hidden="true">↓</span></a>
            <small>Illustrative photography</small>
          </div>
        </div>
      </section>

      <section className="search-wrap container" id="property-search">
        <form className="search-box glass-search" action="/projects" noValidate onSubmit={handleSearch}>
          <div className="search-heading">
            <h2>Find the Right Project</h2>
            <div className="tabs" aria-label="Property purpose">
              <button type="button" aria-pressed="true">Buy</button>
              <button type="button" aria-pressed="false">Rent</button>
              <button type="button" aria-pressed="false">Invest</button>
            </div>
          </div>
          <div className="quick-search">
            <label>
              Location
              <select defaultValue="">
                <option value="">Any location</option>
                <option>Downtown Dubai</option>
                <option>Business Bay</option>
                <option>Dubai Creek Harbour</option>
                <option>Dubai Hills Estate</option>
                <option>Dubai South</option>
                <option>Palm Jebel Ali</option>
                <option>Dubai Islands</option>
                <option>Dubai Marina</option>
                <option>Jumeirah Village Circle</option>
                <option>Meydan</option>
                <option>Al Furjan</option>
                <option>Rashid Yachts & Marina</option>
                <option>Expo City</option>
                <option>Ras Al Khaimah</option>
              </select>
            </label>
            <label>
              Property type
              <select defaultValue="">
                <option value="">Any property type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Townhouse</option>
                <option>Penthouse</option>
                <option>Commercial</option>
                <option>Branded Residence</option>
              </select>
            </label>
            <label>
              Developer
              <select defaultValue="">
                <option value="">Any developer</option>
                <option>Emaar</option>
                <option>Damac</option>
                <option>Sobha</option>
                <option>Ellington</option>
                <option>Dubai Holdings</option>
                <option>Omniyat</option>
                <option>Beyond</option>
                <option>Dubai South</option>
                <option>Leos</option>
                <option>Object1</option>
                <option>Marquis</option>
                <option>Imtiaz</option>
                <option>Samana</option>
                <option>Binghatti</option>
                <option>Azizi</option>
              </select>
            </label>
            <button className="button" type="submit">Search Projects ↗</button>
          </div>
          <button type="button" className="text-link filter-toggle" aria-expanded="false">+ Price, bedrooms & status</button>
        </form>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected opportunities</p>
            <h2>A place for your <em>next chapter.</em></h2>
          </div>
          <Link className="text-link" href="/projects">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>
        
        <div className="property-grid mobile-carousel">
          <article className="property-card">
            <Link className="card-image" aria-label="View Harbour Light Residence" href="/properties/harbour-light-residence">
              <div className="photo">
                <Image src="/images/interior.jpg" alt="Illustrative apartment photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
              <span className="badge">Off-Plan</span>
              <span className="image-note">DEMO</span>
            </Link>
            <div className="card-copy">
              <div className="card-meta">Apartment <span>Emaar</span></div>
              <h3><Link href="/properties/harbour-light-residence">Harbour Light Residence</Link></h3>
              <p className="muted">Dubai Creek Harbour</p>
              <p className="price">AED 2,450,000</p>
              <div className="card-facts">
                <span>2 beds</span>
                <span>3 baths</span>
                <span>1,760 sq ft</span>
              </div>
              <Link className="text-link" href="/properties/harbour-light-residence">
                View Details <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          
          <article className="property-card">
            <Link className="card-image" aria-label="View The Garden House" href="/properties/the-garden-house">
              <div className="photo">
                <Image src="/images/villa.jpg" alt="Illustrative villa photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
              <span className="badge">Ready</span>
              <span className="image-note">DEMO</span>
            </Link>
            <div className="card-copy">
              <div className="card-meta">Villa <span>Damac</span></div>
              <h3><Link href="/properties/the-garden-house">The Garden House</Link></h3>
              <p className="muted">Dubai Hills Estate</p>
              <p className="price">AED 7,800,000</p>
              <div className="card-facts">
                <span>4 beds</span>
                <span>5 baths</span>
                <span>2,740 sq ft</span>
              </div>
              <Link className="text-link" href="/properties/the-garden-house">
                View Details <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          
          <article className="property-card">
            <Link className="card-image" aria-label="View Marina Horizon" href="/properties/marina-horizon">
              <div className="photo">
                <Image src="/images/dubai.jpg" alt="Illustrative penthouse photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
              <span className="badge">Ready</span>
              <span className="image-note">DEMO</span>
            </Link>
            <div className="card-copy">
              <div className="card-meta">Penthouse <span>Sobha</span></div>
              <h3><Link href="/properties/marina-horizon">Marina Horizon</Link></h3>
              <p className="muted">Dubai Marina</p>
              <p className="price">AED 12,500,000</p>
              <div className="card-facts">
                <span>4 beds</span>
                <span>5 baths</span>
                <span>2,740 sq ft</span>
              </div>
              <Link className="text-link" href="/properties/marina-horizon">
                View Details <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section navy">
        <div className="container split">
          <div>
            <p className="eyebrow">The Two Roots approach</p>
            <h2>Property is personal.<br/><em>So is our guidance.</em></h2>
            <p className="lead">We understand these decisions are complex. We provide clarity.</p>
          </div>
          <div className="why-list">
            <div>
              <span>01</span>
              <h3>Strong Dubai market knowledge</h3>
            </div>
            <div>
              <span>02</span>
              <h3>Personalised and transparent advice</h3>
            </div>
            <div>
              <span>03</span>
              <h3>Carefully evaluated opportunities</h3>
            </div>
            <div>
              <span>04</span>
              <h3>Trusted international network</h3>
            </div>
            <div>
              <span>05</span>
              <h3>Complete assistance</h3>
            </div>
            <div>
              <span>06</span>
              <h3>Long-term relationships</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section section">
        <div className="container split">
          <div className="photo">
            <Image src="/images/architecture.jpg" alt="Dubai architecture, illustrative brand photography" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="story-copy">
            <p className="eyebrow">Rooted in friendship. Built on trust.</p>
            <h2>Two roots.<br/><em>One vision.</em></h2>
            <p>One hometown in India. Different journeys across the world. A shared vision in Dubai.</p>
            <p>Our story began with a friendship lasting more than a decade. Today, that connection shapes how we help people find their place, and their next opportunity.</p>
            <Link className="button secondary" href="/about/our-story">
              Discover our story<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Guidance that goes further</p>
            <h2>Your property. Our priority.</h2>
          </div>
          <Link className="text-link" href="/services">
            Our services <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="service-list">
          <Link href="/services#selling">
            <span className="number">01</span>
            <h3>Selling</h3>
            <p>Professional support to market and sell your property at the best possible value.</p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/services#renting">
            <span className="number">02</span>
            <h3>Renting</h3>
            <p>Helping clients find the right rental property based on their lifestyle, location and budget.</p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/services#leasing">
            <span className="number">03</span>
            <h3>Leasing</h3>
            <p>End-to-end assistance for property owners and tenants, from marketing and tenant screening to documentation and handover.</p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/services#property-management">
            <span className="number">04</span>
            <h3>Property Management</h3>
            <p>Complete property care, including tenant management, rent collection, maintenance coordination and regular inspections.</p>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="section projects-home">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Places taking shape</p>
              <h2>Considered projects. Fresh possibilities.</h2>
            </div>
            <Link className="text-link" href="/projects">
              Explore projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="demo-note">Illustrative collection. Prices, specifications, imagery and developer relationships are demo content, not live inventory.</p>
          
          <div className="property-grid mobile-carousel">
            <article className="property-card">
              <Link className="card-image" aria-label="View Aurelia on the Creek" href="/projects/aurelia-on-the-creek">
                <div className="photo">
                  <Image src="/images/villa.jpg" alt="Illustrative apartment photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <span className="badge">Off-Plan</span>
                <span className="image-note">DEMO</span>
              </Link>
              <div className="card-copy">
                <div className="card-meta">Apartment <span>Emaar</span></div>
                <h3><Link href="/projects/aurelia-on-the-creek">Aurelia on the Creek</Link></h3>
                <p className="muted">Dubai Creek Harbour</p>
                <p className="price">From AED 2,450,000</p>
                <div className="card-facts">
                  <span>2 beds</span>
                  <span>3 baths</span>
                  <span>1,760 sq ft</span>
                </div>
                <Link className="text-link" href="/projects/aurelia-on-the-creek">
                  View Details <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
            
            <article className="property-card">
              <Link className="card-image" aria-label="View The Courtyard Collection" href="/projects/the-courtyard-collection">
                <div className="photo">
                  <Image src="/images/villa.jpg" alt="Illustrative villa photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <span className="badge">Ready</span>
                <span className="image-note">DEMO</span>
              </Link>
              <div className="card-copy">
                <div className="card-meta">Villa <span>Damac</span></div>
                <h3><Link href="/projects/the-courtyard-collection">The Courtyard Collection</Link></h3>
                <p className="muted">Dubai Hills Estate</p>
                <p className="price">From AED 7,800,000</p>
                <div className="card-facts">
                  <span>4 beds</span>
                  <span>5 baths</span>
                  <span>2,740 sq ft</span>
                </div>
                <Link className="text-link" href="/projects/the-courtyard-collection">
                  View Details <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
            
            <article className="property-card">
              <Link className="card-image" aria-label="View Horizon Private Residences" href="/projects/horizon-private-residences">
                <div className="photo">
                  <Image src="/images/villa.jpg" alt="Illustrative penthouse photography" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <span className="badge">Ready</span>
                <span className="image-note">DEMO</span>
              </Link>
              <div className="card-copy">
                <div className="card-meta">Penthouse <span>Sobha</span></div>
                <h3><Link href="/projects/horizon-private-residences">Horizon Private Residences</Link></h3>
                <p className="muted">Dubai Marina</p>
                <p className="price">From AED 12,500,000</p>
                <div className="card-facts">
                  <span>4 beds</span>
                  <span>5 baths</span>
                  <span>2,740 sq ft</span>
                </div>
                <Link className="text-link" href="/projects/horizon-private-residences">
                  View Details <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="investment-home section">
        <div className="container split">
          <div>
            <p className="eyebrow">Dubai investment perspective</p>
            <h2>See the opportunity.<br/><em>Understand the bigger picture.</em></h2>
          </div>
          <div>
            <p className="lead">A property should fit your ambitions, your timeline and your appetite for risk.</p>
            <p>From payment plans to long-term ownership, we help you ask the right questions and make a more informed decision.</p>
            <Link className="button secondary" href="/investment">
              Invest with perspective<span aria-hidden="true">↗</span>
            </Link>
            <p className="small">Property values and income can change. Returns are never guaranteed.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your Dubai</p>
            <h2>Different places. A world of possibilities.</h2>
          </div>
          <Link className="text-link" href="/areas">
            Explore all areas <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="locations-grid home-areas">
          <Link className="location-card" href="/areas/downtown-dubai">
            <div className="photo">
              <Image src="/images/dubai.jpg" alt="Representative community imagery for Downtown Dubai" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <span className="eyebrow">Popular</span>
              <h3>Downtown Dubai</h3>
              <span>Explore the area ↗</span>
            </div>
          </Link>
          <Link className="location-card" href="/areas/dubai-marina">
            <div className="photo">
              <Image src="/images/dubai.jpg" alt="Representative community imagery for Dubai Marina" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <span className="eyebrow">Popular</span>
              <h3>Dubai Marina</h3>
              <span>Explore the area ↗</span>
            </div>
          </Link>
          <Link className="location-card" href="/areas/dubai-hills-estate">
            <div className="photo">
              <Image src="/images/dubai.jpg" alt="Representative community imagery for Dubai Hills Estate" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <span className="eyebrow">Popular</span>
              <h3>Dubai Hills Estate</h3>
              <span>Explore the area ↗</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section developer-strip">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore the makers</p>
              <h2>Discover by developer.</h2>
            </div>
            <Link className="text-link" href="/developers">
              All developers <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="developer-names">
            <Link href="/developers/emaar">Emaar</Link>
            <Link href="/developers/damac">Damac</Link>
            <Link href="/developers/sobha">Sobha</Link>
            <Link href="/developers/ellington">Ellington</Link>
            <Link href="/developers/dubai-holdings">Dubai Holdings</Link>
            <Link href="/developers/omniyat">Omniyat</Link>
          </div>
          <p className="demo-note">Text placeholders, not official logos. Developer names are for discovery; no partnership or authorisation is implied.</p>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">People behind the perspective</p>
            <h2>A shared vision. Complementary roots.</h2>
          </div>
          <Link className="text-link" href="/about/team">
            Meet the founders <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="team-grid">
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Sunand Poyyerikunnath; photograph pending">
              <span>SP</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Sunand Poyyerikunnath</h3>
              <p className="eyebrow">Co-Founder & CEO</p>
              <p>Over 10 years of sales experience, including more than six years in Dubai real estate. Specialises in property investment advisory and building trusted relationships between Dubai and key global markets.</p>
            </div>
          </article>
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Muhammed Ashmid; photograph pending">
              <span>MA</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Muhammed Ashmid</h3>
              <p className="eyebrow">Co-Founder & Managing Director</p>
              <p>Over eight years of international experience across the UK, Qatar and UAE, including Dubai real estate. Holds a Master's degree in International Business from De Montfort University, UK.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section sand">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">With you at every step</p>
              <h2>From first conversation to what comes next.</h2>
            </div>
          </div>
          <ol className="journey">
            <li><span>01</span><h3>Consultation</h3></li>
            <li><span>02</span><h3>Property Selection</h3></li>
            <li><span>03</span><h3>Financial Guidance</h3></li>
            <li><span>04</span><h3>Purchase Support</h3></li>
            <li><span>05</span><h3>Handover</h3></li>
            <li><span>06</span><h3>After-Sales</h3></li>
          </ol>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Relationships that matter</p>
            <h2>The trust we build.</h2>
          </div>
          <Link className="text-link" href="/testimonials">
            Client experiences <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="testimonial-grid">
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>Client testimonial will be added here.</p>
            <footer>Awaiting approved client feedback</footer>
          </blockquote>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>Client testimonial will be added here.</p>
            <footer>Awaiting approved client feedback</footer>
          </blockquote>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The Two Roots journal</p>
            <h2>A little more perspective.</h2>
          </div>
          <Link className="text-link" href="/insights">
            All insights <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="blog-grid">
          <article className="blog-card">
            <Link href="/insights/a-better-shortlist-starts-with-better-questions">
              <div className="photo">
                <Image src="/images/dubai.jpg" alt="Illustrative architecture and living spaces" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            </Link>
            <p className="eyebrow">Buying Guide · Demo article</p>
            <h3><Link href="/insights/a-better-shortlist-starts-with-better-questions">A better shortlist starts with better questions</Link></h3>
            <p className="muted">1 September 2026 · 3 min read</p>
            <p>A considered starting point for a conversation about your next property decision.</p>
            <Link className="text-link" href="/insights/a-better-shortlist-starts-with-better-questions">
              Read the story ↗
            </Link>
          </article>
          
          <article className="blog-card">
            <Link href="/insights/look-beyond-the-purchase-price">
              <div className="photo">
                <Image src="/images/dubai.jpg" alt="Illustrative architecture and living spaces" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            </Link>
            <p className="eyebrow">Investment · Demo article</p>
            <h3><Link href="/insights/look-beyond-the-purchase-price">Look beyond the purchase price</Link></h3>
            <p className="muted">1 September 2026 · 3 min read</p>
            <p>A considered starting point for a conversation about your next property decision.</p>
            <Link className="text-link" href="/insights/look-beyond-the-purchase-price">
              Read the story ↗
            </Link>
          </article>
          
          <article className="blog-card">
            <Link href="/insights/finding-a-neighbourhood-that-fits-your-life">
              <div className="photo">
                <Image src="/images/dubai.jpg" alt="Illustrative architecture and living spaces" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            </Link>
            <p className="eyebrow">Communities · Demo article</p>
            <h3><Link href="/insights/finding-a-neighbourhood-that-fits-your-life">Finding a neighbourhood that fits your life</Link></h3>
            <p className="muted">1 September 2026 · 3 min read</p>
            <p>A considered starting point for a conversation about your next property decision.</p>
            <Link className="text-link" href="/insights/finding-a-neighbourhood-that-fits-your-life">
              Read the story ↗
            </Link>
          </article>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">Let's find your perspective</p>
          <h2>Start a conversation.</h2>
          <p>Whether you know exactly what you're looking for, or just want to explore the possibilities—we're ready when you are.</p>
          <Link className="button " href="/contact">
            Speak to an Advisor <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {isSearching && (
        <div className="search-overlay">
          <p>Looking for best projects...</p>
          <div className="loading-line-container">
            <div className="loading-line"></div>
          </div>
        </div>
      )}
    </main>
  );
}
