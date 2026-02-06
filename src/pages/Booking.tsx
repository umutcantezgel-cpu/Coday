import { useTranslation } from 'react-i18next';
import { BookingCalendar } from '@/features/booking';
import { SeoHead } from '@/shared/ui/SeoHead';

export default function Booking() {
  const { t } = useTranslation('booking');
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen">
      <SeoHead title={`${t('page.title')} | Coday`} description={t('page.subtitle')} />
      <h1 className="text-4xl font-black font-display mb-8 text-center bg-gradient-to-r from-aurora-deep to-aurora-sapphire bg-clip-text text-transparent">
        {t('page.title')}
      </h1>
      <p className="text-center text-aurora-charcoal mb-12 max-w-2xl mx-auto">
        {t('page.subtitle')}
      </p>

      <div className="max-w-4xl mx-auto">
        <BookingCalendar className="shadow-2xl border-aurora-mist/50" />
      </div>
    </div>
  );
}
