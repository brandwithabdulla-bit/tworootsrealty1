import {blog} from '@/data/blog';
import {PageHero,CTASection} from '@/components/ui';
import {InsightsDiscovery} from '@/components/interactive';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Insights','Property stories, community perspectives and considered questions from the Two Roots journal.','/insights');
export default async function Page({searchParams}){const {category}=await searchParams;return <><PageHero eyebrow="The Two Roots journal" title="A little more perspective." description="Ideas, questions and places to explore. These sample articles demonstrate the future journal."/><InsightsDiscovery items={blog} initialCategory={category}/><CTASection title="A question worth asking?" text="Bring it to a conversation with our team." label="Talk to an Advisor"/></>}
