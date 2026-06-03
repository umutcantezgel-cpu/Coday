'use client';

import React from 'react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

const PRODUCTS = [
  {
    id: 1,
    title: 'SEO Audit Template',
    price: '€199',
    image: '/images/marketing/seo-audit-analyse-optimierung-google-ranking.webp',
    alt: 'SEO Audit',
  },
  {
    id: 2,
    title: 'Social Media Bundle',
    price: '€299',
    image: '/images/marketing/social-media-marketing-influencer-likes-shares-viral.webp',
    alt: 'Social Media Bundle',
  },
  {
    id: 3,
    title: 'Agency Growth Kit',
    price: '€499',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Groth Kit',
  },
  {
    id: 4,
    title: 'Webflow Portfolio Theme',
    price: '€79',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'Portfolio Theme',
  },
  {
    id: 5,
    title: 'Contract Templates Pack',
    price: '€149',
    image: '/images/brand/coday-full.webp',
    alt: 'Vertraege',
  },
  {
    id: 6,
    title: 'Lead Gen Masterclass',
    price: '€399',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    alt: 'Lead Gen',
  },
];

const Marketplace: React.FC = () => {
  return (
    <div className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            Community Marktplatz
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Entdecke exklusive Services und Partner-Angebote für dein nächstes Projekt.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {/* Marketplace Items */}
          {PRODUCTS.map((item) => (
            <li
              key={item.id}
              className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 focus-within:shadow-xl focus-within:border-blue-200 transition motion-reduce:duration-[0.01ms] duration-300 flex flex-col list-none"
            >
              <div className="h-48 relative overflow-hidden bg-slate-50">
                <OptimizedImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform motion-reduce:duration-[0.01ms] duration-700"
                  width={800}
                  height={600}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                  Popular
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-slate-500 mb-4 text-sm flex-1">
                  Professionelles Paket für direkten Einsatz. Inklusive Updates.
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-blue-600">{item.price}</span>
                  <button
                    aria-label={`${item.title} kaufen für ${item.price}`}
                    className="active:scale-[0.97] px-4 py-2 rounded-lg bg-gray-900 text-sm font-bold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors motion-reduce:duration-[0.01ms]"
                  >
                    Kaufen
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Marketplace;
