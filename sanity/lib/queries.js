import { groq } from 'next-sanity';

// Properties GROQ Queries
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    "developer": developer->name,
    "developerSlug": developer->slug.current,
    "location": location->name,
    "locationSlug": location->slug.current,
    propertyType,
    purpose,
    status,
    price,
    priceLabel,
    bedrooms,
    bathrooms,
    area,
    handover,
    shortDescription,
    description,
    amenities,
    paymentPlan,
    "images": images[].asset->url,
    "gallery": images[].asset->url,
    featured,
    offPlan,
    ready,
    investment,
    latitude,
    longitude,
    "brochure": brochure.asset->url
  }
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    "developer": developer->name,
    "developerSlug": developer->slug.current,
    "location": location->name,
    "locationSlug": location->slug.current,
    propertyType,
    purpose,
    status,
    price,
    priceLabel,
    bedrooms,
    bathrooms,
    area,
    handover,
    shortDescription,
    description,
    amenities,
    paymentPlan,
    "images": images[].asset->url,
    "gallery": images[].asset->url,
    featured,
    offPlan,
    ready,
    investment,
    latitude,
    longitude,
    "brochure": brochure.asset->url
  }
`;

// Off-Plan Projects GROQ Queries
export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    "developer": developer->name,
    "developerSlug": developer->slug.current,
    "location": location->name,
    "locationSlug": location->slug.current,
    propertyType,
    purpose,
    status,
    price,
    priceLabel,
    bedrooms,
    bathrooms,
    area,
    plotArea,
    lifestyle,
    tags,
    handover,
    featured,
    offPlan,
    investment,
    latitude,
    longitude,
    "brochure": brochure.asset->url,
    "factsheet": factsheet.asset->url,
    unitBreakdown,
    highlights,
    paymentPlan,
    amenities,
    description,
    "images": images[].asset->url,
    "gallery": images[].asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    "developer": developer->name,
    "developerSlug": developer->slug.current,
    "location": location->name,
    "locationSlug": location->slug.current,
    propertyType,
    purpose,
    status,
    price,
    priceLabel,
    bedrooms,
    bathrooms,
    area,
    plotArea,
    lifestyle,
    tags,
    handover,
    featured,
    offPlan,
    investment,
    latitude,
    longitude,
    "brochure": brochure.asset->url,
    "factsheet": factsheet.asset->url,
    unitBreakdown,
    highlights,
    paymentPlan,
    amenities,
    description,
    "images": images[].asset->url,
    "gallery": images[].asset->url
  }
`;

// Developers GROQ Query
export const allDevelopersQuery = groq`
  *[_type == "developer"] | order(name asc) {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    "logo": logo.asset->url,
    "coverImage": coverImage.asset->url,
    description,
    featured
  }
`;

// Locations GROQ Query
export const allLocationsQuery = groq`
  *[_type == "location"] | order(name asc) {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    category,
    latitude,
    longitude,
    description,
    lifestyle,
    propertyTypes
  }
`;

// Articles / Insights GROQ Query
export const allArticlesQuery = groq`
  *[_type == "article"] | order(date desc) {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    category,
    "image": image.asset->url,
    date,
    readingTime,
    author,
    summary,
    contentSections
  }
`;

// Testimonials GROQ Query
export const approvedTestimonialsQuery = groq`
  *[_type == "testimonial" && approved == true] {
    _id,
    "id": _id,
    quote,
    name,
    role,
    location,
    "avatar": avatar.asset->url
  }
`;

// Team Members GROQ Query
export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    "id": _id,
    name,
    role,
    "image": image.asset->url,
    bio,
    expertise
  }
`;
