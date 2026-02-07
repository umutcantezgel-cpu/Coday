import React from 'react';
import LegalLayout from "../../widgets/layout/LegalLayout";


import { useTranslation } from 'react-i18next';

const Impressum: React.FC = () => {
  const { t } = useTranslation('legal');
  const tocItems = [
    { id: 'anbieter', label: t('impressum.toc.anbieter') },
    { id: 'vertreter', label: t('impressum.toc.vertreter') },
    { id: 'haftung', label: t('impressum.toc.haftung') },
  ];

  return (
    <LegalLayout title={t('impressum.title')} tocItems={tocItems}>
      <p className="font-medium text-gray-500 mb-8">{t('impressum.subtitle')}</p>

      <section id="anbieter" className="scroll-mt-32">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-4">{t('impressum.provider.title')}</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              <strong className="text-gray-900">{t('impressum.provider.name')}</strong><br />
              {t('impressum.provider.address')}
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-4">{t('impressum.contact.title')}</h3>
            <p className="text-gray-700 leading-relaxed">
              {t('impressum.contact.phone')} <a href="tel:+4917641195301" className="text-primary hover:underline">+49 176 41195301</a><br />
              {t('impressum.contact.email')} <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">umut@codayweb.de</a><br />
              {t('impressum.contact.web')} <a href="https://www.codayweb.de" className="text-primary hover:underline">www.codayweb.de</a>
            </p>
          </div>
        </div>
      </section>

      <section id="vertreter" className="scroll-mt-32">
        <div className="mb-12 space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{t('impressum.representative.title')}</h3>
            <p className="text-gray-700">{t('impressum.representative.name')}</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{t('impressum.profession.title')}</h3>
            <p className="text-gray-700">
              {t('impressum.profession.desc')}
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{t('impressum.tax.title')}</h3>
            <p className="text-gray-700">
              {t('impressum.tax.number')}
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-100 my-10" />

      <section id="haftung" className="scroll-mt-32">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">{t('impressum.liability.title')}</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">{t('impressum.liability.content.title')}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('impressum.liability.content.desc')}
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">{t('impressum.liability.images.title')}</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('impressum.liability.images.desc')}
            </p>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default Impressum;
