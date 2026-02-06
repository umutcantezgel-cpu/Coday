import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, X, CheckCircle, Loader2 } from 'lucide-react';
import { sendEmailReport, isValidEmail } from '../lib/emailService';
import type { AnalysisResult } from '../model/types';

interface EmailReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: AnalysisResult;
}

export const EmailReportModal: React.FC<EmailReportModalProps> = ({
    isOpen,
    onClose,
    result,
}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError('Bitte gib eine gültige E-Mail-Adresse ein.');
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
            setError(sendResult.error || 'Fehler beim Senden');
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
                                <h3 className="text-xl font-bold text-gray-900 mb-2">E-Mail geöffnet!</h3>
                                <p className="text-gray-600">Dein E-Mail-Programm sollte sich geöffnet haben.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Report per E-Mail</h3>
                                            <p className="text-sm text-gray-500">Sende den Report an deine E-Mail</p>
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
                                            Name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Dein Name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            E-Mail-Adresse *
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="deine@email.de"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-600 text-sm">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Wird gesendet...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Report senden</span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Wir speichern deine E-Mail-Adresse nicht.
                                </p>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmailReportModal;
