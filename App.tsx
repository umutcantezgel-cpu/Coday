import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';

// Critical pages - loaded immediately
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy-loaded pages (code-split)
const Process = lazy(() => import('./pages/Process'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Impressum = lazy(() => import('./pages/legal/Impressum'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Booking = lazy(() => import('./pages/Booking'));
const Packages = lazy(() => import('./pages/Packages'));
const Manifesto = lazy(() => import('./pages/Manifesto'));
const Calculator = lazy(() => import('./pages/Calculator'));

// Work
const Work = lazy(() => import('./pages/work/Work'));
const ProjectDetail = lazy(() => import('./pages/work/ProjectDetail'));
const CreativeImpact = lazy(() => import('./content/case-studies/creative-impact.mdx'));

// Services - lazy loaded
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const WebDesign = lazy(() => import('./pages/services/WebDesign'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail'));
const IndustryOverview = lazy(() => import('./pages/services/IndustryOverview'));
const IndustryDetail = lazy(() => import('./pages/services/IndustryDetail'));
const Seo = lazy(() => import('./pages/services/Seo'));
const Performance = lazy(() => import('./pages/services/Performance'));

// Dev Sub-Pages
const Ecommerce = lazy(() => import('./pages/services/development/Ecommerce'));
const WebApps = lazy(() => import('./pages/services/development/WebApps'));
const HeadlessCms = lazy(() => import('./pages/services/development/HeadlessCms'));
const ApiIntegration = lazy(() => import('./pages/services/development/ApiIntegration'));
const Migration = lazy(() => import('./pages/services/development/Migration'));
const MobilePwa = lazy(() => import('./pages/services/development/MobilePwa'));

// Design Sub-Pages
const UiUx = lazy(() => import('./pages/services/design/UiUx'));
const BrandIdentity = lazy(() => import('./pages/services/design/BrandIdentity'));
const DesignSystems = lazy(() => import('./pages/services/design/DesignSystems'));
const UxAudit = lazy(() => import('./pages/services/design/UxAudit'));

// Knowledge
const Academy = lazy(() => import('./pages/knowledge/Academy'));
const Blog = lazy(() => import('./pages/knowledge/Blog'));
const BlogPost = lazy(() => import('./pages/knowledge/BlogPost'));
const Newsletter = lazy(() => import('./pages/knowledge/Newsletter'));
const Whitepapers = lazy(() => import('./pages/knowledge/Whitepapers'));

// Career
const Jobs = lazy(() => import('./pages/career/Jobs'));
const Culture = lazy(() => import('./pages/career/Culture'));
const Benefits = lazy(() => import('./pages/career/Benefits'));

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import { LazyMotion, domAnimation } from 'motion/react';

const App: React.FC = () => {
  return (
    <Router>
      <LazyMotion features={domAnimation}>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />

              {/* Industry Routes */}
              <Route path="/services/industries" element={<IndustryOverview />} />
              <Route path="/services/industries/:slug" element={<IndustryDetail />} />

              {/* Pillars */}
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/web-design" element={<WebDesign />} />
              <Route path="/services/seo" element={<Seo />} />
              <Route path="/services/performance" element={<Performance />} />

              {/* Web Development Sub-Services */}
              <Route path="/services/web-development/e-commerce" element={<Ecommerce />} />
              <Route path="/services/web-development/web-apps" element={<WebApps />} />
              <Route path="/services/web-development/cms-headless" element={<HeadlessCms />} />
              <Route path="/services/web-development/api-integrations" element={<ApiIntegration />} />
              <Route path="/services/web-development/migration" element={<Migration />} />
              <Route path="/services/web-development/mobile-pwa" element={<MobilePwa />} />

              {/* Web Design Sub-Services */}
              <Route path="/services/web-design/ui-ux" element={<UiUx />} />
              <Route path="/services/web-design/brand-identity" element={<BrandIdentity />} />
              <Route path="/services/web-design/design-systems" element={<DesignSystems />} />
              <Route path="/services/web-design/audit" element={<UxAudit />} />

              {/* Dynamic Service Detail Route (Fallback) */}
              <Route path="/services/:category/:slug" element={<ServiceDetail />} />

              {/* Calculator */}
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/preise" element={<Calculator />} />

              {/* Work / Case Studies */}
              <Route path="/work" element={<Work />} />

              {/* MDX Case Studies */}
              <Route path="/work/creative-impact" element={<CreativeImpact />} />

              <Route path="/work/:slug" element={<ProjectDetail />} />

              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal/impressum" element={<Impressum />} />
              <Route path="/legal/datenschutz" element={<Privacy />} />
              <Route path="/legal/agb" element={<Terms />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Booking & Packages */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/pakete" element={<Packages />} />

              {/* Knowledge Routes */}
              <Route path="/knowledge/academy" element={<Academy />} />
              <Route path="/knowledge/blog" element={<Blog />} />
              <Route path="/knowledge/blog/:slug" element={<BlogPost />} />
              <Route path="/knowledge/newsletter" element={<Newsletter />} />
              <Route path="/knowledge/whitepapers" element={<Whitepapers />} />

              {/* Career Routes */}
              <Route path="/career/jobs" element={<Jobs />} />
              <Route path="/career/culture" element={<Culture />} />
              <Route path="/career/benefits" element={<Benefits />} />

              <Route path="/manifesto" element={<Manifesto />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </LazyMotion>
    </Router>
  );
};

export default App;
