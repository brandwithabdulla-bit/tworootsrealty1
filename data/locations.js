import {slugify} from './developers.js';
import {images} from './images.js';

const names = [
  'Downtown Dubai',
  'Business Bay',
  'Dubai Creek Harbour',
  'Dubai Hills Estate',
  'Dubai South',
  'Palm Jebel Ali',
  'Dubai Islands',
  'Dubai Marina',
  'Jumeirah Village Circle',
  'Meydan',
  'Al Furjan',
  'Rashid Yachts & Marina',
  'Expo City',
  'Ras Al Khaimah'
];

const coords = [
  [25.1972, 55.2744],
  [25.185, 55.265],
  [25.207, 55.345],
  [25.106, 55.247],
  [24.948, 55.154],
  [24.997, 54.986],
  [25.307, 55.306],
  [25.081, 55.14],
  [25.059, 55.208],
  [25.154, 55.299],
  [25.026, 55.144],
  [25.273, 55.278],
  [24.96, 55.15],
  [25.789, 55.943]
];

const downtownGuide = {
  tagline: "The Centre of Now & Landmark of Global Luxury",
  description: "Downtown Dubai is the district Emaar built around the Burj Khalifa, the Dubai Mall and the Dubai Fountain. It is the most central address in the city and the most recognisable, which shapes everything about buying here: prices per square foot sit at the top of the mainstream market, and demand comes as much from short-let investors as from residents.",
  guideIntro: {
    title: "An Introduction to Downtown Dubai",
    subtitle: "The Architectural Heart of the Metropolis",
    description: "Conceived as the flagship master community of Dubai, Downtown stands as a testament to world-record ambition. Centred around the soaring Burj Khalifa and the 12-million-square-foot Dubai Mall, the district blends high-density corporate stature with pedestrian-friendly boulevards and cultural landmarks like Dubai Opera."
  },
  guideLifestyle: {
    title: "Lifestyle and Living Experience",
    subtitle: "Cosmopolitan Vibrancy & Boulevard Leisure",
    description: "Life in Downtown is defined by energy, prestige, and continuous movement. Residents step out directly onto Mohammed Bin Rashid Boulevard, lined with high-end cafes, global fine dining, and public art installations. Evening strolls offer direct views of the Dubai Fountain choreographies and luminous Burj Khalifa light spectacles."
  },
  guideIdealFor: {
    title: "Who is Downtown Dubai ideal for?",
    subtitle: "Global Executives, High-Yield Investors & Urbanites",
    description: "Downtown is tailor-made for international executives, creative professionals, and luxury seekers who thrive in a vibrant 24/7 urban core. It also attracts short-stay holidaymakers and high-net-worth individuals seeking a prestigious secondary home in the world’s most recognizable skyline."
  },
  guideConnectivity: {
    title: "Connectivity and strategic location",
    subtitle: "Arterial Corridors & Red Line Transit",
    description: "Strategically positioned in central Dubai, Downtown provides unmatched road and rapid transit connections across the emirate.",
    subsections: [
      {
        subtitle: "Road connectivity",
        description: "The district sits on Sheikh Zayed Road (E11) with Financial Centre Road running through it. Business Bay is immediately south, DIFC is a few minutes north, and Dubai International Airport is around twenty minutes outside peak hours.\n\nThe trade-off is congestion. Downtown carries heavy traffic through the day, and the roads around the Dubai Mall become slow in the evenings and at weekends. Residents who drive daily tend to price a parking space into the decision."
      },
      {
        subtitle: "Public transport",
        description: "Burj Khalifa/Dubai Mall station sits on the Red Line, connecting the district to DIFC, Dubai Marina and the airport without a car. Downtown is one of the few Dubai communities where living without a vehicle is genuinely workable, which matters for tenant demand."
      }
    ]
  },
  guidePropertyLandscape: {
    title: "Property landscape and housing choices",
    subtitle: "From High-Rise Penthouses to Heritage Arabesque Residences",
    description: "Downtown offers architectural diversity spanning from ultra-modern glass towers like Burj Crown and Address branded residences to the low-rise, terracotta-hued charm of Old Town and Old Town Island. Penthouses and sky villas offer panoramic fountain views, commanding the highest premiums in the city."
  },
  guideInvestment: {
    title: "Investment potential and growth drivers",
    subtitle: "Blue-Chip Capital Resilience & Premium Rental Yields",
    description: "Downtown Dubai ranks consistently among the highest liquidity districts in the Middle East. High tourist footfall fuels exceptionally lucrative short-term holiday home returns (averaging 7% to 9% gross yields), while prime fountain-view assets appreciate steadily alongside global wealth inflow."
  },
  guideConveniences: {
    title: "Everyday conveniences and Nearby destinations",
    subtitle: "World-Class Retail, Healthcare and Cultural Attractions",
    description: "Everything is within walking distance: The Dubai Mall provides over 1,200 retail stores, medical clinics, and gourmet supermarkets, Dubai Opera delivers world-class performing arts, and Burj Park offers green open lawns for community events, jogging, and pet walking."
  },
  guideFuture: {
    title: "The future of Downtown Dubai",
    subtitle: "Smart City Upgrades & Ultra-Luxury Branded Expansions",
    description: "With limited remaining development parcels, Downtown is transitioning into an ultra-exclusive scarce-supply market. Ongoing enhancements in pedestrian micro-mobility, autonomous transport links to DIFC, and new flagship design collaborations ensure its status as Dubai’s perpetual centre."
  }
};

export const locations = names.map((name, i) => {
  const isDowntown = name === 'Downtown Dubai';
  return {
    id: `area-${i+1}`,
    name,
    slug: slugify(name),
    image: Object.values(images)[i % 6],
    latitude: coords[i][0],
    longitude: coords[i][1],
    category: [0, 1, 2, 3, 7].includes(i) ? 'Popular' : i % 2 ? 'Emerging' : 'Investment',
    tagline: isDowntown 
      ? downtownGuide.tagline 
      : `${name} — Dubai Prime Community & Residences`,
    description: isDowntown 
      ? downtownGuide.description 
      : `Discover ${name} through the places, homes and everyday priorities that matter to you. This community guide connects representative property types with a starting point for a personal conversation.`,
    lifestyle: [
      'Consider your everyday journey and commute',
      'Compare neighbourhood amenities and parks',
      'Visit at different times of day'
    ],
    propertyTypes: i % 3 === 0 ? ['Apartment', 'Townhouse'] : ['Apartment', 'Villa', 'Mansion'],
    ...(isDowntown ? {
      guideIntro: downtownGuide.guideIntro,
      guideLifestyle: downtownGuide.guideLifestyle,
      guideIdealFor: downtownGuide.guideIdealFor,
      guideConnectivity: downtownGuide.guideConnectivity,
      guidePropertyLandscape: downtownGuide.guidePropertyLandscape,
      guideInvestment: downtownGuide.guideInvestment,
      guideConveniences: downtownGuide.guideConveniences,
      guideFuture: downtownGuide.guideFuture
    } : {}),
    demo: true
  };
});
