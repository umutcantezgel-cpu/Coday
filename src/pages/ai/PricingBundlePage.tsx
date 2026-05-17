import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { aiPricingBundles } from '@/shared/data/ai-pricing';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Button } from '@/shared/ui/Button';
import { CheckCircle, XCircle, Clock, CaretDown, Info } from '@phosphor-icons/react';

export async function loader({ params }: { params: { bundle: string } }) {
  const data = aiPricingBundles.find((b) => b.slug === params.bundle);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: (typeof aiPricingBundles)[0] } }) {
  if (!data?.data) return [{ title: '404 - Bundle nicht gefunden' }];

  const b = data.data;
  return [
    { title: `${b.de.title} | Transparente Preise | Coday` },
    { name: 'description', content: b.de.description },
  ];
}

export async function prerender() {
  return aiPricingBundles.map((b) => `/ai/preis/${b.slug}`);
}

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-secondary">{question}</span>
        <OptimizedIcon
          icon={CaretDown}
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 text-slate-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingBundlePage() {
  const { bundle } = useParams();
  const pricingData = aiPricingBundles.find((b) => b.slug === bundle);

  if (!pricingData) {
    return <div>Bundle nicht gefunden</div>;
  }

  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: pricingData.priceCurrency,
    maximumFractionDigits: 0,
  }).format(pricingData.price);

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`${pricingData.de.title} Preise | Coday`}
        description={pricingData.de.description}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Preise', url: 'https://www.codayweb.de/preise' },
          {
            name: pricingData.de.title,
            url: `https://www.codayweb.de/ai/preis/${pricingData.slug}`,
          },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/preis/${pricingData.slug}`}
        pageType="service"
        data={{
          service: {
            name: pricingData.de.title,
            description: pricingData.de.description,
            serviceType: pricingData.category,
            offers: {
              '@type': 'Offer',
              price: pricingData.price,
              priceCurrency: pricingData.priceCurrency,
              availability: 'https://schema.org/InStock',
              eligibleRegion: {
                '@type': 'Country',
                name: 'Germany',
              },
            },
          },
          faq:
            pricingData.de.faqs.length > 0
              ? {
                  questions: pricingData.de.faqs,
                }
              : undefined,
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-6 uppercase tracking-wider"
          >
            {pricingData.category}
          </motion.div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-secondary mb-6 leading-tight">
            {pricingData.de.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {pricingData.de.description}
          </p>
        </div>

        {/* PRICING HERO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary rounded-3xl p-8 md:p-12 shadow-2xl mb-16 relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-widest mb-2">
                Ihre Investition {pricingData.isMonthly ? '(Monatlich)' : '(Einmalig)'}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-slate-300 text-3xl font-bold mb-2">ab</span>
                <span className="font-display font-black text-6xl md:text-7xl">
                  {formattedPrice}
                </span>
                {pricingData.isMonthly && (
                  <span className="text-slate-300 text-2xl font-bold mb-2">/ m</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <OptimizedIcon icon={Clock} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-300 uppercase font-semibold">Durchlaufzeit</p>
                  <p className="font-bold text-lg">{pricingData.duration.text}</p>
                </div>
              </div>

              <Link to="/contact" className="w-full flex">
                <Button variant="primary" size="lg" className="w-full pointer-events-none">
                  Projekt anfragen
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* SCOPE SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="font-display font-bold text-2xl text-secondary mb-6 flex items-center gap-3">
              <OptimizedIcon icon={CheckCircle} className="w-8 h-8 text-green-500" />
              Inklusive (Scope)
            </h2>
            <ul className="space-y-4">
              {pricingData.de.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <OptimizedIcon
                    icon={CheckCircle}
                    className="w-5 h-5 text-green-500 mt-1 shrink-0"
                    weight="fill"
                  />
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <h2 className="font-display font-bold text-2xl text-secondary mb-6 flex items-center gap-3">
              <OptimizedIcon icon={XCircle} className="w-8 h-8 text-red-400" />
              Nicht enthalten
            </h2>
            <ul className="space-y-4">
              {pricingData.de.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <OptimizedIcon
                    icon={XCircle}
                    className="w-5 h-5 text-red-400 mt-1 shrink-0"
                    weight="fill"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <OptimizedIcon icon={Info} className="w-6 h-6 text-blue-500 shrink-0" />
              <p className="text-sm text-blue-800 font-medium">
                Scharfe Projektgrenzen bewahren uns vor Scope-Creep und garantieren, dass wir im
                Zeit- und Budgetplan bleiben. Ergänzungen können flexibel als Upsell hinzugebucht
                werden.
              </p>
            </div>
          </div>
        </div>

        {/* FAQS */}
        {pricingData.de.faqs.length > 0 && (
          <div className="mb-20 max-w-3xl mx-auto">
            <h2 className="font-display font-black text-3xl text-secondary mb-8 text-center">
              Häufige Fragen zum Paket
            </h2>
            <div className="space-y-2">
              {pricingData.de.faqs.map((faq, idx) => (
                <FaqItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        )}
      </div>

      <GlobalCTA />
    </div>
  );
}
