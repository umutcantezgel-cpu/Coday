'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Users,
  CalendarBlank,
  ShoppingBag,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Calculator,
  UserPlus,
  ForkKnife,
  Ticket,
  ClipboardText,
  Translate,
  LockKey,
  Download,
  ChartBar,
  Storefront,
} from '@phosphor-icons/react/dist/ssr';

/**
 * Add-on modules.
 *
 * This page previously listed six invented info products ("Enterprise SEO Audit
 * Suite", "Cold Outreach Academy") that Coday does not sell, each with a star
 * rating and a review count that no one had given. It now lists the modules
 * actually built on top of a website — the same set the industry pages carry in
 * `industriesData.customFeatures` — so the page describes real work.
 */
const Marketplace: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const communityNav = [
    { label: isEn ? 'Events' : 'Events & Workshops', href: '/community/events', icon: Sparkle },
    {
      label: isEn ? 'Availability' : 'Verfügbarkeit',
      href: '/community/calendar',
      icon: CalendarBlank,
    },
    { label: isEn ? 'Partners' : 'Partner', href: '/community/members', icon: Users },
    { label: isEn ? 'Modules' : 'Bausteine', href: '/community/marketplace', icon: ShoppingBag },
  ];

  const modules = [
    {
      icon: CalendarBlank,
      title: isEn ? 'Appointment booking' : 'Terminbuchung',
      body: isEn
        ? 'Self-service booking with your real opening hours, buffer times and automatic confirmations. Removes the phone calls that exist only to agree on a slot.'
        : 'Selbstbuchung mit Ihren echten Öffnungszeiten, Pufferzeiten und automatischer Bestätigung. Spart die Anrufe, die es nur gibt, um einen Termin zu finden.',
      for: isEn ? 'Practices, trades, consulting' : 'Praxen, Handwerk, Beratung',
    },
    {
      icon: UserPlus,
      title: isEn ? 'Express application funnel' : 'Express-Bewerbung',
      body: isEn
        ? 'A 60-second application path with optional video, built for phones. People apply from the page instead of drafting an email they never send.'
        : 'Eine 60-Sekunden-Bewerbungsstrecke mit optionalem Video, für Mobilgeräte gebaut. Bewerber bewerben sich auf der Seite, statt eine Mail zu entwerfen, die sie nie abschicken.',
      for: isEn ? 'Trades, care, hospitality' : 'Handwerk, Pflege, Gastronomie',
    },
    {
      icon: Calculator,
      title: isEn ? 'Needs calculator' : 'Bedarfs-Kalkulator',
      body: isEn
        ? 'A multi-step calculator that gives visitors a realistic range and gives you a qualified lead instead of "please send me a quote".'
        : 'Ein mehrstufiger Kalkulator, der Besuchern eine realistische Spanne gibt und Ihnen einen qualifizierten Lead statt „bitte Angebot schicken".',
      for: isEn ? 'Trades, agencies, B2B services' : 'Handwerk, Agenturen, B2B-Dienstleistung',
    },
    {
      icon: ClipboardText,
      title: isEn ? 'Digital intake form' : 'Digitaler Anamnesebogen',
      body: isEn
        ? 'Patients fill in what they would otherwise write on a clipboard in the waiting room. Encrypted, GDPR-compliant, and readable before they arrive.'
        : 'Patienten füllen aus, was sie sonst im Wartezimmer auf Papier schreiben. Verschlüsselt, DSGVO-konform und lesbar, bevor sie da sind.',
      for: isEn ? 'Practices and clinics' : 'Praxen und Kliniken',
    },
    {
      icon: ForkKnife,
      title: isEn ? 'Digital menu' : 'Digitale Speisekarte',
      body: isEn
        ? 'Editable in minutes, without a PDF and without a designer. Allergens, specials and prices stay current because changing them is trivial.'
        : 'In Minuten änderbar, ohne PDF und ohne Designer. Allergene, Tageskarte und Preise bleiben aktuell, weil das Ändern trivial ist.',
      for: isEn ? 'Restaurants and hotels' : 'Gastronomie und Hotellerie',
    },
    {
      icon: Ticket,
      title: isEn ? 'Voucher shop' : 'Gutschein-Shop',
      body: isEn
        ? 'Sell vouchers directly, with payment and PDF delivery. Turns a quiet season into revenue that arrives now and is redeemed later.'
        : 'Gutscheine direkt verkaufen, mit Zahlung und PDF-Zustellung. Macht aus einer ruhigen Saison Umsatz, der jetzt eingeht und später eingelöst wird.',
      for: isEn ? 'Restaurants, retail, wellness' : 'Gastronomie, Handel, Wellness',
    },
    {
      icon: Storefront,
      title: isEn ? 'Product configurator' : 'Produkt-Konfigurator',
      body: isEn
        ? 'Visitors assemble a variant and watch the price move as they do. Fewer enquiries that start from zero, more that arrive already specified.'
        : 'Besucher stellen eine Variante zusammen und sehen den Preis mitlaufen. Weniger Anfragen, die bei null anfangen, mehr, die schon spezifiziert ankommen.',
      for: isEn ? 'Manufacturing, retail, automotive' : 'Fertigung, Handel, Automobil',
    },
    {
      icon: LockKey,
      title: isEn ? 'Member area' : 'Mitgliederbereich',
      body: isEn
        ? 'A login-protected area for documents, prices or training material that should not be public but should not need an email exchange either.'
        : 'Ein geschützter Bereich für Dokumente, Preise oder Schulungsmaterial, das nicht öffentlich sein soll — aber auch keinen Mailwechsel erfordern muss.',
      for: isEn ? 'Associations, B2B, franchises' : 'Verbände, B2B, Franchise',
    },
    {
      icon: Download,
      title: isEn ? 'Download centre' : 'Download-Center',
      body: isEn
        ? 'Data sheets, certificates and manuals in one findable, versioned place instead of scattered across a dozen subpages.'
        : 'Datenblätter, Zertifikate und Anleitungen an einer auffindbaren, versionierten Stelle statt über ein Dutzend Unterseiten verstreut.',
      for: isEn ? 'Industry, public sector' : 'Industrie, öffentlicher Sektor',
    },
    {
      icon: Translate,
      title: isEn ? 'Multilingual site' : 'Mehrsprachigkeit',
      body: isEn
        ? 'A second or third language with correct hreflang and its own URLs, so each version can rank on its own instead of competing with the first.'
        : 'Eine zweite oder dritte Sprache mit korrektem hreflang und eigenen URLs, damit jede Version für sich ranken kann, statt der ersten Konkurrenz zu machen.',
      for: isEn ? 'Exporters, tourism, clinics' : 'Export, Tourismus, Kliniken',
    },
    {
      icon: ChartBar,
      title: isEn ? 'Blog and knowledge base' : 'Blog & Wissensbereich',
      body: isEn
        ? 'An editorial area you can actually maintain, wired into the site structure so articles support the pages that sell rather than sitting beside them.'
        : 'Ein Redaktionsbereich, den Sie wirklich pflegen können, in die Seitenstruktur eingebunden — damit Artikel die verkaufenden Seiten stützen, statt danebenzustehen.',
      for: isEn ? 'Anyone building organic reach' : 'Alle, die organische Reichweite aufbauen',
    },
    {
      icon: Sparkle,
      title: isEn ? 'Virtual tours' : 'Virtuelle Touren',
      body: isEn
        ? '360-degree walkthroughs embedded without wrecking load time — a property, a practice or a workshop seen before the first visit.'
        : '360-Grad-Rundgänge eingebunden, ohne die Ladezeit zu ruinieren — eine Immobilie, eine Praxis oder eine Werkstatt vor dem ersten Besuch gesehen.',
      for: isEn ? 'Real estate, hotels, clinics' : 'Immobilien, Hotels, Kliniken',
    },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Unified Community Subnavigation */}
        <nav aria-label="Community Navigation" className="flex justify-center mb-10">
          {/* Wraps rather than overflowing: four tabs are 481px wide on a 375px
              screen, which pushed the whole document into horizontal scroll. */}
          <div className="inline-flex max-w-full flex-wrap justify-center p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
            {communityNav.map((tab) => {
              const isActive = tab.href === '/community/marketplace';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <OptimizedIcon
                    icon={Icon}
                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header */}
        <div className="text-left space-y-4 mb-8">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Add-ons for your website' : 'Erweiterungen für Ihre Website'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Digital ' : 'Digitale '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Modules' : 'Bausteine'}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'A website is the base. These are the parts built on top of it when a business needs more than pages — the same modules the industry pages describe, from booking systems to configurators.'
              : 'Eine Website ist die Basis. Das hier sind die Teile, die darauf gebaut werden, wenn ein Betrieb mehr braucht als Seiten — dieselben Bausteine, die auch die Branchenseiten beschreiben, von der Terminbuchung bis zum Konfigurator.'}
          </p>
        </div>

        {/* Pricing note */}
        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 mb-12">
          <OptimizedIcon
            icon={CheckCircle}
            className="w-5 h-5 text-primary shrink-0 mt-0.5"
            weight="fill"
          />
          <p className="text-sm text-slate-600 leading-relaxed">
            {isEn
              ? 'Modules are quoted with the project rather than sold off a shelf: what a booking system costs depends on whether it has to talk to the calendar you already use. The needs analysis puts a fixed price on it; the calculator gives you a range before that.'
              : 'Bausteine werden mit dem Projekt kalkuliert statt aus dem Regal verkauft: Was eine Terminbuchung kostet, hängt davon ab, ob sie mit dem Kalender sprechen muss, den Sie schon nutzen. Die Bedarfsanalyse setzt einen Festpreis darauf, der Kalkulator gibt vorher eine Spanne.'}
          </p>
        </div>

        {/* Modules */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'What can be added' : 'Was dazukommen kann'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {modules.map((m) => (
              <li
                key={m.title}
                className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <OptimizedIcon icon={m.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{m.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 grow">{m.body}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {m.for}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Cross-links */}
        <section className="mb-14 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
            {isEn ? 'Which ones fit your trade' : 'Was zu Ihrer Branche passt'}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            {isEn
              ? 'The industry pages show which of these are worth it for a given business, and what they changed on real projects.'
              : 'Die Branchenseiten zeigen, welche davon sich für welchen Betrieb lohnen und was sie in echten Projekten verändert haben.'}
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {[
              {
                href: '/branchen/handwerk-bau',
                label: isEn ? 'Trades & construction' : 'Handwerk & Bau',
              },
              { href: '/branchen/aerzte-gesundheit', label: isEn ? 'Practices' : 'Ärzte & Praxen' },
              { href: '/branchen/gastronomie', label: isEn ? 'Hospitality' : 'Gastronomie' },
              { href: '/branchen/immobilien', label: isEn ? 'Real estate' : 'Immobilien' },
              { href: '/branchen', label: isEn ? 'All industries' : 'Alle Branchen' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary transition-colors"
                >
                  {l.label}
                  <OptimizedIcon icon={ArrowRight} className="w-3.5 h-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
            {isEn ? 'Put a price on it' : 'Preis darauf setzen'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            {isEn
              ? 'Say which modules you have in mind and what you already run. The 20 minute needs analysis turns that into a binding fixed price.'
              : 'Sagen Sie, welche Bausteine Sie im Kopf haben und was bei Ihnen schon läuft. Die 20-minütige Bedarfsanalyse macht daraus einen verbindlichen Festpreis.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-800 transition-colors"
            >
              <OptimizedIcon icon={Calculator} className="w-4 h-4" />
              {isEn ? 'Estimate it yourself' : 'Selbst kalkulieren'}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {isEn ? 'Ask for a fixed price' : 'Festpreis anfragen'}
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Marketplace;
