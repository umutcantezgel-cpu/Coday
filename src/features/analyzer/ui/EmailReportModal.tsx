import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Envelope, PaperPlaneRight, X, CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { sendEmailReport, isValidEmail } from '../lib/emailService';
import type { AnalysisResult } from '../model/types';
import { useTranslation } from 'react-i18next';

interface EmailReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export const EmailReportModal: React.FC<EmailReportModalProps> = ({ isOpen, onClose, result }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('analyzer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError(
        t('input.error_invalid_email', {
          defaultValue: 'Bitte gib eine gültige E-Mail-Adresse ein.',
        })
      );
      return;
    }

    setIsSending(true);
    setError(null);

    const shareUrl = `${window.location.origin}${window.location.pathname}?audit=${result.id}`;

    const sendResult = await sendEmailReport({
      recipientEmail: email,
      recipientName: name || 'Interessent',
      reportUrl: shareUrl,
      domain: result.domain,
      overallScore: result.overallScore,
      urgencyScore: result.urgencyScore,
      t,
    });

    setIsSending(false);

    if (sendResult.success) {
      setIsSent(true);
      setTimeout(() => {
        onClose();
        setIsSent(false);
        setEmail('');
        setName('');
      }, 2000);
    } else {
      setError(sendResult.error || t('modal.error_sending'));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isSent ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('modal.success_title')}</h3>
                <p className="text-gray-600">{t('modal.success_message')}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Envelope className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{t('modal.title')}</h3>
                      <p className="text-sm text-gray-500">{t('modal.subtitle')}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('modal.label_name')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('modal.placeholder_name')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('modal.label_email')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('modal.placeholder_email')}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <CircleNotch className="w-5 h-5 animate-spin" />
                        <span>{t('modal.button_sending')}</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneRight className="w-5 h-5" />
                        <span>{t('modal.button_send')}</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">{t('modal.privacy_note')}</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailReportModal;
