import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Two Roots Realty',
  description: 'Whether you are looking to acquire a new home or seeking strategic investment advice, our specialized team is ready to assist you.',
};

export default function ContactPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Private Advisory</p>
          <h1>Connect With Us.</h1>
          <p className="lead">
            Whether you are looking to acquire a new home or seeking strategic investment advice, our specialized team is ready to assist you.
          </p>
        </div>
      </header>

      <section className="section container">
        <div className="contact-layout">
          <div>
            <h2>Register Your Interest</h2>
            <p>Complete the form below and an advisor will contact you shortly.</p>
            <form className="enquiry-form" style={{ marginTop: '2rem' }}>
              <div className="form-grid">
                <label>
                  First Name*
                  <input type="text" required />
                </label>
                <label>
                  Last Name*
                  <input type="text" required />
                </label>
              </div>
              <div className="form-grid">
                <label>
                  Email Address*
                  <input type="email" required />
                </label>
                <label>
                  Phone Number*
                  <input type="tel" required />
                </label>
              </div>
              <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                <label>
                  Area of Interest
                  <select defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option value="buy">Buying a Property</option>
                    <option value="sell">Selling a Property</option>
                    <option value="invest">Investment Advisory</option>
                    <option value="other">General Enquiry</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea rows={4} placeholder="How can we assist you?"></textarea>
                </label>
              </div>
              <button className="button" type="button" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Enquiry
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Global Reach.<br />Local Expertise.</h2>
            <p>We operate discreetly and professionally to serve high-net-worth individuals, family offices, and institutional investors worldwide.</p>
            
            <div style={{ marginTop: '3rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span className="eyebrow">Headquarters</span>
                <p>Opus Tower, Business Bay<br />Dubai, United Arab Emirates</p>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <span className="eyebrow">Direct Enquiries</span>
                <p>
                  <a href="tel:+971500000000" className="text-link">+971 50 000 0000</a><br />
                  <a href="mailto:advisory@tworoots.ae" className="text-link">advisory@tworoots.ae</a>
                </p>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <span className="eyebrow">Hours of Operation</span>
                <p>Monday — Friday<br />9:00 AM — 6:00 PM (GST)</p>
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>
                <p className="muted" style={{ marginBottom: '1rem' }}>For immediate assistance outside of operating hours:</p>
                <a href="https://wa.me/971500000000" target="_blank" rel="noreferrer" className="button secondary">
                  <span aria-hidden="true">◌</span> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
