import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@/shared/ui/Icon';
import { supabase } from '@/shared/lib/supabase/client';
import { useTranslation } from 'react-i18next';
import { useCalculatorStore } from '../../features/calculator/model/store';
import { formatCurrency } from '@/shared/utils/formatters';

// Define types based on our local schema to ensure type safety with the form
type WizardFormData = {
  project?: string;
  message: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  privacy: boolean;
  source?: string;
};

export const ApplicationWizard: React.FC = () => {
  const { t, i18n } = useTranslation('form');
  const locale = i18n.language;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stepHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const radioRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Focus management for step changes
  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [currentStep]);

  // Get calculator store data
  const selectedPackageId = useCalculatorStore((state) => state.selectedPackageId);
  const getPackageName = useCalculatorStore((state) => state.getPackageName);
  const getSummaryText = useCalculatorStore((state) => state.getSummaryText);
  const getSelectedModules = useCalculatorStore((state) => state.getSelectedModules);
  const getTotalOneTime = useCalculatorStore((state) => state.getTotalOneTime);
  const getTotalMonthly = useCalculatorStore((state) => state.getTotalMonthly);

  const hasPackage = !!selectedPackageId;

  // Dual-mode steps: if coming from flow, skip project type selection
  const STEPS = useMemo(
    () =>
      hasPackage
        ? [
            { id: 'details', title: t('wizard.steps.details') },
            { id: 'contact', title: t('wizard.steps.contact') },
          ]
        : [
            { id: 'scope', title: t('wizard.steps.scope') },
            { id: 'details', title: t('wizard.steps.details') },
            { id: 'contact', title: t('wizard.steps.contact') },
          ],
    [t, hasPackage]
  );

  const WizardSchema = useMemo(
    () =>
      z.object({
        project: hasPackage
          ? z.string().optional().default('')
          : z.string().min(1, { message: t('wizard.validation.required') }),
        message: z.string().min(10, { message: t('wizard.validation.min_length', { count: 10 }) }),
        name: z.string().min(2, { message: t('wizard.validation.min_length', { count: 2 }) }),
        email: z.string().email({ message: t('wizard.validation.email') }),
        company: z.string().optional(),
        phone: z.string().optional(),
        source: z.string().optional(),
        privacy: z.boolean().refine((val) => val === true, {
          message: t('wizard.validation.privacy'),
        }),
      }),
    [t, hasPackage]
  );

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(WizardSchema),
    defaultValues: {
      project: hasPackage ? getPackageName() || '' : '',
      source: hasPackage ? 'package-flow' : 'contact-direct',
      message: '',
      name: '',
      email: '',
      company: '',
      phone: '',
      privacy: false,
    },
  });

  // Update message with summary when package/modules change
  React.useEffect(() => {
    if (hasPackage) {
      const summary = getSummaryText();
      // Only set if it's not already there to avoid overwriting user input loop
      // But actually, we want the summary to be the *start* of the message usually.
      // Let's just set the default value or update it.
      // A safe way is to set it as the initial value or just append it visually?
      // The user request "im Nachrichten Fenster gespeichert sein" implies it should be editable text.

      const currentMessage = watch('message');
      if (!currentMessage || currentMessage.trim() === '') {
        setValue(
          'message',
          summary + '\n\n---\n\n' + (t('wizard.step2.requirements.placeholder') || '')
        );
      }
    }
  }, [hasPackage, getSummaryText, setValue, t, watch]);

  const onSubmit = async (rawData: Record<string, unknown>) => {
    const data = rawData as WizardFormData;
    setIsSubmitting(true);
    setError(null);

    try {
      // Message already contains the summary if the user didn't delete it
      // But for safety, if it's completely missing, we could re-add it?
      // Only if hasPackage and it's not present.
      // For now, trust the form data since we pre-fill it.

      let fullMessage = data.message;

      // Fallback: If user deleted the details but still has a package selected, force append it?
      // User said "also sent along".
      if (hasPackage && !fullMessage.includes('Paket:')) {
        const summaryText = getSummaryText();
        fullMessage = `${summaryText}\n\n---\n\n${fullMessage}`;
      }

      // 1. Insert into Supabase
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: `${fullMessage}\n\nProject: ${data.project || getPackageName() || 'N/A'}\nSource: ${hasPackage ? 'Package Flow' : 'Direct Contact'}`,
        },
      ]);

      if (dbError) throw new Error(dbError.message);

      // 2. Send Email via Supabase Function (Edge)
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          ...data,
          message: fullMessage,
          project: data.project || getPackageName(),
        }),
      });

      if (!response.ok) {
        console.warn('Email sending failed (Edge function error), but lead saved to DB.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError((err as Error).message || t('wizard.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let isValid = false;
    if (hasPackage) {
      // Flow mode: step 0 = details, step 1 = contact
      if (currentStep === 0) {
        isValid = await trigger(['message']);
      }
    } else {
      // Direct mode: step 0 = scope, step 1 = details
      if (currentStep === 0) {
        isValid = await trigger(['project']);
      } else if (currentStep === 1) {
        isValid = await trigger(['message']);
      }
    }

    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 text-center shadow-xl border border-green-100"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="check_circle" className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('wizard.success.title')}</h3>
        <p className="text-gray-600 mb-8">{t('wizard.success.message')}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors font-medium"
        >
          {t('wizard.success.back_home')}
        </button>
      </motion.div>
    );
  }

  // Render package summary card when coming from flow
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
            <span className="font-bold text-gray-900">
              {t('wizard.package_summary.title', { defaultValue: 'Ihre Auswahl' })}
            </span>
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
              +{selectedModules.length - 5}{' '}
              {t('wizard.package_summary.more', { defaultValue: 'weitere Module' })}
            </p>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-primary/10 flex justify-between font-bold text-sm">
          <span className="text-gray-700">
            {t('wizard.package_summary.total', { defaultValue: 'Gesamt' })}
          </span>
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

  // Determine which UI step to render based on mode
  const renderScopeStep = () => (
    <motion.div
      key="step-scope"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, { offset }) => {
        const swipe = offset.x;
        if (swipe < -50) {
          nextStep();
        } else if (swipe > 50) {
          prevStep();
        }
      }}
      className="space-y-6 touch-pan-y"
    >
      <h3
        ref={stepHeadingRef}
        tabIndex={-1}
        className="text-xl font-bold text-gray-900 outline-none"
      >
        {t('wizard.step1.title')}
      </h3>

      {/* Project Type */}
      <div
        className="space-y-2"
        role="radiogroup"
        aria-labelledby="project-type-label"
        aria-describedby={errors.project ? 'error-project' : undefined}
      >
        <label id="project-type-label" className="text-sm font-medium text-gray-700">
          {t('wizard.step1.project_type.label')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['webdesign', 'webapp', 'ecommerce', 'audit'].map((type, index) => (
            <div
              key={type}
              ref={(el) => {
                radioRefs.current[index] = el;
              }}
              role="radio"
              aria-checked={watch('project') === type}
              tabIndex={watch('project') === type || (!watch('project') && index === 0) ? 0 : -1}
              onClick={() => {
                setValue('project', type);
                radioRefs.current[index]?.focus();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setValue('project', type);
                }

                // Arrow Key Navigation
                const total = 4; // 4 options
                let nextIndex = index;

                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  nextIndex = (index + 1) % total;
                  setValue('project', ['webdesign', 'webapp', 'ecommerce', 'audit'][nextIndex]);
                  radioRefs.current[nextIndex]?.focus();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  nextIndex = (index - 1 + total) % total;
                  setValue('project', ['webdesign', 'webapp', 'ecommerce', 'audit'][nextIndex]);
                  radioRefs.current[nextIndex]?.focus();
                }
              }}
              className={`
                p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 outline-none focus:ring-2 focus:ring-primary focus:border-primary
                ${watch('project') === type ? 'border-primary bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}
              `}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${watch('project') === type ? 'border-primary' : 'border-gray-300'}`}
              >
                {watch('project') === type && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="font-medium text-gray-700">
                {t(`wizard.step1.project_type.options.${type}`)}
              </span>
            </div>
          ))}
        </div>
        {errors.project && (
          <p id="error-project" className="text-red-500 text-sm">
            {errors.project.message}
          </p>
        )}
      </div>
    </motion.div>
  );

  const renderDetailsStep = () => (
    <motion.div
      key="step-details"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, { offset }) => {
        if (offset.x < -50) nextStep();
        else if (offset.x > 50) prevStep();
      }}
      className="space-y-6 touch-pan-y"
    >
      <h3
        ref={stepHeadingRef}
        tabIndex={-1}
        className="text-xl font-bold text-gray-900 outline-none"
      >
        {t('wizard.step2.title')}
      </h3>
      {renderPackageSummary()}
      <div className="space-y-2">
        <label htmlFor="wizard-message" className="text-sm font-medium text-gray-700">
          {t('wizard.step2.requirements.label')}
        </label>
        <textarea
          id="wizard-message"
          {...register('message')}
          aria-describedby={errors.message ? 'error-message' : undefined}
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
          placeholder={t('wizard.step2.requirements.placeholder')}
        ></textarea>
        {errors.message && (
          <p id="error-message" className="text-red-500 text-sm">
            {errors.message.message}
          </p>
        )}
        <p className="text-xs text-gray-500 text-right">
          {watch('message')?.length || 0} {t('wizard.step2.chars')}
        </p>
      </div>
    </motion.div>
  );

  const renderContactStep = () => (
    <motion.div
      key="step-contact"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, { offset }) => {
        // Last step, maybe prevent swipe next? Or submit?
        // Let's only allow swipe back to avoid accidental submissions
        if (offset.x > 50) prevStep();
      }}
      className="space-y-6 touch-pan-y"
    >
      <h3
        ref={stepHeadingRef}
        tabIndex={-1}
        className="text-xl font-bold text-gray-900 outline-none"
      >
        {t('wizard.step3.title')}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="wizard-name" className="text-sm font-medium text-gray-700">
            {t('wizard.step3.name.label')}
          </label>
          <input
            id="wizard-name"
            {...register('name')}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder={t('wizard.step3.name.placeholder')}
            autoComplete="name"
          />
          {errors.name && (
            <p id="error-name" className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="wizard-company" className="text-sm font-medium text-gray-700">
            {t('wizard.step3.company.label')}
          </label>
          <input
            id="wizard-company"
            {...register('company')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder={t('wizard.step3.company.placeholder')}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="wizard-email" className="text-sm font-medium text-gray-700">
            {t('wizard.step3.email.label')}
          </label>
          <input
            id="wizard-email"
            {...register('email')}
            type="email"
            aria-describedby={errors.email ? 'error-email' : undefined}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder={t('wizard.step3.email.placeholder')}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && (
            <p id="error-email" className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="wizard-phone" className="text-sm font-medium text-gray-700">
            {t('wizard.step3.phone.label')}
          </label>
          <input
            id="wizard-phone"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder={t('wizard.step3.phone.placeholder')}
            autoComplete="tel"
            inputMode="tel"
            type="tel"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('privacy')}
            className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <span className="text-sm text-gray-500">
            {t('wizard.step3.privacy.label')}
            <br />
            {t('wizard.step3.privacy.hint')}
          </span>
        </label>
        {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>}
      </div>

      {/* Delivery time notice */}
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
        <Icon name="speed" className="text-primary text-lg" />
        <div>
          <p className="text-sm font-bold text-gray-900">
            {t('wizard.delivery.title', { defaultValue: 'Lieferung in 7–14 Tagen' })}
          </p>
          <p className="text-xs text-gray-600">
            {t('wizard.delivery.desc', {
              defaultValue: 'Alle Projekte werden innerhalb von 7–14 Tagen geliefert.',
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Determine current step content based on mode
  const getCurrentStepContent = () => {
    if (hasPackage) {
      // Flow mode: 0 = details, 1 = contact
      if (currentStep === 0) return renderDetailsStep();
      if (currentStep === 1) return renderContactStep();
    } else {
      // Direct mode: 0 = scope, 1 = details, 2 = contact
      if (currentStep === 0) return renderScopeStep();
      if (currentStep === 1) return renderDetailsStep();
      if (currentStep === 2) return renderContactStep();
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress Bar */}
      {/* Progress Bar */}
      <div className="bg-gray-50 px-4 md:px-8 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex gap-2">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${idx === currentStep ? 'bg-primary text-white' : idx < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                `}
              >
                {idx < currentStep ? <Icon name="check" size="sm" /> : idx + 1}
              </div>
              <span
                className={`text-sm font-medium ${idx === currentStep ? 'text-gray-900' : 'text-gray-400'} hidden sm:block`}
              >
                {step.title}
              </span>
              {idx < STEPS.length - 1 && (
                <div className="w-8 h-px bg-gray-200 mx-2 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          {t('wizard.progress', { current: currentStep + 1, total: STEPS.length })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8">
        <AnimatePresence mode="wait">
          {getCurrentStepContent()}

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <Icon name="alert-triangle" />
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                {t('wizard.buttons.back')}
              </button>
            ) : (
              <div />
            )}

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition-colors flex items-center gap-2"
              >
                {t('wizard.buttons.next')}
                <Icon name="arrow_forward" size="sm" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-primary/25 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="loader" className="animate-spin" size="sm" />
                    {t('wizard.buttons.submitting')}
                  </>
                ) : (
                  <>
                    {t('wizard.buttons.submit')}
                    <Icon name="send" size="sm" />
                  </>
                )}
              </button>
            )}
          </div>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default ApplicationWizard;
