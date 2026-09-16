import Link from 'next/link';
import {Breadcrumbs,CTASection,DemoNote,PropertyGrid,SectionHeader,Button,ArrowUpRight} from './ui';
import {ImageGallery,EnquiryForm} from './interactive';
import ScrollToLink from './ScrollToLink';

export function MapSection({item}){
  return (
    <div className="map-section map-grid">
      <p className="eyebrow">Location context</p>
      <p className="map-label">{item.location||item.name}</p>
      <p>Community-level reference only. The exact address and property pin have not been supplied.</p>
      <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((item.location||item.name)+', UAE')}`} target="_blank" rel="noopener noreferrer">
        <span>Explore community on Google Maps</span> <ArrowUpRight size={13}/>
      </a>
    </div>
  );
}

export function ListingDetail({item,kind,similar}){
  const project = kind === 'projects';
  
  const factsList = [
    ['Bedrooms', item.bedrooms || 'Studio / open plan'],
    ['Bathrooms', item.bathrooms],
    ['Area', `${(item.builtUpArea || item.area).toLocaleString()} sq ft`],
    ...(item.plotArea ? [['Plot Area', `${item.plotArea.toLocaleString()} sq ft`]] : []),
    ...(item.lifestyle ? [['Setting', item.lifestyle]] : []),
    ['Handover', item.handover]
  ];

  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{label: project ? 'Projects' : 'Properties', href: `/${kind}`}, {label: item.title}]}/>
        
        <ImageGallery item={item}/>
        
        <div className="detail-title">
          <div>
            <p className="eyebrow">
              {item.status} · {item.propertyType} {item.lifestyle ? `· ${item.lifestyle}` : ''}
            </p>
            <h1>{item.title}</h1>
            <p>
              <Link className="text-link" href={`/areas/${item.locationSlug}`}>{item.location}</Link> · <Link className="text-link" href={`/developers/${item.developerSlug}`}>{item.developer}</Link>
            </p>
          </div>
          <p className="price">{item.priceLabel}</p>
        </div>

        <DemoNote/>

        <div className="detail-layout">
          <div className="detail-content">
            <dl className="facts">
              {factsList.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            {/* Key Project Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <section className="project-highlights-section">
                <h2>Project Highlights & Connectivity</h2>
                <ul className="project-highlights-list">
                  {item.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="highlight-icon">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Unit Breakdown & Configurations */}
            {item.unitBreakdown && item.unitBreakdown.length > 0 && (
              <section className="unit-breakdown-section">
                <h2>Residences & Configurations</h2>
                <div className="unit-breakdown-table">
                  {item.unitBreakdown.map((u, i) => (
                    <div key={i} className="unit-row">
                      <div className="unit-info">
                        <strong>{u.type}</strong>
                        <div className="unit-subspecs">
                          {u.plot && <span>Plot: {u.plot}</span>}
                          {u.bua && <span>BUA: {u.bua}</span>}
                          {u.size && <span>Size: {u.size}</span>}
                        </div>
                      </div>
                      <div className="unit-price-tag">{u.price}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2>A considered place to begin.</h2>
              <p>{item.description}</p>
            </section>

            <section>
              <h2>Amenities</h2>
              <ul className="amenities">
                {item.amenities.map(x => <li key={x}>{x}</li>)}
              </ul>
              <DemoNote>Amenities are representative and sourced directly from developer project specifications.</DemoNote>
            </section>

            <section>
              <h2>Payment plan</h2>
              {item.paymentPlan && item.paymentPlan.length > 0 ? (
                <>
                  <div className="payment-plan">
                    {item.paymentPlan.map((x, idx) => (
                      <div key={idx}>
                        <strong>{x.percent}%</strong>
                        <span>{x.label}</span>
                        {x.date && <small style={{ display: 'block', opacity: 0.7, fontSize: '0.75rem', marginTop: '4px' }}>{x.date}</small>}
                      </div>
                    ))}
                  </div>
                  <DemoNote>Payment milestones are based on official developer payment plans.</DemoNote>
                </>
              ) : (
                <p>{item.purpose === 'Rent' ? 'Rental terms and payment frequency are to be confirmed.' : 'Payment terms will be confirmed for a specific property and transaction.'}</p>
              )}
            </section>

            <section>
              <h2>Investment perspective</h2>
              <p>Consider the purchase price alongside ongoing costs, financing, your intended holding period and the depth of future resale demand. Ask for verified evidence before relying on a projected income or valuation.</p>
              <p>Capital values and rental income can fall as well as rise. This listing illustrates projected market configurations.</p>
              <Link href="/investment" className="text-link">
                <span>Explore our investment approach</span> <ArrowUpRight size={13}/>
              </Link>
            </section>

            <section>
              <h2>Explore the location</h2>
              <MapSection item={item}/>
            </section>

            <section>
              <h2>A closer look</h2>
              {item.brochure ? (
                <div className="document-row real-brochure-row">
                  <div>
                    <h3>Official Project Documentation</h3>
                    <p>Access the official developer brochure, floor plans and verified masterplan specifications for {item.title}.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <a href={item.brochure} target="_blank" rel="noopener noreferrer" className="button download-action-btn" download>
                      <span>Download Brochure (PDF)</span>
                      <ArrowUpRight size={14}/>
                    </a>
                    {item.factsheet && (
                      <a href={item.factsheet} target="_blank" rel="noopener noreferrer" className="button secondary download-action-btn" download>
                        <span>Download Factsheet (PDF)</span>
                        <ArrowUpRight size={14}/>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="document-row">
                    <h3>Floor plans</h3>
                    <p>Approved floor plans have not been supplied. No illustrative measurements should be used for a purchase decision.</p>
                    <Button href={`/contact?context=${encodeURIComponent(item.title+' — floor plans')}`} secondary>Request floor plan information</Button>
                  </div>
                  <div className="document-row">
                    <h3>Project brochure</h3>
                    <p>Brochure to be added. Videos and presentations can be attached here when approved assets are available.</p>
                    <Button href={`/contact?context=${encodeURIComponent(item.title+' — brochure')}`} secondary>Ask about the brochure</Button>
                  </div>
                </>
              )}
            </section>
          </div>

          <aside className="sticky-enquiry" id="enquiry">
            <p className="eyebrow">Your next step</p>
            <h2>{project ? 'Request Project Details' : 'Request Property Details'}</h2>
            <EnquiryForm context={item.title} submitLabel={project ? 'Request Project Details' : 'Request Property Details'}/>
          </aside>
        </div>
      </div>

      <section className="section container">
        <SectionHeader eyebrow="Keep exploring" title={project ? 'More projects to consider.' : 'A few more possibilities.'}/>
        <PropertyGrid items={similar} kind={kind} carousel/>
      </section>

      <div className="mobile-enquire">
        <ScrollToLink className="button" targetId="enquiry">
          <span>Enquire Now</span> <ArrowUpRight size={14}/>
        </ScrollToLink>
      </div>
    </>
  );
}
