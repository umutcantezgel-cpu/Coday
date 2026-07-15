import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { industriesData } from '@/shared/data/industries';
import { routing } from '@/i18n/routing';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; industry: string }[] = [];
  routing.locales.forEach((locale) => {
    Object.keys(industriesData).forEach((industry) => {
      params.push({ locale, industry });
    });
  });
  return params;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }

  if (locale === 'en') {
    return generatePageMetadata({
      title: `${formattedIndustry} Web Design & IT Solutions`,
      description: `Custom web design and IT solutions specifically tailored for the ${formattedIndustry} industry. Elevate your digital presence with Coday.`,
      path: `/en/branchen/${industry}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `${formattedIndustry} Webdesign & IT-Lösungen`,
    description: `Maßgeschneidertes Webdesign und IT-Lösungen speziell für die Branche ${formattedIndustry}. Stärken Sie Ihre digitale Präsenz mit Coday.`,
    path: `/de/branchen/${industry}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }

  const _locale = (await params)?.locale || 'de';
  return (
    <>
      <script
        id={`schema-branchen-${industry}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  locale === 'en'
                    ? `Web Design for ${formattedIndustry}`
                    : `Webdesign für ${formattedIndustry}`,
                description:
                  locale === 'en'
                    ? `Custom web design solutions for the ${formattedIndustry} industry by Coday in Wetzlar.`
                    : `Maßgeschneiderte Webdesign-Lösungen für die Branche ${formattedIndustry} von Coday in Wetzlar.`,
                url: `${BASE_URL}/${locale}/branchen/${industry}`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient />
      {/* SEO */}
      {locale === 'de' ? (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Digitale Expertise für {formattedIndustry}
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Jede Branche hat ihre eigenen, spezifischen Anforderungen an eine Website. Was für
              einen Handwerksbetrieb funktioniert, ist für eine Arztpraxis oder eine Anwaltskanzlei
              möglicherweise völlig ungeeignet. Aus diesem Grund bieten wir maßgeschneidertes,
              branchenspezifisches Webdesign, das genau auf die Bedürfnisse und Erwartungen Ihrer
              jeweiligen Zielgruppe zugeschnitten ist. Wir analysieren das typische Suchverhalten
              Ihrer Kunden, die branchenüblichen Standards und die Strategien Ihrer erfolgreichsten
              Mitbewerber, um eine Website zu entwickeln, die nicht nur optisch herausragt, sondern
              vor allem funktionell überzeugt. Ob es um die Integration von
              Online-Terminbuchungssystemen für Ärzte, Projektportfolios für Architekten oder
              Anfrageformulare für Dienstleister geht – wir kennen die digitalen Werkzeuge, die in
              Ihrer Branche den entscheidenden Unterschied machen. Unsere branchenspezifischen
              Lösungen sind darauf ausgerichtet, Ihre Conversion-Rate zu maximieren und mehr
              qualifizierte Leads zu generieren.
            </p>
            <p>
              Ein tiefes Verständnis für die Besonderheiten Ihrer Branche ermöglicht es uns, Inhalte
              und Design optimal aufeinander abzustimmen. Wir entwickeln maßgeschneiderte
              Content-Strategien, die Ihre Expertise und Fachkompetenz in den Vordergrund stellen.
              Vertrauensbildende Elemente wie Kundenbewertungen, Zertifikate und Gütesiegel werden
              strategisch platziert, um potenzielle Kunden von Ihrer Qualität zu überzeugen. Auch
              bei der Suchmaschinenoptimierung (SEO) setzen wir auf einen branchenspezifischen
              Ansatz. Wir recherchieren die relevantesten Keywords für Ihr Fachgebiet und optimieren
              Ihre Website gezielt auf diese Begriffe. So stellen wir sicher, dass Sie genau von den
              Menschen gefunden werden, die nach Ihren spezifischen Dienstleistungen oder Produkten
              suchen. Durch eine Kombination aus technischer Perfektion, ansprechendem Design und
              branchenspezifischem Know-how schaffen wir eine digitale Präsenz, die Ihr Unternehmen
              als Marktführer in Ihrer Region positioniert.
            </p>
            <p>
              Unsere langjährige Erfahrung in der Zusammenarbeit mit Unternehmen aus
              unterschiedlichsten Bereichen fließt in jedes unserer Projekte ein. Wir wissen, dass
              ein Handwerker eine andere Bildsprache und Tonalität benötigt als ein Finanzberater.
              Wir passen die Benutzerführung, die Farbwahl und die Typografie individuell an Ihre
              Markenidentität und die Erwartungen Ihrer Zielgruppe an. Darüber hinaus beraten wir
              Sie umfassend zu allen relevanten rechtlichen und sicherheitstechnischen Aspekten, die
              in Ihrer Branche von Bedeutung sind. Unser Ziel ist es, Ihnen nicht nur eine schöne
              Website zu liefern, sondern ein leistungsstarkes Marketinginstrument, das messbar zu
              Ihrem Geschäftserfolg beiträgt. Lassen Sie uns gemeinsam herausfinden, wie wir Ihre
              branchenspezifischen Herausforderungen meistern und Ihr Unternehmen digital auf die
              Überholspur bringen können.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Digital Expertise for {formattedIndustry}
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Every industry has its own specific requirements for a website. What works for a
              construction company may be completely unsuitable for a medical practice or a law
              firm. That is why we offer tailored, industry-specific web design that is precisely
              aligned with the needs and expectations of your target audience. We analyse the
              typical search behaviour of your customers, the prevailing standards in your sector,
              and the strategies of your most successful competitors to develop a website that does
              not just look outstanding but, above all, delivers results. Whether it involves
              integrating online appointment booking systems for doctors, project portfolios for
              architects, or enquiry forms for service providers — we know the digital tools that
              make the decisive difference in your industry. Our industry-specific IT solutions are
              designed to maximise your conversion rate and generate more qualified leads.
            </p>
            <p>
              A deep understanding of the characteristics unique to your industry enables us to
              align content and design perfectly. We develop bespoke content strategies that place
              your expertise and professional competence front and centre. Trust-building elements
              such as customer reviews, certifications, and quality seals are strategically
              positioned to convince potential customers of your quality. For search engine
              optimisation (SEO), we also take an industry-specific approach. We research the most
              relevant keywords for your field and optimise your website specifically for those
              terms. This ensures you are found by exactly the people searching for your specific
              services or products. Through a combination of technical perfection, compelling web
              design, and deep industry know-how, we create a digital presence that positions your
              business as a market leader in your region.
            </p>
            <p>
              Our extensive experience working with businesses across a wide range of sectors
              informs every one of our projects. We understand that a tradesman requires a different
              visual language and tone than a financial consultant. We adapt the user journey,
              colour palette, and typography individually to your brand identity and the
              expectations of your audience. In addition, we advise you comprehensively on all
              relevant legal and security aspects that matter in your industry. Our goal is not
              simply to deliver an attractive website but to provide a powerful marketing instrument
              that measurably contributes to your business success. Let us find out together how we
              can master the specific challenges of your industry and put your business on the
              digital fast track with professional web design and IT solutions from Coday in
              Wetzlar.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
