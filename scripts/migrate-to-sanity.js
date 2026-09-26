import { createClient } from '@sanity/client';
import { properties } from '../data/properties.js';
import { projects } from '../data/projects.js';
import { developers } from '../data/developers.js';
import { locations } from '../data/locations.js';
import { blog } from '../data/blog.js';
import { team } from '../data/team.js';
import { testimonials } from '../data/testimonials.js';

import fs from 'fs';
import path from 'path';

// Load .env.local if available when running via node
if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const val = valueParts.join('=').trim();
      if (key && val && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k1h6wmz5';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  console.log('\n❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing in environment variables.');
  process.exit(1);
}

if (!token) {
  console.log('\n❌ SANITY_API_WRITE_TOKEN is missing in environment variables.');
  console.log('Running with user token check...');
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-09-24',
  useCdn: false,
});

async function migrate() {
  console.log('🚀 Starting Migration of Mock Data to Sanity CMS...');

  // 1. Migrate Developers
  const devMap = {};
  for (const dev of developers) {
    const doc = {
      _type: 'developer',
      _id: `dev-${dev.slug}`,
      name: dev.name,
      slug: { _type: 'slug', current: dev.slug },
      description: dev.description,
      featured: true,
    };
    const res = await client.createOrReplace(doc);
    devMap[dev.slug] = res._id;
    console.log(`  ✓ Developer: ${dev.name}`);
  }

  // 2. Migrate Locations
  const locMap = {};
  for (const loc of locations) {
    const doc = {
      _type: 'location',
      _id: `loc-${loc.slug}`,
      name: loc.name,
      slug: { _type: 'slug', current: loc.slug },
      category: loc.category || 'Popular',
      latitude: loc.latitude,
      longitude: loc.longitude,
      description: loc.description,
      lifestyle: loc.lifestyle,
      propertyTypes: loc.propertyTypes,
    };
    const res = await client.createOrReplace(doc);
    locMap[loc.slug] = res._id;
    console.log(`  ✓ Location: ${loc.name}`);
  }

  // 3. Migrate Properties
  for (const p of properties) {
    const doc = {
      _type: 'property',
      _id: `prop-${p.slug}`,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      developer: devMap[p.developerSlug] ? { _type: 'reference', _ref: devMap[p.developerSlug] } : undefined,
      location: locMap[p.locationSlug] ? { _type: 'reference', _ref: locMap[p.locationSlug] } : undefined,
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
      longitude: p.longitude,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Property: ${p.title}`);
  }

  // 4. Migrate Off-Plan Projects
  for (const proj of projects) {
    const doc = {
      _type: 'project',
      _id: `proj-${proj.slug}`,
      title: proj.title,
      slug: { _type: 'slug', current: proj.slug },
      developer: devMap[proj.developerSlug] ? { _type: 'reference', _ref: devMap[proj.developerSlug] } : undefined,
      location: locMap[proj.locationSlug] ? { _type: 'reference', _ref: locMap[proj.locationSlug] } : undefined,
      propertyType: proj.propertyType,
      purpose: proj.purpose,
      status: proj.status,
      price: proj.price,
      priceLabel: proj.priceLabel,
      bedrooms: proj.bedrooms,
      bathrooms: proj.bathrooms,
      area: proj.area,
      plotArea: proj.plotArea,
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
      description: proj.description,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Project: ${proj.title}`);
  }

  // 5. Migrate Articles / Blog
  for (const art of blog) {
    const doc = {
      _type: 'article',
      _id: `article-${art.slug}`,
      title: art.title,
      slug: { _type: 'slug', current: art.slug },
      category: art.category,
      date: art.date,
      readingTime: art.readingTime,
      author: art.author,
      summary: art.summary,
      contentSections: art.content,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Article: ${art.title}`);
  }

  // 6. Migrate Team Members
  for (let i = 0; i < team.length; i++) {
    const member = team[i];
    const doc = {
      _type: 'teamMember',
      _id: `team-${member.id}`,
      name: member.name,
      role: member.role,
      bio: member.bio,
      expertise: member.expertise,
      order: i + 1,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Team Member: ${member.name}`);
  }

  // 7. Migrate Testimonials
  for (const t of testimonials) {
    const doc = {
      _type: 'testimonial',
      _id: `testimonial-${t.id}`,
      quote: t.quote,
      name: t.name,
      approved: t.approved || false,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Testimonial: ${t.id}`);
  }

  console.log('\n✅ All mock items successfully migrated to Sanity CMS!');
}

migrate().catch(err => {
  console.error('\n❌ Migration failed:', err.message);
  process.exit(1);
});
