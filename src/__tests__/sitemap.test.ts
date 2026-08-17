import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('Sitemap Technical SEO Validation', () => {
  it('should generate valid sitemap entries without noindex legal routes', async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0);

    const urls = entries.map((e) => e.url);

    // Verify legal routes are NOT in sitemap (as they have noindex tags)
    expect(urls.some((url) => url.includes('/legal/impressum'))).toBe(false);
    expect(urls.some((url) => url.includes('/legal/datenschutz'))).toBe(false);
    expect(urls.some((url) => url.includes('/legal/agb'))).toBe(false);
  });

  it('should include money landing pages and career routes', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain('https://www.codayweb.de/de/career/culture');
    expect(urls).toContain('https://www.codayweb.de/de/landingpages/nextjsmigration');
    expect(urls).toContain('https://www.codayweb.de/de/standorte/hessen');
    expect(urls).toContain('https://www.codayweb.de/de/webdesign-agentur-wetzlar');
  });

  it('should not cross-reference invalid foreign slugs for blog posts in alternates', async () => {
    const entries = await sitemap();

    const deBlogEntries = entries.filter((e) =>
      e.url.startsWith('https://www.codayweb.de/de/knowledge/blog/')
    );
    expect(deBlogEntries.length).toBeGreaterThan(0);

    // Each DE blog post should only have 'de' and 'x-default' in alternates.languages
    for (const entry of deBlogEntries) {
      const languages = entry.alternates?.languages as Record<string, string> | undefined;
      expect(languages).toBeDefined();
      expect(languages?.de).toBe(entry.url);
      expect(languages?.en).toBeUndefined();
    }

    const enBlogEntries = entries.filter((e) =>
      e.url.startsWith('https://www.codayweb.de/en/knowledge/blog/')
    );
    for (const entry of enBlogEntries) {
      const languages = entry.alternates?.languages as Record<string, string> | undefined;
      expect(languages).toBeDefined();
      expect(languages?.en).toBe(entry.url);
      expect(languages?.de).toBeUndefined();
    }
  });
});
