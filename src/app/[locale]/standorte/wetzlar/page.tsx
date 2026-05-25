import { Button } from '@/shared/ui/Button';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Agency Wetzlar | Next.js & Web Design',
      description: 'Local expertise meets high-end tech. Your web agency in Wetzlar for Next.js, Headless CMS and web design.',
      path: '/en/standorte/wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webagentur Wetzlar | Next.js & Webdesign',
    description: 'Lokale Expertise trifft auf High-End Tech. Ihre Webagentur in Wetzlar für Next.js, Headless CMS und Webdesign.',
    path: '/de/standorte/wetzlar',
    type: 'money',
  });
}

export default function WetzlarLocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Coday Web',
    image: 'https://codayweb.de/images/brand/coday-logo-footer.webp',
    '@id': 'https://codayweb.de/standorte/wetzlar',
    url: 'https://codayweb.de/standorte/wetzlar',
    telephone: '+4917641195301',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wetzlarer Str.',
      addressLocality: 'Wetzlar',
      postalCode: '35578',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.555,
      longitude: 8.5049
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.linkedin.com/company/codayweb'
    ]
  };

  return (
    <main className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="py-[var(--space-section)] relative px-4 md:px-8 bg-gradient-to-br from-bg-primary to-bg-secondary overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Ihre <span className="text-primary-500">Webagentur</span> in Wetzlar
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Persönliche Beratung in Mittelhessen. Als Solo-Founder kombiniere ich lokales Marktverständnis mit modernster Next.js Technologie.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Gespräch vereinbaren
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Local Section */}
      <section className="py-[var(--space-section)] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Warum Coday in Wetzlar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Persönliche Treffen</h3>
              <p className="text-gray-400">
                Ob in der Wetzlarer Altstadt auf einen Kaffee oder direkt bei Ihnen im Büro in den Lahn-Dill-Kreis-Gewerbegebieten. Nähe schafft Vertrauen und kurze Kommunikationswege.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Lokale Marktkenntnis</h3>
              <p className="text-gray-400">
                Wetzlar ist die Stadt der Optik. Wir wissen, was der mittelhessische Mittelstand braucht – keine Buzzwords, sondern messbare Ergebnisse durch performantes Webdesign.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Globale Qualität</h3>
              <p className="text-gray-400">
                Lokal ansässig, aber technologisch auf dem Niveau globaler Tech-Startups. Durch AI-augmented Craftsmanship liefere ich Enterprise-Architekturen zu fairen Konditionen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Services */}
      <section className="py-[var(--space-section)] px-4 bg-neutral-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Unsere Leistungen in Wetzlar</h2>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-4 text-gray-300">
              <span className="text-primary-500 text-xl">✓</span>
              Webdesign & UI/UX Entwicklung
            </li>
            <li className="flex items-center gap-4 text-gray-300">
              <span className="text-primary-500 text-xl">✓</span>
              Regionale SEO für Mittelhessen
            </li>
            <li className="flex items-center gap-4 text-gray-300">
              <span className="text-primary-500 text-xl">✓</span>
              Headless CMS Lösungen (Sanity)
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-white mb-8">Häufige Fragen (FAQ)</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Treffen wir uns persönlich?</h4>
              <p className="text-gray-400">Ja, für Unternehmen im Raum Wetzlar, Gießen und Herborn bevorzuge ich ein initiales persönliches Kennenlernen.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Was kostet eine Website in Wetzlar?</h4>
              <p className="text-gray-400">Als Solo-Agentur biete ich ein exzellentes Preis-Leistungs-Verhältnis. Kleine Next.js Projekte starten bei 5.000€, komplexe Web-Apps werden individuell kalkuliert.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
