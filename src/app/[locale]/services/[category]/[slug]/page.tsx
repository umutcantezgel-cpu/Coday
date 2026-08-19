import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { ServiceDetailClient } from '@/features/services/ui/ServiceDetailClient';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { servicesData } from '@/shared/data/services';

import { getTranslations, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; category: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    Object.entries(servicesData).forEach(([category, categoryData]) => {
      Object.keys(categoryData as any).forEach((slug) => {
        params.push({ locale, category, slug });
      });
    });
  });
  return params;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  // Verify category and slug exist
  const categoryData = (servicesData as any)[category];
  if (!categoryData) return notFound();

  const featureData = categoryData[slug];
  if (!featureData) return notFound();

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(featureData.titleKey);
  const description = t(featureData.descriptionKey);

  return generatePageMetadata({
    title: title,
    description: description,
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

  const _locale = (await params)?.locale || 'de';
  const messages = await getMessages();

  return (
    <>
      <script
        id={`schema-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: featureData.titleKey || slug,
                description: `Details about our ${slug} service at Coday.`,
                url: `${BASE_URL}/${locale}/services/${category}/${slug}`,
              }),
            ],
          }),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <ServiceDetailClient />
      </NextIntlClientProvider>
    </>
  );
}
