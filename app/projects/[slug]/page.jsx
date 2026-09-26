import {notFound} from 'next/navigation';
import {getProjects, getProjectBySlug} from '@/lib/sanity-data';
import {ListingDetail} from '@/components/detail';
import {pageMetadata} from '@/lib/seo';

export async function generateMetadata({params}){
  const {slug}=await params;
  const p = await getProjectBySlug(slug);
  return p?pageMetadata(p.title,`${p.title} in ${p.location}: gallery, payment plan and project information. Demo project.`,`/projects/${slug}`):{};
}

export default async function Page({params}){
  const {slug}=await params;
  const p = await getProjectBySlug(slug);
  if(!p) notFound();
  const all = await getProjects();
  return <ListingDetail item={p} kind="projects" similar={all.filter(x=>x.id!==p.id).slice(0,3)}/>;
}
