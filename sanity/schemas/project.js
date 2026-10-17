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
          { title: 'Mixed Use', value: 'Mixed Use' },
          { title: 'Community Living', value: 'Community Living' },
          { title: 'Commercial', value: 'Commercial' }
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
      name: 'area',
      title: 'Built-up Area (sq ft)',
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
      name: 'mapUrl',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Paste any Google Maps link (e.g. https://maps.app.goo.gl/... or google.com/maps/place/...). Coordinates are automatically parsed for the Interactive Map.'
    },
    {
      name: 'unitBreakdown',
      title: 'Unit Breakdown / Unit Options',
      type: 'string',
      description: 'Single text box for unit options (e.g. 1 - 4 Bedrooms, Studio to 3 Beds, or 4 Bedrooms)'
    },
    {
      name: 'highlights',
      title: 'Key Project Highlights',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'downPayment',
      title: 'Down Payment',
      type: 'string',
      description: 'Down payment percentage or amount (e.g. 10%, 20%, or AED 150,000) displayed in the overview card'
    },
    {
      name: 'paymentPlan',
      title: 'Payment Plan',
      type: 'string',
      description: 'Single payment plan summary (e.g. 80/20, 60/40, or 70/30 on Handover)'
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
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      description: 'Primary hero image displayed at the top of the individual project page. If not uploaded, the first gallery image is used as fallback.',
      options: { hotspot: true }
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }
  ]
};
