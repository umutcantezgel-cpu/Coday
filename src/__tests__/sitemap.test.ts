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
    expect(urls).toContain('https://www.codayweb.de/de/webdesign-weilburg');
    expect(urls).toContain('https://www.codayweb.de/de/webdesign-loehnberg');
    expect(urls).toContain('https://www.codayweb.de/en/webdesign-loehnberg');
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
    const { getBlogPosts } = await import('@/features/blog/model/data');
    const deSlugs = new Set(getBlogPosts('de').map((p) => p.slug));
    const enSlugs = new Set(getBlogPosts('en').map((p) => p.slug));

    const entries = await sitemap();

    const deBlogEntries = entries.filter((e) =>
      e.url.startsWith('https://www.codayweb.de/de/knowledge/blog/')
    );
    expect(deBlogEntries.length).toBeGreaterThan(0);

    // hreflang alternates must point at slugs that actually exist in the target locale
    for (const entry of deBlogEntries) {
      const languages = entry.alternates?.languages as Record<string, string> | undefined;
      expect(languages).toBeDefined();
      expect(languages?.de).toBe(entry.url);
      if (languages?.en) {
        const enSlug = languages.en.replace('https://www.codayweb.de/en/knowledge/blog/', '');
        expect(enSlugs.has(enSlug)).toBe(true);
      }
    }

    const enBlogEntries = entries.filter((e) =>
      e.url.startsWith('https://www.codayweb.de/en/knowledge/blog/')
    );
    for (const entry of enBlogEntries) {
      const languages = entry.alternates?.languages as Record<string, string> | undefined;
      expect(languages).toBeDefined();
      expect(languages?.en).toBe(entry.url);
      if (languages?.de) {
        const deSlug = languages.de.replace('https://www.codayweb.de/de/knowledge/blog/', '');
        expect(deSlugs.has(deSlug)).toBe(true);
      }
    }
  });

  it('should have unique post ids per locale and symmetric blog hreflang pairs', async () => {
    const { getBlogPosts } = await import('@/features/blog/model/data');
    const dePosts = getBlogPosts('de');
    const enPosts = getBlogPosts('en');

    // Duplicate ids within a locale silently break id-based translation matching
    for (const posts of [dePosts, enPosts]) {
      const ids = posts.map((p) => String(p.id));
      expect(new Set(ids).size).toBe(ids.length);
    }

    const entries = await sitemap();
    const blogEntries = entries.filter((e) => e.url.includes('/knowledge/blog/'));
    const urls = new Set(blogEntries.map((e) => e.url));

    for (const entry of blogEntries) {
      const languages = entry.alternates?.languages as Record<string, string> | undefined;
      expect(languages).toBeDefined();
      if (!languages) continue;

      // Every alternate (x-default included) must be a URL that exists in the sitemap,
      // i.e. never a redirecting slug
      for (const href of Object.values(languages)) {
        expect(urls.has(href)).toBe(true);
      }

      // Symmetry: the counterpart entry must link back to this entry
      const isDe = entry.url.includes('/de/knowledge/blog/');
      const counterpartHref = isDe ? languages.en : languages.de;
      if (counterpartHref) {
        const counterpart = blogEntries.find((e) => e.url === counterpartHref);
        expect(counterpart).toBeDefined();
        const counterpartLangs = counterpart?.alternates?.languages as
          | Record<string, string>
          | undefined;
        expect(counterpartLangs?.[isDe ? 'de' : 'en']).toBe(entry.url);
      }
    }
  });

  it('should not contain URLs that redirect (sitemap must be 200-only)', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    // Removed programmatic /ai/ landing pages answer 410 Gone via middleware
    expect(urls.some((url) => url.includes('/ai/'))).toBe(false);

    // Known permanent redirects (next.config.ts / page-level permanentRedirect).
    // The check below is endsWith, so every path must be written in full — a
    // shortened '/branchen/gastronomie' would match the live winner instead.
    const REDIRECTING_PATHS = [
      '/standorte/giessen',
      '/standorte/wetzlar',
      '/branchen/gesundheitswesen',
      '/branchen/handwerker',
      '/work/red-chillies',
      '/work/akan-dienstleistungen',
      '/work/prestige-estates',
      '/work/red-flames',
      '/work/fitflow',
      '/work/hotel-zur-post',
      '/work/memo-baut',
      // Cannibalising duplicates folded into their canonical owner
      '/services/growth/seo-optimization',
      '/services/growth/performance-optimization',
      '/services/growth/digital-consulting',
      '/services/web-design/ux-ui-design',
      '/services/web-design/website-relaunch',
      '/services/web-development/react-nextjs-agentur',
      '/services/web-development/full-stack-entwicklung',
      '/services/web-development/cloud-infrastructure',
      '/services/web-development/e-commerce-shops',
      '/branchen/gastronomie-hotellerie',
      '/branchen/handwerker/wetzlar',
      '/branchen/gesundheitswesen/arzt-wetzlar',
      '/branchen/gesundheitswesen/arzt-giessen',
    ];
    for (const path of REDIRECTING_PATHS) {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    }

    // Root must appear only as canonical /de and /en — never bare, http or non-www
    expect(urls).toContain('https://www.codayweb.de/de');
    expect(urls).toContain('https://www.codayweb.de/en');
    expect(urls.every((url) => url.startsWith('https://www.codayweb.de/'))).toBe(true);
    expect(
      urls.some((url) => url === 'https://www.codayweb.de' || url === 'https://www.codayweb.de/')
    ).toBe(false);
  });
});
