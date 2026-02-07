import React from 'react';
import LegalLayout from "../../widgets/layout/LegalLayout";


import { useTranslation } from 'react-i18next';

const Terms: React.FC = () => {
    const { t } = useTranslation('legal');
    const tocItems = [
        { id: 'geltung', label: t('terms.toc.geltung') },
        { id: 'vertrag', label: t('terms.toc.vertrag') },
        { id: 'leistung', label: t('terms.toc.leistung') },
        { id: 'preise', label: t('terms.toc.preise') },
        { id: 'ki', label: t('terms.toc.ki') },
        { id: 'haftung', label: t('terms.toc.haftung') },
        { id: 'schluss', label: t('terms.toc.schluss') },
    ];

    return (
        <LegalLayout
            title={t('terms.title')}
            lastUpdated={t('terms.last_updated', { date: '04.02.2026' })}
            tocItems={tocItems}
        >
            <section id="geltung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.1.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.1.p1')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.1.p2')}
                </p>
            </section>

            <section id="vertrag" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.2.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.2.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.2.p2')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.2.p3')}
                </p>
            </section>

            <section id="leistung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.3.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.3.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.3.p2')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.3.p3')}
                </p>
            </section>

            <section id="preise" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.4.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.4.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.4.p2')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.4.p3')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.4.p4')}
                </p>
            </section>

            <section id="ki" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.5.title')}</h2>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-amber-800 font-medium m-0">
                        {t('terms.sections.5.note')}
                    </p>
                </div>

                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.5.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.5.p2')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.5.p3')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.5.p4')}
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                    <li>{t('terms.sections.5.list.1', { defaultValue: 'Finanzielle Entscheidungen' })}</li>
                    <li>{t('terms.sections.5.list.2', { defaultValue: 'Geschäftliche Strategien' })}</li>
                    <li>{t('terms.sections.5.list.3', { defaultValue: 'Rechtliche Maßnahmen' })}</li>
                    <li>{t('terms.sections.5.list.4', { defaultValue: 'Gesundheitsbezogene Entscheidungen' })}</li>
                </ul>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.5.p5')}
                </p>
            </section>

            <section id="haftung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.6.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.6.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.6.p2')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.6.p3')}
                </p>
            </section>

            <section id="schluss" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{t('terms.sections.7.title')}</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.7.p1')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.7.p2')}
                </p>
                <p className="leading-relaxed text-gray-600 mb-4">
                    {t('terms.sections.7.p3')}
                </p>
                <p className="leading-relaxed text-gray-600">
                    {t('terms.sections.7.p4')} <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">umut@codayweb.de</a>
                </p>
            </section>
        </LegalLayout>
    );
};

export default Terms;
