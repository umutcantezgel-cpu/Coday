import React from 'react';

import GradientText from '../components/shared/ui/GradientText';
import BlurText from '../components/shared/ui/BlurText';

const Process: React.FC = () => {
  return (
    <main className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-6 border border-red-100 shadow-sm animate-pulse">
            Wie wir gewinnen
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tight mb-4 pb-2">
            <GradientText
              colors={['#1A9A9A', '#2D3748', '#1A9A9A']}
              animationSpeed={8}
              showBorder={false}
              className="inline-block uppercase"
            >
              Das Coday Protokoll
            </GradientText>
          </h1>
          <BlurText
            text="Transparenz ist unser Fundament. In 5 effizienten Schritten verwandeln wir deine Vision in digitale Realität – schnell, präzise und 10x effektiver."
            delay={50}
            animateBy="words"
            direction="bottom"
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed justify-center"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-gradient-twilight rounded-full opacity-40"></div>

          <div className="space-y-16 md:space-y-24">

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 md:text-right">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-aurora-sapphire font-semibold text-sm mb-3">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span> Tag 1-2
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Discovery</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir analysieren deine Ziele, den Markt und deine Zielgruppe. In einem intensiven Workshop legen wir das Fundament für deinen Erfolg.
                </p>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface-light border-4 border-white shadow-glow flex items-center justify-center z-10">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">01</span>
              </div>
              <div className="order-2 md:order-3 w-full md:w-[45%] pl-20 md:pl-16 hidden md:block opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <span className="material-symbols-outlined text-4xl text-primary">manage_search</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 hidden md:flex md:justify-end opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <span className="material-symbols-outlined text-4xl text-primary">palette</span>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface-light border-4 border-white shadow-glow flex items-center justify-center z-10">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">02</span>
              </div>
              <div className="order-2 md:order-3 w-full md:w-[45%] pl-20 md:pl-16 text-left">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-aurora-sapphire font-semibold text-sm mb-3">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span> Tag 3-5
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Design</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir gestalten moderne, nutzerzentrierte Interfaces. Deine Marke erhält einen visuellen Anstrich, der Vertrauen schafft und konvertiert.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 md:text-right">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-aurora-sapphire font-semibold text-sm mb-3">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span> Tag 6-10
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Development</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Unsere Entwickler setzen das Design pixelgenau um. Performanter Code, SEO-optimiert und bereit für Skalierung.
                </p>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface-light border-4 border-white shadow-glow flex items-center justify-center z-10">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">03</span>
              </div>
              <div className="order-2 md:order-3 w-full md:w-[45%] pl-20 md:pl-16 hidden md:block opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <span className="material-symbols-outlined text-4xl text-primary">code</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 hidden md:flex md:justify-end opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <span className="material-symbols-outlined text-4xl text-primary">bug_report</span>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface-light border-4 border-white shadow-glow flex items-center justify-center z-10">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">04</span>
              </div>
              <div className="order-2 md:order-3 w-full md:w-[45%] pl-20 md:pl-16 text-left">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-aurora-sapphire font-semibold text-sm mb-3">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span> Tag 11-12
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">QA</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Qualitätssicherung ist key. Wir testen auf allen gängigen Geräten und Browsern, um eine fehlerfreie Experience zu garantieren.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 md:text-right">
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-aurora-sapphire font-semibold text-sm mb-3">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span> Tag 13-14
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Launch</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Es geht los! Wir bringen dein Projekt live, übergeben alle Zugänge und sorgen für einen reibungslosen Start.
                </p>
              </div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface-light border-4 border-white shadow-glow flex items-center justify-center z-10">
                <span className="font-display font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">05</span>
              </div>
              <div className="order-2 md:order-3 w-full md:w-[45%] pl-20 md:pl-16 hidden md:block opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <span className="material-symbols-outlined text-4xl text-primary">rocket_launch</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Timeline Progress */}
        <div className="mt-24 max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-aurora-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Projekt Timeline</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">7 - 14</span>
                  <span className="text-lg font-medium text-gray-500">Tage bis zum Ziel</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-primary font-medium bg-primary/5 px-4 py-2 rounded-lg border border-primary/10">
                <span className="material-symbols-outlined">bolt</span>
                <span>High Speed Delivery</span>
              </div>
            </div>
            <div className="h-6 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-1 shadow-inner">
              <div className="h-full w-full bg-gradient-aurora rounded-full shadow-sm relative">
                <div className="absolute inset-0 bg-white/20 animate-[pulse_3s_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between mt-3 text-xs font-medium text-gray-400 font-mono">
              <span>Tag 1</span>
              <span>Tag 7</span>
              <span>Tag 14</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Process;
