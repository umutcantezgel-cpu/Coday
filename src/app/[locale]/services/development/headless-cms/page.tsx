import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { HeadlessCmsClient } from '@/features/services/ui/HeadlessCmsClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Headless CMS Development Wetzlar | Flexible',
      description:
        'Modern headless CMS solutions by Coday in Wetzlar. Flexible content management with Sanity, Strapi or Contentful for your business in Hesse region.',
      path: '/en/services/development/headless-cms',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Headless CMS Entwicklung Wetzlar | Flexibel',
    description:
      'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.',
    path: '/de/services/development/headless-cms',
    type: 'money',
  });
}

export default async function HeadlessCmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Headless CMS Development Wetzlar | Flexible | Coday'
      : 'Headless CMS Entwicklung Wetzlar | Flexibel | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Modern headless CMS solutions by Coday in Wetzlar. Flexible content management with Sanity, Strapi or Contentful for your business in Hesse region.'
      : 'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.';
  const isEn = _locale === 'en';
  return (
    <>
      <script
        id="schema-headless-cms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/development/headless-cms`,
              }),
            ],
          }),
        }}
      />
      <HeadlessCmsClient />
      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {isEn
            ? 'Professional Headless CMS Development in Wetzlar'
            : 'Professionelle Headless CMS Entwicklung in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {isEn ? (
            <>
              <p>
                Businesses today need flexible content management that scales across channels and
                devices without locking them into rigid templates. Coday, a specialist web
                development agency in Wetzlar, Hesse, delivers professional headless CMS development
                that gives your organisation exactly this freedom. Our development process decouples
                the content backend from the presentation frontend, enabling your editorial teams to
                manage content in one central hub while developers build fast, modern frontends with
                React, Next.js, and TailwindCSS. This flexible architecture means your content
                reaches websites, mobile apps, digital signage, and any future platform through
                clean, well-structured APIs — all maintained and developed by a single focused
                agency right here in Wetzlar.
              </p>
              <p>
                Our headless CMS development expertise spans leading platforms including Sanity,
                Strapi, Contentful, and Prismic. We carefully assess your business requirements and
                recommend the system that aligns best with your editorial workflows and technical
                goals. The development of a headless architecture brings substantial advantages in
                performance, security, and scalability. Because the frontend operates independently,
                we leverage cutting-edge technologies to achieve exceptional Core Web Vitals scores
                and lightning-fast page loads. Every headless CMS project we develop in Wetzlar is
                architected for long-term maintainability, ensuring your investment remains flexible
                and future-proof as your digital needs evolve throughout Hesse and beyond.
              </p>
              <p>
                For editors and content managers, a headless CMS developed by Coday means an
                entirely new working experience. Structured data models and custom editor interfaces
                make content management intuitive, efficient, and error-resistant. Instead of
                wrestling with inflexible page builders, your team focuses entirely on creating
                high-quality content. Our development team in Wetzlar handles the complete technical
                implementation: schema design, API development using GraphQL or REST, frontend
                integration, and seamless connection to your existing IT infrastructure. We ensure
                that every system we build is robust, thoroughly tested, and perfectly aligned with
                your growth objectives and content strategy.
              </p>
              <p>
                Invest in a flexible content architecture that grows with your business. Whether you
                are planning a complex corporate blog, a multilingual enterprise portal, or a
                content-rich e-commerce experience, professional headless CMS development positions
                you for every future digital challenge. Let Coday elevate your digital presence in
                Wetzlar and across Hesse to the next level. Contact us today for a comprehensive
                consultation and live demonstration. We will show you precisely how modern headless
                CMS development can revolutionise your editorial workflows, accelerate your
                time-to-market, and sustainably improve your digital visibility across all channels
                and touchpoints.
              </p>
            </>
          ) : (
            <>
              <p>
                In einer zunehmend vernetzten und omnichannel-orientierten digitalen Welt stoßen
                traditionelle Content-Management-Systeme oft an ihre Grenzen. Hier kommt die
                Headless CMS Entwicklung Wetzlar ins Spiel. Flexibel, modern und zukunftssicher:
                Coday, Ihre Premium-Agentur für Webentwicklung in Hessen, ist spezialisiert auf die
                Implementierung leistungsstarker Headless-Architekturen. Ein Headless CMS entkoppelt
                das Backend (die Inhaltserstellung und -verwaltung) vollständig vom Frontend (der
                Präsentationsschicht). Diese Trennung bietet Unternehmen eine beispiellose
                Flexibilität: Inhalte können an einem zentralen Ort gepflegt und nahtlos über APIs
                auf unterschiedlichste Plattformen ausgespielt werden – sei es eine moderne
                Next.js-Website, eine native Smartphone-App, Smartwatches oder sogar IoT-Geräte.
              </p>
              <p>
                Unsere Expertise umfasst führende Headless-Plattformen wie Sanity, Strapi,
                Contentful und Prismic. Wir analysieren die spezifischen Anforderungen Ihres
                Unternehmens in Wetzlar präzise und empfehlen das System, das am besten zu Ihren
                redaktionellen Workflows und technischen Zielen passt. Der Wechsel zu einem Headless
                CMS bringt enorme Vorteile in Bezug auf Performance, Sicherheit und Skalierbarkeit
                mit sich. Da das Frontend unabhängig operiert, können wir modernste Technologien wie
                React 19 und TailwindCSS nutzen, um blitzschnelle Ladezeiten zu realisieren. Dies
                verbessert nicht nur die User Experience (UX) drastisch, sondern wirkt sich auch
                äußerst positiv auf Ihre SEO-Rankings und Core Web Vitals aus.
              </p>
              <p>
                Für Redakteure und Content-Manager bedeutet ein Headless CMS wie Sanity ein völlig
                neues Arbeitsgefühl. Durch strukturierte Datenmodelle und maßgeschneiderte
                Editor-Interfaces wird die Inhaltspflege intuitiv, effizient und fehlerresistent.
                Sie verschwenden keine Zeit mehr mit starren Page-Buildern, sondern konzentrieren
                sich voll und ganz auf die Erstellung hochwertiger Inhalte. Coday Wetzlar übernimmt
                dabei die komplette technische Konzeption, die Programmierung der Schnittstellen
                (GraphQL oder REST) und die nahtlose Integration in Ihre bestehende
                IT-Infrastruktur. Wir sorgen dafür, dass Ihr neues System robust, zukunftssicher und
                perfekt auf Ihre Wachstumsziele abgestimmt ist.
              </p>
              <p>
                Investieren Sie in eine Architektur, die mit Ihrem Unternehmen wächst. Egal, ob Sie
                einen komplexen Corporate Blog, eine umfangreiche E-Commerce-Plattform oder ein
                mehrsprachiges Unternehmensportal planen – mit einer professionellen Headless CMS
                Entwicklung sind Sie für alle zukünftigen digitalen Herausforderungen bestens
                gerüstet. Lassen Sie uns gemeinsam die digitale Präsenz Ihres Unternehmens in
                Wetzlar und ganz Hessen auf das nächste Level heben. Kontaktieren Sie das Team von
                Coday noch heute für eine ausführliche Beratung. Wir zeigen Ihnen gerne in einer
                Live-Demo, wie ein modernes Headless CMS Ihre Arbeitsprozesse revolutionieren und
                Ihre digitale Sichtbarkeit nachhaltig steigern kann.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
