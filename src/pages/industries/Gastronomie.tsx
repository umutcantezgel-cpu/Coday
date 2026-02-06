import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/Icon';
import BlurText from '../../shared/ui/BlurText';
import GradientText from '../../shared/ui/GradientText';
import TableBookingRoiVisualizer from '../../features/industries/gastronomie/TableBookingRoiVisualizer';
import MenuEngineeringDemo from '../../features/industries/gastronomie/MenuEngineeringDemo';
import ReservationFlowDemo from '../../features/industries/gastronomie/ReservationFlowDemo';

const Gastronomie: React.FC = () => {
  const { t } = useTranslation('industries');

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('gastronomie.hero.label')}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
                <BlurText
                  text={t('gastronomie.features.hero_tags').split('\n')[0]}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="inline-block mr-3"
                />
                <br />
                <GradientText
                  colors={['#EF4444', '#F97316', '#F59E0B']}
                  animationSpeed={3}
                  className="inline-block"
                >
                  {t('gastronomie.features.hero_tags').split('\n')[1]}
                </GradientText>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {t('gastronomie.features.hero_desc')}
              </p>
              <div className="flex gap-4 mb-12">
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                  {t('gastronomie.features.cta_demo')}
                </button>
              </div>
            </div>

            <div className="relative">
              <TableBookingRoiVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Flow Section - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-white relative border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ReservationFlowDemo />
        </div>
      </section>

      {/* Menu Engineering - NEW HIGH COMPLEXITY */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MenuEngineeringDemo />
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-secondary mb-4">
              {t('gastronomie.features.section_title')}
            </h2>
            <p className="text-slate-600">{t('gastronomie.features.section_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'qr_code_2',
                title: t('gastronomie.features.grid.menu.title'),
                desc: t('gastronomie.features.grid.menu.desc'),
              },
              {
                icon: 'delivery_dining',
                title: t('gastronomie.features.grid.shop.title'),
                desc: t('gastronomie.features.grid.shop.desc'),
              },
              {
                icon: 'celebration',
                title: t('gastronomie.features.grid.events.title'),
                desc: t('gastronomie.features.grid.events.desc'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon name={item.icon} />
                </div>
                <h3 className="font-bold text-xl text-secondary mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gastronomie;
