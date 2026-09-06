'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  ChatCircleText,
  LockSimple,
  MapPin,
  PaperPlaneRight,
  User,
  WarningCircle,
  Phone,
} from '@phosphor-icons/react/dist/ssr';
import type {
  LeadFormStatus,
  LeadQuickFormErrors,
  LeadQuickFormValues,
} from '../model/useLeadQuickForm';

export interface LeadDistrictOption {
  name: string;
  label: string;
}

interface LeadQuickFormFieldsProps {
  idPrefix: string;
  values: LeadQuickFormValues;
  errors: LeadQuickFormErrors;
  status: LeadFormStatus;
  errorMessage: string | null;
  setValue: <K extends keyof LeadQuickFormValues>(key: K, value: LeadQuickFormValues[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  districts?: LeadDistrictOption[];
  /** Larger tap targets and 16px inputs for the bottom sheet. */
  dense?: boolean;
  privacyHref: string;
  submitLabel?: string;
}

/**
 * The three fields every quick request shares: name, "phone or e-mail" and an
 * optional message. Shared by the card, inline and sheet variants.
 */
export const LeadQuickFormFields: React.FC<LeadQuickFormFieldsProps> = ({
  idPrefix,
  values,
  errors,
  status,
  errorMessage,
  setValue,
  onSubmit,
  districts,
  dense = false,
  privacyHref,
  submitLabel,
}) => {
  const t = useTranslations('lead');
  const submitting = status === 'submitting';

  const fieldClass = `w-full pl-11 pr-4 ${dense ? 'py-3.5 text-base' : 'py-3 text-sm sm:text-base'} bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 disabled:opacity-60`;
  const borderFor = (invalid: boolean) =>
    invalid ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-200';

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate data-lead-form={idPrefix}>
      {/* Honeypot: hidden from humans, filled by bots */}
      <input
        type="text"
        name="_bot_trap_field"
        value={values._bot_trap_field}
        onChange={(e) => setValue('_bot_trap_field', e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-name`} className="sr-only">
          {t('form.name_label')}
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
            <OptimizedIcon icon={User} className="h-5 w-5" />
          </span>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            autoComplete="name"
            enterKeyHint="next"
            value={values.name}
            onChange={(e) => setValue('name', e.target.value)}
            placeholder={t('form.name_placeholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            className={`${fieldClass} ${borderFor(Boolean(errors.name))}`}
            disabled={submitting}
          />
        </div>
        {errors.name && (
          <p id={`${idPrefix}-name-error`} className="ml-1 text-xs font-medium text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-contact`} className="sr-only">
          {t('form.contact_label')}
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
            <OptimizedIcon icon={Phone} className="h-5 w-5" />
          </span>
          <input
            id={`${idPrefix}-contact`}
            type="text"
            name="contact"
            autoComplete="tel email"
            inputMode="email"
            enterKeyHint="next"
            value={values.contact}
            onChange={(e) => setValue('contact', e.target.value)}
            placeholder={t('form.contact_placeholder')}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? `${idPrefix}-contact-error` : undefined}
            className={`${fieldClass} ${borderFor(Boolean(errors.contact))}`}
            disabled={submitting}
          />
        </div>
        {errors.contact && (
          <p id={`${idPrefix}-contact-error`} className="ml-1 text-xs font-medium text-red-600">
            {errors.contact}
          </p>
        )}
      </div>

      {districts && districts.length > 0 && (
        <div className="relative">
          <label htmlFor={`${idPrefix}-district`} className="sr-only">
            {t('form.district_label')}
          </label>
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
            <OptimizedIcon icon={MapPin} className="h-5 w-5" />
          </span>
          <select
            id={`${idPrefix}-district`}
            name="district"
            value={values.district}
            onChange={(e) => setValue('district', e.target.value)}
            className={`${fieldClass} border-slate-200 appearance-none`}
            disabled={submitting}
          >
            <option value="">{t('form.district_placeholder')}</option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="relative">
        <label htmlFor={`${idPrefix}-message`} className="sr-only">
          {t('form.message_label')}
        </label>
        <span className="absolute left-0 top-0 flex items-center pl-4 pt-3.5 text-slate-400 pointer-events-none">
          <OptimizedIcon icon={ChatCircleText} className="h-5 w-5" />
        </span>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={dense ? 3 : 2}
          enterKeyHint="done"
          value={values.message}
          onChange={(e) => setValue('message', e.target.value)}
          placeholder={t('form.message_placeholder')}
          className={`${fieldClass} border-slate-200 resize-none`}
          disabled={submitting}
        />
      </div>

      {status === 'error' && errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <OptimizedIcon icon={WarningCircle} className="h-5 w-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 ${dense ? 'min-h-[54px] py-4 text-base' : 'min-h-[48px] py-3.5 text-sm sm:text-base'} font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2`}
      >
        {submitting ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            <span>{submitLabel ?? t('form.submit')}</span>
            <OptimizedIcon
              icon={PaperPlaneRight}
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>

      <p className="flex items-start gap-1.5 pt-1 text-xs leading-relaxed text-slate-500">
        <OptimizedIcon icon={LockSimple} className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <span>
          {t('form.privacy_notice')}{' '}
          <a href={privacyHref} className="underline underline-offset-2 hover:text-slate-800">
            {t('form.privacy_link')}
          </a>
        </span>
      </p>
    </form>
  );
};
