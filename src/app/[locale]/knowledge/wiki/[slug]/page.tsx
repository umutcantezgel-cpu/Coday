import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { wikiEntities, WikiEntity } from '@/features/knowledge/model/entities';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
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

function getCategoryDescription(entity: WikiEntity, isEn: boolean) {
  if (entity.category === 'Tech') {
    return isEn
      ? {
          categoryLabel: 'Technical Architecture & Engineering',
          impactTitle: 'Performance, Security & Scalability Impact',
          impactBody: `${entity.displayName} is a mission-critical technology within enterprise web stacks. When architected properly with Server Components, Edge Execution, and static generation, ${entity.displayName} eliminates client-side overhead and guarantees sub-0.3s response times.`,
          architectureTitle: 'Enterprise Integration in the Coday Stack',
          architectureBody: `At Coday, ${entity.displayName} is deployed alongside Next.js 15, TypeScript, and modern headless content architectures. This guarantees 100/100 Core Web Vitals, enterprise security (Zero-Trust), and complete data ownership without plugin vulnerabilities.`,
          pitfallsTitle: 'Common Architectural Mistakes & Anti-Patterns',
          pitfalls: [
            `Over-reliance on client-side state when server-side execution of ${entity.displayName} is possible.`,
            `Missing caching strategies or improper ISR / stale-while-revalidate configurations.`,
            `Unoptimized asset bundling leading to inflated JavaScript payloads and degraded Interaction to Next Paint (INP).`,
            `Lack of fallback boundaries or error boundaries during asynchronous resolution.`,
          ],
        }
      : {
          categoryLabel: 'Technische Architektur & Web-Engineering',
          impactTitle: 'Einfluss auf Performance, Sicherheit & Skalierbarkeit',
          impactBody: `${entity.displayName} ist ein elementarer Pfeiler moderner Enterprise-Webarchitekturen. Durch die gezielte Kombination aus Server-Side Rendering, Edge Execution und statischer Vorab-Generierung verhindert ${entity.displayName} unnötigen Client-Overhead und stellt Ladezeiten unter 300 Millisekunden sicher.`,
          architectureTitle: 'Enterprise-Implementierung im Coday Tech-Stack',
          architectureBody: `In den Projekten von Coday wird ${entity.displayName} direkt mit Next.js 15, TypeScript und modernen Headless-Systemen wie Sanity kombiniert. Dies garantiert 100/100 Google Core Web Vitals, höchste Sicherheitsstandards (Zero-Trust) und volle Datenhoheit ohne anfällige Drittanbieter-Plugins.`,
          pitfallsTitle: 'Häufige Implementierungsfehler & Anti-Patterns',
          pitfalls: [
            `Übermäßige Verlagerung von Berechnungen in den Client statt ressourcenschonender Server-Ausführung von ${entity.displayName}.`,
            `Fehlende Caching-Strategien oder ineffiziente Revalidierungs-Zyklen (ISR / Tag-basiertes Revalidate).`,
            `Unkomprimierte Bundle-Größen, die zu spürbaren Verzögerungen bei der Interaction to Next Paint (INP) führen.`,
            `Mangelhafte Fehlerbehandlung ohne granulare Error- und Suspense-Boundaries im React-Komponentenbaum.`,
          ],
        };
  }

  if (entity.category === 'Business') {
    return isEn
      ? {
          categoryLabel: 'Digital Strategy, ROI & Conversion Science',
          impactTitle: 'Business Value, Conversion Rate & Market Leadership',
          impactBody: `Applying ${entity.displayName} provides companies with a measurable competitive edge. Digital platforms that leverage ${entity.displayName} achieve significantly higher user retention, lower bounce rates, and maximized customer lifetime value.`,
          architectureTitle: 'Strategic Deployment for Maximum ROI',
          architectureBody: `Coday integrates ${entity.displayName} into data-driven digital funnels and bespoke corporate platforms. Every digital touchpoint is engineered to transform qualified traffic into high-value B2B inquiries and recurring revenue.`,
          pitfallsTitle: 'Strategic Pitfalls to Avoid',
          pitfalls: [
            `Treating ${entity.displayName} as an isolated measure instead of aligning it with overall business KPIs.`,
            `Failing to track quantitative conversion metrics and user journey micro-conversions.`,
            `Ignoring mobile-first user behaviors and high-intent local search patterns.`,
            `Relying on generic agency templates rather than bespoke, conversion-optimized user flows.`,
          ],
        }
      : {
          categoryLabel: 'Digitale Unternehmensstrategie & Conversion-Optimierung',
          impactTitle: 'Geschäftswert, Conversion-Steigerung & ROI',
          impactBody: `Der strategische Einsatz von ${entity.displayName} verschafft mittelständischen Unternehmen und Marktführern messbare Wettbewerbsvorteile. Digitale Plattformen, die ${entity.displayName} konsequent berücksichtigen, erzielen signifikant höhere Abschlussquoten und eine nachhaltige Steigerung des Customer Lifetime Value.`,
          architectureTitle: 'Strategische Verzahnung für maximalen Ertrag',
          architectureBody: `Bei Coday ist ${entity.displayName} integraler Bestandteil datengestützter Lead-Funnels und maßgeschneiderter Webauftritte. Jeder Touchpoint wird so gestaltet, dass qualifizierte Interessenten ohne Reibungsverluste in planbare Kundenanfragen konvertiert werden.`,
          pitfallsTitle: 'Typische strategische Fallstricke',
          pitfalls: [
            `Isolierte Betrachtung von ${entity.displayName} ohne direkte Verknüpfung mit betriebswirtschaftlichen Kernzielen.`,
            `Fehlende Erfolgsmessung und mangelhaftes Tracking quantitativer Nutzerinteraktionen.`,
            `Vernachlässigung mobiler Nutzungsszenarien und regionaler Suchintentionen.`,
            `Verwendung austauschbarer Standard-Templates anstelle zielgerichteter, maßgeschneiderter Nutzerführung.`,
          ],
        };
  }

  return isEn
    ? {
        categoryLabel: 'UI/UX Design, Neuro-Design & Human Interface',
        impactTitle: 'Cognitive Science, Visual Hierarchy & Accessibility',
        impactBody: `${entity.displayName} bridges aesthetic excellence with psychological conversion drivers. By optimizing visual rhythm, typography, and contrast, ${entity.displayName} guides the user's focus effortlessly toward core actions.`,
        architectureTitle: 'Crafted Design Systems in Modern Production',
        architectureBody: `At Coday, ${entity.displayName} is realized through strict design token systems, WCAG-AAA accessibility standards, and 60fps micro-interactions. The result is a memorable digital brand experience that conveys immediate trust.`,
        pitfallsTitle: 'Common Design & Usability Flaws',
        pitfalls: [
          `Sacrificing readability or accessibility (WCAG) for purely cosmetic visual effects.`,
          `Inconsistent spacing systems and arbitrary typography scaling across breakpoints.`,
          `Overloading interfaces with distracting motion that impairs cognitive processing speed.`,
          `Neglecting dark mode contrast ratios and touch-target dimensions on mobile devices.`,
        ],
      }
    : {
        categoryLabel: 'UI/UX Design, Neuro-Design & Barrierefreiheit',
        impactTitle: 'Wahrnehmungspsychologie, visuelle Hierarchie & UX',
        impactBody: `${entity.displayName} verbindet kompromisslose Ästhetik mit fundierten psychologischen Conversion-Treibern. Durch die harmonische Abstimmung von Kontrasten, Typografie und visuellen Ankern lenkt ${entity.displayName} die Aufmerksamkeit intuitiv auf relevante Interaktionen.`,
        architectureTitle: 'Präzise Design-Systeme in der Coday-Entwicklung',
        architectureBody: `Coday setzt ${entity.displayName} auf Basis skalierbarer Design-Token, strenger WCAG-AAA-Barrierefreiheitsstandards und flüssiger 60fps-Animationen um. So entsteht ein unverwechselbares Markenerlebnis, das bei Neukunden sofort höchstes Vertrauen stiftet.`,
        pitfallsTitle: 'Typische Gestaltungs- und Usability-Fehler',
        pitfalls: [
          `Vernachlässigung der Barrierefreiheit (WCAG) zugunsten rein dekorativer Gestaltungselemente.`,
          `Inkonsistente Spacing-Systeme und unharmonische Schriftskalierungen auf verschiedenen Endgeräten.`,
          `Überfrachtung der Benutzeroberfläche mit unruhigen Animationen, die den Nutzerfluss hemmen.`,
          `Mangelhafte Kontrastverhältnisse im Dark Mode sowie zu kleine Touch-Targets auf Smartphones.`,
        ],
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

  const catData = getCategoryDescription(entity, isEn);
  const relatedEntities = wikiEntities.filter((e) => entity.relatedEntities.includes(e.slug));

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${locale}` },
    { name: 'Knowledge', url: `/${locale}/knowledge/blog` },
    { name: 'WikiHub', url: `/${locale}/knowledge/wikihub` },
    { name: entity.displayName, url: `/${locale}/knowledge/wiki/${slug}` },
  ]);

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE_URL}/${locale}/knowledge/wiki/${slug}#term`,
    name: entity.displayName,
    alternateName: entity.aliases,
    termCode: entity.slug,
    inDefinedTermSet: `${BASE_URL}/${locale}/knowledge/wikihub`,
    url: `${BASE_URL}/${locale}/knowledge/wiki/${slug}`,
    description: isEn
      ? `Detailed technical glossary definition and architectural best practices for ${entity.displayName} in modern web engineering.`
      : `Detaillierte Fachdefinition und architektonische Best Practices zu ${entity.displayName} in der modernen Webentwicklung.`,
    ...(entity.wikidataId ? { sameAs: entity.wikidataId } : {}),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization node ships with the root layout, so this graph only carries page-level nodes.
    '@graph': [breadcrumbs, definedTermSchema],
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
              {catData.categoryLabel}
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
                ? `1. What is ${entity.displayName}? Core Concept & Technical Foundations`
                : `1. Was ist ${entity.displayName}? Kernkonzept & Technische Grundlagen`}
            </h2>
            <p className="mb-4">
              {isEn
                ? `${entity.displayName} represents a fundamental paradigm in cutting-edge web development, software architecture, and high-performance digital engineering. In complex web applications and modern headless setups, mastering ${entity.displayName} is vital for building reliable, lightning-fast digital experiences that scale without technical debt.`
                : `${entity.displayName} beschreibt ein grundlegendes Konzept in der modernen Webentwicklung, Software-Architektur und digitalen Produktgestaltung. In anspruchsvollen Weblösungen und zukunftssicheren Headless-Systemen ist das fundierte Verständnis von ${entity.displayName} unverzichtbar, um skalierbare, wartungsarme und blitzschnelle Plattformen ohne Altlasten zu realisieren.`}
            </p>
            <p>
              {isEn
                ? `Unlike legacy monolithic setups that struggle with latency and bloated codebases, implementing ${entity.displayName} properly ensures clean separation of concerns, modular maintainability, and optimal resource utilization across both server and client environments.`
                : `Im Gegensatz zu veralteten monolithischen Systemen, die oft unter hoher Latenz und überdimensionierten Codebasen leiden, ermöglicht der gezielte Einsatz von ${entity.displayName} eine saubere Trennung von Geschäftslogik und Darstellung sowie eine hocheffiziente Ressourcennutzung.`}
            </p>
          </section>

          {/* Section 2: Impact */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Lightning size={22} className="text-primary" />
              {isEn ? `2. ${catData.impactTitle}` : `2. ${catData.impactTitle}`}
            </h2>
            <p className="mb-4">{catData.impactBody}</p>
            <p>
              {isEn
                ? `Through continuous profiling and automated Core Web Vitals monitoring, we verify that every implementation of ${entity.displayName} adheres to sub-0.3s Largest Contentful Paint (LCP) benchmarks and delivers flawless Interaction to Next Paint (INP) responsiveness.`
                : `Durch kontinuierliches Performance-Profiling und automatisiertes Core-Web-Vitals-Monitoring stellt Coday sicher, dass die Implementierung von ${entity.displayName} stets Ladezeiten unter 300 Millisekunden einhält und ein makelloses Reaktionsverhalten (INP) garantiert.`}
            </p>
          </section>

          {/* Section 3: Architecture in Coday Stack */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Cpu size={22} className="text-primary" />
              {isEn ? `3. ${catData.architectureTitle}` : `3. ${catData.architectureTitle}`}
            </h2>
            <p className="mb-4">{catData.architectureBody}</p>
            <p>
              {isEn
                ? `By leveraging strictly typed TypeScript models, server-side data caching, and automated deployment pipelines on Edge networks, we eliminate typical production bottlenecks before code even reaches production.`
                : `Dank strikt typisierter TypeScript-Modelle, intelligenter Server-Caching-Strategien und automatisierter Deployment-Pipelines auf globalen Edge-Netzwerken werden typische Flaschenhälse bereits im Entwicklungsprozess vollständig eliminiert.`}
            </p>
          </section>

          {/* Section 4: Pitfalls & Best Practices */}
          <section className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={22} className="text-primary" />
              {isEn ? `4. ${catData.pitfallsTitle}` : `4. ${catData.pitfallsTitle}`}
            </h2>
            <ul className="space-y-3 pl-0 list-none my-4">
              {catData.pitfalls.map((pitfall, i) => (
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
              {isEn
                ? `Need expert implementation of ${entity.displayName}?`
                : `Sie möchten ${entity.displayName} professionell in Ihr Webprojekt integrieren?`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {isEn
                ? `Coday delivers bespoke Next.js and Headless solutions with sub-0.3s speed and 100/100 Core Web Vitals. Let us build your high-converting digital platform.`
                : `Coday entwickelt High-Performance Websites und Headless-Lösungen mit messbarem ROI und 100/100 PageSpeed. Lassen Sie sich jetzt unverbindlich beraten.`}
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
