import {getDevelopers, getProjects} from '@/lib/sanity-data';
import {PageHero,DeveloperCard,DemoNote,CTASection} from '@/components/ui';
import {pageMetadata} from '@/lib/seo';

export const metadata=pageMetadata('Developers','Discover the developers in our illustrative collection and explore their connected projects and locations.','/developers');

export default async function Page(){
  const [developers, projects] = await Promise.all([
    getDevelopers(),
    getProjects()
  ]);

  return <><PageHero eyebrow="The people shaping places" title="Discover by developer." description="A different way into your property search. Explore the makers, the places and the possibilities." image="/images/hero/hero-2.jpg" imageAlt="Dubai Marina and world-class master developments"/><section className="section container"><DemoNote>Developer names are supplied by the client. These are text placeholders, not official logos. Demo project associations do not imply a partnership or authorisation.</DemoNote><div className="developer-grid">{developers.map(item=><DeveloperCard key={item.id} item={item} projectCount={projects.filter(x=>x.developer===item.name).length}/>)}</div></section><CTASection title="A developer is part of the decision." text="Talk through your priorities, compare your options and ask the questions that matter." label="Talk to an Advisor"/></>;
}
