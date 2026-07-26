'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

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

export const ConditionalWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '';
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children}</>;

  return (
    <div className="font-sans min-h-dvh flex flex-col">
      {children}
      <Suspense fallback={null}>
        <ChatWidget hideTrigger={true} />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingWidgetsManager />
      </Suspense>

      <Suspense fallback={null}>
        <CookieConsentBanner />
      </Suspense>
    </div>
  );
};

export default ConditionalWrapper;
