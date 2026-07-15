import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import fs from 'fs';
import path from 'path';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'handwerk-bau-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Craftsmen in Wetzlar | Agency';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en'
          ? 'Professional web design for craftsmen in Wetzlar. Get more local jobs and visibility with our tailored digital solutions.'
          : content.meta.description,
      path: `/${locale}/branchen/handwerker/wetzlar`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Craftsmen in Wetzlar | Agency'
          : 'Webdesign für Handwerker in Wetzlar | Agentur',
      description:
        locale === 'en'
          ? 'Professional web design for craftsmen in Wetzlar. Get more local jobs and visibility with our tailored digital solutions.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/handwerker/wetzlar`,
      type: 'money',
    });
  }
}

export default async function SubIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'handwerk-bau-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h2 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h2>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
      </div>
    );
  }

  const cityData = getCityBySlug('wetzlar');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen in Wetzlar | Agency | Coday'
      : 'Webdesign für Handwerker in Wetzlar | Agentur | Coday';
  return (
    <>
      <script
        id="schema-branchen-handwerker-wetzlar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Web Design for Craftsmen in Wetzlar'
                    : 'Webdesign für Handwerker in Wetzlar',
                description:
                  _locale === 'en'
                    ? 'Web design for craftsmen in Wetzlar. Digital dominance for your industry.'
                    : 'Webdesign für Handwerker in Wetzlar. Digitale Dominanz für Ihre Branche.',
                url: `${BASE_URL}/${_locale}/branchen/handwerker/wetzlar`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={cityData} />
      {/* SEO */}
      {_locale === 'de' ? (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Webdesign für Handwerker in Wetzlar – Mehr Aufträge durch digitale Präsenz
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Im Handwerk entscheidet heute die Online-Sichtbarkeit über den Auftragserfolg. Kunden
              in Wetzlar und dem Lahn-Dill-Kreis suchen Elektriker, Maler, Klempner und andere
              Handwerker überwiegend über Google. Ohne eine professionelle Website mit lokaler
              Suchmaschinenoptimierung verschenken Handwerksbetriebe wertvolle Aufträge an die
              Konkurrenz. Coday entwickelt maßgeschneiderte Webdesign- und IT-Lösungen speziell für
              Handwerker in Wetzlar. Wir wissen, dass Handwerksmeister keine Zeit für komplizierte
              Technik haben – deshalb liefern wir schlüsselfertige Websites, die sofort
              funktionieren, professionell wirken und messbar neue Kunden gewinnen. Unsere Lösungen
              sind so praxisnah wie Ihr Handwerk selbst.
            </p>
            <p>
              Eine Handwerker-Website von Coday zeigt Ihre Leistungen, abgeschlossenen Projekte und
              Kundenbewertungen auf den ersten Blick. Wir integrieren Projektgalerien mit
              Vorher-Nachher-Bildern, die Ihre handwerkliche Qualität eindrucksvoll unter Beweis
              stellen. Digitale Anfrageformulare ermöglichen es Kunden, unkompliziert Angebote
              einzuholen – das spart Ihnen Telefonate und sorgt für qualifizierte Anfragen direkt in
              Ihrem Postfach. Referenzprojekte und Kundenstimmen werden strategisch platziert, um
              das Vertrauen neuer Interessenten zu gewinnen. Darüber hinaus gestalten wir
              übersichtliche Leistungsseiten für jedes Ihrer Gewerke, von der Badsanierung über die
              Elektroinstallation bis zur Dacheindeckung, sodass Kunden genau das finden, was sie
              suchen.
            </p>
            <p>
              Lokale SEO ist für Handwerker in Wetzlar das wichtigste digitale Wachstumsinstrument.
              Wir optimieren Ihre Website gezielt auf Suchbegriffe wie „Handwerker Wetzlar",
              „Elektriker Wetzlar", „Maler in meiner Nähe" oder „Sanitär Notdienst Lahn-Dill". Durch
              die Optimierung Ihres Google Business-Profils, den systematischen Aufbau lokaler
              Verzeichniseinträge und die technische Perfektionierung Ihrer Website sorgen wir für
              Top-Platzierungen bei lokalen Suchanfragen. Jede Seite wird für mobile Endgeräte
              optimiert, denn Hausbesitzer suchen oft unterwegs auf dem Smartphone nach einem
              Handwerker. Schnelle Ladezeiten unter zwei Sekunden und eine klare, übersichtliche
              Navigation sind für uns selbstverständlich.
            </p>
            <p>
              Als Webdesign-Agentur in Wetzlar kennen wir die Handwerkslandschaft in der Region
              persönlich. Wir liefern DSGVO-konforme Kontaktformulare, rechtssichere Impressums- und
              Datenschutzseiten und Cookie-Lösungen, die den gesetzlichen Anforderungen entsprechen.
              Unser Ansatz ist es, Ihre handwerkliche Kompetenz digital genauso überzeugend
              darzustellen, wie sie in der Realität ist. Mit einer von Coday gestalteten Website
              stärken Sie nicht nur Ihre Online-Sichtbarkeit, sondern bauen eine digitale Marke auf,
              die Ihren Handwerksbetrieb in Wetzlar und Umgebung als erste Wahl positioniert – für
              heute und für die Zukunft.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Web Design for Craftsmen in Wetzlar – More Jobs Through Digital Presence
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              In the trades, online visibility now determines whether you win or lose jobs.
              Customers in Wetzlar and the Lahn-Dill district search for electricians, painters,
              plumbers, and other craftsmen predominantly through Google. Without a professional
              website backed by local search engine optimisation, trade businesses hand valuable
              work to the competition. Coday develops tailored web design and IT solutions
              specifically for craftsmen in Wetzlar. We know that master tradespeople have no time
              for complicated technology — that is why we deliver turnkey websites that work
              immediately, look professional, and measurably win new customers. Our solutions are as
              practical as your craft itself.
            </p>
            <p>
              A tradesman's website from Coday showcases your services, completed projects, and
              customer reviews at a glance. We integrate project galleries with before-and-after
              images that impressively demonstrate your craftsmanship quality. Digital enquiry forms
              let customers request quotes easily — saving you phone calls and delivering qualified
              leads straight to your inbox. Reference projects and client testimonials are
              strategically placed to build trust with new prospects. Beyond that, we create clear
              service pages for each of your trades, from bathroom renovation and electrical
              installation to roofing, so customers find exactly what they are looking for.
            </p>
            <p>
              Local SEO is the single most important digital growth tool for craftsmen in Wetzlar.
              We optimise your website specifically for search terms such as "tradesman Wetzlar",
              "electrician Wetzlar", "painter near me", or "plumbing emergency Lahn-Dill". By
              optimising your Google Business Profile, systematically building local directory
              listings, and technically perfecting your website, we secure top positions for local
              searches. Every page is optimised for mobile devices, because homeowners often search
              for a tradesman on their smartphone while on the go. Fast loading times under two
              seconds and a clear, intuitive navigation are standard for us.
            </p>
            <p>
              As a web design agency in Wetzlar, we know the local trades landscape personally. We
              deliver GDPR-compliant contact forms, legally secure imprint and privacy pages, and
              cookie solutions that meet all regulatory requirements. Our approach is to present
              your craftsmanship digitally with the same conviction it carries in reality. With a
              website designed by Coday, you not only strengthen your online visibility but build a
              digital brand that positions your trade business in Wetzlar and the surrounding area
              as the first choice — today and into the future.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
