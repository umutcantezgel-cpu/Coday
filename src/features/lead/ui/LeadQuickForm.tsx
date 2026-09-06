'use client';

import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Link as NavLink } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle, Phone, WhatsappLogo, X, CalendarCheck } from '@phosphor-icons/react/dist/ssr';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { trackEvent } from '@/shared/lib/analytics/tracking';
import { buildWhatsAppUrl, whatsAppMessageFor } from '@/shared/lib/whatsapp';
import { PHONE_DISPLAY, PHONE_HREF } from '@/shared/config/ctaLabels';
import { useLeadQuickForm, type LeadFormKind } from '../model/useLeadQuickForm';
import { LeadQuickFormFields, type LeadDistrictOption } from './LeadQuickFormFields';

export type LeadFormVariant = 'card' | 'inline' | 'sheet';

export interface LeadQuickFormProps {
  variant?: LeadFormVariant;
  formKind: LeadFormKind;
  /** Origin tag stored with the lead, e.g. "local_seo_giessen_hero". */
  source: string;
  cityName?: string;
  industry?: string;
  project?: string;
  districts?: LeadDistrictOption[];
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  /** Sheet only */
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  className?: string;
}

/**
 * The one quick-request form for the whole site: name, "phone or e-mail",
 * optional message. Three chromes share one hook and one field set:
 * `card` (hero), `inline` (page section) and `sheet` (bottom sheet opened from
 * the mobile conversion bar).
 */
export const LeadQuickForm: React.FC<LeadQuickFormProps> = ({
  variant = 'card',
  formKind,
  source,
  cityName,
  industry,
  project,
  districts,
  heading,
  subheading,
  submitLabel,
  isOpen = true,
  onClose,
  onSuccess,
  className = '',
}) => {
  const t = useTranslations('lead');
  const locale = useLocale() === 'en' ? 'en' : 'de';
  const idPrefix = `lead-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const form = useLeadQuickForm({
    formKind,
    source,
    locale,
    cityName,
    industry,
    project,
    onSuccess,
    errorMessages: {
      name: t('form.errors.name'),
      contact: t('form.errors.contact'),
      url: t('form.errors.contact'),
      email: t('form.errors.contact'),
      generic: t('form.errors.generic'),
    },
  });

  const privacyHref = `/${locale}/legal/datenschutz`;
  const whatsappHref = buildWhatsAppUrl(
    whatsAppMessageFor(typeof window !== 'undefined' ? window.location.pathname : '', locale)
  );

  const successBlock = (
    <div className="flex flex-col items-center px-2 py-6 text-center" data-lead-form={idPrefix}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <OptimizedIcon icon={CheckCircle} className="h-9 w-9" />
      </div>
      <p className="font-display mb-2 text-2xl font-bold text-slate-900">
        {t('form.success.title', { name: form.submitted.name || '' })}
      </p>
      <p className="text-sm leading-relaxed text-slate-600">{t('form.success.text')}</p>
      {form.submitted.email && (
        <p className="mt-1 text-xs text-slate-500">
          {t('form.success.text_email', { email: form.submitted.email })}
        </p>
      )}
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-amber-700">
        {t('form.success.faster')}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <a
          href={PHONE_HREF}
          onClick={() => trackEvent('phone_click', { cta_position: `${source}_success` })}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-amber-400"
        >
          <OptimizedIcon icon={Phone} className="h-4 w-4 text-amber-600" />
          {t('form.success.call')} {PHONE_DISPLAY}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { cta_position: `${source}_success` })}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-emerald-400"
        >
          <OptimizedIcon icon={WhatsappLogo} className="h-4 w-4 text-emerald-600" />
          {t('form.success.whatsapp')}
        </a>
      </div>
      <NavLink
        href="/booking"
        onClick={() =>
          trackEvent('cta_click', { cta_label: 'booking', cta_position: `${source}_success` })
        }
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900"
      >
        <OptimizedIcon icon={CalendarCheck} className="h-4 w-4" />
        {t('form.success.booking')} {t('form.success.booking_cta')}
      </NavLink>
      {variant === 'sheet' ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-h-[48px] w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-bold text-white hover:bg-slate-800"
        >
          {t('form.success.close')}
        </button>
      ) : (
        <button
          type="button"
          onClick={form.reset}
          className="mt-6 text-xs font-medium text-slate-500 underline underline-offset-4 hover:text-slate-800"
        >
          {t('form.success.again')}
        </button>
      )}
    </div>
  );

  const fields = (
    <LeadQuickFormFields
      idPrefix={idPrefix}
      values={form.values}
      errors={form.errors}
      status={form.status}
      errorMessage={form.errorMessage}
      setValue={form.setValue}
      onSubmit={form.submit}
      districts={districts}
      dense={variant === 'sheet'}
      privacyHref={privacyHref}
      submitLabel={submitLabel}
    />
  );

  const header = (
    <div className="mb-5">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {t('form.reply_badge')}
      </span>
      <p className="font-display mt-3 mb-1.5 text-2xl font-bold text-slate-900">
        {heading ?? t('form.heading')}
      </p>
      <p className="text-sm leading-relaxed text-slate-600">{subheading ?? t('form.subheading')}</p>
    </div>
  );

  if (variant === 'sheet') {
    return (
      <LeadQuickFormSheet isOpen={isOpen} onClose={onClose} title={heading ?? t('sheet.title')}>
        {form.status === 'success' ? (
          successBlock
        ) : (
          <>
            <div className="mb-5 pr-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t('form.reply_badge')}
              </span>
              <p className="font-display mt-3 mb-1.5 text-2xl font-bold text-slate-900">
                {heading ?? t('sheet.title')}
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                {subheading ?? t('sheet.subtitle')}
              </p>
            </div>
            {fields}
          </>
        )}
      </LeadQuickFormSheet>
    );
  }

  const chrome =
    variant === 'card'
      ? 'w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7'
      : 'w-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8';

  return (
    <div className={`relative overflow-hidden ${chrome} ${className}`}>
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative z-10">
        {form.status === 'success' ? (
          successBlock
        ) : (
          <>
            {header}
            {fields}
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------- */

interface SheetProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
}

/** Bottom sheet chrome (portal, focus trap, scroll lock, CSS slide). */
const LeadQuickFormSheet: React.FC<SheetProps> = ({ isOpen, onClose, title, children }) => {
  const t = useTranslations('lead');
  const close = onClose ?? (() => {});
  const containerRef = useFocusTrap(isOpen, close);
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    document.body.classList.add('mobile-nav-open');
    return () => document.body.classList.remove('mobile-nav-open');
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) containerRef.current?.focus({ preventScroll: true });
  }, [isOpen, containerRef]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`fixed inset-0 z-[100] ${isOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute inset-x-0 bottom-0 mx-auto max-h-[92dvh] max-w-lg overflow-y-auto overscroll-contain rounded-t-[2rem] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_40px_rgba(15,23,42,0.25)] transition-[translate,visibility] duration-300 ease-out focus:outline-none motion-reduce:transition-none ${isOpen ? 'visible translate-y-0' : 'invisible translate-y-full'}`}
      >
        <div className="relative px-5 pt-3 pb-6">
          <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-300" aria-hidden="true" />
          <button
            type="button"
            onClick={close}
            aria-label={t('form.success.close')}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <OptimizedIcon icon={X} className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LeadQuickForm;
