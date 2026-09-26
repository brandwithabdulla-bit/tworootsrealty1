export default {
  name: 'project',
  title: 'Off-Plan Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }]
    },
    {
      name: 'location',
      title: 'Location / Area',
      type: 'reference',
      to: [{ type: 'location' }]
    },
    {
      name: 'propertyType',
      title: 'Primary Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'Villa' },
          { title: 'Apartment', value: 'Apartment' },
          { title: 'Townhouse', value: 'Townhouse' },
          { title: 'Branded Residence', value: 'Branded Residence' },
          { title: 'Mixed Use', value: 'Mixed Use' }
        ]
      }
    },
    {
      name: 'purpose',
      title: 'Purpose',
      type: 'string',
      initialValue: 'Buy'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'Off-Plan'
    },
    {
      name: 'price',
      title: 'Starting Price (AED)',
      type: 'number'
    },
    {
      name: 'priceLabel',
      title: 'Price Label (e.g. From AED 5,091,251)',
      type: 'string'
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number'
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number'
    },
    {
      name: 'area',
      title: 'Built-up Area (sq ft)',
      type: 'number'
    },
    {
      name: 'plotArea',
      title: 'Plot Area (sq ft)',
      type: 'number'
    },
    {
      name: 'lifestyle',
      title: 'Lifestyle Category',
      type: 'string'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'handover',
      title: 'Handover Date',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'offPlan',
      title: 'Off-Plan Flag',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'investment',
      title: 'Investment Highlight Flag',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number'
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number'
    },
    {
      name: 'brochure',
      title: 'Brochure PDF File',
      type: 'file',
      options: { accept: '.pdf' }
    },
    {
      name: 'factsheet',
      title: 'Factsheet PDF File',
      type: 'file',
      options: { accept: '.pdf' }
    },
    {
      name: 'unitBreakdown',
      title: 'Unit Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Unit Type', type: 'string' },
            { name: 'price', title: 'Starting Price', type: 'string' },
            { name: 'plot', title: 'Plot Area', type: 'string' },
            { name: 'bua', title: 'Built-up Area', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'highlights',
      title: 'Key Project Highlights',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'paymentPlan',
      title: 'Payment Plan Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Milestone Label', type: 'string' },
            { name: 'percent', title: 'Percentage', type: 'number' },
            { name: 'date', title: 'Estimated Date', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text'
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }
  ]
};
