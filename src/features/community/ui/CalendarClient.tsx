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
  Clock,
  CheckCircle,
  ChatCircleDots,
  RocketLaunch,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';

/**
 * Project availability.
 *
 * This page previously rendered a 2026 calendar grid populated with four
 * workshops that were never scheduled. Rather than invent dates, it now answers
 * the question a client actually arrives with: how soon can you start, and how
 * long does it take. The workshop side lives on /community/events.
 */
const Calendar: React.FC = () => {
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

  const stages = [
    {
      icon: ChatCircleDots,
      when: isEn ? 'Within 24 hours' : 'Innerhalb von 24 Stunden',
      title: isEn ? 'You get an answer' : 'Sie bekommen eine Antwort',
      body: isEn
        ? 'Every enquiry is read and answered by the owner, Umutcan Emre Tezgel. Not a ticket number, not an account manager.'
        : 'Jede Anfrage liest und beantwortet Inhaber Umutcan Emre Tezgel selbst. Keine Ticketnummer, kein Account-Manager.',
    },
    {
      icon: Clock,
      when: isEn ? 'About 20 minutes' : 'Rund 20 Minuten',
      title: isEn ? 'The needs analysis' : 'Die Bedarfsanalyse',
      body: isEn
        ? 'A call about what the site has to achieve, who it is for and what already exists. Free, and it ends with a binding fixed price rather than a range.'
        : 'Ein Gespräch darüber, was die Website leisten muss, für wen sie ist und was schon existiert. Kostenlos, und am Ende steht ein verbindlicher Festpreis statt einer Spanne.',
    },
    {
      icon: RocketLaunch,
      when: isEn ? '10 to 14 working days' : '10 bis 14 Werktage',
      title: isEn ? 'Build and launch' : 'Umsetzung und Livegang',
      body: isEn
        ? 'From the go-ahead to a site that answers, for a typical business website. Shops and portals are scoped separately in the same call.'
        : 'Von der Freigabe bis zur erreichbaren Website, für eine übliche Unternehmensseite. Shops und Portale werden im selben Gespräch getrennt kalkuliert.',
    },
  ];

  const facts = [
    {
      title: isEn ? 'A small number in parallel' : 'Wenige Projekte gleichzeitig',
      body: isEn
        ? 'Coday is one developer, so only a handful of builds run at once. That is where the short lead time comes from, and why a start date is worth asking about early.'
        : 'Coday ist ein Entwickler, deshalb laufen nur wenige Projekte gleichzeitig. Genau daher kommt die kurze Umsetzungszeit — und deshalb lohnt es sich, früh nach einem Starttermin zu fragen.',
    },
    {
      title: isEn ? 'On-site visits are normal' : 'Vor-Ort-Termine sind normal',
      body: isEn
        ? 'Wetzlar, Giessen, Marburg and the Lahn-Dill district are a short drive. Frankfurt and Rhine-Main are roughly 40 minutes via the A5 and A45.'
        : 'Wetzlar, Gießen, Marburg und der Lahn-Dill-Kreis sind eine kurze Fahrt. Frankfurt und Rhein-Main liegen über A5 und A45 rund 40 Minuten entfernt.',
    },
    {
      title: isEn
        ? 'Nothing is charged before the price is fixed'
        : 'Nichts wird vor dem Festpreis berechnet',
      body: isEn
        ? 'The call, the analysis and the quote cost nothing. Billing starts when you accept a fixed price you have in writing.'
        : 'Gespräch, Analyse und Angebot kosten nichts. Abgerechnet wird erst, wenn Sie einem Festpreis zustimmen, den Sie schriftlich vorliegen haben.',
    },
    {
      title: isEn ? 'Launch is not the end' : 'Der Livegang ist nicht das Ende',
      body: isEn
        ? 'Performance and Core Web Vitals are measured after launch rather than promised before it. The guarantee page sets out what that covers.'
        : 'Performance und Core Web Vitals werden nach dem Livegang gemessen statt vorher versprochen. Was das umfasst, steht auf der Garantie-Seite.',
    },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Unified Community Subnavigation */}
        <nav aria-label="Community Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
            {communityNav.map((tab) => {
              const isActive = tab.href === '/community/calendar';
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
        <div className="text-left space-y-4 mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Lead times & capacity' : 'Vorlauf & Kapazität'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Project ' : 'Projekt-'}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Availability' : 'Verfügbarkeit'}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'How quickly a website can start, how long it takes, and how many projects run at once — the honest answer to the question most enquiries open with.'
              : 'Wie schnell eine Website starten kann, wie lange sie dauert und wie viele Projekte gleichzeitig laufen — die ehrliche Antwort auf die Frage, mit der die meisten Anfragen beginnen.'}
          </p>
        </div>

        {/* Timeline */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'From enquiry to live site' : 'Von der Anfrage bis zur Website'}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((s) => (
              <li
                key={s.title}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <OptimizedIcon icon={s.icon} className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {s.when}
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Facts */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'What that means in practice' : 'Was das praktisch bedeutet'}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
            {facts.map((f) => (
              <li
                key={f.title}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <OptimizedIcon
                  icon={CheckCircle}
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  weight="fill"
                />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Questions that actually come up */}
        <section className="mb-14 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'Questions that come up' : 'Fragen, die immer wieder kommen'}
          </h2>
          <dl className="space-y-5">
            {[
              {
                q: isEn
                  ? 'Does the clock start before I have the content?'
                  : 'Läuft die Zeit, bevor ich die Inhalte habe?',
                a: isEn
                  ? 'No. The ten to fourteen working days begin once texts and images are in. If you do not have them, copy and photography can be part of the scope — that is what the partner network is for.'
                  : 'Nein. Die zehn bis vierzehn Werktage beginnen, wenn Texte und Bilder da sind. Falls Sie sie nicht haben, können Text und Fotografie Teil des Auftrags sein — dafür gibt es das Partner-Netzwerk.',
              },
              {
                q: isEn
                  ? 'What if my current site has to stay online?'
                  : 'Was, wenn meine jetzige Seite online bleiben muss?',
                a: isEn
                  ? 'That is the normal case. The new site is built on a separate address and only goes live when you have seen it. The switchover itself takes minutes, and old URLs are redirected so nothing that ranks today gets lost.'
                  : 'Das ist der Normalfall. Die neue Seite entsteht unter einer eigenen Adresse und geht erst live, wenn Sie sie gesehen haben. Die Umstellung selbst dauert Minuten, und alte URLs werden weitergeleitet, damit nichts verloren geht, was heute rankt.',
              },
              {
                q: isEn
                  ? 'Can it be faster than ten days?'
                  : 'Geht es auch schneller als zehn Tage?',
                a: isEn
                  ? 'Sometimes, for a small site where the content is ready. But nothing is promised that would have to be made up for by cutting the parts you cannot see: performance, accessibility, structured data.'
                  : 'Manchmal, bei einer kleinen Seite mit fertigen Inhalten. Versprochen wird aber nichts, was hinterher an den unsichtbaren Teilen eingespart werden müsste: Performance, Barrierefreiheit, strukturierte Daten.',
              },
              {
                q: isEn
                  ? 'What happens if you are ill or on holiday?'
                  : 'Was passiert bei Krankheit oder Urlaub?',
                a: isEn
                  ? 'You are told before the project starts if a gap is coming, and the date accounts for it. A one-person agency cannot hide behind a team, so the schedule is planned honestly rather than optimistically.'
                  : 'Sie erfahren vor Projektstart, wenn eine Lücke ansteht, und der Termin berücksichtigt sie. Eine Ein-Personen-Agentur kann sich nicht hinter einem Team verstecken — deshalb wird der Zeitplan ehrlich statt optimistisch geplant.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl border border-slate-200 p-6">
                <dt className="font-bold text-slate-900 mb-2">{item.q}</dt>
                <dd className="text-sm text-slate-600 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Cross-links */}
        <section className="mb-14 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
            {isEn ? 'Before you book' : 'Bevor Sie buchen'}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            {isEn
              ? 'If you would rather know the shape of the work and a realistic budget first, three pages answer that without a call: the method, the packages, and the calculator that gives you a range in a couple of minutes.'
              : 'Wenn Sie vorher wissen wollen, wie die Arbeit abläuft und welches Budget realistisch ist, beantworten das drei Seiten ohne Gespräch: das Vorgehen, die Pakete und der Kalkulator, der in zwei Minuten eine Spanne ausgibt.'}
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {[
              { href: '/process', label: isEn ? 'How we work' : 'Unser Vorgehen' },
              { href: '/pricing', label: isEn ? 'Packages' : 'Pakete & Preise' },
              { href: '/calculator', label: isEn ? 'Cost calculator' : 'Kostenrechner' },
              { href: '/garantie', label: isEn ? 'Guarantee' : 'Garantie' },
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
          <OptimizedIcon icon={ShieldCheck} className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
            {isEn ? 'Ask about a start date' : 'Nach einem Starttermin fragen'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            {isEn
              ? 'Twenty minutes, free, and you come out of it knowing what your project costs and when it could go live.'
              : 'Zwanzig Minuten, kostenlos, und Sie wissen danach, was Ihr Projekt kostet und wann es online gehen könnte.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-800 transition-colors"
            >
              <OptimizedIcon icon={CalendarBlank} className="w-4 h-4" />
              {isEn ? 'Book the 20 minute call' : '20-Minuten-Gespräch buchen'}
            </Link>
            <Link
              href="/community/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {isEn ? 'Workshop formats' : 'Workshop-Formate'}
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Calendar;
