'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { X } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { m, AnimatePresence } from 'motion/react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const t = useTranslations('common');
  const { preferences, savePreferences } = useCookieStore();
  const containerRef = useFocusTrap(isOpen);

  // Local state to manage checkboxes before saving
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setLocalPreferences(preferences);
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = () => {
    savePreferences(localPreferences);
    onSave();
  };

  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <m.div
            ref={containerRef as any}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 id="cookie-settings-title" className="text-xl font-bold text-gray-900">
                {t('cookie.settings.title')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors motion-reduce:duration-[0.01ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('close')}
              >
                <OptimizedIcon icon={X} className="text-gray-500" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-600 text-sm">{t('cookie.settings.desc')}</p>

              <div className="space-y-4">
                {/* Essential */}
                <div className="flex items-start gap-4">
                  <input
                    id="cookie-essential"
                    type="checkbox"
                    checked={localPreferences.necessary}
                    disabled
                    className="mt-1 h-4 w-4 shrink-0 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="min-w-0">
                    <label
                      htmlFor="cookie-essential"
                      className="block text-sm font-medium text-gray-900 break-words"
                    >
                      {t('cookie.essential.title')}
                    </label>
                    <p className="text-xs text-gray-500 break-words hyphens-auto">
                      {t('cookie.essential.desc')}
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-4">
                  <input
                    id="cookie-analytics"
                    type="checkbox"
                    checked={localPreferences.analytics}
                    onChange={(e) =>
                      setLocalPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                    className="mt-1 h-4 w-4 shrink-0 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="min-w-0">
                    <label
                      htmlFor="cookie-analytics"
                      className="block text-sm font-medium text-gray-900 break-words"
                    >
                      {t('cookie.analytics.title')}
                    </label>
                    <p className="text-xs text-gray-500 break-words hyphens-auto">
                      {t('cookie.analytics.desc')}
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-4">
                  <input
                    id="cookie-marketing"
                    type="checkbox"
                    checked={localPreferences.marketing}
                    onChange={(e) =>
                      setLocalPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                    }
                    className="mt-1 h-4 w-4 shrink-0 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="min-w-0">
                    <label
                      htmlFor="cookie-marketing"
                      className="block text-sm font-medium text-gray-900 break-words"
                    >
                      {t('cookie.marketing.title')}
                    </label>
                    <p className="text-xs text-gray-500 break-words hyphens-auto">
                      {t('cookie.marketing.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors motion-reduce:duration-[0.01ms]"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors motion-reduce:duration-[0.01ms]"
              >
                {t('save')}
              </button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieSettingsModal;
