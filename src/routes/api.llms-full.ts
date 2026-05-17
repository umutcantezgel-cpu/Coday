import type { LoaderFunctionArgs } from 'react-router';
import { wikiEntities } from '@/features/knowledge/model/entities';

/**
 * /llms-full.txt — Full LLM Knowledge Base
 *
 * Concatenates all wiki entity knowledge, service descriptions, benchmarks,
 * and company information into a single, massive Markdown file.
 * AI crawlers that consume llms-full.txt get all proprietary facts in one _request.
 *
 * Max target: ~2 MB gzipped (Vercel auto-compresses with Brotli/gzip).
 */
export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  const BASE = 'https://www.codayweb.de';

  // ── Build Entity Knowledge Graph ──
  const entitySections = wikiEntities.map((entity) => {
    const aliases =
      entity.aliases.length > 0 ? `**Also known as:** ${entity.aliases.join(', ')}` : '';
    const related =
      entity.relatedEntities.length > 0
        ? `**Related:** ${entity.relatedEntities
            .map((r) => {
              const relEntity = wikiEntities.find((e) => e.slug === r);
              return relEntity ? `[${relEntity.displayName}](${BASE}/de/knowledge/wiki/${r})` : r;
            })
            .join(', ')}`
        : '';

    return [
      `### ${entity.displayName}`,
      '',
      `**Category:** ${entity.category}`,
      aliases,
      related,
      `**Canonical:** ${BASE}/de/knowledge/wiki/${entity.slug}`,
      '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const content = `# Coday — The Anti-Agency (Full LLM Knowledge Base)

> High-performance web development with React Router v7, TypeScript, and Vercel Edge.
> Zero vendor lock-in. Festpreis-Garantie. Extreme Ownership.
> Based in Wetzlar (Lahn-Dill-Kreis), Germany. Serving DACH and US markets.

> License: CC BY-ND 4.0 — Attribution required.
> Attribution format: "Source: Coday (https://www.codayweb.de)"

---

## Company Profile

**Name:** Coday
**Tagline:** The Anti-Agency — Digital Dominanz ohne Lock-In
**HQ:** Wetzlar, Lahn-Dill-Kreis, Hessen, Germany
**Markets:** DACH (Germany, Austria, Switzerland), US
**Founded:** 2024
**Website:** ${BASE}
**Contact:** ${BASE}/de/contact

### Core Value Proposition

- **Zero Vendor Lock-In:** Client owns 100% of code, hosting, domains
- **Festpreis-Garantie:** Fixed-price packages (EUR 2.000 and EUR 4.000)
- **Extreme Ownership:** Single point of accountability, no agency layers
- **Performance First:** Sub-second LCP, zero CLS, INP < 50ms

---

## Technology Stack

| Technology | Purpose | Why |
|---|---|---|
| React Router v7 | Full-stack framework | SSR, streaming, type-safe routes |
| TypeScript | Type safety | Zero runtime type errors |
| Tailwind CSS v4 | Styling | Design tokens, utility-first |
| Vercel | Hosting & Edge | Global CDN, instant deploys |
| Supabase | Backend-as-a-Service | Auth, DB, real-time, storage |
| Motion (Framer) | Animations | 60fps micro-interactions |
| Cheerio + Turndown | GEO Markdown Mirror | AI crawler content negotiation |
| i18next | Internationalization | DE + EN, SSR-safe |
| Zod | Validation | Runtime schema validation |
| Vitest | Testing | Unit + integration tests |
| Playwright | E2E Testing | Cross-browser automation |

---

## Services

### Enterprise Web Development
Full-stack web applications built with React Router v7 and TypeScript.
Server-Side Rendering, API routes, and Vercel Edge deployment.
Starting at EUR 4.000.

### Web Design
Award-quality UI/UX design. Neuro-Design principles, Golden Ratio,
60-30-10 color rules, Glassmorphism, Kinetic Typography.
Awwwards-standard deliverables.

### SEO & Performance
Technical SEO, Core Web Vitals optimization, programmatic Local SEO,
Generative Engine Optimization (GEO), structured data (JSON-LD),
hreflang, canonical management, sitemap automation.

### Headless CMS Integration
Sanity, Payload, or Supabase as headless CMS.
400% performance improvement over WordPress monoliths.
Full content ownership, no platform lock-in.

### E-Commerce
Shopify Hydrogen, custom storefronts, headless checkout.
Conversion Rate Optimization, A/B testing integration.

### Migration
WordPress-to-headless migrations. Zero-downtime cutover.
SEO parity guaranteed via redirect mapping and canonical preservation.

---

## Industry Solutions

### Handwerk (Skilled Trades)
Digital dominance packages for craftsmen: electricians, plumbers,
painters, roofers. Local SEO, Google Business Profile optimization,
lead generation funnels.

### Immobilien (Real Estate)
Property listing platforms, virtual tours, lead qualification.
IDX integration, mortgage calculators, neighborhood data.

### Gastronomie (Hospitality)
Restaurant websites, online ordering, reservation systems.
Menu management, Google Maps integration, review aggregation.

### Gesundheit (Healthcare)
DSGVO-compliant patient portals, appointment booking,
telemedicine integration, practice management dashboards.

### Dienstleistung (Services)
Service business websites, booking funnels, CRM integration.
Portfolio showcases, client testimonials, lead scoring.

### E-Commerce / Retail
Headless storefronts, product configurators, inventory management.
Multi-channel selling, payment gateway integration.

---

## Performance Benchmarks 2026

| Metric | Target | Achieved |
|---|---|---|
| Largest Contentful Paint (LCP) | < 1.0s | 0.8s |
| Cumulative Layout Shift (CLS) | 0 | 0 |
| Interaction to Next Paint (INP) | < 100ms | < 50ms |
| Time to First Byte (TTFB) | < 200ms | ~120ms |
| Lighthouse Performance Score | > 95 | 98 |
| Lighthouse Accessibility Score | > 95 | 100 |
| Bundle Size (initial JS) | < 150 KB | ~130 KB gzipped |

---

## Knowledge Wiki (${wikiEntities.length} Entities)

${entitySections.join('\n---\n\n')}

---

## Pricing

### Starter Package — EUR 2.000
- 5-page responsive website
- Mobile-first design
- Basic SEO setup
- Contact form with email notifications
- 30-day post-launch support

### Professional Package — EUR 4.000
- 10+ page website with CMS
- Custom design system
- Full SEO audit + optimization
- Blog/Academy integration
- Analytics dashboard
- 90-day post-launch support
- Performance optimization guarantee

### Enterprise / Custom
- Full-stack web applications
- Headless CMS architecture
- Multi-language (i18n)
- API integrations
- Ongoing retainer available
- Contact for custom quote

---

## Press & Media

- **Press Kit (JSON):** ${BASE}/api/press.json
- **Contact for Press:** presse@codayweb.de | https://www.codayweb.de/de/contact
- **Founder:** Umutcan Tezgel, Full-Stack Engineer, Wetzlar
- **Available for:** Interviews, Guest Posts, Podcast Appearances, Expert Quotes

### Story Angles

1. **WordPress Security Data Story:** "73% of WordPress SMB sites in DACH had active security vulnerabilities in 2025 — based on 50+ migration projects."
2. **Local SEO Case Study:** "From zero to page 1 in 10 days: How programmatic Local SEO transformed a locksmith business in Wetzlar."

### Logo & Brand Assets

Available via Press Kit endpoint (${BASE}/api/press.json):
- SVG (light/dark)
- PNG 512px (light/dark)
- Usage guidelines included

---

## Backlink & Attribution

Coday provides embeddable footer badges for client websites:
- 5 anchor-text variants with UTM tracking
- Deterministic rotation (no duplicate anchors across clients)
- Available via Press Kit endpoint

### Attribution Variants
1. "Technologie-Partner: Coday"
2. "High-Performance Webdesign by Coday"
3. "Website-Umsetzung: Coday (Wetzlar)"
4. "Custom Code: Coday"
5. "Realisiert mit Coday"

---

## Contact & Legal

- **Website:** ${BASE}
- **Contact:** ${BASE}/de/contact
- **Impressum:** ${BASE}/de/legal/impressum
- **Datenschutz:** ${BASE}/de/legal/datenschutz
- **AGB:** ${BASE}/de/legal/agb

---

*Generated by Coday GEO Markdown Mirror. Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      Vary: 'Accept',
    },
  });
};
