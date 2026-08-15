import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import {
  ArrowRight,
  Lightning,
  ShieldCheck,
  Code,
  Buildings,
  Users,
  Check,
  Sparkle,
  LockKey,
  CheckCircle,
  Wrench,
  TreeEvergreen,
} from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Weilburg | High-End Next.js Agency – Coday Web',
      description:
        'Custom web design & Next.js development in Weilburg and the Lahn valley. 100/100 PageSpeed, maximum security & local lead generation. Request free audit now!',
      path: '/en/webdesign-weilburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Weilburg | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in Weilburg an der Lahn. 100/100 PageSpeed, lokale B2B-Leads & 60s Recruiting. Jetzt anfragen!',
    path: '/de/webdesign-weilburg',
    type: 'money',
  });
}

export default async function WebdesignWeilburgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/webdesign-weilburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Weilburg',
        url: `${BASE_URL}/${_locale}/webdesign-weilburg`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Mittelhessen / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.4855,
          longitude: 8.2612,
        },
        areaServed: [
          { '@type': 'City', name: 'Weilburg' },
          { '@type': 'City', name: 'Löhnberg' },
          { '@type': 'City', name: 'Weinbach' },
          { '@type': 'City', name: 'Merenberg' },
          { '@type': 'City', name: 'Braunfels' },
          { '@type': 'City', name: 'Limburg an der Lahn' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Limburg-Weilburg' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Gießen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-weilburg#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Weilburg',
        description:
          'Maßgeschneiderte Webentwicklung, 100/100 Core Web Vitals, 60s Express-Recruiting und lokale SEO-Dominanz für Unternehmen in Weilburg und dem Lahntal.',
        provider: {
          '@type': 'Organization',
          name: 'Coday',
          url: BASE_URL,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white pt-24 pb-16 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-teal-500/15 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* ═══ HERO SECTION ═══ */}
        <section className="container mx-auto px-4 max-w-7xl pt-12 pb-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkle weight="fill" className="w-3.5 h-3.5" />
              <span>
                Residenzstadt Weilburg & Lahntal — Direkte Nähe ab HQ Wetzlar (15 Min via B49)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
              High-End Webdesign in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
                Weilburg
              </span>
              . 100/100 PageSpeed & planbare Leads.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
              Verwandeln Sie Besucher aus Weilburg und dem gesamten Landkreis Limburg-Weilburg in
              qualifizierte Neukunden und Bewerber. Mit maßgeschneiderter Next.js-Webentwicklung
              ohne langsame Vorlagen oder monatliche Lizenzgebühren.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-teal-900/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Kostenlose Bedarfsanalyse anfordern</span>
                    <ArrowRight weight="bold" className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="/work" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-200 px-8 py-3.5 rounded-xl"
                >
                  <span>Reale Referenzen ansehen</span>
                </Button>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl text-left">
              {[
                { label: 'Core Web Vitals', val: '100 / 100', sub: 'Mobil & Desktop' },
                {
                  label: 'Fahrzeit ab HQ Wetzlar',
                  val: '15 Min',
                  sub: 'Persönlich vor Ort via B49',
                },
                { label: 'Lizenzkosten-Lock', val: '0,00 €', sub: 'Keine Plugin-Abofallen' },
                {
                  label: 'Preise & Ersparnis',
                  val: '5–10x günstiger',
                  sub: 'Als klassische Agenturen',
                },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
                  <div className="text-2xl font-bold text-teal-400 mb-1">{m.val}</div>
                  <div className="text-sm font-semibold text-slate-200">{m.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ REGIONALE WIRTSCHAFTS-DNA WEILBURG ═══ */}
        <section className="container mx-auto px-4 max-w-7xl py-16 border-t border-slate-800/60">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              Wirtschafts-DNA Weilburg
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Digitale Sichtbarkeit für Handwerk, Praxen & Tourismus an der Lahn.
            </h3>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Weilburg verbindet barocke Schlosskultur mit einem starken Handwerks- und
              Gewerbegürtel entlang der B49. Ob Facharztpraxis in der Innenstadt, traditionsreicher
              Sanitärbetrieb oder Gastronomie am Fluss: Wer heute bei Google nicht auf Platz 1
              steht, verliert Anfragen an Mitbewerber aus Limburg oder Wetzlar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Handwerk & Baugewerbe</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Vorqualifizierte Projektanfragen statt unrentabler Kleinaufträge. 60-Sekunden
                Express-Recruiting für Gesellen direkt am Smartphone.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <Buildings className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Praxen & Kanzleien</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Barrierefreie Patienten- und Mandantenportale mit Online-Terminvergabe,
                DSGVO-Konformität und Top-Sichtbarkeit bei lokalen Arztsuchen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <TreeEvergreen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Tourismus & Dienstleistung</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Flüssige Buchungsstrecken und moderne Bildpräsentationen, die Besucher für Hotels,
                Tagungen und Fachdienstleistungen begeistern.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ REFERENZEN AUS DER REGION ═══ */}
        <section className="container mx-auto px-4 max-w-7xl py-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              Echte Kundenreferenzen
            </h2>
            <h3 className="text-3xl font-bold text-white">Nachweisbare Erfolge in Mittelhessen</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                SHK & Sanitär Handwerk
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Batherm GmbH</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Relaunch der gesamten Webpräsenz mit Next.js. Ladezeit von 4,2s auf 0,4s gesenkt,
                messbar mehr qualifizierte Wärmepumpen- und Badanfragen.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>100/100 Core Web Vitals</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                Garten- & Landschaftsbau
              </div>
              <h4 className="text-xl font-bold text-white mb-2">MemoBau Wetzlar</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Lokale Dominanz & Lead-Engine für Premium-Außenanlagen. +380% mehr Projektanfragen
                im ersten Quartal.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>+380% Kundenanfragen</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                Sicherheit & Notdienst
              </div>
              <h4 className="text-xl font-bold text-white mb-2">MS Schlüsseldienst</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Top-Platzierungen bei lokalen Notdienst-Suchanfragen im gesamten Lahn- und Dilltal.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>Google Maps Top 3</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ & LOCAL SILO ═══ */}
        <section className="container mx-auto px-4 max-w-4xl py-16 border-t border-slate-800/60">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Häufige Fragen zu Webdesign in Weilburg
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Warum Next.js statt WordPress für Weilburger Unternehmen?',
                a: 'Next.js generiert Seiten serverseitig vor. Dadurch lädt Ihre Webseite in unter 0,5 Sekunden, ist absolut hacker-sicher ohne anfällige Plugins und erzielt bei Google deutlich bessere Rankings.',
              },
              {
                q: 'Wie läuft die Zusammenarbeit vor Ort in Weilburg ab?',
                a: 'Weilburg liegt nur 15 Minuten von unserem Hauptsitz in Wetzlar entfernt. Wir treffen uns gerne direkt bei Ihnen im Unternehmen oder führen die Abstimmungen effizient per Video-Call durch.',
              },
              {
                q: 'Wie werden die Preise kalkuliert?',
                a: 'Wir verzichten auf starre Paket-Aufschläge und kalkulieren fair auf Anfrage nach einer kostenlosen Bedarfsanalyse. Durch schlanke Prozesse sind wir in der Regel 5- bis 10-mal günstiger als traditionelle Agenturen.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA FOOTER BANNER ═══ */}
        <section className="container mx-auto px-4 max-w-5xl py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-950 border border-teal-500/30 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Bereit für die digitale Marktführerschaft in Weilburg?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Lassen Sie uns Ihre aktuelle Website kostenlos analysieren. Sie erhalten konkrete
              Handlungsempfehlungen für Ladezeit, SEO und Neukundengewinnung.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-teal-500/20"
              >
                <span>Jetzt kostenlose Analyse anfordern</span>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
