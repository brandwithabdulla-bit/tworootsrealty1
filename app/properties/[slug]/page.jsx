export const dynamicParams = false;
import {notFound} from 'next/navigation';
import {properties} from '@/data/properties';
import {ListingDetail} from '@/components/detail';
import {pageMetadata} from '@/lib/seo';
export function generateStaticParams(){return properties.map(({slug})=>({slug}));}
export async function generateMetadata({params}){const {slug}=await params;const p=properties.find(x=>x.slug===slug);return p?pageMetadata(p.title,`${p.propertyType} in ${p.location}. ${p.priceLabel}. Illustrative property listing.`,`/properties/${slug}`):{};}
export default async function Page({params}){const {slug}=await params;const p=properties.find(x=>x.slug===slug);if(!p)notFound();const similar=properties.filter(x=>x.id!==p.id).sort((a,b)=>Number(b.location===p.location)-Number(a.location===p.location)).slice(0,3);return <ListingDetail item={p} kind="properties" similar={similar}/>}
