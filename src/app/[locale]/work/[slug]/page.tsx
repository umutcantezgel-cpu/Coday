import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';
import { workData } from '@/shared/data/work';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const project = workData[slug];

  if (!project) {
    return generatePageMetadata({
      title: 'Coday Web-Agentur',
      description: 'Premium Webentwicklung & Design',
      path: `/${locale}/work/${slug}`,
      type: 'default',
    });
  }

  const content = locale === 'en' ? project.content.en : project.content.de;
  const description =
    `${content.title}: ${content.subtitle}. ${content.challenge?.description || ''}`.trim();

  const keywords = [
    content.title,
    `${content.title} Case Study`,
    `${content.category} Webdesign`,
    'Webdesign Referenz Wetzlar',
    'Coday Web Projekt',
  ];

  return generatePageMetadata({
    title: `${content.title} – Case Study | Coday`,
    description: description.length > 140 ? description.substring(0, 137) + '...' : description,
    keywords,
    path: `/${locale}/work/${slug}`,
    type: 'default',
  });
}

export function generateStaticParams() {
  return Object.keys(workData).map((slug) => ({ slug }));
}

export default async function Page(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  // Validate that the slug exists in workData
  if (!workData[params.slug]) {
    notFound();
  }

  const project = workData[params.slug];
  const content = isEn ? project.content.en : project.content.de;

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Portfolio' : 'Referenzen', url: `/${_locale}/work` },
    { name: content.title, url: `/${_locale}/work/${params.slug}` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CreativeWork',
        '@id': `${BASE_URL}/${_locale}/work/${params.slug}#case-study`,
        name: content.title,
        headline: content.subtitle,
        url: `${BASE_URL}/${_locale}/work/${params.slug}`,
        description: content.challenge.description,
        creator: {
          '@id': `${BASE_URL}/#organization`,
        },
        about: {
          '@type': 'Service',
          name: content.category,
        },
      },
    ],
  };

  return (
    <>
      <script
        id="schema-case-study"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO — dynamic, bilingual, project-specific content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6">
          {params.locale === 'en'
            ? `Web Design Success Story: ${content.title}`
            : `Erfolgreiche Webprojekte: ${content.title}`}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? `${content.title} — ${content.subtitle}. This case study explores how Coday, a solo web design agency in Wetzlar, Central Hesse, partnered with ${content.title} to deliver a tailored ${content.category} solution. The challenge was clear: ${content.challenge.description} Our approach combined strategic thinking, premium visual design, and technically rigorous implementation to create a digital presence that drives real business results.`
              : `${content.title} — ${content.subtitle}. Diese Case Study zeigt, wie Coday, eine Solo-Webagentur in Wetzlar, Mittelhessen, mit ${content.title} zusammengearbeitet hat, um eine maßgeschneiderte ${content.category}-Lösung zu entwickeln. Die Herausforderung war klar: ${content.challenge.description} Unser Ansatz verband strategisches Denken, visuell hochwertiges Design und technisch anspruchsvolle Umsetzung, um eine digitale Präsenz zu schaffen, die echte Geschäftsergebnisse liefert.`}
          </p>
          <p>
            {params.locale === 'en'
              ? `Every project at Coday begins with deep discovery. For ${content.title}, we invested significant time understanding the business landscape, target audience, and competitive environment before writing a single line of code. This research-first approach ensures that our web design solutions are not just visually compelling but strategically sound. We analysed user journeys, identified conversion opportunities, and mapped out the information architecture that would guide visitors from first impression to meaningful action.`
              : `Jedes Projekt bei Coday beginnt mit einer gründlichen Analysephase. Für ${content.title} haben wir erhebliche Zeit investiert, um die Geschäftslandschaft, die Zielgruppe und das Wettbewerbsumfeld zu verstehen, bevor eine einzige Zeile Code geschrieben wurde. Dieser Research-First-Ansatz stellt sicher, dass unsere Webdesign-Lösungen nicht nur visuell überzeugend, sondern auch strategisch fundiert sind. Wir haben User Journeys analysiert, Conversion-Möglichkeiten identifiziert und die Informationsarchitektur entworfen, die Besucher von der ersten Impression bis zur gewünschten Handlung führt.`}
          </p>
          <p>
            {params.locale === 'en'
              ? `The technical implementation for ${content.title} leveraged our core stack: Next.js for server-side rendering and superior performance, React for component-driven UI architecture, and modern CSS for pixel-perfect, responsive layouts. We ensured that Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift — remained well within Google's recommended thresholds. Performance is not an afterthought at Coday; it is engineered into every decision from the first commit.`
              : `Die technische Umsetzung für ${content.title} basiert auf unserem Kern-Stack: Next.js für Server-Side Rendering und überlegene Performance, React für komponentengetriebene UI-Architektur und modernes CSS für pixelgenaue, responsive Layouts. Wir haben sichergestellt, dass die Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint und Cumulative Layout Shift — deutlich innerhalb der von Google empfohlenen Schwellenwerte liegen. Performance ist bei Coday kein nachträglicher Gedanke, sondern wird von der ersten Codezeile an in jede Entscheidung eingebaut.`}
          </p>
          <p>
            {params.locale === 'en'
              ? `Search engine optimisation played a central role in the ${content.title} project. We implemented structured data markup, semantic HTML, optimised meta descriptions, and a content strategy designed to capture relevant local and industry-specific search queries. Our SEO work extends beyond on-page factors — we ensure fast load times, mobile-first usability, and accessible design patterns that search engines reward with higher rankings. The result is sustainable organic visibility that reduces dependency on paid advertising.`
              : `Suchmaschinenoptimierung spielte eine zentrale Rolle im ${content.title}-Projekt. Wir haben strukturierte Daten, semantisches HTML, optimierte Meta-Beschreibungen und eine Content-Strategie implementiert, die darauf ausgelegt ist, relevante lokale und branchenspezifische Suchanfragen abzudecken. Unsere SEO-Arbeit geht über On-Page-Faktoren hinaus — wir stellen schnelle Ladezeiten, Mobile-First-Usability und barrierefreie Designmuster sicher, die Suchmaschinen mit besseren Rankings belohnen. Das Ergebnis ist nachhaltige organische Sichtbarkeit, die die Abhängigkeit von bezahlter Werbung reduziert.`}
          </p>
          <p>
            {params.locale === 'en'
              ? `At Coday, we measure success through tangible outcomes — not vanity metrics. For ${content.title} and every project in our portfolio, we track PageSpeed scores, keyword rankings, lead generation volume, and conversion rates. Our references, including projects like Batherm, MS Schlüsseldienst Wetzlar, and Lindener Ratsstuben, demonstrate that premium web design from Wetzlar delivers measurable business impact. Every case study on this page is a real project with a real client — verifiable and transparent.`
              : `Bei Coday messen wir Erfolg an greifbaren Ergebnissen — nicht an Vanity-Metriken. Für ${content.title} und jedes Projekt in unserem Portfolio verfolgen wir PageSpeed-Scores, Keyword-Rankings, Lead-Generierungsvolumen und Conversion-Raten. Unsere Referenzen, darunter Projekte wie Batherm, MS Schlüsseldienst Wetzlar und Lindener Ratsstuben, belegen, dass erstklassiges Webdesign aus Wetzlar messbaren geschäftlichen Impact liefert. Jede Case Study auf dieser Seite ist ein echtes Projekt mit einem echten Kunden — nachprüfbar und transparent.`}
          </p>
          <p>
            {params.locale === 'en'
              ? `If ${content.title} inspires you to transform your own digital presence, we would love to hear from you. As a solo agency, Coday offers direct communication with the person who designs and builds your website — no account managers, no handoffs, no telephone game. Explore our other case studies to see the breadth of our work, and contact us for a free initial consultation to discuss your project goals.`
              : `Wenn Sie ${content.title} inspiriert, Ihre eigene digitale Präsenz zu transformieren, freuen wir uns auf Ihre Nachricht. Als Solo-Agentur bietet Coday direkte Kommunikation mit der Person, die Ihre Website konzipiert und entwickelt — keine Account Manager, keine Übergaben, kein Stille-Post-Spiel. Entdecken Sie unsere weiteren Case Studies, um die Bandbreite unserer Arbeit kennenzulernen, und kontaktieren Sie uns für ein kostenloses Erstgespräch, um Ihre Projektziele zu besprechen.`}
          </p>
        </div>
      </section>
    </>
  );
}
