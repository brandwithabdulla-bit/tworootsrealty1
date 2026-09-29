import {PageHero,CTASection} from '@/components/ui';
import {TeamSection} from '@/components/sections';
import {images} from '@/data/images';
import {pageMetadata} from '@/lib/seo';
import { getTeamMembers } from '@/lib/sanity-data';
export const metadata=pageMetadata('Founders & Team','Meet Sunand Poyyerikunnath and Muhammed Ashmid, the founders of Two Roots Realty.','/about/team');
export default async function Page(){
  const teamMembers = await getTeamMembers();
  return <><PageHero eyebrow="Personal guidance starts with people" title="Meet the founders" image={images.apartment} imageAlt="Two Roots Realty collaborative architectural environment"/><TeamSection full members={teamMembers}/><CTASection label="Talk to Our Team"/></>;
}
