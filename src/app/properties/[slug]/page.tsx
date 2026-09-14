import PropertyDetail from "@/components/PropertyDetail";
import { DEMO_PROPERTIES } from "@/data/mockData";

// Note: In Next.js App Router 15+, dynamic params are promises
export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const property = DEMO_PROPERTIES.find(p => p.slug === resolvedParams.slug);
  
  return (
    <main id="main-content">
      <PropertyDetail item={property} type="property" />
    </main>
  );
}

// Generate static params for demo purposes
export function generateStaticParams() {
  return DEMO_PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}
