'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import { m } from 'motion/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Download, MicrophoneStage, Article } from '@phosphor-icons/react/dist/ssr';

const Presse: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <div className="min-h-dvh bg-background-light">
      <SeoHead
        title={isEn ? 'Press & Media | Coday' : 'Presse & Media | Coday'}
        description={
          isEn
            ? 'Press releases, mentions and our speaker history. Discover Coday in the media.'
            : 'Pressemitteilungen, Mentions und unsere Speaker History. Entdecken Sie Coday in den Medien.'
        }
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: isEn ? 'Press' : 'Presse', url: 'https://www.codayweb.de/presse' },
        ]}
      />

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <m.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            {isEn
              ? 'Media & Insights: Coday in the Press'
              : 'Media & Insights: Coday in den Medien'}
          </m.h1>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6"
          >
            {isEn ? 'Press Coverage & Public Relations' : 'Presseberichte & Public Relations'}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {isEn
              ? 'Find the latest media & insights here. Learn more about Coday in the press, our presence in media and at events. Download our Press Kit for your coverage.'
              : 'Hier finden Sie aktuelle Media & Insights. Erfahren Sie mehr über Coday in den Medien, unsere Präsenz in der Presse und bei Events. Laden Sie unser Press Kit für Ihre Berichterstattung herunter.'}
          </m.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* As Seen On Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <OptimizedIcon icon={Article} className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">
                {isEn ? 'As Featured In' : 'Bekannt aus'}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500 italic mb-6">
                {isEn
                  ? 'We are actively building our network. Our press publications will appear here soon.'
                  : 'Wir bauen aktuell aktiv unser Netzwerk auf. Demnächst finden Sie hier unsere Presseveröffentlichungen.'}
              </p>
              {/* Logo Grid placeholder */}
              <div
                className="flex flex-wrap justify-center gap-8 opacity-30 grayscale"
                aria-hidden="true"
              >
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse motion-reduce:animate-none"></div>
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse motion-reduce:animate-none"></div>
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse motion-reduce:animate-none"></div>
              </div>
            </div>
          </section>

          {/* Speaker History */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <OptimizedIcon icon={MicrophoneStage} className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">Speaker History</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-sm font-bold text-primary mb-2">
                    {isEn ? 'Coming Soon' : 'Demnächst'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Web Architecture</h3>
                  <p className="text-gray-600 mb-4">
                    {isEn
                      ? 'Insights into scaling B2B SaaS platforms with Next.js, edge caching and AI integrations.'
                      : 'Einblicke in die Skalierung von B2B SaaS Plattformen mit Next.js, Edge-Caching und KI-Integrationen.'}
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  {isEn ? 'Date & location to follow' : 'Termin & Ort folgen'}
                </div>
              </div>
            </div>
          </section>

          {/* Press Kit Download */}
          <section>
            <div className="bg-gray-900 rounded-3xl p-10 text-center relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"
                aria-hidden="true"
              />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Press Kit</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                {isEn
                  ? 'Download our official Press Kit. It contains high-resolution logos, founder photos and Coday company profiles.'
                  : 'Laden Sie unser offizielles Press Kit herunter. Es enthält hochauflösende Logos, Gründerfotos und Kurzprofile von Coday.'}
              </p>
              <button className="active:scale-[0.97] relative z-10 inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors motion-reduce:duration-[0.01ms]">
                <OptimizedIcon icon={Download} className="text-xl" />
                {isEn ? 'Download Press Kit' : 'Press Kit Herunterladen'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Presse;
