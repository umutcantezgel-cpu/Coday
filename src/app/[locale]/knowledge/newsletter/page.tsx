import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/NewsletterClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Newsletter | Web Design Trends from Wetzlar Hesse',
      description:
        'Monthly web design and SEO tips from Coday in Wetzlar directly to your inbox. Exclusive knowledge for business owners in Hesse. Subscribe for free.',
      path: '/en/knowledge/newsletter',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Newsletter | Webdesign Trends aus Wetzlar, Hessen',
    description:
      'Monatliche Webdesign und SEO Tipps von Coday in Wetzlar direkt in Ihr Postfach. Exklusives Wissen für Unternehmer in Hessen. Jetzt kostenlos anmelden.',
    path: '/de/knowledge/newsletter',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Newsletter | Web Design Trends from Wetzlar Hesse | Coday'
      : 'Newsletter | Webdesign Trends aus Wetzlar, Hessen | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <SeoHead
        title="Coday | newsletter"
        description="Erfahren Sie mehr über newsletter"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
