import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import CardNav from '../navigation/CardNav';
// ChatWidget lazy loaded below
import { CookieConsentBanner, CookieSettingsModal } from '../cookie';
import { FloatingActionMenu } from '../floating-menu/FloatingActionMenu';

const Footer = lazy(() => import('./Footer'));
const ChatWidget = lazy(() =>
  import('../chatbot').then((module) => ({ default: module.ChatWidget }))
);

interface LayoutProps {
  children: React.ReactNode;
}

import { SeoHead } from '../../shared/ui/SeoHead';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children}</>;

  return (
    <div className="font-sans text-text-light bg-background-light min-h-screen flex flex-col">
      <SeoHead />
      {/* World Class Navigation */}
      <CardNav />

      {/* Spacer for fixed nav */}
      <div className="h-24" />

      <main className="flex-grow pb-20 lg:pb-0">{children}</main>

      <Suspense fallback={<div className="h-24 bg-secondary" />}>
        <div className="pb-24 lg:pb-0">
          <Footer />
        </div>
      </Suspense>

      {/* AI Chatbot Widget */}
      <Suspense fallback={null}>
        <ChatWidget hideTrigger={true} />
      </Suspense>

      {/* Unified Floating Menu */}
      <Suspense fallback={null}>
        <FloatingActionMenu />
      </Suspense>

      <Suspense fallback={null}>
        <CookieConsentBanner />
        <CookieSettingsModal />
      </Suspense>
    </div>
  );
};
