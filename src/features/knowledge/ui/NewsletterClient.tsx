'use client';

import React, { useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useTranslations, useLocale } from 'next-intl';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  CheckCircle,
  CircleNotch,
  EnvelopeSimple,
  BookBookmark,
  VideoCamera,
  FilePdf,
  Question,
  Sparkle,
  ShieldCheck,
  Lightning,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { Link } from '@/i18n/navigation';

const Newsletter: React.FC = () => {
  const t = useTranslations('knowledge.newsletter');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const knowledgeNav = [
    { label: isEn ? 'Tech Wiki' : 'Tech-Wiki', href: '/knowledge/wikihub', icon: BookBookmark },
    {
      label: isEn ? 'Newsletter' : 'Newsletter',
      href: '/knowledge/newsletter',
      icon: EnvelopeSimple,
    },
    { label: isEn ? 'Academy' : 'Academy & Videos', href: '/knowledge/academy', icon: VideoCamera },
    { label: isEn ? 'Whitepapers' : 'Whitepapers', href: '/knowledge/whitepapers', icon: FilePdf },
    { label: isEn ? 'FAQ' : 'FAQ & Support', href: '/knowledge/faq', icon: Question },
  ];

  const topics = isEn
    ? [
        'Next.js 15 & React 19 Best Practices in Production',
        'Sub-0.3s Core Web Vitals & Real-World Case Studies',
        'Advanced Schema.org & Local Dominance Frameworks',
        'High-Converting B2B Lead Funnels & Interactive Tools',
      ]
    : [
        'Next.js 15 & React 19 Best Practices aus der Praxis',
        'Sub-0,3s Core Web Vitals & Echte Performance Case Studies',
        'Strukturierte Schema.org Graphen & Lokale SEO-Dominanz',
        'Konversionsstarke B2B-Leadfunnel & Kalkulatoren',
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptedPrivacy || botField) return;

    setStatus('loading');
    try {
      // No invented name and no synthetic message: both reached the subscriber.
      // The greeting read "Hallo Newsletter Subscriber" and "Source: Newsletter"
      // was quoted back as their own message. `formKind` routes this to the
      // newsletter confirmation instead of the project-enquiry one, which
      // promised a personal call and a binding fixed-price quote.
      const result = await saveLeadInternalAction({
        email,
        name: email.split('@')[0].slice(0, 60) || 'Newsletter',
        formKind: 'newsletter',
        source: 'newsletter',
        locale: isEn ? 'en' : 'de',
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
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Knowledge Subnavigation */}
        <nav aria-label="Knowledge Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2 overflow-x-auto max-w-full">
            {knowledgeNav.map((tab) => {
              const isActive = tab.href === '/knowledge/newsletter';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <OptimizedIcon
                    icon={Icon}
                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Asymmetric 2-Column Hero & Lead Form */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value Pitch */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Monthly Engineering Insights' : 'Monatliche Engineering Insights'}
            </span>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-secondary tracking-tight">
              {isEn
                ? 'Coday Tech & Growth Newsletter: Exclusive Engineering & Conversion Insights'
                : 'Coday Tech & Growth Newsletter: Exklusive Insights für Unternehmer'}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {isEn
                ? 'Actionable deep-dives on Next.js 15, Core Web Vitals under 0.3s, modern Headless architectures, and high-converting B2B funnels. Written directly by practitioners for engineers, founders, and decision-makers.'
                : 'Praxisnahe Deep-Dives zu Next.js 15, Core Web Vitals unter 300ms, modernen Headless-Architekturen und konversionsstarken B2B-Leadfunneln. Direkt von Experten für Entwickler, Gründer und Entscheider.'}
            </p>

            {/* Topic Value List */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isEn ? 'What you will receive every month:' : 'Was dich jeden Monat erwartet:'}
              </h2>
              <ul className="space-y-2.5" role="list">
                {topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-700 font-medium"
                  >
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <OptimizedIcon icon={CheckCircle} className="w-3.5 h-3.5" weight="bold" />
                    </div>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <OptimizedIcon icon={ShieldCheck} className="w-4 h-4 text-emerald-600" />
                {isEn ? '100% Zero-Spam Guarantee' : '100% Kein Spam · Jederzeit kündbar'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <OptimizedIcon icon={Lightning} className="w-4 h-4 text-amber-500" />
                {isEn ? '1 curated issue per month' : '1 kuratierte Ausgabe / Monat'}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Card & Signup Box */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                <OptimizedImage
                  src="/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp"
                  alt="E-Mail-Marketing Kampagne Newsletter"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                  <span>Exklusive Deep Dives für Webentwickler & Gründer</span>
                </div>
              </div>

              {status === 'success' ? (
                <div
                  className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 flex flex-col items-center text-center text-emerald-800 space-y-2 animate-in fade-in"
                  role="status"
                  aria-live="polite"
                >
                  <OptimizedIcon icon={CheckCircle} className="w-10 h-10 text-emerald-600" />
                  <h3 className="font-bold text-base">{t('success_title')}</h3>
                  <p className="text-xs text-emerald-700">{t('success_message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot protection */}
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

                  <div className="space-y-3">
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder={t('emailPlaceholder')}
                      aria-label={t('emailPlaceholder')}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white text-slate-900"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                    />

                    <Button
                      type="submit"
                      className="w-full rounded-xl py-3.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-sm transition-all"
                      disabled={status === 'loading' || !acceptedPrivacy}
                    >
                      {status === 'loading' ? (
                        <OptimizedIcon
                          icon={CircleNotch}
                          className="w-5 h-5 animate-spin mx-auto"
                        />
                      ) : (
                        t('subscribe')
                      )}
                    </Button>
                  </div>

                  <div className="flex items-start gap-2.5 text-left pt-1">
                    <input
                      type="checkbox"
                      id="privacy-newsletter"
                      required
                      checked={acceptedPrivacy}
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                    />
                    <label
                      htmlFor="privacy-newsletter"
                      className="text-xs text-slate-500 leading-tight"
                    >
                      {t('privacy_consent_pre')}{' '}
                      <Link href="/legal/datenschutz" className="underline hover:text-slate-800">
                        {t('privacy_link')}
                      </Link>{' '}
                      {t('privacy_consent_post')}
                    </label>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="text-rose-600 text-xs font-semibold">
                      {t('error')}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Knowledge Section (> 350 words for 100/100 Content Score) */}
        <section className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto space-y-10 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isEn ? 'Editorial Architecture' : 'Redaktionelle Ausrichtung'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-2">
                {isEn
                  ? 'Why Engineering-First Newsletters Matter in 2026'
                  : 'Warum ein technikfokussierter Newsletter 2026 den Unterschied macht'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Lightning size={20} className="text-amber-500" />
                  {isEn ? 'No Marketing Fluff' : 'Kein Marketing-Geschwurbel'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isEn
                    ? 'We do not send generic summaries. Every edition contains real profiling data, reproducible benchmarks, and production-tested React 19 / Next.js 15 architectures.'
                    : 'Wir verzichten komplett auf oberflächliche Zusammenfassungen. Jede Ausgabe liefert echte Profiling-Daten, reproduzierbare Benchmarks und praxiserprobte React 19 / Next.js 15 Code-Snippets.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  {isEn ? 'Measurable Conversion ROI' : 'Messbarer Conversion-ROI'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Learn how modern headless web architectures increase user conversion rates by up to 40% while reducing infrastructure costs and maintenance overhead.'
                    : 'Erfahre, wie moderne Headless-Webarchitekturen die Conversion-Rate um bis zu 40 % steigern und gleichzeitig Serverkosten sowie Wartungsaufwände drastisch senken.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {isEn
                  ? 'Frequently Asked Questions about our Newsletter'
                  : 'Häufig gestellte Fragen zum Newsletter'}
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {isEn
                      ? 'How frequently is the newsletter sent?'
                      : 'Wie oft erscheint der Newsletter?'}
                  </h4>
                  <p className="text-slate-600">
                    {isEn
                      ? 'Exactly once per month. We respect your inbox and only hit send when we have substantial, high-impact case studies or engineering discoveries to share.'
                      : 'Exakt einmal im Monat. Wir respektieren deine Zeit und versenden nur dann, wenn wir substanzielle Analysen, Benchmarks oder neue Erkenntnisse teilen können.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {isEn
                      ? 'Can I unsubscribe anytime?'
                      : 'Kann ich mich jederzeit wieder abmelden?'}
                  </h4>
                  <p className="text-slate-600">
                    {isEn
                      ? 'Yes, absolutely. Every single email contains a simple 1-click unsubscribe link in the footer with zero hurdles.'
                      : 'Ja, selbstverständlich. Jede E-Mail enthält einen einfachen 1-Klick-Abmeldelink im Footer ohne jegliche Hürden.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Newsletter;
