export const dynamicParams = false;
import {notFound} from 'next/navigation';
import {projects} from '@/data/projects';
import {ListingDetail} from '@/components/detail';
import {pageMetadata} from '@/lib/seo';
export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export async function generateMetadata({params}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);return p?pageMetadata(p.title,`${p.title} in ${p.location}: gallery, payment plan and project information. Demo project.`,`/projects/${slug}`):{};}
export default async function Page({params}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();return <ListingDetail item={p} kind="projects" similar={projects.filter(x=>x.id!==p.id).slice(0,3)}/>}
