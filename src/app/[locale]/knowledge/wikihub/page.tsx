import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/knowledge/ui/WikiHubClient';
import { wikiEntities } from '@/features/knowledge/model/entities';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Wiki & Glossary | Web Design Wetzlar',
      description:
        'Clear web design glossary and digital wiki from Coday in Wetzlar. Technical terms simply explained for business owners and freelancers across Hesse.',
      keywords: [
        'Web Design Glossary',
        'SEO Wiki Germany',
        'Web Development Terms Explained',
        'Coday WikiHub',
      ],
      path: '/en/knowledge/wikihub',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Digitales Wiki & Glossar | Webdesign Wetzlar',
    description:
      'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar. Fachbegriffe einfach erklärt für Unternehmer und Selbstständige in Hessen.',
    keywords: [
      'Webdesign Glossar',
      'Web Agentur Wiki',
      'Fachbegriffe Webentwicklung',
      'Coday WikiHub',
    ],
    path: '/de/knowledge/wikihub',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
    { name: 'WikiHub', url: `/${_locale}/knowledge/wikihub` },
  ]);

  const hubUrl = `${BASE_URL}/${_locale}/knowledge/wikihub`;

  const jsonLd = {
    '@context': 'https://schema.org',
    // Root layout owns the Organization node; this graph starts with the page's own entries.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${hubUrl}#collection`,
        name: isEn ? 'Coday Digital & Web Design WikiHub' : 'Coday Digitales & Webdesign WikiHub',
        url: hubUrl,
        description: isEn
          ? 'Clear web design glossary and digital wiki from Coday in Wetzlar.'
          : 'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar.',
        inLanguage: _locale,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        mainEntity: { '@id': hubUrl },
      },
      {
        // Every one of the 101 term pages emits `inDefinedTermSet: <hubUrl>`, but
        // no node with that @id existed — 101 dangling edges per locale. This is
        // the set they point at, and it links back to each term by its own @id.
        '@type': 'DefinedTermSet',
        '@id': hubUrl,
        name: isEn ? 'Coday Web Design & Digital Glossary' : 'Coday Webdesign- & Digital-Glossar',
        url: hubUrl,
        description: isEn
          ? 'Web design, SEO and web development terms explained for business owners in Central Hesse.'
          : 'Begriffe aus Webdesign, SEO und Webentwicklung, erklärt für Unternehmen in Mittelhessen.',
        inLanguage: _locale,
        publisher: { '@id': `${BASE_URL}/#organization` },
        hasDefinedTerm: wikiEntities.map((entity) => ({
          '@id': `${BASE_URL}/${_locale}/knowledge/wiki/${entity.slug}#term`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
    </>
  );
}
