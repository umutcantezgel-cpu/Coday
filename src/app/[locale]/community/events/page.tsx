import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/community/ui/EventsClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Workshops & Meetups | Next.js, Local SEO · Coday Wetzlar',
      description:
        'Four workshop formats on web performance, local SEO and conversion, run from Wetzlar. Dates follow demand — register interest and we will set one.',
      keywords: [
        'Next.js Workshop Hesse',
        'Local SEO Workshop Wetzlar',
        'Web Performance Training Central Hesse',
        'Developer Meetup Wetzlar',
      ],
      path: '/en/community/events',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Workshops & Meetups | Next.js, lokales SEO · Coday Wetzlar',
    description:
      'Vier Workshop-Formate zu Web-Performance, lokalem SEO und Conversion aus Wetzlar. Termine richten sich nach der Nachfrage — Interesse vormerken genügt.',
    keywords: [
      'Next.js Workshop Hessen',
      'Local SEO Workshop Wetzlar',
      'Web-Performance Schulung Mittelhessen',
      'Entwickler Meetup Wetzlar',
    ],
    path: '/de/community/events',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Community', url: `/${_locale}/community/events` },
    { name: isEn ? 'Events' : 'Veranstaltungen', url: `/${_locale}/community/events` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        // WebPage, not Event: the formats have no scheduled dates, and Event
        // schema without a real startDate would put an invented appointment
        // into search results.
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/community/events#webpage`,
        name: isEn ? 'Coday Workshops & Meetups' : 'Coday Workshops & Meetups',
        url: `${BASE_URL}/${_locale}/community/events`,
        description: isEn
          ? 'Workshop formats on web performance, local SEO and conversion, run from Wetzlar. Dates follow demand.'
          : 'Workshop-Formate zu Web-Performance, lokalem SEO und Conversion aus Wetzlar. Termine richten sich nach der Nachfrage.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Webdesign Events & Digital Community in Wetzlar
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Die lokale Business-Community lebt vom aktiven Austausch, von Networking und von
            inspirierenden Veranstaltungen. Coday, Ihre innovative Webdesign Agentur aus Wetzlar,
            engagiert sich leidenschaftlich für den Aufbau und die Pflege einer lebendigen digitalen
            und analogen Gemeinschaft in Mittelhessen und darüber hinaus. Auf unserer Events-Seite
            informieren wir Sie regelmäßig über bevorstehende Workshops, spannende Meetups,
            Fachvorträge und exklusive Networking-Events rund um die Themen Webentwicklung,
            digitales Marketing, UX/UI-Design und digitale Transformation. Wir glauben fest daran,
            dass Wissenstransfer der Schlüssel zum Erfolg ist.
          </p>
          <p>
            Unsere Veranstaltungen richten sich an Unternehmer, Gründer, Marketingverantwortliche
            und IT-Experten, die ihr Wissen erweitern und wertvolle Kontakte knüpfen möchten. In
            unseren praxisnahen Workshops vermitteln wir fundiertes Know-how zu aktuellen Trends wie
            Headless CMS, React, Next.js, Performance-Optimierung und Suchmaschinenoptimierung
            (SEO). Wir zeigen Ihnen, wie Sie moderne Webtechnologien effektiv einsetzen können, um
            Ihr Unternehmen digital nach vorne zu bringen. Die Coday Community-Events bieten zudem
            eine hervorragende Plattform, um Synergien zu schaffen und gemeinsame Projekte zu
            initiieren.
          </p>
          <p>
            Wetzlar als zentraler Wirtschaftsstandort in Hessen bietet dafür die idealen
            Voraussetzungen. Egal, ob es sich um kleine, intensive Masterclasses oder größere
            Netzwerk-Treffen handelt – wir legen großen Wert auf eine offene, inspirierende
            Atmosphäre. Darüber hinaus laden wir regelmäßig Gastredner und Branchenexperten ein, die
            wertvolle Einblicke in ihre Fachgebiete geben. Verpassen Sie keine unserer
            Veranstaltungen und abonnieren Sie unseren Newsletter, um stets up to date zu bleiben
            und sich rechtzeitig Ihren Platz zu sichern.
          </p>
          <p>
            Wir freuen uns darauf, Sie bei einem unserer nächsten Events persönlich kennenzulernen
            und gemeinsam die digitale Zukunft in der Region aktiv zu gestalten. Nutzen Sie die
            Chance, Teil eines starken Netzwerks zu werden und profitieren Sie vom gebündelten
            Wissen der Coday Community. Bleiben Sie neugierig, bleiben Sie innovativ – wir sehen uns
            auf dem nächsten Event! Erweitern Sie Ihren Horizont, tauschen Sie sich mit
            Gleichgesinnten aus und holen Sie sich wertvolle Impulse für Ihre eigenen digitalen
            Projekte und Strategien direkt vor Ort.
          </p>
        </div>
      </section>
    </>
  );
}
