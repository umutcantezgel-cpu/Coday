import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Pricing — Transparent Fixed Prices',
      description: 'Web development packages from €2,000. No hidden costs. See all pricing details and packages.',
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Preise — Transparente Festpreise',
    description: 'Webentwicklung ab 2.000 €. Keine versteckten Kosten. Alle Preise und Pakete im Überblick.',
    path: '/de/pricing',
    type: 'money',
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {isEn ? 'Pricing' : 'Preise'}
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl">
        {isEn
          ? 'Fixed prices, no surprises. Choose the package that fits your needs.'
          : 'Festpreise, keine Überraschungen. Wählen Sie das Paket, das zu Ihnen passt.'}
      </p>
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-gray-300">
          {isEn
            ? 'Detailed pricing information coming soon. Contact us for a personalized quote.'
            : 'Detaillierte Preisinformationen folgen in Kürze. Kontaktieren Sie uns für ein individuelles Angebot.'}
        </p>
      </div>
    </main>
  );
}
