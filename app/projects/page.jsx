import {getProjects} from '@/lib/sanity-data';
import {PageHero} from '@/components/ui';
import {Discovery} from '@/components/interactive';
import {pageMetadata} from '@/lib/seo';

export const metadata=pageMetadata('Projects','Explore off-plan, ready, waterfront and luxury demo projects with connected developer and community information.','/projects');

export default async function Page({searchParams}){
  const projects = await getProjects();
  return <><PageHero eyebrow="A new point of view" title="Places taking shape." description="Discover projects through their architecture, their setting and the way you want to live." image="/images/hero/hero-5.jpg" imageAlt="Dubai landmark luxury developments and skyline"/><Discovery items={projects} kind="projects" initialFilters={await searchParams}/></>;
}
