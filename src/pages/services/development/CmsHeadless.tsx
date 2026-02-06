import React from 'react';
import { LocalizedNavLink as NavLink } from '../../../../shared/ui/LocalizedLink';
import { Icon } from '@/shared/ui/Icon';

const CmsHeadless: React.FC = () => {
  return (
    <div className="bg-background-light font-sans text-text-light">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                <Icon name="article" className="text-3xl" />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                Headless CMS & <span className="text-primary">Content.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                Verwalten Sie Inhalte zentral, spielen Sie sie überall aus. Wir integrieren
                Contentful, Sanity und Strapi in moderne Frontends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  CMS Beratung
                </NavLink>
              </div>
            </div>
            <div className="relative hidden lg:block">
              {/* Visual Placeholder: Content Blocks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl opacity-60"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center h-40">
                  <span className="font-bold text-gray-800 text-lg mb-2">Contentful</span>
                  <div className="w-full bg-gray-100 h-2 rounded mb-1"></div>
                  <div className="w-2/3 bg-gray-100 h-2 rounded"></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center h-40 mt-8">
                  <span className="font-bold text-gray-800 text-lg mb-2">Sanity</span>
                  <div className="w-full bg-gray-100 h-2 rounded mb-1"></div>
                  <div className="w-2/3 bg-gray-100 h-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Warum Headless?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trennen Sie Frontend vom Backend für maximale Flexibilität und Performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Omnichannel',
                desc: 'Ein Content-Hub für Website, App, Smartwatch und mehr.',
              },
              {
                title: 'High Performance',
                desc: 'Statische Generierung via Next.js für extrem schnelle Ladezeiten.',
              },
              {
                title: 'Sicherheit',
                desc: 'Keine direkte Datenbank-Verbindung im Frontend. Minimierte Risiken.',
              },
              {
                title: 'Entwickler-Freundlich',
                desc: 'Moderne API-first Ansätze ermöglichen schnellere Iterationen.',
              },
              {
                title: 'Skalierbar',
                desc: 'Wächst mit Ihren Anforderungen, ohne dass das System neu gebaut werden muss.',
              },
              {
                title: 'Marketing Speed',
                desc: 'Landingpages erstellen ohne Entwickler-Ressourcen.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CmsHeadless;
