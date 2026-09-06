'use client';

import { useCallback, useRef, useState } from 'react';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { trackEvent } from '@/shared/lib/analytics/tracking';

export type LeadFormKind =
  | 'contact'
  | 'quick'
  | 'local'
  | 'gov'
  | 'newsletter'
  | 'website_check'
  | 'industries'
  | 'sticky';

export interface LeadQuickFormOptions {
  formKind: LeadFormKind;
  /** Free-text origin tag, e.g. "local_seo_giessen_hero". */
  source: string;
  locale: 'de' | 'en';
  cityName?: string;
  industry?: string;
  project?: string;
  /** Website-check mode: requires a URL and an e-mail instead of "phone or e-mail". */
  websiteCheck?: boolean;
  onSuccess?: (values: LeadQuickFormValues) => void;
  errorMessages: {
    name: string;
    contact: string;
    url: string;
    email: string;
    generic: string;
  };
}

export interface LeadQuickFormValues {
  name: string;
  contact: string;
  email: string;
  phone: string;
  message: string;
  district: string;
  websiteUrl: string;
  _bot_trap_field: string;
}

export type LeadFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface LeadQuickFormErrors {
  name?: string;
  contact?: string;
  websiteUrl?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

/** "Telefon oder E-Mail": one field, split server-side friendly into email/phone. */
export function splitContact(raw: string): { email?: string; phone?: string } {
  const value = raw.trim();
  if (!value) return {};
  if (value.includes('@')) return EMAIL_RE.test(value) ? { email: value } : {};
  const digits = value.replace(/[^0-9+]/g, '');
  return digits.replace(/\D/g, '').length >= 6 ? { phone: value } : {};
}

export function normalizeWebsiteUrl(raw: string): string {
  const value = raw.trim().replace(/\s+/g, '');
  if (!value) return '';
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const EMPTY: LeadQuickFormValues = {
  name: '',
  contact: '',
  email: '',
  phone: '',
  message: '',
  district: '',
  websiteUrl: '',
  _bot_trap_field: '',
};

export function useLeadQuickForm(options: LeadQuickFormOptions) {
  const [values, setValues] = useState<LeadQuickFormValues>(EMPTY);
  const [errors, setErrors] = useState<LeadQuickFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; email?: string; url?: string }>({
    name: '',
  });
  const startedRef = useRef(false);

  const baseProps = useCallback(
    () => ({
      form_kind: options.formKind,
      cta_position: options.source,
      city: options.cityName,
    }),
    [options.formKind, options.source, options.cityName]
  );

  const setValue = useCallback(
    <K extends keyof LeadQuickFormValues>(key: K, value: LeadQuickFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) =>
        prev[key as keyof LeadQuickFormErrors] ? { ...prev, [key]: undefined } : prev
      );
      if (!startedRef.current && key !== '_bot_trap_field') {
        startedRef.current = true;
        trackEvent('form_start', baseProps());
      }
    },
    [baseProps]
  );

  const validate = useCallback((): LeadQuickFormErrors => {
    const next: LeadQuickFormErrors = {};
    const m = options.errorMessages;
    if (options.websiteCheck) {
      if (!URL_RE.test(values.websiteUrl.trim())) next.websiteUrl = m.url;
      if (!EMAIL_RE.test(values.email.trim())) next.email = m.email;
    } else {
      if (values.name.trim().length < 2) next.name = m.name;
      const split = splitContact(values.contact);
      if (!split.email && !split.phone) next.contact = m.contact;
    }
    return next;
  }, [options.websiteCheck, options.errorMessages, values]);

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
    setErrorMessage(null);
    startedRef.current = false;
  }, []);

  const submit = useCallback(
    async (event?: { preventDefault?: () => void }) => {
      event?.preventDefault?.();
      if (status === 'submitting') return;

      // Honeypot: pretend success, send nothing.
      if (values._bot_trap_field) {
        setStatus('success');
        return;
      }

      const nextErrors = validate();
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setStatus('submitting');
      setErrorMessage(null);
      trackEvent('form_submit', baseProps());

      const split = options.websiteCheck ? {} : splitContact(values.contact);
      const email = options.websiteCheck ? values.email.trim() : split.email;
      const phone = options.websiteCheck
        ? values.phone.trim() || undefined
        : split.phone || values.phone.trim() || undefined;
      const websiteUrl = options.websiteCheck ? normalizeWebsiteUrl(values.websiteUrl) : undefined;
      const name = options.websiteCheck
        ? values.name.trim() || (email ? email.split('@')[0] : 'Website-Check')
        : values.name.trim();

      try {
        const result = await saveLeadInternalAction({
          name,
          email,
          phone,
          message: values.message.trim() || undefined,
          project: options.project,
          cityName: options.cityName,
          district: values.district.trim() || undefined,
          industry: options.industry,
          websiteUrl,
          formKind: options.formKind,
          source: options.source,
          locale: options.locale,
          _bot_trap_field: values._bot_trap_field,
        });
        if (!result.success) throw new Error(result.error || 'Unknown error');

        setSubmitted({ name, email, url: websiteUrl });
        setStatus('success');
        trackEvent('form_success', baseProps());
        options.onSuccess?.(values);
      } catch (err) {
        setStatus('error');
        setErrorMessage(options.errorMessages.generic);
        trackEvent('form_error', {
          ...baseProps(),
          destination: err instanceof Error ? err.message.slice(0, 80) : 'unknown',
        });
      }
    },
    [status, values, validate, baseProps, options]
  );

  return { values, setValue, errors, status, errorMessage, submitted, submit, reset };
}
