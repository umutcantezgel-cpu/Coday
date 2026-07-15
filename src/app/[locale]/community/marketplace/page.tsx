import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/MarketplaceClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Community Marketplace | Web Design Network Wetzlar',
      description:
        'The digital marketplace of the Coday community in Wetzlar. Find service providers, tools and resources for your next web project in Central Hesse.',
      path: '/en/community/marketplace',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Marktplatz | Webdesign Netzwerk Wetzlar',
    description:
      'Der digitale Marktplatz der Coday Community in Wetzlar. Finden Sie Dienstleister, Tools und Ressourcen für Ihr nächstes Webprojekt in Mittelhessen.',
    path: '/de/community/marketplace',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | marketplace"
        description="Erfahren Sie mehr über marketplace"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Der Coday Community Marktplatz – Ihr Netzwerk für Webdesign in Wetzlar
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Herzlich willkommen auf dem offiziellen Community Marktplatz von Coday, Ihrem zentralen
            Knotenpunkt für digitales Wachstum, Webdesign und erstklassige Dienstleistungen in
            Wetzlar und der gesamten Region Mittelhessen. Unser Marktplatz ist weitaus mehr als nur
            ein einfaches Verzeichnis – er ist ein lebendiges, dynamisches Netzwerk aus
            Fachexperten, innovativen Dienstleistern und zukunftsorientierten Unternehmen, die
            gemeinsam die digitale Landschaft prägen. Hier bringen wir Angebot und Nachfrage im
            Bereich der modernen Webentwicklung, des E-Commerce und des digitalen Marketings
            effizient zusammen. Egal, ob Sie auf der Suche nach spezialisierten Tools,
            maßgeschneiderten Ressourcen oder erfahrenen Freelancern für Ihr nächstes großes
            Webprojekt sind, auf unserem Marktplatz werden Sie garantiert fündig.
          </p>
          <p>
            Die Stärke unseres Netzwerks liegt in der engen lokalen Verbundenheit mit Wetzlar und
            Hessen, kombiniert mit einem globalen Verständnis für modernste Technologietrends. Wir
            wissen, dass herausragende digitale Produkte oft das Ergebnis erfolgreicher
            Kollaborationen sind. Deshalb fördert der Coday Community Marktplatz den direkten
            Austausch zwischen Kreativen, Entwicklern und Unternehmern. Finden Sie hier Experten für
            anspruchsvolle Headless-CMS-Integrationen, Spezialisten für Suchmaschinenoptimierung
            (SEO) oder talentierte UI/UX-Designer, die Ihrer Marke ein unverwechselbares Gesicht
            verleihen. Jedes Mitglied und jeder gelistete Dienstleister teilt unseren hohen Anspruch
            an Qualität, Performance und Ästhetik.
          </p>
          <p>
            Darüber hinaus bietet der Marktplatz Zugang zu exklusiven Ressourcen und Best Practices,
            die den Arbeitsalltag von Web-Profis erheblich erleichtern. Von handverlesenen
            Code-Snippets über erprobte Design-Templates bis hin zu detaillierten Leitfäden für
            Performance-Optimierung (wie Core Web Vitals) – unsere Community teilt ihr Wissen
            großzügig. Dieser kollaborative Ansatz sorgt dafür, dass alle Beteiligten kontinuierlich
            voneinander lernen und wachsen können. Wenn Sie selbst Dienstleistungen oder digitale
            Produkte anbieten, die für die Webdesign-Branche relevant sind, bietet Ihnen dieser
            Marktplatz die ideale Plattform, um Ihre Sichtbarkeit in der Region Wetzlar massiv zu
            erhöhen und wertvolle Geschäftskontakte zu knüpfen.
          </p>
          <p>
            Treten Sie noch heute der Coday Community bei und profitieren Sie von den vielfältigen
            Synergieeffekten unseres starken Netzwerks. Gemeinsam treiben wir die digitale
            Transformation in Mittelhessen voran und setzen neue Standards in der Webentwicklung.
            Der Community Marktplatz ist Ihr verlässlicher Begleiter auf dem Weg zum digitalen
            Erfolg. Durchstöbern Sie die verschiedenen Kategorien, entdecken Sie innovative
            Lösungsansätze und vernetzen Sie sich mit den besten Köpfen der Branche. Coday Wetzlar
            steht für Premium-Qualität, und genau diesen Standard spiegelt unser Marktplatz in jeder
            Hinsicht wider. Wir laden Sie herzlich ein, Teil dieser spannenden Reise zu werden.
          </p>
        </div>
      </section>
    </>
  );
}
