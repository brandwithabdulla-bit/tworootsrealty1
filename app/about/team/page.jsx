import {PageHero,CTASection} from '@/components/ui';
import {TeamSection} from '@/components/sections';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Founders & Team','Meet Sunand Poyyerikunnath and Muhammed Ashmid, the founders of Two Roots Realty.','/about/team');
export default function Page(){return <><PageHero eyebrow="Personal guidance starts with people" title="Meet your Two Roots." description="Complementary experience. A shared commitment to trusted relationships."/><TeamSection full/><CTASection label="Talk to Our Team"/></>}
