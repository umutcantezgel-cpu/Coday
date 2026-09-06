'use client';

import React, { useId } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  CheckCircle,
  Envelope,
  Globe,
  LockSimple,
  MagnifyingGlass,
  Phone,
  WarningCircle,
} from '@phosphor-icons/react/dist/ssr';
import { useLeadQuickForm } from '../model/useLeadQuickForm';

interface WebsiteCheckFormProps {
  source?: string;
  className?: string;
}

/**
 * "Kostenloser Website-Check": website address + e-mail (+ optional phone).
 * The owner reviews the site personally and replies within 24 hours.
 */
export const WebsiteCheckForm: React.FC<WebsiteCheckFormProps> = ({
  source = 'website_check',
  className = '',
}) => {
  const t = useTranslations('lead');
  const locale = useLocale() === 'en' ? 'en' : 'de';
  const idPrefix = `wc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const form = useLeadQuickForm({
    formKind: 'website_check',
    source,
    locale,
    websiteCheck: true,
    project: locale === 'en' ? 'Website check' : 'Website-Check',
    errorMessages: {
      name: t('form.errors.name'),
      contact: t('form.errors.contact'),
      url: t('website_check.errors.url'),
      email: t('website_check.errors.email'),
      generic: t('form.errors.generic'),
    },
  });

  const submitting = form.status === 'submitting';
  const fieldClass =
    'w-full pl-11 pr-4 py-3.5 text-base bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 disabled:opacity-60';
  const borderFor = (invalid: boolean) =>
    invalid ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-200';

  if (form.status === 'success') {
    return (
      <div
        className={`rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8 ${className}`}
        data-lead-form={idPrefix}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <OptimizedIcon icon={CheckCircle} className="h-9 w-9" />
        </div>
        <p className="font-display mb-2 text-2xl font-bold text-slate-900">
          {t('website_check.success.title')}
        </p>
        <p className="text-sm leading-relaxed text-slate-700">
          {t('website_check.success.text', {
            url: form.submitted.url ?? '',
            email: form.submitted.email ?? '',
          })}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7 ${className}`}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
      <form
        onSubmit={form.submit}
        className="relative z-10 space-y-3"
        noValidate
        data-lead-form={idPrefix}
      >
        <input
          type="text"
          name="_bot_trap_field"
          value={form.values._bot_trap_field}
          onChange={(e) => form.setValue('_bot_trap_field', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="space-y-1">
          <label htmlFor={`${idPrefix}-url`} className="text-sm font-semibold text-slate-800">
            {t('website_check.url_label')}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
              <OptimizedIcon icon={Globe} className="h-5 w-5" />
            </span>
            <input
              id={`${idPrefix}-url`}
              type="text"
              name="websiteUrl"
              inputMode="url"
              autoComplete="url"
              enterKeyHint="next"
              value={form.values.websiteUrl}
              onChange={(e) => form.setValue('websiteUrl', e.target.value)}
              placeholder={t('website_check.url_placeholder')}
              aria-invalid={Boolean(form.errors.websiteUrl)}
              className={`${fieldClass} ${borderFor(Boolean(form.errors.websiteUrl))}`}
              disabled={submitting}
            />
          </div>
          {form.errors.websiteUrl && (
            <p className="ml-1 text-xs font-medium text-red-600">{form.errors.websiteUrl}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor={`${idPrefix}-email`} className="text-sm font-semibold text-slate-800">
            {t('website_check.email_label')}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
              <OptimizedIcon icon={Envelope} className="h-5 w-5" />
            </span>
            <input
              id={`${idPrefix}-email`}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              enterKeyHint="next"
              value={form.values.email}
              onChange={(e) => form.setValue('email', e.target.value)}
              placeholder={t('website_check.email_placeholder')}
              aria-invalid={Boolean(form.errors.email)}
              className={`${fieldClass} ${borderFor(Boolean(form.errors.email))}`}
              disabled={submitting}
            />
          </div>
          {form.errors.email && (
            <p className="ml-1 text-xs font-medium text-red-600">{form.errors.email}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor={`${idPrefix}-phone`} className="sr-only">
            {t('website_check.phone_placeholder')}
          </label>
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
            <OptimizedIcon icon={Phone} className="h-5 w-5" />
          </span>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="done"
            value={form.values.phone}
            onChange={(e) => form.setValue('phone', e.target.value)}
            placeholder={t('website_check.phone_placeholder')}
            className={`${fieldClass} border-slate-200`}
            disabled={submitting}
          />
        </div>

        {form.status === 'error' && form.errorMessage && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <OptimizedIcon icon={WarningCircle} className="h-5 w-5 flex-shrink-0" />
            <span>{form.errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-4 text-base font-bold text-white shadow-lg shadow-amber-700/25 transition-all hover:bg-amber-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          {submitting ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <OptimizedIcon icon={MagnifyingGlass} className="h-5 w-5" />
              <span>{t('website_check.submit')}</span>
            </>
          )}
        </button>

        <p className="flex items-start gap-1.5 pt-1 text-xs leading-relaxed text-slate-500">
          <OptimizedIcon icon={LockSimple} className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>
            {t('form.privacy_notice')}{' '}
            <a
              href={`/${locale}/legal/datenschutz`}
              className="underline underline-offset-2 hover:text-slate-800"
            >
              {t('form.privacy_link')}
            </a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default WebsiteCheckForm;
