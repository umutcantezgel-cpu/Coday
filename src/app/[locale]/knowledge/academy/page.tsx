import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
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
      title: 'Web Design Academy | Knowledge for Central Hesse',
      description:
        'Learn web design basics at Coday Academy Wetzlar. Courses and tutorials for entrepreneurs and freelancers in Hesse. Start building your skills today.',
      keywords: [
        'Web Design Academy',
        'Web Design Training Wetzlar',
        'Web Development Course Hesse',
        'SEO Workshop Central Hesse',
        'Coday Academy',
      ],
      path: '/en/knowledge/academy',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Academy | Wissen für Mittelhessen',
    description:
      'Lernen Sie Webdesign Grundlagen in der Coday Academy Wetzlar. Kurse und Tutorials für Unternehmer und Selbstständige in Hessen. Jetzt Wissen aufbauen.',
    keywords: [
      'Webdesign Academy',
      'Webdesign lernen Wetzlar',
      'Webentwicklung Kurs Hessen',
      'SEO Schulung Mittelhessen',
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

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
    { name: 'Academy', url: `/${_locale}/knowledge/academy` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/knowledge/academy#collection`,
        name: isEn ? 'Coday Web Design Academy' : 'Coday Webdesign Academy',
        url: `${BASE_URL}/${_locale}/knowledge/academy`,
        description: isEn
          ? 'Learn web design basics at Coday Academy Wetzlar. Courses and tutorials for entrepreneurs and freelancers in Hesse.'
          : 'Lernen Sie Webdesign Grundlagen in der Coday Academy Wetzlar. Kurse und Tutorials für Unternehmer und Selbstständige in Hessen.',
        inLanguage: _locale,
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
          Erfolgreiches Webdesign lernen in Mittelhessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In der heutigen digitalen Welt ist eine professionelle Webpräsenz entscheidender denn
            je. Unsere Webdesign Academy in Wetzlar und ganz Mittelhessen bietet maßgeschneiderte
            Schulungen und Kurse für Unternehmer, Selbstständige und Marketing-Teams an, die ihre
            Online-Sichtbarkeit nachhaltig verbessern möchten. Dabei legen wir großen Wert auf
            praxisnahes Wissen, das Sie direkt umsetzen können. Ein gutes Webdesign ist nicht nur
            optisch ansprechend, sondern erfüllt auch wichtige funktionale Zwecke: Es leitet den
            Nutzer intuitiv, lädt schnell und ist für Suchmaschinen optimiert.
          </p>
          <p>
            In unseren Kursen lernen Sie, wie Sie moderne Content-Management-Systeme effektiv
            nutzen, warum Responsive Design heute absoluter Standard ist und wie Sie durch gezielte
            Conversion-Optimierung mehr Kunden gewinnen. Wir zeigen Ihnen, welche Rolle Farben,
            Typografie und Layout-Strukturen spielen und wie diese Elemente die Wahrnehmung Ihrer
            Marke beeinflussen. Darüber hinaus gehen wir tief auf das Thema Suchmaschinenoptimierung
            (SEO) ein. Sie erfahren, wie Google und Co. Websites bewerten, welche On-Page- und
            Off-Page-Faktoren wirklich wichtig sind und wie Sie wertvollen Content erstellen, der
            sowohl Ihren Nutzern als auch den Suchmaschinen gefällt.
          </p>
          <p>
            Ein weiterer Schwerpunkt liegt auf der Web-Performance. Ladezeiten sind ein kritischer
            Faktor für den Erfolg einer Website, und wir bringen Ihnen bei, wie Sie Bilder
            komprimieren, Caching-Strategien anwenden und den Code Ihrer Seite so verschlanken, dass
            Ihre Nutzer nicht warten müssen. Zudem behandeln wir rechtliche Aspekte wie die
            Datenschutz-Grundverordnung (DSGVO), damit Sie nicht nur erfolgreiche, sondern auch
            rechtssichere Websites betreiben können. Egal, ob Sie Anfänger sind oder bereits erste
            Erfahrungen gesammelt haben, unsere Academy holt Sie genau dort ab, wo Sie stehen.
          </p>
          <p>
            Mit realen Projektbeispielen, interaktiven Workshops und persönlicher Betreuung sorgen
            wir dafür, dass Sie das nötige Rüstzeug erhalten, um im digitalen Raum erfolgreich zu
            sein. Melden Sie sich noch heute an und investieren Sie in das Wissen, das Ihr
            Unternehmen voranbringt und Ihnen einen klaren Wettbewerbsvorteil in Ihrer Branche
            verschafft.
          </p>
        </div>
      </section>
    </>
  );
}
