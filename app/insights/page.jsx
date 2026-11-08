import { getArticles } from '@/lib/sanity-data';
import { images } from '@/data/images';
import { PageHero, CTASection } from '@/components/ui';
import { InsightsDiscovery } from '@/components/interactive';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Insights', 'Property stories, community perspectives and considered questions from the Two Roots journal.', '/insights');

export default async function Page({ searchParams }) {
  const { category } = await searchParams;
  const blog = await getArticles();
  return <><PageHero eyebrow="The Two Roots Journal" title="Beyond the Property. Into the Perspective." description="Thoughtful insights, emerging opportunities and informed perspectives on Dubai real estate and the forces shaping its future." lead="Property · Perspective · Possibility" noPhoto /><InsightsDiscovery items={blog} initialCategory={category} /><CTASection title="A question worth asking?" text="Bring it to a conversation with our team." label="Talk to an Advisor" /></>;

}
