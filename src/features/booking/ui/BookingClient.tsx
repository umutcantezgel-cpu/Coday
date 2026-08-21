'use client';

import { useTranslations } from 'next-intl';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { BookingCalendar } from '@/features/booking';

export default function Booking() {
  const t = useTranslations('booking');
  return (
    <main className="pt-4 pb-16 md:pt-6 md:pb-20 container mx-auto px-4 min-h-dvh">
      <h1 className="text-4xl font-black font-display mb-8 text-center bg-gradient-to-r from-aurora-deep to-aurora-sapphire bg-clip-text text-transparent">
        {t('page.title')}
      </h1>
      <p className="text-center text-aurora-charcoal mb-12 max-w-2xl mx-auto">
        {t('page.subtitle')}
      </p>

      <div className="max-w-4xl mx-auto">
        <BookingCalendar className="shadow-2xl border-aurora-mist/50" />
      </div>

      <SeoContentBlock title={t('seoText.title')} text={t('seoText.content')} />
    </main>
  );
}
