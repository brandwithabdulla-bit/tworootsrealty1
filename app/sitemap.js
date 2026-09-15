import {origin} from '@/lib/seo';
import {properties} from '@/data/properties';
import {projects} from '@/data/projects';
import {developers} from '@/data/developers';
import {locations} from '@/data/locations';
import {blog} from '@/data/blog';
export default function sitemap(){const staticRoutes=['','/about','/about/our-story','/about/team','/properties','/projects','/developers','/areas','/services','/investment','/testimonials','/insights','/contact','/careers','/privacy-policy','/terms-and-conditions','/cookie-policy'];return [...staticRoutes,...[['properties',properties],['projects',projects],['developers',developers],['areas',locations],['insights',blog]].flatMap(([kind,items])=>items.map(x=>`/${kind}/${x.slug}`))].map(path=>({url:`${origin}${path}`,changeFrequency:'weekly',priority:path===''?1:.7}));}
