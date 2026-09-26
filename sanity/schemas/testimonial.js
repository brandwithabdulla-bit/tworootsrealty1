export default {
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote / Testimonial Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Role or Designation (e.g. Property Investor)',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location or Country',
      type: 'string'
    },
    {
      name: 'avatar',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'approved',
      title: 'Approved for Display',
      type: 'boolean',
      initialValue: false
    }
  ]
};
