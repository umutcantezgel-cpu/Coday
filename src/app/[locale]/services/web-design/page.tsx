import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDesignClient } from '@/features/services/ui/WebDesignClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Professional Web Design in Wetzlar & Hesse',
      description:
        'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics for your business in Central Hesse. Get started.',
      path: '/en/services/web-design',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Professionelles Webdesign in Wetzlar & Hessen',
    description:
      'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
    path: '/de/services/web-design',
    type: 'money',
  });
}

export default async function WebDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        id="schema-web-design"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Professionelles Webdesign in Wetzlar & Hessen',
                description:
                  'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
                url: `${BASE_URL}/de/services/web-design`,
              }),
            ],
          }),
        }}
      />
      <WebDesignClient />
    </>
  );
}
