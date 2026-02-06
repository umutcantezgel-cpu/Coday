import React from 'react';
import { LegalLayout } from '../../widgets/layout/LegalLayout';

import { useTranslation } from 'react-i18next';

const Privacy: React.FC = () => {
  const { t } = useTranslation('legal');
  const tocItems = [
    { id: 'verantwortlicher', label: t('privacy.toc.verantwortlicher') },
    { id: 'erhebung', label: t('privacy.toc.erhebung') },
    { id: 'cookies', label: t('privacy.toc.cookies') },
    { id: 'ki-dienste', label: t('privacy.toc.ki_dienste') },
    { id: 'auftragsverarbeiter', label: t('privacy.toc.auftragsverarbeiter') },
    { id: 'rechte', label: t('privacy.toc.rechte') },
    { id: 'sicherheit', label: t('privacy.toc.sicherheit') },
  ];

  return (
    <LegalLayout
      title={t('privacy.title')}
      subtitle={t('privacy.subtitle')}
      lastUpdated={t('privacy.last_updated', { date: '04.02.2026' })}
      tocItems={tocItems}
    >
      <p className="text-lg text-gray-600 leading-relaxed mb-8">{t('privacy.intro')}</p>

      <section id="verantwortlicher" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.1.title')}
        </h2>
        <p>{t('privacy.sections.1.content')}</p>
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 my-6">
          <p className="font-bold text-gray-900 m-0">Umutcan Emre Tezgel</p>
          <p className="m-0">
            Lessingstraße 4<br />
            35578 Wetzlar
            <br />
            Deutschland
          </p>
          <p className="mt-4 mb-0">
            <strong>E-Mail:</strong>{' '}
            <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">
              umut@codayweb.de
            </a>
            <br />
            <strong>Telefon:</strong> +49 176 41195301
            <br />
            <strong>Website:</strong>{' '}
            <a href="https://www.codayweb.de" className="text-primary hover:underline">
              www.codayweb.de
            </a>
          </p>
        </div>
      </section>

      <section id="erhebung" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.2.title')}
        </h2>
        <h4 className="font-bold text-gray-900 mt-6 mb-3">{t('privacy.sections.2.a.title')}</h4>
        <p>{t('privacy.sections.2.a.content')}</p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-4">
          <li>IP-Adresse / IP Address</li>
          <li>Datum & Uhrzeit / Date & Time</li>
          <li>URL / Request URL</li>
          <li>Referrer URL</li>
          <li>Browser / User Agent</li>
        </ul>

        <h4 className="font-bold text-gray-900 mt-8 mb-3">{t('privacy.sections.2.b.title')}</h4>
        <p>{t('privacy.sections.2.b.content')}</p>

        <h4 className="font-bold text-gray-900 mt-8 mb-3">{t('privacy.sections.2.c.title')}</h4>
        <p>{t('privacy.sections.2.c.content')}</p>

        <h4 className="font-bold text-gray-900 mt-8 mb-3">{t('privacy.sections.2.d.title')}</h4>
        <p>{t('privacy.sections.2.d.content')}</p>
      </section>

      <section id="cookies" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.3.title')}
        </h2>
        <p>{t('privacy.sections.3.content')}</p>

        <div className="space-y-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">
              {t('privacy.sections.3.necessary.title')}
            </h4>
            <p className="text-sm text-gray-600 m-0">{t('privacy.sections.3.necessary.desc')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">
              {t('privacy.sections.3.functional.title')}
            </h4>
            <p className="text-sm text-gray-600 m-0">{t('privacy.sections.3.functional.desc')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">
              {t('privacy.sections.3.analytics.title')}
            </h4>
            <p className="text-sm text-gray-600 m-0">{t('privacy.sections.3.analytics.desc')}</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">{t('privacy.sections.3.note')}</p>
      </section>

      <section id="ki-dienste" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.4.title')}
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-medium m-0">{t('privacy.sections.4.note')}</p>
        </div>

        <h4 className="font-bold text-gray-900 mt-6 mb-3">
          {t('privacy.sections.4.gemini.title')}
        </h4>
        <p>{t('privacy.sections.4.gemini.content')}</p>

        <h4 className="font-bold text-gray-900 mt-6 mb-3">
          {t('privacy.sections.4.perplexity.title')}
        </h4>
        <p>{t('privacy.sections.4.perplexity.content')}</p>

        <h4 className="font-bold text-gray-900 mt-6 mb-3">
          {t('privacy.sections.4.disclaimer.title')}
        </h4>
        <p className="text-gray-600">{t('privacy.sections.4.disclaimer.content')}</p>
      </section>

      <section id="auftragsverarbeiter" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.5.title')}
        </h2>
        <p>{t('privacy.sections.5.content')}</p>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">
                  {t('privacy.sections.5.table.headers.provider')}
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">
                  {t('privacy.sections.5.table.headers.purpose')}
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">
                  {t('privacy.sections.5.table.headers.location')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {['vercel', 'supabase', 'google', 'perplexity'].map((proc) => (
                <tr key={proc}>
                  <td className="py-3 px-4">
                    {t(`privacy.sections.5.table.rows.${proc}.provider`)}
                  </td>
                  <td className="py-3 px-4">
                    {t(`privacy.sections.5.table.rows.${proc}.purpose`)}
                  </td>
                  <td className="py-3 px-4">
                    {t(`privacy.sections.5.table.rows.${proc}.location`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="rechte" className="scroll-mt-32 mb-16">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.6.title')}
        </h2>
        <p className="mb-4">{t('privacy.sections.6.content')}</p>
        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 space-y-3">
          {['art15', 'art16', 'art17', 'art18', 'art20', 'art21'].map((right) => (
            <div className="flex" key={right}>
              <span className="font-bold text-primary w-24 flex-shrink-0">
                {t(`privacy.sections.6.rights.${right}.title`)}
              </span>
              <span>{t(`privacy.sections.6.rights.${right}.desc`)}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {t('privacy.sections.6.contact')}{' '}
          <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">
            umut@codayweb.de
          </a>
        </p>
      </section>

      <section id="sicherheit" className="scroll-mt-32">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {t('privacy.sections.7.title')}
        </h2>
        <p>{t('privacy.sections.7.content')}</p>
        <p className="mt-4 text-sm text-gray-500">
          Bei Fragen zur Datensicherheit kontaktieren Sie uns unter:{' '}
          <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">
            umut@codayweb.de
          </a>
        </p>
      </section>
    </LegalLayout>
  );
};

export default Privacy;
