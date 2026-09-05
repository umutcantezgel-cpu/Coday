'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  PaperPlaneRight,
  CheckCircle,
  WarningCircle,
  User,
  Envelope,
  Phone,
  ChatCircleText,
  LockSimple,
  X,
} from '@phosphor-icons/react/dist/ssr';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/use-scroll-lock';

interface MobileQuickContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * The mobile counterpart to `QuickContactForm`.
 *
 * The desktop card is 480px tall and sits beside the headline; below 1024px it
 * was hidden outright, so mobile visitors had no way to leave their details
 * without navigating to /contact or /booking. This sheet gives them one, without
 * spending hero height: it is mounted only after the first tap on the trigger.
 *
 * Everything here is tuned for a thumb and a soft keyboard — `autoComplete`
 * tokens so the browser can fill all four fields in one tap, `inputMode` for the
 * right keyboard, `text-base` (16px) because iOS Safari zooms the page in on any
 * smaller field, and `dvh` sizing so the panel stays reachable once the keyboard
 * is up.
 *
 * The slide-up is a CSS transition rather than a motion component on purpose.
 * `MotionProvider` fetches its ~99KB feature chunk on first interaction, and the
 * tap that opens this sheet *is* that interaction — so on a slow connection a
 * motion-driven panel would sit at `translateY(100%)`, leaving the visitor
 * looking at a dimmed page with no form on it. CSS needs nothing to arrive.
 */
