import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UiUxClient } from '@/features/services/ui/UiUxClient';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getServiceSchema, getBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'UI/UX Design Agency Wetzlar | User-Friendly',
      description:
        'Professional UI/UX design by Coday in Wetzlar. User-centered interfaces for higher conversions and satisfied customers in Central Hesse. Get in touch.',
      keywords: [
        'UI UX Design Wetzlar',
        'User Experience Agency Hesse',
        'Conversion UX Design',
        'Coday UI UX',
      ],
      path: '/en/services/design/ui-ux',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'UI/UX Design Agentur Wetzlar | Nutzerfreundlich',
    description:
      'Professionelles UI/UX Design von Coday in Wetzlar. Nutzerzentrierte Interfaces für höhere Konversion und zufriedene Kunden in Mittelhessen. Anfragen.',
    keywords: [
      'UI UX Design Agentur Wetzlar',
      'User Experience Design Hessen',
      'Conversion optimiertes UX',
      'Coday UI UX',
    ],
    path: '/de/services/design/ui-ux',
    type: 'money',
  });
}

export default async function UiUxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'UI/UX Design Agency Wetzlar | User-Friendly | Coday'
      : 'UI/UX Design Agentur Wetzlar | Nutzerfreundlich | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional UI/UX design by Coday in Wetzlar. User-centered interfaces for higher conversions and satisfied customers in Central Hesse. Get in touch.'
      : 'Professionelles UI/UX Design von Coday in Wetzlar. Nutzerzentrierte Interfaces für höhere Konversion und zufriedene Kunden in Mittelhessen. Anfragen.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Services', url: `/${_locale}/services` },
    { name: isEn ? 'UI/UX Design' : 'UI/UX Design', url: `/${_locale}/services/design/ui-ux` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Skipping Organization here: the root layout emits it on every page.
    '@graph': [
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/services/design/ui-ux`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-ui-ux"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <UiUxClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'UI/UX Design Agency Wetzlar – User-Friendly Digital Experiences'
            : 'UI/UX Design Agentur Wetzlar – Nutzerfreundliche Digitale Erlebnisse'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {_locale === 'en' ? (
            <>
              <p>
                In today&apos;s competitive digital landscape, user-friendly design is the decisive
                factor that determines whether visitors stay on your website or leave for a
                competitor. At Coday, your specialized UI/UX design agency in Wetzlar, we create
                digital experiences that seamlessly blend user psychology with outstanding visual
                aesthetics. Every click, animation and interaction is carefully planned and tailored
                to the needs of your target audience. A well-thought-out information architecture
                ensures that users find the content they need quickly and effortlessly. We reduce
                cognitive load and guide your visitors with clear calls-to-action toward their
                goal—whether that is a purchase, a contact inquiry or a newsletter signup. Our
                user-friendly interfaces are not just visually appealing; they are strategically
                engineered to maximize engagement, conversion rates and customer satisfaction across
                every device and screen size.
              </p>
              <p>
                The process of successful UI/UX design begins long before the first pixel is placed.
                In comprehensive research and discovery phases, we analyze the behavior, needs and
                pain points of your users through interviews, surveys, analytics reviews and
                competitive benchmarking. Based on these insights, we develop wireframes and
                interactive prototypes that we validate in moderated usability tests. This
                iterative, evidence-based process ensures that the final design not only looks
                exceptional but performs brilliantly in practice. We place particular emphasis on a
                mobile-first strategy. With the majority of web traffic now generated by mobile
                devices, flawless rendering and intuitive operation on smartphones and tablets is
                non-negotiable. Our responsive designs adapt seamlessly to every screen size—from
                compact mobile displays to ultra-wide desktop monitors—ensuring a consistently
                user-friendly experience that retains every potential customer.
              </p>
              <p>
                A strong UI/UX design is also a powerful driver of brand perception. A professional,
                modern and consistent interface builds trust in your business and positions you as
                an innovative market leader. At our agency in Wetzlar, we develop custom design
                systems and style guides that ensure your digital identity communicates uniformly
                across all touchpoints—from your website and web application to email templates and
                marketing landing pages. Typography, color palette, iconography and
                micro-interactions are precisely calibrated to reflect your brand values. We also
                conduct thorough accessibility audits to ensure your interfaces meet WCAG standards,
                opening your products to the widest possible audience. Inclusive, user-friendly
                design is not just an ethical imperative—it is a competitive advantage that expands
                your market reach and reinforces customer loyalty.
              </p>
              <p>
                Choosing the right UI/UX design agency is a strategic investment in the success of
                your digital products. At Coday in Wetzlar, we combine creative craftsmanship with
                data-driven decision-making to deliver interfaces that generate measurable business
                results. We do not design in isolation—we collaborate closely with your
                stakeholders, present findings transparently and iterate until every detail is
                refined. Whether you need a complete redesign of an existing platform, a
                user-friendly interface for a new SaaS product or a conversion-optimized e-commerce
                experience, our expertise covers the full spectrum from user research and
                interaction design to visual design and developer handoff. Invest in user-friendly
                UI/UX design that sustainably increases your conversion rates, customer satisfaction
                and ultimately your revenue. Contact Coday today for a complimentary consultation
                and let us create a digital platform that does not just satisfy your users but truly
                delights them.
              </p>
            </>
          ) : (
            <>
              <p>
                In der heutigen wettbewerbsintensiven digitalen Landschaft ist nutzerfreundliches
                Design der entscheidende Faktor, der darüber bestimmt, ob Besucher auf Ihrer Website
                bleiben oder zur Konkurrenz wechseln. Bei Coday, Ihrer spezialisierten UI/UX Design
                Agentur in Wetzlar, gestalten wir digitale Erlebnisse, die tiefgreifende
                Nutzerpsychologie mit herausragender visueller Ästhetik nahtlos verbinden. Jeder
                Klick, jede Animation und jede Interaktion wird sorgfältig geplant und auf die
                Bedürfnisse Ihrer Zielgruppe abgestimmt. Eine durchdachte Informationsarchitektur
                sorgt dafür, dass Nutzer die gewünschten Inhalte schnell und mühelos finden. Wir
                reduzieren die kognitive Belastung und führen Ihre Besucher mit klaren
                Handlungsaufforderungen (Calls-to-Action) zielsicher zum gewünschten Ziel – sei es
                ein Kauf, eine Kontaktanfrage oder eine Newsletter-Anmeldung. Unsere
                nutzerfreundlichen Interfaces sind nicht nur visuell ansprechend, sondern
                strategisch konzipiert, um Engagement, Konversionsraten und Kundenzufriedenheit auf
                jedem Gerät und jeder Bildschirmgröße zu maximieren.
              </p>
              <p>
                Der Prozess eines erfolgreichen UI/UX Designs beginnt weit vor dem ersten Pixel. In
                umfassenden Research- und Discovery-Phasen analysieren wir das Verhalten, die
                Bedürfnisse und die Schmerzpunkte Ihrer Nutzer durch Interviews, Umfragen,
                Analytics-Auswertungen und Wettbewerbs-Benchmarking. Auf Basis dieser Erkenntnisse
                entwickeln wir Wireframes und interaktive Prototypen, die wir in moderierten
                Usability-Tests validieren. Dieser iterative, evidenzbasierte Prozess stellt sicher,
                dass das finale Design nicht nur gut aussieht, sondern in der Praxis hervorragend
                funktioniert. Besonderes Augenmerk legen wir auf die Mobile-First-Strategie. Da der
                Großteil des Webtraffics heute über mobile Endgeräte generiert wird, ist eine
                einwandfreie Darstellung und intuitive Bedienbarkeit auf Smartphones und Tablets
                unverzichtbar. Unsere responsiven Designs passen sich nahtlos an jede
                Bildschirmgröße an – von kompakten mobilen Displays bis zu
                Ultra-Wide-Desktop-Monitoren – und gewährleisten ein durchgehend nutzerfreundliches
                Erlebnis, das jeden potenziellen Kunden hält.
              </p>
              <p>
                Ein starkes UI/UX Design ist zudem ein wesentlicher Treiber für Ihre
                Markenwahrnehmung. Ein professionelles, modernes und konsistentes Interface stärkt
                das Vertrauen in Ihr Unternehmen und positioniert Sie als innovativen Marktführer.
                In unserer Agentur in Wetzlar entwickeln wir maßgeschneiderte Design-Systeme und
                Styleguides, die sicherstellen, dass Ihre digitale Identität über alle Touchpoints
                hinweg einheitlich kommuniziert wird – von Ihrer Website und Webanwendung über
                E-Mail-Templates bis hin zu Marketing-Landingpages. Typografie, Farbpalette,
                Ikonografie und Mikrointeraktionen werden präzise auf Ihre Markenwerte kalibriert.
                Wir führen zudem gründliche Barrierefreiheits-Audits durch, um sicherzustellen, dass
                Ihre Interfaces den WCAG-Standards entsprechen und Ihre Produkte dem
                breitestmöglichen Publikum zugänglich sind. Inklusives, nutzerfreundliches Design
                ist nicht nur ein ethisches Gebot – es ist ein Wettbewerbsvorteil, der Ihre
                Marktreichweite erweitert und Kundenloyalität stärkt.
              </p>
              <p>
                Die Wahl der richtigen UI/UX Design Agentur ist eine strategische Investition in den
                Erfolg Ihrer digitalen Produkte. Bei Coday in Wetzlar verbinden wir kreatives
                Handwerk mit datengetriebener Entscheidungsfindung, um Interfaces zu liefern, die
                messbare Geschäftsergebnisse generieren. Wir gestalten nicht isoliert – wir arbeiten
                eng mit Ihren Stakeholdern zusammen, präsentieren Ergebnisse transparent und
                iterieren, bis jedes Detail verfeinert ist. Ob Sie ein komplettes Redesign einer
                bestehenden Plattform, ein nutzerfreundliches Interface für ein neues SaaS-Produkt
                oder ein konversionsoptimiertes E-Commerce-Erlebnis benötigen – unsere Expertise
                deckt das volle Spektrum von User Research und Interaction Design über Visual Design
                bis zum Developer-Handoff ab. Investieren Sie in nutzerfreundliches UI/UX Design,
                das nachhaltig Ihre Konversionsraten, die Kundenzufriedenheit und letztendlich Ihren
                Umsatz steigert. Kontaktieren Sie Coday noch heute für ein unverbindliches
                Beratungsgespräch und lassen Sie uns eine digitale Plattform schaffen, die Ihre
                Nutzer nicht nur zufriedenstellt, sondern regelrecht begeistert.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
