import React from 'react';
import { useTranslations } from 'next-intl';
import LogoLoop from '@/shared/ui/LogoLoop';
import { clientLogos } from '@/shared/data/clientLogos';

export const LogoBarSection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="py-[var(--space-section)] bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400">
          {t('logobar.title')}
        </p>
      </div>

      <div className="w-full">
        <LogoLoop logos={clientLogos} speed={30} logoHeight={48} gap={64} pauseOnHover={true} />
      </div>
    </section>
  );
};
