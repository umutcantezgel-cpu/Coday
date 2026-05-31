'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { X } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="cookie-settings-title" className="text-xl font-bold text-gray-900">
            {t('cookie.settings.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors motion-reduce:duration-[0.01ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('common.close')}
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
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div>
                <label
                  htmlFor="cookie-essential"
                  className="block text-sm font-medium text-gray-900"
                >
                  {t('cookie.essential.title')}
                </label>
                <p className="text-xs text-gray-500">{t('cookie.essential.desc')}</p>
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
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div>
                <label
                  htmlFor="cookie-analytics"
                  className="block text-sm font-medium text-gray-900"
                >
                  {t('cookie.analytics.title')}
                </label>
                <p className="text-xs text-gray-500">{t('cookie.analytics.desc')}</p>
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
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div>
                <label
                  htmlFor="cookie-marketing"
                  className="block text-sm font-medium text-gray-900"
                >
                  {t('cookie.marketing.title')}
                </label>
                <p className="text-xs text-gray-500">{t('cookie.marketing.desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors motion-reduce:duration-[0.01ms]"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors motion-reduce:duration-[0.01ms]"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;
