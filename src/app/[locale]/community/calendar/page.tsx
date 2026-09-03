import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
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
    // The root layout is the single source of the Organization node.
    '@graph': [
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

  // The prose below is rendered on both locales, so it has to be translated
  // like everything else on the page -- and it has to describe project
  // availability, which is what the page is actually about.
  const seo = isEn
    ? {
        heading: 'Lead times and start dates for a website project in Central Hesse',
        paragraphs: [
          'This page answers the two questions that come up before any quote: how soon can a website start, and how long does it take? An enquiry is read and answered within 24 hours by the owner, Umutcan Emre Tezgel. What follows is a needs analysis of roughly twenty minutes about what the site has to achieve, who it is for and what already exists. A typical business website then goes from the go-ahead to live in ten to fourteen working days. Online shops and portals are larger and are scoped separately in that same call.',
          'Those timings hold because Coday is one developer running only a handful of builds at once, not an agency queueing work behind a pipeline. That is where the short turnaround comes from, and it is also the reason a start date is worth asking about early: capacity in a given month is limited by design rather than by workload. If the month you have in mind is already taken, you will hear that in the first reply instead of after a proposal.',
          'Nothing is invoiced before a price is fixed. The call, the analysis and the written quote cost nothing and commit you to nothing. Billing starts only once you accept a binding fixed price you already have in writing, split into fifty percent at kick-off and fifty percent after your approval. There is no hourly rate that grows during the project and no monthly subscription attached to the finished site.',
          'On-site meetings are normal rather than an exception. Wetzlar, Giessen, Marburg and the Lahn-Dill district are a short drive; Frankfurt and the Rhine-Main area are around forty minutes via the A5 and A45. And the launch date is not the end of the engagement: performance and Core Web Vitals are measured after the site goes live rather than promised before it, and the guarantee page sets out exactly what that covers.',
        ],
      }
    : {
        heading: 'Vorlaufzeit, Starttermin und Ablauf eines Website-Projekts',
        paragraphs: [
          'Diese Seite beantwortet die zwei Fragen, die vor jedem Angebot stehen: Wie schnell kann eine Website starten, und wie lange dauert sie? Jede Anfrage liest und beantwortet Inhaber Umutcan Emre Tezgel innerhalb von 24 Stunden selbst. Danach folgt eine Bedarfsanalyse von rund zwanzig Minuten darüber, was die Website leisten muss, für wen sie gedacht ist und was bereits existiert. Eine übliche Unternehmensseite geht anschließend in zehn bis vierzehn Werktagen von der Freigabe bis zum Livegang. Onlineshops und Portale sind größer und werden im selben Gespräch getrennt kalkuliert.',
          'Diese Zeiten halten, weil Coday ein Entwickler ist und bewusst nur wenige Projekte gleichzeitig laufen — keine Agentur, die Aufträge hinter einer Pipeline einreiht. Genau daher kommt die kurze Umsetzungszeit, und genau deshalb lohnt es sich, früh nach einem Starttermin zu fragen: Die Kapazität eines Monats ist absichtlich begrenzt, nicht zufällig. Ist der Monat, den Sie im Kopf haben, bereits vergeben, erfahren Sie das in der ersten Antwort und nicht erst nach einem Angebot.',
          'Vor dem Festpreis wird nichts berechnet. Gespräch, Analyse und schriftliches Angebot kosten nichts und verpflichten zu nichts. Abgerechnet wird erst, wenn Sie einem verbindlichen Festpreis zustimmen, den Sie schriftlich vorliegen haben — aufgeteilt in 50 Prozent bei Projektstart und 50 Prozent nach Ihrer Abnahme. Es gibt keinen Stundensatz, der während des Projekts wächst, und kein Abo, das an der fertigen Website hängt.',
          'Vor-Ort-Termine sind der Normalfall, nicht die Ausnahme. Wetzlar, Gießen, Marburg und der Lahn-Dill-Kreis sind eine kurze Fahrt, Frankfurt und das Rhein-Main-Gebiet liegen über A5 und A45 rund vierzig Minuten entfernt. Und der Livegang ist nicht das Ende der Zusammenarbeit: Performance und Core Web Vitals werden nach der Veröffentlichung gemessen statt vorher versprochen. Was das im Einzelnen umfasst, steht auf der Garantie-Seite.',
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
        <h2 className="text-3xl font-display font-bold mb-6">{seo.heading}</h2>
        <div className="space-y-4 text-base leading-relaxed">
          {seo.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
