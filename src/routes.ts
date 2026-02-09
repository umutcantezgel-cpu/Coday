import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("/", "widgets/layout/RootRedirector.tsx"),
    route(":lng", "widgets/layout/LanguageLayout.tsx", [
        layout("widgets/layout/MainLayout.tsx", [
            index("pages/Home.tsx"),
            route("services", "pages/Services.tsx"),

            // Industry Routes
            route("services/industries", "pages/services/IndustryOverview.tsx"),
            route("services/industries/:slug", "pages/services/IndustryDetail.tsx"),

            // Pillars
            route("services/web-development", "pages/services/WebDevelopment.tsx"),
            route("services/web-design", "pages/services/WebDesign.tsx"),
            route("services/seo", "pages/services/Seo.tsx"),
            route("services/performance", "pages/services/Performance.tsx"),
            route("services/consulting", "pages/services/Consulting.tsx"),

            // Web Development Sub-Services
            route("services/web-development/e-commerce", "pages/services/development/Ecommerce.tsx"),
            route("services/web-development/web-apps", "pages/services/development/WebApps.tsx"),
            route("services/web-development/headless-cms", "pages/services/development/HeadlessCms.tsx"),
            route("services/web-development/api-integrations", "pages/services/development/ApiIntegration.tsx"),
            route("services/web-development/migration", "pages/services/development/Migration.tsx"),

            // Main Service Pages
            route("services/enterprise-web", "pages/services/EnterpriseWeb.tsx"),

            // Web Design Sub-Services
            route("services/web-design/ui-ux", "pages/services/design/UiUx.tsx"),
            route("services/web-design/brand-identity", "pages/services/design/BrandIdentity.tsx"),
            route("services/web-design/design-systems", "pages/services/design/DesignSystems.tsx"),
            route("services/web-design/audit", "pages/services/design/UxAudit.tsx"),

            // Industry Domination Routes
            route("services/industries/handwerk", "pages/industries/Handwerk.tsx"),
            route("services/industries/immobilien", "pages/industries/Immobilien.tsx"),
            route("services/industries/gastronomie", "pages/industries/Gastronomie.tsx"),
            route("services/industries/gesundheit", "pages/industries/Gesundheit.tsx"),
            route("services/industries/dienstleistung", "pages/industries/Dienstleistung.tsx"),
            route("services/industries/e-commerce", "pages/industries/Retail.tsx"),

            // Dynamic Service Detail Route (Fallback)
            route("services/:category/:slug", "pages/services/ServiceDetail.tsx"),

            // Calculator
            route("calculator", "pages/Calculator.tsx"),
            route("preise", "pages/Calculator.tsx", { id: "calculator-preise" }),

            // Work / Case Studies
            route("work", "pages/work/Work.tsx"),

            route("work/batherm", "pages/work/case-studies/BathermWrapper.tsx"),
            route("work/:slug", "pages/work/ProjectDetail.tsx"),

            route("process", "pages/Process.tsx"),
            route("contact", "pages/Contact.tsx"),
            route("legal", "pages/legal/LegalHub.tsx"),
            route("legal/impressum", "pages/legal/Impressum.tsx"),
            route("legal/datenschutz", "pages/legal/Privacy.tsx"),
            route("legal/agb", "pages/legal/Terms.tsx"),
            route("dashboard", "pages/Dashboard.tsx"),

            // Booking & Packages
            route("booking", "pages/Booking.tsx"),
            route("packages", "pages/Packages.tsx"),
            route("pakete", "pages/Packages.tsx", { id: "packages-pakete" }),

            // Knowledge Routes
            route("knowledge/academy", "pages/knowledge/Academy.tsx"),
            route("academy", "pages/knowledge/Academy.tsx", { id: "academy-root" }),
            route("knowledge/blog", "pages/knowledge/Blog.tsx"),
            route("knowledge/blog/:slug", "pages/knowledge/BlogPost.tsx"),
            route("knowledge/newsletter", "pages/knowledge/Newsletter.tsx"),
            route("knowledge/whitepapers", "pages/knowledge/Whitepapers.tsx"),

            // Career Routes
            route("career", "pages/Careers.tsx"),
            route("careers", "pages/Careers.tsx", { id: "careers-plural" }),
            route("career/jobs", "pages/career/Jobs.tsx"),
            route("career/culture", "pages/career/Culture.tsx"),
            route("career/benefits", "pages/career/Benefits.tsx"),

            // AI Tools
            route("analyzer", "pages/Analyzer.tsx"),
            route("website-audit", "pages/Analyzer.tsx", { id: "analyzer-audit" }),

            route("*", "pages/NotFound.tsx"),

            // Icon Preview
            route("preview/icons", "pages/IconPreview.tsx")
        ])
    ])

] satisfies RouteConfig;
