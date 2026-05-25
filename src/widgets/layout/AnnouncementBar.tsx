import React from 'react';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Confetti as Celebration } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

const AnnouncementBar: React.FC = () => {
  const t = useTranslations('common');
  return (
    <div className="bg-primary text-white relative z-sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-center gap-4 text-sm font-medium">
          <span className="flex items-center">
            <OptimizedIcon icon={Celebration} className="text-lg mr-2" />
            {t('announcement.text', {
              defaultValue: 'Grand Opening: 25% Rabatt auf alle Projekte!',
            })}
          </span>
          <Link
            href="/packages"
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-xs font-bold transition-colors"
          >
            {t('announcement.cta', { defaultValue: 'Angebot sichern →' })}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
