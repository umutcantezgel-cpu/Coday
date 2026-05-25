import { BlogPosting } from 'schema-dts';
import { ORGANIZATION_ID, UMUT_ID } from './organization';

export interface BlogInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  tags?: string[];
  wordCount?: number;
}

export function generateBlogSchema(data: BlogInput): BlogPosting {
  return {
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    headline: data.title,
    description: data.description,
    image: data.imageUrl,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@id': UMUT_ID,
    },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    articleSection: data.category,
    ...(data.tags && data.tags.length > 0 ? { keywords: data.tags.join(', ') } : {}),
    ...(data.wordCount ? { wordCount: data.wordCount } : {}),
  };
}
