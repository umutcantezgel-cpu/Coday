import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    FilePdf,
    DownloadSimple,
    CheckSquareOffset,
    ArrowRight
} from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import { motion } from 'motion/react';

export const DownloadArea: React.FC = () => {
    const { t } = useTranslation('public-sector');

    const downloads = [
        {
            key: 'lastenheft',
            icon: FilePdf,
            color: 'text-red-500',
            bg: 'bg-red-50 group-hover:bg-red-100'
        },
        {
            key: 'checklist',
            icon: CheckSquareOffset,
            color: 'text-blue-500',
            bg: 'bg-blue-50 group-hover:bg-blue-100'
        }
    ];

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl text-slate-900">
                        {t('downloads.title')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {downloads.map((item, idx) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative overflow-hidden"
                        >
                            <div className="flex items-start gap-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${item.bg}`}>
                                    <OptimizedIcon icon={item.icon} className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {t(`downloads.${item.key}.title`)}
                                    </h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {t(`downloads.${item.key}.desc`)}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                            <OptimizedIcon icon={DownloadSimple} className="w-5 h-5" />
                                            {t(`downloads.${item.key}.button`)}
                                        </button>
                                        <span className="text-xs font-mono text-slate-400">
                                            {t(`downloads.${item.key}.file_info`)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
