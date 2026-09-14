import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invest With Perspective | Two Roots Realty',
  description: 'A considered approach to Dubai property investment, with attention to goals, costs, risks and long-term ownership.',
};

export default function InvestmentPage() {
  return (
    <>
      <header className="page-hero with-image">
        <div className="container">
          <p className="eyebrow">Clarity before commitment</p>
          <h1>Invest With Perspective</h1>
          <p className="lead">Your goals come first. The right questions help turn a property search into a considered decision.</p>
        </div>
        <div className="photo ">
          <Image
            alt="Illustrative architectural photography"
            src="/images/dubai.jpg"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </header>

      <section className="section container">
        <div className="investment-topics">
          <article>
            <h3>Capital appreciation</h3>
            <p>Consider what could support long-term value, alongside the possibility of price declines and changing demand.</p>
          </article>
          <article>
            <h3>Rental income</h3>
            <p>Evaluate income after service charges, maintenance, vacancy and other ownership costs. No yield is assumed or guaranteed.</p>
          </article>
          <article>
            <h3>Payment plans</h3>
            <p>Understand the timing of commitments, your liquidity needs and the terms attached to each milestone.</p>
          </article>
          <article>
            <h3>Tax advantages</h3>
            <p>Potential tax treatment depends on individual circumstances and applicable rules. Seek qualified advice in each relevant jurisdiction.</p>
          </article>
          <article>
            <h3>Residency opportunities</h3>
            <p>Explore eligibility questions with a qualified professional. Property ownership does not automatically confer residency.</p>
          </article>
          <article>
            <h3>Market transparency</h3>
            <p>Ask for current records, approved documents and clear evidence behind every claim.</p>
          </article>
          <article>
            <h3>Infrastructure growth</h3>
            <p>Distinguish completed infrastructure from proposals and examine how timing may affect your plans.</p>
          </article>
        </div>
      </section>

      <section className="section sand" id="investment-guide">
        <div className="container split">
          <div>
            <p className="eyebrow">A useful starting point</p>
            <h2>Your investment conversation guide.</h2>
          </div>
          <div>
            <p>Prepare your goals, budget, preferred holding period and questions about ongoing costs. Our approved investment guide will be added here when supplied.</p>
            <Link className="button secondary" href="/contact?context=Investment%20guide">
              Request the Investment Guide<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section container investor-layout">
        <div>
          <p className="eyebrow">Tell us what you have in mind</p>
          <h2>Begin with your perspective.</h2>
          <p>Whether you are based in the UAE or overseas, a clear brief helps us understand what matters to you.</p>
          <p className="small">General discussion topics only, not financial, legal or tax advice. Returns are never guaranteed.</p>
        </div>
        <div id="investor-enquiry">
          <form noValidate className="enquiry-form ">
            <p className="form-note">Demo form · details are validated but are not sent or saved. Please use test details.</p>
            <p className="context-note">Enquiry: <strong>Investment consultation</strong></p>
            <div className="form-grid">
              <label htmlFor="_R_2hbsnlb_-name">
                Name *
                <input id="_R_2hbsnlb_-name" type="text" required autoComplete="name" aria-invalid="false" name="name" />
              </label>
              <label htmlFor="_R_2hbsnlb_-email">
                Email *
                <input id="_R_2hbsnlb_-email" type="email" required autoComplete="email" aria-invalid="false" name="email" />
              </label>
              <label htmlFor="_R_2hbsnlb_-phone">
                Phone *
                <input id="_R_2hbsnlb_-phone" type="tel" required autoComplete="tel" aria-invalid="false" name="phone" />
              </label>
              <label htmlFor="_R_2hbsnlb_-nationality">
                Nationality
                <input id="_R_2hbsnlb_-nationality" type="text" aria-invalid="false" name="nationality" />
              </label>
              <label htmlFor="_R_2hbsnlb_-country">
                Country of residence
                <input id="_R_2hbsnlb_-country" type="text" aria-invalid="false" name="country" />
              </label>
              <label htmlFor="_R_2hbsnlb_-budget">
                Investment budget
                <input id="_R_2hbsnlb_-budget" type="text" aria-invalid="false" name="budget" />
              </label>
              <label htmlFor="_R_2hbsnlb_-location">
                Preferred location
                <select id="_R_2hbsnlb_-location" name="location" aria-invalid="false" defaultValue="">
                  <option value="">Select an option</option>
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
                  <option>Rashid Yachts &amp; Marina</option>
                  <option>Expo City</option>
                  <option>Ras Al Khaimah</option>
                </select>
              </label>
              <label htmlFor="_R_2hbsnlb_-propertyType">
                Property type
                <select id="_R_2hbsnlb_-propertyType" name="propertyType" aria-invalid="false" defaultValue="">
                  <option value="">Select an option</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Townhouse</option>
                  <option>Penthouse</option>
                  <option>Commercial</option>
                  <option>Branded Residence</option>
                </select>
              </label>
              <label htmlFor="_R_2hbsnlb_-goal">
                Investment goal
                <select id="_R_2hbsnlb_-goal" name="goal" aria-invalid="false" defaultValue="">
                  <option value="">Select an option</option>
                  <option>Rental income</option>
                  <option>Long-term ownership</option>
                  <option>Future home</option>
                  <option>Portfolio diversification</option>
                </select>
              </label>
              <label htmlFor="_R_2hbsnlb_-contactMethod">
                Preferred contact method
                <select id="_R_2hbsnlb_-contactMethod" name="contactMethod" aria-invalid="false" defaultValue="">
                  <option value="">Select an option</option>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              </label>
            </div>
            <label>
              Message
              <textarea name="message" rows={3} maxLength={4000}></textarea>
            </label>
            <label className="consent">
              <input type="checkbox" aria-invalid="false" name="consent" />
              <span>I understand this is a demo form. See the <Link href="/privacy-policy">privacy notice</Link>.</span>
            </label>
            <button className="button">
              Speak to an Investment Advisor <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
