import { CreativeWork } from 'schema-dts';
import { ORGANIZATION_ID } from './organization';

export interface CaseStudyInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  dateCreated: string;
  dateModified?: string;
  clientName?: string;
  technologies?: string[];
  projectUrl?: string;
}

export function generateCaseStudySchema(data: CaseStudyInput): CreativeWork {
  return {
    '@type': 'CreativeWork',
    headline: data.title,
    description: data.description,
    image: data.imageUrl,
    url: data.url,
    creator: {
      '@id': ORGANIZATION_ID,
    },
    dateCreated: data.dateCreated,
    dateModified: data.dateModified || data.dateCreated,
    ...(data.clientName
      ? {
          sourceOrganization: {
            '@type': 'Organization',
            name: data.clientName,
          },
        }
      : {}),
    ...(data.technologies && data.technologies.length > 0
      ? { keywords: data.technologies.join(', ') }
      : {}),
    ...(data.projectUrl
      ? {
          workExample: {
            '@type': 'WebSite',
            url: data.projectUrl,
          },
        }
      : {}),
  };
}
