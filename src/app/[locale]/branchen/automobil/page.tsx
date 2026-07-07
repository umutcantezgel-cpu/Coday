import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for the Automotive Industry | Wetzlar',
      description:
        'Websites and digital solutions for car dealerships, workshops and automotive businesses in Wetzlar and Hesse. Premium web design by Coday. Get in touch.',
      path: `/en/branchen/automobil`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für die Automobilbranche | Wetzlar',
    description:
      'Websites und digitale Lösungen für Autohäuser, Werkstätten und KFZ-Betriebe in Wetzlar und Hessen. Premium Webdesign von Coday. Jetzt Termin buchen.',
    path: `/de/branchen/automobil`,
    type: 'money',
  });
}

export default async function AutomobilHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        id="schema-branchen-automobil"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für die Automobilbranche',
                description:
                  'Websites und digitale Lösungen für Autohäuser, Werkstätten und KFZ-Betriebe in Wetzlar und Hessen. Premium Webdesign von Coday. Jetzt Termin buchen.',
                url: `${BASE_URL}/de/branchen/automobil`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="automobil" />
      <IndustryToolEmbed industryKey="automobil" />
    </>
  );
}
