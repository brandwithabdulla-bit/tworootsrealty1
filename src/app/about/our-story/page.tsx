import Link from "next/link";
import Image from "next/image";

export default function OurStory() {
  return (
    <main id="main-content">
      <header className="page-hero with-image">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>Two Roots.<br/><em>One Vision.</em></h1>
          <p className="lead">Some connections become the foundation for something bigger.</p>
        </div>
        <div className="photo">
          <Image 
            src="/images/architecture.jpg" 
            alt="Illustrative architectural photography" 
            fill 
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </header>
      
      <section className="section container">
        <ol className="story-timeline">
          <li>
            <span>01</span>
            <div>
              <h2>The same hometown</h2>
              <p>Sunand and Ashmid grew up in the same hometown in India. A friendship began that would last more than a decade.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h2>Different journeys</h2>
              <p>Their individual paths took them across different countries and industries, building complementary perspectives.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h2>Together again in Dubai</h2>
              <p>Years later, they found themselves together again in Dubai, working in the same real estate company.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h2>A shared understanding</h2>
              <p>Their experiences brought a common belief into focus: strong relationships and transparent guidance belong at the heart of property decisions.</p>
            </div>
          </li>
          <li>
            <span>05</span>
            <div>
              <h2>Two Roots Realty</h2>
              <p>Established in August 2026, Two Roots Realty connects people, property, investment, business and opportunities. Two roots. One vision.</p>
            </div>
          </li>
        </ol>
      </section>
      
      <section className="section navy">
        <div className="container">
          <p className="eyebrow">The idea that connects it all</p>
          <h2>People → Connection → Opportunity → Growth</h2>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <p className="eyebrow">A conversation is a good beginning</p>
          <h2>Your next chapter begins with a connection.</h2>
          <p>Whether you are buying a home or building an investment portfolio, our team is ready to guide you.</p>
          <Link className="button" href="/contact?intent=consultation">
            Talk to Our Team<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
