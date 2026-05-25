import { defineField, defineType } from 'sanity';

export const founderProfileType = defineType({
  name: 'founderProfile',
  title: 'Founder Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio_de',
      title: 'Bio (DE)',
      type: 'text',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio (EN)',
      type: 'text',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});
