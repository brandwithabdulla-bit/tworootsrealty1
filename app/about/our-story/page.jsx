import { PageHero, CTASection, Button } from '@/components/ui';
import { storySlides } from '@/data/slides';
import { pageMetadata } from '@/lib/seo';
import OurStoryJourney from '@/components/OurStoryJourney';

export const metadata = pageMetadata(
  'Our Story',
  'Rooted in trust. Connected by purpose. Building opportunities that go beyond borders.',
  '/about/our-story'
);

export default function Page() {
  return (
    <>
      <PageHero 
        eyebrow="Our story" 
        title={<>Rooted in trust. Connected by purpose.<br /><em>Building opportunities that go beyond borders.</em></>} 
        slides={storySlides}
      >
        <div style={{ marginTop: '28px' }}>
          <Button href="/projects">Discover Opportunities</Button>
        </div>
      </PageHero>
      
      {/* Redesigned 1-5 Milestones Single-Section Layout */}
      <OurStoryJourney />

      <CTASection 
        title="Your next chapter begins with a connection." 
        label="Talk to Our Team"
      />
    </>
  );
}
