
import React from 'react';
import { Lightbulb, Share2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface KeyTakeawayItem {
    text: string;
    icon?: 'bulb' | 'check' | 'star';
}

interface KeyTakeawaysProps {
    title?: string;
    items: KeyTakeawayItem[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
    title,
    items
}) => {
    const { t } = useTranslation();
    const displayTitle = title || t('blog:keyTakeaways.title');

    const handleShare = (text: string) => {
        const url = window.location.href;
        const tweet = `${text} via @CodayAgency ${url}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
    };

    return (
        <div className="my-12 p-1 rounded-3xl bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200">
            <div className="bg-white rounded-[20px] p-6 md:p-10 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-50 pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="bg-yellow-100 p-2 rounded-xl text-yellow-600">
                        <Lightbulb size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900">
                        {displayTitle}
                    </h3>
                </div>

                <div className="space-y-4 relative z-10">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                        >
                            <div className="shrink-0 mt-0.5 text-green-500">
                                <CheckCircle size={20} className="fill-green-50" />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-700 font-medium leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                            <button
                                onClick={() => handleShare(item.text)}
                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-full"
                                title="Auf Twitter teilen"
                            >
                                <Share2 size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
