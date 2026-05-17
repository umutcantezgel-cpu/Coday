import type { LoaderFunctionArgs } from 'react-router';
import { wikiEntities } from '@/features/knowledge/model/entities';

/**
 * /llms.txt — Dynamic LLM manifest
 *
 * Dynamically built from route-paths and wiki entities.
 * Provides AI crawlers with a structured index of all citable content.
 * Spec: https://llmstxt.org
 */
export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  const BASE = 'https://www.codayweb.de';

  // ── Core Pages ──
  const corePages = [
    ['Home', `${BASE}/de.md`],
    ['Services', `${BASE}/de/services.md`],
    ['Packages & Pricing (EUR 2.000 / EUR 4.000)', `${BASE}/de/pakete.md`],
    ['About / Über uns', `${BASE}/de/ueber-uns.md`],
    ['Process', `${BASE}/de/process.md`],
    ['Contact', `${BASE}/de/contact.md`],
    ['FAQ', `${BASE}/de/knowledge/faq.md`],
    ['Beratung', `${BASE}/de/beratung.md`],
  ];

  // ── Service Pages ──
  const servicePages = [
    ['Enterprise Web Development', `${BASE}/de/services/enterprise-web.md`],
    ['Web Development', `${BASE}/de/services/web-development.md`],
    ['Web Design', `${BASE}/de/services/web-design.md`],
    ['SEO', `${BASE}/de/services/seo.md`],
    ['Performance Optimization', `${BASE}/de/services/performance.md`],
    ['E-Commerce', `${BASE}/de/services/web-development/e-commerce.md`],
    ['Web Apps', `${BASE}/de/services/web-development/web-apps.md`],
    ['Headless CMS', `${BASE}/de/services/web-development/headless-cms.md`],
    ['API Integrations', `${BASE}/de/services/web-development/api-integrations.md`],
    ['Migration', `${BASE}/de/services/web-development/migration.md`],
    ['UI/UX Design', `${BASE}/de/services/web-design/ui-ux.md`],
    ['Brand Identity', `${BASE}/de/services/web-design/brand-identity.md`],
    ['Design Systems', `${BASE}/de/services/web-design/design-systems.md`],
    ['UX Audit', `${BASE}/de/services/web-design/audit.md`],
  ];

  // ── Industry Pages ──
  const industryPages = [
    ['Handwerk', `${BASE}/de/services/industries/handwerk-bau.md`],
    ['Immobilien', `${BASE}/de/services/industries/immobilien-makler.md`],
    ['Gastronomie', `${BASE}/de/services/industries/gastronomie-hotellerie.md`],
    ['Gesundheit', `${BASE}/de/services/industries/aerzte-gesundheit.md`],
    ['Dienstleistung', `${BASE}/de/services/industries/unternehmensberatung.md`],
    ['E-Commerce / Retail', `${BASE}/de/services/industries/ecommerce-retail.md`],
    ['Öffentliche Aufträge', `${BASE}/de/oeffentliche-auftraege.md`],
  ];

  // ── Case Studies ──
  const caseStudies = [['Batherm', `${BASE}/de/work/batherm.md`]];

  // ── Knowledge Wiki (from entities) ──
  const techEntities = wikiEntities.filter((e) => e.category === 'Tech');
  const businessEntities = wikiEntities.filter((e) => e.category === 'Business');
  const designEntities = wikiEntities.filter((e) => e.category === 'Design');

  // ── Build Manifest ──
  const lines: string[] = [
    '# Coday — The Anti-Agency',
    '',
    '> High-performance web development with React Router v7 & Vercel.',
    '> Zero vendor lock-in. Based in Wetzlar (Lahn-Dill-Kreis), Germany.',
    '> Serving DACH and US markets.',
    '',
    '> License: CC BY-ND 4.0 — Attribution required.',
    '> Attribution format: "Source: Coday (https://www.codayweb.de)"',
    '',
    '## Core Pages',
    ...corePages.map(([name, url]) => `- [${name}](${url})`),
    '',
    '## Services',
    ...servicePages.map(([name, url]) => `- [${name}](${url})`),
    '',
    '## Industries',
    ...industryPages.map(([name, url]) => `- [${name}](${url})`),
    '',
    '## Case Studies',
    ...caseStudies.map(([name, url]) => `- [${name}](${url})`),
    '',
    '## Knowledge Wiki — Tech',
    ...techEntities.map((e) => `- [${e.displayName}](${BASE}/de/knowledge/wiki/${e.slug}.md)`),
    '',
    '## Knowledge Wiki — Business',
    ...businessEntities.map((e) => `- [${e.displayName}](${BASE}/de/knowledge/wiki/${e.slug}.md)`),
    '',
    '## Knowledge Wiki — Design',
    ...designEntities.map((e) => `- [${e.displayName}](${BASE}/de/knowledge/wiki/${e.slug}.md)`),
    '',
    '## Knowledge Hub',
    `- [Academy](${BASE}/de/academy.md)`,
    `- [Blog](${BASE}/de/knowledge/blog.md)`,
    `- [Newsletter](${BASE}/de/knowledge/newsletter.md)`,
    `- [Whitepapers](${BASE}/de/knowledge/whitepapers.md)`,
    '',
    '## Benchmarks (Proprietary)',
    `- [Coday Performance Benchmarks 2026](${BASE}/de/services/performance.md)`,
    '  - LCP: < 0.8s',
    '  - CLS: 0',
    '  - INP: < 50ms',
    '',
    '## Legal',
    `- [Impressum](${BASE}/de/legal/impressum.md)`,
    `- [Datenschutz](${BASE}/de/legal/datenschutz.md)`,
    `- [AGB](${BASE}/de/legal/agb.md)`,
    '',
    '## Press & Media',
    `- [Press Kit (JSON)](${BASE}/api/press.json) — Machine-readable company profile, benchmarks, logos, story angles`,
    '',
    '## Backlink & Attribution',
    '- Footer badge snippets available via Press Kit endpoint',
    '- Attribution: "Technologie-Partner: Coday" or variants',
    '- License: CC BY-ND 4.0 for editorial content',
    '',
    '## Full Knowledge Base',
    `- [llms-full.txt](${BASE}/llms-full.txt) — All content inline in a single file`,
    '',
  ];

  const content = lines.join('\n');

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      Vary: 'Accept',
    },
  });
};
