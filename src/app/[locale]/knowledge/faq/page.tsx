import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/FAQClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'FAQ | Web Design Agency Wetzlar Central Hesse',
      description:
        'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.',
      path: '/en/knowledge/faq',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar',
    description:
      'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.',
    path: '/de/knowledge/faq',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'FAQ | Web Design Agency Wetzlar Central Hesse | Coday'
      : 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.'
      : 'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.';
  return (
    <>
      <SeoHead title="Coday | faq" description="Erfahren Sie mehr über faq" pageType="default" />
      <ClientComponent />
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        <p className="mb-2 max-w-2xl mx-auto">
          {_locale === 'en'
            ? 'In our FAQ section, we address common inquiries about our web design services, transparent pricing models, and the step-by-step project process at Coday. Whether you are a local business in Wetzlar or operating across Hesse, we ensure clarity before starting your project.'
            : 'In unserem FAQ-Bereich beantworten wir häufige Fragen zu unseren Webdesign-Dienstleistungen, transparenten Preismodellen und dem genauen Projektablauf bei Coday. Egal ob Sie ein lokales Unternehmen in Wetzlar sind oder hessenweit agieren, wir sorgen für Klarheit vor Projektbeginn.'}
        </p>
        <p className="max-w-2xl mx-auto">
          {_locale === 'en'
            ? 'If you cannot find the answer to your specific question, our dedicated customer support team is always ready to assist you. Contact us directly for a personalized consultation or detailed technical guidance tailored to your digital needs.'
            : 'Sollten Sie die Antwort auf Ihre spezifische Frage nicht finden, steht Ihnen unser engagierter Kundensupport jederzeit zur Verfügung. Kontaktieren Sie uns direkt für eine persönliche Beratung oder detaillierte technische Unterstützung passend zu Ihren digitalen Anforderungen.'}
        </p>
      </div>
    </>
  );
}
