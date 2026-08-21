'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { Link } from '@/i18n/navigation';

const Newsletter: React.FC = () => {
  const t = useTranslations('knowledge.newsletter');
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptedPrivacy || botField) return;

    setStatus('loading');
    try {
      const result = await saveLeadInternalAction({
        email,
        name: 'Newsletter Subscriber',
        message: 'Source: Newsletter',
      });

      if (!result.success) throw new Error(result.error || 'Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-16 md:pt-6 md:pb-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-full max-w-lg mx-auto aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition motion-reduce:duration-[0.01ms] duration-500">
          <OptimizedImage
            src="/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp"
            alt="E-Mail-Marketing Kampagne Newsletter Versand an Zielgruppe"
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent" />
        </div>

        <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        {status === 'success' ? (
          <div
            className="max-w-md mx-auto bg-green-50 p-6 rounded-2xl border border-green-100 mb-8 flex flex-col items-center text-green-700 animate-in fade-in zoom-in duration-300 motion-reduce:animate-none"
            role="status"
            aria-live="polite"
          >
            <OptimizedIcon icon={CheckCircle} className="w-12 h-12 mb-2 text-green-500" />
            <h3 className="font-bold text-lg">{t('success_title')}</h3>
            <p>{t('success_message')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8 flex flex-col gap-4">
            {/* Phase 19: Honeypot field for bot protection */}
            <input
              type="text"
              name="bot_field_hidden"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              aria-hidden="true"
            />

            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 flex gap-2">
              <Input
                type="email"
                inputMode="email"
                placeholder={t('emailPlaceholder')}
                aria-label={t('emailPlaceholder')}
                className="bg-transparent border-0 focus:ring-0 px-4"
                wrapperClassName="flex-1 space-y-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                className="rounded-xl px-6"
                disabled={status === 'loading' || !acceptedPrivacy}
              >
                {status === 'loading' ? (
                  <OptimizedIcon
                    icon={CircleNotch}
                    className="animate-spin motion-reduce:animate-none"
                  />
                ) : (
                  t('subscribe')
                )}
              </Button>
            </div>

            <div className="flex items-start gap-3 text-left px-2">
              <input
                type="checkbox"
                id="privacy-newsletter"
                required
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="privacy-newsletter" className="text-sm text-slate-500">
                {t('privacy_consent_pre')}
                <Link href="/legal/datenschutz" className="underline hover:text-slate-700">
                  {t('privacy_link')}
                </Link>
                {t('privacy_consent_post')}
              </label>
            </div>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="text-red-500 text-sm mb-4">
            {t('error')}
          </p>
        )}
      </div>
    </main>
  );
};

export default Newsletter;
