import {locations} from '@/data/locations';
import {images} from '@/data/images';
import {PageHero,CTASection} from '@/components/ui';
import {AreaDiscovery} from '@/components/interactive';
import {MapSection} from '@/components/detail';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Areas','Discover Dubai and UAE locations through community guides and connected property collections.','/areas');
export default function Page(){return <><PageHero eyebrow="Find your place" title="Your life. Your neighbourhood." description="City energy, waterfront calm or space to grow. Start with the setting that feels like you." image={images.community} imageAlt="Dubai premier communities and master-planned neighbourhoods"/><AreaDiscovery items={locations}/><section className="container section"><MapSection item={{name:'Dubai'}}/></section><CTASection title="Not sure where to begin?" text="Tell us about your everyday life, your priorities and your plans. We can help you explore the right locations." label="Find your community"/></>}
