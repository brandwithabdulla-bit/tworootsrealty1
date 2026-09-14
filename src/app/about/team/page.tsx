import Link from "next/link";

export default function Team() {
  return (
    <main id="main-content">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Personal guidance starts with people</p>
          <h1>Meet your Two Roots.</h1>
          <p className="lead">Complementary experience. A shared commitment to trusted relationships.</p>
        </div>
      </header>
      
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">People behind the perspective</p>
            <h2>A shared vision. Complementary roots.</h2>
          </div>
        </div>
        
        <div className="team-grid">
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Sunand Poyyerikunnath; photograph pending">
              <span>SP</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Sunand Poyyerikunnath</h3>
              <p className="eyebrow">Co-Founder &amp; CEO</p>
              <p>With over 10 years of sales experience, including more than six years in Dubai’s real estate market. He specialises in property investment advisory and building trusted relationships between Dubai and key global markets. Known for his market knowledge, transparent approach and strong international network, Sunand is committed to helping clients make informed and rewarding real estate decisions.</p>
              <ul>
                <li>Market knowledge</li>
                <li>Transparent approach</li>
                <li>Strong international network</li>
              </ul>
            </div>
          </article>
          
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Muhammed Ashmid; photograph pending">
              <span>MA</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Muhammed Ashmid</h3>
              <p className="eyebrow">Co-Founder &amp; Managing Director</p>
              <p>Bringing over eight years of international experience across the UK, Qatar and the UAE, including valuable experience in Dubai’s real estate market. He holds a Master’s degree in International Business from De Montfort University in the UK. His background in real estate, hospitality, customer service and business operations has shaped his strong relationship-focused approach.</p>
              <ul>
                <li>Real estate and hospitality</li>
                <li>Customer service and business operations</li>
                <li>Relationship-focused guidance</li>
              </ul>
            </div>
          </article>
        </div>
        
        <div className="pending-team">
          <h3>Our wider team</h3>
          <p>Additional team profiles will be added once names, roles and approved photographs are supplied.</p>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Let's Find the Right Property for You</h2>
          <p>Whether you are buying a home or building an investment portfolio, our team is ready to guide you.</p>
          <Link className="button" href="/contact?intent=consultation">
            Talk to Our Team<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
