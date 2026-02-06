import React from 'react';
import { LocalizedNavLink as NavLink } from '../../../shared/ui/LocalizedLink';
import { Icon } from '@/shared/ui/Icon';

const UiUx: React.FC = () => {
  return (
    <div className="bg-background-light font-sans text-text-light">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                <Icon name="design_services" className="text-3xl" />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                UI/UX Design, das <span className="text-primary">fesselt.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                Wir gestalten digitale Erlebnisse, die Nutzer lieben und Konversionen treiben. Von
                Wireframes bis zum High-Fidelity Prototyp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  Design anfragen
                </NavLink>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl opacity-60"></div>
              {/* Visual Placeholder for Design Tool */}
              <div className="relative glass-card p-4 rounded-xl shadow-xl bg-white border border-gray-200 w-3/4 mx-auto">
                <div className="flex justify-between mb-4">
                  <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-50 rounded-lg"></div>
                  <div className="h-24 bg-gray-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-gray-900">
            <div className="p-6">
              <span className="text-6xl font-black text-gray-100 block mb-4">01</span>
              <h3 className="font-bold text-xl mb-2">Research</h3>
              <p className="text-gray-500">Zielgruppenanalyse und User Journeys.</p>
            </div>
            <div className="p-6">
              <span className="text-6xl font-black text-gray-100 block mb-4">02</span>
              <h3 className="font-bold text-xl mb-2">Wireframing</h3>
              <p className="text-gray-500">Struktur und Layout ohne Ablenkung.</p>
            </div>
            <div className="p-6">
              <span className="text-6xl font-black text-gray-100 block mb-4">03</span>
              <h3 className="font-bold text-xl mb-2">Prototyping</h3>
              <p className="text-gray-500">Interaktive Designs in Figma.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiUx;
