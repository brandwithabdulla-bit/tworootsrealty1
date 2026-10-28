import {images} from './images.js';
import {slugify} from './developers.js';

const entries = [
  [
    'Buying Guide',
    'A better shortlist starts with better questions',
    'Navigating Dubai’s luxury market with clarity, precision, and discerning questions.'
  ],
  [
    'Investment',
    'Look beyond the purchase price',
    'Real yield performance, true holding costs, and long-term capital preservation.'
  ],
  [
    'Communities',
    'Finding a neighbourhood that fits your life',
    'Why master-planned livability outweighs mere geographical address.'
  ],
  [
    'Off-Plan',
    'Reading a payment plan with perspective',
    'Decoding milestones, escrow safeguards, and post-handover dynamics.'
  ],
  [
    'Selling Guide',
    'Preparing your property for its next chapter',
    'Strategic staging and pricing intelligence for prime Dubai residences.'
  ],
  [
    'Market Updates',
    'What to bring to a market conversation',
    'Key metrics that matter when analyzing Dubai real estate cycles.'
  ],
  [
    'Dubai Real Estate',
    'A clear brief for your Dubai property search',
    'From vision to keys — crafting an uncompromising property search.'
  ]
];

export const blog = entries.map(([category, title, slogan], i) => ({
  id: `article-${i+1}`,
  slug: slugify(title),
  title,
  slogan,
  category,
  image: Object.values(images)[i % 6],
  date: '2026-09-01',
  readingTime: '3 min read',
  author: 'Two Roots Editorial Team',
  summary: 'A considered starting point for a conversation about your next property decision.',
  demo: true,
  content: [
    {
      heading: 'Start with your priorities',
      text: 'Write down what matters most: the purpose of the property, your preferred timeline, the space you need and the places you want to be close to. A clear brief makes it easier to compare options consistently.'
    },
    {
      heading: 'Make room for the details',
      text: 'Ask what information is confirmed, what is provisional and what still needs checking. Keep documents, questions and assumptions together so each conversation builds on the last.'
    },
    {
      heading: 'Take the next step with context',
      text: 'Bring your shortlist and questions to a Two Roots advisor to explore tailored opportunities and receive dedicated guidance.'
    }
  ]
}));
