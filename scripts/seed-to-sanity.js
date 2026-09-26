import { developers } from '../data/developers.js';
import { locations } from '../data/locations.js';
import { properties } from '../data/properties.js';
import { projects } from '../data/projects.js';
import { blog } from '../data/blog.js';
import { team } from '../data/team.js';
import { testimonials } from '../data/testimonials.js';
import fs from 'fs';

console.log('Generating Sanity seed batches...');

const devDocs = developers.map(dev => ({
  type: 'developer',
  content: {
    name: dev.name,
    slug: { _type: 'slug', current: dev.slug },
    description: dev.description,
    featured: true
  }
}));

const locDocs = locations.map(loc => ({
  type: 'location',
  content: {
    name: loc.name,
    slug: { _type: 'slug', current: loc.slug },
    category: loc.category || 'Popular',
    latitude: loc.latitude,
    longitude: loc.longitude,
    description: loc.description,
    lifestyle: loc.lifestyle,
    propertyTypes: loc.propertyTypes
  }
}));

const propDocs = properties.map(p => ({
  type: 'property',
  content: {
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    propertyType: p.propertyType,
    purpose: p.purpose,
    status: p.status,
    price: p.price,
    priceLabel: p.priceLabel,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    handover: p.handover,
    shortDescription: p.shortDescription,
    description: p.description,
    amenities: p.amenities,
    paymentPlan: p.paymentPlan,
    featured: p.featured,
    offPlan: p.offPlan,
    ready: p.ready,
    investment: p.investment,
    latitude: p.latitude,
    longitude: p.longitude
  }
}));

const projDocs = projects.map(proj => ({
  type: 'project',
  content: {
    title: proj.title,
    slug: { _type: 'slug', current: proj.slug },
    propertyType: proj.propertyType,
    purpose: proj.purpose,
    status: proj.status,
    price: proj.price,
    priceLabel: proj.priceLabel,
    bedrooms: proj.bedrooms,
    bathrooms: proj.bathrooms,
    area: proj.area,
    plotArea: proj.plotArea || undefined,
    lifestyle: proj.lifestyle,
    tags: proj.tags,
    handover: proj.handover,
    featured: proj.featured,
    offPlan: proj.offPlan,
    investment: proj.investment,
    latitude: proj.latitude,
    longitude: proj.longitude,
    unitBreakdown: proj.unitBreakdown,
    highlights: proj.highlights,
    paymentPlan: proj.paymentPlan,
    amenities: proj.amenities,
    description: proj.description
  }
}));

const articleDocs = blog.map(art => ({
  type: 'article',
  content: {
    title: art.title,
    slug: { _type: 'slug', current: art.slug },
    category: art.category,
    date: art.date,
    readingTime: art.readingTime,
    author: art.author,
    summary: art.summary,
    contentSections: art.content
  }
}));

const teamDocs = team.map((member, idx) => ({
  type: 'teamMember',
  content: {
    name: member.name,
    role: member.role,
    bio: member.bio,
    expertise: member.expertise,
    order: idx + 1
  }
}));

const testimonialDocs = testimonials.map(t => ({
  type: 'testimonial',
  content: {
    quote: t.quote,
    name: t.name || undefined,
    approved: t.approved || false
  }
}));

const seedPayload = {
  developers: devDocs,
  locations: locDocs,
  properties: propDocs,
  projects: projDocs,
  articles: articleDocs,
  teamMembers: teamDocs,
  testimonials: testimonialDocs
};

fs.writeFileSync('scratch/sanity_seed_batches.json', JSON.stringify(seedPayload, null, 2));
console.log('Saved to scratch/sanity_seed_batches.json successfully!');
