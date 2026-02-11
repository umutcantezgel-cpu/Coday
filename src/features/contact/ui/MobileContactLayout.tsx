import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import BookingCalendar from '../../booking/ui/BookingCalendar';
import ApplicationWizard from '../ApplicationWizard';
import { Icon } from '@/shared/ui/Icon';

export const MobileContactLayout: React.FC = () => {
  const { t } = useTranslation('contact');
  const [activeTab, setActiveTab] = useState<'booking' | 'contact'>('booking');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Tabs */}
      <div className="sticky top-[70px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="grid grid-cols-2 p-1 gap-1">
          <button
            onClick={() => setActiveTab('booking')}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all relative overflow-hidden
              ${activeTab === 'booking' ? 'text-primary' : 'text-slate-500 hover:bg-gray-50'}
            `}
          >
            {activeTab === 'booking' && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon
              name="calendar_today"
              className={activeTab === 'booking' ? 'text-primary' : 'text-slate-400'}
            />
            <span className="relative z-10">{t('mobile.tabs.booking', 'Termin buchen')}</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all relative overflow-hidden
              ${activeTab === 'contact' ? 'text-purple-600' : 'text-slate-500 hover:bg-gray-50'}
            `}
          >
            {activeTab === 'contact' && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-purple-50 rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon
              name="mail"
              className={activeTab === 'contact' ? 'text-purple-600' : 'text-slate-400'}
            />
            <span className="relative z-10">{t('mobile.tabs.contact', 'Nachricht')}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'booking' ? (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h1 className="font-display font-bold text-2xl text-secondary mb-2">
                  {t('hero.title_start')}
                </h1>
                <p className="text-slate-600">
                  {t(
                    'mobile.booking_intro',
                    'Wählen Sie einen passenden Termin für ein unverbindliches Erstgespräch.'
                  )}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <BookingCalendar />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h1 className="font-display font-bold text-2xl text-secondary mb-2">
                  {t('mobile.contact_title', 'Projekt anfragen')}
                </h1>
                <p className="text-slate-600">
                  {t(
                    'mobile.contact_intro',
                    'Erzählen Sie uns von Ihrem Vorhaben. Wir melden uns binnen 24h.'
                  )}
                </p>
              </div>
              <ApplicationWizard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Footer / Trust Signals */}
      <div className="px-6 py-8 text-center border-t border-gray-100 mt-8">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">
          {t('trust.label', 'Bekannt aus')}
        </p>
        <div className="flex justify-center gap-6 grayscale opacity-40">
          <span className="font-bold text-slate-400">{t('trust.google')}</span>
          <span className="font-bold text-slate-400">{t('trust.shopify')}</span>
          <span className="font-bold text-slate-400">{t('trust.facebook')}</span>
        </div>
      </div>
    </div>
  );
};
