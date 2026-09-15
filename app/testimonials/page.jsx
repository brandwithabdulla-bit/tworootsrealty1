import {PageHero,CTASection} from '@/components/ui';
import {TestimonialsSection} from '@/components/sections';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Client Experiences','A home for approved Two Roots Realty client feedback and experiences.','/testimonials');
export default function Page(){return <><PageHero eyebrow="Relationships beyond a transaction" title="Trust, in their words." description="Approved client stories will be shared here. No testimonial text or client names have been supplied yet."/><TestimonialsSection/><section className="section container editorial-copy"><h2>Credibility, built with care.</h2><p>Authorised partner credentials, milestones, media coverage and approved testimonials will be added after client verification. We do not display placeholder awards, ratings or client counts as real achievements.</p></section><CTASection label="Start a conversation"/></>}
