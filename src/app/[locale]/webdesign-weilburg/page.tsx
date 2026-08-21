import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { TrustBar } from '@/shared/ui/TrustBar';
import { LazyQuickContactForm } from '@/widgets/home/LazyQuickContactForm';
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
  ChartBar,
  Star,
  MapPin,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
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
      title: 'Web Design Weilburg | High-End Web Development · Coday',
      description:
        'Web design & SEO for Weilburg an der Lahn. Ultra-fast Next.js websites for crafts, tourism & mid-market. Fixed prices on request.',
      keywords: [
        'Web Design Weilburg',
        'Web Agency Weilburg',
        'Website Creation Weilburg',
        'Web Development Weilburg',
        'Coday Web Weilburg',
      ],
      path: '/en/webdesign-weilburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Weilburg | High-End Webentwicklung · Coday',
    description:
      'Webdesign & SEO für Weilburg an der Lahn. Ultraschnelle Next.js Websites für Handwerk, Tourismus & Mittelstand. Verbindliche Festpreise auf Anfrage.',
    keywords: [
      'Webdesign Weilburg',
      'Webagentur Weilburg',
      'Website erstellen Weilburg',
      'Webentwicklung Weilburg an der Lahn',
      'Coday Web Weilburg',
    ],
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
  const isEn = _locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-weilburg' }, _locale),
      ...(getCityHierarchySchema('webdesign-weilburg', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine neue Website für Unternehmen in Weilburg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren für Weilburger Handwerksmeister, Hotels und Dienstleister transparente Festpreise ohne versteckte Monatsabos oder unerwartete Mehrkosten.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell ist eine neue Next.js Homepage in Weilburg online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel steht Ihre Website innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Termine direkt nach Weilburg, Löhnberg oder Kubach?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, gerne. Über die vierspurige B49 erreichen wir Sie von unserem Wetzlarer Büro aus in rund 15 Minuten direkt vor Ort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie Buchungssysteme für Tourismus- und Gastronomiebetriebe in Weilburg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Wir entwickeln mobil optimierte Direktbuchungsstrecken für Hotels, Pensionen und Restaurants im Lahntal ohne Provisionsabgaben an Drittportale.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer betreut mein Projekt in Weilburg persönlich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gründer Umutcan Emre Tezgel berät und entwickelt Ihre Plattform persönlich mit direktem Draht.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#fafafa] text-slate-900 min-h-screen selection:bg-amber-500/20 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. SPLIT-HERO SECTION MIT ABOVE-THE-FOLD KONTAKTFORMULAR */}
      <LocalSplitHero
        badgeText="HANDWERK, TOURISMUS & MITTELSTAND WEBAGENTUR WEILBURG"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="Weilburg an der Lahn"
        description="Speziell für Handwerk, Bauunternehmen, Hotellerie, Tourismus und Mittelstand im Lahntal. Maximale Ladezeiten unter 500ms, perfekte Google-Rankings und planbare Neukundengewinnung. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse."
        cityName="Weilburg"
        sourceTag="local_seo_weilburg"
        formHeading="Kostenlose Bedarfsanalyse für Weilburg"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Weilburger Referenzen ansehen"
      />

      {/* 2. TRUSTBAR (REAL PROOF) */}
      <section className="border-y border-slate-200 bg-white">
        <TrustBar />
      </section>

      {/* 3. 4-PILLAR STATS BENTO GRID */}
      <section className="py-24 bg-[#fafafa] border-b border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Performance & ROI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Messbare Ergebnisse für Weilburger Betriebe
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Moderne Webtechnologie für Tourismus, Bauhandwerk und regionalen Mittelstand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Weilburg</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für Touristen, mobile Gäste und B2B-Kunden.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Lock-in-Effekte.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkte Betreuung durch Gründer Umutcan Emre Tezgel ohne Agentur-Warteschleifen.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">Festpreis</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Volle Kostensicherheit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparente Festpreise ohne versteckte Kosten oder unerwartete Agentur-Aufschläge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE: NEXT.JS VS. TRADITIONELLES WORDPRESS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Technologie-Vergleich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Warum Weilburger Betriebe auf Next.js setzen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Der direkte Vergleich zwischen klassischem WordPress und zukunftssicherer
              Headless-Architektur.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-5 text-sm font-semibold text-slate-700">Kriterium</th>
                  <th className="p-5 text-sm font-semibold text-red-700">
                    WordPress / Agentur-Monolith
                  </th>
                  <th className="p-5 text-sm font-semibold text-amber-900 bg-amber-50/80">
                    Coday Next.js 15 Headless Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Ladezeit & TTFB</td>
                  <td className="p-5 text-slate-600">
                    2.5s – 4.5s (Plugin-Ballast & Datenbank-Verzögerung)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s (Globales deutsches Edge-CDN)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Datenschutz</td>
                  <td className="p-5 text-slate-600">
                    Ständige Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Weilburg)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt im Lahntal
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Preisstruktur</td>
                  <td className="p-5 text-slate-600">
                    Versteckte Zusatzkosten & monatliche Wartungsverträge
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Verbindlicher Festpreis auf Anfrage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER PHILOSOPHY BLOCK */}
      <section className="py-24 bg-[#fafafa] border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Inhabergeführte Betreuung
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Moderne Webarchitektur für Handwerk & Tourismus in Weilburg
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Weilburger Meisterbetriebe, Bauunternehmer und touristische Anbieter entwickle ich
                performante, maßgeschneiderte Websites mit kompromissloser Ladezeit unter 0,4
                Sekunden und messbarem Conversion-Fokus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Persönlicher Entwickler-Kontakt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">100% Quellcode-Besitz ohne Abo</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Verbindliche Festpreis-Garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES BENTO SHOWCASE (WEILBURG-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Weilburg & das Lahntal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom Handwerker-Portal bis zur Hotel-Direktbuchung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Handwerk & Bauwirtschaft Portale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Bauunternehmen, Dachdecker, Elektriker und Meisterbetriebe in den
                Gewerbegebieten Kubach und Guntersau. Schnelle Angebotsanfragen und
                Projekt-Showcases.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <TreeEvergreen className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Tourismus & Hotellerie Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mobil optimierte Buchungsplattformen für Hotels, Ferienwohnungen und
                Gastronomiebetriebe rund um das Schloss Weilburg und den Lahntal-Radweg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & B49-Achse Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Weilburg, Löhnberg, Weinbach,
                Merenberg und dem gesamten oberen Landkreis Limburg-Weilburg.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. 60s Express-Recruiting</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bewerbungsprozesse ohne bürokratische Hürden zur Gewinnung von Fachkräften und
                Gesellen im Lahntal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschafts- & Tourismusstandort Weilburg
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Barocke Residenzstadt, Lahntal-Tourismus & starkes Handwerk
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Weilburg an der Lahn begeistert mit seinem imposanten{' '}
              <strong>Schloss Weilburg</strong>, dem historischen Schiffstunnel und einer lebendigen
              Tourismus- und Hotellerie-Branche. Gleichzeitig bilden die Gewerbeparks{' '}
              <strong>Kubach</strong> und <strong>Guntersau</strong>
              sowie die direkten Nachbargemeinden <strong>Löhnberg</strong>,{' '}
              <strong>Weinbach</strong> und <strong>Merenberg</strong> ein leistungsstarkes Zentrum
              für Bauunternehmen, Handwerksmeister und modernen Mittelstand.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte B49-Achse nach Wetzlar und Limburg
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die vierspurig ausgebaute <strong>Bundesstraße B49</strong> ist unser Wetzlarer
              Büro in weniger als 15 Fahrminuten direkt bei Ihnen vor Ort in Weilburg oder Löhnberg.
              Wir bieten Ihnen den unschätzbaren Vorteil einer direkten, persönlichen Betreuung vor
              Ort.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Projekt: Nach einer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten.
            </p>
          </div>
        </div>
      </section>

      {/* 8. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign in Weilburg
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine neue Website für Unternehmen in Weilburg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren für Weilburger Handwerksmeister, Hotels und Dienstleister
                transparente Festpreise ohne versteckte Monatsabos oder unerwartete Mehrkosten.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell ist eine neue Next.js Homepage in Weilburg online?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel steht Ihre Website innerhalb von 10 bis 14 Werktagen komplett
                schlüsselfertig online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Termine direkt nach Weilburg, Löhnberg oder Kubach?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, gerne. Über die vierspurige B49 erreichen wir Sie von unserem Wetzlarer Büro aus
                in rund 15 Minuten direkt vor Ort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie Buchungssysteme für Tourismus- und Gastronomiebetriebe in Weilburg?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja. Wir entwickeln mobil optimierte Direktbuchungsstrecken für Hotels, Pensionen und
                Restaurants im Lahntal ohne Provisionsabgaben an Drittportale.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer betreut mein Projekt in Weilburg persönlich?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gründer Umutcan Emre Tezgel berät und entwickelt Ihre Plattform persönlich mit
                direktem Draht.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenklasse für Ihr Weilburger Unternehmen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Gespräch direkt mit Inhaber Umutcan
            Emre Tezgel für Ihren Standort in Weilburg und im Lahntal.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Weilburger Erstgespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
