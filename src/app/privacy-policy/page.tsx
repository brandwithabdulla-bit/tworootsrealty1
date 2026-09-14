import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Two Roots Realty',
  description: 'Privacy Policy for Two Roots Realty.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
        </div>
      </header>
      
      <section className="section container">
        <div className="editorial-copy">
          <h2>Introduction</h2>
          <p>This privacy policy explains how Two Roots Realty collects, uses, and protects your personal data.</p>
          
          <h2>Data Collection</h2>
          <p>We collect information you provide directly to us when you use our services, such as when you fill out a form, contact us, or subscribe to our newsletter.</p>
          
          <h2>Use of Data</h2>
          <p>We use the data we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience.</p>
          
          <h2>Data Protection</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration.</p>
          
          <p className="muted" style={{ marginTop: '3rem' }}>Last updated: September 2026</p>
        </div>
      </section>
    </>
  );
}
