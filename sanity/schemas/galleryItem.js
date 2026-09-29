export default {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      description: 'Optional descriptive title for the gallery item'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Waterfront', value: 'Waterfront' },
          { title: 'Villas', value: 'Villas' },
          { title: 'Mansions', value: 'Mansions' },
          { title: 'Architecture', value: 'Architecture' },
          { title: 'Interiors', value: 'Interiors' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Gallery Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || subtitle || 'Gallery Image',
        subtitle: subtitle || '',
        media
      };
    }
  }
};
