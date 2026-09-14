import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Two Roots Realty',
  description: 'Terms and Conditions for Two Roots Realty.',
};

export default function TermsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
        </div>
      </header>
      
      <section className="section container">
        <div className="editorial-copy">
          <h2>1. Introduction</h2>
          <p>These terms and conditions govern your use of the Two Roots Realty website and services.</p>
          
          <h2>2. Use of Website</h2>
          <p>By accessing this website, you agree to be bound by these terms and conditions. The content of this website is for your general information and use only. It is subject to change without notice.</p>
          
          <h2>3. Intellectual Property</h2>
          <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited.</p>
          
          <h2>4. Disclaimer</h2>
          <p>The information provided on this website is for general informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind.</p>
          
          <p className="muted" style={{ marginTop: '3rem' }}>Last updated: September 2026</p>
        </div>
      </section>
    </>
  );
}
