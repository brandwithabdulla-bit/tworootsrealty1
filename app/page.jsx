import HeroSlideshow from '@/components/hero-slideshow';
import Link from 'next/link';
import SpeakToAdvisorLink from '@/components/SpeakToAdvisorLink';
import ScrollToLink from '@/components/ScrollToLink';
import DeveloperPartners from '@/components/DeveloperPartners';
import ProjectCarousel from '@/components/ProjectCarousel';
import {images} from '@/data/images';
import {getProperties, getProjects, getLocations, getArticles, getTeamMembers} from '@/lib/sanity-data';
import {Photo,Eyebrow,Button,SectionHeader,PropertyGrid,LocationCard,BlogCard,CTASection,DemoNote,ArrowUpRight} from '@/components/ui';
import {PropertySearch} from '@/components/interactive';
import InvestmentHomeSection from '@/components/InvestmentHomeSection';
import {StorySection,WhySection,ServicesSection,TeamSection,JourneySection,TestimonialsSection} from '@/components/sections';
import {pageMetadata} from '@/lib/seo';

export const metadata=pageMetadata('Dubai Property. Global Perspective.','Carefully selected projects, transparent advice and personalised guidance from Two Roots Realty.','/');

export default async function Home(){
  const [properties, projects, locations, blog, teamMembers] = await Promise.all([
    getProperties(),
    getProjects(),
    getLocations(),
    getArticles(),
    getTeamMembers(),
  ]);

  return <><section className="home-hero"><HeroSlideshow/><div className="hero-shade"/><div className="container hero-content"><Eyebrow>Dubai real estate · International perspective</Eyebrow><h1>Dubai Property.<br/>Global Perspective.<br/><em>Personal Guidance.</em></h1><p>Carefully selected projects, transparent advice and personalised guidance — from your first enquiry to final handover.</p><div className="actions"><Button href="/projects">Explore Projects</Button><SpeakToAdvisorLink className="hero-link" /></div><div className="hero-bottom"><ScrollToLink targetId="property-search">Discover your next chapter <span aria-hidden="true">↓</span></ScrollToLink><small>Illustrative photography</small></div></div><PropertySearch/></section><section className="section container home-opportunities-section"><SectionHeader eyebrow="Selected opportunities" title={<>A place for your <em>next chapter.</em></>} href="/projects" label="View all projects"/><DemoNote/><ProjectCarousel items={projects} kind="projects"/></section><DeveloperPartners/><WhySection/><StorySection/><ServicesSection/><section className="section projects-home"><div className="container"><SectionHeader eyebrow="Places taking shape" title="Considered projects. Fresh possibilities." href="/projects" label="Explore projects"/><DemoNote/><ProjectCarousel items={[...projects.slice(2), ...projects.slice(0, 2)]} kind="projects" theme="dark"/></div></section><InvestmentHomeSection/><section className="section container"><SectionHeader eyebrow="Find your Dubai" title="Different places. A world of possibilities." href="/areas" label="Explore all areas"/><div className="locations-grid home-areas">{[locations[0],locations[7] || locations[1],locations[3] || locations[2]].map((x, idx)=><LocationCard key={x?.id || idx} item={x}/>)}</div></section><TeamSection members={teamMembers}/><JourneySection/><TestimonialsSection/><section className="section container"><SectionHeader eyebrow="The Two Roots journal" title="A little more perspective." href="/insights" label="All insights"/><div className="blog-grid">{blog.slice(0,3).map((x, idx)=><BlogCard item={x} key={x?.id || idx}/>)}</div></section><CTASection/></>;
}
