import React, { Suspense, lazy } from 'react';
import { useLocation, useOutlet, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';

// SSR-critical: eagerly imported so server renders full HTML immediately
import MobileReadyNav from '@/widgets/navigation/MobileReadyNav';
import Footer from '@/widgets/layout/Footer';
import { RouteAnnouncer } from '@/shared/ui/RouteAnnouncer';

// Client-only, non-visible on initial load: lazy is fine
const GlobalCTA = lazy(() =>
  import('@/shared/ui/GlobalCTA').then((m) => ({ default: m.GlobalCTA }))
);
const FloatingActionMenu = lazy(() =>
  import('@/widgets/floating-menu/FloatingActionMenu').then((m) => ({
    default: m.FloatingActionMenu,
  }))
);
const ChatWidget = lazy(() =>
  import('@/widgets/chatbot').then((module) => ({ default: module.ChatWidget }))
);
const CookieConsentBanner = lazy(() => import('@/widgets/cookie/CookieConsentBanner'));

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const outlet = useOutlet();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isContactPage =
    location.pathname.startsWith('/contact') || location.pathname.startsWith('/kontakt');

  if (isDashboard) return <>{children || <Outlet />}</>;

  return (
    <HelmetProvider>
      <div className="font-sans text-text-light bg-background-light min-h-dvh flex flex-col">
        {/* Navigation — eagerly imported for SSR (renders full HTML immediately) */}
        <MobileReadyNav />
        <RouteAnnouncer />

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        <main role="main" id="main-content" className="flex-grow pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {children || outlet}
            </motion.div>
          </AnimatePresence>
        </main>

        {!isContactPage && (
          <Suspense fallback={null}>
            <GlobalCTA />
          </Suspense>
        )}

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
