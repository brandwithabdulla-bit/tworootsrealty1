import { getGalleryItems } from '@/lib/sanity-data';
import { pageMetadata } from '@/lib/seo';
import GalleryClient from './GalleryClient';

export const metadata = pageMetadata(
  'Curated Gallery',
  'A visual showcase of Dubai\'s most compelling residences, prime waterfront developments and architectural landmarks.',
  '/gallery'
);

export default async function GalleryPage() {
  const items = await getGalleryItems();
  
  return <GalleryClient items={items} />;
}
