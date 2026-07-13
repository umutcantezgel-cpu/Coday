import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { ServiceDetailClient } from '@/features/services/ui/ServiceDetailClient';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { servicesData } from '@/shared/data/services';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;

  // Verify category and slug exist
  const categoryData = (servicesData as any)[category];
  if (!categoryData) return notFound();

  const featureData = categoryData[slug];
  if (!featureData) return notFound();

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(featureData.titleKey);
  const description = t(featureData.descriptionKey);

  // Fallback if description is too short (Seobility needs ~140 chars)
  const fullDesc =
    description.length < 100
      ? locale === 'en'
        ? `${description} Discover our comprehensive ${title} services at Coday. We build high-performance digital products to elevate your brand and drive business growth.`
        : `${description} Entdecken Sie unsere umfassenden ${title} Services bei Coday. Wir entwickeln leistungsstarke digitale Produkte, um Ihre Marke zu stärken und das Unternehmenswachstum voranzutreiben.`
      : description;

  return generatePageMetadata({
    title: locale === 'en' ? `${title} - Web Services` : `${title} - Services`,
    description: fullDesc,
    path: `/${locale}/services/${category}/${slug}`,
    type: 'money',
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const categoryData = (servicesData as any)[category];
  if (!categoryData) return notFound();

  const featureData = categoryData[slug];
  if (!featureData) return notFound();

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  return (
    <>
      <script
        id={`schema-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: featureData.titleKey || slug,
                description: `Details about our ${slug} service at Coday.`,
                url: `${BASE_URL}/${locale}/services/${category}/${slug}`,
              }),
            ],
          }),
        }}
      />
      <ServiceDetailClient />
    </>
  );
}
