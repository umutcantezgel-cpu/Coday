import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Project Details | Web Design References Wetzlar',
      description:
        'Detailed insight into our web design projects by Coday in Wetzlar. Learn how we help businesses in Central Hesse succeed in the digital landscape.',
      path: '/en/work/projectdetail',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Projektdetails | Webdesign Referenzen Wetzlar',
    description:
      'Detaillierter Einblick in unsere Webdesign Projekte von Coday in Wetzlar. Erfahren Sie wie wir Unternehmen in Mittelhessen digital erfolgreich machen.',
    path: '/de/work/projectdetail',
    type: 'noindex',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Work', url: `/${_locale}/work` },
    { name: isEn ? 'Project Details' : 'Projektdetails', url: `/${_locale}/work/projectdetail` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is emitted site-wide by the root layout, so only breadcrumbs remain here.
    '@graph': [breadcrumbs],
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
          Einblicke in unsere Webdesign-Projekte: Qualität, die überzeugt
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Erfolgreiches Webdesign ist mehr als nur die ansprechende Anordnung von Farben,
            Schriften und Bildern; es ist die Kunst, Markenidentität, Benutzerfreundlichkeit
            (Usability) und technische Exzellenz in einem nahtlosen digitalen Erlebnis zu vereinen.
            Unsere Projektdetails geben Ihnen einen tiefen Einblick in unsere Arbeitsweise und
            zeigen auf, wie wir für Unternehmen in Wetzlar, Hessen und darüber hinaus messbare
            digitale Erfolge erzielen. Jedes Projekt beginnt mit einer fundierten Analyse der
            Zielgruppe, des Wettbewerbsumfelds und der individuellen Geschäftsziele unserer Kunden.
            Diese strategische Vorarbeit bildet das Fundament für maßgeschneiderte Designkonzepte
            und robuste technische Implementierungen. Wir glauben fest daran, dass transparente
            Kommunikation und ein partnerschaftlicher Ansatz entscheidend für das Gelingen eines
            jeden Webprojekts sind.
          </p>
          <p>
            In unseren Fallstudien (Case Studies) beleuchten wir die spezifischen Herausforderungen,
            mit denen unsere Kunden an uns herangetreten sind, und präsentieren detailliert die von
            uns entwickelten Lösungsansätze. Ob es sich um die Neuentwicklung einer Corporate
            Website, die Optimierung eines E-Commerce-Shops oder die Implementierung komplexer
            Webanwendungen handelt – unser Fokus liegt stets auf höchster Qualität und messbarem
            Mehrwert. Besonderes Augenmerk legen wir dabei auf Aspekte wie Core Web Vitals, mobile
            Optimierung und Suchmaschinenfreundlichkeit (SEO). Eine Webseite, die gut aussieht, aber
            von Google nicht gefunden wird oder auf Smartphones schlecht performt, verfehlt ihren
            Zweck. Daher setzen wir auf modernste Technologien wie Next.js, React und TailwindCSS,
            um blitzschnelle, zukunftssichere und barrierefreie Web-Erlebnisse zu schaffen.
          </p>
          <p>
            Darüber hinaus illustrieren unsere Referenzprojekte eindrucksvoll den direkten
            Zusammenhang zwischen herausragendem Design und erhöhten Conversion-Rates. Durch den
            gezielten Einsatz von Micro-Animations, klaren Call-to-Actions (CTAs) und einer
            intuitiven User Journey führen wir die Besucher zielgerichtet zur gewünschten Handlung –
            sei es eine Kontaktaufnahme, ein Kaufabschluss oder die Anmeldung zu einem Newsletter.
            Lassen Sie sich von unseren bisherigen Arbeiten inspirieren und entdecken Sie, wie Coday
            auch Ihrem Unternehmen zu digitaler Dominanz verhelfen kann. Unser Anspruch ist es nicht
            nur, Ihre Erwartungen zu erfüllen, sondern sie durch innovative Lösungen und exzellentes
            Handwerk kontinuierlich zu übertreffen.
          </p>
        </div>
      </section>
    </>
  );
}
