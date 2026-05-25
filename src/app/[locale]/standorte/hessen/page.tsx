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
      title: 'Next.js Developer Hessen | Web Solutions',
      description: 'Web agency and Next.js developer in Hessen. Custom web development, Headless CMS and SEO.',
      path: '/en/standorte/hessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Next.js Entwickler Hessen | Web-Lösungen',
    description: 'Webagentur und Next.js Entwickler in Hessen. Webentwicklung, Headless CMS und SEO für den Mittelstand.',
    path: '/de/standorte/hessen',
    type: 'money',
  });
}

export default function HessenLocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Coday Web Hessen',
    image: 'https://codayweb.de/images/brand/coday-logo-footer.webp',
    '@id': 'https://codayweb.de/standorte/hessen',
    url: 'https://codayweb.de/standorte/hessen',
    telephone: '+4917641195301',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Hessen',
      addressCountry: 'DE'
    }
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
            Next.js Entwicklung in <span className="text-primary-500">Hessen</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Von Frankfurt bis Kassel. Ich helfe dem hessischen Mittelstand bei der digitalen Transformation mit modernen, blitzschnellen Web-Architekturen.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Kostenlose Strategy Session
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-[var(--space-section)] px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Moderne Web-Entwicklung für Hessens Wirtschaft</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Hessenweites Netzwerk</h3>
              <p className="text-gray-400">
                Egal ob Startups in Frankfurt am Main, Industrie-Champions in Kassel oder Hidden Champions in Mittelhessen – wir betreuen Kunden im gesamten Bundesland mit maßgeschneiderten Weblösungen.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Enterprise-Grade Performance</h3>
              <p className="text-gray-400">
                Als spezialisierter Next.js Entwickler in Hessen sorge ich dafür, dass Ihre Website nicht nur gut aussieht, sondern auch extrem schnell lädt und perfekt bei Google rankt (Core Web Vitals).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[var(--space-section)] px-4 bg-neutral-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">FAQ für den hessischen Mittelstand</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Arbeiten Sie auch für Unternehmen in Gießen, Marburg oder Frankfurt?</h4>
              <p className="text-gray-400">Ja, ich arbeite remote mit Kunden in ganz Hessen und bin für wichtige Kickoff-Meetings auch gerne vor Ort in Frankfurt, Darmstadt, Gießen oder Marburg.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Sind Ihre Systeme DSGVO-konform?</h4>
              <p className="text-gray-400">Selbstverständlich. Für den deutschen Mittelstand ist Rechtssicherheit essenziell. Wir nutzen EU-Server, Cookie-Consent-Management und verzichten auf unnötige US-Tracker, sofern nicht anders gewünscht.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
