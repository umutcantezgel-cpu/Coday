import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/DienstleistungClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Service Providers | Wetzlar Hesse',
      description:
        'Professional websites for service providers in Wetzlar and Hesse. Tax advisors, brokers and consultants win more clients online. Get started today.',
      path: '/en/industries/dienstleistung',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Dienstleister | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.',
    path: '/de/industries/dienstleistung',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | dienstleistung"
        description="Erfahren Sie mehr über dienstleistung"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Webdesign für Dienstleister in Hessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Willkommen bei Coday, Ihrer Premium-Webdesign-Agentur in Wetzlar und ganz Hessen,
            spezialisiert auf die Erstellung professioneller Webseiten für Dienstleister. In der
            heutigen digitalen Welt ist ein starker Online-Auftritt für Dienstleistungsunternehmen
            unerlässlich. Egal ob Sie als Steuerberater, Makler, Unternehmensberater, Handwerker
            oder im Gesundheitswesen tätig sind – Ihre Webseite ist oft der erste Berührungspunkt
            mit potenziellen Neukunden. Wir verstehen die spezifischen Anforderungen und
            Herausforderungen Ihrer Branche und entwickeln maßgeschneiderte digitale Lösungen, die
            Ihre Expertise optimal präsentieren und Vertrauen bei Ihrer Zielgruppe aufbauen.
          </p>
          <p>
            Unsere Webseiten für Dienstleister zeichnen sich durch ein klares, modernes Design,
            intuitive Benutzerführung und höchste technische Performance aus. Wir legen großen Wert
            darauf, dass Ihre Kernkompetenzen und Serviceangebote auf den ersten Blick erkennbar
            sind. Durch gezielte Suchmaschinenoptimierung (SEO) stellen wir zudem sicher, dass Sie
            in Wetzlar, Gießen, Frankfurt und darüber hinaus von den richtigen Kunden gefunden
            werden. Eine ansprechende Darstellung Ihrer Dienstleistungen, kombiniert mit strategisch
            platzierten Call-to-Action-Elementen, verwandelt Website-Besucher effektiv in wertvolle
            Leads und langfristige Kunden.
          </p>
          <p>
            Darüber hinaus integrieren wir auf Wunsch praktische Funktionen wie
            Online-Terminbuchungssysteme, Kundenportale oder interaktive Kontaktformulare, die Ihre
            internen Abläufe digitalisieren und effizienter gestalten. So sparen Sie wertvolle Zeit
            im Arbeitsalltag und bieten Ihren Kunden gleichzeitig einen hervorragenden digitalen
            Service. Auch das Thema Barrierefreiheit und Responsive Design steht bei uns im Fokus –
            Ihre neue Webseite wird auf allen Endgeräten, vom Smartphone bis zum Desktop-Rechner,
            perfekt dargestellt und ist für alle Nutzergruppen leicht zugänglich.
          </p>
          <p>
            Vertrauen Sie auf unsere langjährige Erfahrung und unser tiefgreifendes technisches
            Know-how. Wir begleiten Sie von der ersten Beratung über die Konzeption und Gestaltung
            bis hin zur finalen Programmierung und dem laufenden Support. Lassen Sie uns gemeinsam
            Ihre digitale Präsenz auf das nächste Level heben und Ihren Erfolg als Dienstleister
            nachhaltig steigern. Kontaktieren Sie uns noch heute für ein unverbindliches
            Beratungsgespräch. Wir freuen uns darauf, Ihr Projekt kennenzulernen und gemeinsam eine
            Strategie für Ihr digitales Wachstum zu entwickeln.
          </p>
        </div>
      </section>
    </>
  );
}
