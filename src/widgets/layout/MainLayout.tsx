import React, { Suspense, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import MobileReadyNav from '../navigation/MobileReadyNav';
// ChatWidget lazy loaded below
import { CookieConsentBanner, CookieSettingsModal } from '../cookie';
import { FloatingActionMenu } from '../floating-menu/FloatingActionMenu';

const Footer = lazy(() => import('./Footer'));
const ChatWidget = lazy(() =>
  import('../chatbot').then((module) => ({ default: module.ChatWidget }))
);

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children || <Outlet />}</>;

  return (
    <div className="font-sans text-text-light bg-background-light min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      {/* World Class Navigation (Mobile Ready) */}
      <MobileReadyNav />

      {/* Spacer for fixed nav */}
      <div className="h-24" />

      <main id="main-content" className="flex-grow pb-20 lg:pb-0">
        {children || <Outlet />}
      </main>

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

export default Layout;
