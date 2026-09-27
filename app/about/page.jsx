import { PageHero, CTASection } from '@/components/ui';
import { StorySection, WhySection, TeamSection } from '@/components/sections';
import AboutMissionVisionValues from '@/components/AboutMissionVisionValues';
import { images } from '@/data/images';
import { getTeamMembers } from '@/lib/sanity-data';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'About Us',
  'Meet Two Roots Realty: a Dubai real estate advisory company rooted in trust, connection and long-term relationships.',
  '/about'
);

export default async function Page() {
  const teamMembers = await getTeamMembers();
  
  return (
    <>
      <PageHero
        eyebrow="Established August 2026 · UAE"
        title={<>Two roots.<br /><em>One shared perspective.</em></>}
        description="A trusted Dubai real estate advisory company combining strong local expertise with international reach."
        image={images.architecture}
        imageAlt="Two Roots Realty luxury Dubai architecture"
      />
      
      <StorySection />

      {/* 3-Card Luxury Suite: Mission, Vision, and Values */}
      <AboutMissionVisionValues />

      <WhySection />

      <section className="section sand">
        <div className="container split">
          <h2>Local knowledge.<br /><em>International understanding.</em></h2>
          <div>
            <p className="lead">Deeply connected to the Dubai market, built for global clients.</p>
            <p>Our international perspective helps us understand the questions people bring from different markets. We connect with clients across borders; these connections do not imply physical offices in those locations.</p>
          </div>
        </div>
      </section>

      <TeamSection members={teamMembers} />
      
      <CTASection label="Talk to Our Team" />
    </>
  );
}
