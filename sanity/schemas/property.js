export default {
  name: 'property',
  title: 'Property Listing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Property Title',
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
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }]
    },
    {
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'Apartment' },
          { title: 'Villa', value: 'Villa' },
          { title: 'Townhouse', value: 'Townhouse' },
          { title: 'Mansion', value: 'Mansion' },
          { title: 'Branded Residence', value: 'Branded Residence' },
          { title: 'Commercial', value: 'Commercial' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'purpose',
      title: 'Purpose',
      type: 'string',
      options: {
        list: [
          { title: 'Buy', value: 'Buy' },
          { title: 'Rent', value: 'Rent' },
          { title: 'Invest', value: 'Invest' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Off-Plan', value: 'Off-Plan' },
          { title: 'Ready', value: 'Ready' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (AED)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'priceLabel',
      title: 'Custom Price Label (e.g. AED 2,450,000 / year)',
      type: 'string'
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      initialValue: 1
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      initialValue: 1
    },
    {
      name: 'area',
      title: 'Area (sq ft)',
      type: 'number'
    },
    {
      name: 'handover',
      title: 'Handover Date',
      type: 'string'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text'
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'paymentPlan',
      title: 'Payment Plan Milestones',
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
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'offPlan',
      title: 'Off-Plan Flag',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ready',
      title: 'Ready Flag',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'investment',
      title: 'Investment Highlight Flag',
      type: 'boolean',
      initialValue: false
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
      title: 'Brochure PDF',
      type: 'file',
      options: { accept: '.pdf' }
    }
  ]
};
