import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { ServiceDetailClient } from '@/features/services/ui/ServiceDetailClient';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { servicesData } from '@/shared/data/services';

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

  // Basic metadata, ideally this would use translations based on the featureData
  return generatePageMetadata({
    title: `${featureData.titleKey} - Services`,
    description: `Details about our ${slug} service at Coday.`,
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
