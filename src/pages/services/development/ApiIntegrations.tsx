import React from 'react';
import { LocalizedNavLink as NavLink } from '../../../../shared/ui/LocalizedLink';
import { Icon } from '../../../shared/ui/Icon';

const ApiIntegrations: React.FC = () => {
  return (
    <div className="bg-background-light font-sans text-text-light">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                <Icon name="hub" className="text-3xl" />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                API Integrationen & <span className="text-primary">Automation.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                Wir verbinden Ihre Systemlandschaft. CRM, ERP, Payment oder Marketing-Tools – alles
                spielt nahtlos zusammen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  Integration anfragen
                </NavLink>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-60"></div>
              <div className="relative flex justify-center items-center">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xs font-bold border border-gray-200 z-10">
                  SAP
                </div>
                <div className="w-16 h-1 bg-gray-300"></div>
                <div className="w-24 h-24 bg-primary text-white rounded-3xl shadow-xl flex items-center justify-center font-bold z-20">
                  HUB
                </div>
                <div className="w-16 h-1 bg-gray-300"></div>
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xs font-bold border border-gray-200 z-10">
                  CRM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Salesforce',
              'HubSpot',
              'SAP / ERP',
              'Stripe',
              'OpenAI / LLMs',
              'Make (Integromat)',
              'Zapier',
              'Custom REST/GraphQL',
            ].map((tool, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-xl text-center font-bold text-gray-700 border border-gray-100"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiIntegrations;
