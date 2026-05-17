/**
 * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
 * Generator: scripts/generate-data-endpoints.cjs
 * Generated at: 2026-05-14T23:15:16.030Z
 */

export interface DataEndpointSchema {
  field: string;
  type: string;
  description: string;
}

export interface DataEndpoint {
  slug: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  license: string;
  endpoints: {
    json: string;
    csv: string;
  };
  schema: DataEndpointSchema[];
  sampleData: Record<string, string | number>[];
}

export const aiDataEndpoints: DataEndpoint[] = [
  {
    slug: 'cwv-dach-benchmarks',
    title: 'Core Web Vitals DACH Benchmarks 2025',
    description: 'Aggregated Core Web Vitals metrics for Top 10,000 domains in DACH.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.029Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/cwv-dach-benchmarks/json',
      csv: '/api/data/cwv-dach-benchmarks/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'nextjs-adoption-rate',
    title: 'Next.js Adoption Rate Enterprise',
    description: 'Market share and adoption velocity of Next.js among enterprise websites.',
    category: 'Technology Adoption',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/nextjs-adoption-rate/json',
      csv: '/api/data/nextjs-adoption-rate/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'gdpr-compliance-scan',
    title: 'GDPR Consent Banner Compliance',
    description: 'Scan results of cookie banner implementations and explicit consent tracking.',
    category: 'Technology Adoption',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/gdpr-compliance-scan/json',
      csv: '/api/data/gdpr-compliance-scan/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'mobile-first-index-delays',
    title: 'Mobile-First Indexing Timeline',
    description: 'Data on crawl budget allocation and mobile-first transition timelines.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/mobile-first-index-delays/json',
      csv: '/api/data/mobile-first-index-delays/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'ecommerce-cart-abandonment',
    title: 'B2C E-Commerce Cart Abandonment',
    description: 'Friction point analysis and cart abandonment rates in DACH e-commerce.',
    category: 'Conversion Rates',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/ecommerce-cart-abandonment/json',
      csv: '/api/data/ecommerce-cart-abandonment/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'b2b-lead-conversion-metrics',
    title: 'B2B SaaS Lead Conversion',
    description: 'Conversion rates from trial to paid in the B2B SaaS sector.',
    category: 'Conversion Rates',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/b2b-lead-conversion-metrics/json',
      csv: '/api/data/b2b-lead-conversion-metrics/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'shopify-vs-custom-speed',
    title: 'Shopify vs. Custom Headless Speed',
    description: 'LCP and TTI comparisons between standard Shopify and Headless builds.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/shopify-vs-custom-speed/json',
      csv: '/api/data/shopify-vs-custom-speed/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'local-seo-pack-ctr',
    title: 'Local SEO 3-Pack CTR Distribution',
    description: "Click-through rate distribution for Google's Local 3-Pack.",
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/local-seo-pack-ctr/json',
      csv: '/api/data/local-seo-pack-ctr/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'ai-search-citiation-index',
    title: 'AI Search Citation Frequency',
    description: 'Analysis of brand citations in Perplexity and ChatGPT search outputs.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/ai-search-citiation-index/json',
      csv: '/api/data/ai-search-citiation-index/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'image-optimization-savings',
    title: 'WebP/AVIF Bandwidth Savings',
    description: 'Calculated payload reductions from modern image formats.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/image-optimization-savings/json',
      csv: '/api/data/image-optimization-savings/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'accessibility-a11y-scores',
    title: 'WCAG 2.1 Accessibility Benchmarks',
    description: 'Average accessibility scores across major DACH portals.',
    category: 'Mobile UX',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/accessibility-a11y-scores/json',
      csv: '/api/data/accessibility-a11y-scores/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'headless-cms-migration-roi',
    title: 'Headless CMS Migration ROI',
    description: 'Cost vs. value metrics for migrating away from monolithic CMS.',
    category: 'Technology Adoption',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/headless-cms-migration-roi/json',
      csv: '/api/data/headless-cms-migration-roi/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'organic-ctr-by-position',
    title: 'Organic CTR by SERP Position',
    description: 'Traditional organic click-through rates updated for 2025 SERP layouts.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/organic-ctr-by-position/json',
      csv: '/api/data/organic-ctr-by-position/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'ssr-vs-csr-seo-impact',
    title: 'SSR vs. CSR Indexing Speed',
    description: 'Time-to-index comparison for Server-Side vs. Client-Side rendered apps.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/ssr-vs-csr-seo-impact/json',
      csv: '/api/data/ssr-vs-csr-seo-impact/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'dark-mode-usage-stats',
    title: 'Dark Mode Preference Rates',
    description: 'User preference percentages for dark mode across demographics.',
    category: 'Mobile UX',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/dark-mode-usage-stats/json',
      csv: '/api/data/dark-mode-usage-stats/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'checkout-friction-time',
    title: 'Average Checkout Completion Time',
    description: 'Time spent in checkout funnels correlated with drop-off rates.',
    category: 'E-Commerce Trends',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/checkout-friction-time/json',
      csv: '/api/data/checkout-friction-time/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'api-first-architecture-growth',
    title: 'API-First Architecture Growth',
    description: 'YOY growth of API-first infrastructure in mid-market companies.',
    category: 'Technology Adoption',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/api-first-architecture-growth/json',
      csv: '/api/data/api-first-architecture-growth/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'third-party-script-impact',
    title: 'Third-Party Script Performance Impact',
    description: 'TBT (Total Blocking Time) caused by common tracking and marketing scripts.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/third-party-script-impact/json',
      csv: '/api/data/third-party-script-impact/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'voice-search-query-length',
    title: 'Voice Search Query Patterns',
    description: 'Word count and natural language patterns in voice search.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/voice-search-query-length/json',
      csv: '/api/data/voice-search-query-length/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'b2b-buyer-journey-touchpoints',
    title: 'B2B Buyer Journey Touchpoints',
    description: 'Number of digital interactions before B2B enterprise conversion.',
    category: 'Conversion Rates',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/b2b-buyer-journey-touchpoints/json',
      csv: '/api/data/b2b-buyer-journey-touchpoints/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'frontend-framework-marketshare',
    title: 'Frontend Framework Market Share',
    description: 'React vs. Vue vs. Angular vs. Svelte usage statistics.',
    category: 'Technology Adoption',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/frontend-framework-marketshare/json',
      csv: '/api/data/frontend-framework-marketshare/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'pwa-install-rates',
    title: 'PWA Installation & Retention',
    description: 'Progressive Web App installation metrics and 30-day retention.',
    category: 'Mobile UX',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/pwa-install-rates/json',
      csv: '/api/data/pwa-install-rates/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'serverless-edge-latency',
    title: 'Edge vs. Regional Server Latency',
    description: 'TTFB (Time to First Byte) comparisons for Edge-hosted applications.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/serverless-edge-latency/json',
      csv: '/api/data/serverless-edge-latency/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'zero-click-search-volume',
    title: 'Zero-Click Search Term Growth',
    description: 'Volume of queries ending without a click on standard SERPs.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/zero-click-search-volume/json',
      csv: '/api/data/zero-click-search-volume/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'ecommerce-return-rates',
    title: 'E-Commerce Return Rates by Category',
    description: 'Product return percentages correlated with product image quality.',
    category: 'E-Commerce Trends',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/ecommerce-return-rates/json',
      csv: '/api/data/ecommerce-return-rates/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'microinteractions-engagement',
    title: 'Micro-Interaction Engagement Uplift',
    description: 'Time-on-site improvements from UI micro-animations.',
    category: 'Conversion Rates',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/microinteractions-engagement/json',
      csv: '/api/data/microinteractions-engagement/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'font-loading-cls-impact',
    title: 'Web Font Loading CLS Impact',
    description: 'Cumulative Layout Shift metrics associated with custom font loading.',
    category: 'Web Performance',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/font-loading-cls-impact/json',
      csv: '/api/data/font-loading-cls-impact/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'b2c-mobile-traffic-share',
    title: 'Mobile vs. Desktop Traffic Split',
    description: 'Device categorization traffic split across various industries.',
    category: 'Mobile UX',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/b2c-mobile-traffic-share/json',
      csv: '/api/data/b2c-mobile-traffic-share/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'structured-data-rich-results',
    title: 'Rich Results Visibility Uplift',
    description: 'Impression multipliers from implementing complex Schema.org markup.',
    category: 'SEO & Visibility',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/structured-data-rich-results/json',
      csv: '/api/data/structured-data-rich-results/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
  {
    slug: 'composable-commerce-tco',
    title: 'Composable Commerce TCO',
    description: 'Total Cost of Ownership comparison: Monolith vs. Composable.',
    category: 'E-Commerce Trends',
    lastUpdated: '2026-05-14T23:15:16.030Z',
    license: 'CC-BY-4.0',
    endpoints: {
      json: '/api/data/composable-commerce-tco/json',
      csv: '/api/data/composable-commerce-tco/csv',
    },
    schema: [
      {
        field: 'metric',
        type: 'string',
        description: 'The name of the metric or category measured.',
      },
      {
        field: 'value',
        type: 'number',
        description: 'The absolute or relative value.',
      },
      {
        field: 'unit',
        type: 'string',
        description: 'Unit of measurement (e.g., %, ms, count).',
      },
    ],
    sampleData: [
      {
        metric: 'Data Point A',
        value: 42.5,
        unit: '%',
      },
      {
        metric: 'Data Point B',
        value: 12.1,
        unit: '%',
      },
      {
        metric: 'Data Point C',
        value: 45.4,
        unit: '%',
      },
    ],
  },
];
