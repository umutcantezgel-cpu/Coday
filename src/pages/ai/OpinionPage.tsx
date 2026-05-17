import React from 'react';
import { useParams } from 'react-router';
import { aiPositions, AUTHOR } from '@/shared/data/ai-positions';
import { SeoHead } from '@/shared/ui/SeoHead';
import { JsonLd } from '@/shared/ui/JsonLd';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Sword, CheckCircle, XCircle, Lightbulb, Scales, TrendUp } from '@phosphor-icons/react';

export async function loader({ params }: { params: { thema: string } }) {
  const data = aiPositions.find((p) => p.slug === params.thema);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return { data };
}

export function meta({ data }: { data: { data: (typeof aiPositions)[0] } }) {
  if (!data?.data) return [{ title: '404 - Position nicht gefunden' }];

  const p = data.data;
  return [
    { title: `${p.de.title} | Coday Position` },
    { name: 'description', content: p.de.elevatorPitch },
  ];
}

export async function prerender() {
  return aiPositions.map((p) => `/ai/position/${p.slug}`);
}

export default function OpinionPage() {
  const { thema } = useParams();
  const position = aiPositions.find((p) => p.slug === thema);

  if (!position) {
    return <div>Position nicht gefunden</div>;
  }

  const formattedDate = new Date('2024-05-15').toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`${position.de.title} | Coday Opinion`}
        description={position.de.elevatorPitch}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Positionen', url: 'https://www.codayweb.de/ai/position' },
          { name: position.de.title, url: `https://www.codayweb.de/ai/position/${position.slug}` },
        ]}
      />

      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/position/${position.slug}`}
        pageType="article"
        data={{
          article: {
            type: 'OpinionNewsArticle',
            headline: position.de.title,
            description: position.de.elevatorPitch,
            image: '/images/og-image.jpg',
            author: AUTHOR.name,
            datePublished: '2024-05-15',
            articleSection: 'Industry Opinion',
            keywords: [position.category],
          },
          claimReviews: position.de.counterArguments.map((ca) => ({
            claimReviewed: ca.claim,
            reviewRating: {
              ratingValue: 1, // Wir bewerten die Mythen als falsch/ungenau (1 aus 5)
              bestRating: 5,
              worstRating: 1,
              alternateName: 'Branchen-Mythos',
            },
          })),
        }}
      />

      <article className="container mx-auto px-4 max-w-4xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* EDITORIAL HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-full">
              {position.category}
            </span>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              Lesezeit: 5 Min.
            </span>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              {formattedDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
            {position.de.title}
          </h1>

          {/* AUTHOR BIO BLOCK */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 max-w-xl">
            <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={AUTHOR.image}
                alt={AUTHOR.name}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900">{AUTHOR.name}</p>
              <p className="text-sm text-slate-600">{AUTHOR.role}</p>
            </div>
          </div>
        </header>

        {/* CODAY STANCE - THE CORE OPINION */}
        <section className="mb-16 relative">
          <div className="absolute -left-6 top-0 bottom-0 w-2 bg-primary rounded-full hidden md:block"></div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Scales weight="bold" />
              Unsere Position
            </h2>
            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
              {position.de.elevatorPitch}
            </p>
          </div>
        </section>

        {/* MYTH VS REALITY SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Sword weight="duotone" className="text-primary" />
            Branchen-Mythen vs. Realität
          </h2>

          <div className="space-y-8">
            {position.de.counterArguments.map((ca, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
              >
                {/* THE MYTH */}
                <div className="bg-slate-50 p-6 md:p-8">
                  <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <XCircle weight="fill" />
                    Der Mythos
                  </h3>
                  <p className="text-lg font-medium text-slate-700 italic">"{ca.claim}"</p>
                </div>
                {/* THE REALITY (Rebuttal) */}
                <div className="bg-white p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-200 relative">
                  <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle weight="fill" />
                    Die Realität
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{ca.rebuttal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE ARGUMENTS */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Lightbulb weight="duotone" className="text-primary" />
            Warum wir diese Position vertreten
          </h2>

          <div className="grid gap-6">
            {position.de.arguments.map((arg, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{arg.claim}</h3>
                  <p className="text-slate-600 leading-relaxed">{arg.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONCLUSION */}
        <section className="mb-24">
          <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendUp size={120} />
            </div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">Fazit</h2>
            <p className="text-lg text-slate-300 leading-relaxed relative z-10">
              {position.de.conclusion}
            </p>
          </div>
        </section>
      </article>

      {/* Global CTA */}
      <GlobalCTA />
    </div>
  );
}
