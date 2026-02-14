import React from 'react';

import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/shared/ui/SeoHead';

const AiDisclaimer = () => {
  const { t } = useTranslation('legal');
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen">
      <SeoHead
        title={`${t('disclaimer.title')} | Coday`}
        description={t('disclaimer.intro.content').substring(0, 150) + '...'}
      />
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
        <h1 className="text-4xl font-black font-display mb-8 text-secondary">
          {t('disclaimer.title')}
        </h1>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {t('disclaimer.intro.title')}
            </h2>
            <p>{t('disclaimer.intro.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {t('disclaimer.analysis.title')}
            </h2>
            <p>{t('disclaimer.analysis.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {t('disclaimer.content.title')}
            </h2>
            <p>{t('disclaimer.content.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {t('disclaimer.liability.title')}
            </h2>
            <p>{t('disclaimer.liability.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {t('disclaimer.copyright.title')}
            </h2>
            <p>{t('disclaimer.copyright.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AiDisclaimer;
