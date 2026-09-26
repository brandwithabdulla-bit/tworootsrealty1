import {getProperties} from '@/lib/sanity-data';
import {images} from '@/data/images';
import {PageHero} from '@/components/ui';
import {Discovery} from '@/components/interactive';
import {pageMetadata} from '@/lib/seo';

export const metadata=pageMetadata('Explore Properties','Find your next Dubai property. Filter illustrative homes by location, developer, budget, bedrooms and property type.','/properties');

export default async function Page({searchParams}){
  const params=await searchParams;
  const properties = await getProperties();
  return <><PageHero eyebrow="Your place. Your perspective." title="Find what feels right." description="A considered collection of homes and investment possibilities. Begin with what matters to you." image={images.waterfront} imageAlt="Dubai luxury waterfront properties and residences"/><Discovery items={properties} initialFilters={params}/></>;
}
