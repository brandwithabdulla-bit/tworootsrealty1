import {PageHero,CTASection} from '@/components/ui';
import {TestimonialsSection} from '@/components/sections';
import {images} from '@/data/images';
import {getTestimonials} from '@/lib/sanity-data';
import {pageMetadata} from '@/lib/seo';

export const metadata=pageMetadata('Client Experiences','A home for approved Two Roots Realty client feedback and experiences.','/testimonials');

export default async function Page(){
  const testimonialsList = await getTestimonials();
  return <><PageHero eyebrow="Relationships beyond a transaction" title="Trust, in their words." description="Approved client stories will be shared here. Edit and approve testimonials live in your Sanity CMS." image={images.waterfront} imageAlt="Tranquil Dubai luxury waterfront living and trusted client relationships"/><TestimonialsSection items={testimonialsList}/><section className="section container editorial-copy"><h2>Credibility, built with care.</h2><p>Authorised partner credentials, milestones, media coverage and approved testimonials are managed directly from Sanity Studio.</p></section><CTASection label="Start a conversation"/></>;
}
