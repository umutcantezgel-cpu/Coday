import { defineType, defineField } from 'sanity';
import type { Rule } from 'sanity';

export const locationType = defineType({
  name: 'location',
  title: 'Location Page',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City / Region',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'city',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule: Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'benefits',
      title: 'Local Benefits',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Benefit Title' }),
            defineField({ name: 'description', type: 'text', title: 'Benefit Description' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Local FAQs',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Question' }),
            defineField({ name: 'answer', type: 'text', title: 'Answer' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'coordinates',
      title: 'Geo Coordinates',
      type: 'object',
      fields: [
        defineField({ name: 'latitude', type: 'number', title: 'Latitude' }),
        defineField({ name: 'longitude', type: 'number', title: 'Longitude' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'slug.current',
    },
  },
});
