import { PageHero } from '@/components/ui';
import ContactSection from '@/components/ContactSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Contact',
  'Start a property conversation with Two Roots Realty. Enquiry forms are currently demonstration only.',
  '/contact'
);

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const initialTab = params?.intent === 'requirement' ? 'Property requirement' : 'Quick enquiry';
  const context = params?.context || (params?.intent === 'consultation' ? 'Book a Consultation' : '');

  return (
    <>
      <PageHero
        eyebrow="A connection starts here"
        title="Let's Find the Right Property for You"
        description="Tell us what you have in mind. A home, an investment, a new requirement — or simply a question."
        image="/images/hero/hero-3.jpg"
        imageAlt="Two Roots Realty advisory and luxury architectural consultation"
      />
      <ContactSection initialTab={initialTab} context={context} />
    </>
  );
}
