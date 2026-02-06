import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@/shared/ui/Icon';
import { supabase } from '@/shared/lib/supabase/client';
import { useTranslation } from 'react-i18next';
// Keep reference to base schema if needed for type inference, but we will redefine specific validation messages
// import { LeadApiSchema } from '@/shared/lib/validation/schemas';

// Define types based on our local schema to ensure type safety with the form
type WizardFormData = {
  project: string;
  budget: string;
  timeline: string;
  message: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  privacy: boolean;
  source?: string;
};

export const ApplicationWizard: React.FC = () => {
  const { t } = useTranslation('form');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const STEPS = useMemo(
    () => [
      { id: 'scope', title: t('wizard.steps.scope') },
      { id: 'details', title: t('wizard.steps.details') },
      { id: 'contact', title: t('wizard.steps.contact') },
    ],
    [t]
  );

  const WizardSchema = useMemo(
    () =>
      z.object({
        project: z.string().min(1, { message: t('wizard.validation.required') }),
        budget: z.string().min(1, { message: t('wizard.validation.required') }),
        timeline: z.string().min(1, { message: t('wizard.validation.required') }),
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
    [t]
  );

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<WizardFormData>({
    resolver: zodResolver(WizardSchema),
    defaultValues: {
      budget: '',
      timeline: '',
      project: '',
      source: 'contact-wizard',
    },
  });

  const onSubmit = async (data: WizardFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Insert into Supabase
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          project: data.project,
          budget: data.budget,
          timeline: data.timeline,
          source: 'wizard',
          metadata: {
            privacy_accepted: true,
            user_agent: navigator.userAgent,
          },
        },
      ]);

      if (dbError) throw new Error(dbError.message);

      // 2. Send Email via API
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.warn('Email sending failed, but lead saved to DB.');
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || t('wizard.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await trigger(['project', 'budget', 'timeline']);
    } else if (currentStep === 1) {
      isValid = await trigger(['message']);
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

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
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

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900">{t('wizard.step1.title')}</h3>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('wizard.step1.project_type.label')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['webdesign', 'webapp', 'ecommerce', 'audit'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setValue('project', type)}
                      className={`
                                                p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3
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
                {errors.project && <p className="text-red-500 text-sm">{errors.project.message}</p>}
              </div>

              {/* Budget & Timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step1.budget.label')}
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">{t('wizard.step1.budget.placeholder')}</option>
                    <option value="5k-10k">{t('wizard.step1.budget.options.5k-10k')}</option>
                    <option value="10k-25k">{t('wizard.step1.budget.options.10k-25k')}</option>
                    <option value="25k-50k">{t('wizard.step1.budget.options.25k-50k')}</option>
                    <option value="50k+">{t('wizard.step1.budget.options.50k+')}</option>
                  </select>
                  {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step1.timeline.label')}
                  </label>
                  <select
                    {...register('timeline')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">{t('wizard.step1.timeline.placeholder')}</option>
                    <option value="asap">{t('wizard.step1.timeline.options.asap')}</option>
                    <option value="1-3months">
                      {t('wizard.step1.timeline.options.1-3months')}
                    </option>
                    <option value="3-6months">
                      {t('wizard.step1.timeline.options.3-6months')}
                    </option>
                    <option value="planning">{t('wizard.step1.timeline.options.planning')}</option>
                  </select>
                  {errors.timeline && (
                    <p className="text-red-500 text-sm">{errors.timeline.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900">{t('wizard.step2.title')}</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('wizard.step2.requirements.label')}
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  placeholder={t('wizard.step2.requirements.placeholder')}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                <p className="text-xs text-gray-400 text-right">
                  {watch('message')?.length || 0} {t('wizard.step2.chars')}
                </p>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900">{t('wizard.step3.title')}</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step3.name.label')}
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder={t('wizard.step3.name.placeholder')}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step3.company.label')}
                  </label>
                  <input
                    {...register('company')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder={t('wizard.step3.company.placeholder')}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step3.email.label')}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder={t('wizard.step3.email.placeholder')}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('wizard.step3.phone.label')}
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder={t('wizard.step3.phone.placeholder')}
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
                {errors.privacy && (
                  <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>
                )}
              </div>
            </motion.div>
          )}

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