export const MobileQuickContactSheet: React.FC<MobileQuickContactSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const t = useTranslations('home');
  const locale = useLocale();
  const isEn = locale === 'en';
  const containerRef = useFocusTrap(isOpen, onClose);

  useScrollLock(isOpen);

  /**
   * The floating action menu renders above everything and would sit on top of
   * the sheet, covering the privacy note. `body.mobile-nav-open` is the switch
   * three stylesheets already use to hide it for the navigation overlay — the
   * name says nav, but the rule is "a full-screen layer is open", which is
   * exactly the case here.
   */
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    document.body.classList.add('mobile-nav-open');
    return () => document.body.classList.remove('mobile-nav-open');
  }, [isOpen]);

  /**
   * Move focus into the dialog when it opens.
   *
   * A tap leaves focus on the trigger, which is now behind an `aria-modal`
   * layer — so a screen reader would still be announcing the page underneath.
   * `useFocusTrap` only claims focus when it is on `document.body`, which is
   * deliberately not this case. Focus lands on the panel itself rather than the
   * first field: focusing an input would raise the soft keyboard the instant
   * the sheet appears, before the visitor has read what it asks for.
   */
  useEffect(() => {
    if (isOpen) containerRef.current?.focus({ preventScroll: true });
  }, [isOpen, containerRef]);

  /**
   * `home.json` is the only namespace loaded here, and older deployments may not
   * carry the mobile keys yet — mirror the fallback shape `QuickContactForm`
   * already uses so a missing key never renders as a raw path.
   */
  const getText = (key: string, deFallback: string, enFallback: string): string => {
    try {
      const val = t(key);
      if (!val || val === key || val.startsWith('home.') || val.startsWith('quick_contact.')) {
        return isEn ? enFallback : deFallback;
      }
      return val;
    } catch {
      return isEn ? enFallback : deFallback;
    }
  };

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

  const nameError = getText(
    'quick_contact.errors.name',
    'Bitte geben Sie Ihren Namen ein (min. 2 Zeichen)',
    'Please enter your name (min. 2 characters)'
  );
  const emailError = getText(
    'quick_contact.errors.email',
    'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'Please enter a valid email address'
  );

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!formData.name || formData.name.trim().length < 2) errs.name = nameError;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) errs.email = emailError;
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
      const result = await saveLeadInternalAction({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : undefined,
        // Only what the visitor actually typed. The confirmation quotes this
        // back to them, so nothing synthetic may be folded in here.
        message: formData.message ? formData.message.trim() : undefined,
        formKind: 'quick',
        source: 'quick_contact_mobile',
        locale: isEn ? 'en' : 'de',
      });

      if (!result.success) throw new Error(result.error || 'Unknown error');
      setSuccess(true);
    } catch (err) {
      const fallback = isEn
        ? 'Something went wrong. Please try again.'
        : 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.';
      setError(err instanceof Error && err.message ? err.message : fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full pl-11 pr-4 py-3.5 text-base bg-slate-50 border border-slate-200 rounded-xl ' +
    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white outline-none ' +
    'transition-colors placeholder:text-slate-400 text-slate-900';

  const title = getText('quick_contact.mobile_title', 'Schnellnachricht', 'Quick message');
  const subtitle = getText(
    'quick_contact.mobile_subtitle',
    'Zwei Felder genügen. Ihre Nachricht landet direkt in meinem Postfach — kein Callcenter, kein Vertrieb.',
    'Two fields is all it takes. Your message lands straight in my inbox — no call centre, no sales team.'
  );

  /**
   * No `mounted` guard on purpose. This module is imported with `ssr: false`,
   * so it never renders on the server and `document.body` is always there. A
   * guard would also break the focus trap: on the first render it would return
   * null, leaving `containerRef.current` empty when the trap's effect runs, and
   * the effect does not re-run when the ref is filled in on the next render —
   * so Escape would never close the sheet.
   *
   * The panel also stays mounted once opened rather than unmounting on close.
   * That is what lets the slide-out be pure CSS: `visibility` is a discrete
   * property, so transitioning it holds the panel visible for the length of the
   * transform and flips it at the very end. Keeping it mounted avoids driving
   * the animation from state inside an effect, which cascades renders.
   * `visibility: hidden` also takes the closed form's fields out of the tab
   * order, so nothing behind the page becomes reachable.
   */
  return createPortal(
    <div className={`fixed inset-0 z-[100] lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto overscroll-contain bg-white rounded-t-[2rem] shadow-[0_-8px_40px_rgba(15,23,42,0.25)] pb-[env(safe-area-inset-bottom)] transition-[translate,visibility] duration-300 ease-out focus:outline-none motion-reduce:transition-none ${isOpen ? 'visible translate-y-0' : 'invisible translate-y-full'}`}
      >
        {/* Ambient wash, mirroring the desktop card so both read as one brand */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute top-8 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[45px] pointer-events-none" />

        <div className="relative z-10 px-5 pt-3 pb-6">
          <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-300" aria-hidden="true" />

          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'Schließen'}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <OptimizedIcon icon={X} className="h-5 w-5" />
          </button>

          {!success ? (
            <>
              <div className="mb-5 pr-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isEn ? 'Reply within 24 hours' : 'Antwort binnen 24 Stunden'}
                </span>
                <p className="font-display font-bold text-2xl text-slate-900 mt-3 mb-1.5">
                  {title}
                </p>
                <p className="text-sm leading-relaxed text-slate-600">{subtitle}</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-3" noValidate>
                <input
                  type="text"
                  name="_bot_trap_field"
                  value={formData._bot_trap_field}
                  onChange={(e) => setFormData((p) => ({ ...p, _bot_trap_field: e.target.value }))}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
                      <OptimizedIcon icon={User} className="h-5 w-5" />
                    </span>
                    <input
                      id="mobile-quick-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      enterKeyHint="next"
                      value={formData.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((p) => ({ ...p, name: val }));
                        if (formErrors.name && val.trim().length >= 2) {
                          setFormErrors((p) => ({ ...p, name: undefined }));
                        }
                      }}
                      placeholder={getText(
                        'quick_contact.name_placeholder',
                        'Ihr Name',
                        'Your name'
                      )}
                      aria-label={isEn ? 'Your name' : 'Ihr Name'}
                      aria-invalid={Boolean(formErrors.name)}
                      className={fieldClass}
                      disabled={isSubmitting}
                    />
                  </div>
                  {formErrors.name && (
                    <span className="ml-1 text-xs font-medium text-red-600">{formErrors.name}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
                      <OptimizedIcon icon={Envelope} className="h-5 w-5" />
                    </span>
                    <input
                      id="mobile-quick-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      enterKeyHint="next"
                      value={formData.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((p) => ({ ...p, email: val }));
                        if (formErrors.email) setFormErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder={getText(
                        'quick_contact.email_placeholder',
                        'Ihre E-Mail-Adresse',
                        'Your email address'
                      )}
                      aria-label={isEn ? 'Your email address' : 'Ihre E-Mail-Adresse'}
                      aria-invalid={Boolean(formErrors.email)}
                      className={fieldClass}
                      disabled={isSubmitting}
                    />
                  </div>
                  {formErrors.email && (
                    <span className="ml-1 text-xs font-medium text-red-600">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
                    <OptimizedIcon icon={Phone} className="h-5 w-5" />
                  </span>
                  <input
                    id="mobile-quick-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    enterKeyHint="next"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder={getText(
                      'quick_contact.phone_placeholder',
                      'Telefon (optional)',
                      'Phone (optional)'
                    )}
                    aria-label={isEn ? 'Phone (optional)' : 'Telefon (optional)'}
                    className={fieldClass}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-0 top-0 flex items-center pl-4 pt-3.5 text-slate-400 pointer-events-none">
                    <OptimizedIcon icon={ChatCircleText} className="h-5 w-5" />
                  </span>
                  <textarea
                    id="mobile-quick-message"
                    name="message"
                    rows={3}
                    enterKeyHint="done"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder={getText(
                      'quick_contact.message_placeholder',
                      'Worum geht es? (optional)',
                      'What is it about? (optional)'
                    )}
                    aria-label={isEn ? 'What is it about? (optional)' : 'Worum geht es? (optional)'}
                    className={`${fieldClass} resize-none`}
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    <OptimizedIcon icon={WarningCircle} className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-1 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-4 text-base font-bold text-white shadow-lg shadow-primary-700/25 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <span>{isEn ? 'Send message' : 'Nachricht senden'}</span>
                      <OptimizedIcon icon={PaperPlaneRight} className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="flex items-start gap-1.5 pt-1 text-center text-xs leading-relaxed text-slate-500">
                  <OptimizedIcon icon={LockSimple} className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span className="text-left">
                    {isEn
                      ? 'Your details go to me alone and are never passed on or used for advertising.'
                      : 'Ihre Daten gehen ausschließlich an mich — keine Weitergabe, keine Werbung.'}
                  </span>
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center px-2 py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <OptimizedIcon icon={CheckCircle} className="h-9 w-9" />
              </div>
              <p className="font-display mb-2 text-2xl font-bold text-slate-900">
                {isEn ? 'Message received' : 'Nachricht ist da'}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                {isEn
                  ? 'I have just sent you a confirmation by email. You will hear from me personally within 24 hours.'
                  : 'Eine Bestätigung ist gerade per E-Mail zu Ihnen unterwegs. Sie hören innerhalb von 24 Stunden persönlich von mir.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-bold text-white transition-colors hover:bg-slate-800"
              >
                {isEn ? 'Close' : 'Schließen'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileQuickContactSheet;
