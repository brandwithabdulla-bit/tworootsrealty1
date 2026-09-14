import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Testimonials | Two Roots Realty',
  description: 'See what our clients say about their experience with Two Roots Realty.',
};

export default function TestimonialsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Client Experiences</p>
          <h1>The trust we build.</h1>
          <p className="lead">Don't just take our word for it. Hear from those who have found their place with Two Roots Realty.</p>
        </div>
      </header>
      
      <section className="section container">
        <div className="testimonial-grid">
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>We found our perfect family home in Dubai Hills thanks to Two Roots Realty. Their personalized guidance made all the difference.</p>
            <footer>— Family Buyer, Dubai Hills Estate</footer>
          </blockquote>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>An exceptional level of service. They handled my entire investment portfolio with transparency and expertise.</p>
            <footer>— International Investor, UK</footer>
          </blockquote>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>A seamless experience from start to finish. I highly recommend Two Roots for anyone looking for premium real estate in Dubai.</p>
            <footer>— Property Seller, Dubai Marina</footer>
          </blockquote>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>Professional, knowledgeable, and always approachable. Sunand and Ashmid truly understand the market.</p>
            <footer>— Off-plan Investor, GCC</footer>
          </blockquote>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <p className="eyebrow">Ready for your own success story?</p>
          <h2>Let's discuss your real estate journey.</h2>
          <Link className="button" href="/contact?intent=consultation">
            Speak to an Advisor<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
