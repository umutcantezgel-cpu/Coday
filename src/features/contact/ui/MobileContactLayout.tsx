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
      {/* Content Area */}
      <div className="px-4 py-6 pb-32">
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

      <div className="px-4 py-8 border-t border-gray-100 mt-8 bg-white mb-24">
        <div className="bg-gray-50 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Icon name="format_quote" className="text-4xl text-primary w-8 h-8" weight="fill" />
          </div>
          <p className="text-gray-600 italic mb-4 relative z-10 text-sm">"{t('testimonial.text')}"</p>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {t('testimonial.author').charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-xs">{t('testimonial.author')}</div>
              <div className="text-[10px] text-gray-500">{t('testimonial.role')}</div>
            </div>
            <div className="ml-auto flex text-yellow-400 text-[10px] gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Icon key={i} name="star" weight="fill" className="w-2.5 h-2.5" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Tabs */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pb-safe safe-area-bottom">
        <div className="grid grid-cols-2 p-2 gap-2">
          <button
            onClick={() => setActiveTab('booking')}
            className={`
              flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl text-xs font-bold transition-all relative overflow-hidden
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
              className={`text-xl mb-0.5 ${activeTab === 'booking' ? 'text-primary' : 'text-slate-400'}`}
            />
            <span className="relative z-10">{t('mobile.tabs.booking', 'Termin')}</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`
              flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl text-xs font-bold transition-all relative overflow-hidden
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
              className={`text-xl mb-0.5 ${activeTab === 'contact' ? 'text-purple-600' : 'text-slate-400'}`}
            />
            <span className="relative z-10">{t('mobile.tabs.contact', 'Anfrage')}</span>
          </button>
        </div>
      </div>
    </div>

  );
};
