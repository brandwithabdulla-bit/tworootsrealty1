import { client } from '@/sanity/lib/client';
import { 
  allPropertiesQuery, 
  propertyBySlugQuery, 
  allProjectsQuery, 
  projectBySlugQuery, 
  allDevelopersQuery, 
  allLocationsQuery, 
  allArticlesQuery, 
  allTeamMembersQuery, 
  approvedTestimonialsQuery 
} from '@/sanity/lib/queries';

import { properties as mockProperties } from '@/data/properties';
import { projects as mockProjects } from '@/data/projects';
import { developers as mockDevelopers } from '@/data/developers';
import { locations as mockLocations } from '@/data/locations';
import { blog as mockBlog } from '@/data/blog';
import { team as mockTeam } from '@/data/team';
import { testimonials as mockTestimonials } from '@/data/testimonials';
import { images as defaultImages } from '@/data/images';

// Helper to fill fallback image if Sanity document image is empty
function ensureImage(img, fallback) {
  const defaultArr = Array.isArray(fallback) ? fallback : [fallback];
  if (!img) return defaultArr;
  if (Array.isArray(img)) {
    const valid = img.filter(Boolean);
    return valid.length > 0 ? valid : defaultArr;
  }
  if (typeof img === 'string') {
    return [img];
  }
  return defaultArr;
}

export async function getDevelopers() {
  try {
    const data = await client.fetch(allDevelopersQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((d, i) => ({
        ...d,
        id: d._id || d.id || `dev-${i+1}`,
        image: d.coverImage || d.image || defaultImages.architecture,
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (developers):', err.message);
  }
  return mockDevelopers;
}

export async function getLocations() {
  try {
    const data = await client.fetch(allLocationsQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((loc, i) => ({
        ...loc,
        id: loc._id || loc.id || `area-${i+1}`,
        image: loc.image || Object.values(defaultImages)[i % 6],
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (locations):', err.message);
  }
  return mockLocations;
}

export async function getLocationBySlug(slug) {
  const allLocs = await getLocations();
  return allLocs.find(l => l.slug === slug) || mockLocations.find(l => l.slug === slug);
}

export async function getProperties() {
  try {
    const data = await client.fetch(allPropertiesQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((p, i) => ({
        ...p,
        id: p._id || p.id || `property-${i+1}`,
        images: ensureImage(p.images, defaultImages.apartment),
        gallery: ensureImage(p.gallery, defaultImages.apartment),
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (properties):', err.message);
  }
  return mockProperties;
}

export async function getPropertyBySlug(slug) {
  try {
    const p = await client.fetch(propertyBySlugQuery, { slug }, { next: { revalidate: 60 } });
    if (p) {
      return {
        ...p,
        id: p._id || p.id,
        images: ensureImage(p.images, defaultImages.apartment),
        gallery: ensureImage(p.gallery, defaultImages.apartment),
      };
    }
  } catch (err) {
    console.warn('Sanity fetch warning (propertyBySlug):', err.message);
  }
  return mockProperties.find(p => p.slug === slug);
}

export async function getProjects() {
  try {
    const data = await client.fetch(allProjectsQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((proj, i) => ({
        ...proj,
        id: proj._id || proj.id || `project-${i+1}`,
        images: ensureImage(proj.images, defaultImages.architecture),
        gallery: ensureImage(proj.gallery, defaultImages.architecture),
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (projects):', err.message);
  }
  return mockProjects;
}

export async function getProjectBySlug(slug) {
  try {
    const proj = await client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 60 } });
    if (proj) {
      return {
        ...proj,
        id: proj._id || proj.id,
        images: ensureImage(proj.images, defaultImages.architecture),
        gallery: ensureImage(proj.gallery, defaultImages.architecture),
      };
    }
  } catch (err) {
    console.warn('Sanity fetch warning (projectBySlug):', err.message);
  }
  return mockProjects.find(p => p.slug === slug);
}

export async function getArticles() {
  try {
    const data = await client.fetch(allArticlesQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((art, i) => ({
        ...art,
        id: art._id || art.id || `article-${i+1}`,
        image: art.image || Object.values(defaultImages)[i % 6],
        content: art.contentSections || art.content,
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (articles):', err.message);
  }
  return mockBlog;
}

export async function getArticleBySlug(slug) {
  const allArts = await getArticles();
  return allArts.find(a => a.slug === slug) || mockBlog.find(a => a.slug === slug);
}

export async function getTeamMembers() {
  try {
    const data = await client.fetch(allTeamMembersQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((m, i) => ({
        ...m,
        id: m._id || m.id || `team-${i+1}`,
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (teamMembers):', err.message);
  }
  return mockTeam;
}

export async function getTestimonials() {
  try {
    const data = await client.fetch(approvedTestimonialsQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Sanity fetch warning (testimonials):', err.message);
  }
  return mockTestimonials;
}
