export const dynamic = 'force-static';
export const dynamicParams = false;

import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { ServicesOverview } from '@/features/services/ui/ServicesOverview';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return generatePageMetadata({
    title: t('meta.title', { fallback: 'Webdesign & SEO Leistungen | Agentur in Wetzlar' }),
    description: t('meta.description', {
      fallback:
        'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.',
    }),
    path: `/${locale}/services`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });

  const _seoTitle = t('meta.title', {
    fallback: 'Webdesign & SEO Leistungen | Agentur in Wetzlar | Coday',
  });
  const _seoDesc = t('meta.description', {
    fallback:
      'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.',
  });
  const isEn = params.locale === 'en';
  return (
    <>
      <SeoHead title={_seoTitle} description={_seoDesc} pageType="default" />
      <ServicesOverview />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {isEn ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Web Design &amp; SEO Services – Your Agency in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Coday is a specialist web design and SEO agency based in Wetzlar, Hesse, offering a
                complete range of digital services to businesses across Central Germany and beyond.
                Our core mission is to combine visually compelling web design with technically sound
                search engine optimisation so that every project we deliver not only looks
                outstanding but also performs measurably in organic search results. Whether you need
                a corporate website, a high-converting landing page, or a full e-commerce solution,
                our services are designed to cover every stage of the digital journey – from the
                initial concept and user experience design through to development, launch, and
                ongoing optimisation. As a Wetzlar-based agency, we understand the local business
                landscape in Hesse and bring that regional insight into every strategy we create.
              </p>
              <p>
                Our web design services focus on creating responsive, brand-aligned websites that
                reflect your company's identity and engage your target audience from the first
                interaction. We use modern technologies like Next.js, React, and Tailwind CSS to
                build fast, accessible interfaces that work flawlessly on every device. Every layout
                is crafted with conversion in mind: clear calls to action, intuitive navigation, and
                performance-optimised assets ensure that visitors stay longer and take meaningful
                steps toward becoming customers. We believe that great design is not decoration – it
                is a strategic tool that communicates trust, professionalism, and value within
                seconds.
              </p>
              <p>
                On the SEO side, Coday provides comprehensive services that range from technical
                audits and on-page optimisation to keyword research, content strategy, and local SEO
                for the Wetzlar and Hesse region. We analyse your current search visibility,
                identify opportunities to outperform competitors, and implement data-driven
                improvements that deliver lasting results. Our approach is transparent: every
                optimisation is documented, every ranking change is tracked, and every
                recommendation is backed by real performance data. We focus on sustainable,
                white-hat techniques that align with Google's guidelines, ensuring your site builds
                authority over time rather than relying on short-lived tricks.
              </p>
              <p>
                By combining web design excellence with deep SEO expertise under one roof, Coday
                eliminates the gap that often exists between design agencies and marketing
                consultants. You receive a unified strategy where design decisions are informed by
                search data, and technical SEO is baked into every template from day one. This
                holistic approach saves time, reduces costs, and produces websites that are
                genuinely built to attract, convert, and retain customers. Contact Coday in Wetzlar
                to discuss your next web project and discover how our services can elevate your
                digital presence across Hesse and throughout Germany.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webdesign &amp; SEO Leistungen – Ihre Agentur in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Coday ist eine auf Webdesign und SEO spezialisierte Agentur mit Sitz in Wetzlar,
                Hessen, die ein umfassendes Spektrum digitaler Leistungen für Unternehmen in
                Mittelhessen und darüber hinaus anbietet. Unsere Kernmission besteht darin, visuell
                überzeugendes Webdesign mit technisch fundierter Suchmaschinenoptimierung zu
                verbinden, damit jedes Projekt nicht nur hervorragend aussieht, sondern auch messbar
                in den organischen Suchergebnissen performt. Ob Sie eine Firmenwebseite, eine
                hochkonvertierende Landingpage oder eine vollständige E-Commerce-Lösung benötigen –
                unsere Leistungen decken jede Phase des digitalen Weges ab: von der ersten
                Konzeption und UX-Gestaltung über die Entwicklung und den Launch bis hin zur
                laufenden Optimierung. Als Agentur in Wetzlar verstehen wir die lokale
                Unternehmenslandschaft in Hessen und bringen diese regionale Expertise in jede
                Strategie ein.
              </p>
              <p>
                Unsere Webdesign-Leistungen konzentrieren sich auf die Erstellung responsiver,
                markenkonformer Websites, die die Identität Ihres Unternehmens widerspiegeln und
                Ihre Zielgruppe ab der ersten Interaktion ansprechen. Wir setzen auf moderne
                Technologien wie Next.js, React und Tailwind CSS, um schnelle, barrierefreie
                Benutzeroberflächen zu entwickeln, die auf jedem Gerät einwandfrei funktionieren.
                Jedes Layout wird mit Blick auf Konversion gestaltet: klare Handlungsaufforderungen,
                intuitive Navigation und performance-optimierte Assets sorgen dafür, dass Besucher
                länger bleiben und den entscheidenden Schritt zum Kunden machen. Wir sind überzeugt,
                dass gutes Design kein Schmuck ist, sondern ein strategisches Werkzeug, das
                Vertrauen, Professionalität und Mehrwert in Sekunden kommuniziert.
              </p>
              <p>
                Im Bereich SEO bietet Coday umfassende Leistungen, die von technischen Audits und
                Onpage-Optimierung über Keyword-Recherche und Content-Strategie bis hin zu lokaler
                Suchmaschinenoptimierung für die Region Wetzlar und Hessen reichen. Wir analysieren
                Ihre aktuelle Sichtbarkeit in Suchmaschinen, identifizieren Chancen, die Konkurrenz
                zu übertreffen, und implementieren datengetriebene Verbesserungen mit nachhaltiger
                Wirkung. Unser Ansatz ist transparent: Jede Optimierung wird dokumentiert, jede
                Ranking-Veränderung verfolgt und jede Empfehlung durch echte Performance-Daten
                gestützt. Wir setzen auf nachhaltige, richtlinienkonforme Techniken, die
                sicherstellen, dass Ihre Website langfristig Autorität aufbaut.
              </p>
              <p>
                Indem Coday exzellentes Webdesign und tiefgreifende SEO-Expertise unter einem Dach
                vereint, schließen wir die Lücke, die häufig zwischen Designagenturen und
                Marketing-Beratern besteht. Sie erhalten eine einheitliche Strategie, bei der
                Designentscheidungen von Suchdaten geleitet werden und technisches SEO von Anfang an
                in jedes Template integriert ist. Dieser ganzheitliche Ansatz spart Zeit, reduziert
                Kosten und liefert Websites, die tatsächlich darauf ausgelegt sind, Kunden zu
                gewinnen, zu konvertieren und zu halten. Kontaktieren Sie Coday in Wetzlar, um Ihr
                nächstes Webprojekt zu besprechen und zu erfahren, wie unsere Leistungen Ihre
                digitale Präsenz in Hessen und ganz Deutschland stärken können.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
