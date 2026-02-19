import React, { Suspense, lazy } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// SSR-critical: eagerly imported so server renders full HTML immediately
import MobileReadyNav from '../navigation/MobileReadyNav';
import Footer from './Footer';

// Client-only, non-visible on initial load: lazy is fine
const FloatingActionMenu = lazy(() =>
  import('../floating-menu/FloatingActionMenu').then((m) => ({ default: m.FloatingActionMenu }))
);
const ChatWidget = lazy(() =>
  import('../chatbot').then((module) => ({ default: module.ChatWidget }))
);
const CookieConsentBanner = lazy(() => import('../cookie/CookieConsentBanner'));

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return <>{children || <Outlet />}</>;

  return (
    <HelmetProvider>
      <div className="font-sans text-text-light bg-background-light min-h-screen flex flex-col">
        {/* Navigation — eagerly imported for SSR (renders full HTML immediately) */}
        <MobileReadyNav />

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        <main id="main-content" className="flex-grow pb-20 lg:pb-0">
          {children || <Outlet />}
        </main>

        <div className="pb-24 lg:pb-0">
          <Footer />
        </div>

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
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
