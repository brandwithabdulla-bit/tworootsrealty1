export default {
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Developer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Developer Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'featured',
      title: 'Featured Developer',
      type: 'boolean',
      initialValue: false
    }
  ]
};
