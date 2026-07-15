import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
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
      title: 'Community Calendar | Web Design Agency Wetzlar',
      description:
        'Current events and dates from the Coday community in Wetzlar. Networking and knowledge sharing for entrepreneurs and web design enthusiasts in Hesse.',
      path: '/en/community/calendar',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Kalender | Webdesign Agentur Wetzlar',
    description:
      'Aktuelle Events und Termine der Coday Community in Wetzlar. Networking und Wissensaustausch für Unternehmer und Webdesign Interessierte in Hessen.',
    path: '/de/community/calendar',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | calendar"
        description="Erfahren Sie mehr über calendar"
        pageType="default"
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
