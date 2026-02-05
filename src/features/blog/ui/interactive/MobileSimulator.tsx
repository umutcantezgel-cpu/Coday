import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, XCircle, CheckCircle } from 'lucide-react';
import { clsx } from "clsx";
import { useTranslation, Trans } from 'react-i18next';

export const MobileSimulator: React.FC = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<'bad' | 'good'>('bad');
    const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

    return (
        <div className="my-12 bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Smartphone size={120} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <Smartphone className="text-blue-500" />
                {t('blog:mobileSimulator.title')}
            </h3>

            <div className="flex justify-center gap-4 mb-8 relative z-10">
                <button
                    onClick={() => setMode('bad')}
                    className={clsx(
                        "px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2",
                        mode === 'bad' ? "bg-red-600 text-white shadow-lg shadow-red-900/50" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    )}
                >
                    <XCircle size={18} />
                    {t('blog:mobileSimulator.badMode')}
                </button>
                <button
                    onClick={() => setMode('good')}
                    className={clsx(
                        "px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2",
                        mode === 'good' ? "bg-green-600 text-white shadow-lg shadow-green-900/50" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    )}
                >
                    <CheckCircle size={18} />
                    {t('blog:mobileSimulator.goodMode')}
                </button>
            </div>

            {/* Simulation Viewport */}
            <div className="flex justify-center relative z-10">
                <div className={clsx(
                    "bg-white transition-all duration-500 overflow-hidden relative shadow-xl",
                    device === 'mobile' ? "w-[300px] h-[500px] rounded-[2rem] border-[8px] border-gray-800" : "w-full max-w-2xl h-[400px] rounded-lg border-[12px] border-gray-800"
                )}>
                    {/* Fake Website Content */}
                    <div className="h-full overflow-y-auto bg-white custom-scrollbar">
                        {/* Header */}
                        <div className="bg-slate-900 p-4 flex justify-between items-center text-white sticky top-0 z-20">
                            <div className="font-bold">{t('blog:mobileSimulator.fake.logo')}</div>
                            <div className="text-xs">{t('blog:mobileSimulator.fake.menu')}</div>
                        </div>

                        {/* Hero */}
                        <div className="p-8 text-center bg-slate-50 border-b relative">
                            {mode === 'bad' ? (
                                <div className="space-y-4">
                                    <div className="text-3xl font-serif text-slate-800 leading-tight">{t('blog:mobileSimulator.fake.welcome')}</div>
                                    <p className="text-xs text-slate-500 px-8">{t('blog:mobileSimulator.fake.serving')}</p>
                                    <button className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">{t('blog:mobileSimulator.fake.clickMore')}</button>
                                </div>
                            ) : (
                                <div className="space-y-6 flex flex-col items-center">
                                    <h1 className="text-2xl font-black text-slate-900 leading-none"><Trans i18nKey="blog:mobileSimulator.fake.headline" components={{ span: <span className="text-blue-600" /> }} /></h1>
                                    <p className="text-sm text-slate-600 font-medium">{t('blog:mobileSimulator.fake.subheadline')}</p>
                                    <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                                        {t('blog:mobileSimulator.fake.startNow')}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content Grid */}
                        <div className={clsx("p-4 gap-4", mode === 'bad' ? "block space-y-4" : "grid grid-cols-1 gap-4")}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
                                    <div className="space-y-2 w-full">
                                        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                                        <div className="h-2 bg-slate-100 rounded w-full"></div>
                                    </div>
                                    {mode === 'bad' && (
                                        <button className="text-[8px] border border-blue-600 text-blue-600 px-1 py-0.5 whitespace-nowrap">{t('blog:mobileSimulator.fake.readMore')}</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thumb Zone Overlay (Only in Good Mode on Mobile) */}
                    {mode === 'good' && device === 'mobile' && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500/20 to-transparent pointer-events-none flex items-end justify-center pb-4">
                            <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">{t('blog:mobileSimulator.fake.thumbZone')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-center text-sm text-gray-400">
                <button onClick={() => setDevice(d => d === 'mobile' ? 'desktop' : 'mobile')} className="flex items-center gap-2 hover:text-white transition-colors">
                    {device === 'mobile' ? <Monitor size={16} /> : <Smartphone size={16} />}
                    {device === 'mobile' ? t('blog:mobileSimulator.switchToDesktop') : t('blog:mobileSimulator.switchToMobile')} {t('blog:mobileSimulator.view')}
                </button>
            </div>
        </div>
    );
};
