import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/community/ui/CalendarClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Project Availability | Lead Times & Start Dates · Coday',
      description:
        'How soon a website can start and how long it takes: answer within 24 hours, a free 20 minute needs analysis, live in 10 to 14 working days.',
      keywords: [
        'Web Design Lead Time Wetzlar',
        'Website Start Date Hesse',
        'How Long Does a Website Take',
        'Web Agency Availability Central Hesse',
      ],
      path: '/en/community/calendar',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Projekt-Verfügbarkeit | Vorlauf & Starttermine · Coday',
    description:
      'Wie schnell eine Website starten kann und wie lange sie dauert: Antwort in 24 Stunden, kostenlose 20-Minuten-Bedarfsanalyse, in 10 bis 14 Werktagen online.',
    keywords: [
      'Website Vorlaufzeit Wetzlar',
      'Website Starttermin Mittelhessen',
      'Wie lange dauert eine Website',
      'Webagentur Verfügbarkeit Hessen',
    ],
    path: '/de/community/calendar',
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
    { name: isEn ? 'Community' : 'Community', url: `/${_locale}/community/events` },
    { name: isEn ? 'Calendar' : 'Kalender', url: `/${_locale}/community/calendar` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/community/calendar#webpage`,
        name: isEn ? 'Coday Community Calendar' : 'Coday Community Kalender',
        url: `${BASE_URL}/${_locale}/community/calendar`,
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
          Tech-Events und Community in Mittelhessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Willkommen im Community-Kalender von Coday, Ihrer zentralen Anlaufstelle für digitale
            Events, Workshops und Networking-Veranstaltungen in Wetzlar und der gesamten Region
            Mittelhessen. Wir glauben fest daran, dass Wissen wächst, wenn man es teilt. Deshalb
            engagieren wir uns aktiv für den Aufbau einer lebendigen und unterstützenden
            Gemeinschaft aus Webentwicklern, Designern, Unternehmern und Technologie-Begeisterten.
            Auf dieser Seite finden Sie stets aktuelle Informationen zu unseren kommenden Meetups,
            Fachvorträgen, Hackathons und informellen Get-togethers.
          </p>
          <p>
            Unsere Veranstaltungen richten sich sowohl an erfahrene Professionals als auch an
            neugierige Einsteiger, die ihr Wissen im Bereich Webdesign, Frontend-Entwicklung,
            Suchmaschinenoptimierung und digitales Marketing erweitern möchten. Wir laden regelmäßig
            Branchenexperten ein, um über die neuesten Trends, Tools und Best Practices zu
            referieren. Von Deep Dives in moderne JavaScript-Frameworks wie Next.js und React über
            Workshops zur Optimierung der Core Web Vitals bis hin zu Diskussionsrunden über die
            Zukunft des E-Commerce – unser Kalender bietet für jeden Geschmack und jedes
            Erfahrungslevel das passende Event.
          </p>
          <p>
            Nutzen Sie die Gelegenheit, sich mit Gleichgesinnten aus der lokalen Tech-Szene in
            Hessen zu vernetzen, Erfahrungen auszutauschen und wertvolle Kontakte für Ihre
            berufliche oder unternehmerische Zukunft zu knüpfen. Viele der innovativsten Ideen und
            erfolgreichsten Kooperationen entstehen abseits des klassischen Arbeitsalltags in einer
            entspannten, inspirierenden Atmosphäre. Neben unseren fachspezifischen Formaten
            veranstalten wir auch regelmäßige Netzwerkabende, bei denen das persönliche Kennenlernen
            und der lockere Austausch im Vordergrund stehen.
          </p>
          <p>
            Wir aktualisieren diesen Kalender kontinuierlich, es lohnt sich also, regelmäßig
            vorbeizuschauen. Melden Sie sich frühzeitig für unsere begehrten Events an, da die
            Teilnehmerzahlen oft begrenzt sind, um eine hohe Qualität und intensive Interaktion zu
            gewährleisten. Wenn Sie selbst eine Idee für ein spannendes Thema haben, einen Vortrag
            halten möchten oder an einer Partnerschaft für zukünftige Veranstaltungen interessiert
            sind, zögern Sie nicht, uns anzusprechen. Wir freuen uns darauf, Sie bei unserem
            nächsten Community-Event in Wetzlar persönlich begrüßen zu dürfen!
          </p>
        </div>
      </section>
    </>
  );
}
