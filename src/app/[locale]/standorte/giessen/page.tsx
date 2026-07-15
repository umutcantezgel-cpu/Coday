import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { getOrganizationSchema, getDynamicLocationSchema, BASE_URL } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

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
      `giessen.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design Agency Giessen | Your Local Partner | Coday';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Your local agency location in Giessen.' : content.meta.description,
      path: `/${locale}/standorte/giessen`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design Agency Giessen | Your Local Partner | Coday'
          : 'Agentur Standort Gießen | Coday',
      description:
        locale === 'en'
          ? 'Your local agency location in Giessen.'
          : 'Ihr lokaler Agentur Standort in Gießen.',
      path: `/${locale}/standorte/giessen`,
      type: 'money',
    });
  }
}

export default async function GiessenLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
      `giessen.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Gießen SEO Content is currently being generated...</div>
    );
  }

  const cityData = getCityBySlug('giessen');

  const _locale = (await params)?.locale || 'de';

  const locationSchema = getDynamicLocationSchema({
    city: 'Gießen',
    description:
      _locale === 'en'
        ? 'Your local agency location in Giessen — Premium websites with Next.js, SEO.'
        : 'Ihr Agentur Standort in Gießen — Premium Websites mit Next.js, SEO & Generative Engine Optimization für lokale Unternehmen.',
    url: `${BASE_URL}/${_locale}/standorte/giessen`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), locationSchema],
  };

  const seoContent =
    _locale === 'en'
      ? {
          heading: 'Web Design Agency Giessen — Your Local Partner for Measurable Growth',
          paragraphs: [
            'As a web design agency serving Giessen, Coday combines cutting-edge Next.js development with deep local market expertise. Our location in nearby Wetzlar gives us first-hand understanding of the Central Hessian business landscape — from established B2B companies in the Gießen industrial corridor to ambitious startups at the university. We build websites that measurably acquire more B2B clients in Giessen by focusing on Core Web Vitals, conversion-optimized UX, and technical SEO that puts your business at the top of local search results.',
            'What sets us apart as your local partner in Giessen is our commitment to measurable outcomes. Every project we deliver includes transparent KPI tracking: organic traffic growth, lead quality, and conversion rates are monitored from day one. We do not hide behind vanity metrics. When we say a redesign will win you more customers, we back that claim with hard data. For B2B companies in the Giessen region, this data-driven approach has proven to reduce cost-per-acquisition by up to 40% compared to template-based agencies.',
            'Our Giessen-area clients — including service providers, engineering firms, and local businesses — benefit from a technology stack that large enterprises rely on. Server-side rendering, edge caching on Vercel, and structured data markup ensure that your website loads in under one second on any device. This technical excellence translates directly into higher Google rankings, more qualified leads, and a measurable return on your web investment. As your local web design agency, we are available for on-site consultations, workshops, and ongoing strategic support.',
            'Choosing Coday as your web design agency in Giessen means choosing a partner who treats your digital presence as a long-term revenue asset, not a one-time project. From initial SEO audit to post-launch optimization, we stay by your side to ensure your website continues to win new B2B customers month after month. Our local presence, combined with world-class technology, makes us the ideal partner for businesses in Giessen and the greater Central Hessian region who demand measurable results.',
          ],
        }
      : {
          heading: 'Webdesign Agentur Gießen — Ihr lokaler Standort für messbare Ergebnisse',
          paragraphs: [
            'Als Webdesign Agentur für Gießen verbindet Coday modernste Next.js-Entwicklung mit tiefem Verständnis für den mittelhessischen Markt. Von unserem Standort in Wetzlar aus betreuen wir Unternehmen in der gesamten Region Gießen — vom etablierten B2B-Mittelständler bis zum ambitionierten Start-up an der Justus-Liebig-Universität. Wir entwickeln Webseiten, die messbar mehr B2B-Kunden gewinnen, indem wir auf Core Web Vitals, konversionsoptimierte UX und technisches SEO setzen, das Ihr Unternehmen an die Spitze der lokalen Suchergebnisse bringt.',
            'Was uns als Ihren lokalen Standort in Gießen besonders macht, ist unser Fokus auf messbare Ergebnisse. Jedes Projekt umfasst transparentes KPI-Tracking: Organisches Traffic-Wachstum, Lead-Qualität und Conversion-Raten werden ab dem ersten Tag überwacht. Wir verstecken uns nicht hinter Vanity-Metriken. Wenn wir sagen, dass ein Redesign Ihnen mehr Kunden bringt, belegen wir das mit harten Zahlen. Für B2B-Kunden in der Region Gießen hat dieser datengetriebene Ansatz die Kosten pro Akquise nachweislich um bis zu 40 % gesenkt.',
            'Unsere Kunden im Raum Gießen — darunter Dienstleister, Ingenieurbüros und lokale Unternehmen — profitieren von einem Technologie-Stack, auf den auch Großunternehmen vertrauen. Serverseitiges Rendering, Edge-Caching auf Vercel und strukturierte Datenauszeichnung sorgen dafür, dass Ihre Webseite auf jedem Gerät in unter einer Sekunde lädt. Diese technische Exzellenz übersetzt sich direkt in höhere Google-Rankings, mehr qualifizierte Anfragen und einen messbar höheren Return on Investment. Als Ihre lokale Webdesign Agentur sind wir jederzeit für persönliche Beratung, Workshops und strategische Begleitung vor Ort verfügbar.',
            'Coday als Ihre Webdesign Agentur in Gießen zu wählen bedeutet, einen Partner zu gewinnen, der Ihre digitale Präsenz als langfristiges Umsatz-Asset behandelt — nicht als einmaliges Projekt. Vom initialen SEO-Audit bis zur fortlaufenden Optimierung stehen wir an Ihrer Seite, damit Ihre Webseite Monat für Monat neue B2B-Kunden gewinnt. Unser lokaler Standort, kombiniert mit erstklassiger Technologie, macht uns zum idealen Partner für Unternehmen in Gießen und der gesamten mittelhessischen Region, die messbare Resultate fordern.',
          ],
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} cityData={cityData} />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">{seoContent.heading}</h2>
        {seoContent.paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6 text-base leading-relaxed text-muted-foreground last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>
    </>
  );
}
