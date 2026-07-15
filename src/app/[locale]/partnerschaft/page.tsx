import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/company/ui/PartnerschaftClient';
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
      title: 'Partner Program for Agencies | Web Design Hesse',
      description:
        'Become a Coday partner in Hesse. Together we offer your clients premium web design from Wetzlar. Attractive commissions and fair conditions for agencies.',
      path: '/en/partnerschaft',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Partnerprogramm für Agenturen | Webdesign Hessen',
    description:
      'Werden Sie Coday Partner in Hessen. Gemeinsam bieten wir Ihren Kunden erstklassiges Webdesign aus Wetzlar. Attraktive Provisionen und faire Konditionen.',
    path: '/de/partnerschaft',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Partner Program for Agencies | Web Design Hesse | Coday'
      : 'Partnerprogramm für Agenturen | Webdesign Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Become a Coday partner in Hesse. Together we offer your clients premium web design from Wetzlar. Attractive commissions and fair conditions for agencies.'
      : 'Werden Sie Coday Partner in Hessen. Gemeinsam bieten wir Ihren Kunden erstklassiges Webdesign aus Wetzlar. Attraktive Provisionen und faire Konditionen.';
  return (
    <>
      <SeoHead
        title="Coday | partnerschaft"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      <SeoContentBlock />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {params.locale === 'en'
            ? 'Partner Program for Web Design Agencies'
            : 'Partnerprogramm für Webdesign-Agenturen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? 'The Coday Partner Program is designed for agencies, freelancers, and consultants across Hesse and beyond who want to offer their clients premium web design services without building an in-house development team. We understand that many marketing agencies, branding studios, and business consultants regularly encounter client requests for modern, high-performance websites but may lack the specialized technical capacity to deliver them. That is exactly where Coday steps in. As a web design agency based in Wetzlar, we have built our entire operation around delivering enterprise-grade websites using cutting-edge technologies like Next.js, React, and headless CMS platforms. Our partner program allows you to seamlessly extend your service portfolio by leveraging our development expertise under your own brand. Whether you are a creative agency in Frankfurt, a marketing consultancy in Gießen, or an IT service provider in Marburg, our partnership model is structured to complement your existing offerings and help you win larger, more technically demanding projects with confidence.'
              : 'Das Coday Partnerprogramm richtet sich an Agenturen, Freelancer und Berater in Hessen und darüber hinaus, die ihren Kunden erstklassige Webdesign-Dienstleistungen anbieten möchten, ohne ein eigenes Entwicklungsteam aufbauen zu müssen. Wir wissen, dass viele Marketingagenturen, Branding-Studios und Unternehmensberater regelmäßig mit Kundenanfragen nach modernen, leistungsstarken Websites konfrontiert werden, aber möglicherweise nicht über die spezialisierte technische Kapazität verfügen, diese umzusetzen. Genau hier kommt Coday ins Spiel. Als Webdesign-Agentur mit Sitz in Wetzlar haben wir unsere gesamte Arbeitsweise darauf ausgerichtet, professionelle Websites auf Enterprise-Niveau mit modernsten Technologien wie Next.js, React und Headless-CMS-Plattformen zu liefern. Unser Partnerprogramm ermöglicht es Ihnen, Ihr Leistungsportfolio nahtlos zu erweitern, indem Sie unsere Entwicklungskompetenz unter Ihrer eigenen Marke nutzen. Ob Sie eine Kreativagentur in Frankfurt, eine Marketingberatung in Gießen oder ein IT-Dienstleister in Marburg sind — unser Partnerschaftsmodell ist so strukturiert, dass es Ihre bestehenden Angebote ergänzt und Ihnen hilft, größere, technisch anspruchsvollere Projekte mit Zuversicht zu gewinnen.'}
          </p>
          <p>
            {params.locale === 'en'
              ? "Our white-label partnership model is built on discretion, quality, and mutual respect. When you partner with Coday, your clients interact exclusively with your brand throughout the entire project lifecycle. We operate entirely behind the scenes, functioning as your invisible development department. From the initial technical consultation through wireframing, design implementation, development, quality assurance, and deployment — every deliverable is presented under your agency's name and identity. We never contact your clients directly, we never place our branding on delivered projects, and we never market to your customer base. This level of professional discretion is fundamental to how we structure our agency partnerships in Hesse. We provide you with detailed project briefs, progress updates, and staging environments so you always have full visibility into the development process and can confidently communicate timelines and milestones to your clients. Our development workflow integrates smoothly with common project management tools, making collaboration between your team and ours efficient and transparent. Every website we deliver through the partner program meets the same rigorous quality standards as our direct client work: Lighthouse scores above 90, fully responsive design, SEO-optimized architecture, and clean, documented source code."
              : 'Unser White-Label-Partnerschaftsmodell basiert auf Diskretion, Qualität und gegenseitigem Respekt. Wenn Sie mit Coday zusammenarbeiten, interagieren Ihre Kunden während des gesamten Projektlebenszyklus ausschließlich mit Ihrer Marke. Wir agieren vollständig im Hintergrund und fungieren als Ihre unsichtbare Entwicklungsabteilung. Von der ersten technischen Beratung über Wireframing, Designumsetzung, Entwicklung, Qualitätssicherung bis hin zum Deployment — jedes Ergebnis wird unter dem Namen und der Identität Ihrer Agentur präsentiert. Wir kontaktieren Ihre Kunden niemals direkt, wir platzieren unser Branding nicht auf gelieferten Projekten und wir werben nicht bei Ihrem Kundenstamm. Dieses Maß an professioneller Diskretion ist grundlegend für die Art und Weise, wie wir unsere Agenturpartnerschaften in Hessen strukturieren. Wir stellen Ihnen detaillierte Projektbriefings, Fortschrittsberichte und Staging-Umgebungen zur Verfügung, damit Sie jederzeit volle Transparenz über den Entwicklungsprozess haben und Ihren Kunden Zeitpläne und Meilensteine souverän kommunizieren können. Unser Entwicklungsworkflow lässt sich nahtlos in gängige Projektmanagement-Tools integrieren, was die Zusammenarbeit zwischen Ihrem Team und unserem effizient und transparent gestaltet. Jede Website, die wir über das Partnerprogramm ausliefern, erfüllt dieselben strengen Qualitätsstandards wie unsere direkte Kundenarbeit: Lighthouse-Scores über 90, vollständig responsives Design, SEO-optimierte Architektur und sauberer, dokumentierter Quellcode.'}
          </p>
          <p>
            {params.locale === 'en'
              ? 'Our commission and pricing structure is designed to be straightforward, fair, and genuinely profitable for partner agencies. We offer competitive wholesale rates on all web design and development services, giving you ample room to apply your own markup and generate healthy margins on every project you refer or manage through our partnership. Commission rates are tiered based on the scope and volume of collaboration, rewarding long-term partners with increasingly favorable terms. For agencies that consistently bring projects to Coday, we offer priority scheduling, dedicated points of contact, and preferential pricing on larger engagements. There are no upfront fees, no monthly subscriptions, and no minimum commitment requirements to join the partner program. You only pay for the projects you commission, and payment terms are structured to align with your own client billing cycles wherever possible. We also provide detailed, itemized cost breakdowns for every project so you can make informed pricing decisions and present transparent quotes to your clients. This approach has proven particularly attractive to marketing agencies in Hesse who want to expand their revenue streams without taking on the overhead of hiring full-time developers. By partnering with Coday in Wetzlar, you gain access to senior-level web development talent at a fraction of the cost of building that capability internally.'
              : 'Unsere Provisions- und Preisstruktur ist so gestaltet, dass sie für Partneragenturen unkompliziert, fair und wirklich profitabel ist. Wir bieten wettbewerbsfähige Großhandelspreise für alle Webdesign- und Entwicklungsdienstleistungen, was Ihnen ausreichend Spielraum gibt, Ihren eigenen Aufschlag anzuwenden und bei jedem Projekt, das Sie vermitteln oder über unsere Partnerschaft betreuen, gesunde Margen zu erzielen. Die Provisionssätze sind nach Umfang und Volumen der Zusammenarbeit gestaffelt und belohnen langfristige Partner mit zunehmend vorteilhaften Konditionen. Für Agenturen, die kontinuierlich Projekte an Coday herantragen, bieten wir bevorzugte Terminplanung, feste Ansprechpartner und Vorzugspreise bei größeren Aufträgen. Es gibt keine Vorabgebühren, keine monatlichen Abonnements und keine Mindestverpflichtungen, um dem Partnerprogramm beizutreten. Sie zahlen nur für die Projekte, die Sie beauftragen, und die Zahlungsbedingungen sind so strukturiert, dass sie sich möglichst an Ihre eigenen Kundenabrechnungszyklen anpassen. Wir stellen außerdem detaillierte, aufgeschlüsselte Kostenaufstellungen für jedes Projekt bereit, damit Sie fundierte Preisentscheidungen treffen und Ihren Kunden transparente Angebote vorlegen können. Dieser Ansatz hat sich als besonders attraktiv für Marketingagenturen in Hessen erwiesen, die ihre Einnahmequellen erweitern möchten, ohne die Fixkosten für die Einstellung von Vollzeit-Entwicklern zu tragen. Durch die Partnerschaft mit Coday in Wetzlar erhalten Sie Zugang zu erfahrenem Webentwicklungs-Know-how zu einem Bruchteil der Kosten, die der interne Aufbau dieser Kompetenz erfordern würde.'}
          </p>
          <p>
            {params.locale === 'en'
              ? "Joining the Coday Partner Program is a straightforward process designed to get you up and running quickly. It begins with an introductory call where we discuss your agency's focus areas, typical client profiles, and the types of web design projects you handle most frequently. This helps us understand how our capabilities can best complement your services and identify the most effective collaboration workflow. After the initial consultation, we provide you with a comprehensive partner kit that includes our service catalog, pricing guidelines, technical capability overview, and branded templates you can use when presenting web development options to your clients. We also offer joint project planning sessions for your first few engagements, where we work side by side with your team to scope, estimate, and structure projects for maximum client satisfaction. Our goal with the partner program is not simply to process referrals — it is to build a genuine, long-term strategic alliance that helps both parties grow. Many of our most successful partner agencies in Hesse started with a single trial project and have since grown their web design revenue significantly through ongoing collaboration with Coday. We invite agencies across the region, whether based in Wetzlar, Frankfurt, Kassel, Darmstadt, or anywhere in Hesse, to explore what a partnership with a dedicated, quality-focused web design agency can mean for their business growth and client retention."
              : 'Der Beitritt zum Coday Partnerprogramm ist ein unkomplizierter Prozess, der darauf ausgelegt ist, Sie schnell startklar zu machen. Er beginnt mit einem Einführungsgespräch, in dem wir die Schwerpunkte Ihrer Agentur, typische Kundenprofile und die Arten von Webdesign-Projekten besprechen, die Sie am häufigsten betreuen. Das hilft uns zu verstehen, wie unsere Fähigkeiten Ihre Dienstleistungen am besten ergänzen können, und den effektivsten Zusammenarbeitsworkflow zu identifizieren. Nach der Erstberatung stellen wir Ihnen ein umfassendes Partner-Kit zur Verfügung, das unseren Leistungskatalog, Preisrichtlinien, eine technische Kompetenzübersicht und gebrandete Vorlagen enthält, die Sie bei der Präsentation von Webentwicklungsoptionen vor Ihren Kunden verwenden können. Wir bieten auch gemeinsame Projektplanungssitzungen für Ihre ersten Aufträge an, bei denen wir Seite an Seite mit Ihrem Team arbeiten, um Projekte zu definieren, zu kalkulieren und für maximale Kundenzufriedenheit zu strukturieren. Unser Ziel mit dem Partnerprogramm ist nicht bloß die Bearbeitung von Empfehlungen — es ist der Aufbau einer echten, langfristigen strategischen Allianz, die beiden Seiten beim Wachstum hilft. Viele unserer erfolgreichsten Partneragenturen in Hessen haben mit einem einzigen Testprojekt begonnen und ihren Webdesign-Umsatz seitdem durch die fortlaufende Zusammenarbeit mit Coday erheblich gesteigert. Wir laden Agenturen aus der gesamten Region ein — ob mit Sitz in Wetzlar, Frankfurt, Kassel, Darmstadt oder irgendwo in Hessen — zu erkunden, was eine Partnerschaft mit einer engagierten, qualitätsorientierten Webdesign-Agentur für ihr Geschäftswachstum und ihre Kundenbindung bedeuten kann.'}
          </p>
        </div>
      </section>
    </>
  );
}
