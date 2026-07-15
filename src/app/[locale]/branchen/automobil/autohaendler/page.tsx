import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';

import fs from 'fs';
import path from 'path';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

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
      'autohaendler.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Car Dealers | Agency in Wetzlar';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Digital dominance for your industry.' : content.meta.description,
      path: `/${locale}/branchen/automobil/autohaendler`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Car Dealers | Agency in Wetzlar'
          : 'Webdesign für Autohändler | Agentur in Wetzlar',
      description:
        locale === 'en'
          ? 'Digital dominance for your industry.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/automobil/autohaendler`,
      type: 'money',
    });
  }
}

export default async function SubIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
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
      'autohaendler.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h2 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h2>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
      </div>
    );
  }

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Car Dealers | Agency in Wetzlar | Coday'
      : 'Webdesign für Autohändler | Agentur in Wetzlar | Coday';
  return (
    <>
      <script
        id="schema-branchen-autohaendler"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _locale === 'en' ? 'Web Design for Car Dealers' : 'Webdesign für Autohändler',
                description:
                  _locale === 'en'
                    ? 'Web design for car dealers in Wetzlar and Hesse. Digital dominance for your industry.'
                    : 'Webdesign für Autohändler in Wetzlar und Hessen. Digitale Dominanz für Ihre Branche.',
                url: `${BASE_URL}/${_locale}/branchen/automobil/autohaendler`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={undefined} />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Webdesign für Autohändler: Digitale Dominanz in einer kompetitiven Branche
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In der heutigen, stark digitalisierten Welt ist der erste Eindruck eines Autohauses oft
            nicht mehr der Showroom vor Ort, sondern die Webseite. Ein professionelles, hochmodernes
            Webdesign für Autohändler ist daher von entscheidender Bedeutung, um sich in einem hart
            umkämpften Markt durchzusetzen und potenzielle Käufer vom ersten Klick an zu überzeugen.
            Eine herausragende Online-Präsenz vermittelt Vertrauen, Expertise und Seriosität –
            Eigenschaften, die beim Kauf eines Fahrzeugs unerlässlich sind. Potenzielle Kunden
            recherchieren intensiv online, vergleichen Modelle, Preise und Händler, bevor sie
            überhaupt einen Fuß in ein Autohaus setzen. Wenn Ihre Webseite langsam lädt, schwer zu
            navigieren ist oder auf mobilen Geräten nicht optimal dargestellt wird, verlieren Sie
            wertvolle Leads an die Konkurrenz.
          </p>
          <p>
            Darüber hinaus spielt die Suchmaschinenoptimierung (SEO) eine zentrale Rolle für den
            digitalen Erfolg. Es reicht nicht aus, nur eine ästhetisch ansprechende Webseite zu
            haben; sie muss auch von Suchmaschinen wie Google gefunden werden. Durch gezielte
            Keyword-Strategien, lokale SEO-Maßnahmen (z. B. "Autohaus Wetzlar" oder "Gebrauchtwagen
            Hessen") und technisch einwandfreien Code sorgen wir dafür, dass Ihr Autohaus in den
            Suchergebnissen ganz oben erscheint. Eine gut strukturierte Webseite mit klaren
            Call-to-Actions (CTAs) – wie Probefahrt vereinbaren, Rückruf anfordern oder Fahrzeug
            anfragen – erhöht die Conversion-Rate signifikant. Auch die Integration von hochwertigen
            Fahrzeugbildern, 360-Grad-Ansichten und detaillierten Fahrzeugbeschreibungen trägt dazu
            bei, das Interesse der Nutzer zu wecken und zu halten.
          </p>
          <p>
            Ein weiterer wichtiger Aspekt ist die Ladezeit der Webseite (Performance). Studien
            zeigen, dass Nutzer eine Seite verlassen, wenn sie länger als drei Sekunden zum Laden
            benötigt. Gerade bei Webseiten für Autohändler, die oft viele hochauflösende Bilder und
            Videos enthalten, ist eine technische Optimierung unabdingbar. Wir setzen auf modernste
            Technologien und Frameworks, um sicherzustellen, dass Ihre Webseite nicht nur
            atemberaubend aussieht, sondern auch blitzschnell lädt. Vertrauen Sie auf Coday, um Ihr
            Autohaus digital auf die Überholspur zu bringen und langfristigen Erfolg in der
            Automobilbranche zu sichern.
          </p>
        </div>
      </section>
    </>
  );
}
