import React from 'react';
import { useTranslations } from 'next-intl';
import LogoLoop from '@/shared/ui/LogoLoop';
import { clientLogos } from '@/shared/data/clientLogos';

export const TrustBar: React.FC = () => {
  const t = useTranslations('common');

  return (
    <section className="py-[var(--space-section)] border-y border-gray-100 bg-white/50 relative overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
      <div className="w-full text-center relative z-10">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-8">
          {t('generic_detail.trust.title')}
        </p>
        <LogoLoop logos={clientLogos} speed={30} logoHeight={48} gap={64} pauseOnHover={true} />
      </div>
    </section>
  );
};
