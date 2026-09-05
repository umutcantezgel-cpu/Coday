import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { wikiEntities, WikiEntity } from '@/features/knowledge/model/entities';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  BookBookmark,
  CheckCircle,
  Tag,
  Code,
  Lightning,
  ShieldCheck,
  Cpu,
} from '@phosphor-icons/react/dist/ssr';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const entity of wikiEntities) {
      params.push({ locale, slug: entity.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const entity = wikiEntities.find((e) => e.slug === slug);
  if (!entity) {
    return {
      title: 'Wiki Term Not Found | Coday',
      description: 'The requested wiki term could not be found.',
    };
  }

  const isEn = locale === 'en';
  const title = isEn
    ? `${entity.displayName} – Tech-Wiki | Coday`
    : `${entity.displayName} – Tech-Wiki | Coday`;
  // Description templates must stay within 120-155 chars for every entity:
  // displayName lengths range from 3 ("FWA") to 31 ("Incremental Static Regeneration").
  const description = isEn
    ? `Technical definition, architectural insights and proven best practices for ${entity.displayName} in modern Next.js and web engineering by Coday.`
    : `Definition, technische Einordnung und bewährte Best Practices zu ${entity.displayName} für modernes Webdesign und Next.js Entwicklung von Coday.`;

  return generatePageMetadata({
    title,
    description,
    keywords: [
      entity.displayName,
      ...entity.aliases,
      'Webentwicklung Glossar Wetzlar',
      'Tech Wiki Hessen',
      'Next.js 15 Best Practices',
    ],
    path: `/${locale}/knowledge/wiki/${slug}`,
    type: 'article',
  });
}

interface EntityKnowledge {
  categoryLabel: string;
  definitionLead: string;
  definitionDetails: string;
  impactTitle: string;
  impactLead: string;
  impactMetrics: string;
  architectureTitle: string;
  architectureLead: string;
  architectureImplementation: string;
  pitfallsTitle: string;
  pitfalls: string[];
  ctaTitle: string;
  ctaText: string;
}

function getEntityKnowledge(entity: WikiEntity, isEn: boolean): EntityKnowledge {
  const name = entity.displayName;
  const slug = entity.slug;
  const relText = entity.relatedEntities
    .slice(0, 2)
    .map((s) => s.replace(/-/g, ' '))
    .join(isEn ? ' and ' : ' sowie ');

  // Cluster 1: Core Web Vitals & Web Performance Metrics
  if (
    [
      'core-web-vitals',
      'largest-contentful-paint',
      'interaction-to-next-paint',
      'cumulative-layout-shift',
    ].includes(slug)
  ) {
    return isEn
      ? {
          categoryLabel: 'Core Web Vitals & Performance Engineering',
          definitionLead: `${name} is a standardized user experience metric established by Google to evaluate how quickly, smoothly, and stably a webpage renders for real-world visitors. In modern web engineering, optimizing ${name} is critical for user retention and algorithmic search rankings.`,
          definitionDetails: `Unlike legacy synthetic benchmarks, ${name} measures field data directly in Google Chrome. By isolating render-blocking resources and eliminating client-side main-thread bottlenecks, web applications ensure visitors encounter zero hesitation upon arrival.`,
          impactTitle: `Impact of ${name} on SEO & Conversion`,
          impactLead: `Google officially uses ${name} as a direct Page Experience ranking signal. Websites that fulfill Google's strict "Good" threshold for ${name} consistently achieve higher organic visibility and lower bounce rates across mobile devices.`,
          impactMetrics: `Empirical benchmarks show that sub-second response times directly improve B2B inquiry rates by up to 35%. Optimizing ${name} alongside ${relText} guarantees that user interactions feel instantaneous.`,
          architectureTitle: `${name} Optimization in the Coday Production Stack`,
          architectureLead: `At Coday, ${name} is engineered from the ground up: zero render-blocking third-party scripts, priority asset delivery via Next.js 15, and static HTML pre-generation on Vercel's global Edge network.`,
          architectureImplementation: `Every deployment passes automated Lighthouse CI audits and Real User Monitoring (RUM) tests to ensure ${name} never regresses beyond Google's recommended performance envelope.`,
          pitfallsTitle: `Crucial Pitfalls when Optimizing ${name}`,
          pitfalls: [
            `Loading large third-party tracking scripts or cookie banners that block the browser main thread.`,
            `Missing explicit aspect-ratio attributes on images and embeds causing disruptive layout shifts.`,
            `Executing heavy JavaScript event listeners without requestAnimationFrame or debouncing.`,
            `Serving uncompressed or non-priority hero media above the fold.`,
          ],
          ctaTitle: `Need a 100/100 ${name} Audit for Your Website?`,
          ctaText: `Coday specializes in ultra-fast Next.js architectures with guaranteed sub-0.3s response times. We diagnose and eliminate all performance bottlenecks for businesses in Central Hesse.`,
        }
      : {
          categoryLabel: 'Core Web Vitals & Web-Performance',
          definitionLead: `${name} ist eine standardisierte Metrik von Google zur objektiven Messung der Nutzererfahrung im Web. In der modernen Webentwicklung entscheidet ${name} maßgeblich darüber, wie flüssig und stabil eine Website auf echten Endgeräten wahrgenommen wird.`,
          definitionDetails: `Im Gegensatz zu reinen Labormessungen basiert ${name} auf realen Felddaten (Chrome User Experience Report). Durch die Eliminierung render-blockierender Ressourcen wird sichergestellt, dass Besucher ohne spürbare Wartezeit mit der Plattform interagieren können.`,
          impactTitle: `Einfluss von ${name} auf Google-Rankings & Conversion`,
          impactLead: `Google wertet ${name} als offiziellen Rankingfaktor im Page-Experience-Algorithmus. Websites mit exzellenten Werten für ${name} erzielen nachweislich höhere Platzierungen in den Google-Suchergebnissen und deutlich geringere Absprungraten.`,
          impactMetrics: `Messungen belegen, dass optimierte Reaktionszeiten die Conversion-Rate bei B2B-Anfragen um bis zu 35 % steigern können. Das perfekte Zusammenspiel von ${name} mit ${relText} schützt Ihre Investition vor Rankingverlusten.`,
          architectureTitle: `Implementierung von ${name} im Coday-Stack`,
          architectureLead: `Coday optimiert ${name} von Grund auf: Verzicht auf überflüssige Tracker, priorisiertes Image-Preloading in Next.js 15 und serverseitige HTML-Generierung direkt auf globalen Edge-Nodes.`,
          architectureImplementation: `Jedes Deployment wird über automatisierte CI-Audits verifiziert, sodass ${name} die von Google geforderten Grenzwerte für den grünen Bereich stets zuverlässig einhält.`,
          pitfallsTitle: `Typische Fehler bei der Optimierung von ${name}`,
          pitfalls: [
            `Einbindung schwerer Drittanbieter-Plugins und Tag-Manager, die den Haupt-Thread blockieren.`,
            `Fehlende Breiten- und Höhenangaben bei Bildern, die zu störenden Layout-Verschiebungen führen.`,
            `Unkomprimierte Medien im sichtbaren Bereich (Above the Fold) ohne Preload-Anweisungen.`,
            `Lange JavaScript-Ausführungszeiten bei Klick-Interaktionen ohne asynchrone Entlastung.`,
          ],
          ctaTitle: `Möchten Sie ${name} auf Ihrer Website perfektionieren?`,
          ctaText: `Coday entwickelt kompromisslose Next.js Architekturen mit Ladezeiten unter 300ms und perfekten Google-Scores. Lassen Sie Ihre Plattform unverbindlich analysieren.`,
        };
  }

  // Cluster 2: Next.js, React & Server Architecture
  if (
    [
      'next-js',
      'react-server-components',
      'server-actions',
      'server-side-rendering',
      'static-site-generation',
      'incremental-static-regeneration',
      'route-handlers',
      'api-routes',
      'middleware',
    ].includes(slug)
  ) {
    return isEn
      ? {
          categoryLabel: 'Next.js & Server Architecture',
          definitionLead: `${name} is an advanced architectural foundation that powers modern web applications with minimal client-side JavaScript overhead and high-speed execution.`,
          definitionDetails: `By shifting intensive data processing from the client device to the server edge, ${name} allows complex web platforms to render instantaneously without requiring heavy browser downloads.`,
          impactTitle: `Why ${name} Outperforms Monolithic Frameworks`,
          impactLead: `Legacy platforms like WordPress require bloated database queries on every click. With ${name}, data is pre-rendered or cached at the edge, delivering instant transitions and complete architectural security.`,
          impactMetrics: `Websites engineered with ${name} typically reduce initial bundle payload by up to 70%, ensuring immediate time-to-interactive even on weak mobile connections.`,
          architectureTitle: `${name} within the Coday Production Framework`,
          architectureLead: `Coday utilizes ${name} as a core pillar alongside strict TypeScript models and headless APIs, building bulletproof applications without insecure plugin dependencies.`,
          architectureImplementation: `Server-side boundaries guarantee that sensitive business credentials and API secrets remain completely protected behind the server environment.`,
          pitfallsTitle: `Architectural Pitfalls to Avoid with ${name}`,
          pitfalls: [
            `Marking components with 'use client' unnecessarily, which inflates the client bundle.`,
            `Failing to implement proper static revalidation (ISR) for frequently updated content.`,
            `Neglecting fallback states in Suspense boundaries leading to layout jump during hydration.`,
            `Uncached fetch requests triggering cascading database queries on dynamic routes.`,
          ],
          ctaTitle: `Building a Modern Platform with ${name}?`,
          ctaText: `Coday architects custom Next.js 15 platforms engineered for speed, enterprise security, and measurable ROI for mid-market leaders in Germany.`,
        }
      : {
          categoryLabel: 'Next.js & Moderne Server-Architektur',
          definitionLead: `${name} bildet das technologische Fundament zukunftssicherer Webanwendungen und ermöglicht extrem schnelle Reaktionszeiten bei minimalem Client-JavaScript.`,
          definitionDetails: `Durch die Verlagerung rechenintensiver Datenverarbeitung auf den Server oder globale Edge-Standorte rendert ${name} Webseiten in Bruchteilen einer Sekunde, ohne den Browser des Nutzers zu überlasten.`,
          impactTitle: `Der technologische Vorteil von ${name}`,
          impactLead: `Klassische monolithische CMS wie WordPress erfordern bei jedem Seitenaufruf langsame Datenbankabfragen. ${name} liefert statisch vorgefertigte oder gecachte Inhalte in Rekordzeit aus.`,
          impactMetrics: `Mit ${name} realisierte Webanwendungen reduzieren das auszuliefernde JavaScript oft um mehr als 70 %, was sofortige Interaktivität selbst bei mobilen Datenverbindungen sicherstellt.`,
          architectureTitle: `Praxiseinsatz von ${name} bei Coday`,
          architectureLead: `Coday integriert ${name} in Kombination mit striktem TypeScript und modernen Headless-Schnittstellen für maximale Ausfallsicherheit ohne anfällige Plugin-Ökosysteme.`,
          architectureImplementation: `Sämtliche sensiblen Schnittstellen und API-Schlüssel verbleiben geschützt auf Server-Ebene und sind für Dritte im Quelltext niemals einsehbar.`,
          pitfallsTitle: `Häufige Implementierungsfehler bei ${name}`,
          pitfalls: [
            `Voreiliger Einsatz von 'use client', wodurch unnötiger Code in den Browser geladen wird.`,
            `Fehlende Nutzung von ISR oder tag-basiertem Caching für dynamische Inhaltsaktualisierungen.`,
            `Mangelhafte Suspense-Boundaries, die zu unruhigem Nachladen von Inhaltsbereichen führen.`,
            `Ungecachte Fetch-Aufrufe, die bei hohem Besucheraufkommen zu Serververzögerungen führen.`,
          ],
          ctaTitle: `Planen Sie ein neues Webprojekt mit ${name}?`,
          ctaText: `Coday realisiert maßgeschneiderte Next.js 15 Webanwendungen für ambitionierte Unternehmen in Hessen – schnell, wartungsarm und rechtssicher.`,
        };
  }

  // Cluster 3: SEO, Structured Data & GEO
  if (
    [
      'json-ld',
      'schema-org',
      'faqpage-schema',
      'breadcrumblist-schema',
      'localbusiness-schema',
      'hreflang',
      'canonical-tag',
      'robots-txt',
      'sitemap-xml',
      'e-e-a-t',
      'generative-engine-optimization',
      'markdown-mirroring',
      'llms-txt',
    ].includes(slug)
  ) {
    return isEn
      ? {
          categoryLabel: 'Technical SEO, Schema & Semantic Web',
          definitionLead: `${name} is a structured semantic standard used by search engines and generative AI engines to accurately understand and index web content.`,
          definitionDetails: `By encoding entity relationships, organizational profiles, and content hierarchies into machine-readable formats, ${name} ensures clear visibility in Google Search and AI answer engines.`,
          impactTitle: `Visibility & Rich Snippet Advantage with ${name}`,
          impactLead: `Search engines favor pages that provide explicit, structured context. Implementing ${name} directly unlocks enhanced search results, knowledge panels, and voice-assistant answers.`,
          impactMetrics: `Rich snippets powered by ${name} achieve click-through rates up to 30% higher than traditional plain text search listings.`,
          architectureTitle: `Automated ${name} Integration at Coday`,
          architectureLead: `Coday automatically generates ${name} metadata on the server using strictly validated TypeScript schemas, ensuring zero validation errors in Google Search Console.`,
          architectureImplementation: `Our automated pipelines cross-reference city hierarchies, regional landing pages, and legal entities into unified Schema.org graph nodes.`,
          pitfallsTitle: `Critical Pitfalls in ${name} Implementations`,
          pitfalls: [
            `Schema syntax errors or missing required properties resulting in Google warnings.`,
            `Mismatched canonical URLs or contradictory hreflang language tags.`,
            `Embedding structured data that diverges from visible user-facing text content.`,
            `Using outdated or unvalidated microdata formats instead of modern JSON-LD.`,
          ],
          ctaTitle: `Dominate Local & Technical Search with ${name}`,
          ctaText: `We build structured SEO architectures that secure top positions in Google and AI search engines for companies in Hesse and across Germany.`,
        }
      : {
          categoryLabel: 'Technisches SEO, Schema & Semantik',
          definitionLead: `${name} ist ein semantischer Standard, mit dem Suchmaschinen und KI-Systeme Inhalte, Zusammenhänge und Unternehmensdaten präzise erfassen und einordnen.`,
          definitionDetails: `Durch die Bereitstellung maschinenlesbarer Metadaten stellt ${name} sicher, dass Suchmaschinen wie Google und moderne KI-Antwortsysteme Ihre Inhalte optimal verstehen und bevorzugt präsentieren.`,
          impactTitle: `Sichtbarkeit & Rich-Snippet-Vorteil durch ${name}`,
          impactLead: `Strukturierte Daten schaffen Vertrauen bei Suchmaschinen-Algorithmen. Mit ${name} qualifizieren sich Webseiten für erweiterte Suchtreffer (Rich Snippets), FAQ-Akkordeons und Knowledge-Panel-Einträge.`,
          impactMetrics: `Erweiterte Snippets durch ${name} erzielen in der Praxis um bis to 30 % höhere Klickraten im Vergleich zu gewöhnlichen Standard-Suchergebnissen.`,
          architectureTitle: `Implementierung von ${name} bei Coday`,
          architectureLead: `Coday generiert ${name} serverseitig über validierte TypeScript-Schemata, wodurch Validierungsfehler in der Google Search Console von vornherein ausgeschlossen werden.`,
          architectureImplementation: `Alle regionalen Unternehmensdaten, Leistungsbereiche und Verlinkungshierarchien werden in einem konsistenten Schema.org-Graphen miteinander vernetzt.`,
          pitfallsTitle: `Häufige Fehler bei der Implementierung von ${name}`,
          pitfalls: [
            `Syntaxfehler oder fehlende Pflichtfelder im JSON-LD-Markup laut Schema.org-Spezifikation.`,
            `Widersprüchliche Canonical-Tags oder fehlerhafte Sprachzuweisungen bei hreflang.`,
            `Diskrepanzen zwischen strukturierten Daten und dem für Nutzer sichtbaren Textinhalt.`,
            `Veraltetes Inline-Microdata-Markup anstelle moderner, wartungsarmer JSON-LD-Blöcke.`,
          ],
          ctaTitle: `Möchten Sie Ihre Sichtbarkeit mit ${name} maximieren?`,
          ctaText: `Coday verankert Ihre Marke durch saubere technische SEO-Architektur und strukturierte Schemata an der Spitze der regionalen Google-Suchergebnisse.`,
        };
  }

  // Cluster 4: Headless CMS, Content & Typing
  if (['sanity', 'headless-cms', 'headless-stack', 'typescript', 'tailwind-css'].includes(slug)) {
    return isEn
      ? {
          categoryLabel: 'Headless CMS & Content Engineering',
          definitionLead: `${name} decouples content management from frontend presentation, empowering teams with unparalleled flexibility, speed, and design freedom.`,
          definitionDetails: `Instead of confining content inside database-driven page templates, ${name} delivers structured data through lightning-fast APIs into modern React interfaces.`,
          impactTitle: `Why Enterprises Choose ${name}`,
          impactLead: `Traditional systems tie businesses to rigid theme templates and constant security updates. With ${name}, content creators edit intuitively while the website remains impervious to web vulnerabilities.`,
          impactMetrics: `Eliminating traditional database queries and theme bloat improves editorial agility while reducing maintenance costs by up to 50%.`,
          architectureTitle: `${name} Integration within Coday Projects`,
          architectureLead: `We configure ${name} with customized content schemas and strict TypeScript validations, enabling instantaneous real-time previews without publishing delays.`,
          architectureImplementation: `Content published in ${name} triggers instant on-demand incremental cache revalidations across global Edge networks.`,
          pitfallsTitle: `Best Practices & Pitfalls with ${name}`,
          pitfalls: [
            `Allowing unstructured freeform input that breaks responsive layouts.`,
            `Missing automated image optimization pipelines for user-uploaded assets.`,
            `Failing to establish fallback schemas for optional content fields.`,
            `Neglecting type validation between CMS API responses and frontend components.`,
          ],
          ctaTitle: `Upgrade Your Digital Content Strategy with ${name}`,
          ctaText: `Coday replaces cumbersome legacy CMS platforms with scalable Headless architectures tailored to modern business requirements.`,
        }
      : {
          categoryLabel: 'Headless CMS & Content-Architektur',
          definitionLead: `${name} trennt die redaktionelle Inhaltspflege von der visuellen Darstellung der Website und ermöglicht maximale Flexibilität, Sicherheit und Geschwindigkeit.`,
          definitionDetails: `Inhalte werden nicht mehr in starren Themes abgespeichert, sondern als strukturierte Daten über performante Schnittstellen direkt an das moderne Frontend übergeben.`,
          impactTitle: `Der geschäftliche Mehrwert von ${name}`,
          impactLead: `Unternehmen gewinnen mit ${name} völlige Unabhängigkeit von schwerfälligen Baukästen oder WordPress-Plugins. Ihre Website bleibt wartungsarm, blitzschnell und dauerhaft vor Angriffen geschützt.`,
          impactMetrics: `Der Verzicht auf monolithische CMS-Systeme reduziert den laufenden Wartungsaufwand um bis zu 50 % bei gleichzeitig exzellenter redaktioneller Arbeitsgeschwindigkeit.`,
          architectureTitle: `Praxiseinsatz von ${name} bei Coday`,
          architectureLead: `Coday richtet ${name} mit maßgeschneiderten Eingabemasken und TypeScript-Validierungen ein, inklusive intuitiver Live-Vorschau für alle Redakteure.`,
          architectureImplementation: `Inhaltsänderungen in ${name} lösen automatische, punktuelle Revalidierungen aus – neue Inhalte sind in Sekundenschnelle ohne langen Build-Prozess online.`,
          pitfallsTitle: `Wichtige Best Practices bei ${name}`,
          pitfalls: [
            `Fehlende Validierungsregeln im CMS, die zu unerwünschten Darstellungsfehlern führen.`,
            `Unkomprimierte Uploads hochauflösender Bilder ohne automatisierte WebP-Transformation.`,
            `Mangelhafte Typisierung zwischen API-Rückgaben und Frontend-Komponenten.`,
            `Vernachlässigung von Standardwerten für optionale Inhaltsfelder.`,
          ],
          ctaTitle: `Möchten Sie Ihre Website auf ${name} umstellen?`,
          ctaText: `Coday entwickelt zukunftssichere Headless-Lösungen, mit denen mittelständische Unternehmen ihre Inhalte flexibel und effizient verwalten.`,
        };
  }

  // Cluster 5: Strategy, Business & Agency Philosophy
  if (
    [
      'productized-service',
      'retainer-modell',
      'vendor-lock-in',
      'extreme-ownership',
      'anti-agentur',
      'zero-lock-in',
      'festpreis-garantie',
    ].includes(slug)
  ) {
    return isEn
      ? {
          categoryLabel: 'Agency Philosophy & Business Models',
          definitionLead: `${name} defines our approach to transparent, high-integrity digital partnerships without hidden agency overhead or vendor lock-in.`,
          definitionDetails: `In an industry often characterized by vague estimates and recurring dependency, ${name} prioritizes predictable outcomes, fixed pricing, and complete client data ownership.`,
          impactTitle: `Measurable Business Benefits of ${name}`,
          impactLead: `Businesses partnering under ${name} avoid unexpected budget overruns and eliminate technical lock-in. You own your code, your infrastructure, and your digital assets outright.`,
          impactMetrics: `Predictable project scopes and transparent timelines allow projects to launch within 10 to 14 working days rather than dragging across months of bloated meetings.`,
          architectureTitle: `How Coday Lives ${name} Daily`,
          architectureLead: `At Coday, you communicate directly with the owner and lead developer. No project managers, no junior handoffs, and no opaque hourly billing.`,
          architectureImplementation: `Every agreement includes clear deliverables, defined milestones, and guaranteed service level standards from kickoff to post-launch support.`,
          pitfallsTitle: `What to Avoid in Traditional Agency Engagements`,
          pitfalls: [
            `Signing proprietary contracts that prevent you from transferring your website hosting.`,
            `Accepting open-ended time-and-material billing without a guaranteed price ceiling.`,
            `Relying on agencies that outsource development to anonymous third parties.`,
            `Neglecting written agreements on code ownership and administrative rights.`,
          ],
          ctaTitle: `Experience Transparent Web Development with ${name}`,
          ctaText: `Coday is your reliable solo-agency partner in Central Hesse: clear briefings, binding fixed prices, and direct personal consultation.`,
        }
      : {
          categoryLabel: 'Agenturphilosophie & Geschäftsmodelle',
          definitionLead: `${name} steht für transparente, verlässliche Zusammenarbeit auf Augenhöhe – ohne intransparente Agenturaufschläge oder künstliche Abhängigkeiten.`,
          definitionDetails: `In einer Branche, die häufig von unklaren Kostenvoranschlägen geprägt ist, garantiert ${name} Planungssicherheit, feste Projektbudgets und die uneingeschränkte Datenhoheit des Kunden.`,
          impactTitle: `Der unternehmerische Mehrwert von ${name}`,
          impactLead: `Unternehmen, die auf ${name} setzen, schützen ihr Budget vor unkontrollierten Kostenexplosionen. Sie erhalten die vollständigen Eigentumsrechte an Quellcode, Design und Hosting-Infrastruktur.`,
          impactMetrics: `Durch klare Prozesse und fokussierte Entwicklung gehen Webprojekte bei Coday in der Regel innerhalb von 10 bis 14 Werktagen erfolgreich online – statt monatelang in Meetings zu verharren.`,
          architectureTitle: `Wie Coday ${name} in der Praxis umsetzt`,
          architectureLead: `Bei Coday sprechen Sie direkt mit dem Inhaber und Lead Developer. Keine Umwege über wechselnde Projektmanager, keine Junior-Entwickler und keine versteckten Kosten.`,
          architectureImplementation: `Jedes Angebot basiert auf klar definierten Leistungspaketen mit verbindlichen Festpreisen und vertraglich zugesicherten Qualitätsstandards.`,
          pitfallsTitle: `Typische Fallstricke traditioneller Agenturmodelle`,
          pitfalls: [
            `Proprietäre Baukastensysteme, die einen späteren Umzug zu anderen Anbietern unmöglich machen.`,
            `Abrechnung nach unkalkulierbaren Stundensätzen ohne verbindliche Obergrenze.`,
            `Agenturen, die Entwicklungsaufträge intransparent an Subunternehmer weiterreichen.`,
            `Fehlende schriftliche Vereinbarungen über die vollständigen Rechte am Quellcode.`,
          ],
          ctaTitle: `Suchen Sie eine verlässliche Webagentur mit ${name}?`,
          ctaText: `Coday begleitet Ihr Projekt von der ersten Bedarfsanalyse bis zum erfolgreichen Go-Live – persönlich, verbindlich und zum garantierten Festpreis.`,
        };
  }

  // Default / Category-Based Customization
  const isBusiness = entity.category === 'Business';
  const isDesign = entity.category === 'Design';

  return isEn
    ? {
        categoryLabel: isBusiness
          ? 'Digital Strategy & Business Growth'
          : isDesign
            ? 'UI/UX Design & Human Interface'
            : 'Web Engineering & Architecture',
        definitionLead: `${name} is an essential concept within modern ${entity.category.toLowerCase()} web systems, delivering strategic advantages when implemented in modern digital products.`,
        definitionDetails: `By integrating ${name} seamlessly with ${relText}, digital platforms achieve robust stability, clear user guidance, and sustainable architectural value.`,
        impactTitle: `Strategic Role of ${name}`,
        impactLead: `Focusing on ${name} enables companies to maintain technical superiority, reduce maintenance friction, and improve customer satisfaction across all touchpoints.`,
        impactMetrics: `Professional execution of ${name} directly strengthens brand credibility and supports higher conversion across mobile and desktop interfaces.`,
        architectureTitle: `${name} Architecture at Coday`,
        architectureLead: `Coday incorporates ${name} into production-grade Next.js workflows, pairing scalable frontend architecture with clean data engineering.`,
        architectureImplementation: `Every component related to ${name} is thoroughly tested for accessibility, responsiveness, and sub-0.3s execution speed.`,
        pitfallsTitle: `Common Mistakes Regarding ${name}`,
        pitfalls: [
          `Failing to align ${name} with core business objectives and measurable KPIs.`,
          `Neglecting mobile accessibility and cross-browser responsiveness.`,
          `Using unmaintained third-party libraries instead of clean native implementations.`,
          `Overlooking performance implications on real-world user devices.`,
        ],
        ctaTitle: `Professional Guidance on ${name}`,
        ctaText: `Let Coday engineer a fast, modern digital presence that integrates ${name} with flawless execution and clear fixed pricing.`,
      }
    : {
        categoryLabel: isBusiness
          ? 'Digitale Strategie & Unternehmenswachstum'
          : isDesign
            ? 'UI/UX Design & Nutzerführung'
            : 'Web-Engineering & Architektur',
        definitionLead: `${name} ist ein zentraler Baustein in der zeitgemäßen ${entity.category === 'Tech' ? 'Webentwicklung' : entity.category === 'Design' ? 'UI/UX-Gestaltung' : 'digitalen Unternehmensstrategie'} mit messbarem Praxisnutzen.`,
        definitionDetails: `Im Zusammenspiel mit ${relText} sorgt ${name} für verlässliche Stabilität, intuitive Benutzerführung und nachhaltigen unternehmerischen Erfolg.`,
        impactTitle: `Die Bedeutung von ${name} in der Praxis`,
        impactLead: `Die professionelle Berücksichtigung von ${name} verschafft Unternehmen einen klaren Vorteil gegenüber veralteten Standardlösungen der Konkurrenz.`,
        impactMetrics: `Praxiserprobte Implementierungen von ${name} steigern das Kundenvertrauen und verbessern die Nutzerinteraktion auf allen digitalen Endgeräten spürbar.`,
        architectureTitle: `Implementierung von ${name} bei Coday`,
        architectureLead: `Coday integriert ${name} direkt in moderne Next.js Arbeitsabläufe, abgestimmt auf die individuellen Anforderungen Ihres Unternehmens.`,
        architectureImplementation: `Alle Funktionen rund um ${name} werden auf Barrierefreiheit, mobile Optimierung und blitzschnelle Ladezeiten geprüft.`,
        pitfallsTitle: `Häufige Fehler im Umgang mit ${name}`,
        pitfalls: [
          `Isolierte Umsetzung von ${name} ohne Blick auf die übergeordneten Unternehmensziele.`,
          `Mangelnde Optimierung für mobile Endgeräte und langsame Datenverbindungen.`,
          `Einsatz veralteter Fremdbibliotheken statt schlanker, nativer Web-Standards.`,
          `Fehlende kontinuierliche Überprüfung relevanter Qualitäts- und Geschwindigkeitsmetriken.`,
        ],
        ctaTitle: `Benötigen Sie Expertise rund um ${name}?`,
        ctaText: `Coday berät Sie persönlich und setzt moderne Weblösungen mit ${name} zum garantierten Festpreis in Wetzlar und Mittelhessen um.`,
      };
}

export default async function WikiTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  const entity = wikiEntities.find((e) => e.slug === slug);
  if (!entity) {
    notFound();
  }

  const knowledge = getEntityKnowledge(entity, isEn);
  const relatedEntities = wikiEntities.filter((e) => entity.relatedEntities.includes(e.slug));

  const pageUrl = `${BASE_URL}/${locale}/knowledge/wiki/${slug}`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
      { name: 'Knowledge', url: `/${locale}/knowledge/blog` },
      { name: 'WikiHub', url: `/${locale}/knowledge/wikihub` },
      { name: entity.displayName, url: `/${locale}/knowledge/wiki/${slug}` },
    ],
    pageUrl
  );

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/${locale}/knowledge/wiki/${slug}#term`,
    name: entity.displayName,
    alternateName: entity.aliases,
    termCode: entity.slug,
    inDefinedTermSet: { '@id': `${BASE_URL}/${locale}/knowledge/wikihub` },
    url: `${BASE_URL}/${locale}/knowledge/wiki/${slug}`,
    description: isEn
      ? `Detailed technical glossary definition and architectural best practices for ${entity.displayName} in modern web engineering.`
      : `Detaillierte Fachdefinition und architektonische Best Practices zu ${entity.displayName} in der modernen Webentwicklung.`,
    ...(relatedEntities.length
      ? {
          isRelatedTo: relatedEntities.map((e) => ({
            '@id': `${BASE_URL}/${locale}/knowledge/wiki/${e.slug}#term`,
          })),
        }
      : {}),
    ...(entity.wikidataId ? { sameAs: entity.wikidataId } : {}),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: `${entity.displayName} – Tech-Wiki`,
        description: definedTermSchema.description,
        locale,
        mainEntityId: `${pageUrl}#term`,
      }),
      definedTermSchema,
    ],
  };

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        <nav className="mb-8">
          <Link
            href="/knowledge/wikihub"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-slate-600 hover:text-primary border border-slate-200 text-sm font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{isEn ? 'Back to WikiHub' : 'Zurück zum WikiHub'}</span>
          </Link>
        </nav>

        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {knowledge.categoryLabel}
            </span>
            <span className="text-xs font-mono text-slate-400">/{entity.slug}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 mb-6 tracking-tight">
            {isEn
              ? `${entity.displayName}: Definition, Architecture & Best Practices`
              : `${entity.displayName}: Definition, Architektur & Best Practices`}
          </h1>

          {entity.aliases.length > 0 && (
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag size={14} />
                {isEn ? 'Known Aliases & Terms:' : 'Synonyme & Fachbegriffe:'}
              </span>
              {entity.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                >
                  {alias}
                </span>
              ))}
            </div>
          )}

          {/* Section 1: Definition */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Code size={22} className="text-primary" />
              {isEn
                ? `1. What is ${entity.displayName}? Core Concept & Foundations`
                : `1. Was ist ${entity.displayName}? Kernkonzept & Grundlagen`}
            </h2>
            <p className="mb-4">{knowledge.definitionLead}</p>
            <p>{knowledge.definitionDetails}</p>
          </section>

          {/* Section 2: Impact */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Lightning size={22} className="text-primary" />
              {isEn ? `2. ${knowledge.impactTitle}` : `2. ${knowledge.impactTitle}`}
            </h2>
            <p className="mb-4">{knowledge.impactLead}</p>
            <p>{knowledge.impactMetrics}</p>
          </section>

          {/* Section 3: Architecture in Coday Stack */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Cpu size={22} className="text-primary" />
              {isEn ? `3. ${knowledge.architectureTitle}` : `3. ${knowledge.architectureTitle}`}
            </h2>
            <p className="mb-4">{knowledge.architectureLead}</p>
            <p>{knowledge.architectureImplementation}</p>
          </section>

          {/* Section 4: Pitfalls & Best Practices */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={22} className="text-primary" />
              {isEn ? `4. ${knowledge.pitfallsTitle}` : `4. ${knowledge.pitfallsTitle}`}
            </h2>
            <ul className="space-y-3 pl-0 list-none my-4">
              {knowledge.pitfalls.map((pitfall, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80"
                >
                  <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-slate-800 text-sm sm:text-base font-medium">{pitfall}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Related Concepts */}
          {relatedEntities.length > 0 && (
            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
                <Sparkle size={20} className="text-primary" />
                {isEn
                  ? '5. Related Concepts & Technical Topics'
                  : '5. Verwandte Begriffe & Weiterführende Themen'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedEntities.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/knowledge/wiki/${rel.slug}`}
                    className="p-3.5 bg-slate-50 hover:bg-primary/5 rounded-2xl border border-slate-200/80 hover:border-primary/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {rel.displayName}
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono">/{rel.slug}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* CTA Box */}
        <section className="bg-gradient-to-br from-slate-900 to-secondary-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
              {isEn ? 'High Performance Web Engineering' : 'Maßgeschneiderte Webentwicklung'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">
              {knowledge.ctaTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {knowledge.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <span>{isEn ? 'Request Free Consultation' : 'Kostenlose Erstberatung anfragen'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
