import { getProjects, getProperties } from '@/lib/sanity-data';
import { pageMetadata } from '@/lib/seo';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = pageMetadata(
  'Dubai Real Estate Map',
  'Explore off-plan developments, luxury villas, waterfront apartments, and master communities on our interactive Dubai real estate map.',
  '/map'
);

export default async function MapPage() {
  const [projectsData, propertiesData] = await Promise.all([
    getProjects(),
    getProperties()
  ]);

  // Merge projects & properties with valid coordinates
  const allMapItems = [
    ...(projectsData || []),
    ...(propertiesData || [])
  ];

  return (
    <main>
      <InteractiveMap initialItems={allMapItems} />
    </main>
  );
}
