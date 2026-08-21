'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Code, RocketLaunch, ShieldCheck, Lightning } from '@phosphor-icons/react/dist/ssr';

interface NextJsMigrationProps {
  h1Title?: string;
  h1Highlight?: string;
}

const NextJsMigration: React.FC<NextJsMigrationProps> = ({ h1Title, h1Highlight }) => {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <div className="bg-background-light min-h-dvh">
      <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 px-4 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-6 block flex items-center justify-center gap-2">
            <Code size={20} weight="fill" aria-hidden="true" />{' '}
            {isEn ? 'Next.js Enterprise Migration' : 'Next.js Enterprise Migration'}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl mb-6 tracking-tight">
            {h1Title || (isEn ? 'From Legacy to Next.js:' : 'Von Legacy zu Next.js:')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {h1Highlight ||
                (isEn
                  ? 'The Performance Boost for Your Business'
                  : 'Der Performance-Boost für Ihr Business')}
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            {isEn
              ? 'Slow load times and poor Core Web Vitals are costing you real money. Migrate to React and Next.js now for maximum performance and conversion.'
              : 'Langsame Ladezeiten und schlechte Core Web Vitals kosten Sie bares Geld. Migrieren Sie jetzt auf React und Next.js für maximale Performance und Konversion.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="active:scale-[0.97] bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors motion-reduce:duration-[0.01ms] shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1">
              {isEn ? 'Request a Migration Audit' : 'Migrations-Audit anfragen'}
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary">
              {isEn ? 'Why Migrate to Next.js?' : 'Warum eine Next.js Migration?'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Lightning
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'Extreme Speed' : 'Extreme Geschwindigkeit'}
              </h3>
              <p className="text-slate-600">
                {isEn
                  ? 'Thanks to SSR and SSG, your pages load in milliseconds. Perfect Core Web Vitals guaranteed.'
                  : 'Dank SSR und SSG laden Ihre Seiten in Millisekunden. Perfekte Core Web Vitals garantiert.'}
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <RocketLaunch
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'SEO Dominance' : 'SEO-Dominanz'}
              </h3>
              <p className="text-slate-600">
                {isEn
                  ? 'Search engines love Next.js. Improve your ranking through server-side rendering.'
                  : 'Suchmaschinen lieben Next.js. Verbessern Sie Ihr Ranking durch serverseitiges Rendering.'}
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors motion-reduce:duration-[0.01ms]">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck
                  size={32}
                  className="text-blue-600"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'Future-Proof' : 'Zukunftssicherheit'}
              </h3>
              <p className="text-slate-600">
                {isEn
                  ? 'Enterprise architecture that scales. The standard for modern and complex web applications.'
                  : 'Enterprise-Architektur, die skaliert. Der Standard für moderne und komplexe Webanwendungen.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-700 space-y-6 text-lg leading-relaxed">
          <h2 className="text-3xl font-display font-bold text-secondary mb-8 text-center">
            {isEn
              ? 'Deep Expertise in Next.js Migration'
              : 'Tiefgreifende Expertise in der Next.js Migration'}
          </h2>
          <p>
            {isEn
              ? 'Migrating to Next.js is a strategic move that goes far beyond a simple redesign. It is a complete re-platforming to one of the most powerful and future-proof React frameworks in modern web development. Outdated monolithic systems or sluggish CMS solutions often result in high maintenance costs, are vulnerable to security gaps, and deliver insufficient performance. With Next.js, we transform your digital architecture into a lightning-fast, secure, and highly scalable system. By leveraging server-side rendering (SSR) and static site generation (SSG), page content is pre-rendered on the server and delivered to users via global edge networks in milliseconds.'
              : 'Eine Migration zu Next.js ist ein strategischer Schritt, der weit über ein einfaches Redesign hinausgeht. Es handelt sich um ein vollständiges Re-Platforming auf eine der leistungsfähigsten und zukunftssichersten React-Frameworks der modernen Webentwicklung. Veraltete monolithische Systeme oder schwerfällige CMS-Lösungen verursachen oft hohe Wartungskosten, sind anfällig für Sicherheitslücken und bieten eine unzureichende Performance. Mit Next.js transformieren wir Ihre digitale Architektur in ein blitzschnelles, sicheres und hochskalierbares System. Durch die Nutzung von serverseitigem Rendering (SSR) und statischer Generierung (SSG) werden Seiteninhalte bereits auf dem Server vorgerendert und über globale Edge-Netzwerke in Millisekunden an den Nutzer ausgeliefert.'}
          </p>
          <p>
            {isEn
              ? 'This significant improvement in load times has a direct and positive impact on your Core Web Vitals, which is rewarded by Google and other search engines with better rankings (SEO). At the same time, the smoother and faster user experience leads to lower bounce rates and significantly higher conversion rates. Visitors to your website no longer experience frustrating delays, which strengthens trust in your brand and noticeably increases willingness to engage. Especially in e-commerce and data-intensive corporate websites, this performance boost is a measurable competitive advantage.'
              : 'Diese signifikante Verbesserung der Ladezeiten wirkt sich direkt und positiv auf Ihre Core Web Vitals aus, was von Google und anderen Suchmaschinen mit besseren Rankings belohnt wird (SEO). Gleichzeitig führt die flüssigere und schnellere User Experience zu geringeren Absprungraten und deutlich höheren Conversion-Raten. Besucher Ihrer Webseite erleben keine störenden Verzögerungen mehr, was das Vertrauen in Ihre Marke stärkt und die Interaktionsbereitschaft spürbar erhöht. Besonders im E-Commerce und bei datenintensiven Unternehmenswebseiten ist diese Performance-Steigerung ein messbarer Wettbewerbsvorteil.'}
          </p>
          <p>
            {isEn
              ? 'The migration process itself is planned by us with precision and a data-driven approach to strictly avoid any downtime and ranking losses. We analyze your existing infrastructure, safeguard valuable SEO assets such as existing URLs through intelligent redirect strategies, and seamlessly integrate your data sources into a headless architecture via modern APIs. The result is a clean, maintainable, and extensible codebase that enables your business to respond agilely to future market demands. Trust Coday as your experienced partner for a seamless and highly successful Next.js migration.'
              : 'Der Migrationsprozess selbst wird von uns präzise und datengetrieben geplant, um jegliche Ausfallzeiten (Downtime) und Ranking-Verluste strikt zu vermeiden. Wir analysieren Ihre bestehende Infrastruktur, sichern wertvolle SEO-Assets wie bestehende URLs durch intelligente Redirect-Strategien und integrieren Ihre Datenquellen nahtlos über moderne APIs in eine Headless-Architektur. Das Ergebnis ist eine saubere, wartbare und erweiterbare Codebasis, die es Ihrem Unternehmen ermöglicht, agil auf zukünftige Marktanforderungen zu reagieren. Vertrauen Sie auf Coday als Ihren erfahrenen Partner für eine reibungslose und maximal erfolgreiche Next.js Migration.'}
          </p>
        </div>
      </section>

      <section className="py-24 bg-aurora-white relative border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-secondary mb-6">
            {isEn ? 'Let\u2019s Plan Your Migration' : 'Lassen Sie uns Ihre Migration planen'}
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            {isEn
              ? 'Zero downtime. Zero ranking loss. Maximum ROI.'
              : 'Ohne Downtime. Ohne Ranking-Verlust. Mit maximalem ROI.'}
          </p>
          <button className="active:scale-[0.97] bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {isEn ? 'Secure Your Free Potential Analysis' : 'Kostenlose Potenzialanalyse sichern'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default NextJsMigration;
