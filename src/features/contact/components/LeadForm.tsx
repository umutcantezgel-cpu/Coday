"use client";
'use client';

import { Button } from '@/shared/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { submitLeadAction } from '../actions/submitLead';
import { leadFormSchema, LeadFormValues } from '../schema/lead';

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, { success: false, error: '' });
  
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

  useEffect(() => {
    if (state.success) {
      window.location.href = '/success';
    }
  }, [state.success]);

  return (
    <form action={formAction} onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">
      
      {state.error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">
          {state.error}
        </div>
      )}

      {/* Honeypot */}
      <input type="text" {...register('address_line_2')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <input
            {...register('name')}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="Jane Doe"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail *</label>
          <input
            {...register('email')}
            type="email"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="jane@company.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Unternehmen</label>
          <input
            {...register('company')}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="Company GmbH"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="+49 170 1234567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Projekt-Typ *</label>
          <select
            {...register('projectType')}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Bitte wählen...</option>
            <option value="Neue Website">Neue Website</option>
            <option value="Redesign">Redesign</option>
            <option value="Headless CMS">Headless CMS</option>
            <option value="SEO/GEO">SEO / GEO</option>
            <option value="Wartung">Wartung / Support</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
          {errors.projectType && <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Budget *</label>
          <select
            {...register('budget')}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="">Bitte wählen...</option>
            <option value="<5k">&lt; 5.000 €</option>
            <option value="5-10k">5.000 € - 10.000 €</option>
            <option value="10-25k">10.000 € - 25.000 €</option>
            <option value="25-50k">25.000 € - 50.000 €</option>
            <option value="50k+">&gt; 50.000 €</option>
            <option value="Unsicher">Noch unsicher</option>
          </select>
          {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Zeitrahmen *</label>
        <select
          {...register('timeframe')}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="">Bitte wählen...</option>
          <option value="ASAP">So schnell wie möglich</option>
          <option value="1-3 Monate">1-3 Monate</option>
          <option value="3-6 Monate">3-6 Monate</option>
          <option value="> 6 Monate">Mehr als 6 Monate</option>
          <option value="Flexibel">Flexibel</option>
        </select>
        {errors.timeframe && <p className="text-red-400 text-sm mt-1">{errors.timeframe.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Projekt-Details *</label>
        <textarea
          {...register('description')}
          rows={5}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          placeholder="Erzähl mir etwas über dein Vorhaben..."
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <div className="flex items-center h-6">
          <input
            type="checkbox"
            value="true"
            {...register('privacyAccepted')}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="text-sm text-gray-400">
          Ich stimme der Verarbeitung meiner Daten laut <a href="/legal/datenschutz" className="text-primary-400 hover:underline">Datenschutzerklärung</a> zu. *
          {errors.privacyAccepted && <p className="text-red-400 text-sm mt-1">{errors.privacyAccepted.message}</p>}
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
