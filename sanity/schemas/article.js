export default {
  name: 'article',
  title: 'Insights & Blog Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Buying Guide', value: 'Buying Guide' },
          { title: 'Investment', value: 'Investment' },
          { title: 'Communities', value: 'Communities' },
          { title: 'Off-Plan', value: 'Off-Plan' },
          { title: 'Selling Guide', value: 'Selling Guide' },
          { title: 'Market Updates', value: 'Market Updates' },
          { title: 'Dubai Real Estate', value: 'Dubai Real Estate' }
        ]
      }
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'date'
    },
    {
      name: 'readingTime',
      title: 'Reading Time (e.g. 3 min read)',
      type: 'string'
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Two Roots Editorial'
    },
    {
      name: 'summary',
      title: 'Short Summary',
      type: 'text'
    },
    {
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Section Heading', type: 'string' },
            { name: 'text', title: 'Section Paragraph', type: 'text' }
          ]
        }
      ]
    }
  ]
};
