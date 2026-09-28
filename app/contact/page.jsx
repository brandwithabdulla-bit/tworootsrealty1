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
        eyebrow="EVERY GREAT MOVE BEGINS WITH A CONVERSATION"
        title="Let’s Find What Moves You Forward"
        description="A place to call home. An investment with purpose. A new opportunity. Whatever brings you here, we’re ready to listen and help you take the next step."
        image="/images/hero/hero-3.jpg"
        imageAlt="Two Roots Realty advisory and luxury architectural consultation"
      />
      <ContactSection initialTab={initialTab} context={context} />
    </>
  );
}
