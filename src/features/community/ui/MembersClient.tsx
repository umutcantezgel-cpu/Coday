'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Users,
  Sparkle,
  CalendarBlank,
  ShoppingBag,
  CheckCircle,
  Code,
  PenNib,
  MagnifyingGlass,
  Buildings,
  ShieldCheck,
  ArrowRight,
  PaperPlaneTilt,
} from '@phosphor-icons/react/dist/ssr';

/**
 * Partner network page.
 *
 * This page previously rendered a directory of eight "members" of whom seven
 * were invented — named people at invented companies in real Hessian cities,
 * flagged as available for work. It is now what it can honestly be: a
 * description of the network, who it is for, and how to join. Nobody is listed
 * here who has not agreed to be listed.
 */
const Members: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const communityNav = [
    { label: isEn ? 'Events' : 'Events & Workshops', href: '/community/events', icon: Sparkle },
    { label: isEn ? 'Calendar' : 'Kalender', href: '/community/calendar', icon: CalendarBlank },
    { label: isEn ? 'Partners' : 'Partner', href: '/community/members', icon: Users },
    {
      label: isEn ? 'Services' : 'Leistungen',
      href: '/community/marketplace',
      icon: ShoppingBag,
    },
  ];

  const profiles = [
    {
      icon: Code,
      title: isEn ? 'Frontend engineering' : 'Frontend-Entwicklung',
      body: isEn
        ? 'React 19 and the Next.js App Router, TypeScript, and an eye for what a Lighthouse score actually costs in render time.'
        : 'React 19 und der Next.js App Router, TypeScript, und ein Gespür dafür, was ein Lighthouse-Score in Render-Zeit tatsächlich kostet.',
    },
    {
      icon: PenNib,
      title: isEn ? 'Design & brand' : 'Design & Marke',
      body: isEn
        ? 'UI/UX for businesses rather than for dribbble, brand identity, and motion that survives a slow connection.'
        : 'UI/UX für Unternehmen statt für Dribbble, Markenauftritt, und Motion, die auch eine langsame Verbindung überlebt.',
    },
    {
      icon: MagnifyingGlass,
      title: isEn ? 'Content & SEO' : 'Content & SEO',
      body: isEn
        ? 'Copy that a tradesperson or a practice owner recognises as their own, plus the technical SEO underneath it.'
        : 'Texte, in denen sich ein Handwerksbetrieb oder eine Praxisinhaberin wiedererkennt, und das technische SEO darunter.',
    },
    {
      icon: Buildings,
      title: isEn ? 'Agencies with overflow' : 'Agenturen mit Überlauf',
      body: isEn
        ? 'Agencies who need a Next.js build done properly under their own label, or who have more demand than capacity.'
        : 'Agenturen, die einen Next.js-Build sauber unter eigenem Label gebaut brauchen oder mehr Nachfrage als Kapazität haben.',
    },
  ];

  const benefits = [
    {
      title: isEn ? 'Projects, not tenders' : 'Projekte statt Ausschreibungen',
      body: isEn
        ? 'Work comes as a concrete brief with a client who has already said yes, not as a pitch you might lose.'
        : 'Aufträge kommen als konkretes Briefing mit einem Kunden, der bereits zugesagt hat — nicht als Pitch, den Sie verlieren können.',
    },
    {
      title: isEn ? 'Fixed prices, both ways' : 'Festpreise, in beide Richtungen',
      body: isEn
        ? 'Clients get a binding fixed price after the needs analysis. Partners get the same clarity about their share of it.'
        : 'Kunden bekommen nach der Bedarfsanalyse einen verbindlichen Festpreis. Partner bekommen dieselbe Klarheit über ihren Anteil daran.',
    },
    {
      title: isEn ? 'One point of contact' : 'Ein Ansprechpartner',
      body: isEn
        ? 'You talk to the owner, not to an account layer. Decisions take minutes, not a round of approvals.'
        : 'Sie sprechen mit dem Inhaber, nicht mit einer Account-Ebene. Entscheidungen dauern Minuten, keine Abstimmungsrunde.',
    },
    {
      title: isEn ? 'A technical floor' : 'Ein technischer Boden',
      body: isEn
        ? 'Every build targets 100/100 Core Web Vitals on a modern stack. No legacy WordPress rescue missions.'
        : 'Jedes Projekt zielt auf 100/100 Core Web Vitals auf modernem Stack. Keine Rettungsmissionen für Legacy-WordPress.',
    },
  ];

  const steps = [
    {
      n: '01',
      title: isEn ? 'Send two or three references' : 'Zwei, drei Referenzen schicken',
      body: isEn
        ? 'Links are enough. What matters is what you built and which part of it was yours.'
        : 'Links genügen. Wichtig ist, was Sie gebaut haben und welcher Teil davon Ihrer war.',
    },
    {
      n: '02',
      title: isEn ? 'A 20 minute call' : 'Ein 20-Minuten-Gespräch',
      body: isEn
        ? 'How you work, what you like doing, what you would rather not touch. Honesty here saves both sides a bad project.'
        : 'Wie Sie arbeiten, was Sie gern machen, was Sie lieber nicht anfassen. Ehrlichkeit erspart beiden Seiten ein schlechtes Projekt.',
    },
    {
      n: '03',
      title: isEn ? 'One project together' : 'Ein Projekt gemeinsam',
      body: isEn
        ? 'A clearly scoped piece of a real build. It tells us both more than any framework agreement.'
        : 'Ein klar abgegrenztes Stück eines echten Projekts. Das sagt beiden mehr als jeder Rahmenvertrag.',
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
              const isActive = tab.href === '/community/members';
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
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Central Hesse & Rhine-Main' : 'Mittelhessen & Rhein-Main'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
              <span>{isEn ? 'Partner ' : 'Partner-'}</span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                {isEn ? 'Network' : 'Netzwerk'}
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {isEn
                ? 'Coday is a one-person agency in Wetzlar. For projects that need more than two hands, we work with a small number of freelancers and agencies across Central Hesse and the Rhine-Main region.'
                : 'Coday ist eine Ein-Personen-Agentur in Wetzlar. Für Projekte, die mehr als zwei Hände brauchen, arbeiten wir mit einer kleinen Zahl von Freelancern und Agenturen aus Mittelhessen und dem Rhein-Main-Gebiet zusammen.'}
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <OptimizedIcon icon={ShieldCheck} className="w-6 h-6 text-primary mb-3" />
              <h2 className="font-display font-bold text-lg text-slate-900 mb-2">
                {isEn ? 'Why no member list' : 'Warum hier keine Liste steht'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isEn
                  ? 'We publish a partner only with their explicit consent, with their own name and their own work. The directory goes live once enough partners have agreed to it. Invented profiles will never stand here.'
                  : 'Wir veröffentlichen Partner ausschließlich mit deren ausdrücklicher Zustimmung, mit eigenem Namen und eigener Arbeit. Das Verzeichnis geht online, sobald genügend Partner zugestimmt haben. Erfundene Profile wird es hier nicht geben.'}
              </p>
            </div>
          </div>
        </div>

        {/* Why this network exists */}
        <section className="mb-14 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
            {isEn ? 'Why the network exists' : 'Warum es das Netzwerk gibt'}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              {isEn
                ? 'Most requests that reach us are a website: a fixed price after a free needs analysis, live in ten to fourteen working days, built on Next.js and answering in under 0.3 seconds. That is work one developer can do well, and it is deliberately kept that way.'
                : 'Die meisten Anfragen, die uns erreichen, sind eine Website: Festpreis nach kostenloser Bedarfsanalyse, in zehn bis vierzehn Werktagen online, auf Next.js gebaut und in unter 0,3 Sekunden erreichbar. Das ist Arbeit, die ein Entwickler gut allein machen kann — und das bleibt bewusst so.'}
            </p>
            <p>
              {isEn
                ? 'Some projects are not that. A practice wants photography and copy in the same pass. A trades business needs a recruiting funnel with video. An agency has more demand than developers. Those projects are the reason for this network: rather than turn them down or hand the client to somebody neither of us knows, we bring in a partner and stay the point of contact.'
                : 'Manche Projekte sind das nicht. Eine Praxis will Fotografie und Text im selben Zug. Ein Handwerksbetrieb braucht einen Recruiting-Funnel mit Video. Eine Agentur hat mehr Nachfrage als Entwickler. Genau dafür gibt es dieses Netzwerk: statt abzusagen oder den Kunden an jemanden weiterzureichen, den keiner von uns kennt, holen wir einen Partner dazu und bleiben Ansprechpartner.'}
            </p>
            <p>
              {isEn
                ? 'It stays small on purpose. A directory of a hundred names helps nobody; four people whose work you have seen do.'
                : 'Es bleibt bewusst klein. Ein Verzeichnis mit hundert Namen hilft niemandem; vier Menschen, deren Arbeit man gesehen hat, schon.'}
            </p>
          </div>
        </section>

        {/* Who we are looking for */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'Who we are looking for' : 'Wen wir suchen'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {profiles.map((p) => (
              <li
                key={p.title}
                className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <OptimizedIcon icon={p.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* What partners get */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'What partners get' : 'Was Partner bekommen'}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
            {benefits.map((b) => (
              <li
                key={b.title}
                className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6"
              >
                <OptimizedIcon
                  icon={CheckCircle}
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  weight="fill"
                />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* How joining works */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'How joining works' : 'So läuft die Aufnahme'}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <li key={s.n} className="bg-white rounded-3xl border border-slate-200 p-6">
                <span className="text-3xl font-display font-black text-primary/20">{s.n}</span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-2 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
            {isEn ? 'Want to work together?' : 'Zusammenarbeiten?'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            {isEn
              ? 'Write a few lines about what you do and add two or three links. Every message is read by the owner, Umutcan Emre Tezgel, and answered within 24 hours.'
              : 'Schreiben Sie ein paar Zeilen zu dem, was Sie machen, und legen Sie zwei, drei Links dazu. Jede Nachricht liest Inhaber Umutcan Emre Tezgel selbst und beantwortet sie innerhalb von 24 Stunden.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-800 transition-colors"
            >
              <OptimizedIcon icon={PaperPlaneTilt} className="w-4 h-4" />
              {isEn ? 'Apply as a partner' : 'Als Partner bewerben'}
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {isEn ? 'See our work first' : 'Erst unsere Arbeiten ansehen'}
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Members;
