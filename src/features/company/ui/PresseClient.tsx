'use client';

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { motion } from 'motion/react';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Download, MicrophoneStage, Article } from '@phosphor-icons/react';

const Presse: React.FC = () => {
  return (
    <div className="min-h-dvh bg-background-light">
      <SeoHead
        title="Presse & Media | Coday"
        description="Pressemitteilungen, Mentions und unsere Speaker History. Entdecken Sie Coday in den Medien."
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'Presse', url: 'https://www.codayweb.de/presse' },
        ]}
      />

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Media & Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6"
          >
            Coday in den Medien
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Erfahren Sie mehr über unsere Präsenz in der Presse und bei Events. Laden Sie unser
            Press Kit für Ihre Berichterstattung herunter.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* As Seen On Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <OptimizedIcon icon={Article} className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">Bekannt aus</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500 italic mb-6">
                Wir bauen aktuell aktiv unser Netzwerk auf. Demnächst finden Sie hier unsere
                Presseveröffentlichungen.
              </p>
              {/* Logo Grid placeholder */}
              <div className="flex flex-wrap justify-center gap-8 opacity-30 grayscale">
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
                  <div className="text-sm font-bold text-primary mb-2">Demnächst</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Web Architecture</h3>
                  <p className="text-gray-600 mb-4">
                    Einblicke in die Skalierung von B2B SaaS Plattformen mit Next.js, Edge-Caching
                    und KI-Integrationen.
                  </p>
                </div>
                <div className="text-sm text-gray-400">Termin & Ort folgen</div>
              </div>
            </div>
          </section>

          {/* Press Kit Download */}
          <section>
            <div className="bg-gray-900 rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Press Kit</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                Laden Sie unser offizielles Press Kit herunter. Es enthält hochauflösende Logos,
                Gründerfotos und Kurzprofile von Coday.
              </p>
              <button className="active:scale-[0.97] relative z-10 inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors motion-reduce:duration-[0.01ms]">
                <OptimizedIcon icon={Download} className="text-xl" />
                Press Kit Herunterladen
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Presse;
