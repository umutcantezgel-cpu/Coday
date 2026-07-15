import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/CultureClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Agency Culture | Web Design Wetzlar Hesse',
      description:
        'The culture at Coday in Wetzlar. Collaboration, innovation and passion for excellent web design. This is how we work at our agency in Hesse region.',
      path: '/en/career/culture',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Agenturkultur | Webdesign Wetzlar Hessen',
    description:
      'Die Kultur bei Coday in Wetzlar. Kollaboration, Innovation und Leidenschaft für exzellentes Webdesign. So arbeiten wir in unserer Agentur in Hessen.',
    path: '/de/career/culture',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Our Agency Culture | Web Design Wetzlar Hesse | Coday'
      : 'Unsere Agenturkultur | Webdesign Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'The culture at Coday in Wetzlar. Collaboration, innovation and passion for excellent web design. This is how we work at our agency in Hesse region.'
      : 'Die Kultur bei Coday in Wetzlar. Kollaboration, Innovation und Leidenschaft für exzellentes Webdesign. So arbeiten wir in unserer Agentur in Hessen.';
  return (
    <>
      <SeoHead
        title="Coday | culture"
        description="Erfahren Sie mehr über culture"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Unsere Agenturkultur: Wo Innovation auf exzellentes Webdesign trifft
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Die Wahl der richtigen Webdesign-Agentur ist eine entscheidende Weichenstellung für den
            Erfolg Ihres digitalen Auftritts. Doch was unterscheidet eine gute von einer
            herausragenden Agentur? Bei Coday in Wetzlar, tief verwurzelt in der dynamischen Region
            Hessen, glauben wir, dass es die einzigartige Agenturkultur ist. Unsere Kultur ist das
            feste Fundament, auf dem kreative Höchstleistungen, technologische Innovationen und vor
            allem die nachhaltige Zufriedenheit unserer geschätzten Kunden aufbauen. Eine starke
            Unternehmenskultur ist für uns kein bloßes Buzzword, sondern die tägliche gelebte
            Praxis, die sich in jedem unserer abgeschlossenen Projekte und in jeder Interaktion mit
            Ihnen widerspiegelt.
          </p>
          <p>
            Kollaboration wird bei uns nicht nur großgeschrieben, sie wird in jedem Aspekt unserer
            Arbeit aktiv gelebt. Wir verstehen uns als integralen, mitdenkenden Teil Ihres Teams,
            der Ihre individuelle Vision mit echter Leidenschaft, tiefgehendem Verständnis und
            herausragender technischer Expertise in die digitale Realität umsetzt. Diese enge,
            vertrauensvolle Zusammenarbeit ermöglicht es uns, exakt maßgeschneiderte Lösungen zu
            entwickeln, die punktgenau auf die spezifischen Bedürfnisse, Herausforderungen und
            strategischen Ziele Ihres Unternehmens zugeschnitten sind. Wir hören Ihnen aufmerksam
            zu, wir hinterfragen bestehende Konzepte kritisch, und wir optimieren jeden einzelnen
            Prozessschritt, bis das endgültige Ergebnis nicht nur Sie als Auftraggeber, sondern
            insbesondere auch Ihre anvisierte Zielgruppe restlos und nachhaltig überzeugt.
          </p>
          <p>
            Ein weiterer, unverzichtbarer Pfeiler unserer fortschrittlichen Agenturkultur ist die
            ständige, proaktive Suche nach Innovation. Das digitale Zeitalter wandelt sich rasant,
            und was gestern noch als absolute Best Practice galt, kann morgen schon völlig überholt
            sein. Deshalb legen wir allergrößten Wert auf die kontinuierliche Weiterbildung unseres
            Teams und das mutige Erproben zukunftsweisender Technologien. Ob es um die
            allerneuesten, bahnbrechenden Trends im modernen Webdesign, um datengetriebene und
            fortgeschrittene SEO-Strategien zur Maximierung Ihrer Reichweite oder um
            hochperformante, skalierbare Architekturansätze mit modernsten Frameworks wie Next.js
            und React geht – wir sind für Sie stets am Puls der Zeit. Diese unbändige
            Innovationsfreude fließt tagtäglich direkt in die vielfältigen Projekte unserer Kunden
            ein und sichert ihnen einen entscheidenden, messbaren Wettbewerbsvorteil in der hart
            umkämpften digitalen Landschaft von Wetzlar, Mittelhessen und weit darüber hinaus.
          </p>
          <p>
            Doch all dieses tiefe technologische Know-how und strategische Wissen wäre nur halb so
            viel wert ohne die aufrichtige Leidenschaft für exzellentes Webdesign, die jeden
            Einzelnen bei Coday von innen heraus antreibt. Wir lieben das, was wir tun, aus vollstem
            Herzen. Jedes einzelne Pixel, jede komplexe Codezeile und jede durchdachte User Journey
            wird mit der allergrößten Sorgfalt und dem unbedingten Anspruch auf absolute Perfektion
            gestaltet. Für uns ist eine moderne Website nicht nur eine einfache digitale
            Visitenkarte, sondern vielmehr ein kraftvolles, interaktives Instrument, um einzigartige
            Marken erlebbar zu machen, positive Emotionen zu wecken und letztendlich messbare,
            langfristige geschäftliche Erfolge zu generieren. Wenn Sie eine verlässliche Agentur
            suchen, die Ihre komplexen digitalen Herausforderungen mit echtem Herzblut, fundierter
            Expertise und einer bemerkenswert starken Kultur der Zusammenarbeit erfolgreich
            meistert, dann sind Sie bei Coday genau an der richtigen Adresse.
          </p>
        </div>
      </section>
    </>
  );
}
