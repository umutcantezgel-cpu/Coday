import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ClientComponent from '@/features/knowledge/ui/BlogClient';
import { getOrganizationSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Blog | Tips & Trends from Wetzlar | Coday',
      description:
        'Latest web design tips, SEO trends and digital strategies from Coday in Wetzlar. Practical knowledge for craftsmen and businesses in Central Hesse.',
      keywords: [
        'Web Design Blog',
        'SEO Insights Wetzlar',
        'Next.js Tutorials',
        'Web Development Guides',
        'Coday Blog',
      ],
      path: '/en/knowledge/blog',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Blog | Tipps & Trends aus Wetzlar | Coday',
    description:
      'Aktuelle Webdesign Tipps, SEO Trends und digitale Strategien von Coday in Wetzlar. Praxiswissen für Handwerker und Unternehmen in Mittelhessen.',
    keywords: [
      'Webdesign Blog',
      'SEO Ratgeber Wetzlar',
      'Webentwicklung Tipps',
      'Next.js Tutorials',
      'Coday Blog',
    ],
    path: '/de/knowledge/blog',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Knowledge', url: `/${_locale}/knowledge` },
    { name: 'Blog', url: `/${_locale}/knowledge/blog` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'Blog',
        '@id': `${BASE_URL}/${_locale}/knowledge/blog#blog`,
        name: isEn ? 'Coday Web Design Blog' : 'Coday Webdesign Blog',
        description: isEn
          ? 'Insights into web design, SEO and digital engineering.'
          : 'Einblicke in modernes Webdesign, SEO und Webentwicklung.',
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-blog-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Web Design Blog — Tips &amp; Trends from Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                The Coday web design blog is your go-to resource for practical insights into modern
                website development, search engine optimisation and digital strategy. Based in
                Wetzlar, we write specifically for small and medium-sized businesses across Central
                Hesse that want to strengthen their online presence and attract more local
                customers. Every article is grounded in real project experience — from performance
                audits on craftsmen websites to conversion-focused redesigns for service providers
                in Gießen, Marburg and beyond.
              </p>
              <p>
                Our blog covers a wide range of topics: current web design trends such as
                mobile-first layouts and accessible interfaces, hands-on SEO tips for improving
                Google rankings with local keywords, and guides on Core Web Vitals optimisation that
                directly affect your page speed and user experience. We also explore content
                marketing strategies, structured data implementation and techniques for building
                trust signals that turn visitors into enquiries.
              </p>
              <p>
                Whether you are launching your first business website or planning a complete
                relaunch, our articles give you the knowledge to make informed decisions. We explain
                complex technical concepts in plain language so that business owners in Hesse can
                understand exactly what their agency is doing — and why. Topics like GDPR-compliant
                tracking, image optimisation for faster load times and effective call-to-action
                placement are covered in depth.
              </p>
              <p>
                At Coday, we believe that sharing knowledge builds trust. This blog reflects the
                same transparency and craftsmanship we bring to every client project. Bookmark this
                page and check back regularly for fresh tips on web design, SEO and digital growth
                from your local web design partner in Wetzlar. If a topic inspires you to take
                action, book a free consultation and let us turn insight into results for your
                business.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webdesign Blog — Tipps &amp; Trends aus Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Der Webdesign Blog von Coday ist Ihre zentrale Anlaufstelle für praxisnahes Wissen
                rund um moderne Webentwicklung, Suchmaschinenoptimierung und digitale Strategie.
                Direkt aus Wetzlar schreiben wir speziell für kleine und mittelständische
                Unternehmen in Mittelhessen, die ihre Online-Präsenz gezielt stärken und mehr lokale
                Kunden gewinnen möchten. Jeder Artikel basiert auf echter Projekterfahrung — von
                Performance-Audits für Handwerker-Websites bis hin zu konversionsorientierten
                Relaunches für Dienstleister in Gießen, Marburg und der gesamten Region.
              </p>
              <p>
                Unser Blog deckt ein breites Themenspektrum ab: aktuelle Webdesign Trends wie
                Mobile-First-Layouts und barrierefreie Benutzeroberflächen, praktische SEO Tipps zur
                Verbesserung Ihrer Google-Rankings mit lokalen Suchbegriffen sowie Anleitungen zur
                Core-Web-Vitals-Optimierung, die sich direkt auf Ihre Ladezeiten und das
                Nutzererlebnis auswirken. Darüber hinaus beleuchten wir
                Content-Marketing-Strategien, die Implementierung strukturierter Daten und Techniken
                zum Aufbau von Vertrauenssignalen, die Besucher in echte Anfragen verwandeln.
              </p>
              <p>
                Ob Sie Ihre erste Firmenwebsite erstellen oder einen kompletten Relaunch planen —
                unsere Artikel liefern Ihnen das Wissen, um fundierte Entscheidungen zu treffen. Wir
                erklären komplexe technische Zusammenhänge in verständlicher Sprache, damit
                Unternehmer in Hessen genau nachvollziehen können, was ihre Agentur tut — und warum.
                Themen wie DSGVO-konformes Tracking, Bildoptimierung für schnellere Ladezeiten und
                die effektive Platzierung von Handlungsaufforderungen werden detailliert behandelt.
              </p>
              <p>
                Bei Coday sind wir überzeugt, dass geteiltes Wissen Vertrauen schafft. Dieser Blog
                spiegelt dieselbe Transparenz und Handwerksqualität wider, die wir in jedes
                Kundenprojekt einbringen. Speichern Sie diese Seite als Lesezeichen und schauen Sie
                regelmäßig vorbei, um frische Tipps zu Webdesign, SEO und digitalem Wachstum von
                Ihrem lokalen Webdesign-Partner in Wetzlar zu erhalten. Wenn Sie ein Thema zum
                Handeln inspiriert, buchen Sie ein kostenloses Erstgespräch — und lassen Sie uns
                gemeinsam aus Wissen messbare Ergebnisse für Ihr Unternehmen machen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
