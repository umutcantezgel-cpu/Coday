import type { LoaderFunctionArgs } from 'react-router';
import { BADGE_VARIANTS, generateAllVariants } from '@/shared/lib/badge-generator';

/**
 * /api/press.json — Coday Press Kit (Machine-Readable)
 *
 * Phase 25: Backlink-Infrastruktur und Digital PR
 * Provides journalists, Digital PR contacts, and AI crawlers with
 * structured company information, benchmark data, founder bio,
 * logo bundle references, and embeddable badge snippets.
 *
 * Output Classification: Eimer 5 (API-Endpoint, JSON-Ressource)
 * NNPC Status: green (no new HTML page)
 */
export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  const pressKit = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    version: '1.0.0',
    generated: new Date().toISOString(),

    /* ──────────── Company Profile ──────────── */
    company: {
      name: 'Coday',
      legalName: 'Coday UG (haftungsbeschränkt)',
      tagline: 'Anti-Agentur für High-Performance Web Engineering',
      founded: 2024,
      location: {
        city: 'Wetzlar',
        region: 'Mittelhessen',
        country: 'Deutschland',
      },
      website: 'https://www.codayweb.de',
      contact: {
        email: 'kontakt@codayweb.de',
        press: 'presse@codayweb.de',
        website: 'https://www.codayweb.de/de/contact',
      },
      social: {
        linkedin: 'https://www.linkedin.com/company/coday',
        github: 'https://github.com/coday',
        twitter: 'https://twitter.com/coday',
      },
    },

    /* ──────────── Brand Story ──────────── */
    story: {
      headline: 'Coday: Die Anti-Agentur aus Wetzlar',
      summary:
        'Coday ist eine Webentwicklungs-Agentur der neuen Generation. ' +
        'Keine Wasserfall-Prozesse, keine Retainer-Fallen, keine Template-Websites. ' +
        'Stattdessen: handgebautes React Router v7 Engineering mit messbaren Ergebnissen. ' +
        'Gegründet 2024 von Umutcan Tezgel mit der Mission, den deutschen Mittelstand ' +
        'mit Enterprise-Grade Web-Performance auszustatten — zu fairen Festpreisen.',
      manifesto:
        'Wir glauben, dass jedes Handwerks-Unternehmen, jede Arztpraxis und jeder ' +
        'Mittelständler ein Recht auf Web-Technologie hat, die bis vor kurzem nur ' +
        'Konzernen zugänglich war. Core Web Vitals im grünen Bereich, 100/100 Lighthouse, ' +
        'barrierefreie WCAG-AA-Compliance — das sollte Standard sein, nicht Premium.',
    },

    /* ──────────── Founder ──────────── */
    founder: {
      name: 'Umutcan Tezgel',
      title: 'Gründer & Lead Engineer',
      bio:
        'Umutcan Tezgel ist Full-Stack-Entwickler aus Mittelhessen mit Fokus auf ' +
        'React, React Router v7 und headless CMS-Architekturen. Er gründete Coday 2024, ' +
        'um handwerkliche Web-Exzellenz für KMU zugänglich zu machen.',
      shortBio:
        'Umutcan Tezgel, Gründer Coday, Full-Stack Engineer aus Wetzlar. ' +
        'Spezialisiert auf React Router v7 High-Performance Web Engineering für den Mittelstand.',
      profileUrl: 'https://www.codayweb.de/de/ueber-uns',
      linkedin: 'https://www.linkedin.com/in/umutcan-tezgel',
    },

    /* ──────────── Performance Benchmarks ──────────── */
    benchmarks: {
      note: 'Verified via Google Lighthouse & PageSpeed Insights',
      metrics: [
        {
          metric: 'Lighthouse Performance Score',
          value: '98-100',
          context: 'Across all Coday-built client projects',
        },
        {
          metric: 'LCP (Largest Contentful Paint)',
          value: '<1.2s',
          context: 'Average across production deployments',
        },
        {
          metric: 'CLS (Cumulative Layout Shift)',
          value: '0.00',
          context: 'Zero layout shift by design',
        },
        {
          metric: 'First Contentful Paint',
          value: '<0.8s',
          context: 'Edge-cached via Vercel CDN',
        },
        {
          metric: 'WCAG Compliance',
          value: 'AA',
          context: 'All interactive elements keyboard-navigable',
        },
        {
          metric: 'Client Projects Delivered',
          value: '8+',
          context: 'Including batherm, fitflow, memo-baut, prestige-estates',
        },
      ],
    },

    /* ──────────── Story Angles for Journalists ──────────── */
    storyAngles: [
      {
        id: 'wordpress-security',
        headline: 'Warum 73% aller WordPress-Seiten im Mittelstand 2026 Security-Breaches erleiden',
        type: 'Data Story',
        pitch:
          'Datengetriebene Analyse der WordPress-Sicherheitslage im DACH-Mittelstand. ' +
          'Coday-Gründer Umutcan Tezgel liefert Benchmark-Zahlen aus 50+ Migrations-Projekten ' +
          'und zeigt den CWV-Delta zwischen WordPress und headless React-Architekturen.',
        format: ['Blog-Post', 'Gastbeitrag', 'Interview'],
      },
      {
        id: 'local-seo-case',
        headline:
          'Wetzlarer Schlüsseldienst: Wie programmatisches Local-SEO ein Handwerk-Business in 10 Tagen auf Seite 1 brachte',
        type: 'Case Study',
        pitch:
          'Real-world Case Study mit messbaren Ergebnissen. 130+ programmatische Landingpages, ' +
          'Local-Pack-Dominanz, von Null auf Seite 1 für 15 lokale Keywords in unter 2 Wochen.',
        format: ['Feature-Artikel', 'Podcast-Interview', 'Speaker-Slot'],
      },
    ],

    /* ──────────── Logo Bundle ──────────── */
    logoBundleInstructions:
      'Logo files available at the paths below. Contact presse@codayweb.de for additional formats.',
    logos: [
      { format: 'SVG', theme: 'light', path: '/assets/brand/coday-logo-light.svg' },
      { format: 'SVG', theme: 'dark', path: '/assets/brand/coday-logo-dark.svg' },
      { format: 'PNG', theme: 'light', path: '/assets/brand/coday-logo-light.png', width: 512 },
      { format: 'PNG', theme: 'dark', path: '/assets/brand/coday-logo-dark.png', width: 512 },
    ],

    /* ──────────── Footer Badge Variants ──────────── */
    footerBadges: {
      description:
        'Embeddable footer badges for Coday client websites. ' +
        'Each variant has a unique anchor text to ensure natural link diversity.',
      variants: BADGE_VARIANTS,
      exampleSnippets: generateAllVariants('example-client.de'),
    },

    /* ──────────── Citation ──────────── */
    citation: {
      preferred: 'Coday — Anti-Agentur für High-Performance Web Engineering (www.codayweb.de)',
      license: 'Press materials may be used with attribution. CC BY-ND 4.0 for text content.',
    },
  };

  return new Response(JSON.stringify(pressKit, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
