'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@/shared/ui/Icon';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { useTranslations, useLocale } from 'next-intl';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { formatCurrency } from '@/shared/utils/formatters';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { trackEvent } from '@/shared/lib/analytics/tracking';

type WizardFormData = {
  project?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  privacy: boolean;
  website?: string; // Honeypot
};

export const ApplicationWizard: React.FC = () => {
  const t = useTranslations('form');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStarted, setFormStarted] = useState(false);

  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const getPackageName = useCalculatorStore((state) => state.getPackageName);
  const getSummaryText = useCalculatorStore((state) => state.getSummaryText);
  const getSelectedModules = useCalculatorStore((state) => state.getSelectedModules);
  const getTotalOneTime = useCalculatorStore((state) => state.getTotalOneTime);
  const getTotalMonthly = useCalculatorStore((state) => state.getTotalMonthly);

  const hasPackage = !!selectedPackageId;

  const WizardSchema = z.object({
    project: z
      .string()
      .optional()
      .refine((val) => hasPackage || (val && val.trim().length > 0), {
        message: t('wizard.validation.required'),
      }),
    name: z.string().min(2, { message: t('wizard.validation.min_length') }),
    email: z.string().email({
      message: t('wizard.validation.email'),
    }),
    phone: z.string().optional(),
    message: z.string().optional(),
    website: z.string().optional(), // honeypot
    privacy: z.boolean().refine((val) => val === true, {
      message: t('wizard.validation.privacy'),
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WizardFormData>({
    resolver: zodResolver(WizardSchema),
    mode: 'onBlur',
    defaultValues: {
      project: hasPackage ? getPackageName() || '' : '',
      name: '',
      email: '',
      phone: '',
      message: '',
      privacy: false,
      website: '', // honeypot
    },
  });

  const submittedEmail = watch('email');
  const submittedName = watch('name');

  // Track form abandon
  useEffect(() => {
    return () => {
      if (formStarted && !success) {
        trackEvent('form_abandon', { event_category: 'lead_form' });
      }
    };
  }, [formStarted, success]);

  // Handle form interaction for form_start
  const handleInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('form_start', { event_category: 'lead_form' });
    }
  };

  const onSubmit = async (data: WizardFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Honeypot check
      if (data.website && data.website.trim() !== '') {
        console.warn('Bot detected via honeypot');
        setSuccess(true); // Silently succeed
        return;
      }

      let fullMessage = `Lead from simplified form.\n\nNachricht: ${data.message || '-'}\nTelefon: ${data.phone || '-'}`;
      if (hasPackage) {
        fullMessage = `${getSummaryText()}\n\nNachricht: ${data.message || '-'}\nTelefon: ${data.phone || '-'}`;
      }

      const dbMessage = `${fullMessage}\n\nProject: ${data.project || getPackageName() || 'N/A'}\nSource: ${hasPackage ? 'Package Flow' : 'Simplified Contact'}`;

      const result = await saveLeadInternalAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: dbMessage,
      });

      if (!result.success) throw new Error(result.error || 'Unknown error');

      trackEvent('form_submit', { event_category: 'lead_form' });

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : t('wizard.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      trackEvent('discovery_call_booked', { eventData: e.data, event_category: 'lead' });
    },
  });

  // Package Summary
  const renderPackageSummary = () => {
    if (!hasPackage) return null;
    const packageName = getPackageName();
    const selectedModules = getSelectedModules();
    const totalOneTime = getTotalOneTime();
    const totalMonthly = getTotalMonthly();

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-5 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="check_circle" className="text-primary" />
            <span className="font-bold text-gray-900">{t('wizard.package_summary.title')}</span>
          </div>
          <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
            {packageName}
          </span>
        </div>
        <div className="space-y-1.5">
          {selectedModules.slice(0, 5).map((mod) => (
            <div key={mod.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{mod.name}</span>
              <span className="text-gray-900 font-medium">
                {formatCurrency(mod.priceInCents / 100, 'EUR', locale)}
              </span>
            </div>
          ))}
          {selectedModules.length > 5 && (
            <p className="text-xs text-gray-500">
              +{selectedModules.length - 5} {t('wizard.package_summary.more')}
            </p>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-primary/10 flex justify-between font-bold text-sm">
          <span className="text-gray-700">{t('wizard.package_summary.total')}</span>
          <div className="text-right">
            <span className="text-gray-900">
              {formatCurrency(totalOneTime / 100, 'EUR', locale)}
            </span>
            {totalMonthly > 0 && (
              <span className="text-gray-500 font-normal text-xs ml-2">
                + {formatCurrency(totalMonthly / 100, 'EUR', locale)}/mo
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  useCalendlyEventListener({
    onEventScheduled: (_e) => {
      trackEvent('discovery_call_booked', { event_category: 'lead_form', event_label: 'Calendly' });
    },
  });

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 md:p-12 text-center shadow-xl border border-gray-100"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.success.calendly_title')}
        </h3>
        <p className="text-gray-600 mb-8">{t('wizard.success.calendly_desc')}</p>
        <div className="w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 mb-8">
          <InlineWidget
            url="https://calendly.com/coday-beratung/30min"
            prefill={{
              email: submittedEmail,
              name: submittedName,
            }}
            styles={{ height: '650px', width: '100%' }}
          />
        </div>

        {/* Value Delivery & Social Proof */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Icon name="download" className="text-primary w-5 h-5" />
              Bonus: 47-Punkte-Audit PDF
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Laden Sie sich unsere Checkliste herunter, um Ihre aktuelle Website noch vor unserem
              Gespräch zu analysieren.
            </p>
            <a
              href="/assets/pdf/47-punkte-audit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 transition-colors motion-reduce:duration-[0.01ms]"
            >
              Jetzt herunterladen <Icon name="arrow_forward" size="sm" />
            </a>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <div className="flex gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600 italic mb-3">
              "Seit dem Relaunch durch das Team von Codayweb hat sich unsere Konversionsrate
              verdreifacht. Der Discovery-Call war bereits ein enormer Mehrwert!"
            </p>
            <div className="text-xs font-bold text-gray-900">— Michael R., Geschäftsführer</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 md:px-8 py-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">
          {hasPackage ? t('wizard.title_package') : t('wizard.title_direct')}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{t('wizard.subtitle')}</p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleInteraction}
        className="p-4 md:p-8 space-y-6"
      >
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
        </div>

        {renderPackageSummary()}

        {!hasPackage && (
          <div className="space-y-2" role="radiogroup" aria-labelledby="project-type-label">
            <label id="project-type-label" className="text-sm font-medium text-gray-700">
              {t('wizard.step1.project_type.label')}
            </label>
            <select
              {...register('project')}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all motion-reduce:duration-[0.01ms] bg-white appearance-none ${
                errors.project
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100'
              }`}
            >
              <option value="">{t('wizard.step1.project_type.placeholder')}</option>
              <option value="webdesign">{t('wizard.step1.project_type.options.webdesign')}</option>
              <option value="webapp">{t('wizard.step1.project_type.options.webapp')}</option>
              <option value="ecommerce">{t('wizard.step1.project_type.options.ecommerce')}</option>
              <option value="audit">{t('wizard.step1.project_type.options.audit')}</option>
            </select>
            {errors.project && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
                <Icon name="warning" className="w-4 h-4" />
                <p>{errors.project.message}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="wizard-name" className="text-sm font-medium text-gray-700">
              {t('wizard.step3.name.label')}
            </label>
            <input
              id="wizard-name"
              {...register('name')}
              className={`w-full px-4 py-3 min-h-[48px] rounded-xl border outline-none transition-all motion-reduce:duration-[0.01ms] ${
                errors.name
                  ? 'border-red-500 ring-1 ring-red-500 bg-red-50/10'
                  : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100'
              }`}
              placeholder={t('wizard.step3.name.placeholder')}
              autoComplete="name"
            />
            {errors.name && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
                <Icon name="warning" className="w-4 h-4" />
                <p>{errors.name.message}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="wizard-email" className="text-sm font-medium text-gray-700">
              {t('wizard.step3.email.label')}
            </label>
            <input
              id="wizard-email"
              {...register('email')}
              type="email"
              className={`w-full px-4 py-3 min-h-[48px] rounded-xl border outline-none transition-all motion-reduce:duration-[0.01ms] ${
                errors.email
                  ? 'border-red-500 ring-1 ring-red-500 bg-red-50/10'
                  : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100'
              }`}
              placeholder={t('wizard.step3.email.placeholder')}
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
                <Icon name="warning" className="w-4 h-4" />
                <p>{errors.email.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="wizard-phone" className="text-sm font-medium text-gray-700">
              {t('wizard.step3.phone.label')}
            </label>
            <input
              id="wizard-phone"
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 min-h-[48px] rounded-xl border border-gray-200 outline-none transition-all motion-reduce:duration-[0.01ms] focus:border-primary focus:ring-2 focus:ring-blue-100"
              placeholder={t('wizard.step3.phone.placeholder')}
              autoComplete="tel"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="wizard-message" className="text-sm font-medium text-gray-700">
              {t('wizard.step3.message.label')}
            </label>
            <textarea
              id="wizard-message"
              {...register('message')}
              rows={2}
              className="w-full px-4 py-3 min-h-[48px] rounded-xl border border-gray-200 outline-none transition-all motion-reduce:duration-[0.01ms] focus:border-primary focus:ring-2 focus:ring-blue-100"
              placeholder={t('wizard.step3.message.placeholder')}
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacy')}
              className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <span className="text-sm text-gray-500">{t('wizard.step3.privacy.label')}</span>
          </label>
          {errors.privacy && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500 text-sm">
              <Icon name="warning" className="w-4 h-4" />
              <p>{errors.privacy.message}</p>
            </div>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2"
          >
            <Icon name="alert-triangle" />
            {error}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="active:scale-[0.97] w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-700 transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Icon name="loader" className="animate-spin motion-reduce:animate-none" size="sm" />
                {t('wizard.buttons.submitting')}
              </>
            ) : (
              <>
                {t('wizard.buttons.submit_next')}
                <Icon name="calendar_today" size="sm" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationWizard;
