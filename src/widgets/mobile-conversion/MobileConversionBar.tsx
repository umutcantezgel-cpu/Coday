'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Phone, WhatsappLogo, PaperPlaneRight } from '@phosphor-icons/react/dist/ssr';
import { trackEvent } from '@/shared/lib/analytics/tracking';
import { buildWhatsAppUrl, whatsAppMessageFor } from '@/shared/lib/whatsapp';
import { PHONE_HREF } from '@/shared/config/ctaLabels';

const LeadQuickForm = dynamic(
  () => import('@/features/lead/ui/LeadQuickForm').then((m) => m.LeadQuickForm),
  { ssr: false }
);

/** Height of the bar; the floating action button moves up by this much. */
export const CONVERSION_BAR_HEIGHT_PX = 64;

/** Routes that own their own bottom bar or must stay quiet. */
const EXCLUDED_PREFIXES = ['/pricing', '/booking', '/dashboard', '/legal', '/privacy', '/contact'];

export function shouldShowMobileConversionBar(pathname: string): boolean {
  const p = pathname.replace(/^\/(de|en)(?=\/|$)/, '') || '/';
  return !EXCLUDED_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

/**
 * Sticky bottom bar for phones and tablets: Anrufen · WhatsApp · Kurz anfragen.
 * Appears after the visitor scrolled past the first screen and hides while a
 * lead form is in view, so it never competes with a form the visitor can see.
 */
export const MobileConversionBar: React.FC = () => {
  const t = useTranslations('lead');
  const locale = useLocale() === 'en' ? 'en' : 'de';
  const pathname = usePathname() || '/';
  const enabled = shouldShowMobileConversionBar(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);

  // Scroll detection twice over: the scroll event for the common case and a
  // sentinel observed by IntersectionObserver for smooth-scroll libraries and
  // programmatic scrolling, which do not always fire the event.
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let observer: IntersectionObserver | null = null;
    const sentinel = document.getElementById('conversion-bar-sentinel');
    if (sentinel && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      observer.observe(sentinel);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setFormInView(visible.size > 0);
      },
      { threshold: 0.15 }
    );
    const observe = () =>
      document.querySelectorAll('[data-lead-form]').forEach((el) => observer.observe(el));
    observe();
    const mutation = new MutationObserver(observe);
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [enabled, pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const active = enabled && scrolled && !formInView;
    document.body.classList.toggle('has-conversion-bar', active);
    return () => document.body.classList.remove('has-conversion-bar');
  }, [enabled, scrolled, formInView]);

  if (!enabled) return null;

  const visible = scrolled && !formInView;
  const whatsappHref = buildWhatsAppUrl(whatsAppMessageFor(pathname, locale));

  const openSheet = () => {
    trackEvent('sticky_bar_click', { cta_label: 'inquiry', cta_position: 'mobile_bar' });
    setSheetMounted(true);
    setSheetOpen(true);
  };

  const itemClass =
    'flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500';

  return (
    <>
      <span
        id="conversion-bar-sentinel"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[300px] h-px w-px"
      />
      <nav
        aria-label={t('bar.aria')}
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-[70] lg:hidden px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 transition-transform duration-300 motion-reduce:transition-none ${
          visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md">
          <a
            href={PHONE_HREF}
            tabIndex={visible ? 0 : -1}
            onClick={() => trackEvent('phone_click', { cta_position: 'mobile_bar' })}
            className={`${itemClass} bg-slate-100 text-slate-900 hover:bg-slate-200`}
          >
            <OptimizedIcon icon={Phone} className="h-5 w-5 text-amber-600" />
            {t('bar.call')}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            onClick={() => trackEvent('whatsapp_click', { cta_position: 'mobile_bar' })}
            className={`${itemClass} bg-emerald-50 text-emerald-800 hover:bg-emerald-100`}
          >
            <OptimizedIcon icon={WhatsappLogo} className="h-5 w-5 text-emerald-600" />
            {t('bar.whatsapp')}
          </a>
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            onClick={openSheet}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            className={`${itemClass} bg-amber-500 text-white hover:bg-amber-600`}
          >
            <OptimizedIcon icon={PaperPlaneRight} className="h-5 w-5" />
            {t('bar.inquiry')}
          </button>
        </div>
      </nav>

      {sheetMounted && (
        <LeadQuickForm
          variant="sheet"
          formKind="sticky"
          source={`sticky_${pathname.replace(/^\/(de|en)/, '').replace(/[^a-z0-9]+/gi, '_') || 'home'}`}
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
};

export default MobileConversionBar;
