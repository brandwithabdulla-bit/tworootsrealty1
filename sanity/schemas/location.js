export default {
  name: 'location',
  title: 'Location / Area',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'lifestyle',
      title: 'Lifestyle Highlights',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'propertyTypes',
      title: 'Available Property Types',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
};
