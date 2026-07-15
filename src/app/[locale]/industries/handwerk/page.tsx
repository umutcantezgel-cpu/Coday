import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/HandwerkClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Craftsmen | Wetzlar & Hesse',
      description:
        'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.',
      path: '/en/industries/handwerk',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
    path: '/de/industries/handwerk',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen | Wetzlar & Hesse | Coday'
      : 'Webdesign für Handwerker | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.'
      : 'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.';
  return (
    <>
      <SeoHead
        title="Coday | handwerk"
        description="Erfahren Sie mehr über handwerk"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          Professionelles Webdesign für Handwerker in Wetzlar und Hessen
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            In der heutigen, stark digitalisierten Welt ist eine professionelle, moderne Website für
            Handwerksbetriebe längst kein Luxus mehr, sondern eine absolute geschäftliche
            Notwendigkeit. Egal ob Sie als erfahrener Elektriker, zuverlässiger Sanitärinstallateur,
            kreativer Schreiner oder vielseitiger Dachdecker in Wetzlar, Mittelhessen oder der
            gesamten Region Hessen tätig sind – Ihre potenziellen Kunden suchen heutzutage fast
            ausschließlich online über Suchmaschinen wie Google nach den passenden, lokalen
            Dienstleistern für ihre spezifischen Anliegen. Wenn Ihr Handwerksbetrieb in diesen
            entscheidenden Suchergebnissen nicht präsent ist oder Ihre aktuelle Website veraltet,
            unübersichtlich oder nicht für mobile Endgeräte wie Smartphones optimiert ist, verlieren
            Sie Tag für Tag wertvolle Aufträge an Ihre direkten, digital besser aufgestellten
            Mitbewerber. Genau hier setzen wir von Coday als Ihre spezialisierte Webdesign-Agentur
            an, um Ihren digitalen Auftritt zu revolutionieren.
          </p>
          <p>
            Wir haben uns bei Coday ganz bewusst darauf spezialisiert, maßgeschneiderte,
            hochkonvertierende Webdesign-Lösungen speziell für kleine und mittelständische
            Handwerksunternehmen zu entwickeln. Wir verstehen die einzigartigen Herausforderungen
            und die besonderen Bedürfnisse Ihrer traditionsreichen Branche ganz genau. Ein
            Handwerker hat im stressigen Arbeitsalltag oft weder die nötige Zeit noch die tiefe
            technische Expertise, um sich intensiv um die komplexe Erstellung, Pflege und
            Suchmaschinenoptimierung (SEO) einer modernen Firmenwebsite zu kümmern. Aus diesem Grund
            bieten wir Ihnen einen umfassenden, sorgenfreien Full-Service-Ansatz an. Wir nehmen
            Ihnen den gesamten digitalen Prozess ab – von der ersten, fundierten strategischen
            Beratung und der Entwicklung eines ansprechenden, branchengerechten Designs über die
            saubere, performante technische Programmierung bis hin zur langfristigen Wartung, Pflege
            und kontinuierlichen Optimierung Ihrer neuen Online-Präsenz.
          </p>
          <p>
            Unser oberstes, erklärtes Ziel ist es dabei stets, Ihnen durch eine signifikant erhöhte
            lokale Sichtbarkeit bei Google und anderen wichtigen Suchmaschinen nachhaltig zu
            deutlich mehr qualifizierten Kundenanfragen und lukrativen Aufträgen aus Ihrer direkten
            Umgebung zu verhelfen. Eine von Coday professionell erstellte Website ist dabei weit
            mehr als nur eine statische, digitale Visitenkarte im Netz. Sie fungiert vielmehr als
            Ihr unermüdlicher, digitaler Vertriebsmitarbeiter, der 24 Stunden am Tag, 7 Tage die
            Woche für Sie im Einsatz ist. Sie präsentiert Ihr hart erarbeitetes handwerkliches
            Können durch hochwertige Bilder und Referenzen, schafft sofortiges Vertrauen bei
            potenziellen Neukunden durch transparente Kundenbewertungen und macht es Interessenten
            durch durchdachte Call-to-Actions (CTAs) und benutzerfreundliche Kontaktformulare so
            einfach wie möglich, schnell und unkompliziert direkt mit Ihnen in Verbindung zu treten.
          </p>
          <p>
            Dabei legen wir als Agentur allergrößten Wert auf eine transparente, ehrliche
            Kommunikation auf Augenhöhe, einen persönlichen, verlässlichen Service und absolut
            faire, gut kalkulierbare Festpreise ohne jegliche versteckte Kosten. Wir arbeiten nicht
            mit starren, vorgefertigten Standard-Templates, sondern entwickeln für jeden einzelnen
            Handwerksbetrieb eine individuelle, auf die jeweilige Corporate Identity abgestimmte
            Lösung, die Ihre spezifischen Stärken, Ihre langjährige Erfahrung und Ihr besonderes
            Leistungsportfolio optimal und zielgruppengerecht in Szene setzt. Setzen Sie auf die
            ausgewiesene Expertise von Coday und machen Sie Ihren Handwerksbetrieb im Internet
            endgültig unübersehbar. Lassen Sie uns gemeinsam den Grundstein für Ihren zukünftigen,
            nachhaltigen digitalen Erfolg in Wetzlar und ganz Hessen legen.
          </p>
        </div>
      </section>
    </>
  );
}
