import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EcommerceDevelopmentClient } from '@/features/services/ui/EcommerceDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';
import { getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import {
  ArrowRight,
  ShoppingCart,
  Lightning,
  ShieldCheck,
  Cpu,
  TrendUp,
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
      title: 'Headless E-Commerce & Online Store Development | Coday',
      description:
        'Ultra-fast headless online stores with Next.js & Shopify. Sub-second checkout, maximum mobile conversions & ERP integration for mid-market leaders.',
      keywords: [
        'Headless E-Commerce Agency',
        'Shopify Next.js Development',
        'Online Store Development Wetzlar',
        'E-Commerce Web Design',
        'Coday E-Commerce',
      ],
      path: '/en/services/ecommerce-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Headless E-Commerce & Online Shop Entwicklung | Coday',
    description:
      'Ultraschnelle Headless Online-Shops mit Next.js & Shopify. Subsekundärer Checkout, maximale mobile Conversion-Rates & ERP-Anbindung für den Mittelstand.',
    keywords: [
      'Headless E-Commerce Agentur',
      'Shopify Next.js Entwicklung',
      'Online Shop erstellen Wetzlar',
      'E-Commerce Webdesign',
      'Coday E-Commerce',
    ],
    path: '/de/services/ecommerce-development',
    type: 'money',
  });
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Services' : 'Leistungen', url: `/${_locale}/services` },
    { name: isEn ? 'E-Commerce' : 'E-Commerce', url: `/${_locale}/services/ecommerce-development` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization stays out of this graph; the root layout emits it site-wide.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/${_locale}/services/ecommerce-development#service`,
        name: isEn
          ? 'Headless E-Commerce & Online Store Development'
          : 'Headless E-Commerce & Online Shop Entwicklung',
        url: `${BASE_URL}/${_locale}/services/ecommerce-development`,
        description: isEn
          ? 'High-performance Headless E-Commerce storefronts with Next.js 15, Shopify Storefront API and Stripe Checkout.'
          : 'Hochperformante Headless Online-Shops mit Next.js 15, Shopify Storefront API und Stripe Checkout.',
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Hessen, Deutschland',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'E-Commerce Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless Next.js Storefront',
                description:
                  'Subsekundäre Seitenwechsel, sofortige Produktfilterung und 100/100 Core Web Vitals.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Shopify Storefront API & Stripe Integration',
                description:
                  'Sichere, PCI-DSS-konforme Checkout-Prozesse mit Apple Pay, Google Pay und Klarna.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Händlerportale & ERP-Synchronisation',
                description:
                  'Kundenspezifische Staffelpreise, automatischer Rechnungsversand und Warenwirtschafts-Sync.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${_locale}/services/ecommerce-development#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Warum ist ein Headless Shop schneller als WooCommerce oder Shopware 5?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Headless entkoppelt das Frontend vollständig von der Backend-Datenbank. Das Frontend wird als statisches Next.js Edge-Projekt ausgeliefert, während Produktdaten und Checkout über schlanke APIs blitzschnell geladen werden.',
            },
          },
          {
            '@type': 'Question',
            name: 'Können bestehende Warenwirtschafts- und ERP-Systeme angebunden werden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ja. Über moderne REST- und GraphQL-Schnittstellen binden wir gängige ERP- und Warenwirtschaftssysteme wie JTL, Plentymarkets, SAP oder Lexoffice nahtlos an.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Zahlungsmethoden werden im Checkout unterstützt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch die Integration von Stripe und Shopify Checkout unterstützen wir alle relevanten Zahlungsmethoden inklusive Apple Pay, Google Pay, PayPal, Klarna, Kreditkarte und SEPA-Lastschrift mit maximaler Konversionsrate.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        id="schema-ecommerce"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EcommerceDevelopmentClient />

      {/* Headless Architecture & Performance Showcase */}
      <section className="container mx-auto px-4 py-20 max-w-6xl text-slate-700">
        <div className="p-8 lg:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <ShoppingCart className="w-4 h-4 text-amber-600" />
            <span>HEADLESS COMMERCE ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8">
            {isEn
              ? 'Why Headless Next.js Stores Double Mobile Conversion Rates'
              : 'Warum Headless Next.js Shops mobile Konversionsraten verdoppeln'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <Lightning className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Subsekundärer Produktfilter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kein Neuladen der Seite: Kunden filtern tausende Varianten und Kategorien in unter
                50ms Reaktionszeit.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <TrendUp className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Frictionless 1-Click Checkout
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optimierte Bezahlstrecken mit Apple Pay & Klarna minimieren Warenkorbabbrüche um bis
                zu 38%.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm">
              <Cpu className="w-6 h-6 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">B2B & ERP-Synchronisation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Individuelle Preisstaffeln, Händler-Logins und automatischer Bestandsabgleich mit
                Ihrer Warenwirtschaft.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <p>
              Klassische Shopsysteme wie WooCommerce oder veraltete Shopware-Setups brechen bei
              steigendem mobilen Traffic und komplexen Katalogen ein. Durch die Trennung von
              Frontend und Backend (Headless Commerce) liefern wir Produktseiten blitzschnell über
              weltweite Edge-Netzwerke aus — sicher, skalierbar und ohne Wartungsstress.
            </p>
          </div>

          {/* Internal Silo Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4">
              Verwandte Leistungen & Case Studies:
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/web-development"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Full-Stack Webentwicklung</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/services/performance"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Core Web Vitals & Speed</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/work/talia-boutique"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 hover:border-amber-400 transition-colors shadow-sm"
              >
                <span>Case Study: Talia Boutique E-Commerce</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-sm"
              >
                <span>Shop-Pakete & Festpreise</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
