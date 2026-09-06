'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { DelayedRender } from '@/shared/ui/DelayedRender';
import { usePointerFine } from '@/shared/hooks/usePointerFine';

const FloatingWidgetsManager = dynamic(
  () => import('@/widgets/floating-menu/FloatingWidgetsManager'),
  { ssr: false }
);
const ChatWidget = dynamic(() => import('@/widgets/chatbot').then((module) => module.ChatWidget), {
  ssr: false,
});
const CookieConsentBanner = dynamic(() => import('@/widgets/cookie/CookieConsentBanner'), {
  ssr: false,
});
const WaterCursor = dynamic(() => import('@/shared/ui/WaterCursor'), {
  ssr: false,
});
const MobileConversionBar = dynamic(
  () =>
    import('@/widgets/mobile-conversion/MobileConversionBar').then((m) => m.MobileConversionBar),
  { ssr: false }
);

export const ConditionalWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '';
  const isDashboard = pathname.startsWith('/dashboard');
  const pointerFine = usePointerFine();

  if (isDashboard) return <>{children}</>;

  // `dynamic(..., { ssr: false })` fetches and mounts as soon as hydration runs.
  // DelayedRender returns null first, so the chunk is not even requested until
  // the first interaction or its timeout — whichever comes first.
  return (
    <div className="font-sans min-h-dvh flex flex-col">
      {pointerFine && (
        <DelayedRender delayMs={2000}>
          <WaterCursor tint="coday" />
        </DelayedRender>
      )}
      {children}
      <MobileConversionBar />
      <DelayedRender delayMs={8000}>
        <ChatWidget hideTrigger={true} />
      </DelayedRender>

      <DelayedRender delayMs={8000}>
        <FloatingWidgetsManager />
      </DelayedRender>

      {/* Fixed timing: the consent offer must not depend on the visitor interacting. */}
      <DelayedRender delayMs={4000} waitForInteraction={false}>
        <CookieConsentBanner />
      </DelayedRender>
    </div>
  );
};

export default ConditionalWrapper;
