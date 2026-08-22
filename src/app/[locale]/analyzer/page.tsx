import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import {
  getOrganizationSchema,
  getBreadcrumbSchema,
  getWebApplicationSchema,
  BASE_URL,
} from '@/lib/schema';
import UrlInputForm from '@/features/analyzer/ui/UrlInputForm';
import ReportDashboard from '@/features/analyzer/ui/ReportDashboard';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'analyzer' });

  const defaultKeywords =
    locale === 'en'
      ? [
          'Website Analyzer',
          'Free SEO Audit',
          'PageSpeed Checker',
          'Core Web Vitals Test',
          'Website Performance Audit',
        ]
      : [
          'Website Analyzer',
          'Kostenloser SEO Check',
          'PageSpeed Test',
          'Core Web Vitals Audit',
          'Website Performance Analyse',
        ];

  return generatePageMetadata({
    title: t('meta.title', { defaultValue: 'Website Analyzer & SEO Audit | Coday' }),
    description: t('meta.description', {
      defaultValue: 'Kostenloses Website Audit & Performance Analyse.',
    }),
    keywords: defaultKeywords,
    path: `/${locale}/analyzer`,
    type: 'money',
  });
}

export default async function AnalyzerPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);

  const t = await getTranslations({ locale: _locale, namespace: 'analyzer' });

  const pageTitle = t('meta.title', { defaultValue: 'Website Analyzer & SEO Audit | Coday' });
  const pageDescription = t('meta.description', {
    defaultValue: 'Kostenloses Website Audit & Performance Analyse.',
  });

  const messages = await getMessages();

  const breadcrumbs = getBreadcrumbSchema([
    { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: _locale === 'en' ? 'Analyzer' : 'Website Analyzer', url: `/${_locale}/analyzer` },
  ]);

  const webApp = getWebApplicationSchema({
    name:
      _locale === 'en'
        ? 'Coday Free Website Analyzer & SEO Audit'
        : 'Coday Kostenloser Website Analyzer',
    description: pageDescription,
    url: `${BASE_URL}/${_locale}/analyzer`,
    applicationCategory: 'DeveloperApplication',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), breadcrumbs, webApp],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-[var(--space-section)] min-h-screen bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-secondary-900 mb-6">
              {_locale === 'en' ? 'Free Website ' : 'Kostenloser Website '}
              <span className="text-primary-600">Analyzer</span> & SEO Audit
            </h1>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {_locale === 'en'
                ? 'Test your website for performance, SEO, accessibility, and best practices with our free Website Analyzer & SEO Audit.'
                : 'Testen Sie Ihre Website auf Performance, SEO, Accessibility und Best Practices mit unserem kostenlosen Website Analyzer & SEO Audit.'}
            </p>
          </div>

          <UrlInputForm />

          <div className="mt-16">
            <ReportDashboard />
          </div>

          <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
            <h2 className="text-3xl font-display font-bold mb-6">
              {_locale === 'en'
                ? 'Free Website Analyzer & SEO Audit – How It Works'
                : 'Kostenloser Website Analyzer & SEO Audit – So funktioniert es'}
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              {_locale === 'en' ? (
                <>
                  <p>
                    The Coday Website Analyzer is a free SEO audit tool that scans your website in
                    real time and delivers a comprehensive performance report within seconds. Simply
                    enter your URL above and our analyzer evaluates your site across four critical
                    dimensions: technical SEO health, Core Web Vitals, accessibility compliance, and
                    modern best practices. Unlike many free tools that only scratch the surface, our
                    Website Analyzer provides actionable, prioritized recommendations so you know
                    exactly where to start optimizing. Whether you run a small business in Wetzlar
                    or operate internationally, this free audit gives you the same depth of insight
                    that agencies typically charge hundreds of euros for.
                  </p>
                  <p>
                    A thorough SEO audit is the foundation of every successful digital strategy.
                    Search engines like Google use hundreds of ranking factors, and even small
                    technical issues — missing meta descriptions, slow server response times,
                    unoptimized images, or broken internal links — can significantly impact your
                    visibility in search results. Our free Website Analyzer checks for all of these
                    issues and more, including mobile responsiveness, HTTPS configuration, heading
                    structure, and crawlability. The detailed report highlights critical errors,
                    warnings, and improvement opportunities in a clear, easy-to-understand format.
                    You do not need any technical expertise to interpret the results; each finding
                    comes with a plain-language explanation and a concrete fix.
                  </p>
                  <p>
                    Core Web Vitals have become a decisive ranking signal since Google integrated
                    them into its algorithm. Largest Contentful Paint (LCP), Interaction to Next
                    Paint (INP), and Cumulative Layout Shift (CLS) directly measure how users
                    experience your website. Our free SEO audit tool benchmarks your page against
                    Google&apos;s recommended thresholds and pinpoints exactly which elements are
                    dragging your scores down — whether it is render-blocking JavaScript,
                    uncompressed assets, or layout shifts caused by dynamically loaded content.
                    Armed with this data, you can make targeted improvements that boost both your
                    rankings and your conversion rate.
                  </p>
                  <p>
                    Accessibility is not only a legal requirement in many regions but also a
                    significant ranking factor and a matter of inclusivity. The Website Analyzer
                    evaluates your site against WCAG guidelines, checking for adequate color
                    contrast, proper ARIA labels, keyboard navigability, and semantic HTML
                    structure. Fixing accessibility issues expands your potential audience and sends
                    positive quality signals to search engines. At Coday, we believe that every
                    website should be usable by everyone, and our free audit tool helps you identify
                    the gaps. Run your first free SEO audit now and take the first step toward a
                    faster, more visible, and more accessible online presence.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Der Coday Website Analyzer ist ein kostenloses SEO-Audit-Tool, das Ihre Website
                    in Echtzeit scannt und innerhalb von Sekunden einen umfassenden
                    Performance-Report liefert. Geben Sie einfach Ihre URL oben ein, und unser
                    Analyzer bewertet Ihre Seite in vier entscheidenden Dimensionen: technische
                    SEO-Gesundheit, Core Web Vitals, Barrierefreiheit und moderne Best Practices.
                    Anders als viele kostenlose Tools, die nur an der Oberfläche kratzen, liefert
                    unser Website Analyzer priorisierte und umsetzbare Empfehlungen, damit Sie genau
                    wissen, wo Sie mit der Optimierung beginnen sollten. Ob Sie ein lokales
                    Unternehmen in Wetzlar führen oder überregional tätig sind – dieses kostenlose
                    SEO Audit bietet Ihnen die gleiche Analysetiefe, für die Agenturen üblicherweise
                    mehrere hundert Euro berechnen.
                  </p>
                  <p>
                    Ein gründliches SEO Audit ist das Fundament jeder erfolgreichen digitalen
                    Strategie. Suchmaschinen wie Google verwenden Hunderte von Ranking-Faktoren, und
                    selbst kleine technische Probleme – fehlende Meta-Beschreibungen, langsame
                    Server-Antwortzeiten, nicht optimierte Bilder oder defekte interne Links –
                    können Ihre Sichtbarkeit in den Suchergebnissen erheblich beeinträchtigen. Unser
                    kostenloser Website Analyzer prüft all diese Aspekte und mehr:
                    Mobile-Responsiveness, HTTPS-Konfiguration, Überschriftenstruktur und
                    Crawlbarkeit. Der detaillierte Report hebt kritische Fehler, Warnungen und
                    Verbesserungsmöglichkeiten in einem klaren, leicht verständlichen Format hervor.
                    Sie benötigen keine technische Expertise, um die Ergebnisse zu interpretieren –
                    jeder Befund wird mit einer verständlichen Erklärung und einer konkreten Lösung
                    versehen.
                  </p>
                  <p>
                    Core Web Vitals sind seit ihrer Integration in den Google-Algorithmus ein
                    entscheidendes Ranking-Signal. Largest Contentful Paint (LCP), Interaction to
                    Next Paint (INP) und Cumulative Layout Shift (CLS) messen direkt, wie Nutzer
                    Ihre Website erleben. Unser kostenloses SEO-Audit-Tool vergleicht Ihre Seite mit
                    den von Google empfohlenen Schwellenwerten und zeigt exakt auf, welche Elemente
                    Ihre Werte verschlechtern – sei es render-blockierendes JavaScript,
                    unkomprimierte Assets oder Layout-Verschiebungen durch dynamisch geladene
                    Inhalte. Mit diesen Daten können Sie gezielte Verbesserungen vornehmen, die
                    sowohl Ihre Rankings als auch Ihre Conversion-Rate steigern.
                  </p>
                  <p>
                    Barrierefreiheit ist nicht nur in vielen Regionen eine gesetzliche Anforderung,
                    sondern auch ein bedeutender Ranking-Faktor und eine Frage der Inklusion. Der
                    Website Analyzer bewertet Ihre Seite anhand der WCAG-Richtlinien und prüft auf
                    ausreichenden Farbkontrast, korrekte ARIA-Labels, Tastaturnavigation und
                    semantische HTML-Struktur. Die Behebung von Barrierefreiheitsproblemen erweitert
                    Ihre potenzielle Zielgruppe und sendet positive Qualitätssignale an
                    Suchmaschinen. Bei Coday sind wir überzeugt, dass jede Website für alle Menschen
                    nutzbar sein sollte, und unser kostenloses Audit-Tool hilft Ihnen, die Lücken zu
                    identifizieren. Starten Sie jetzt Ihr erstes kostenloses SEO Audit und machen
                    Sie den ersten Schritt zu einer schnelleren, sichtbareren und barrierefreieren
                    Online-Präsenz.
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
