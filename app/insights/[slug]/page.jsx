export const dynamicParams = false;
import {notFound} from 'next/navigation';
import {blog} from '@/data/blog';
import {PageHero,CTASection,SectionHeader,BlogCard,DemoNote} from '@/components/ui';
import {pageMetadata} from '@/lib/seo';
export function generateStaticParams(){return blog.map(({slug})=>({slug}));}
export async function generateMetadata({params}){const {slug}=await params;const p=blog.find(x=>x.slug===slug);return p?pageMetadata(p.title,p.summary,`/insights/${slug}`):{};}
export default async function Page({params}){const {slug}=await params;const p=blog.find(x=>x.slug===slug);if(!p)notFound();return <><PageHero eyebrow={`${p.category} · Demo article`} title={p.title} description={`${p.author} · 1 September 2026 · ${p.readingTime}`} image={p.image} imageAlt={`${p.title} - Two Roots Realty Journal`}/><section className="container section"><div className="article-body"><DemoNote>Sample editorial content for layout demonstration. Not a verified market report or professional recommendation.</DemoNote>{p.content.map(x=><section key={x.heading}><h2>{x.heading}</h2><p>{x.text}</p></section>)}</div></section><section className="section container"><SectionHeader title="More to consider."/><div className="blog-grid">{blog.filter(x=>x.id!==p.id).slice(0,3).map(x=><BlogCard key={x.id} item={x}/>)}</div></section><CTASection title="Bring your questions. We'll bring perspective." label="Talk to Our Team"/></>}
