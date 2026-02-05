import React from 'react';

import { useTranslation } from 'react-i18next';

const AvailabilityGrid: React.FC = () => {
    const { t } = useTranslation('contact');
    // Shows a calendar visualization to create scarcity
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                {t('availability.title', { month: 'März' })}
            </h4>

            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                    <span key={d} className="text-gray-400 font-bold">{d}</span>
                ))}

                {/* Empty days padding (mock) */}
                <span></span><span></span>

                {days.map(day => {
                    // Randomly mark days as "Booked" or "Full"
                    const status = day % 3 === 0 || day % 5 === 0 ? 'booked' : 'free';
                    const isBooked = status === 'booked';

                    return (
                        <div
                            key={day}
                            className={`
                                aspect-square flex items-center justify-center rounded-lg border font-bold relative group
                                ${isBooked ? 'bg-gray-50 border-gray-100 text-gray-300' : 'bg-green-50 border-green-200 text-green-700 cursor-pointer hover:bg-green-100'}
                            `}
                        >
                            {day}

                            {!isBooked && (
                                <div className="hidden group-hover:block absolute bottom-full mb-2 bg-green-600 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                                    {t('availability.tooltip_free')}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-4 text-xs font-bold text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
                    {t('availability.booked')}
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
                    {t('availability.free')}
                </div>
            </div>
        </div>
    );
};

export default AvailabilityGrid;
