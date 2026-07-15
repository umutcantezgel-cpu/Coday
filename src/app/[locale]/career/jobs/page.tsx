import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/JobsClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Job Openings | Web Design Agency Wetzlar Hesse',
      description:
        'Current job openings at Coday in Wetzlar. We are looking for web designers, developers and creatives for exciting projects in Central Hesse. Apply now.',
      path: '/en/career/jobs',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Stellenangebote | Webdesign Agentur Wetzlar Hessen',
    description:
      'Aktuelle Stellenangebote bei Coday in Wetzlar. Wir suchen Webdesigner, Entwickler und Kreative für spannende Projekte in Mittelhessen. Jetzt bewerben.',
    path: '/de/career/jobs',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Job Openings | Web Design Agency Wetzlar Hesse | Coday'
      : 'Stellenangebote | Webdesign Agentur Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Current job openings at Coday in Wetzlar. We are looking for web designers, developers and creatives for exciting projects in Central Hesse. Apply now.'
      : 'Aktuelle Stellenangebote bei Coday in Wetzlar. Wir suchen Webdesigner, Entwickler und Kreative für spannende Projekte in Mittelhessen. Jetzt bewerben.';
  return (
    <>
      <SeoHead title="Coday | jobs" description="Erfahren Sie mehr über jobs" pageType="default" />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Jobs in Webdesign & Development in Wetzlar
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Willkommen auf unserer Karriereseite für Jobs in den Bereichen Webdesign, Entwicklung
            und Online-Marketing bei Coday in Wetzlar. Wir sind ständig auf der Suche nach
            motivierten Talenten, die unsere Vision von erstklassigen digitalen Erlebnissen teilen.
            Als aufstrebende Webagentur in Mittelhessen bieten wir ein dynamisches Arbeitsumfeld, in
            dem Kreativität und technische Exzellenz Hand in Hand gehen. Unser Fokus liegt auf der
            Entwicklung maßgeschneiderter, hochperformanter Webseiten und Applikationen für
            regionale und überregionale Kunden.
          </p>
          <p>
            Warum solltest du Teil unseres Teams werden? Bei uns steht der Mensch im Mittelpunkt.
            Wir glauben daran, dass die besten Ergebnisse dann entstehen, wenn sich jeder
            Mitarbeiter wertgeschätzt fühlt und seine individuellen Stärken voll entfalten kann.
            Deshalb bieten wir flexible Arbeitszeiten, moderne Arbeitsmittel und die Möglichkeit,
            kontinuierlich Neues zu lernen. Ob du ein erfahrener Frontend-Entwickler bist, der sich
            bestens mit React und Next.js auskennt, ein kreativer Webdesigner mit einem Auge für
            perfekte Typografie und UX/UI, oder ein Stratege für digitales Marketing – wir möchten
            dich kennenlernen.
          </p>
          <p>
            Unsere Projekte sind vielfältig und anspruchsvoll. Von der Konzeption innovativer
            E-Commerce-Lösungen bis hin zur Umsetzung komplexer Unternehmensportale – Langeweile
            kommt bei uns garantiert nicht auf. Wir legen großen Wert auf sauberen Code,
            barrierefreies Design und herausragende Performance, ganz im Sinne unserer strengen
            Qualitätsstandards. Wenn du also Leidenschaft für das Web mitbringst, gerne im Team
            arbeitest und bereit bist, Verantwortung zu übernehmen, dann bist du bei uns genau
            richtig.
          </p>
          <p>
            Wetzlar und Umgebung bieten zudem eine hohe Lebensqualität, die perfekte Balance
            zwischen Natur und städtischem Leben. Werde Teil unserer Erfolgsgeschichte und gestalte
            mit uns die digitale Zukunft unserer Kunden. Schau dir unsere aktuellen Stellenangebote
            an und bewirb dich noch heute. Wir freuen uns darauf, mehr über dich, deine Fähigkeiten
            und deine bisherigen Projekte zu erfahren. Gemeinsam können wir digitale Meisterwerke
            erschaffen, die nicht nur gut aussehen, sondern auch messbaren Erfolg bringen. Deine
            Karriere bei Coday startet hier!
          </p>
        </div>
      </section>
    </>
  );
}
