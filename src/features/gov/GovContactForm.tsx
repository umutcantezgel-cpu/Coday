import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
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
} from '@phosphor-icons/react';
import { useSearchParams } from 'react-router-dom';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';
import { supabase } from '@/shared/lib/supabase/client';

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
});

type GovContactData = z.infer<typeof GovContactSchema>;

export const GovContactForm: React.FC = () => {
  const { t } = useTranslation('public-sector');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Get type from URL search params safely
  const typeParam = searchParams.get('type');
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
    const currentType = searchParams.get('type');
    if (currentType && ['direct', 'uvgo', 'vgv', 'open'].includes(currentType)) {
      setValue('type', currentType as any);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: GovContactData) => {
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

      // 1. Insert into Supabase
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.authority,
          message: fullMessage,
          source: 'Public Sector Page',
        },
      ]);

      if (dbError) throw new Error(dbError.message);

      // 2. Trigger Edge Function (fire-and-forget for UI speed, or await if critical)
      // Re-using existing endpoint
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/send-lead`, {
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
      });

      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
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
          className="text-blue-600 font-bold hover:underline"
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
        {/* Authority & Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={Buildings} className="text-blue-500" />
              {t('request_quote.fields.authority')}
            </label>
            <input
              {...register('authority')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="z.B. Stadtverwaltung Musterstadt"
            />
            {errors.authority && <p className="text-red-500 text-xs">{errors.authority.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={IdentificationCard} className="text-blue-500" />
              Ihr Name
            </label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="Vorname Nachname"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={Envelope} className="text-blue-500" />
              Behörden E-Mail
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="name@stadt.de"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={Phone} className="text-blue-500" />
              Telefon (Durchwahl)
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="+49 ..."
            />
          </div>
        </div>

        {/* Project Specifics */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={CalendarCheck} className="text-blue-500" />
              {t('request_quote.fields.year.label')}
            </label>
            <select
              {...register('year')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
            >
              {['2024', '2025', 'later'].map((opt) => (
                <option key={opt} value={opt}>
                  {t(`request_quote.fields.year.options.${opt}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <OptimizedIcon icon={Gavel} className="text-blue-500" />
              {t('request_quote.fields.type.label')}
            </label>
            <select
              {...register('type')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
            >
              {['direct', 'uvgo', 'vgv', 'open'].map((opt) => (
                <option key={opt} value={opt}>
                  {t(`request_quote.fields.type.options.${opt}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <OptimizedIcon icon={SpinnerGap} className="animate-spin w-5 h-5" />
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
