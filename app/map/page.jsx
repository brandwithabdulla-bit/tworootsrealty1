import { pageMetadata } from '@/lib/seo';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = pageMetadata(
  'Dubai Real Estate Masterplan Map',
  'Explore Dubai master communities, waterfront developments, and off-plan locations on our interactive aerial masterplan map.',
  '/map'
);

export default function MapPage() {
  return (
    <main>
      <InteractiveMap />
    </main>
  );
}
