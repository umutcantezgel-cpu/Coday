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
            Warum solltest du Kooperationspartner oder Freelancer bei Coday werden? Bei uns steht
            das handwerkliche Können und die transparente Zusammenarbeit im Mittelpunkt. Wir glauben
            daran, dass die besten digitalen Produkte dann entstehen, wenn sich jeder Partner
            wertgeschätzt fühlt und seine individuellen Stärken voll entfalten kann. Deshalb setzen
            wir auf 100% Remote-Work, modernste Arbeitsmittel und anspruchsvolle
            Enterprise-Projekte. Ob du ein erfahrener Frontend-Entwickler bist, der sich bestens mit
            React und Next.js auskennt, ein kreativer UI/UX-Designer mit einem Auge für
            Barrierefreiheit, oder ein Stratege für technisches SEO – wir freuen uns auf den
            Austausch.
          </p>
          <p>
            Unsere Projekte sind vielfältig und anspruchsvoll. Von maßgeschneiderten
            Unternehmens-Websites bis hin zu hochkomplexen Webapplikationen – wir legen größten Wert
            auf sauberen Code, barrierefreies Design und herausragende Performance nach Google Core
            Web Vitals Standards.
          </p>
          <p>
            Werde Teil unseres Partner-Netzwerks in Wetzlar und DACH. Schau dir unsere aktuellen
            Projekt-Ausschreibungen an oder sende uns dein Portfolio. Wir freuen uns darauf, mehr
            über deine Fähigkeiten und deine bisherigen Arbeiten zu erfahren.
          </p>
        </div>
      </section>
    </>
  );
}
