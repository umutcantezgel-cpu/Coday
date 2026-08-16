'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  PaperPlaneRight,
  CheckCircle,
  WarningCircle,
  User,
  Envelope,
  Phone,
} from '@phosphor-icons/react/dist/ssr';
import { useTranslations, useLocale } from 'next-intl';

export const QuickContactForm: React.FC = () => {
  const t = useTranslations('home');
  const locale = useLocale();
  const isEn = locale === 'en';

  const getText = (key: string, deFallback: string, enFallback: string): string => {
    try {
      const val = t(key);
      if (
        !val ||
        val === key ||
        val === `quick_contact.${key}` ||
        val.startsWith('home.quick_contact') ||
        val.startsWith('quick_contact.')
      ) {
        return isEn ? enFallback : deFallback;
      }
      return val;
    } catch {
      return isEn ? enFallback : deFallback;
    }
  };

  const nameError = getText(
    'quick_contact.errors.name',
    'Bitte geben Sie Ihren Namen ein (min. 2 Zeichen)',
    'Please enter your name (min. 2 characters)'
  );
  const emailError = getText(
    'quick_contact.errors.email',
    'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'Please enter a valid email address'
  );

  const QuickContactSchema = z.object({
    name: z.string().min(2, { message: nameError }),
    email: z.string().email({ message: emailError }),
    phone: z.string().optional(),
    _bot_trap_field: z.string().optional(), // Honeypot
  });

  type QuickContactData = z.infer<typeof QuickContactSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickContactData>({
    resolver: zodResolver(QuickContactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: QuickContactData) => {
    // Basic honeypot check
    if (data._bot_trap_field) {
      setSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await saveLeadInternalAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: 'Lead from Homepage Quick Contact Form',
        source: 'quick_contact',
      });

      if (!result.success) throw new Error(result.error || 'Unknown error');

      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(
        err.message ||
          (isEn
            ? 'An error occurred. Please try again.'
            : 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleText = getText('quick_contact.title', 'Projekt starten', 'Start your project');
  const subtitleText = getText(
    'quick_contact.subtitle',
    'Tragen Sie sich ein und wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    "Leave your details and we'll get back to you within 24 hours."
  );
  const namePlaceholder = getText('quick_contact.name_placeholder', 'Ihr Name', 'Your Name');
  const emailPlaceholder = getText(
    'quick_contact.email_placeholder',
    'Ihre E-Mail-Adresse',
    'Your Email Address'
  );
  const phonePlaceholder = getText(
    'quick_contact.phone_placeholder',
    'Ihre Telefonnummer (optional)',
    'Your Phone Number (optional)'
  );
  const submitText = getText('quick_contact.submit', 'Jetzt anfragen', 'Send Request');
  const successTitle = getText(
    'quick_contact.success_title',
    'Anfrage erhalten!',
    'Request received!'
  );
  const successSubtitle = getText(
    'quick_contact.success_subtitle',
    'Wir haben Ihre Daten erhalten und melden uns in Kürze bei Ihnen.',
    'We have received your details and will be in touch shortly.'
  );
  const newRequestText = getText(
    'quick_contact.new_request',
    'Neue Anfrage senden',
    'Send a new request'
  );

  return (
    <div className="w-full max-w-md p-6 lg:p-8 bg-white border border-slate-200 shadow-xl rounded-[2rem] relative overflow-hidden text-left">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!success ? (
          <m.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-10"
          >
            <div className="mb-6">
              <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">{titleText}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{subtitleText}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                {...register('_bot_trap_field')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <OptimizedIcon icon={User} className="w-5 h-5" />
                  </div>
                  <input
                    id="quick-contact-name"
                    type="text"
                    {...register('name')}
                    placeholder={namePlaceholder}
                    aria-label={namePlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white outline-none transition-colors placeholder:text-slate-400 text-slate-900 shadow-xs"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500 ml-1 font-medium">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <OptimizedIcon icon={Envelope} className="w-5 h-5" />
                  </div>
                  <input
                    id="quick-contact-email"
                    type="email"
                    {...register('email')}
                    placeholder={emailPlaceholder}
                    aria-label={emailPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white outline-none transition-colors placeholder:text-slate-400 text-slate-900 shadow-xs"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-500 ml-1 font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <OptimizedIcon icon={Phone} className="w-5 h-5" />
                  </div>
                  <input
                    id="quick-contact-phone"
                    type="tel"
                    {...register('phone')}
                    placeholder={phonePlaceholder}
                    aria-label={phonePlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white outline-none transition-colors placeholder:text-slate-400 text-slate-900 shadow-xs"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  <OptimizedIcon icon={WarningCircle} className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl shadow-lg shadow-primary-700/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{submitText}</span>
                    <OptimizedIcon
                      icon={PaperPlaneRight}
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </m.div>
        ) : (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center relative z-10"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <OptimizedIcon icon={CheckCircle} className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">{successTitle}</h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">{successSubtitle}</p>
            <button
              onClick={() => setSuccess(false)}
              className="text-primary-700 font-bold hover:text-primary-800 hover:underline text-sm"
            >
              {newRequestText}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
