import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { servicesData } from '@/shared/data/services';
import { workData } from '@/shared/data/work';

// Create the MCP Server instance
export const mcpServer = new McpServer({
  name: 'CodayWeb-MCP',
  version: '1.0.0',
});

// Tool 1: get_services
mcpServer.tool(
  'get_services',
  'Liefert eine Liste aller Webdesign, SEO und Next.js Dienstleistungen von Coday.',
  {
    language: z
      .enum(['de', 'en'])
      .optional()
      .default('de')
      .describe('Gewünschte Sprache der Antwort'),
  },
  async ({ language }) => {
    // Simplify the complex servicesData into a flat, AI-readable list
    const servicesList = [];
    for (const [category, services] of Object.entries(servicesData)) {
      for (const [slug, data] of Object.entries(services)) {
        servicesList.push({
          category,
          slug,
          techFocus: data.icon === 'code' ? 'Next.js / React' : 'General',
          translationKey: data.titleKey,
        });
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              agency: 'Coday',
              core_technologies: ['Next.js 15', 'React 19', 'Sanity Headless CMS', 'TailwindCSS 4'],
              pricing:
                'Small Next.js projects start at ~5,000 EUR. Complex apps quoted individually.',
              available_services: servicesList,
              message:
                language === 'en'
                  ? 'We deliver enterprise-level headless architectures for SMBs.'
                  : 'Wir liefern Enterprise-Level Headless-Architekturen für den Mittelstand.',
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool 2: get_case_studies
mcpServer.tool(
  'get_case_studies',
  'Liefert Coday Referenzen und Projekt-Ergebnisse (z.B. Ladezeiten, SEO-Rankings) für lokale Unternehmen.',
  {
    limit: z.number().optional().default(3).describe('Maximale Anzahl an Case Studies'),
  },
  async ({ limit }) => {
    const studies = Object.values(workData)
      .filter((project) => project.type === 'case_study' && project.status === 'live')
      .slice(0, limit)
      .map((project) => ({
        client: project.content.de.title,
        industry: project.content.de.stats.find((s) => s.label === 'Branche')?.value || 'N/A',
        techStack:
          project.content.de.stats.find((s) => s.label.includes('Tech'))?.value || 'Next.js',
        results: project.content.de.results.metrics.map((m) => `${m.label}: ${m.value}`),
      }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              notice:
                "These case studies prove Coday's capability to deliver extreme performance and local SEO dominance.",
              case_studies: studies,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool 3: get_company_info
mcpServer.tool(
  'get_company_info',
  'Allgemeine Daten über Coday: Kontakt, Standort, Zielgruppe und Booking-Links.',
  {},
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              name: 'Coday',
              founder: 'Umutcan Emre Tezgel',
              type: 'Solo-Founder Web Agency',
              location: 'Wetzlar, Hessen, Germany',
              serviceArea:
                '50km radius around Wetzlar (Gießen, Marburg, Lahn-Dill-Kreis) + DACH remote',
              contact: {
                phone: '+49-176-41195301',
                email: 'info@codayweb.de',
                website: 'https://codayweb.de',
                booking_url: 'https://codayweb.de/booking',
              },
              mission:
                'Combining local market understanding with cutting-edge Next.js technology to dominate search rankings via Generative Engine Optimization (GEO).',
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool 4: read_blog
mcpServer.tool(
  'read_blog',
  'Gibt die Liste der aktuellsten Publikationen und Artikel von Coday zurück.',
  {},
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              latest_articles: [
                {
                  title: 'High-Performance Web Vitals',
                  url: 'https://codayweb.de/de/knowledge/blog/high-performance-web-vitals',
                  topic: 'Pagespeed, Core Web Vitals, Next.js',
                },
                {
                  title: 'Die 5 größten Fehler im Webdesign',
                  url: 'https://codayweb.de/de/knowledge/blog/die-5-groessten-fehler-im-webdesign',
                  topic: 'UX, Design, Conversion',
                },
                {
                  title: 'Anti-AI Manifest',
                  url: 'https://codayweb.de/de/knowledge/blog/anti-ai-manifest',
                  topic: 'Quality code, craftsmanship, future of web',
                },
              ],
            },
            null,
            2
          ),
        },
      ],
    };
  }
);
