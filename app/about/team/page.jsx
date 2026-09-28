import {PageHero,CTASection} from '@/components/ui';
import {TeamSection} from '@/components/sections';
import {images} from '@/data/images';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Founders & Team','Meet Sunand Poyyerikunnath and Muhammed Ashmid, the founders of Two Roots Realty.','/about/team');
export default function Page(){return <><PageHero eyebrow="Personal guidance starts with people" title="Meet the founders" image={images.apartment} imageAlt="Two Roots Realty collaborative architectural environment"/><TeamSection full/><CTASection label="Talk to Our Team"/></>}
