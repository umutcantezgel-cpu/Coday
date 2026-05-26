import { defineField, defineType } from 'sanity';
import type { Rule } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
    }),
    defineField({
      name: 'quote_de',
      title: 'Quote (DE)',
      type: 'text',
      rows: 4,
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'quote_en',
      title: 'Quote (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Client Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (rule: Rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'company',
      media: 'image',
    },
  },
});
