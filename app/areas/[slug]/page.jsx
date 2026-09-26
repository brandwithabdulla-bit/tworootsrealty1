import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getLocationBySlug, getProperties, getProjects} from '@/lib/sanity-data';
import {PageHero,SectionHeader,PropertyGrid,CTASection,DemoNote,ArrowUpRight} from '@/components/ui';
import {MapSection} from '@/components/detail';
import {pageMetadata} from '@/lib/seo';

export async function generateMetadata({params}){
  const {slug}=await params;
  const a = await getLocationBySlug(slug);
  return a?pageMetadata(a.name,`Explore ${a.name}, community priorities and related illustrative properties.`,`/areas/${slug}`):{};
}

export default async function Page({params}){
  const {slug}=await params;
  const a = await getLocationBySlug(slug);
  if(!a) notFound();
  
  const [properties, projects] = await Promise.all([
    getProperties(),
    getProjects()
  ]);

  const portfolio = properties.filter(x => x.locationSlug === slug || x.location?.toLowerCase() === a.name.toLowerCase());
  const related = projects.filter(x => x.locationSlug === slug || x.location?.toLowerCase() === a.name.toLowerCase());

  return <><PageHero eyebrow={`${a.category || 'Popular'} location · Demo guide`} title={a.name} description="Find a setting for the way you want to live." image={a.image} imageAlt={`${a.name} community guide and lifestyle perspective in Dubai`}/><section className="section container split"><div><h2>A sense of place.</h2><p>{a.description}</p></div><div><h3>Everyday life, considered.</h3><ul>{(a.lifestyle || []).map(x=><li key={x}>{x}</li>)}</ul><p>Property types to explore: {(a.propertyTypes || []).join(', ')}.</p><DemoNote>This is an illustrative community guide. Current amenities and transport information need verification.</DemoNote></div></section><section className="section container"><SectionHeader title="Featured projects"/>{related.length?<PropertyGrid items={related} kind="projects"/>:<p>Project details for this area will be added when verified.</p>}</section><section className="section navy"><div className="container split"><div><h2>The local investment perspective.</h2><p>Look at ongoing ownership costs, competing supply, accessibility and the needs of potential future occupiers. A location label alone does not establish value.</p></div><div><h3>Developers in this demo collection</h3><div className="tag-links">{[...new Map(portfolio.map(p=>[p.developerSlug,p])).values()].map(p=><Link key={p.developerSlug} href={`/developers/${p.developerSlug}`}><span>{p.developer}</span> <ArrowUpRight size={12}/></Link>)}</div></div></div></section><section className="section container"><MapSection item={a}/></section><section className="section container"><SectionHeader title={`Properties in ${a.name}`} href={`/properties?location=${encodeURIComponent(a.name)}`} label="View area collection"/><DemoNote/><PropertyGrid items={portfolio}/></section><CTASection title={`Make a connection with ${a.name}.`} label={`Explore Properties in ${a.name}`} href={`/properties?location=${encodeURIComponent(a.name)}`}/></>;
}
