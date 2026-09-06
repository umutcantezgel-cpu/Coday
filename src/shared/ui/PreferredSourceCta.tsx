'use client';

import React from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { ArrowSquareOut, GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';
import { BASE_URL } from '@/shared/config/site';
import { trackEvent } from '@/shared/lib/analytics/tracking';

const SITE_HOST = new URL(BASE_URL).host;
const DEEPLINK_URL = `https://www.google.com/preferences/source?q=${SITE_HOST}`;
const PUBLISHER_SCRIPT_URL = 'https://news.google.com/swg/js/v1/publisher.js';

interface PreferredSourceCtaProps {
  variant: 'footer' | 'article';
}

/**
 * Google "Preferred Sources" call-to-action.
 *
 * The official publisher.js is loaded only after an explicit user click
 * (§25 TDDDG: the connection to Google LLC needs a user-initiated action;
 * every other third party on this site is consent-gated the same way).
 * The plain deeplink works without JavaScript and is the variant to reuse
 * in newsletters or social posts.
 */
export const PreferredSourceCta: React.FC<PreferredSourceCtaProps> = ({ variant }) => {
  const t = useTranslations('ui');
  const [googleButtonActive, setGoogleButtonActive] = React.useState(false);

  const handleActivate = () => {
    trackEvent('preferred_source_click', {
      cta_position: variant,
      method: 'load_official_button',
      destination: PUBLISHER_SCRIPT_URL,
    });
    setGoogleButtonActive(true);
  };

  const handleDeeplinkClick = () => {
    trackEvent('preferred_source_click', {
      cta_position: variant,
      method: 'deeplink',
      destination: DEEPLINK_URL,
    });
  };

  if (variant === 'article') {
    return (
      <aside
        aria-labelledby="preferred-source-article-heading"
        className="max-w-prose mx-auto mb-16 rounded-3xl bg-white border border-slate-200/90 p-8 text-center shadow-sm"
      >
        <h2
          id="preferred-source-article-heading"
          className="text-xl font-bold text-slate-900 mb-3 !mt-0"
        >
          {t('preferredSources.articleTitle')}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {t('preferredSources.articleDesc')}
        </p>
        <a
          href={DEEPLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDeeplinkClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-sm hover:bg-slate-700 transition-colors"
        >
          <GoogleLogo size={18} weight="bold" aria-hidden="true" />
          {t('preferredSources.articleButton')}
          <span className="sr-only">({t('preferredSources.newTabHint')})</span>
          <ArrowSquareOut size={14} aria-hidden="true" />
        </a>
        <p className="text-sm text-slate-500 mt-5">
          {t('preferredSources.moreLabel')}{' '}
          <Link
            href="/knowledge/blog"
            className="font-semibold text-primary hover:text-primary-dark underline underline-offset-2"
          >
            {t('preferredSources.moreBlog')}
          </Link>
        </p>
      </aside>
    );
  }

  return (
    <section aria-labelledby="preferred-source-footer-heading" className="mb-12">
      <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mb-3 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600"></span>
          {t('preferredSources.sectionTitle')}
        </p>
        <h3 id="preferred-source-footer-heading" className="text-xl font-bold text-slate-900 mb-3">
          {t('preferredSources.footerTitle')}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
          {t('preferredSources.footerDesc')}
        </p>

        {googleButtonActive ? (
          <div className="min-h-[52px] flex items-center justify-center mb-4">
            <div {...{ 'google-add-preferred-source-btn': '' }} data-theme="light" />
            <Script src={PUBLISHER_SCRIPT_URL} strategy="afterInteractive" />
          </div>
        ) : (
          <div className="mb-4">
            <button
              type="button"
              onClick={handleActivate}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-sm hover:bg-slate-700 transition-colors"
            >
              <GoogleLogo size={18} weight="bold" aria-hidden="true" />
              {t('preferredSources.loadButton')}
            </button>
            <p className="text-xs text-slate-400 mt-2.5">{t('preferredSources.notice')}</p>
          </div>
        )}

        <a
          href={DEEPLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDeeplinkClick}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark underline underline-offset-2"
        >
          {t('preferredSources.deeplinkLabel')}
          <span className="sr-only">({t('preferredSources.newTabHint')})</span>
          <ArrowSquareOut size={14} aria-hidden="true" />
        </a>

        <p className="text-sm text-slate-500 mt-5 pt-5 border-t border-slate-100">
          {t('preferredSources.moreLabel')}{' '}
          <Link
            href="/knowledge/blog"
            className="font-semibold text-primary hover:text-primary-dark underline underline-offset-2"
          >
            {t('preferredSources.moreBlog')}
          </Link>
          {' · '}
          <Link
            href="/services"
            className="font-semibold text-primary hover:text-primary-dark underline underline-offset-2"
          >
            {t('preferredSources.moreServices')}
          </Link>
        </p>
      </div>
    </section>
  );
};
