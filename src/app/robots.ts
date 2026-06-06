import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Traditional search engines (SEO)
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot'],
        allow: '/',
        crawlDelay: 0,
      },
      {
        // Generative Engine Optimization (GEO) — Allow LLM crawlers
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'CCBot',
          'FacebookBot',
        ],
        allow: '/',
      },
      {
        // Global fallback: allow public pages, block internal paths
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/preview/', '/_next/internal/'],
      },
    ],
    sitemap: 'https://www.codayweb.de/sitemap.xml',
    host: 'https://www.codayweb.de',
  };
}
