import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: `${industry} IT Solutions`,
      description: `Custom software and IT solutions for the ${industry} industry.`,
      path: `/en/branchen/${industry}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `${industry} IT-Lösungen`,
    description: `Maßgeschneiderte Software- und IT-Lösungen für die Branche ${industry}.`,
    path: `/de/branchen/${industry}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        id={`schema-branchen-${industry}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: `Webdesign für ${industry}`,
                description: `Maßgeschneiderte Webdesign-Lösungen für die Branche ${industry} von Coday in Wetzlar.`,
                url: `${BASE_URL}/de/branchen/${industry}`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient />
    </>
  );
}
