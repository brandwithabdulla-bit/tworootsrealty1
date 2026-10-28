export default {
  name: 'location',
  title: 'Location / Area',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Info', default: true },
    { name: 'guide', title: 'Area Guide (8 Pillars)' },
    { name: 'customGuide', title: 'Dynamic Guide Sections' },
  ],
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      group: 'general',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Location Tagline',
      type: 'string',
      group: 'general',
      description: 'Short catchy tagline for the location (e.g. "The Centre of Now & Landmark of Global Luxury")'
    },
    {
      name: 'image',
      title: 'Hero / Feature Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Popular', value: 'Popular' },
          { title: 'Emerging', value: 'Emerging' },
          { title: 'Investment', value: 'Investment' }
        ]
      },
      initialValue: 'Popular'
    },
    {
      name: 'description',
      title: 'Overview Description',
      type: 'text',
      group: 'general',
      rows: 4,
      description: 'Lead description of the location shown in the hero header section.'
    },
    {
      name: 'lifestyle',
      title: 'Lifestyle Highlights',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }]
    },
    {
      name: 'propertyTypes',
      title: 'Available Property Types',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }]
    },

    // ==========================================
    // 8 Core Area Guide Pillars
    // ==========================================
    {
      name: 'guideIntro',
      title: '1. An Introduction to (Location)',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "An Introduction to [Location]" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., District Heritage, Architectural Landmark, Masterplan' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideLifestyle',
      title: '2. Lifestyle and Living Experience',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Lifestyle and Living Experience" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Daily Atmosphere, Urban Energy, Waterfront Promenade' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideIdealFor',
      title: '3. Who is (Location) ideal for?',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Who is [Location] ideal for?" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Demographics, Target Residents, Cosmopolitans & Expats' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideConnectivity',
      title: '4. Connectivity and strategic location',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Connectivity and strategic location" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Arterial Corridors & Red Line Transit' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' },
        {
          name: 'subsections',
          title: 'Sub-Sections (e.g. Road connectivity, Public transport)',
          type: 'array',
          description: 'Add specific sub-topics like Road connectivity and Public transport with individual descriptions',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'subtitle', title: 'Sub Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 }
              ],
              preview: {
                select: { title: 'subtitle', subtitle: 'description' }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'guidePropertyLandscape',
      title: '5. Property landscape and housing choices',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Property landscape and housing choices" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., High-Rise Penthouses, Low-Rise Boulevards, Waterfront Mansions' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideInvestment',
      title: '6. Investment potential and growth drivers',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Investment potential and growth drivers" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Rental Yields, Capital Growth, Short-Term Rental Demand' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideConveniences',
      title: '7. Everyday conveniences and Nearby destinations',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "Everyday conveniences and Nearby destinations" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Retail Malls, Schools, Healthcare & Leisure' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },
    {
      name: 'guideFuture',
      title: '8. The future of (Location)',
      type: 'object',
      group: 'guide',
      description: 'Leave description empty if you do not want this section or its title to appear on the website.',
      fields: [
        { name: 'title', title: 'Custom Title (Optional)', type: 'string', description: 'Defaults to "The future of [Location]" if blank' },
        { name: 'subtitle', title: 'Sub Title', type: 'string', description: 'E.g., Upcoming Infrastructure, Masterplan Extensions' },
        { name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Required to display. If left blank, this section title will NOT show on the website.' }
      ]
    },

    // ==========================================
    // Dynamic Guide Sections (Array)
    // ==========================================
    {
      name: 'guideSections',
      title: 'Dynamic Guide Sections (Add Any Topic)',
      type: 'array',
      group: 'customGuide',
      description: 'Add, reorder, or supplement custom sections dynamically. If an item has no description, it will NOT be displayed.',
      of: [
        {
          type: 'object',
          name: 'guideSectionItem',
          title: 'Guide Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Title of the section (e.g. "Community Character" or "The future of Downtown Dubai")'
            },
            {
              name: 'subtitle',
              title: 'Sub Title',
              type: 'string',
              description: 'Subtitle (e.g. "Road connectivity & metro access")'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              description: 'If left empty, this section title will NOT show on the website.'
            },
            {
              name: 'subsections',
              title: 'Sub-Sections (Optional)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'subtitle', title: 'Sub Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 3 }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              desc: 'description'
            },
            prepare({ title, subtitle, desc }) {
              return {
                title: title || 'Untitled Section',
                subtitle: subtitle || (desc ? desc.slice(0, 50) + '...' : '(No description - will not show)')
              };
            }
          }
        }
      ]
    }
  ]
};
