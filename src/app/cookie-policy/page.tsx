import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Two Roots Realty',
  description: 'Cookie Policy for Two Roots Realty.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1>Cookie Policy</h1>
        </div>
      </header>
      
      <section className="section container">
        <div className="editorial-copy">
          <h2>What are cookies?</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
          
          <h2>How we use cookies</h2>
          <p>We use cookies to understand how you use our site, personalize content, and improve your experience. This includes tracking website analytics and managing your preferences.</p>
          
          <h2>Managing cookies</h2>
          <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
          
          <p className="muted" style={{ marginTop: '3rem' }}>Last updated: September 2026</p>
        </div>
      </section>
    </>
  );
}
