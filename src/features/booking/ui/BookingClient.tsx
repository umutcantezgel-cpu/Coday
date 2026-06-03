"use client";

import { useTranslations } from 'next-intl';
import { BookingCalendar } from '@/features/booking';
import { SeoHead } from '@/shared/ui/SeoHead';

export default function Booking() {
  const t = useTranslations('booking');
  return (
    <main className="pt-24 pb-20 container mx-auto px-4 min-h-dvh">
      <SeoHead
        title={`${t('page.title')} | Coday`}
        description={t('page.subtitle')}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: t('page.title'), url: 'https://www.codayweb.de/booking' },
        ]}
        schemaData={{
          softwareApp: {
            name: 'Coday Booking System',
            description:
              'Online booking system for web development consultations and project kickoffs.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { price: '0', priceCurrency: 'EUR' },
          },
        }}
      />
      <h1 className="text-4xl font-black font-display mb-8 text-center bg-gradient-to-r from-aurora-deep to-aurora-sapphire bg-clip-text text-transparent">
        {t('page.title')}
      </h1>
      <p className="text-center text-aurora-charcoal mb-12 max-w-2xl mx-auto">
        {t('page.subtitle')}
      </p>

      <div className="max-w-4xl mx-auto">
        <BookingCalendar className="shadow-2xl border-aurora-mist/50" />
      </div>
    </main>
  );
}
