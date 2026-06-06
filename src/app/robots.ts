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
