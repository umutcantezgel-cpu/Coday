import React, { useState } from 'react';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/shared/lib/supabase/client';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

const Newsletter: React.FC = () => {
  const { t } = useTranslation('knowledge');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([
        {
          email,
          name: 'Newsletter Subscriber',
          message: 'Source: Newsletter',
        },
      ]);

      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-background-light min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-full max-w-lg mx-auto aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
          <OptimizedImage
            src="/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp"
            alt="Newsletter"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent" />
        </div>

        <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
          {t('newsletter.title')}
        </h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t('newsletter.subtitle')}
        </p>

        {status === 'success' ? (
          <div className="max-w-md mx-auto bg-green-50 p-6 rounded-2xl border border-green-100 mb-8 flex flex-col items-center text-green-700 animate-in fade-in zoom-in duration-300">
            <OptimizedIcon icon={CheckCircle} className="w-12 h-12 mb-2 text-green-500" />
            <h3 className="font-bold text-lg">Vielen Dank!</h3>
            <p>Du hast dich erfolgreich angemeldet.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-2 rounded-2xl shadow-xl border border-gray-200 mb-8 flex gap-2"
          >
            <Input
              type="email"
              inputMode="email"
              placeholder={t('newsletter.emailPlaceholder')}
              aria-label={t('newsletter.emailPlaceholder')}
              className="bg-transparent border-0 focus:ring-0 px-4"
              wrapperClassName="flex-1 space-y-0"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <Button type="submit" className="rounded-xl px-6" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <OptimizedIcon icon={CircleNotch} className="animate-spin" />
              ) : (
                t('newsletter.subscribe')
              )}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="text-red-500 text-sm mb-4">
            Ein Fehler ist aufgetreten. Bitte versuche es später erneut.
          </p>
        )}

        <p className="text-sm text-slate-400">{t('newsletter.privacy')}</p>
      </div>
    </div>
  );
};

export default Newsletter;
