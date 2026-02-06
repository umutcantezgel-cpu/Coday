import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedNavLink as NavLink } from '../../../shared/ui/LocalizedLink';
import { Icon } from '@/shared/ui/Icon';

const BrandIdentity: React.FC = () => {
  const { t } = useTranslation('services');

  return (
    <div className="bg-background-light font-sans text-text-light">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-6">
                <Icon name="palette" className="text-3xl" />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                {t('brand_identity_page.hero.title_prefix')}{' '}
                <span className="text-primary">{t('brand_identity_page.hero.title_suffix')}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                {t('brand_identity_page.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  {t('brand_identity_page.hero.cta')}
                </NavLink>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4 opacity-80">
                <div className="h-32 bg-secondary rounded-br-3xl rounded-tl-lg"></div>
                <div className="h-32 bg-primary rounded-bl-3xl rounded-tr-lg"></div>
                <div className="h-32 bg-gray-200 rounded-tr-3xl rounded-bl-lg"></div>
                <div className="h-32 bg-gray-900 rounded-tl-3xl rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl mb-8">
            {t('brand_identity_page.digital_branding.title')}
          </h2>
          <p className="text-gray-600 mb-12">
            {t('brand_identity_page.digital_branding.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {(
              t('brand_identity_page.digital_branding.tags', { returnObjects: true }) as string[]
            ).map((tag, i) => (
              <span key={i} className="px-6 py-2 bg-gray-100 rounded-full font-bold text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandIdentity;
