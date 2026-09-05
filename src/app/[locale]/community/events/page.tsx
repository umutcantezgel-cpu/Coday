import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
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
        'Four workshop formats on web performance, local SEO and conversion in Wetzlar. Flexible dates on demand — register your interest now.',
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
      'Vier Workshop-Formate zu Web-Performance, lokalem SEO und Conversion aus Wetzlar. Termine nach Bedarf — jetzt unverbindlich vormerken.',
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

  const pageUrl = `${BASE_URL}/${_locale}/community/events`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Community', url: `/${_locale}/community` },
      { name: isEn ? 'Events' : 'Veranstaltungen', url: `/${_locale}/community/events` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is omitted on purpose: the root layout already puts it in the head.
    '@graph': [
      breadcrumbs,
      // WebPage, not Event: the formats have no scheduled dates, and Event
      // schema without a real startDate would put an invented appointment
      // into search results.
      getWebPageSchema({
        url: pageUrl,
        name: isEn ? 'Coday Workshops & Meetups' : 'Coday Workshops & Meetups',
        description: isEn
          ? 'Workshop formats on web performance, local SEO and conversion, run from Wetzlar. Dates follow demand.'
          : 'Workshop-Formate zu Web-Performance, lokalem SEO und Conversion aus Wetzlar. Termine richten sich nach der Nachfrage.',
        locale: _locale,
      }),
    ],
  };

  // Rendered on both locales, so it is translated -- and it describes the four
  // formats the page actually lists, without implying scheduled dates.
  const seo = isEn
    ? {
        heading: 'Workshops and meetups on web development in Central Hesse',
        paragraphs: [
          'Coday runs four recurring formats out of Wetzlar. A deep-dive workshop of around two and a half hours on the Next.js App Router covers server components, server actions and where render time actually goes, built on the architecture behind this site. A strategy session of roughly 75 minutes deals with local SEO for Central Hesse and Rhine-Main: how city pages, district hubs and a consistent Schema.org hierarchy fit together, and how to stop your own pages competing with each other for the same search.',
          'A conversion masterclass of the same length looks at multi-step calculators and B2B lead funnels: why a needs calculator converts better than a plain contact form, what belongs in each step, and how to build one without turning the page into a JavaScript payload. The fourth format is an evening meetup in Wetzlar for founders and developers from the region — freelancers, agency owners, in-house developers. No stage, no pitch round, no sponsor slot.',
          'None of these formats carries a fixed date, and that is deliberate. Rather than publish a calendar of appointments that may not happen, dates follow demand: you register interest for a format and say whether online or on site suits you, which costs nothing and commits you to nothing. Once a format has enough people, a date that works for most of them is set and confirmed by email, always with at least two weeks notice. Nobody receives an invitation for the day after tomorrow.',
          'The three online formats are aimed at developers and agencies moving away from WordPress, at businesses that serve a region rather than the whole country, and at anyone whose contact form is currently the only way in. The meetup runs as soon as enough people within reach of Wetzlar say yes. If you would rather read than attend, the same material is available in written form in the Coday Academy, the tech wiki and the whitepapers.',
        ],
      }
    : {
        heading: 'Workshops und Meetups zu Webentwicklung in Mittelhessen',
        paragraphs: [
          'Coday bietet vier wiederkehrende Formate aus Wetzlar an. Ein Deep-Dive-Workshop von rund zweieinhalb Stunden zum Next.js App Router behandelt Server Components, Server Actions und die Frage, wohin die Render-Zeit tatsächlich geht — aufgebaut auf der Architektur hinter dieser Website. Eine Strategie-Session von rund 75 Minuten dreht sich um lokales SEO für Mittelhessen und Rhein-Main: wie Stadtseiten, Kreis-Hubs und eine konsistente Schema.org-Hierarchie zusammenspielen, und wie Sie verhindern, dass die eigenen Seiten sich um dieselbe Suchanfrage streiten.',
          'Eine Conversion-Masterclass gleicher Länge nimmt Multi-Step-Kalkulatoren und B2B-Lead-Funnels auseinander: warum ein Bedarfs-Kalkulator besser konvertiert als ein reines Kontaktformular, was in welchen Schritt gehört, und wie man ihn baut, ohne die Seite in eine JavaScript-Fracht zu verwandeln. Das vierte Format ist ein Abend-Meetup in Wetzlar für Gründer und Entwickler aus der Region — Freelancer, Agenturinhaber, In-House-Entwickler. Keine Bühne, keine Pitch-Runde, kein Sponsoren-Slot.',
          'Keines dieser Formate trägt ein festes Datum, und das ist Absicht. Statt einen Kalender mit Terminen zu veröffentlichen, die möglicherweise nie stattfinden, richten sich die Termine nach der Nachfrage: Sie merken Interesse an einem Format vor und sagen, ob online oder vor Ort passt — das kostet nichts und verpflichtet zu nichts. Sobald ein Format genug Interessenten hat, wird ein Termin gesucht, der den meisten passt, und per E-Mail bestätigt, immer mit mindestens zwei Wochen Vorlauf. Niemand bekommt eine Einladung für übermorgen.',
          'Die drei Online-Formate richten sich an Entwickler und Agenturen, die von WordPress wegwollen, an Betriebe, die eine Region bedienen statt der ganzen Republik, und an alle, deren Kontaktformular derzeit der einzige Weg herein ist. Das Meetup findet statt, sobald genügend Menschen im Umkreis von Wetzlar zusagen. Wer lieber liest als teilnimmt, findet dieselben Themen schriftlich in der Coday Academy, im Tech-Wiki und in den Whitepapers.',
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
