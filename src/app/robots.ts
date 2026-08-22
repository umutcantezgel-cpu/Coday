import type { MetadataRoute } from 'next';

/**
 * Paths that should never be crawled by any bot.
 * These are test pages, internal tools, and duplicate routes.
 */
const BLOCKED_PATHS = [
  '/api/',
  '/studio/',
  '/preview/',
  '/_next/internal/',
  '/*/nav-test',
  '/*/page-stress-test',
  '/*/test-overlays',
  '/*/test-primitives',
  '/*/dashboard',
  '/*/work/work',
  '/*/work/projectdetail',
  '/*/knowledge/blogpost',
  '/*/community/calendar',
  '/*/community/marketplace',
  '/*/community/members',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Traditional search engines (SEO)
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot'],
        allow: '/',
        disallow: BLOCKED_PATHS,
        crawlDelay: 0,
      },
      {
        // Generative Engine Optimization (GEO) — Allow LLM crawlers
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'CCBot',
          'FacebookBot',
          'Applebot-Extended',
          'Amazonbot',
          'Cohere-ai',
          'YouBot',
        ],
        allow: '/',
        disallow: BLOCKED_PATHS,
      },
      {
        // Global fallback: allow public pages, block internal paths
        userAgent: '*',
        allow: '/',
        disallow: BLOCKED_PATHS,
      },
    ],
    sitemap: ['https://www.codayweb.de/sitemap.xml', 'https://www.codayweb.de/video-sitemap.xml'],
    host: 'https://www.codayweb.de',
  };
}
