import PropertyDetail from "@/components/PropertyDetail";
import { DEMO_PROJECTS } from "@/data/mockData";

// Note: In Next.js App Router 15+, dynamic params are promises
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = DEMO_PROJECTS.find(p => p.slug === resolvedParams.slug);
  
  return (
    <main id="main-content">
      <PropertyDetail item={project} type="project" />
    </main>
  );
}

// Generate static params for demo purposes
export function generateStaticParams() {
  return DEMO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}
