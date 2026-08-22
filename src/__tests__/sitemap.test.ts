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
    expect(urls).toContain('https://www.codayweb.de/de/knowledge/academy');
    expect(urls).toContain('https://www.codayweb.de/en/knowledge/academy');
  });

  it('should generate valid Google Video Sitemap XML with all academy videos', async () => {
    const { GET } = await import('@/app/video-sitemap.xml/route');
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('application/xml');

    const xml = await response.text();
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    expect(xml).toContain(
      'https://www.codayweb.de/videos/academy/5_Fragen_an_Ihre_Web-Agentur.mp4'
    );
    expect(xml).toContain('https://www.codayweb.de/videos/academy/Aus_Besuchern_werden_Kunden.mp4');
    expect(xml).toContain(
      'https://www.codayweb.de/videos/academy/Die_Ultimative_SEO_Strategie.mp4'
    );
    expect(xml).toContain('https://www.codayweb.de/videos/academy/GOOGLE-BEWERTUNGEN_MEISTERN.mp4');
    expect(xml).toContain(
      'https://www.codayweb.de/videos/academy/SO_KOMMEN_BESUCHER_AUF_DEINE_SEITE.mp4'
    );
    expect(xml).toContain(
      'https://www.codayweb.de/videos/academy/WAS_KOSTET_EINE_WEBSITE_WIRKLICH_.mp4'
    );
    expect(xml).toContain(
      'https://www.codayweb.de/videos/academy/Website__Magnet_oder_Schreck_.mp4'
    );
    expect(xml).toContain('<video:duration>765</video:duration>');
    expect(xml).toContain('<video:tag><![CDATA[Webdesign Wetzlar]]></video:tag>');
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
