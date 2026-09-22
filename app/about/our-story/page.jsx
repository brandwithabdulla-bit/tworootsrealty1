import { PageHero, CTASection } from '@/components/ui';
import { images } from '@/data/images';
import { pageMetadata } from '@/lib/seo';
import OurStoryJourney from '@/components/OurStoryJourney';

export const metadata = pageMetadata(
  'Our Story',
  'A friendship lasting more than a decade became the foundation of Two Roots Realty.',
  '/about/our-story'
);

export default function Page() {
  return (
    <>
      <PageHero 
        eyebrow="Our story" 
        title={<>Two Roots.<br /><em>One Vision.</em></>} 
        description="Some connections become the foundation for something bigger." 
        image={images.architecture} 
        imageAlt="Two Roots Realty story and foundational architecture"
      />
      
      {/* Redesigned 1-5 Milestones Single-Section Layout */}
      <OurStoryJourney />

      <CTASection 
        title="Your next chapter begins with a connection." 
        label="Talk to Our Team"
      />
    </>
  );
}
