import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Two Roots Realty",
  description: "Rooted in friendship. Built on trust. Discover the story behind Two Roots Realty.",
};

export default function About() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Our Story</p>
          <h1>Two Roots. One Vision.</h1>
          <p className="lead">From two roots comes one vision connecting people, opportunities and markets.</p>
        </div>
      </header>

      <section className="section container">
        <div className="split" style={{ alignItems: 'start' }}>
          <div className="editorial-copy">
            <h2>Rooted in friendship.<br/>Built on trust.</h2>
            <p>Two Roots Realty began with a friendship that has lasted for more than a decade. Its founders, Sunand and Ashmid, grew up in the same hometown in India before their individual journeys took them across different countries and industries. Years later, they found themselves together again in Dubai, working in the same real estate company.</p>
            <p>What started as a reunion became a shared vision. Their different experiences and strengths naturally complemented each other — one bringing a deep understanding of service and international relationships, the other bringing years of experience in sales and Dubai real estate.</p>
            <p>Together, they built Two Roots Realty on something they both believe in: understanding people, building trust, and creating opportunities that go beyond a single transaction.</p>
          </div>
          <div className="photo" style={{ aspectRatio: '4/5', width: '100%', position: 'relative', marginTop: '2rem' }}>
            <Image 
              src="/images/architecture.jpg" 
              alt="Dubai modern architecture, illustrative" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw" 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      <section className="section navy">
        <div className="container">
          <div className="section-heading" style={{ borderBottom: '1px solid rgba(244, 245, 240, 0.2)', paddingBottom: '2rem' }}>
            <div>
              <p className="eyebrow">Our Core Principles</p>
              <h2>The values that shape our perspective.</h2>
            </div>
          </div>
          <div className="values-list">
            <div className="value">
              <span>01</span>
              <h3>Trust</h3>
              <p className="muted">Building relationships through honesty, transparency and dependable guidance.</p>
            </div>
            <div className="value">
              <span>02</span>
              <h3>Connection</h3>
              <p className="muted">Bringing people, property, business and opportunities together.</p>
            </div>
            <div className="value">
              <span>03</span>
              <h3>Growth</h3>
              <p className="muted">Creating long-term value for clients, businesses and investments.</p>
            </div>
            <div className="value">
              <span>04</span>
              <h3>Integrity</h3>
              <p className="muted">Making decisions with responsibility, clarity and respect.</p>
            </div>
            <div className="value">
              <span>05</span>
              <h3>Partnership</h3>
              <p className="muted">Supporting clients beyond a transaction through lasting relationships.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The Leadership Team</p>
            <h2>Guided by experience.</h2>
          </div>
        </div>
        <div className="team-grid">
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Sunand Poyyerikunnath">
              <span>SP</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Sunand Poyyerikunnath</h3>
              <p className="eyebrow">Co-Founder & CEO</p>
              <p>With over 10 years of sales experience, including more than six years in Dubai’s real estate market. He specialises in property investment advisory and building trusted relationships between Dubai and key global markets. Known for his market knowledge, transparent approach and strong international network, Sunand is committed to helping clients make informed and rewarding real estate decisions.</p>
            </div>
          </article>
          <article className="team-card">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Mohammed Ashmid">
              <span>MA</span><small>PORTRAIT TO BE ADDED</small>
            </div>
            <div>
              <h3>Muhammed Ashmid</h3>
              <p className="eyebrow">Co-Founder & Managing Director</p>
              <p>Bringing over eight years of international experience across the UK, Qatar and the UAE, including valuable experience in Dubai’s real estate market. He holds a Master’s degree in International Business from De Montfort University in the UK. His background in real estate, hospitality, customer service and business operations has shaped his strong relationship-focused approach.</p>
            </div>
          </article>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Let's discuss your real estate journey.</h2>
          <Link className="button" href="/contact?intent=consultation">
            Speak to an Advisor<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
