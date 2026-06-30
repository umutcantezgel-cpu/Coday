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
} from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

const QuickContactSchema = z.object({
  name: z.string().min(2, { message: 'Bitte gib deinen Namen ein.' }),
  email: z.string().email({ message: 'Bitte gib eine gültige E-Mail ein.' }),
  phone: z.string().optional(),
  _bot_trap_field: z.string().optional(), // Honeypot
});

type QuickContactData = z.infer<typeof QuickContactSchema>;

export const QuickContactForm: React.FC = () => {
  const t = useTranslations('home'); // or 'contact' if needed
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
      // Display the actual error for debugging
      setError(`Fehler: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 lg:p-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-[40px] pointer-events-none" />

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
              <h3 className="font-display font-bold text-2xl text-secondary-900 mb-2">
                Projekt starten
              </h3>
              <p className="text-secondary-600 text-sm">
                Trag dich ein und wir melden uns innerhalb von 24 Stunden bei dir.
              </p>
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
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400">
                    <OptimizedIcon icon={User} className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Dein Name"
                    className="w-full pl-11 pr-4 py-3 bg-white/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-400 text-secondary-900"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400">
                    <OptimizedIcon icon={Envelope} className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Deine E-Mail"
                    className="w-full pl-11 pr-4 py-3 bg-white/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-400 text-secondary-900"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-400">
                    <OptimizedIcon icon={Phone} className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Telefonnummer (optional)"
                    className="w-full pl-11 pr-4 py-3 bg-white/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-400 text-secondary-900"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                  <OptimizedIcon icon={WarningCircle} className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Jetzt anfragen
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
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <OptimizedIcon icon={CheckCircle} className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-secondary-900 mb-2">
              Anfrage erhalten!
            </h3>
            <p className="text-secondary-600 mb-6">
              Wir haben deine Daten erhalten und melden uns in Kürze bei dir.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="text-primary-600 font-bold hover:underline"
            >
              Neue Anfrage senden
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
