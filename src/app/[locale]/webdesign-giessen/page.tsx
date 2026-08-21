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
  Stethoscope,
  ChartBar,
  Star,
  MapPin,
  DeviceMobile,
  Target,
  FileCode,
  Globe,
  CaretRight,
  Cpu,
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
      title: 'Web Design Giessen | Next.js Agency & SEO · Coday',
      description:
        'High-end web design in Giessen. Sub-500ms load times, measurable new clients & fixed pricing for practices & mid-market companies.',
      keywords: [
        'Web Design Giessen',
        'Web Agency Giessen',
        'Website Creation Giessen',
        'Web Development Giessen',
        'Coday Web Giessen',
      ],
      path: '/en/webdesign-giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Gießen | Next.js Webagentur & SEO · Coday',
    description:
      'Webdesign für Gießen: Ultraschnelle Ladezeiten, messbare Neukunden & transparente Festpreise für Praxen, Startups & Mittelstand.',
    keywords: [
      'Webdesign Gießen',
      'Webagentur Gießen',
      'Website erstellen Gießen',
      'Webentwicklung Gießen',
      'Coday Web Gießen',
    ],
    path: '/de/webdesign-giessen',
    type: 'money',
  });
}

export default async function WebdesignGiessenPage({
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
      getPyramidBreadcrumbs(3, { citySlug: 'webdesign-giessen' }, _locale),
      ...(getCityHierarchySchema('webdesign-giessen', _locale)?.['@graph'] || []),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie setzen sich die Kosten für Webdesign in Gießen zusammen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir kalkulieren für Gießener Praxen, Dienstleister und B2B-Unternehmen individuelle, transparente Festpreise nach einer kostenlosen Bedarfsanalyse. Durch schlanke Next.js 15 Architekturen entfallen teure Agentur-Wasserköpfe und monatliche Lizenzgebühren.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie schnell erfolgt der Go-Live für Unternehmen in Gießen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dank standardisierter High-End-Workflows steht Ihre neue Website in Gießen im Regelfall innerhalb von 10 bis 14 Werktagen schlüsselfertig online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bieten Sie Vor-Ort-Termine in Gießen und den Gewerbegebieten an?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja, gerne vor Ort im Technologie- und Innovationszentrum Gießen (TIG), Europaviertel, Seltersweg oder Schiffenberger Tal. Von unserem Wetzlarer Büro aus erreichen wir Sie über die B49/A485 in rund 10 Minuten.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie unterstützt Coday das Recruiting von Fachkräften in Gießen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wir integrieren barrierefreie 60-Sekunden-Express-Bewerbungsstrecken, die gezielt auf Smartphone-Nutzer, JLU- und THM-Absolventen sowie Fachkräfte aus Mittelhessen ausgerichtet sind.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wer betreut mein Webprojekt in Gießen als fester Ansprechpartner?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inhaber und Lead-Entwickler Umutcan Emre Tezgel berät Sie direkt und setzt das Projekt ohne Umwege persönlich um.',
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
        badgeText="HIGH-END WEBAGENTUR FÜR GIESSEN & MITTELHESSEN"
        headline="Webdesign & Next.js Entwicklung in"
        headlineGradient="Gießen & Umgebung"
        description="Als spezialisierte High-Performance Webagentur für Gießen entwickeln wir maßgeschneiderte B2B-Websites, Klinik-Portale und moderne Next.js Entwicklung für anspruchsvolle Unternehmen. Maximale Ladezeiten unter 500ms, perfekte Google-Rankings und automatisierte Lead-Erfassung zum verbindlichen Festpreis."
        cityName="Gießen"
        sourceTag="local_seo_giessen"
        formHeading="Kostenlose Bedarfsanalyse für Gießen"
        formSubtitle="Persönliche Beratung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h."
        secondaryCtaText="Gießener Referenzen ansehen"
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
              Messbare Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Überlegenheit für Gießener Unternehmen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Wissenschaftliche Präzision im Code für messbares Unternehmenswachstum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">&lt; 0.4s</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Ladezeit in Gießen</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subsekundäre Ladezeiten für ungeduldige B2B-Entscheider und mobile Patienten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">100%</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Code-Eigentum</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Volle Rechte an Ihrem Quellcode ohne monatliche CMS-Lizenzgebühren oder
                Abhängigkeiten.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="text-4xl font-black text-amber-600 mb-2">24h</div>
              <p className="text-lg font-bold text-slate-900 mb-2">Reaktionszeit</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direkter Kontakt mit Gründer Umutcan Emre Tezgel ohne Agentur-Warteschleifen.
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
              Next.js Entwicklung: Warum Gießener Praxen & B2B-Websites auf Next.js umsteigen
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
                  <td className="p-5 font-medium text-slate-900">Ladezeit & PageSpeed</td>
                  <td className="p-5 text-slate-600">
                    2.5s – 4.5s (Plugin-Ballast & Datenbank-Verzögerung)
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    &lt; 0.4s (Globales deutsches Edge-CDN)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Sicherheit & Patientendaten</td>
                  <td className="p-5 text-slate-600">
                    Permanente Sicherheitslücken durch PHP-Plugins
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    100% Sicher (Keine angreifbare PHP-Schnittstelle)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Google Core Web Vitals</td>
                  <td className="p-5 text-slate-600">Mäßig (Abstrafung im mobilen Suchranking)</td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Garantiert 100/100 (Top-Rankings in Gießen)
                  </td>
                </tr>
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Support & Betreuung</td>
                  <td className="p-5 text-slate-600">
                    Anonyme Ticketsysteme & wechselnde Ansprechpartner
                  </td>
                  <td className="p-5 font-bold text-amber-900 bg-amber-50/40">
                    Direkter Entwickler-Kontakt in Mittelhessen
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
                Wissenschaftliche Präzision im Code für Gießener Unternehmen
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                Bei Coday arbeiten Sie direkt mit mir – <strong>Umutcan Emre Tezgel</strong>. Für
                Gießener Arztpraxen, TIG-Startups und Traditionsunternehmen kombiniere ich moderne
                Next.js 15 Entwicklung mit messbarer Conversion-Stärke. Keine Reibungsverluste durch
                Zwischenhändler, sondern direkte Abstimmung und handwerklicher Fokus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Persönliche Entwickler-Betreuung</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Uneingeschränktes Code-Eigentum</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700">Garantierte Festpreis-Kalkulation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES BENTO SHOWCASE (GIESSEN-FOKUS) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Kernkompetenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Digitale Exzellenz für Gießen & Mittelhessen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Vom barrierefreien Praxisportal bis zur hochskalierbaren Startup-Plattform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Stethoscope className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Praxis- & Klinik-Webportale
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Spezialisiert auf Ärzte, Fachkliniken und Therapeuten im Raum Gießen (UKGM,
                Seltersweg). Barrierefrei nach BITV 2.0 / WCAG und mit nahtloser
                Online-Terminbuchung.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Cpu className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. TIG Startups & Tech-Webentwicklung
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skalierbare Webanwendungen auf Basis von Next.js 15, React 19 und TypeScript für
                Startups und Spin-offs im Technologie- und Innovationszentrum Gießen (TIG).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Target className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Local SEO & Gießener Ring Dominanz
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gezielte Suchmaschinenoptimierung für Top-Rankings in Gießen, Linden, Pohlheim,
                Buseck, Heuchelheim und Wettenberg entlang der A485 und des Schiffenberger Tals.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all group">
              <Users className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                4. Campus Recruiting Funnels (JLU & THM)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                60-Sekunden-Bewerbungsverfahren ohne Anschreiben für maximale Bewerberquoten unter
                Absolventen und Fachkräften in der Universitätsstadt Gießen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CASE STUDIES & LOCAL PROOF */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Echte Kundenreferenzen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Erfolgsgeschichten aus dem Raum Gießen
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Reale Ergebnisse für mittelhessische Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold uppercase mb-4 border border-amber-200/50">
                Case Study · Gastronomie & Events Gießen-Süd
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Lindener Ratsstuben</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Relaunch der Webpräsenz mit mobil optimierter Speisekarte und digitalem
                Reservierungssystem. Signifikante Steigerung der Online-Tischreservierungen und
                Top-Sichtbarkeit für Gäste aus Gießen und Linden.
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <span>100/100 Core Web Vitals</span> · <span>Digitale Reservierung</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold uppercase mb-4 border border-amber-200/50">
                Case Study · Handwerk & B2B
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Batherm Mittelhessen</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Next.js Relaunch mit subsekundären Ladezeiten und <strong>+340%</strong> mehr
                qualifizierten Kundenanfragen aus dem gesamten Raum Gießen und Wetzlar.
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <span>+340% Anfragen</span> · <span>Ladezeit &lt; 0.4s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCAL GEO-SEMANTIC CONTENT SILO */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Wirtschafts- & Wissenschaftsstandort Gießen
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">
              Universitätsmedizin, Spitzentechnologie & Handel an der Lahn
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Gießen ist mit der <strong>Justus-Liebig-Universität (JLU)</strong>, der{' '}
              <strong>Technischen Hochschule Mittelhessen (THM)</strong>
              und dem <strong>Universitätsklinikum Gießen und Marburg (UKGM)</strong> das
              wissenschaftliche und medizinische Zentrum Mittelhessens. Im{' '}
              <strong>Technologie- und Innovationszentrum Gießen (TIG)</strong>, im{' '}
              <strong>Gewerbegebiet West / Europaviertel</strong> sowie entlang der Einkaufsmeile{' '}
              <strong>Seltersweg</strong>
              konzentriert sich eine dynamische Mischung aus Hightech-Unternehmen, Praxen und
              Einzelhandel.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Perfekte Anbindung via Gießener Ring (A485), A45 & Schiffenberger Tal
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Über die Autobahnen <strong>A485</strong>, <strong>A45</strong> und die{' '}
              <strong>B49</strong> ist unser Büro in Wetzlar in weniger als 10 Minuten in Gießen
              erreichbar. Wir bieten Ihnen den entscheidenden Vorteil einer persönlichen Betreuung
              direkt vor Ort im gesamten Landkreis Gießen – von Linden und Pohlheim über Buseck bis
              Wettenberg.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Verbindlicher Festpreis auf Anfrage & Go-Live in unter 14 Tagen
            </h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Maximale Planungssicherheit für Ihr Unternehmen: Nach einer kostenlosen Bedarfsanalyse
              erhalten Sie ein transparentes Festpreisangebot. Dank unseres spezialisierten Next.js
              Workflows ist Ihre neue Website in der Regel innerhalb von 10 bis 14 Werktagen online.
            </p>
          </div>
        </div>
      </section>

      {/* 9. LOCAL FAQ ACCORDION */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Häufige Fragen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Fragen & Antworten zu Webdesign in Gießen
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie setzen sich die Kosten für Webdesign in Gießen zusammen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir kalkulieren für Gießener Praxen, Dienstleister und B2B-Unternehmen individuelle,
                transparente Festpreise nach einer kostenlosen Bedarfsanalyse. Durch schlanke
                Next.js 15 Architekturen entfallen teure Agentur-Wasserköpfe und monatliche
                Lizenzgebühren.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie schnell erfolgt der Go-Live für Unternehmen in Gießen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dank standardisierter High-End-Workflows steht Ihre neue Website in Gießen im
                Regelfall innerhalb von 10 bis 14 Werktagen schlüsselfertig online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bieten Sie Vor-Ort-Termine in Gießen und den Gewerbegebieten an?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ja, gerne vor Ort im Technologie- und Innovationszentrum Gießen (TIG),
                Europaviertel, Seltersweg oder Schiffenberger Tal. Von unserem Wetzlarer Büro aus
                erreichen wir Sie über die B49/A485 in rund 10 Minuten.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wie unterstützt Coday das Recruiting von Fachkräften in Gießen?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir integrieren barrierefreie 60-Sekunden-Express-Bewerbungsstrecken, die gezielt
                auf Smartphone-Nutzer, JLU- und THM-Absolventen sowie Fachkräfte aus Mittelhessen
                ausgerichtet sind.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Wer betreut mein Webprojekt in Gießen als fester Ansprechpartner?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inhaber und Lead-Entwickler Umutcan Emre Tezgel berät Sie direkt und setzt das
                Projekt ohne Umwege persönlich um.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="py-20 bg-slate-50/80 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Digitale Spitzenposition für Ihr Gießener Unternehmen sichern
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Lassen Sie uns in einem unverbindlichen 20-Minuten-Gespräch analysieren, wie Next.js 15
            und lokales SEO messbare Anfragen für Ihren Standort in Gießen generieren.
          </p>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-10 py-5 text-lg shadow-xl shadow-primary-700/25 transition-all hover:scale-105"
            >
              Gießener Strategiegespräch anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
