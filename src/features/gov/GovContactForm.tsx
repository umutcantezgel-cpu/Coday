'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import {
  PaperPlaneRight,
  Buildings,
  CalendarCheck,
  Gavel,
  IdentificationCard,
  Envelope,
  Phone,
  CheckCircle,
  SpinnerGap,
} from '@phosphor-icons/react/dist/ssr';
import { useSearchParams } from 'next/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';

// Schema for Gov Inquiries
const GovContactSchema = z.object({
  authority: z.string().min(2, 'Name der Behörde ist erforderlich'),
  name: z.string().min(2, 'Ihr Name ist erforderlich'),
  email: z
    .string()
    .email('Gültige E-Mail erforderlich')
    .refine(
      (email) => email.endsWith('.de') || email.endsWith('.eu'),
      'Bitte nutzen Sie eine offizielle Behörden-Mail (.de/.eu)'
    ),
  phone: z.string().optional(),
  year: z.enum(['2024', '2025', 'later']),
  type: z.enum(['direct', 'uvgo', 'vgv', 'open']),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

type GovContactData = z.infer<typeof GovContactSchema>;

export const GovContactForm: React.FC = () => {
  const t = useTranslations('public-sector');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Get type from URL search params safely
  const typeParam = searchParams?.get('type') ?? null;
  const defaultType = (
    typeParam && ['direct', 'uvgo', 'vgv', 'open'].includes(typeParam) ? typeParam : 'uvgo'
  ) as 'direct' | 'uvgo' | 'vgv' | 'open';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GovContactData>({
    resolver: zodResolver(GovContactSchema),
    defaultValues: {
      year: '2024',
      type: defaultType,
    },
  });

  // Sync form whenever URL param changes
  React.useEffect(() => {
    const currentType = searchParams?.get('type') ?? null;
    if (currentType && ['direct', 'uvgo', 'vgv', 'open'].includes(currentType)) {
      setValue('type', currentType as GovContactData['type']);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: GovContactData) => {
    // Phase 19: Honeypot check for spam protection
    if (data.honeypot) {
      console.warn('Bot submission detected and prevented.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Format message for generic lead structure
      const fullMessage = `
            🏛️ BEHÖRDEN-ANFRAGE
            -------------------
            Behörde: ${data.authority}
            Haushaltsjahr: ${t(`request_quote.fields.year.options.${data.year}`)}
            Verfahren: ${t(`request_quote.fields.type.options.${data.type}`)}
            
            Nachricht:
            ${data.message || 'Keine zusätzliche Nachricht'}
            `;

      // 1. Insert into Supabase via Server Action
      const result = await saveLeadInternalAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.authority,
        message: fullMessage,
        source: 'Public Sector Page',
      });

      if (!result.success) throw new Error(result.error || 'Unknown error saving lead');

      // 2. Trigger Edge Function (fire-and-forget for UI speed, or await if critical)
      // Re-using existing endpoint
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        fetch(`${supabaseUrl}/functions/v1/send-lead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            ...data,
            company: data.authority,
            message: fullMessage,
            project: 'Public Sector Inquiry',
          }),
        }).catch((err) => console.error('Edge function error:', err));
      }

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <OptimizedIcon icon={CheckCircle} className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Anfrage erhalten</h3>
        <p className="text-slate-600 mb-6">
          Wir haben Ihre Anfrage erfasst und melden uns in Kürze telefonisch oder per E-Mail bei
          Ihnen.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="active:scale-[0.97] text-blue-600 font-bold hover:underline"
        >
          Neue Anfrage stellen
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8"
    >
      <div className="mb-8 pb-6 border-b border-slate-100">
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
          {t('request_quote.title')}
        </h3>
        <p className="text-slate-500 text-sm">
          Fordern Sie ein unverbindliches Angebot für Ihr Vergabeverfahren an.
        </p>
      </div>

      <div className="space-y-6">
        {/* Phase 19: Honeypot Field */}
        <input
          type="text"
          {...register('honeypot')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Authority & Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="authority"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={Buildings} className="text-blue-500" />
              {t('request_quote.fields.authority')}
            </label>
            <input
              id="authority"
              {...register('authority')}
              aria-invalid={!!errors.authority}
              aria-describedby={errors.authority ? 'error-authority' : undefined}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms]"
              placeholder="z.B. Stadtverwaltung Musterstadt"
            />
            {errors.authority && (
              <p id="error-authority" role="alert" className="text-red-500 text-xs">
                {errors.authority.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={IdentificationCard} className="text-blue-500" />
              Ihr Name
            </label>
            <input
              id="name"
              {...register('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'error-name' : undefined}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms]"
              placeholder="Vorname Nachname"
            />
            {errors.name && (
              <p id="error-name" role="alert" className="text-red-500 text-xs">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={Envelope} className="text-blue-500" />
              Behörden E-Mail
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms]"
              placeholder="name@stadt.de"
            />
            {errors.email && (
              <p id="error-email" role="alert" className="text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={Phone} className="text-blue-500" />
              Telefon (Durchwahl)
            </label>
            <input
              id="phone"
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms]"
              placeholder="+49 ..."
            />
          </div>
        </div>

        {/* Project Specifics */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <label
              htmlFor="year"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={CalendarCheck} className="text-blue-500" />
              {t('request_quote.fields.year.label')}
            </label>
            <select
              id="year"
              {...register('year')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms] bg-white"
            >
              {['2024', '2025', 'later'].map((opt) => (
                <option key={opt} value={opt}>
                  {t(`request_quote.fields.year.options.${opt}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="type"
              className="text-sm font-bold text-slate-700 flex items-center gap-2"
            >
              <OptimizedIcon icon={Gavel} className="text-blue-500" />
              {t('request_quote.fields.type.label')}
            </label>
            <select
              id="type"
              {...register('type')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition motion-reduce:duration-[0.01ms] bg-white"
            >
              {['direct', 'uvgo', 'vgv', 'open'].map((opt) => (
                <option key={opt} value={opt}>
                  {t(`request_quote.fields.type.options.${opt}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="active:scale-[0.97] w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <OptimizedIcon
                icon={SpinnerGap}
                className="animate-spin w-5 h-5 motion-reduce:animate-none"
              />
              Wird gesendet...
            </>
          ) : (
            <>
              <OptimizedIcon icon={PaperPlaneRight} className="w-5 h-5" />
              {t('request_quote.cta')}
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 mt-4">
          Durch das Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{' '}
          <a href="/legal/datenschutz" className="underline hover:text-slate-600">
            Datenschutzerklärung
          </a>{' '}
          zu.
        </p>
      </div>
    </form>
  );
};
