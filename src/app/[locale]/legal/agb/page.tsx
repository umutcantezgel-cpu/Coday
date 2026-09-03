import { generatePageMetadata } from '@/lib/metadata';
import { AgbClient } from '@/features/legal/ui/AgbClient';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'legal' });
  const isEn = resolvedParams.locale === 'en';

  return generatePageMetadata({
    title: t('terms.title', { defaultValue: 'AGB' }),
    description: t('terms.desc', {
      defaultValue: 'Allgemeine Geschäftsbedingungen der Coday Webagentur.',
    }),
    keywords: isEn
      ? ['Coday Terms and Conditions', 'General Terms Web Agency', 'Legal Terms Coday']
      : ['Coday AGB', 'Allgemeine Geschäftsbedingungen Coday', 'Vertragsbedingungen Webagentur'],
    path: isEn ? '/en/legal/agb' : '/de/legal/agb',
    type: 'legal',
  });
}

export default async function AgbPage({ params }: { params?: Promise<{ locale: string }> }) {
  const resolvedParams = params ? await params : { locale: 'de' };
  const _locale = resolvedParams.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Terms & Conditions' : 'AGB', url: `/${_locale}/legal/agb` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node already ships from the root layout, so it is not repeated here.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/legal/agb#webpage`,
        name: isEn ? 'Terms and Conditions' : 'Allgemeine Geschäftsbedingungen (AGB)',
        url: `${BASE_URL}/${_locale}/legal/agb`,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgbClient />
    </>
  );
}
