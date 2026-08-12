'use client';
'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { submitLeadAction } from '../actions/submitLead';
import { leadFormSchema, LeadFormValues } from '../schema/lead';
import { Link, useRouter } from '@/i18n/navigation';

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, {
    success: false,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    // We let the native form action take over to submit FormData to Server Action
  };

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/success');
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-12 max-w-2xl mx-auto bg-surface-base/50 backdrop-blur-md shadow-2xl p-8 md:p-16 rounded-3xl border border-white/10"
      noValidate
    >
      {state.error && (
        <div
          role="alert"
          className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl"
        >
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <input type="text" {...register('address_line_2')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="lead-name"
          label="Name *"
          {...register('name')}
          aria-required="true"
          error={errors.name?.message}
          placeholder="Jane Doe"
        />
        <Input
          id="lead-email"
          label="E-Mail *"
          type="email"
          {...register('email')}
          aria-required="true"
          error={errors.email?.message}
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="lead-company"
          label="Unternehmen"
          {...register('company')}
          placeholder="Company GmbH"
        />
        <Input
          id="lead-phone"
          label="Telefon"
          type="tel"
          {...register('phone')}
          placeholder="+49 170 1234567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="lead-projectType"
            className="block text-sm font-medium text-content-base mb-2"
          >
            Projekt-Typ <span aria-hidden="true">*</span>
          </label>
          <select
            id="lead-projectType"
            {...register('projectType')}
            aria-required="true"
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? 'lead-projectType-error' : undefined}
            className="w-full bg-surface-base rounded-xl border border-border-base px-4 h-14 text-content-base focus:border-action-primary focus:ring-2 focus:ring-action-primary outline-none"
          >
            <option value="">Bitte wählen...</option>
            <option value="Neue Website">Neue Website</option>
            <option value="Redesign">Redesign</option>
            <option value="Headless CMS">Headless CMS</option>
            <option value="SEO/GEO">SEO / GEO</option>
            <option value="Wartung">Wartung / Support</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
          {errors.projectType && (
            <p id="lead-projectType-error" role="alert" className="text-red-400 text-sm mt-1">
              {errors.projectType.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-budget" className="block text-sm font-medium text-content-base mb-2">
            Budget <span aria-hidden="true">*</span>
          </label>
          <select
            id="lead-budget"
            {...register('budget')}
            aria-required="true"
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? 'lead-budget-error' : undefined}
            className="w-full bg-surface-base rounded-xl border border-border-base px-4 h-14 text-content-base focus:border-action-primary focus:ring-2 focus:ring-action-primary outline-none"
          >
            <option value="">Bitte wählen...</option>
            <option value="<5k">&lt; 5.000 €</option>
            <option value="5-10k">5.000 € - 10.000 €</option>
            <option value="10-25k">10.000 € - 25.000 €</option>
            <option value="25-50k">25.000 € - 50.000 €</option>
            <option value="50k+">&gt; 50.000 €</option>
            <option value="Unsicher">Noch unsicher</option>
          </select>
          {errors.budget && (
            <p id="lead-budget-error" role="alert" className="text-red-400 text-sm mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="lead-timeframe"
          className="block text-sm font-medium text-content-base mb-2"
        >
          Zeitrahmen <span aria-hidden="true">*</span>
        </label>
        <select
          id="lead-timeframe"
          {...register('timeframe')}
          aria-required="true"
          aria-invalid={!!errors.timeframe}
          aria-describedby={errors.timeframe ? 'lead-timeframe-error' : undefined}
          className="w-full bg-surface-base rounded-xl border border-border-base px-4 h-14 text-content-base focus:border-action-primary focus:ring-2 focus:ring-action-primary outline-none"
        >
          <option value="">Bitte wählen...</option>
          <option value="ASAP">So schnell wie möglich</option>
          <option value="1-3 Monate">1-3 Monate</option>
          <option value="3-6 Monate">3-6 Monate</option>
          <option value="> 6 Monate">Mehr als 6 Monate</option>
          <option value="Flexibel">Flexibel</option>
        </select>
        {errors.timeframe && (
          <p id="lead-timeframe-error" role="alert" className="text-red-400 text-sm mt-1">
            {errors.timeframe.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lead-description"
          className="block text-sm font-medium text-content-base mb-2"
        >
          Projekt-Details <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="lead-description"
          {...register('description')}
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'lead-description-error' : undefined}
          className="w-full bg-surface-base rounded-xl border border-border-base px-4 py-4 text-content-base focus:border-action-primary focus:ring-2 focus:ring-action-primary outline-none resize-none"
          placeholder="Erzähl mir etwas über dein Vorhaben..."
        />
        {errors.description && (
          <p id="lead-description-error" role="alert" className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <div className="flex items-center h-6">
          <input
            id="lead-privacy"
            type="checkbox"
            value="true"
            {...register('privacyAccepted')}
            aria-required="true"
            aria-invalid={!!errors.privacyAccepted}
            aria-describedby={errors.privacyAccepted ? 'lead-privacy-error' : undefined}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="text-sm text-gray-400">
          <label htmlFor="lead-privacy">
            Ich stimme der Verarbeitung meiner Daten laut{' '}
            <Link href="/legal/datenschutz" className="text-primary-400 hover:underline">
              Datenschutzerklärung
            </Link>{' '}
            zu. <span aria-hidden="true">*</span>
          </label>
          {errors.privacyAccepted && (
            <p id="lead-privacy-error" role="alert" className="text-red-400 text-sm mt-1">
              {errors.privacyAccepted.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          options={{ theme: 'dark' }}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending || !isValid}
        className="w-full py-4 text-lg mt-6"
      >
        {isPending ? 'Wird gesendet...' : 'Kostenlose Strategy Session anfragen'}
      </Button>
    </form>
  );
}
