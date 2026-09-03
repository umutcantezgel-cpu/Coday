import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Management Consulting Web Design & IT Solutions',
      description:
        'Custom web design and IT solutions specifically tailored for Management Consultants. Elevate your digital presence with Coday.',
      path: '/en/branchen/unternehmensberatung',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unternehmensberatung Webdesign & IT-Lösungen',
    description:
      'Maßgeschneidertes Webdesign und IT-Lösungen speziell für Unternehmensberatungen. Stärken Sie Ihre digitale Präsenz mit Coday.',
    path: '/de/branchen/unternehmensberatung',
    type: 'money',
  });
}

export default async function UnternehmensberatungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const pageUrl = `${BASE_URL}/${locale}/branchen/unternehmensberatung`;
  const _seoTitle =
    locale === 'en' ? 'Web Design for Management Consulting' : 'Webdesign für Unternehmensberatung';
  const _seoDesc =
    locale === 'en'
      ? 'Custom web design solutions for management consultants by Coday in Wetzlar.'
      : 'Maßgeschneiderte Webdesign-Lösungen für Unternehmensberatungen von Coday in Wetzlar.';

  return (
    <>
      <script
        id="schema-branchen-unternehmensberatung"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // The root layout takes care of the Organization node for every route.
            '@graph': [
              getBreadcrumbSchema(
                [
                  { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                  {
                    name: _locale === 'en' ? 'Industries' : 'Branchen',
                    url: `/${_locale}/branchen`,
                  },
                  {
                    name: _locale === 'en' ? 'Management Consulting' : 'Unternehmensberatung',
                    url: `/${_locale}/branchen/unternehmensberatung`,
                  },
                ],
                pageUrl
              ),
              getWebPageSchema({
                url: pageUrl,
                name: _seoTitle,
                description: _seoDesc,
                locale: _locale,
                mainEntityId: `${pageUrl}#service`,
              }),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: pageUrl,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="unternehmensberatung" />
      {/* SEO */}
      {locale === 'de' ? (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h3 className="text-3xl font-display font-bold mb-6">
            Warum Unternehmensberatungen eine professionelle Website brauchen
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Eine Unternehmensberatung lebt von Vertrauen, Kompetenz und dem Ruf, komplexe
              Herausforderungen zu lösen. Genau das muss Ihre Website vom ersten Moment an
              kommunizieren. Wir entwickeln digitale Auftritte, die Ihre Beratungskompetenz sichtbar
              machen – durch strategisch platzierte Case Studies, die Ihre Projekterfolge belegen,
              durch Whitepaper-Funnels, die qualifizierte Leads generieren, und durch ein Design,
              das Seriosität und Innovationskraft gleichermaßen ausstrahlt. Entscheider in
              mittelständischen Unternehmen und Konzernen erwarten eine professionelle
              Online-Präsenz, bevor sie ein erstes Beratungsgespräch vereinbaren. Wir sorgen dafür,
              dass Ihre Website diese Erwartung nicht nur erfüllt, sondern übertrifft – mit
              durchdachter Informationsarchitektur, klarer Positionierung und überzeugenden
              Vertrauenssignalen wie Referenzprojekten und Branchenzertifizierungen.
            </p>
            <p>
              Im B2B-Bereich der Unternehmensberatung entscheidet gezielte Suchmaschinenoptimierung
              darüber, ob potenzielle Mandanten Sie finden oder Ihre Mitbewerber. Wir entwickeln
              SEO-Strategien, die auf transaktionale Keywords wie &quot;Unternehmensberatung
              Digitalisierung&quot;, &quot;Change Management Berater&quot; oder
              &quot;Strategieberatung Mittelstand&quot; ausgerichtet sind – Begriffe, hinter denen
              konkreter Beratungsbedarf steht. Durch die Kombination aus fachspezifischem
              Content-Marketing, strukturierten Thought-Leadership-Inhalten und technisch
              einwandfreier On-Page-Optimierung positionieren wir Ihre Beratung dort, wo Entscheider
              nach Lösungen suchen. Ergänzend integrieren wir Lead-Magneten wie Branchenreports und
              Erstberatungs-Formulare, die aus anonymen Besuchern messbare Geschäftskontakte machen.
              So wird Ihre Website zum leistungsstärksten Akquise-Kanal Ihrer Kanzlei.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h3 className="text-3xl font-display font-bold mb-6">
            Why Management Consultancies Need a Professional Website
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              A consulting firm&apos;s website is its most powerful trust signal. Before a C-suite
              executive schedules a discovery call, they will scrutinise your digital presence for
              proof of expertise. We build websites for management consultancies that project
              authority from the first scroll – featuring prominently placed case studies that
              demonstrate measurable client outcomes, whitepaper download funnels that capture
              high-intent leads, and a visual identity that balances gravitas with forward-thinking
              design. Every element is engineered to shorten the sales cycle: clear service
              positioning, structured thought-leadership content, and social proof through client
              logos and industry certifications. The result is a digital presence that positions
              your consultancy as the obvious choice for decision-makers seeking strategic partners.
            </p>
            <p>
              In the B2B consulting space, organic search is the highest-converting acquisition
              channel – but only when your SEO strategy targets the right intent. We craft keyword
              strategies around high-value queries such as &quot;digital transformation
              consultant&quot;, &quot;operational excellence advisory&quot;, and &quot;strategy
              consulting for mid-market companies&quot; – terms that signal active buying intent
              rather than casual research. Our approach pairs technical on-page optimisation with a
              structured content programme: pillar pages for each service line, insight articles
              that establish thought leadership, and gated assets like industry benchmarks that
              convert visitors into qualified pipeline. Combined with fast load times, schema markup
              for professional services, and conversion-optimised contact flows, your website
              becomes the most effective business-development tool in your firm.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
