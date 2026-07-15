import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

export const SeoAuthorBlock: React.FC = () => {
  const t = useTranslations('blog.seoAuthorBlock');

  return (
    <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-2 border-white/10 relative">
          <OptimizedImage
            src="/images/team/umut-founder.webp"
            alt={t('role')}
            className="w-full h-full object-cover"
            title="Umutcan Emre Tezgel"
          />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t('title')}</h3>
          <p className="text-gray-300 font-medium mb-4">{t('role')}</p>
          <div className="prose prose-invert max-w-none text-gray-400 text-sm md:text-base leading-relaxed">
            <p>{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
