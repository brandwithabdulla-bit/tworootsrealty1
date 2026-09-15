import {origin} from '@/lib/seo';
export default function robots(){return {rules:{userAgent:'*',disallow:'/'},sitemap:`${origin}/sitemap.xml`};}
