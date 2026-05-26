import { founderProfileType } from './founderProfile';
import { locationType } from './location';
import { blogPostType } from './blogPost';
import { categoryType } from './category';
import { testimonialType } from './testimonial';

export const schemaTypes = [
  // Content
  blogPostType,
  categoryType,

  // Business
  founderProfileType,
  testimonialType,

  // SEO / Local
  locationType,
];
