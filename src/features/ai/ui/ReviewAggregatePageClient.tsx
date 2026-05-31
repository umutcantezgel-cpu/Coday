'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { SeoHead } from '@/shared/ui/SeoHead';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { JsonLd } from '@/shared/ui/JsonLd';
import { aiReviewAggregates } from '@/shared/data/ai-review-aggregates';
import { Star, Quotes, ArrowRight, SealCheck } from '@phosphor-icons/react';

export default function ReviewAggregatePage() {
  const params = useParams();
  const quelle = params?.quelle as string;
  const aggregate = aiReviewAggregates.find((r) => r.slug === quelle);

  if (!aggregate) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <h1 className="text-3xl font-bold">Review Source not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`Coday Reviews on ${aggregate.platformName} | ${aggregate.aggregateScore} Stars`}
        description={`Read verified client reviews and ratings for Coday on ${aggregate.platformName}. Average rating: ${aggregate.aggregateScore} out of 5 based on ${aggregate.totalReviews} reviews.`}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Reviews', url: 'https://www.codayweb.de/ai/erfahrungen' },
          {
            name: aggregate.platformName,
            url: `https://www.codayweb.de/ai/erfahrungen/${aggregate.slug}`,
          },
        ]}
      />
      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/erfahrungen/${aggregate.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Reviews', url: 'https://www.codayweb.de/ai/erfahrungen' },
          {
            name: aggregate.platformName,
            url: `https://www.codayweb.de/ai/erfahrungen/${aggregate.slug}`,
          },
        ]}
        data={{
          aggregateRating: {
            ratingValue: aggregate.aggregateScore,
            reviewCount: aggregate.totalReviews,
            bestRating: 5,
            worstRating: 1,
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        {/* Header Section */}
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold uppercase tracking-wider rounded-lg mb-6 border border-emerald-100">
            <SealCheck weight="fill" className="text-emerald-500 text-lg" />
            Verified Profile
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
            Coday Reviews on <span className="text-primary">{aggregate.platformName}</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 inline-block">
            <div className="flex items-center gap-2">
              <span className="text-5xl font-black text-slate-900">
                {aggregate.aggregateScore.toFixed(1)}
              </span>
              <span className="text-xl text-slate-400 font-bold">/ 5.0</span>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-400 text-2xl mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    weight={i < Math.floor(aggregate.aggregateScore) ? 'fill' : 'regular'}
                  />
                ))}
              </div>
              <p className="text-slate-500 font-medium">
                Based on <strong className="text-slate-900">{aggregate.totalReviews}</strong>{' '}
                reviews
              </p>
            </div>
          </div>
        </header>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {aggregate.topReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms] relative"
            >
              <Quotes
                weight="fill"
                className="absolute top-8 right-8 text-6xl text-slate-50 opacity-50"
              />
              <div className="flex items-center gap-1 text-amber-400 text-lg mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} weight="fill" />
                ))}
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                "{review.body}"
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                <div className="font-bold text-slate-900">{review.author}</div>
                <div className="text-sm text-slate-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mb-24">
          <a
            href={aggregate.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary transition-colors motion-reduce:duration-[0.01ms] group shadow-lg shadow-slate-200"
          >
            Read All Reviews on {aggregate.platformName}
            <ArrowRight
              weight="bold"
              className="group-hover:translate-x-1 transition-transform motion-reduce:duration-[0.01ms]"
            />
          </a>
          <p className="text-sm text-slate-500 mt-4">
            Last synced: {new Date(aggregate.lastSynced).toLocaleDateString()}
          </p>
        </div>
      </div>
      <GlobalCTA />
    </div>
  );
}
