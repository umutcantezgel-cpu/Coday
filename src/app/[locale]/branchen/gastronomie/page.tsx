import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GastronomieClient from '@/features/industries/ui/GastronomieClient';
import { setRequestLocale } from 'next-intl/server';
import {
  getServiceSchema,
  getAudienceSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
  BASE_URL,
} from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Restaurants & Gastronomy | Hesse',
      description:
        'Digital solutions for restaurants, cafes, and gastronomy in Hesse. Attract new guests with modern web design and improved online presence.',
      path: '/en/branchen/gastronomie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Restaurants & Gastronomie | Hessen',
    description:
      'Digitale Lösungen für Restaurants, Cafés und die Gastronomie in Hessen. Gewinnen Sie neue Gäste mit modernem Webdesign und besserer Online-Präsenz.',
    path: '/de/branchen/gastronomie',
    type: 'money',
  });
}

export default async function GastronomiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const pageUrl = `${BASE_URL}/${_locale}/branchen/gastronomie`;
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Restaurants & Gastronomy | Hesse | Coday'
      : 'Webdesign für Restaurants & Gastronomie | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Appetizing websites for restaurants and gastronomy in Wetzlar and Hesse. More guests through professional web design and strong local visibility.'
      : 'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.';
  return (
    <>
      <script
        id="schema-branchen-gastronomie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // The Organization entry is provided globally by the root layout.
            '@graph': [
              getBreadcrumbSchema(
                [
                  { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                  {
                    name: _locale === 'en' ? 'Industries' : 'Branchen',
                    url: `/${_locale}/branchen`,
                  },
                  {
                    name: _locale === 'en' ? 'Restaurants & Gastronomy' : 'Gastronomie',
                    url: `/${_locale}/branchen/gastronomie`,
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
              getAudienceSchema({
                url: pageUrl,
                audienceType:
                  _locale === 'en' ? 'Restaurants and Gastronomy' : 'Restaurants und Gastronomie',
                name:
                  _locale === 'en' ? 'Restaurants and Gastronomy' : 'Restaurants und Gastronomie',
              }),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: pageUrl,
                audienceId: `${pageUrl}#audience`,
              }),
            ],
          }),
        }}
      />
      <GastronomieClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Professional Web Design for Restaurants and Gastronomy'
            : 'Professionelles Webdesign für Restaurants und Gastronomie'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? "In the highly competitive gastronomy sector, a visually stunning and highly functional website is essential to attract and retain guests. Potential customers often decide where to eat based on the quality of a restaurant's online presence. A professional website serves as your digital menu, offering a tantalizing preview of your culinary creations and the unique atmosphere of your establishment. We specialize in creating custom web design solutions specifically tailored for restaurants, cafes, bars, and catering services. Our focus is on mouth-watering aesthetics combined with seamless user experiences, ensuring that visitors can easily find your menu, opening hours, and location. We integrate advanced reservation systems directly into your site, allowing guests to book tables effortlessly from their smartphones or computers, which significantly reduces the administrative burden on your staff. Furthermore, local search engine optimization (SEO) is a critical component of our strategy. When hungry diners search for \"best restaurant near me\" or specific cuisines in your area, your business needs to appear at the top of the search results. We optimize your website's structure, content, and metadata to maximize visibility on Google and local directories. High-quality imagery, fast page load times, and mobile responsiveness are non-negotiable features in today's mobile-first world. We ensure that your website looks incredible and functions perfectly on all screen sizes, providing a smooth journey from the first click to the final booking. A strong digital presence builds trust and credibility, turning casual online browsers into loyal, returning guests. Let us help you elevate your gastronomic brand with a website that reflects the passion and excellence of your culinary offerings. Investing in a premium web design is an investment in the future growth and sustainability of your restaurant business. We understand that running a restaurant is incredibly demanding, and your website should work tirelessly to support your goals rather than being another source of stress. Modern features like integrated online ordering platforms and dynamic seasonal menus keep your audience engaged and hungry for more. We also offer comprehensive analytics integration, so you can clearly see how many visitors are converting into real-life diners. Partner with us to create a mouth-watering online identity that outshines the local competition."
              : 'Im hart umkämpften Gastronomiesektor ist eine optisch beeindruckende und hochfunktionale Website unerlässlich, um Gäste anzuziehen und zu binden. Potenzielle Kunden entscheiden oft aufgrund der Qualität der Online-Präsenz eines Restaurants, wo sie essen möchten. Eine professionelle Website dient als Ihre digitale Speisekarte und bietet eine verlockende Vorschau auf Ihre kulinarischen Kreationen und die einzigartige Atmosphäre Ihres Hauses. Wir sind darauf spezialisiert, maßgeschneiderte Webdesign-Lösungen speziell für Restaurants, Cafés, Bars und Catering-Dienste zu entwickeln. Unser Fokus liegt auf einer ansprechenden Ästhetik in Kombination mit nahtlosen Benutzererlebnissen, um sicherzustellen, dass Besucher Ihre Speisekarte, Öffnungszeiten und Ihren Standort leicht finden können. Wir integrieren fortschrittliche Reservierungssysteme direkt in Ihre Website, sodass Gäste mühelos von ihren Smartphones oder Computern aus Tische buchen können, was den administrativen Aufwand für Ihr Personal erheblich reduziert. Darüber hinaus ist die lokale Suchmaschinenoptimierung (SEO) ein entscheidender Bestandteil unserer Strategie. Wenn hungrige Gäste in Ihrer Nähe nach "bestes Restaurant in meiner Nähe" oder bestimmten Küchen suchen, muss Ihr Unternehmen ganz oben in den Suchergebnissen erscheinen. Wir optimieren die Struktur, den Inhalt und die Metadaten Ihrer Website, um die Sichtbarkeit bei Google und in lokalen Verzeichnissen zu maximieren. Hochwertige Bilder, schnelle Seitenladezeiten und mobile Responsivität sind in der heutigen Mobile-First-Welt unverzichtbare Merkmale. Wir stellen sicher, dass Ihre Website fantastisch aussieht und auf allen Bildschirmgrößen perfekt funktioniert, und bieten eine reibungslose Reise vom ersten Klick bis zur finalen Buchung. Eine starke digitale Präsenz schafft Vertrauen und Glaubwürdigkeit und verwandelt beiläufige Online-Besucher in treue, wiederkehrende Gäste. Lassen Sie uns Ihnen helfen, Ihre gastronomische Marke mit einer Website aufzuwerten, die die Leidenschaft und Exzellenz Ihres kulinarischen Angebots widerspiegelt. Die Investition in ein Premium-Webdesign ist eine Investition in das zukünftige Wachstum und die Nachhaltigkeit Ihres Gastronomiebetriebs. Wir verstehen, dass die Führung eines Restaurants unglaublich anspruchsvoll ist, und Ihre Website sollte unermüdlich arbeiten, um Ihre Ziele zu unterstützen, anstatt eine weitere Stressquelle zu sein. Moderne Funktionen wie integrierte Online-Bestellplattformen und dynamische saisonale Menüs halten Ihr Publikum engagiert und hungrig auf mehr. Wir bieten auch eine umfassende Analytics-Integration, damit Sie klar sehen können, wie viele Besucher zu echten Gästen werden. Arbeiten Sie mit uns zusammen, um eine verlockende Online-Identität zu schaffen, die die lokale Konkurrenz in den Schatten stellt.'}
          </p>
        </div>
      </section>
    </>
  );
}
