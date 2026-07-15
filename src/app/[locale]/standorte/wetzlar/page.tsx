import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { getOrganizationSchema, getDynamicLocationSchema, BASE_URL } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      `wetzlar.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design Agency Wetzlar | Top Websites';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Local expertise meets high-end tech.' : content.meta.description,
      path: `/${locale}/standorte/wetzlar`,
      type: 'money',
    });
  } catch (e) {
    // Fallback if file doesn't exist yet
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design Agency Wetzlar | Top Websites'
          : 'Webdesign Agentur Wetzlar | Top Webseiten',
      description:
        locale === 'en'
          ? 'Local expertise meets high-end tech.'
          : 'Lokale Expertise trifft auf High-End Tech.',
      path: `/${locale}/standorte/wetzlar`,
      type: 'money',
    });
  }
}

export default async function WetzlarLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      `wetzlar.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Wetzlar SEO Content is currently being generated...</div>
    );
  }

  const cityData = getCityBySlug('wetzlar');

  const _locale = (await params)?.locale || 'de';

  const locationSchema = getDynamicLocationSchema({
    city: 'Wetzlar',
    description:
      _locale === 'en'
        ? 'Web design agency in Wetzlar — Premium websites with Next.js.'
        : 'Webdesign Agentur in Wetzlar — Premium Websites mit Next.js, SEO & Generative Engine Optimization für lokale Unternehmen.',
    url: `${BASE_URL}/${_locale}/standorte/wetzlar`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), locationSchema],
  };

  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Agency Wetzlar | Top Websites | Coday'
      : 'Webdesign Agentur Wetzlar | Top Webseiten | Coday';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} cityData={cityData} />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Webdesign Agentur Wetzlar: Ihr Partner für digitalen Erfolg
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Wetzlar, als wichtiges wirtschaftliches und kulturelles Zentrum in Mittelhessen, ist die
            Heimat vieler innovativer Unternehmen. Um sich in diesem dynamischen Umfeld zu
            behaupten, ist eine professionelle und leistungsstarke Website unverzichtbar. Als Ihre
            lokale Webdesign Agentur für Wetzlar und Umgebung verstehen wir die spezifischen
            Anforderungen des regionalen Marktes. Wir entwickeln maßgeschneiderte digitale Lösungen,
            die Ihr Unternehmen optimal präsentieren und Ihnen einen echten Wettbewerbsvorteil
            verschaffen. Eine Website ist heute weit mehr als nur eine digitale Visitenkarte; sie
            ist das Herzstück Ihres Online-Marketings und der wichtigste Kanal zur Gewinnung neuer
            Kunden und qualifizierter Mitarbeiter. Wir legen großen Wert auf ein modernes,
            ansprechendes Design, das Ihre Markenidentität perfekt widerspiegelt und Vertrauen bei
            Ihren Zielgruppen aufbaut. Dabei kombinieren wir kreative Exzellenz mit technischer
            Perfektion, um Websites zu schaffen, die nicht nur optisch überzeugen, sondern auch
            messbare Ergebnisse liefern.
          </p>
          <p>
            Ein wesentlicher Faktor für den Erfolg einer Website in Wetzlar ist die lokale
            Suchmaschinenoptimierung (Local SEO). Was nützt die schönste Internetpräsenz, wenn sie
            von potenziellen Kunden in der Region nicht gefunden wird? Wir optimieren Ihre Website
            gezielt für relevante Suchbegriffe rund um Wetzlar, den Lahn-Dill-Kreis und
            Mittelhessen. Durch die intelligente Integration von strukturierten Daten, optimierten
            Inhalten und einer durchdachten Backlink-Strategie sorgen wir dafür, dass Ihr
            Unternehmen bei Google-Suchanfragen ganz oben erscheint. Darüber hinaus garantieren wir
            blitzschnelle Ladezeiten und eine perfekte Darstellung auf allen Endgeräten (Responsive
            Design). In einer Zeit, in der immer mehr Menschen über ihr Smartphone im Internet
            surfen, ist die mobile Optimierung entscheidend für eine hohe Benutzerfreundlichkeit und
            niedrige Absprungraten. Wir setzen modernste Technologien ein, um sicherzustellen, dass
            Ihre Website den höchsten Ansprüchen an Performance und Sicherheit (DSGVO-Konformität)
            gerecht wird.
          </p>
          <p>
            Als ganzheitlicher Partner begleiten wir Sie von der ersten Idee bis zum erfolgreichen
            Launch und darüber hinaus. Wir nehmen uns die Zeit, Ihr Unternehmen, Ihre Ziele und Ihre
            Zielgruppe genau zu verstehen, um eine Strategie zu entwickeln, die perfekt zu Ihnen
            passt. Auch nach der Fertigstellung Ihrer Website lassen wir Sie nicht allein. Wir
            bieten regelmäßige Wartung, Updates und kontinuierliche Optimierungen, um
            sicherzustellen, dass Ihre Online-Präsenz stets auf dem neuesten Stand bleibt und
            maximale Leistung bringt. Ob Sie eine neue Website erstellen lassen möchten, einen
            bestehenden Internetauftritt überarbeiten oder Ihre Sichtbarkeit in Suchmaschinen
            verbessern wollen – wir sind Ihre Experten für Webdesign in Wetzlar. Lassen Sie uns
            gemeinsam Ihre digitale Erfolgsgeschichte schreiben und Ihr Unternehmen fit für die
            Zukunft machen. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
          </p>
        </div>
      </section>
    </>
  );
}
