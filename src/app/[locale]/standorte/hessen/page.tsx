import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getOrganizationSchema, getDynamicLocationSchema, BASE_URL } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Hesse | All Locations & Districts – Coday',
      description:
        'Directory of all web design locations and districts of Coday Web Agency in Hesse. High-end Next.js web development from Wetzlar and Frankfurt to Kassel and Fulda.',
      path: '/en/standorte/hessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Hessen | Alle Standorte & Landkreise – Coday',
    description:
      'Übersicht aller Webdesign Standorte & Landkreise der Coday Webagentur in Hessen. High-End Next.js Webentwicklung von Wetzlar & Frankfurt bis Kassel & Fulda.',
    path: '/de/standorte/hessen',
    type: 'money',
  });
}

export default async function HessenLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      `hessen.${_locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Hessen SEO Content is currently being generated...</div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/standorte/hessen#collection`,
        name:
          _locale === 'en'
            ? 'Web Design Locations & Districts in Hesse'
            : 'Webdesign Standorte & Landkreise in Hessen',
        url: `${BASE_URL}/${_locale}/standorte/hessen`,
        description:
          _locale === 'en'
            ? 'Complete directory of all Coday Web Agency locations and regional district hubs across Hesse.'
            : 'Vollständige Übersicht aller Standorte und Landkreise der Coday Webagentur in ganz Hessen.',
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/${_locale}/standorte/hessen#localbusiness`,
        name: 'Coday – High-End Webdesign & Webentwicklung Hessen',
        url: `${BASE_URL}/${_locale}/standorte/hessen`,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49 6441 000000',
        email: 'kontakt@codayweb.de',
        priceRange: '€€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Regionalbüro Hessen / HQ Wetzlar',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.5667,
          longitude: 8.5,
        },
        areaServed: {
          '@type': 'State',
          name: 'Hessen',
        },
      },
    ],
  };

  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Agency Hesse | Premium Websites | Coday'
      : 'Webdesign Agentur Hessen | Premium Webseiten | Coday';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} />

      {/* Structured Hessen Standorte Hub Directory */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-400 font-semibold tracking-wider uppercase text-xs sm:text-sm block mb-2">
              Regionale Wirtschaftsräume
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Lokale Webdesign- & Entwicklungs-Standorte in Hessen
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Vom Headquarter Wetzlar bis in alle hessischen Wirtschaftszentren: Finden Sie die
              spezialisierte Landingpage für Ihre Region mit maßgeschneiderten Branchenlösungen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Wetzlar */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-primary-500/40 hover:border-primary-400 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    HQ • Mittelhessen
                  </span>
                  <span className="text-xs bg-primary-950 text-primary-300 border border-primary-800 px-2 py-0.5 rounded">
                    Headquarter
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-agentur-wetzlar" className="hover:text-primary-400">
                    Webdesign Wetzlar
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Optik, Feinmechanik, Kanzleien und lokaler Mittelstand an der Lahn.
                </p>
              </div>
              <Link
                href="/webdesign-agentur-wetzlar"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Wetzlar ansehen →
              </Link>
            </div>

            {/* Frankfurt am Main */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Finanzmetropole
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    45 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-frankfurt" className="hover:text-primary-400">
                    Webdesign Frankfurt
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  FinTech, Private Equity, Großkanzleien und B2B-Enterprise im Rhein-Main-Gebiet.
                </p>
              </div>
              <Link
                href="/webdesign-frankfurt"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Frankfurt ansehen →
              </Link>
            </div>

            {/* Wiesbaden */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Landeshauptstadt
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    55 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-wiesbaden" className="hover:text-primary-400">
                    Webdesign Wiesbaden
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Kanzleien, Notariate, Versicherungen, Kliniken und Consulting-Unternehmen.
                </p>
              </div>
              <Link
                href="/webdesign-wiesbaden"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Wiesbaden ansehen →
              </Link>
            </div>

            {/* Darmstadt */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Wissenschaftsstadt
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    60 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-darmstadt" className="hover:text-primary-400">
                    Webdesign Darmstadt
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Software/SaaS, Life Sciences, Messtechnik, IT-Security und High-Tech B2B.
                </p>
              </div>
              <Link
                href="/webdesign-darmstadt"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Darmstadt ansehen →
              </Link>
            </div>

            {/* Kassel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Nordhessen
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    75 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-kassel" className="hover:text-primary-400">
                    Webdesign Kassel
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Mobilitätswirtschaft, Schienen- & Fahrzeugbau, Erneuerbare Energien und Logistik.
                </p>
              </div>
              <Link
                href="/webdesign-kassel"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Kassel ansehen →
              </Link>
            </div>

            {/* Offenbach am Main */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Rhein-Main
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    50 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-offenbach" className="hover:text-primary-400">
                    Webdesign Offenbach
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Design- & Kreativwirtschaft am Hafen, europäische Zentralen Kaiserlei und
                  Großhandel.
                </p>
              </div>
              <Link
                href="/webdesign-offenbach"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Offenbach ansehen →
              </Link>
            </div>

            {/* Hanau */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Main-Kinzig
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    48 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-hanau" className="hover:text-primary-400">
                    Webdesign Hanau
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Materialtechnologie, Edelmetalle, Chemiepark Wolfgang und Data Center
                  Infrastruktur.
                </p>
              </div>
              <Link
                href="/webdesign-hanau"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Hanau ansehen →
              </Link>
            </div>

            {/* Fulda */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Osthessen
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    65 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-fulda" className="hover:text-primary-400">
                    Webdesign Fulda
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Großhandel, Logistikdrehkreuz, Sensor- & Regeltechnik und
                  Bauhandwerks-Mittelstand.
                </p>
              </div>
              <Link
                href="/webdesign-fulda"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Fulda ansehen →
              </Link>
            </div>

            {/* Gießen */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Mittelhessen
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    12 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-giessen" className="hover:text-primary-400">
                    Webdesign Gießen
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Universitäts- & Medizintechnikstandort, Start-ups, E-Commerce und Dienstleister.
                </p>
              </div>
              <Link
                href="/webdesign-giessen"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Gießen ansehen →
              </Link>
            </div>

            {/* Marburg */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Mittelhessen
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    30 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-marburg" className="hover:text-primary-400">
                    Webdesign Marburg
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Pharmazeutische Industrie, Biotech-Standort Görzhain, Forschung und Kanzleien.
                </p>
              </div>
              <Link
                href="/webdesign-marburg"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Marburg ansehen →
              </Link>
            </div>

            {/* Herborn */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Dilltal
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    18 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-herborn" className="hover:text-primary-400">
                    Webdesign Herborn
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Schaltschrankbau, Maschinen- & Werkzeugbau, Pumpentechnik und Metallverarbeitung.
                </p>
              </div>
              <Link
                href="/webdesign-herborn"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Herborn ansehen →
              </Link>
            </div>

            {/* Limburg */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Limburg-Weilburg
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    35 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-limburg" className="hover:text-primary-400">
                    Webdesign Limburg
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  B2B-Handel, Logistikdrehscheibe ICE-City, Handwerks-Champions und Dienstleister.
                </p>
              </div>
              <Link
                href="/webdesign-limburg"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Limburg ansehen →
              </Link>
            </div>

            {/* Friedberg & Bad Nauheim */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Wetteraukreis
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    35 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-friedberg" className="hover:text-primary-400">
                    Webdesign Friedberg
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Gesundheitswirtschaft, Kliniken Bad Nauheim, B2B-Dienstleister und Wetterau.
                </p>
              </div>
              <Link
                href="/webdesign-friedberg"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Friedberg ansehen →
              </Link>
            </div>

            {/* Bad Homburg vor der Höhe */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Hochtaunus
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    35 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-bad-homburg" className="hover:text-primary-400">
                    Webdesign Bad Homburg
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Healthcare, Medizintechnik, Family Offices, Vermögensberatung und Kanzleien.
                </p>
              </div>
              <Link
                href="/webdesign-bad-homburg"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Bad Homburg ansehen →
              </Link>
            </div>

            {/* Oberursel (Taunus) */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Vordertaunus
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    35 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-oberursel" className="hover:text-primary-400">
                    Webdesign Oberursel
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Management- & IT-Consulting, Cloud-Dienstleister und exklusives Taunus-Handwerk.
                </p>
              </div>
              <Link
                href="/webdesign-oberursel"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Oberursel ansehen →
              </Link>
            </div>

            {/* Bad Vilbel */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Südliche Wetterau
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    35 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-bad-vilbel" className="hover:text-primary-400">
                    Webdesign Bad Vilbel
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Medien & Rundfunk, Getränkeindustrie Hassia, IT-Systemhäuser und
                  B2B-Dienstleister.
                </p>
              </div>
              <Link
                href="/webdesign-bad-vilbel"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Bad Vilbel ansehen →
              </Link>
            </div>

            {/* Hofheim am Taunus */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Main-Taunus
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    45 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-hofheim" className="hover:text-primary-400">
                    Webdesign Hofheim am Taunus
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Kanzleien, Notariate, Handels- & Logistikdrehkreuz Wallau und anspruchsvolles
                  Bauhandwerk.
                </p>
              </div>
              <Link
                href="/webdesign-hofheim"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Hofheim ansehen →
              </Link>
            </div>

            {/* Rüsselsheim am Main */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Groß-Gerau
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    50 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-ruesselsheim" className="hover:text-primary-400">
                    Webdesign Rüsselsheim
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Automotive Engineering, Logistikdrehkreuz, technisches Handwerk und
                  Zulieferindustrie.
                </p>
              </div>
              <Link
                href="/webdesign-ruesselsheim"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Rüsselsheim ansehen →
              </Link>
            </div>

            {/* Bensheim (Bergstraße) */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Bergstraße
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    65 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-bensheim" className="hover:text-primary-400">
                    Webdesign Bensheim
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Dental- & Medizintechnik, Elektronik Stubenwald, Weinwirtschaft und Tourismus.
                </p>
              </div>
              <Link
                href="/webdesign-bensheim"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Bensheim ansehen →
              </Link>
            </div>

            {/* Rodgau (Kreis Offenbach) */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Kreis Offenbach
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    50 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-rodgau" className="hover:text-primary-400">
                    Webdesign Rodgau
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  SHK & Elektro-Handwerk, E-Commerce-Fulfillment, Logistik und Maschinenbau.
                </p>
              </div>
              <Link
                href="/webdesign-rodgau"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Rodgau ansehen →
              </Link>
            </div>

            {/* Dietzenbach & Dreieich */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-primary-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                    Offenbach Land
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    50 Min ab HQ
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href="/webdesign-dietzenbach" className="hover:text-primary-400">
                    Webdesign Dietzenbach & Dreieich
                  </Link>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  IT-Systemhäuser, Technologieparks, Medizintechnik-Großhandel und Kanzleizentren.
                </p>
              </div>
              <Link
                href="/webdesign-dietzenbach"
                className="text-xs font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
              >
                Standort Dietzenbach ansehen →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
