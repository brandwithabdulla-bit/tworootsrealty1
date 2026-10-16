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
  approvedTestimonialsQuery,
  allGalleryItemsQuery
} from '@/sanity/lib/queries';

import { properties as mockProperties } from '@/data/properties';
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

// In-memory cache for resolved Google Maps coordinates to avoid duplicate network lookups
const coordsCache = new Map();

export async function resolveMapCoordinates(item) {
  if (!item) return item;

  // If latitude and longitude are already valid numbers, nothing to do
  if (typeof item.latitude === 'number' && typeof item.longitude === 'number' && !isNaN(item.latitude) && !isNaN(item.longitude)) {
    return item;
  }

  // Look for a map link in mapUrl or if location was passed as a URL
  let candidateUrl = item.mapUrl || '';
  let locationWasUrl = false;
  if (!candidateUrl && typeof item.location === 'string' && item.location.trim().startsWith('http')) {
    candidateUrl = item.location.trim();
    locationWasUrl = true;
  }

  if (!candidateUrl || typeof candidateUrl !== 'string') {
    return item;
  }

  const trimmed = candidateUrl.trim();
  let extracted = coordsCache.get(trimmed);

  if (extracted === undefined) {
    try {
      let targetUrl = trimmed;

      // If it is a shortened Google Maps URL (maps.app.goo.gl or goo.gl/maps), resolve redirect
      if (trimmed.includes('goo.gl/')) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        try {
          const res = await fetch(trimmed, {
            method: 'GET',
            redirect: 'follow',
            signal: controller.signal,
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          targetUrl = res.url || trimmed;
        } finally {
          clearTimeout(timeoutId);
        }
      }

      let lat = null;
      let lng = null;
      let placeName = null;

      // 1. Try exact pin coordinates !3d... !4d...
      const pinMatch = targetUrl.match(/!3d(-?\d+(?:\.\d+)?)(?:!|m|&|$)/);
      const pin4dMatch = targetUrl.match(/!4d(-?\d+(?:\.\d+)?)(?:!|m|&|$)/);
      if (pinMatch && pin4dMatch) {
        lat = parseFloat(pinMatch[1]);
        lng = parseFloat(pin4dMatch[1]);
      } else {
        // 2. Try @lat,lng
        const atMatch = targetUrl.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
        if (atMatch) {
          lat = parseFloat(atMatch[1]);
          lng = parseFloat(atMatch[2]);
        } else {
          // 3. Try ?q=lat,lng or ?query=lat,lng or ?ll=lat,lng
          const qMatch = targetUrl.match(/[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
          if (qMatch) {
            lat = parseFloat(qMatch[1]);
            lng = parseFloat(qMatch[2]);
          }
        }
      }

      // Extract readable place name if URL has /place/Name/...
      const placeMatch = targetUrl.match(/\/place\/([^/@?#]+)/);
      if (placeMatch) {
        try {
          placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        } catch {}
      }

      if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
        extracted = { latitude: lat, longitude: lng, placeName };
        coordsCache.set(trimmed, extracted);
      } else {
        coordsCache.set(trimmed, null);
      }
    } catch {
      coordsCache.set(trimmed, null);
    }
  }

  if (extracted) {
    const updated = {
      ...item,
      latitude: extracted.latitude,
      longitude: extracted.longitude,
      mapUrl: candidateUrl
    };
    if (locationWasUrl) {
      updated.location = extracted.placeName || item.developer || 'Dubai';
    }
    return updated;
  }

  return item;
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
      return await Promise.all(data.map(async (p, i) => {
        const resolved = await resolveMapCoordinates(p);
        return {
          ...resolved,
          id: resolved._id || resolved.id || `property-${i+1}`,
          images: ensureImage(resolved.images, defaultImages.apartment),
          gallery: ensureImage(resolved.gallery, defaultImages.apartment),
        };
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
      const resolved = await resolveMapCoordinates(p);
      return {
        ...resolved,
        id: resolved._id || resolved.id,
        images: ensureImage(resolved.images, defaultImages.apartment),
        gallery: ensureImage(resolved.gallery, defaultImages.apartment),
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
      return await Promise.all(data.map(async (proj, i) => {
        const resolved = await resolveMapCoordinates(proj);
        return {
          ...resolved,
          id: resolved._id || resolved.id || `project-${i+1}`,
          heroImage: resolved.heroImage || null,
          images: ensureImage(resolved.images, defaultImages.architecture),
          gallery: ensureImage(resolved.gallery, defaultImages.architecture),
        };
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (projects):', err.message);
  }
  return [];
}

export async function getProjectBySlug(slug) {
  try {
    const proj = await client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 60 } });
    if (proj) {
      const resolved = await resolveMapCoordinates(proj);
      return {
        ...resolved,
        id: resolved._id || resolved.id,
        heroImage: resolved.heroImage || null,
        images: ensureImage(resolved.images, defaultImages.architecture),
        gallery: ensureImage(resolved.gallery, defaultImages.architecture),
      };
    }
  } catch (err) {
    console.warn('Sanity fetch warning (projectBySlug):', err.message);
  }
  return null;
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

export const mockGalleryItems = [
  { id: 1, category: 'Waterfront', src: '/images/waterfront.jpg' },
  { id: 2, category: 'Villas', src: '/images/villa.jpg' },
  { id: 3, category: 'Interiors', src: '/images/interior.jpg' },
  { id: 4, category: 'Waterfront', src: '/images/dubai.jpg' },
  { id: 5, category: 'Mansions', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, category: 'Architecture', src: '/images/architecture.jpg' },
  { id: 7, category: 'Waterfront', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, category: 'Villas', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop' },
  { id: 9, category: 'Mansions', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { id: 10, category: 'Architecture', src: '/images/community.jpg' },
  { id: 11, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop' },
  { id: 12, category: 'Waterfront', src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop' }
];

export async function getGalleryItems() {
  try {
    const data = await client.fetch(allGalleryItemsQuery, {}, { next: { revalidate: 60 } });
    if (data && data.length > 0) {
      return data.map((item, i) => ({
        ...item,
        id: item._id || item.id || `gallery-${i+1}`,
        src: item.src || '/images/waterfront.jpg',
        category: item.category || 'Architecture'
      }));
    }
  } catch (err) {
    console.warn('Sanity fetch warning (gallery):', err.message);
  }
  return mockGalleryItems;
}

