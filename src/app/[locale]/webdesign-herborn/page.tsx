import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import {
  getCityHierarchySchema,
  getPyramidBreadcrumbs,
} from '@/features/local-seo/model/schemaPyramid';
import { LocalSplitHero } from '@/features/local-seo/ui/LocalSplitHero';
import { RegionalSilo } from '@/features/local-seo/ui/RegionalSilo';
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
  Cpu,
  Gear,
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
      title: 'Web Design Herborn | B2B Websites & SEO Agency · Coday',
      description:
        'Your web agency for Herborn & Lahn-Dill. Modern web design, ultra-fast load times & more B2B inquiries for industry & crafts. Fixed price on request.',
      keywords: [
        'Web Design Herborn',
        'Web Agency Herborn',
        'Website Creation Herborn',
        'B2B Web Development Lahn-Dill',
        'Coday Web Herborn',
      ],
      path: '/en/webdesign-herborn',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Herborn | B2B-Websites & SEO Agentur · Coday',
    description:
      'Ihre Webagentur für Herborn & Lahn-Dill. Modernes Webdesign, ultraschnelle Ladezeiten & mehr B2B-Anfragen für Industrie & Handwerk. Festpreis auf Anfrage.',
    keywords: [
      'Webdesign Herborn',
      'Webagentur Herborn',
      'Website erstellen Herborn',
      'B2B Webentwicklung Lahn-Dill',
      'Coday Web Herborn',
    ],
    path: '/de/webdesign-herborn',
    type: 'money',
  });
}

