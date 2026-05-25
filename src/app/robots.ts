import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  // Block everything on non-production environments
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

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
        disallow: [
          '/api/',
          '/studio/',
          '/preview/',
          '/_next/internal/',
        ],
      },
    ],
    sitemap: 'https://codayweb.de/sitemap.xml',
    host: 'https://codayweb.de',
  };
}
