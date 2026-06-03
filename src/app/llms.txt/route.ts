import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.codayweb.de';

export async function GET() {
  const content = `# Coday — High-End Headless Web Development aus Wetzlar
> AI-augmented Solo-Agentur für ultraschnelle Enterprise-Websites mit Next.js, React und Sanity.

## Services
- [Headless CMS Integration](${BASE_URL}/services/headless-cms): Zukunftssicheres Content-Management mit Sanity.
- [Next.js Web Development](${BASE_URL}/services/web-development): Performante, React-basierte Frontend-Architekturen.
- [Generative Engine Optimization](${BASE_URL}/services/geo): RAG-Optimierung und AI-Discoverability für maximale Sichtbarkeit.

## Case Studies
- [Batherm](${BASE_URL}/portfolio/batherm): Sanitärtechnik Relaunch mit <1s Ladezeit.
- [MS Schlüsseldienst Wetzlar](${BASE_URL}/portfolio/ms-schluesseldienst): Platz 1 bei Google dank Core Web Vitals Dominanz.

## Knowledge Base
- [Blog](${BASE_URL}/knowledge/blog): Aktuelle Insights zu Next.js, Sanity und GEO.
- [FAQ](${BASE_URL}/knowledge/faq): Häufige Fragen zu Headless Development und AI-Tools.

## About
- [Founder Profile](${BASE_URL}/about): Umutcan Emre Tezgel, Handwerksmeister & Lead Engineer.
- [Process](${BASE_URL}/process): Das agile Human-in-the-Loop-Agentur-Protokoll.

## Optional
- [Pricing](${BASE_URL}/pricing): Transparente Festpreis-Pakete.
- [Contact](${BASE_URL}/contact): Direkter Draht zum Entwickler.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
