import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, CheckCircle, ShieldCheck, Lightning } from '@phosphor-icons/react/dist/ssr';

export const SeoContentSection: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section
      aria-labelledby="seo-content-heading"
      className="py-24 bg-slate-50/80 text-slate-800 border-t border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-700 font-semibold tracking-wider uppercase text-xs sm:text-sm">
            {isEn
              ? 'High-Performance Web Development & Strategy'
              : 'High-Performance Webentwicklung & Digitalstrategie'}
          </span>
          <h2
            id="seo-content-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-2 mb-4 tracking-tight"
          >
            {isEn
              ? 'Tailored Web Design & Next.js Development for Growth'
              : 'Maßgeschneidertes Webdesign & Next.js Entwicklung für den Mittelstand'}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg">
            {isEn
              ? 'Coday is your owner-operated web agency headquartered in Wetzlar with digital reach across Hesse & Germany.'
              : 'Coday ist Ihre inhabergeführte Webagentur mit Headquarter in Wetzlar und digitaler Reichweite in ganz Hessen & Deutschland.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
              <Lightning className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">100/100 Core Web Vitals</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {isEn
                ? 'Every line of code is manually optimized for minimal load times. Pre-rendered Next.js pages load in under 0.3 seconds on mobile devices.'
                : 'Jede Zeile Code wird manuell für maximale Ladezeit optimiert. Vorkompilierte Next.js Seiten laden in unter 0,3 Sekunden auf mobilen Endgeräten.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Attack Surface</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {isEn
                ? 'No vulnerable MySQL databases or outdated PHP plugins. Our static Edge architecture is immune to common web vulnerabilities.'
                : 'Keine angreifbare MySQL-Datenbank oder veraltete PHP-Plugins. Unsere statische Edge-Architektur ist immun gegen gängige Angriffsvektoren.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-200/50">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {isEn ? 'Measurable B2B Conversions' : 'Messbare B2B-Conversions'}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {isEn
                ? 'Thoughtful UX design, clear conversion paths, and 60-second recruiting funnels built for sustainable business growth.'
                : 'Durchdachte User Experience, klare Handlungsaufforderungen und 60-Sekunden Express-Recruiting-Strecken für planbares Unternehmenswachstum.'}
            </p>
          </div>
        </div>

        {/* Longform Editorial Semantic Content */}
        <div className="prose max-w-none space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed border-t border-slate-200 pt-12">
          {isEn ? (
            <>
              <p>
                As an owner-operated web agency rooted in Wetzlar (Central Hesse), we do not build
                generic website templates. We architect and engineer bespoke digital platforms with{' '}
                <strong className="text-slate-900">
                  Next.js 15, React 19, TypeScript, and Tailwind CSS 4
                </strong>
                , empowering ambitious businesses to gain a measurable competitive edge online.
              </p>
              <p>
                Whether B2B enterprise, craft company, medical practice, or digital service
                provider: outdated monolithic CMS setups slow down conversions. We replace sluggish
                load times with instant Edge delivery and secure Headless CMS setups (Sanity) that
                give editorial teams maximum creative freedom with enterprise-grade stability.
              </p>
              <p>
                Explore our regional presence across Hesse — from our{' '}
                <Link
                  href="/webdesign-agentur-wetzlar"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Wetzlar HQ
                </Link>
                , to{' '}
                <Link
                  href="/webdesign-giessen"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Gießen
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-marburg"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Marburg
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-frankfurt"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Frankfurt am Main
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-wiesbaden"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Wiesbaden
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-darmstadt"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Darmstadt
                </Link>{' '}
                to{' '}
                <Link
                  href="/webdesign-kassel"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Kassel
                </Link>{' '}
                and{' '}
                <Link
                  href="/webdesign-fulda"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Fulda
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <p>
                Als inhabergeführte Coday Webagentur mit Wurzeln in Wetzlar (Mittelhessen)
                entwickeln wir keine Standard-Websites von der Stange. Wir konzipieren und
                programmieren maßgeschneiderte digitale Plattformen und High-End Webdesign mit{' '}
                <strong className="text-slate-900">
                  Next.js 15, React 19, TypeScript und Tailwind CSS 4
                </strong>
                , die anspruchsvollen Unternehmen zu spürbarem Marktvorteil verhelfen.
              </p>
              <p>
                Ob B2B-Industriebetrieb, Handwerksunternehmen, Arztpraxis oder
                technologieorientierter Dienstleister: Veraltete monolithische CMS-Systeme bremsen
                Conversions aus. Wir ersetzen langsame Ladezeiten durch blitzschnelle
                Edge-Auslieferung und sichere Headless-CMS-Lösungen (Sanity), die Redakteuren
                maximale Freiheit bei voller technischer Stabilität bieten.
              </p>
              <p>
                Entdecken Sie unsere regionalen Kompetenzzentren in ganz Hessen — von unserem{' '}
                <Link
                  href="/webdesign-agentur-wetzlar"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  HQ Wetzlar
                </Link>
                , über{' '}
                <Link
                  href="/webdesign-giessen"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Gießen
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-marburg"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Marburg
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-frankfurt"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Frankfurt am Main
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-wiesbaden"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Wiesbaden
                </Link>
                ,{' '}
                <Link
                  href="/webdesign-darmstadt"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Darmstadt
                </Link>{' '}
                bis nach{' '}
                <Link
                  href="/webdesign-kassel"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Kassel
                </Link>{' '}
                und{' '}
                <Link
                  href="/webdesign-fulda"
                  className="text-amber-700 hover:text-amber-800 font-medium hover:underline"
                >
                  Fulda
                </Link>
                .
              </p>
            </>
          )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-primary-700 hover:bg-primary-800 transition duration-300 rounded-full shadow-md shadow-primary-700/20 hover:scale-[1.02]"
          >
            {isEn ? 'Request Free Website Audit' : 'Kostenloses Website-Audit anfordern'}
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          <Link
            href="/services/web-development"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition duration-300 rounded-full shadow-sm"
          >
            {isEn ? 'Explore All Services' : 'Alle Leistungen entdecken'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeoContentSection;
