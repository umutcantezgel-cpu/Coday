import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/company/ui/PartnerschaftClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Partner Program for Agencies | Web Design Hesse',
      description:
        'Become a Coday partner in Hesse. Together we offer your clients premium web design from Wetzlar. Attractive commissions and fair conditions for agencies.',
      path: '/en/partnerschaft',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Partnerprogramm für Agenturen | Webdesign Hessen',
    description:
      'Werden Sie Coday Partner in Hessen. Gemeinsam bieten wir Ihren Kunden erstklassiges Webdesign aus Wetzlar. Attraktive Provisionen und faire Konditionen.',
    path: '/de/partnerschaft',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Partner Program for Agencies | Web Design Hesse | Coday'
      : 'Partnerprogramm für Agenturen | Webdesign Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Become a Coday partner in Hesse. Together we offer your clients premium web design from Wetzlar. Attractive commissions and fair conditions for agencies.'
      : 'Werden Sie Coday Partner in Hessen. Gemeinsam bieten wir Ihren Kunden erstklassiges Webdesign aus Wetzlar. Attraktive Provisionen und faire Konditionen.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <SeoHead
        title="Coday | partnerschaft"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
