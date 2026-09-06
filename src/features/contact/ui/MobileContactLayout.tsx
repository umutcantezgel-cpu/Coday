'use client';
import React, { useState, Suspense } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Quotes, Star, Calendar, Envelope } from '@phosphor-icons/react/dist/ssr';
import { Skeleton } from '@/shared/ui/Skeleton';

// Same boundary as ContactClient so the wizard is one chunk, not two.
const ApplicationWizard = dynamic(() => import('@/features/contact/ApplicationWizard'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" />,
});
// Only fetched when the booking tab is opened. The skeleton matches the calendar's
// initial height on phones (p-4, steps nav, heading, date cards) so nothing shifts.
const BookingCalendar = dynamic(() => import('@/features/booking/ui/BookingCalendar'), {
  ssr: false,
  loading: () => (
    <div
      className="h-[260px] md:h-[340px] w-full animate-pulse rounded-2xl bg-slate-100"
      aria-hidden="true"
    />
  ),
});
import { DirectContactCard } from '@/features/contact/ui/DirectContactCard';

export const MobileContactLayout: React.FC = () => {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const hasPackage = !!selectedPackageId || !!searchParams?.get('package');

  const [userTab, setUserTab] = useState<'booking' | 'contact' | null>(null);
  // The message form is the lowest-commitment action, so it is the default.
  // The calendar stays one tap away and can be requested with ?tab=booking.
  const activeTab =
    userTab ?? (!hasPackage && searchParams?.get('tab') === 'booking' ? 'booking' : 'contact');

  return (
    <div className="min-h-dvh bg-gray-50 pb-20">
      {/* Content Area */}
      <div className="px-4 py-6 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'booking' ? (
            <m.div
              key="booking"
              id="tabpanel-booking"
              role="tabpanel"
              aria-labelledby="tab-booking"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-secondary mb-2 text-balance">
                  {t('hero.title_start')}
                </h2>
                <p className="text-slate-600">{t('mobile.booking_intro')}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <BookingCalendar />
              </div>
            </m.div>
          ) : (
            <m.div
              key="contact"
              id="tabpanel-contact"
              role="tabpanel"
              aria-labelledby="tab-contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-secondary mb-2 text-balance">
                  {t('mobile.contact_title')}
                </h2>
                <p className="text-slate-600">{t('mobile.contact_intro')}</p>
              </div>
              <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-2xl" />}>
                <ApplicationWizard />
              </Suspense>
              <div className="mt-6">
                <DirectContactCard />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 py-8 border-t border-gray-100 mt-8 bg-white mb-24">
        <div className="bg-gray-50 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <OptimizedIcon icon={Quotes} className="text-4xl text-primary w-8 h-8" weight="fill" />
          </div>
          <p className="text-gray-600 italic mb-4 relative z-10 text-sm">
            "{t('testimonial.text')}"
          </p>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {t('testimonial.author').charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-xs">{t('testimonial.author')}</div>
              <div className="text-[10px] text-gray-500">{t('testimonial.role')}</div>
            </div>
            <div className="ml-auto flex text-yellow-400 text-[10px] gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <OptimizedIcon key={i} icon={Star} weight="fill" className="w-2.5 h-2.5" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Tabs */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pb-safe safe-area-bottom">
        <div
          role="tablist"
          aria-label={t('mobile.tabs.booking')}
          className="grid grid-cols-2 p-2 gap-2"
        >
          <button
            id="tab-booking"
            role="tab"
            aria-selected={activeTab === 'booking'}
            aria-controls="tabpanel-booking"
            onClick={() => setUserTab('booking')}
            className={`active:scale-[0.97] 
              flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl text-xs font-bold transition motion-reduce:duration-[0.01ms] relative overflow-hidden
              ${activeTab === 'booking' ? 'text-primary' : 'text-slate-500 hover:bg-gray-50'}
            `}
          >
            {activeTab === 'booking' && (
              <m.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <OptimizedIcon
              icon={Calendar}
              className={`text-xl w-5 h-5 mb-0.5 ${activeTab === 'booking' ? 'text-primary' : 'text-slate-400'}`}
            />
            <span className="relative z-10">{t('mobile.tabs.booking')}</span>
          </button>

          <button
            id="tab-contact"
            role="tab"
            aria-selected={activeTab === 'contact'}
            aria-controls="tabpanel-contact"
            onClick={() => setUserTab('contact')}
            className={`active:scale-[0.97] 
              flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl text-xs font-bold transition motion-reduce:duration-[0.01ms] relative overflow-hidden
              ${activeTab === 'contact' ? 'text-purple-600' : 'text-slate-500 hover:bg-gray-50'}
            `}
          >
            {activeTab === 'contact' && (
              <m.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-purple-50 rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <OptimizedIcon
              icon={Envelope}
              className={`text-xl w-5 h-5 mb-0.5 ${activeTab === 'contact' ? 'text-purple-600' : 'text-slate-400'}`}
            />
            <span className="relative z-10">{t('mobile.tabs.contact')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
