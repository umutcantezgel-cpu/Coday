'use client';

import React, { useState } from 'react';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  PaperPlaneRight,
  CheckCircle,
  WarningCircle,
  User,
  Envelope,
  Phone,
  Sparkle,
  ShieldCheck,
  MapPin,
  CalendarCheck,
  Calculator,
  ArrowRight,
  Buildings,
} from '@phosphor-icons/react/dist/ssr';

export interface LocalBottomContactSectionProps {
  cityName: string;
  sourceTag: string;
  badgeText?: string;
  heading?: string;
  subheading?: string;
  districts?: Array<{ name: string; label: string }>;
}

export const LocalBottomContactSection: React.FC<LocalBottomContactSectionProps> = ({
  cityName,
  sourceTag,
  badgeText,
  heading,
  subheading,
  districts,
}) => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
    _bot_trap_field: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultBadge = isEn
    ? `Direct Consultation · ${cityName} & Lahn Valley`
    : `Persönliche Beratung · ${cityName} & Lahntal`;

  const defaultHeading = isEn
    ? `Request Free Project Analysis for ${cityName}`
    : `Jetzt kostenlose Standort-Analyse für ${cityName} anfordern`;

  const defaultSubheading = isEn
    ? `Discover in 20 minutes how your company in ${cityName} can reach #1 on Google and reliably generate high-paying clients.`
    : `Erfahren Sie in 20 Minuten, wie Ihr Betrieb in ${cityName} (35792) und dem Lahntal auf Platz 1 bei Google gelangt und planbar neue Kunden gewinnt.`;

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = isEn
        ? 'Please enter your name or company (min. 2 characters)'
        : 'Bitte geben Sie Ihren Namen oder Ihr Unternehmen ein (min. 2 Zeichen)';
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
      // The Ortsteil is a field, not a sentence. It used to be folded into
      // `message` together with our internal section name and the phone number,
      // all of which the confirmation quoted back to the customer.
      const result = await saveLeadInternalAction({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : undefined,
        message: formData.message ? formData.message.trim() : undefined,
        project: `Webdesign ${cityName} (${formData.category || 'Standort-Analyse'})`,
        cityName,
        district: formData.category ? formData.category.trim() : undefined,
        formKind: 'local',
        source: sourceTag,
        locale: isEn ? 'en' : 'de',
      });

      if (!result.success) throw new Error(result.error || 'Unknown error');

      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(
        err.message ||
          (isEn
            ? 'An error occurred during transmission. Please try again.'
            : 'Ein Fehler bei der Übermittlung ist aufgetreten. Bitte erneut versuchen.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-neutral-50/80 border-t border-slate-200 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-amber-500/5 via-primary-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Double-Bezel Frame */}
        <div className="rounded-3xl p-2 sm:p-3 bg-neutral-100/90 border border-neutral-200/90 shadow-xl shadow-slate-900/5">
          <div className="rounded-2xl bg-white p-6 sm:p-10 lg:p-12 border border-neutral-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT COLUMN: Local Authority & Value Pillars */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
                    <Sparkle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{badgeText || defaultBadge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                    {heading || defaultHeading}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3 text-balance">
                    {subheading || defaultSubheading}
                  </p>
                </div>

                {/* Direct Contact Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isEn ? 'Direct Line to Founder' : 'Direkter Kontakt zum Inhaber'}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-800 font-semibold">
                    <a
                      href="tel:+4917641195301"
                      className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 hover:underline decoration-amber-400 underline-offset-4 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>+49 (0) 176 41195301</span>
                    </a>
                    <a
                      href="mailto:umut@codayweb.de"
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:underline decoration-slate-300 underline-offset-4 transition-colors"
                    >
                      <Envelope className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>umut@codayweb.de</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {isEn
                        ? `On-site meetings in ${cityName} & Upper Lahn valley via B49 (< 15 min.)`
                        : `Vor-Ort-Termine in ${cityName} & Lahntal via B49 (< 15 Min. Fahrzeit)`}
                    </span>
                  </div>
                </div>

                {/* 4 Trust Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isEn ? '24h Response Guarantee' : '24h-Rückmelde-Garantie'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isEn ? '100% GDPR Compliant' : '100% DSGVO-konform'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isEn ? 'Fixed Price Guarantee' : 'Verbindlicher Festpreis'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isEn ? 'No Monthly Retainer Lock-in' : '0 € Pflicht-Wartungsabos'}</span>
                  </div>
                </div>

                {/* Secondary Alternative Tools */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 px-4 py-2 rounded-xl transition-all hover:scale-[1.01]"
                  >
                    <Calculator className="w-4 h-4 text-amber-700" />
                    <span>{isEn ? 'Calculate Website Costs' : 'Kosten online berechnen'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>

                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors hover:underline decoration-slate-300 underline-offset-4"
                  >
                    <CalendarCheck className="w-4 h-4 text-slate-500" />
                    <span>
                      {isEn ? 'Book Video Consultation' : 'Oder Termin im Kalender buchen'}
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Lead Form */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {isEn ? `Project Inquiry · ${cityName}` : `Projektanfrage für ${cityName}`}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {isEn
                        ? 'Fill out the form below. Inhaber Umutcan Emre Tezgel will review your site and contact you within 24h.'
                        : 'Tragen Sie sich ein – Inhaber Umutcan Emre Tezgel meldet sich innerhalb von 24h persönlich bei Ihnen.'}
                    </p>
                  </div>

                  {success ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="text-center py-8 px-4 space-y-4 animate-in fade-in duration-300 bg-white rounded-xl border border-emerald-100"
                    >
                      <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-6 ring-emerald-50/60">
                        <CheckCircle className="w-7 h-7" weight="bold" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold text-slate-900">
                          {isEn
                            ? 'Request Received Successfully!'
                            : 'Anfrage erfolgreich erhalten!'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                          {isEn
                            ? `Thank you. We will analyze your project in ${cityName} and contact you within 24 hours.`
                            : `Vielen Dank! Wir prüfen Ihre Anforderungen für ${cityName} und melden uns innerhalb von 24 Stunden persönlich bei Ihnen.`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSuccess(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            category: '',
                            message: '',
                            _bot_trap_field: '',
                          });
                        }}
                        className="text-xs text-amber-800 hover:text-amber-900 font-bold underline transition-colors pt-3 block mx-auto"
                      >
                        {isEn ? 'Send another inquiry' : 'Weitere Anfrage stellen'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-4" noValidate>
                      {/* Honeypot field */}
                      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                        <input
                          type="text"
                          name="_bot_trap_field"
                          value={formData._bot_trap_field}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, _bot_trap_field: e.target.value }))
                          }
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor={`bottom-name-${sourceTag}`}
                          className="block text-xs font-semibold text-slate-700 mb-1"
                        >
                          {isEn ? 'Your Name / Company *' : 'Ihr Name / Unternehmen *'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            id={`bottom-name-${sourceTag}`}
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({ ...prev, name: val }));
                              if (formErrors.name && val.trim().length >= 2) {
                                setFormErrors((prev) => ({ ...prev, name: undefined }));
                              }
                            }}
                            placeholder={
                              isEn
                                ? 'e.g. Max Mustermann / Meisterbetrieb'
                                : 'z. B. Max Mustermann / Meisterbetrieb'
                            }
                            aria-invalid={!!formErrors.name}
                            aria-describedby={
                              formErrors.name ? `bottom-name-error-${sourceTag}` : undefined
                            }
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs ${
                              formErrors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                            }`}
                          />
                        </div>
                        {formErrors.name && (
                          <p
                            id={`bottom-name-error-${sourceTag}`}
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
                        <label
                          htmlFor={`bottom-email-${sourceTag}`}
                          className="block text-xs font-semibold text-slate-700 mb-1"
                        >
                          {isEn ? 'Your Business Email *' : 'Ihre geschäftliche E-Mail-Adresse *'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Envelope className="w-4 h-4" />
                          </div>
                          <input
                            id={`bottom-email-${sourceTag}`}
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({ ...prev, email: val }));
                              if (formErrors.email) {
                                setFormErrors((prev) => ({ ...prev, email: undefined }));
                              }
                            }}
                            placeholder={isEn ? 'name@company.de' : 'name@unternehmen.de'}
                            aria-invalid={!!formErrors.email}
                            aria-describedby={
                              formErrors.email ? `bottom-email-error-${sourceTag}` : undefined
                            }
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs ${
                              formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                            }`}
                          />
                        </div>
                        {formErrors.email && (
                          <p
                            id={`bottom-email-error-${sourceTag}`}
                            role="alert"
                            className="text-[11px] text-red-500 mt-1 pl-1 flex items-center gap-1"
                          >
                            <WarningCircle className="w-3.5 h-3.5" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone & Category (2-Column on sm) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`bottom-phone-${sourceTag}`}
                            className="block text-xs font-semibold text-slate-700 mb-1"
                          >
                            {isEn ? 'Phone Number (optional)' : 'Telefonnummer (optional)'}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Phone className="w-4 h-4" />
                            </div>
                            <input
                              id={`bottom-phone-${sourceTag}`}
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                              }
                              placeholder={isEn ? '+49 170 1234567' : '0170 1234567'}
                              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={`bottom-category-${sourceTag}`}
                            className="block text-xs font-semibold text-slate-700 mb-1"
                          >
                            {isEn ? 'Sector / District' : 'Branche / Ortsteil'}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Buildings className="w-4 h-4" />
                            </div>
                            <select
                              id={`bottom-category-${sourceTag}`}
                              value={formData.category}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, category: e.target.value }))
                              }
                              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs cursor-pointer"
                            >
                              <option value="">
                                {isEn
                                  ? 'Please choose (optional)...'
                                  : 'Bitte auswählen (optional)...'}
                              </option>
                              {districts && districts.length > 0 ? (
                                districts.map((d, i) => (
                                  <option key={i} value={d.name}>
                                    {d.label}
                                  </option>
                                ))
                              ) : (
                                <>
                                  <option value={`Löhnberg-Kernort (Gewerbe / B49)`}>
                                    Löhnberg-Kernort (Gewerbe / B49)
                                  </option>
                                  <option value="Handwerk & Bau (Niedershausen)">
                                    Handwerk & Bau (Niedershausen)
                                  </option>
                                  <option value="Mittelstand & Werkstatt (Obershausen)">
                                    Mittelstand & Werkstatt (Obershausen)
                                  </option>
                                  <option value="Tourismus & Gastronomie (Selters)">
                                    Tourismus & Gastronomie (Selters)
                                  </option>
                                  <option value="Praxis / Kanzlei / Beratung">
                                    Praxis / Kanzlei / Beratung
                                  </option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Message / Project Details Field */}
                      <div>
                        <label
                          htmlFor={`bottom-message-${sourceTag}`}
                          className="block text-xs font-semibold text-slate-700 mb-1"
                        >
                          {isEn
                            ? 'Website URL or Short Note (optional)'
                            : 'Aktuelle Website-URL oder kurze Notiz (optional)'}
                        </label>
                        <textarea
                          id={`bottom-message-${sourceTag}`}
                          rows={2}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder={
                            isEn
                              ? 'e.g. www.my-company.de · We want to win more leads in the region.'
                              : 'z. B. www.mein-betrieb.de · Wir möchten mehr Kunden aus der Region gewinnen.'
                          }
                          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm rounded-xl shadow-md shadow-primary-700/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-3"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>
                              {isEn
                                ? `Request Analysis for ${cityName} Now`
                                : `Kostenlose Standort-Analyse für ${cityName} anfordern`}
                            </span>
                            <PaperPlaneRight className="w-4 h-4 shrink-0" weight="bold" />
                          </>
                        )}
                      </button>

                      {/* Server Error */}
                      {error && (
                        <p
                          role="alert"
                          className="text-xs text-red-500 text-center mt-2 font-medium"
                        >
                          {error}
                        </p>
                      )}

                      {/* Privacy & Trust footer */}
                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 text-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          {isEn
                            ? '100% Confidential · No obligation · Direct response within 24h'
                            : '100% Vertraulich · Unverbindlich · Direkte Antwort innerhalb von 24h'}
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
