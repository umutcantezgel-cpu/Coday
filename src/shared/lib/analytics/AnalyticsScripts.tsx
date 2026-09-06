'use client';
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useCookieStore } from '@/shared/lib/cookieStore';

/**
 * All consent-gated third-party tags in one client component.
 *
 * Replaces the five separate components (GoogleAnalytics, PostHogAnalytics,
 * MetaPixel, LinkedInInsight, ClarityAnalytics) that each subscribed to the
 * consent store and the router on their own. One subscription to
 * useCookieStore / usePathname / useSearchParams now feeds every tag; the
 * <Script> blocks, page-view effects, env-var gates and consent gates
 * (analytics vs marketing) are unchanged.
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'dummy_posthog_key_dev';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'DUMMY_META_PIXEL_ID';

const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'DUMMY_LINKEDIN_ID';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'dummy_clarity_dev';

// The Meta Pixel stub is created by the inline init script below; typed
// locally so this file does not depend on the legacy MetaPixel.tsx globals.
type FbqWindow = Window & {
  fbq?: (command: string, ...args: unknown[]) => void;
};

export const AnalyticsScripts: React.FC = () => {
  const pathname = usePathname() || '';
  const searchParams = useSearchParams();
  const { preferences: consent } = useCookieStore();

  // --- Google Analytics: page views on route change ---
  useEffect(() => {
    if (!consent.analytics || !GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag)
      return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path:
        (pathname || '') + (searchParams?.toString() ? `?${searchParams?.toString()}` : ''),
    });
  }, [pathname, searchParams, consent.analytics]);

  // --- PostHog: page views on route change ---
  useEffect(() => {
    if (!consent.analytics || typeof window === 'undefined' || !window.posthog) return;

    window.posthog.capture('$pageview', {
      $current_url: window.location.href,
      $pathname: pathname,
    });
  }, [pathname, searchParams, consent.analytics]);

  // --- Meta Pixel: page views on route change ---
  useEffect(() => {
    if (!consent.marketing || typeof window === 'undefined' || !(window as FbqWindow).fbq) return;

    // Slight delay to ensure React Router has updated the DOM
    const timer = setTimeout(() => {
      const fbqTrack = (window as FbqWindow).fbq;
      fbqTrack?.('track', 'PageView');
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, consent.marketing]);

  // --- LinkedIn Insight: page views on route change ---
  // LinkedIn handles SPA navigation via the History API out of the box,
  // but if we need custom event firing, we would do it here.
  useEffect(() => {
    if (!consent.marketing || typeof window === 'undefined' || !window.lintrk) return;
  }, [pathname, searchParams, consent.marketing]);

  const showGoogleAnalytics = consent.analytics && !!GA_MEASUREMENT_ID;
  const showPostHog = consent.analytics && !!POSTHOG_KEY && !POSTHOG_KEY.includes('dummy');
  const showMetaPixel = consent.marketing && META_PIXEL_ID !== 'DUMMY_META_PIXEL_ID';
  const showLinkedIn = consent.marketing && LINKEDIN_PARTNER_ID !== 'DUMMY_LINKEDIN_ID';
  const showClarity = consent.analytics && !!CLARITY_ID && !CLARITY_ID.includes('dummy');

  if (!showGoogleAnalytics && !showPostHog && !showMetaPixel && !showLinkedIn && !showClarity) {
    return null;
  }

  return (
    <>
      {showGoogleAnalytics && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
            }}
          />
        </>
      )}

      {showPostHog && (
        <Script
          id="posthog-js"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group reset groups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${POSTHOG_KEY}',{
            api_host:'${POSTHOG_HOST}',
            autocapture: true,
            capture_pageview: false,
            respect_dnt: true,
            session_recording: { maskAllInputs: true, maskTextSelector: '*' }
          });
        `,
          }}
        />
      )}

      {showMetaPixel && (
        <>
          <Script
            id="meta-pixel-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
            if(typeof window !== 'undefined') {
              if(!window.fbq){
                var n=window.fbq=function(){
                  n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
                };
                if(!window._fbq)window._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
              }
              fbq('init', '${META_PIXEL_ID}');
            }
          `,
            }}
          />
          <Script
            id="meta-pixel-script"
            src="https://connect.facebook.net/en_US/fbevents.js"
            strategy="lazyOnload"
          />
        </>
      )}

      {showLinkedIn && (
        <>
          <Script
            id="linkedin-insight-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
            window._linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
            if (!window.lintrk) {
              window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[];
            }
          `,
            }}
          />
          <Script
            id="linkedin-insight-script"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
            strategy="lazyOnload"
          />
        </>
      )}

      {showClarity && (
        <>
          <Script
            id="clarity-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
            window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
          `,
            }}
          />
          <Script
            id="clarity-script"
            src={`https://www.clarity.ms/tag/${CLARITY_ID}`}
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
};
