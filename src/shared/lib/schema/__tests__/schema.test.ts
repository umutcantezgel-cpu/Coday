
import { describe, expect, it } from 'vitest';
import {
    generateBlogSchema,
    generateBreadcrumbSchema,
    generateCaseStudySchema,
    generateFAQSchema,
    generateServiceSchema,
    getOrganizationSchema,
    getUmutSchema,
    ORGANIZATION_ID,
    UMUT_ID
} from '../index';

describe('JSON-LD Schema Generators', () => {
  it('should generate valid Organization and Person schemas', () => {
    const org = getOrganizationSchema() as unknown as Record<string, unknown>;
    expect(org['@type']).toBe('Organization');
    expect(org['@id']).toBe(ORGANIZATION_ID);

    const person = getUmutSchema() as unknown as Record<string, unknown>;
    expect(person['@type']).toBe('Person');
    expect(person['@id']).toBe(UMUT_ID);
  });

  it('should generate valid Service schema', () => {
    const schema = generateServiceSchema({
      name: 'Headless CMS Development',
      description: 'We build headless CMS solutions using Sanity.',
      url: 'https://codayweb.de/services/headless-cms',
      category: 'Web Development',
      packages: [
        { name: 'Basic', description: 'Basic setup', price: 999, currency: 'EUR' }
      ]
    });

    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBe('Headless CMS Development');
    expect(schema.serviceType).toBe('Web Development');
    const offerCatalog = schema.hasOfferCatalog as unknown as Record<string, unknown>;
    expect((offerCatalog.itemListElement! as unknown[])).toHaveLength(1);
    expect((offerCatalog.itemListElement! as Record<string, unknown>[])[0]!.price).toBe(999);
  });

  it('should generate valid BlogPosting schema', () => {
    const schema = generateBlogSchema({
      title: 'SEO in 2026',
      description: 'How GEO is changing everything.',
      url: 'https://codayweb.de/knowledge/blog/seo-2026',
      imageUrl: 'https://codayweb.de/images/blog.webp',
      datePublished: '2026-05-23T10:00:00Z',
      category: 'SEO',
      tags: ['GEO', 'Next.js'],
      wordCount: 1500
    });

    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('SEO in 2026');
    expect(schema.wordCount).toBe(1500);
    expect(schema.keywords).toBe('GEO, Next.js');
  });

  it('should generate valid FAQPage schema', () => {
    const schema = generateFAQSchema([
      { question: 'What is Next.js?', answer: 'A React framework.' }
    ]);

    expect(schema).not.toBeNull();
    expect(schema!['@type']).toBe('FAQPage');
    const mainEntity = schema!.mainEntity! as unknown as Record<string, unknown>[];
    expect(mainEntity[0]!.name).toBe('What is Next.js?');
  });

  it('should return null for empty FAQ array', () => {
    const schema = generateFAQSchema([]);
    expect(schema).toBeNull();
  });

  it('should generate valid CreativeWork for Case Study', () => {
    const schema = generateCaseStudySchema({
      title: 'Redesigning Coday',
      description: 'A complete overhaul using Next.js 15.',
      url: 'https://codayweb.de/work/coday-redesign',
      imageUrl: 'https://codayweb.de/images/work.webp',
      dateCreated: '2025-01-01',
      clientName: 'Coday Internal',
      technologies: ['Next.js', 'Tailwind']
    });

    expect(schema['@type']).toBe('CreativeWork');
    const sourceOrg = schema.sourceOrganization as unknown as Record<string, unknown>;
    expect(sourceOrg.name).toBe('Coday Internal');
    expect(schema.keywords).toBe('Next.js, Tailwind');
  });

  it('should generate valid BreadcrumbList', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://codayweb.de' },
      { name: 'Services', url: 'https://codayweb.de/services' }
    ]);

    expect(schema).not.toBeNull();
    expect(schema!['@type']).toBe('BreadcrumbList');
    const itemListElement = schema!.itemListElement! as unknown as Record<string, unknown>[];
    expect(itemListElement[1]!.position).toBe(2);
  });
});
