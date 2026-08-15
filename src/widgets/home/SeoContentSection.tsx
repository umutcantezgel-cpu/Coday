import React from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowRight, CheckCircle, ShieldCheck, Lightning } from '@phosphor-icons/react/dist/ssr';

export const SeoContentSection: React.FC = () => {
  return (
    <section
      aria-labelledby="seo-content-heading"
      className="py-24 bg-slate-950 text-slate-200 border-t border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
            High-Performance Webentwicklung & Digitalstrategie
          </span>
          <h2
            id="seo-content-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-4 tracking-tight"
          >
            Maßgeschneidertes Webdesign & Next.js Entwicklung für den Mittelstand
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Coday ist Ihre inhabergeführte Webagentur mit Headquarter in Wetzlar und digitaler
            Reichweite in ganz Hessen & Deutschland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
              <Lightning className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100/100 Core Web Vitals</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Jede Zeile Code wird manuell für maximale Ladezeit optimiert. Vorkompilierte Next.js
              Seiten laden in unter 0,3 Sekunden auf mobilen Endgeräten.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Zero Attack Surface</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Keine angreifbare MySQL-Datenbank oder veraltete PHP-Plugins. Unsere statische
              Edge-Architektur ist immun gegen gängige Angriffsvektoren.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Messbare B2B-Conversions</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Durchdachte User Experience, klare Handlungsaufforderungen und 60-Sekunden
              Express-Recruiting-Strecken für planbares Unternehmenswachstum.
            </p>
          </div>
        </div>

        {/* Longform Editorial Semantic Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed border-t border-slate-900 pt-12">
          <p>
            Als inhabergeführte Webagentur mit Wurzeln in Wetzlar (Mittelhessen) entwickeln wir
            keine Standard-Websites von der Stange. Wir konzipieren und programmieren
            maßgeschneiderte digitale Plattformen mit{' '}
            <strong>Next.js 15, React 19, TypeScript und Tailwind CSS 4</strong>, die
            anspruchsvollen Unternehmen zu spürbarem Marktvorteil verhelfen.
          </p>
          <p>
            Ob B2B-Industriebetrieb, Handwerksunternehmen, Arztpraxis oder technologieorientierter
            Dienstleister: Veraltete monolithische CMS-Systeme bremsen Conversions aus. Wir ersetzen
            langsame Ladezeiten durch blitzschnelle Edge-Auslieferung und sichere
            Headless-CMS-Lösungen (Sanity), die Redakteuren maximale Freiheit bei voller technischer
            Stabilität bieten.
          </p>
          <p>
            Entdecken Sie unsere regionalen Kompetenzzentren in ganz Hessen — von unserem{' '}
            <Link href="/webdesign-agentur-wetzlar" className="text-amber-400 hover:underline">
              HQ Wetzlar
            </Link>
            , über{' '}
            <Link href="/webdesign-giessen" className="text-amber-400 hover:underline">
              Gießen
            </Link>
            ,{' '}
            <Link href="/webdesign-marburg" className="text-amber-400 hover:underline">
              Marburg
            </Link>
            ,{' '}
            <Link href="/webdesign-frankfurt" className="text-amber-400 hover:underline">
              Frankfurt am Main
            </Link>
            ,{' '}
            <Link href="/webdesign-wiesbaden" className="text-amber-400 hover:underline">
              Wiesbaden
            </Link>
            ,{' '}
            <Link href="/webdesign-darmstadt" className="text-amber-400 hover:underline">
              Darmstadt
            </Link>{' '}
            bis nach{' '}
            <Link href="/webdesign-kassel" className="text-amber-400 hover:underline">
              Kassel
            </Link>{' '}
            und{' '}
            <Link href="/webdesign-fulda" className="text-amber-400 hover:underline">
              Fulda
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition duration-300 rounded-full shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
          >
            Kostenloses Website-Audit anfordern
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          <Link
            href="/services/web-development"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-800 transition duration-300 rounded-full"
          >
            Alle Leistungen entdecken
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeoContentSection;
