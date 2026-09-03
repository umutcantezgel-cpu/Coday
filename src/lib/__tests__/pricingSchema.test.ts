import { describe, it, expect } from 'vitest';
import { BASE_URL, getPricingSchema, getFaqSchema } from '@/lib/schema';
import { PACKAGE_LIST } from '@/shared/data/packages';

describe('getPricingSchema', () => {
  it('keeps the stable @id and lists four price-less offers', () => {
    const schema = getPricingSchema('de') as Record<string, unknown> & {
      offers: { '@type': string; itemListElement: Array<Record<string, unknown>> };
    };
    expect(schema['@id']).toBe(`${BASE_URL}/de/pricing#pricing-product`);
    expect(schema['@type']).toEqual(['Service', 'Product']);
    expect(schema.offers['@type']).toBe('OfferCatalog');
    expect(schema.offers.itemListElement).toHaveLength(PACKAGE_LIST.length);
    expect(JSON.stringify(schema.offers)).not.toContain('"price"');
    expect(JSON.stringify(schema.offers)).not.toContain('priceValidUntil');

    const names = schema.offers.itemListElement.map((o) => o.name);
    expect(names).toEqual(PACKAGE_LIST.map((p) => p.name.de));
  });

  it('uses English names for the English locale', () => {
    const schema = getPricingSchema('en') as {
      offers: { itemListElement: Array<{ name: string }> };
    };
    expect(schema.offers.itemListElement[1].name).toBe(PACKAGE_LIST[1].name.en);
  });
});

describe('getFaqSchema', () => {
  it('maps FAQ items one-to-one', () => {
    const faq = getFaqSchema([{ question: 'Q?', answer: 'A.' }]);
    expect(faq.mainEntity).toHaveLength(1);
    expect(faq.mainEntity[0].name).toBe('Q?');
  });
});
