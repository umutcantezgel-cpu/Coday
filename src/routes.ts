import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  // API Resource Routes (server-side only)
  route('api', 'routes/ApiRoot.tsx', [
    route('ai-proxy', 'routes/api.ai-proxy.ts'),
    route('perplexity-proxy', 'routes/api.perplexity-proxy.ts'),
    route('send-lead', 'routes/api.send-lead.ts'),
    route('data/:dataset/:format', 'routes/api.data.ts'),
  ]),

  // LLMs Manifests
  route('llms.txt', 'routes/api.llms.ts'),
  route('llms-full.txt', 'routes/api.llms-full.ts'),

  route('/', 'widgets/layout/RootRedirector.tsx'),
  route(':lng', 'widgets/layout/LanguageLayout.tsx', [
    layout('widgets/layout/MainLayout.tsx', [
      index('pages/Home.tsx'),
      route('services', 'pages/Services.tsx'),

      // Industry Routes
      route('services/industries', 'pages/services/IndustryOverview.tsx'),
      route('services/industries/:slug', 'pages/services/IndustryDetail.tsx'),

      // Pillars
      route('services/web-development', 'pages/services/WebDevelopment.tsx'),
      route('services/web-design', 'pages/services/WebDesign.tsx'),
      route('services/seo', 'pages/services/Seo.tsx'),
      route('services/performance', 'pages/services/Performance.tsx'),
      route('beratung', 'pages/services/Consulting.tsx'),

      // Web Development Sub-Services
      route('services/web-development/e-commerce', 'pages/services/development/Ecommerce.tsx'),
      route('services/web-development/web-apps', 'pages/services/development/WebApps.tsx'),
      route('services/web-development/headless-cms', 'pages/services/development/HeadlessCms.tsx'),
      route(
        'services/web-development/api-integrations',
        'pages/services/development/ApiIntegration.tsx'
      ),
      route('services/web-development/migration', 'pages/services/development/Migration.tsx'),

      // Main Service Pages
      route('services/enterprise-web', 'pages/services/EnterpriseWeb.tsx'),

      // Alias for Soft 404 fix
      route('services/development/web-development', 'pages/services/WebDevelopment.tsx', {
        id: 'alias-web-dev',
      }),
      route('services/seo/local-seo', 'pages/services/Seo.tsx', { id: 'alias-local-seo' }),

      // Web Design Sub-Services
      route('services/web-design/ui-ux', 'pages/services/design/UiUx.tsx'),
      route('services/web-design/brand-identity', 'pages/services/design/BrandIdentity.tsx'),
      route('services/web-design/design-systems', 'pages/services/design/DesignSystems.tsx'),
      route('services/web-design/audit', 'pages/services/design/UxAudit.tsx'),

      // Industry Domination Routes
      route('services/industries/handwerk', 'pages/industries/Handwerk.tsx'),
      route('services/industries/immobilien', 'pages/industries/Immobilien.tsx'),
      route('services/industries/gastronomie', 'pages/industries/Gastronomie.tsx'),
      route('services/industries/gesundheit', 'pages/industries/Gesundheit.tsx'),
      route('services/industries/dienstleistung', 'pages/industries/Dienstleistung.tsx'),
      route('services/industries/e-commerce', 'pages/industries/Retail.tsx'),
      route('oeffentliche-auftraege', 'pages/industries/PublicSector.tsx'),

      // Local SEO Programmatic Routes
      route('webagentur-:city', 'pages/local/CityPage.tsx'),

      // AI Hub (Alias for Soft 404 fix)
      route('ai', 'pages/Analyzer.tsx', { id: 'alias-ai-hub' }),

      // AI Cost Breakdown Routes
      route('ai/kosten/:branche', 'pages/ai/AiCostPage.tsx'),

      // AI Triple Pages
      route('ai/:slug', 'pages/ai/TriplePage.tsx'),

      // AI Persona Pages
      route('ai/fuer/:persona', 'pages/ai/PersonaPage.tsx'),

      // AI Use Case Pages
      route('ai/usecase/:scenario', 'pages/ai/UseCasePage.tsx'),

      // AI Process Pages
      route('ai/prozess/:schritt', 'pages/ai/ProcessPage.tsx'),

      // AI Pricing Bundles
      route('ai/preis/:bundle', 'pages/ai/PricingBundlePage.tsx'),

      // AI Position Pages
      route('ai/position/:thema', 'pages/ai/OpinionPage.tsx'),

      // AI Api & Data Endpoints
      route('ai/api-docs', 'pages/ai/ApiDocsPage.tsx'),
      route('ai/data/:dataset', 'pages/ai/DataEndpointPage.tsx'),
      route('ai/erfahrungen/:quelle', 'pages/ai/ReviewAggregatePage.tsx'),

      // Dynamic Service Detail Route (Fallback)
      route('services/:category/:slug', 'pages/services/ServiceDetail.tsx'),

      // Calculator
      route('calculator', 'pages/Calculator.tsx'),

      // Work / Case Studies
      route('work', 'pages/work/Work.tsx'),

      route('work/batherm', 'pages/work/case-studies/BathermWrapper.tsx'),
      route('work/:slug', 'pages/work/ProjectDetail.tsx'),

      route('process', 'pages/Process.tsx'),
      route('about', 'pages/About.tsx'),
      route('ueber-uns', 'pages/About.tsx', { id: 'about-de' }),
      route('contact', 'pages/Contact.tsx'),
      route('partnerschaft', 'pages/Partnerschaft.tsx'),
      route('garantie', 'pages/Garantie.tsx'),
      route('presse', 'pages/Presse.tsx'),
      route('legal', 'pages/legal/LegalHub.tsx'),
      route('legal/impressum', 'pages/legal/Impressum.tsx'),
      route('legal/datenschutz', 'pages/legal/Privacy.tsx'),
      route('legal/barrierefreiheit', 'pages/legal/AccessibilityStatement.tsx'),
      route('legal/agb', 'pages/legal/Terms.tsx'),
      route('dashboard', 'pages/Dashboard.tsx'),

      // Booking & Packages
      route('angebot/handwerker', 'pages/AngebotHandwerker.tsx'),
      route('booking', 'pages/Booking.tsx'),
      route('packages', 'pages/Packages.tsx'),
      route('pakete', 'pages/Packages.tsx', { id: 'packages-pakete' }),
      route('preise', 'pages/Packages.tsx', { id: 'packages-preise' }),

      // Paid Media Landing Pages (noIndex)
      route('angebot-wetzlar-webdesign', 'pages/landingpages/LocalWetzlar.tsx'),
      route('landingpages/local-wetzlar', 'pages/landingpages/LocalWetzlar.tsx', {
        id: 'alias-lp-wetzlar',
      }),
      route('next-js-migration', 'pages/landingpages/NextJsMigration.tsx'),
      route('landingpages/nextjs-migration', 'pages/landingpages/NextJsMigration.tsx', {
        id: 'alias-lp-nextjs',
      }),

      // Knowledge Routes
      route('knowledge/academy', 'pages/knowledge/Academy.tsx'),
      route('academy', 'pages/knowledge/Academy.tsx', { id: 'academy-root' }),
      route('knowledge/blog', 'pages/knowledge/Blog.tsx'),
      route('blog', 'pages/knowledge/Blog.tsx', { id: 'alias-blog' }),
      route('knowledge/blog/:slug', 'pages/knowledge/BlogPost.tsx'),
      route('knowledge/newsletter', 'pages/knowledge/Newsletter.tsx'),
      route('knowledge/whitepapers', 'pages/knowledge/Whitepapers.tsx'),
      route('knowledge/faq', 'pages/knowledge/FAQ.tsx'),

      // Career Routes
      route('career', 'pages/Careers.tsx'),
      route('careers', 'pages/Careers.tsx', { id: 'careers-plural' }),
      route('career/jobs', 'pages/career/Jobs.tsx'),
      route('career/culture', 'pages/career/Culture.tsx'),
      route('career/benefits', 'pages/career/Benefits.tsx'),

      // AI Tools
      route('analyzer', 'pages/Analyzer.tsx'),
      route('website-audit', 'pages/Analyzer.tsx', { id: 'analyzer-audit' }),

      route('*', 'pages/NotFound.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
