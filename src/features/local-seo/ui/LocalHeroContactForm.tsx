'use client';

import React, { useState } from 'react';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { useLocale } from 'next-intl';
import {
  PaperPlaneRight,
  CheckCircle,
  WarningCircle,
  User,
  Envelope,
  Phone,
  Sparkle,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';

interface LocalHeroContactFormProps {
  cityName: string;
  sourceTag: string;
  headingText?: string;
  subtitleText?: string;
}

export const LocalHeroContactForm: React.FC<LocalHeroContactFormProps> = ({
  cityName,
  sourceTag,
  headingText,
  subtitleText,
}) => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _bot_trap_field: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = isEn
        ? 'Please enter your name (min. 2 characters)'
        : 'Bitte geben Sie Ihren Namen ein (min. 2 Zeichen)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errs.email = isEn
        ? 'Please enter a valid email address'
        : 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData._bot_trap_field) {
      setSuccess(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const fullMessage = `Anfrage von lokaler SEO-Landingpage für ${cityName}.\n\nNachricht: ${formData.message || '-'}\nTelefon: ${formData.phone || '-'}`;

      const result = await saveLeadInternalAction({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : undefined,
        message: fullMessage,
        project: `Webdesign ${cityName}`,
        source: sourceTag,
      });

      if (!result.success) throw new Error(result.error || 'Unknown error');

      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(
        err.message ||
          (isEn
            ? 'An error occurred. Please try again.'
            : 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTitle = isEn
    ? `Request Free Project Quote for ${cityName}`
    : `Kostenloses Angebot für ${cityName} anfordern`;

  const defaultSubtitle = isEn
    ? 'Direct response from founder Umutcan Emre Tezgel within 24h.'
    : 'Direkte Rückmeldung durch Inhaber Umutcan Emre Tezgel innerhalb von 24h.';

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-900/5 relative overflow-hidden backdrop-blur-xs">
      {/* Top accent glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
          <Sparkle className="w-3.5 h-3.5 text-amber-600" />
          <span>{isEn ? 'Direct Project Contact' : 'Direkter Projektkontakt'}</span>
        </div>
        <p className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-tight">
          {headingText || defaultTitle}
        </p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {subtitleText || defaultSubtitle}
        </p>
      </div>

      {success ? (
        <div
          role="status"
          aria-live="polite"
          className="text-center py-6 px-2 space-y-4 animate-in fade-in duration-300"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-4 ring-emerald-50/50">
            <CheckCircle className="w-6 h-6" weight="bold" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {isEn ? 'Request Received!' : 'Anfrage erfolgreich erhalten!'}
            </p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xs mx-auto">
              {isEn
                ? `Thank you. We will review your project in ${cityName} and contact you within 24 hours.`
                : `Vielen Dank! Wir prüfen Ihre Anforderungen für ${cityName} und melden uns innerhalb von 24 Stunden persönlich bei Ihnen.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({ name: '', email: '', phone: '', message: '', _bot_trap_field: '' });
            }}
            className="text-xs text-amber-700 hover:text-amber-800 font-bold underline transition-colors pt-2 block mx-auto"
          >
            {isEn ? 'Send another inquiry' : 'Weitere Nachricht senden'}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3.5 relative z-10" noValidate>
          {/* Honeypot field */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input
              type="text"
              name="_bot_trap_field"
              value={formData._bot_trap_field}
              onChange={(e) => setFormData({ ...formData, _bot_trap_field: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor={`hero-name-${sourceTag}`} className="sr-only">
              {isEn ? 'Your Name' : 'Ihr Name'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id={`hero-name-${sourceTag}`}
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                }}
                placeholder={isEn ? 'Your Name / Company *' : 'Ihr Name / Unternehmen *'}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? `hero-name-error-${sourceTag}` : undefined}
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                  formErrors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {formErrors.name && (
              <p
                id={`hero-name-error-${sourceTag}`}
                role="alert"
                className="text-[11px] text-red-500 mt-1 pl-1 flex items-center gap-1"
              >
                <WarningCircle className="w-3.5 h-3.5" />
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor={`hero-email-${sourceTag}`} className="sr-only">
              {isEn ? 'Your Email' : 'Ihre E-Mail-Adresse'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Envelope className="w-4 h-4" />
              </div>
              <input
                id={`hero-email-${sourceTag}`}
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                }}
                placeholder={isEn ? 'Your Business Email *' : 'Ihre geschäftliche E-Mail *'}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? `hero-email-error-${sourceTag}` : undefined}
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                  formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {formErrors.email && (
              <p
                id={`hero-email-error-${sourceTag}`}
                role="alert"
                className="text-[11px] text-red-500 mt-1 pl-1 flex items-center gap-1"
              >
                <WarningCircle className="w-3.5 h-3.5" />
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor={`hero-phone-${sourceTag}`} className="sr-only">
              {isEn ? 'Phone Number (optional)' : 'Telefonnummer (optional)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id={`hero-phone-${sourceTag}`}
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={isEn ? 'Phone Number (optional)' : 'Telefonnummer (optional)'}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-primary-700/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isEn ? 'Request Free Quote Now' : 'Jetzt unverbindlich anfragen'}</span>
                <PaperPlaneRight className="w-4 h-4" weight="bold" />
              </>
            )}
          </button>

          {/* Error notice */}
          {error && (
            <p role="alert" className="text-xs text-red-500 text-center mt-2">
              {error}
            </p>
          )}

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isEn
                ? '100% GDPR compliant · No obligation · Fixed price'
                : '100% DSGVO-konform · Unverbindlich · Fester Preis'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
