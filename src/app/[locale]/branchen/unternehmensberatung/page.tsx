import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
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

  return (
    <>
      <script
        id="schema-branchen-unternehmensberatung"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  locale === 'en'
                    ? 'Web Design for Management Consulting'
                    : 'Webdesign für Unternehmensberatung',
                description:
                  locale === 'en'
                    ? 'Custom web design solutions for management consultants by Coday in Wetzlar.'
                    : 'Maßgeschneiderte Webdesign-Lösungen für Unternehmensberatungen von Coday in Wetzlar.',
                url: `${BASE_URL}/${locale}/branchen/unternehmensberatung`,
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
            Digitale Expertise für Unternehmensberatungen
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Jede Branche hat ihre eigenen, spezifischen Anforderungen an eine Website. Was für
              einen Handwerksbetrieb funktioniert, ist für eine Unternehmensberatung möglicherweise
              völlig ungeeignet. Aus diesem Grund bieten wir maßgeschneidertes, branchenspezifisches
              Webdesign, das genau auf die Bedürfnisse und Erwartungen Ihrer jeweiligen Zielgruppe
              zugeschnitten ist. Wir analysieren das typische Suchverhalten Ihrer Kunden, die
              branchenüblichen Standards und die Strategien Ihrer erfolgreichsten Mitbewerber, um
              eine Website zu entwickeln, die nicht nur optisch herausragt, sondern vor allem
              funktionell überzeugt. Ob es um die Integration von Whitepaper-Funnels, Case Studies
              oder Anfrageformulare für Dienstleister geht – wir kennen die digitalen Werkzeuge, die
              in Ihrer Branche den entscheidenden Unterschied machen. Unsere branchenspezifischen
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
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h3 className="text-3xl font-display font-bold mb-6">
            Digital Expertise for Management Consultants
          </h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Every industry has its own specific requirements for a website. What works for a
              construction company may be completely unsuitable for a management consulting firm.
              That is why we offer tailored, industry-specific web design that is precisely aligned
              with the needs and expectations of your target audience. We analyse the typical search
              behaviour of your customers, the prevailing standards in your sector, and the
              strategies of your most successful competitors to develop a website that does not just
              look outstanding but, above all, delivers results. Whether it involves integrating
              whitepaper funnels, case studies, or enquiry forms for service providers — we know the
              digital tools that make the decisive difference in your industry. Our
              industry-specific IT solutions are designed to maximise your conversion rate and
              generate more qualified leads.
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
          </div>
        </section>
      )}
    </>
  );
}
