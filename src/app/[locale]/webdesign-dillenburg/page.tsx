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
  Gear,
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
      title: 'Web Design Dillenburg | High-End Web Development – Coday Web',
      description:
        'Custom web design & Next.js development in Dillenburg and the northern Lahn-Dill district. 100/100 PageSpeed, B2B leads & 60s recruiting. Request your free audit now!',
      path: '/en/webdesign-dillenburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Dillenburg | High-End Webentwicklung – Coday Web',
    description:
      'Maßgeschneidertes Webdesign & Next.js Webentwicklung in der Oranienstadt Dillenburg. 100/100 PageSpeed, B2B-Industrieleads & 60s Recruiting. Jetzt anfragen!',
    path: '/de/webdesign-dillenburg',
    type: 'money',
  });
}

export default async function WebdesignDillenburgPage({
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
        '@id': `${BASE_URL}/${_locale}/webdesign-dillenburg#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Dillenburg',
        url: `${BASE_URL}/${_locale}/webdesign-dillenburg`,
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
          latitude: 50.7333,
          longitude: 8.2833,
        },
        areaServed: [
          { '@type': 'City', name: 'Dillenburg' },
          { '@type': 'City', name: 'Herborn' },
          { '@type': 'City', name: 'Haiger' },
          { '@type': 'City', name: 'Eschenburg' },
          { '@type': 'City', name: 'Dietzhölztal' },
          { '@type': 'City', name: 'Breitscheid' },
          { '@type': 'City', name: 'Siegbach' },
          { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
          { '@type': 'AdministrativeArea', name: 'Regierungsbezirk Gießen' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/${_locale}/webdesign-dillenburg#service`,
        name: 'High-End Webdesign & Next.js Webentwicklung Dillenburg',
        description:
          'Maßgeschneiderte Webentwicklung, 100/100 Core Web Vitals, B2B Lead-Engines und Fachkräftegewinnung für Unternehmen in der Oranienstadt Dillenburg und Umgebung.',
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
                Oranienstadt Dillenburg & nördlicher Lahn-Dill-Kreis — 20 Min ab HQ Wetzlar
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
              High-End Webdesign in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
                Dillenburg
              </span>
              . 100/100 PageSpeed für Industrie & Handwerk.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
              Generieren Sie planbare B2B-Leads und qualifizierte Gesellen für Ihren Betrieb in
              Dillenburg, Frohnhausen, Manderbach und dem Dietzhölztal. Entwickelt mit modernstem
              Next.js, ohne Plugin-Abofallen.
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
                  <span>Projekt-Referenzen ansehen</span>
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl text-left">
              {[
                { label: 'Core Web Vitals', val: '100 / 100', sub: 'Mobil & Desktop' },
                { label: 'Fahrzeit ab HQ Wetzlar', val: '20 Min', sub: 'Direkt via A45 / B277' },
                { label: 'Ladezeit-Reduktion', val: '-85 %', sub: 'Gegenüber WordPress' },
                {
                  label: 'Agentur-Ersparnis',
                  val: '5–10x günstiger',
                  sub: 'Durch schlanke Solo-Struktur',
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

        {/* ═══ WIRTSCHAFTS-DNA DILLENBURG ═══ */}
        <section className="container mx-auto px-4 max-w-7xl py-16 border-t border-slate-800/60">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              Industrie- & Handwerksstandort Dillenburg
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Digitale Leistungsfähigkeit für den Mittelstand im Dilltal.
            </h3>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Dillenburg ist geprägt von traditionsreichem Werkzeugbau, innovativer Metall- und
              Kunststoffverarbeitung sowie einem starken Handwerksmittelstand. Internationale Kunden
              und qualifizierte Fachkräfte erwarten heute eine Webpräsenz, die technische
              Spitzenleistung auf den ersten Blick spürbar macht.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <Gear className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Industrie & Metallbau</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Strukturierte Leistungsdarstellung für B2B-Entscheider. Schneller Download von
                Datenblättern, CAD-Modellen und Zertifikaten ohne Wartezeit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Meisterbetriebe & Handwerk</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Automatisierte Vorfilterung von Kundenanfragen und 60-Sekunden
                Express-Bewerbungsstrecken für Gesellen und Auszubildende.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-5">
                <Buildings className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Gesundheit & Kanzleien</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                DSGVO-konforme Patienten- und Mandantenportale mit nahtloser Online-Terminvergabe
                und lokaler Top-Sichtbarkeit bei Google.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ REFERENZEN ═══ */}
        <section className="container mx-auto px-4 max-w-7xl py-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              Erfolgreiche Projekte
            </h2>
            <h3 className="text-3xl font-bold text-white">Reale Kundenstimmen aus der Region</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                Handwerk & SHK
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Batherm GmbH</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Relaunch von schwerfälligem CMS auf Next.js. PageSpeed 100/100, signifikant mehr
                Anfragen für moderne Heizsysteme.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>100/100 Core Web Vitals</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                GaLaBau & Außenanlagen
              </div>
              <h4 className="text-xl font-bold text-white mb-2">MemoBau</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                +380% qualifizierte Projektanfragen und dominante lokale Sichtbarkeit im gesamten
                Lahn-Dill-Kreis.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>+380% Lead-Wachstum</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
                Notdienst & Sicherheit
              </div>
              <h4 className="text-xl font-bold text-white mb-2">MS Schlüsseldienst</h4>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Google Maps Top-3 Platzierungen und zuverlässiger Kundenstrom bei akuten
                Suchanfragen.
              </p>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span>Top Google Ranking</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ DILLENBURG ═══ */}
        <section className="container mx-auto px-4 max-w-4xl py-16 border-t border-slate-800/60">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Häufige Fragen zu Webdesign in Dillenburg
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Warum ist Next.js für Dillenburger B2B-Unternehmen die beste Wahl?',
                a: 'Next.js bietet überlegene Geschwindigkeit, blitzschnelle Ladezeiten weltweit und höchste Sicherheit ohne wartungsintensive WordPress-Plugins. Ihre Einkäufer und Partner erleben eine flüssige Web-Applikation.',
              },
              {
                q: 'Wie läuft die Betreuung vor Ort in Dillenburg ab?',
                a: 'Wir sind in nur 20 Minuten ab Wetzlar bei Ihnen vor Ort in Dillenburg, Manderbach oder Frohnhausen. Sie arbeiten ohne Umwege direkt mit dem Lead-Architekten.',
              },
              {
                q: 'Wie unterstützt Coday bei der Fachkräftegewinnung in Dillenburg?',
                a: 'Wir integrieren intuitive 60-Sekunden Express-Bewerbungsfunnels direkt auf Ihrer Webseite. Bewerber können sich ohne Hürden per Smartphone bei Ihnen vorstellen.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA FOOTER ═══ */}
        <section className="container mx-auto px-4 max-w-5xl py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-950 border border-teal-500/30 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Jetzt digitale Marktführerschaft in Dillenburg sichern
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Vereinbaren Sie ein unverbindliches Erstgespräch. Wir analysieren Ihre Potenziale für
              Neukunden und Mitarbeitergewinnung in Dillenburg und dem Lahn-Dill-Kreis.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-teal-500/20"
              >
                <span>Kostenlose Bedarfsanalyse anfordern</span>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
