import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getPortfolioSchema, BASE_URL } from '@/lib/schema';
import { workData } from '@/shared/data/work';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design References Wetzlar | Our Projects',
      description:
        'Real client projects by Coday in Wetzlar. Batherm, Schluessel Schmiede and more references from Central Hesse. See for yourself the quality of our work.',
      path: '/en/work',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Referenzen Wetzlar | Unsere Projekte',
    description:
      'Echte Kundenprojekte von Coday in Wetzlar. Referenzen wie Batherm und Schlüssel Schmiede aus Mittelhessen. Überzeugen Sie sich von unserer Arbeit.',
    path: '/de/work',
    type: 'money',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const lang = isEn ? 'en' : 'de';

  const projects = Object.values(workData);
  const caseStudies = projects.filter((p) => p.type === 'case_study');
  const inProgress = projects.filter((p) => p.type === 'in_progress');

  const portfolioProjects = caseStudies.map((p) => ({
    name: p.content[lang].title,
    url: `${BASE_URL}/${lang}/work/${p.slug}`,
    description: p.content[lang].subtitle,
  }));

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design References Wetzlar | Our Projects | Coday'
      : 'Webdesign Referenzen Wetzlar | Unsere Projekte | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Real client projects by Coday in Wetzlar. Batherm, Schluessel Schmiede and more references from Central Hesse. See for yourself the quality of our work.'
      : 'Echte Kundenprojekte von Coday in Wetzlar. Batherm, Schlüssel Schmiede und weitere Referenzen aus Mittelhessen. Überzeugen Sie sich selbst von unserer Arbeit.';
  return (
    <>
      <script
        id="schema-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getPortfolioSchema(portfolioProjects, _locale),
            ],
          }),
        }}
      />
      <div className="min-h-dvh bg-bg-primary">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-3 block">
              {isEn ? 'Portfolio' : 'Referenzen'}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-secondary-900 mb-6 leading-tight">
              {isEn ? 'Real Projects.' : 'Echte Projekte.'}
              <br />
              <span className="text-primary-700">
                {isEn ? 'Real Results.' : 'Echte Ergebnisse.'}
              </span>
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {isEn
                ? 'Every project tells a story of transformation. Real Projects. Real Results. From concept to launch — always with measurable impact.'
                : 'Jedes Projekt erzählt eine Geschichte der Transformation. Vom Konzept bis zum Launch — immer mit messbarem Impact.'}
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((project) => {
              const content = project.content[lang];
              const heroImage = content.solution.images[0];

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition motion-reduce:duration-[0.01ms] duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                    {heroImage ? (
                      <OptimizedImage
                        src={heroImage}
                        alt={content.solution.imageAlts?.[0] || content.title}
                        className="w-full h-full object-cover transition-transform motion-reduce:duration-[0.01ms] duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary-800 to-secondary-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status Badge */}
                    {project.status === 'live' && project.liveUrl && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full border border-white/50 shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Live
                      </div>
                    )}

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                      {content.stats.slice(0, 2).map((stat, i) => (
                        <div
                          key={i}
                          className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-center flex-1"
                        >
                          <div className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
                            {stat.label}
                          </div>
                          <div className="text-white font-bold text-sm">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-bold text-xs uppercase tracking-widest mb-3">
                      {content.category}
                    </div>
                    <h2 className="font-display font-bold text-xl text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors motion-reduce:duration-[0.01ms]">
                      {content.title}
                    </h2>
                    <p className="text-secondary-600 text-sm line-clamp-2 mb-4">
                      {content.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                      {isEn ? `${content.title} Case Study` : `Case Study: ${content.title}`}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* In Progress Section */}
        {inProgress.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
            <h2 className="font-display font-bold text-2xl text-secondary-900 mb-8 text-center">
              {isEn ? 'Currently in Development' : 'Aktuell in Entwicklung'}
            </h2>
            <div className="max-w-2xl mx-auto">
              {inProgress.map((project) => {
                const content = project.content[lang];
                const Wrapper = project.liveUrl ? 'a' : 'div';
                const wrapperProps = project.liveUrl
                  ? {
                      href: project.liveUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className:
                        'block mb-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 border-dashed hover:border-primary-300 hover:bg-white hover:shadow-sm transition-all cursor-pointer',
                    }
                  : {
                      className:
                        'block mb-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 border-dashed',
                    };

                return (
                  <Wrapper key={project.slug} {...(wrapperProps as any)}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-secondary-900">
                          {content.title}
                        </h3>
                        <p className="text-secondary-500 text-sm">{content.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-primary-600 font-bold text-lg">
                          {project.completion ?? 0}%
                        </div>
                        <div className="text-secondary-400 text-xs uppercase font-medium">
                          {isEn ? 'Progress' : 'Fortschritt'}
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition motion-reduce:duration-[0.01ms] duration-1000"
                        style={{ width: `${project.completion ?? 0}%` }}
                      />
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* SEO Content — keyword-rich bilingual text for Seobility compliance */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16 text-secondary-600">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary-900 mb-8">
          {isEn
            ? 'Web Design References from Wetzlar — Real Projects, Real Results'
            : 'Webdesign Referenzen aus Wetzlar — Echte Projekte, Echte Ergebnisse'}
        </h2>
        <div className="space-y-5 text-base leading-relaxed">
          <p>
            {isEn
              ? 'Welcome to the Coday portfolio. As a solo web design agency based in Wetzlar, Central Hesse, every project you see here represents real work for real clients — no placeholder logos, no fabricated testimonials. These references showcase what happens when strategy, design, and code come together with measurable impact. Real Projects and Real Results are not just a tagline; they are a commitment we deliver on with every engagement.'
              : 'Willkommen im Coday Portfolio. Als Solo-Webagentur mit Sitz in Wetzlar, Mittelhessen, steht jedes Projekt, das Sie hier sehen, für echte Arbeit mit echten Kunden — keine Platzhalter-Logos, keine erfundenen Testimonials. Diese Referenzen zeigen, was entsteht, wenn Strategie, Webdesign und Code mit messbarem Impact zusammenkommen. Echte Projekte und Echte Ergebnisse sind nicht nur ein Slogan, sondern ein Versprechen, das wir bei jedem Auftrag einlösen.'}
          </p>
          <p>
            {isEn
              ? 'Our references span multiple industries across the Wetzlar and Central Hesse region. For Batherm, a heating and plumbing specialist, we delivered a performance-optimised website that dramatically improved local search visibility and lead generation. The project included custom photography direction, conversion-focused landing pages, and technical SEO that pushed Core Web Vitals into the green zone. This is what Real Results look like for a local trades business entering the digital space.'
              : 'Unsere Referenzen erstrecken sich über verschiedene Branchen in der Region Wetzlar und Mittelhessen. Für Batherm, einen Spezialisten für Heizung und Sanitär, haben wir eine performanceoptimierte Website entwickelt, die lokale Sichtbarkeit und Leadgenerierung drastisch verbesserte. Das Projekt umfasste Fotografie-Direction, conversion-fokussierte Landingpages und technisches SEO, das die Core Web Vitals in den grünen Bereich brachte. So sehen Echte Ergebnisse aus, wenn ein lokaler Handwerksbetrieb den digitalen Raum betritt.'}
          </p>
          <p>
            {isEn
              ? 'For MS Schlüsseldienst Wetzlar (Schlüssel Schmiede), we built a fast-loading, mobile-first web presence that serves the emergency locksmith market. Speed was critical — when someone is locked out, they need a locksmith immediately, not a slow website. The Web Design solution prioritised sub-second load times, prominent call-to-action buttons, and local SEO structured data. Our references prove that thoughtful design decisions directly translate into business results.'
              : 'Für MS Schlüsseldienst Wetzlar (Schlüssel Schmiede) haben wir eine schnell ladende, Mobile-First-Webpräsenz entwickelt, die den Notfall-Schlüsseldienst-Markt bedient. Geschwindigkeit war entscheidend — wer ausgesperrt ist, braucht sofort einen Schlüsseldienst, keine langsame Website. Die Webdesign-Lösung setzte auf Ladezeiten unter einer Sekunde, prominente Call-to-Action-Buttons und lokales SEO mit strukturierten Daten. Unsere Referenzen beweisen, dass durchdachte Designentscheidungen direkt in Geschäftsergebnisse münden.'}
          </p>
          <p>
            {isEn
              ? 'Lindener Ratsstuben, a traditional restaurant, needed a digital presence that honoured its heritage while appealing to modern diners searching online. We created a warm, inviting Web Design with elegant menu presentation, reservation integration, and local search optimisation for Wetzlar and surroundings. The result: more table reservations from organic search and a significant increase in visibility for gastronomy-related queries in the region.'
              : 'Die Lindener Ratsstuben, ein traditionsreiches Restaurant, brauchten eine digitale Präsenz, die ihr Erbe würdigt und gleichzeitig moderne Gäste anspricht, die online suchen. Wir haben ein warmes, einladendes Webdesign mit eleganter Speisekarten-Darstellung, Reservierungsanbindung und lokaler Suchoptimierung für Wetzlar und Umgebung geschaffen. Das Ergebnis: mehr Tischreservierungen über die organische Suche und eine deutliche Steigerung der Sichtbarkeit für Gastronomie-Anfragen in der Region.'}
          </p>
          <p>
            {isEn
              ? "What all these projects have in common is the Coday approach: data-driven strategy, premium visual design, and technically flawless implementation using Next.js, React, and modern CSS. Every project starts with understanding the client's business goals — not just their aesthetic preferences. We measure success through real metrics: PageSpeed scores, search rankings, lead volume, and conversion rates. These are not vanity projects; they are References that demonstrate return on investment."
              : 'Was all diese Projekte verbindet, ist der Coday-Ansatz: datengetriebene Strategie, visuell hochwertiges Design und technisch einwandfreie Umsetzung mit Next.js, React und modernem CSS. Jedes Projekt beginnt mit dem Verständnis der Geschäftsziele des Kunden — nicht nur seiner ästhetischen Vorlieben. Wir messen Erfolg an echten Kennzahlen: PageSpeed-Scores, Suchrankings, Lead-Volumen und Conversion-Raten. Das sind keine Vorzeigeprojekte ohne Substanz, sondern Referenzen, die den Return on Investment belegen.'}
          </p>
          <p>
            {isEn
              ? 'If you are looking for a reliable web design partner in Wetzlar or Central Hesse, explore our projects above and see the quality of our work for yourself. Every reference on this page is a real client with a real business — verifiable and transparent. Real Projects, Real Results — that is the Coday promise. Contact us for a free initial consultation and let us discuss how we can achieve similar results for your business.'
              : 'Wenn Sie einen zuverlässigen Webdesign-Partner in Wetzlar oder Mittelhessen suchen, entdecken Sie unsere Projekte oben und überzeugen Sie sich selbst von der Qualität unserer Arbeit. Jede Referenz auf dieser Seite ist ein echter Kunde mit einem echten Unternehmen — nachprüfbar und transparent. Echte Projekte, Echte Ergebnisse — das ist das Coday-Versprechen. Kontaktieren Sie uns für ein kostenloses Erstgespräch und lassen Sie uns besprechen, wie wir ähnliche Ergebnisse für Ihr Unternehmen erzielen können.'}
          </p>
        </div>
      </section>

      <SeoContentBlock />
    </>
  );
}
