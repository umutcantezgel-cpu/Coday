'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { SeoHead } from '@/shared/ui/SeoHead';
import { BuildingOffice, Lightning, ChartLineUp, MapPin } from '@phosphor-icons/react/dist/ssr';

// Using dummy imports to make sure components resolve correctly or replacing them with inline if they don't exist.
// Since we don't have exactly the widgets, I will create a high-converting standalone page using Tailwind CSS
// and standard Codayweb styles.

const LocalWetzlar: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <div className="bg-background-light min-h-dvh">
      <SeoHead
        title={
          isEn
            ? 'Web Design Wetzlar | High-Performance Websites by Coday'
            : 'Webdesign Wetzlar | High-Performance Websites von Coday'
        }
        description={
          isEn
            ? 'Premium web design and development in Wetzlar. We build websites that sell. Secure your free audit now.'
            : 'Premium Webdesign und Entwicklung in Wetzlar. Wir bauen Websites, die verkaufen. Sichern Sie sich jetzt Ihr kostenloses Audit.'
        }
        pageType="service"
      />

      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-6 block flex items-center justify-center gap-2">
            <MapPin size={20} weight="fill" aria-hidden="true" />{' '}
            {isEn ? 'Local Wetzlar Offer' : 'Lokales Wetzlar Angebot'}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-secondary mb-6 tracking-tight">
            {isEn ? 'Web Design Wetzlar:' : 'Webdesign Wetzlar:'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              {isEn ? 'More Clients from the Region' : 'Mehr Kunden aus der Region'}
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {isEn
              ? 'Your website is your best salesperson. We turn your local business in Wetzlar into a digital client magnet.'
              : 'Ihre Website ist Ihr bester Verkäufer. Wir verwandeln Ihr lokales Geschäft in Wetzlar in einen digitalen Kundenmagneten. Webdesign Wetzlar: Mehr Kunden aus der Region'}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="active:scale-[0.97] bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {isEn ? 'Get Your Free Potential Analysis' : 'Jetzt Potenzial-Analyse sichern'}
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-aurora-white relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Lightning size={32} className="text-primary" weight="duotone" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'Maximum Performance' : 'Maximale Performance'}
              </h2>
              <p className="text-slate-600">
                {isEn
                  ? 'Load times under 1 second for optimal user experience and better Google rankings in Wetzlar.'
                  : 'Ladezeiten unter 1 Sekunde für optimale Nutzererfahrung und bessere Google-Rankings in Wetzlar.'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ChartLineUp
                  size={32}
                  className="text-primary"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'Optimized for Conversion' : 'Auf Conversion optimiert'}
              </h2>
              <p className="text-slate-600">
                {isEn
                  ? 'Data-driven designs that turn local visitors in Wetzlar into paying clients.'
                  : 'Datenbasierte Designs, die aus lokalen Besuchern in Wetzlar zahlende Kunden machen.'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow motion-reduce:duration-[0.01ms]">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BuildingOffice
                  size={32}
                  className="text-primary"
                  weight="duotone"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-xl font-bold text-secondary mb-3">
                {isEn ? 'Regional Dominance' : 'Regionale Dominanz'}
              </h2>
              <p className="text-slate-600">
                {isEn
                  ? 'Dominate search results across Central Hesse with targeted local SEO strategies.'
                  : 'Dominieren Sie die Suchergebnisse in Mittelhessen durch gezielte Local-SEO Strategien.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-700 space-y-6 text-lg leading-relaxed">
          <h2 className="text-3xl font-display font-bold text-secondary mb-8">
            {isEn
              ? 'Professional Web Design in Wetzlar: Your Digital Edge'
              : 'Professionelles Webdesign in Wetzlar: Ihr digitaler Vorsprung'}
          </h2>
          <p>
            {isEn
              ? "Wetzlar is not only the city of optics and precision engineering but also a vibrant economic hub in Central Hesse. In such a dynamic and competitive environment, simply having a digital business card online is no longer enough. Your website is often the first point of contact potential clients have with your business. A professional, well-crafted web design determines within seconds whether trust is built or the visitor moves on to a competitor. We develop bespoke digital platforms for businesses in and around Wetzlar that don't just impress with outstanding design but deliver measurable results as an active sales channel. Our focus is always on making the true value of your business visible."
              : 'Wetzlar ist nicht nur die Stadt der Optik und Feinmechanik, sondern auch ein pulsierendes wirtschaftliches Zentrum in Mittelhessen. In einem so dynamischen und wettbewerbsintensiven Umfeld reicht es heute längst nicht mehr aus, nur eine digitale Visitenkarte im Netz zu haben. Ihre Webseite ist oft der erste Berührungspunkt, den potenzielle Kunden mit Ihrem Unternehmen haben. Ein professionelles, durchdachtes Webdesign entscheidet in den ersten Sekunden darüber, ob Vertrauen aufgebaut wird oder der Besucher zur Konkurrenz abwandert. Wir entwickeln für Unternehmen aus Wetzlar und Umgebung maßgeschneiderte digitale Plattformen, die nicht nur durch ein herausragendes Design bestechen, sondern als aktiver Vertriebskanal messbare Ergebnisse liefern. Unser Fokus liegt stets darauf, den echten Mehrwert Ihres Unternehmens sichtbar zu machen.'}
          </p>
          <p>
            {isEn
              ? 'The key to a successful local online presence lies in the perfect synergy of outstanding user experience (UX), lightning-fast load times, and targeted local search engine optimization (Local SEO). When people in Wetzlar, Gießen, or the Lahn-Dill district search for your services, you need to rank at the very top of Google. We structure your website so that search engines immediately recognize your relevance to the region. At the same time, we leverage cutting-edge technologies to ensure your site runs flawlessly on smartphones, tablets, and desktops. A slow or cluttered website is a real revenue killer — we transform your online presence into a high-performance showcase that excites your target audience and drives action.'
              : 'Der Schlüssel zu einer erfolgreichen lokalen Online-Präsenz liegt in der perfekten Symbiose aus erstklassiger Nutzererfahrung (UX), blitzschnellen Ladezeiten und einer gezielten lokalen Suchmaschinenoptimierung (Local SEO). Wenn Menschen in Wetzlar, Gießen oder dem Lahn-Dill-Kreis nach Ihren Dienstleistungen suchen, müssen Sie bei Google ganz oben stehen. Wir strukturieren Ihre Webseite so, dass Suchmaschinen Ihre Relevanz für die Region sofort erkennen. Gleichzeitig sorgen wir durch modernste Technologien dafür, dass Ihre Seite auf Smartphones, Tablets und Desktop-Rechnern absolut flüssig läuft. Eine langsame oder unübersichtliche Webseite ist ein echter Umsatzkiller – wir machen Ihre Internetpräsenz zu einem performanten Aushängeschild, das Ihre Zielgruppe begeistert und zum Handeln animiert.'}
          </p>
          <p>
            {isEn
              ? "Beyond acquiring new customers, talent recruitment is one of the biggest challenges for local businesses. An outdated website doesn't just deter buyers — it also puts off qualified professionals who research potential employers online beforehand. We design your new website in Wetzlar so it simultaneously serves as a powerful magnet for new employees. By building an authentic careers page and integrating highly user-friendly, mobile-optimized application forms, we dramatically lower the barrier to getting in touch. This positions you as a forward-thinking, strong employer in Central Hesse, enabling you to fill open positions with the right talent far more quickly."
              : 'Neben der Akquise neuer Kunden ist das Thema Mitarbeitergewinnung (Recruiting) eine der größten Herausforderungen für lokale Unternehmen. Eine veraltete Webseite schreckt nicht nur Käufer ab, sondern auch qualifizierte Fachkräfte, die sich im Vorfeld online über potenzielle Arbeitgeber informieren. Wir konzipieren Ihre neue Webseite in Wetzlar so, dass sie gleichzeitig als leistungsstarker Magnet für neue Mitarbeiter fungiert. Durch den Aufbau einer authentischen Karriereseite und die Einbindung extrem nutzerfreundlicher, mobiler Bewerbungsformulare senken wir die Hürde für eine Kontaktaufnahme drastisch. So positionieren Sie sich als zukunftsorientierter, starker Arbeitgeber in Mittelhessen und können offene Stellen deutlich schneller mit den passenden Talenten besetzen.'}
          </p>
          <p>
            {isEn
              ? "Beyond that, we stand by your side as a long-term partner on equal footing. For us, web design doesn't end with the launch. We implement smart features that simplify your day-to-day operations — from automated appointment booking systems for practices to digital application forms that combat the talent shortage in the region. We take care of GDPR-compliant implementation, the highest security standards, and ongoing maintenance of your system. With our expertise in web design for Wetzlar, we elevate your business to the next digital level, strengthen your regional dominance, and secure your competitive advantage for the long term. Trust a local expert who understands your region and your potential clients."
              : 'Darüber hinaus stehen wir Ihnen als langfristiger Partner auf Augenhöhe zur Seite. Webdesign endet für uns nicht mit dem Launch der Seite. Wir implementieren smarte Funktionen, die Ihnen den Geschäftsalltag erleichtern – von automatisierten Terminbuchungssystemen für Praxen bis hin zu digitalen Bewerbungsformularen, die dem Fachkräftemangel in der Region entgegenwirken. Wir kümmern uns um die DSGVO-konforme Umsetzung, höchste Sicherheitsstandards und die kontinuierliche Wartung Ihres Systems. Mit unserer Expertise im Webdesign für Wetzlar heben wir Ihr Unternehmen auf das nächste digitale Level, stärken Ihre regionale Dominanz und sichern Ihren Wettbewerbsvorteil nachhaltig ab. Vertrauen Sie auf einen Experten vor Ort, der Ihre Region und Ihre potenziellen Kunden versteht.'}
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-slate-900 z-0"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
            {isEn ? 'Ready for the Next Step?' : 'Bereit für den nächsten Schritt?'}
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            {isEn
              ? 'Let\u2019s find out how we can scale your business in Wetzlar digitally.'
              : 'Lassen Sie uns herausfinden, wie wir Ihr Unternehmen in Wetzlar digital skalieren können.'}
          </p>
          <button className="active:scale-[0.97] bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {isEn ? 'Book a Free Consultation' : 'Kostenloses Erstgespräch buchen'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default LocalWetzlar;
