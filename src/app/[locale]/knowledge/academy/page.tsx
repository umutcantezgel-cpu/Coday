import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  BASE_URL,
  getBreadcrumbSchema,
  getWebPageSchema,
  getAcademyCollectionSchema,
  getAcademyVideoSchemas,
} from '@/lib/schema';
import ClientComponent from '@/features/knowledge/ui/AcademyClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Academy & Video Masterclasses | Coday Wetzlar',
      description:
        'Video masterclasses on Next.js web development, local SEO and conversion rate optimization by Coday Web Agency Wetzlar.',
      keywords: [
        'Web Design Academy',
        'Web Design Videos Wetzlar',
        'Web Development Course Hesse',
        'SEO Video Masterclass Central Hesse',
        'Website Cost Guide Wetzlar',
        'Coday Academy',
      ],
      path: '/en/knowledge/academy',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Academy & Video-Masterclasses | Coday Wetzlar',
    description:
      'Video-Masterclasses zu Next.js Webdesign, lokaler SEO-Dominanz und Conversion-Optimierung von der Coday Webagentur Wetzlar.',
    keywords: [
      'Webdesign Academy',
      'Webdesign Videos Wetzlar',
      'Webentwicklung Videos Mittelhessen',
      'SEO Masterclass Wetzlar',
      'Website Kosten Video',
      'Google Bewertungen Guide',
      'Coday Academy',
    ],
    path: '/de/knowledge/academy',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/knowledge/academy`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
      { name: 'Academy', url: `/${_locale}/knowledge/academy` },
    ],
    pageUrl
  );

  const collectionSchema = getAcademyCollectionSchema(_locale);
  const videoSchemas = getAcademyVideoSchemas(_locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Skipping Organization here — the root layout already emits it site-wide.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: collectionSchema.name,
        description: collectionSchema.description,
        locale: _locale,
        mainEntityId: `${pageUrl}#collection`,
      }),
      collectionSchema,
      ...videoSchemas,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO Section for Video Masterclasses & Local Authority Wetzlar */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6 text-slate-900">
          {isEn
            ? 'Web Design & SEO Video Masterclasses – Digital Knowledge for Central Hesse'
            : 'Webdesign & SEO Video-Masterclasses – Digitales Praxiswissen für Wetzlar & Mittelhessen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            {isEn
              ? 'In today’s hyper-competitive digital landscape, having an authoritative web presence is crucial. The Coday Academy provides free, actionable video masterclasses for business leaders, craftsmen, law firms, and medical practices across Wetzlar, Gießen, Marburg, and greater Hesse who want to maximize their digital visibility and customer acquisition.'
              : 'In der heutigen digitalen Welt ist eine professionelle Webpräsenz entscheidender denn je. Die Coday Webdesign Academy in Wetzlar bietet maßgeschneiderte Video-Masterclasses und praxisnahe Tutorials für Unternehmer, Handwerker, Kanzleien und Dienstleister in ganz Mittelhessen, die ihre Online-Sichtbarkeit und Neukundengewinnung planbar ausbauen möchten.'}
          </p>
          <p>
            {isEn
              ? 'Our video modules cover critical topics: selecting the right web design partner without vendor lock-in, understanding the real cost of high-performance Next.js websites, mastering Google reviews, and implementing technical SEO architectures with 100/100 Core Web Vitals to systematically outrank competitors.'
              : 'In unseren Video-Schulungen lernen Sie unter anderem: Welche 5 Fragen Sie jeder Webagentur vor der Auftragsvergabe stellen müssen, was eine zukunftssichere Website wirklich kostet, wie Sie Google-Bewertungen meistern und wie Sie durch psychologische Conversion-Optimierung aus Website-Besuchern zahlende Kunden gewinnen.'}
          </p>
          <p>
            {isEn
              ? 'All video lessons are hosted locally with sub-second delivery to ensure zero latency and full privacy compliance (GDPR). Start exploring the masterclasses above to take your digital strategy to the next level.'
              : 'Alle Masterclasses werden direkt über unsere blitzschnelle High-Speed Edge-Infrastruktur ausgeliefert – vollkommen ohne Tracking-Cookies von Drittanbietern und 100% DSGVO-konform. Nutzen Sie dieses Wissen, um fundierte Entscheidungen für Ihre digitale Zukunft zu treffen.'}
          </p>
        </div>
      </section>
    </>
  );
}