export default async function WebdesignHerbornPage({
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
    // Root layout emits the Organization node, so this graph skips it.
    '@graph': [
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-herborn' }, _locale),
      ...(getCityHierarchySchema('webdesign-herborn', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was kostet eine moderne B2B- oder Handwerker-Website in Herborn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren für Herborner Industrieunternehmen, Handwerksbetriebe und Dienstleister verbindliche Festpreise auf Basis Ihres tatsächlichen Bedarfs. Keine versteckten Kosten, kein Wartungszwang.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie lange dauert die Fertigstellung eines Webprojekts in Herborn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In der Regel ist Ihre maßgeschneiderte Next.js Website innerhalb von 10 bis 14 Werktagen komplett schlüsselfertig online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Kommen Sie für Termine direkt nach Herborn, Sinn oder Mittenaar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, absolut. Über die A45 und B277 erreichen wir Ihr Unternehmen im Gewerbegebiet Untere Au, Altheimer Feld oder den Nachbargemeinden in unter 15 Minuten.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hilft Coday bei der Mitarbeiter- und Azubi-Gewinnung im Dillgebiet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir konzipieren mobile 60-Sekunden-Express-Funnels, mit denen sich Gesellen, Techniker und Fachkräfte ohne Anschreiben direkt per Smartphone bei Ihnen bewerben können.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer begleitet mich als fester Projektleiter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gründer Umutcan Emre Tezgel begleitet Sie persönlich von der ersten Skizze bis zur Liveschaltung.',
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
        badgeText="B2B & INDUSTRIE WEBAGENTUR HERBORN & LAHN-DILL"
        headline={isEn ? 'Web Design Herborn:' : 'Webdesign Herborn:'}
        headlineGradient={
          isEn ? 'B2B Websites & Digital Excellence' : 'B2B-Websites & Digitale Exzellenz'
        }
        description="Als spezialisierte High-Performance Webagentur für Herborn und den Lahn-Dill-Kreis bieten wir moderne Next.js Entwicklung und hochkonvertierende B2B-Websites für Maschinenbau, Schaltschrankbau und Handwerk. Maximale Ladezeiten unter 500ms, Top-Google-Rankings und planbare Neukundengewinnung."
        cityName="Herborn"
        sourceTag="local_seo_herborn"
        formHeading="Kostenlose Bedarfsanalyse für Herborn"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Herborner Referenzen ansehen"
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
              Messbare Ergebnisse für Herborner Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Präzisionstechnologie für Hidden Champions und Handwerksbetriebe im Dillgebiet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Herborn</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für ungeduldige B2B-Einkäufer und mobile Nutzer.
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
              Next.js Entwicklung: Warum Herborner Betriebe auf moderne B2B-Websites setzen
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
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Hacker-Schutz</td>
                  <td className="p-5 text-slate-600">
                    Permanente Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare Datenbank)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Herborn)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt im Lahn-Dill-Kreis
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
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
                Präzision & Industrie-Fokus für Unternehmen in Herborn
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Herborner Schaltschrankbauer, Zerspanungsbetriebe und Handwerksmeister erstelle ich
                technologisch führende Webauftritte: Subsekundäre Ladezeiten, absolute
                Datensicherheit und messbare B2B-Anfragen ohne Agentur-Wasserkopf.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Persönliche Beratung & Entwicklung</span>
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

      {/* 6. SERVICES BENTO SHOWCASE (HERBORN-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Herborn & das Dilltal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom B2B-Industrieportal bis zum mobilen Handwerker-Recruiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Gear className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. B2B- & Industrie-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entwickelt für Maschinenbau, Schaltschrankbau und Fertigungsbetriebe in den
                Gewerbegebieten Untere Au und Altheimer Feld. Ultraschnelle Datenblatt- und
                CAD-Downloads.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Wrench className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Handwerker & Meisterbetrieb Websites
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Konversionsstarke Webdesigns für regionale Betriebe in Herborn, Sinn und Mittenaar
                zur kontinuierlichen Generierung lukrativer Aufträge.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & A45-Sauerlandlinie Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Herborn, Sinn, Dillenburg,
                Haiger, Driedorf und Breitscheid.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. 60s Mitarbeiter-Funnel</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bewerbungsprozesse ohne Anschreiben für maximale Bewerberzahlen unter Gesellen,
                Technikern und Ingenieuren im Dillgebiet.
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
              Wirtschaftsstandort Herborn
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Industrie- und Schaltschrankbau-Cluster an der A45
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Herborn verbindet den Charme einer historischen Fachwerkstadt mit einer
              außergewöhnlich starken Industrie- und Fertigungskompetenz. In den Gewerbegebieten{' '}
              <strong>Untere Au</strong>,<strong>Altheimer Feld</strong> und an der{' '}
              <strong>Friedrich-Birk-Straße</strong> sind weltbekannte Unternehmen des
              Schaltschrank- und Maschinenbaus sowie hochspezialisierte Zulieferer angesiedelt.
              Zusammen mit den Nachbargemeinden <strong>Sinn</strong> und <strong>Mittenaar</strong>{' '}
              bildet die Region ein produktives Kraftzentrum im Lahn-Dill-Kreis.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Direkte A45- & B277-Achse nach Wetzlar und Dillenburg
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die <strong>Bundesautobahn A45 (Sauerlandlinie)</strong> und die{' '}
              <strong>B277</strong>
              ist unser Büro in Wetzlar in weniger als 15 Fahrminuten direkt bei Ihnen vor Ort in
              Herborn. Wir bieten Ihnen den unschätzbaren Vorteil einer direkten, persönlichen
              Betreuung vor Ort im gesamten oberen Dilltal.
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
              Fragen & Antworten zu Webdesign in Herborn
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Was kostet eine moderne B2B- oder Handwerker-Website in Herborn?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren für Herborner Industrieunternehmen, Handwerksbetriebe und
                Dienstleister verbindliche Festpreise auf Basis Ihres tatsächlichen Bedarfs. Keine
                versteckten Kosten, kein Wartungszwang.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie lange dauert die Fertigstellung eines Webprojekts in Herborn?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In der Regel ist Ihre maßgeschneiderte Next.js Website innerhalb von 10 bis 14
                Werktagen komplett schlüsselfertig online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Kommen Sie für Termine direkt nach Herborn, Sinn oder Mittenaar?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, absolut. Über die A45 und B277 erreichen wir Ihr Unternehmen im Gewerbegebiet
                Untere Au, Altheimer Feld oder den Nachbargemeinden in unter 15 Minuten.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie hilft Coday bei der Mitarbeiter- und Azubi-Gewinnung im Dillgebiet?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir konzipieren mobile 60-Sekunden-Express-Funnels, mit denen sich Gesellen,
                Techniker und Fachkräfte ohne Anschreiben direkt per Smartphone bei Ihnen bewerben
                können.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer begleitet mich als fester Projektleiter?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gründer Umutcan Emre Tezgel begleitet Sie persönlich von der ersten Skizze bis zur
                Liveschaltung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Marktführerschaft für Herborn & das Dilltal sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein persönliches 20-Minuten-Strategiegespräch direkt mit Inhaber
            Umutcan Emre Tezgel für Ihren Betrieb in Herborn.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Herborner Erstgespräch vereinbaren
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <RegionalSilo citySlug="webdesign-herborn" locale={_locale} />
    </div>
  );
}
