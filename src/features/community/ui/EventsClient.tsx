'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Clock,
  VideoCamera,
  MapPin,
  Users,
  CalendarBlank,
  ShoppingBag,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Lightning,
  Code,
  MagnifyingGlass,
  ChartBar,
} from '@phosphor-icons/react/dist/ssr';

/**
 * Workshop formats.
 *
 * This page previously listed four workshops with fixed 2026 dates, a named
 * venue and a remaining-seats count, none of which existed. It now describes
 * the formats on offer and says plainly that dates follow demand — no invented
 * appointment, no manufactured scarcity, and deliberately no Event schema,
 * which would put those invented dates into search results.
 */
const Events: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const communityNav = [
    { label: isEn ? 'Events' : 'Events & Workshops', href: '/community/events', icon: Sparkle },
    { label: isEn ? 'Availability' : 'Verfügbarkeit', href: '/community/calendar', icon: CalendarBlank },
    { label: isEn ? 'Partners' : 'Partner', href: '/community/members', icon: Users },
    {
      label: isEn ? 'Modules' : 'Bausteine',
      href: '/community/marketplace',
      icon: ShoppingBag,
    },
  ];

  const formats = [
    {
      icon: Code,
      kind: isEn ? 'Deep dive workshop' : 'Deep-Dive-Workshop',
      length: isEn ? 'about 2.5 hours' : 'rund 2,5 Stunden',
      mode: isEn ? 'Online' : 'Online',
      modeIcon: VideoCamera,
      title: isEn
        ? 'Next.js App Router in day-to-day agency work'
        : 'Next.js App Router in der Agenturpraxis',
      body: isEn
        ? 'Server components, server actions and where the render time actually goes. Built around the architecture behind this site: sub-0.3s load times, headless CMS, strict TypeScript.'
        : 'Server Components, Server Actions und wohin die Render-Zeit tatsächlich geht. Aufgebaut auf der Architektur hinter dieser Website: Ladezeiten unter 0,3 Sekunden, Headless CMS, striktes TypeScript.',
      who: isEn
        ? 'For developers and agencies moving off WordPress.'
        : 'Für Entwickler und Agenturen, die von WordPress wegwollen.',
    },
    {
      icon: MagnifyingGlass,
      kind: isEn ? 'Strategy session' : 'Strategie-Session',
      length: isEn ? 'about 75 minutes' : 'rund 75 Minuten',
      mode: isEn ? 'Online' : 'Online',
      modeIcon: VideoCamera,
      title: isEn
        ? 'Local SEO for Central Hesse and Rhine-Main'
        : 'Lokales SEO für Mittelhessen & Rhein-Main',
      body: isEn
        ? 'How city pages, district hubs and a consistent Schema.org hierarchy fit together, and how to keep your own pages from competing with each other.'
        : 'Wie Stadtseiten, Kreis-Hubs und eine konsistente Schema.org-Hierarchie zusammenspielen — und wie Sie verhindern, dass die eigenen Seiten sich gegenseitig Konkurrenz machen.',
      who: isEn
        ? 'For businesses that serve a region rather than the whole country.'
        : 'Für Betriebe, die eine Region bedienen statt der ganzen Republik.',
    },
    {
      icon: ChartBar,
      kind: isEn ? 'Conversion masterclass' : 'Conversion-Masterclass',
      length: isEn ? 'about 75 minutes' : 'rund 75 Minuten',
      mode: isEn ? 'Online' : 'Online',
      modeIcon: VideoCamera,
      title: isEn
        ? 'Multi-step calculators and B2B lead funnels'
        : 'Multi-Step-Kalkulatoren & B2B-Lead-Funnels',
      body: isEn
        ? 'Why a needs calculator converts better than a contact form, what belongs in each step, and how to build one without turning the page into a JavaScript payload.'
        : 'Warum ein Bedarfs-Kalkulator besser konvertiert als ein Kontaktformular, was in welchen Schritt gehört, und wie man ihn baut, ohne die Seite in eine JavaScript-Fracht zu verwandeln.',
      who: isEn
        ? 'For anyone whose contact form is the only way in.'
        : 'Für alle, deren Kontaktformular der einzige Weg herein ist.',
    },
    {
      icon: Users,
      kind: isEn ? 'Meetup on site' : 'Meetup vor Ort',
      length: isEn ? 'an evening' : 'ein Abend',
      mode: isEn ? 'Wetzlar' : 'Wetzlar',
      modeIcon: MapPin,
      title: isEn
        ? 'Founders and developers in Central Hesse'
        : 'Gründer & Entwickler in Mittelhessen',
      body: isEn
        ? 'An evening with people who build things in the region: freelancers, agency owners, in-house developers. No stage, no pitch round, no sponsor slot.'
        : 'Ein Abend mit Menschen, die in der Region Dinge bauen: Freelancer, Agenturinhaber, In-House-Entwickler. Keine Bühne, keine Pitch-Runde, kein Sponsoren-Slot.',
      who: isEn
        ? 'Runs once enough people within reach of Wetzlar sign up.'
        : 'Findet statt, sobald genügend Menschen im Umkreis von Wetzlar zusagen.',
    },
  ];

  const steps = [
    {
      n: '01',
      title: isEn ? 'Register interest' : 'Interesse vormerken',
      body: isEn
        ? 'Tell us which format and whether online or on site suits you. No payment, no obligation.'
        : 'Sagen Sie uns, welches Format und ob online oder vor Ort passt. Keine Zahlung, keine Verpflichtung.',
    },
    {
      n: '02',
      title: isEn ? 'A date gets set' : 'Ein Termin entsteht',
      body: isEn
        ? 'Once a format has enough people, we pick a date that fits most of them and confirm by email.'
        : 'Sobald ein Format genug Interessenten hat, suchen wir einen Termin, der den meisten passt, und bestätigen per E-Mail.',
    },
    {
      n: '03',
      title: isEn ? 'At least two weeks notice' : 'Mindestens zwei Wochen Vorlauf',
      body: isEn
        ? 'Nobody gets a calendar invite for the day after tomorrow. You will always have time to plan around it.'
        : 'Niemand bekommt eine Einladung für übermorgen. Sie haben immer Zeit, es einzuplanen.',
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
          {/* Wraps rather than overflowing: four tabs are 481px wide on a 375px
              screen, which pushed the whole document into horizontal scroll. */}
          <div className="inline-flex max-w-full flex-wrap justify-center p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
            {communityNav.map((tab) => {
              const isActive = tab.href === '/community/events';
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
        <div className="text-left space-y-4 mb-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Formats, not fixed dates' : 'Formate statt fester Termine'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Workshops & ' : 'Workshops & '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Meetups' : 'Meetups'}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'Four formats on web performance, local SEO and conversion, run by Coday owner Umutcan Emre Tezgel from Wetzlar. Dates follow demand: tell us which one interests you and we will set one.'
              : 'Vier Formate zu Web-Performance, lokalem SEO und Conversion, gehalten von Coday-Inhaber Umutcan Emre Tezgel aus Wetzlar. Termine richten sich nach der Nachfrage: Sagen Sie uns, welches Format Sie interessiert, dann setzen wir einen an.'}
          </p>
        </div>

        {/* Honest note about dates */}
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 mb-12">
          <OptimizedIcon icon={Lightning} className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            {isEn
              ? 'There are no dates on this page yet, and we would rather leave it that way than publish one we cannot keep. The series is being built up; every format below runs as soon as enough people have registered interest.'
              : 'Auf dieser Seite stehen noch keine Termine — und wir lassen das lieber so, als einen zu veröffentlichen, den wir nicht halten können. Die Reihe wird gerade aufgebaut; jedes Format unten findet statt, sobald genügend Interessenten zusammengekommen sind.'}
          </p>
        </div>

        {/* Formats */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'The formats' : 'Die Formate'}
          </h2>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6" role="list">
            {formats.map((f) => (
              <li
                key={f.title}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <OptimizedIcon icon={f.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {f.kind}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{f.body}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <OptimizedIcon icon={Clock} className="w-3.5 h-3.5 text-slate-400" />
                    {f.length}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <OptimizedIcon icon={f.modeIcon} className="w-3.5 h-3.5 text-slate-400" />
                    {f.mode}
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic">{f.who}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            {isEn ? 'How a date comes about' : 'Wie ein Termin zustande kommt'}
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

        {/* Meanwhile */}
        <section className="mb-14 max-w-3xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
            {isEn ? 'Until then' : 'Bis dahin'}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            {isEn
              ? 'The same material is already written down and free to read. The Academy holds the video masterclasses, the tech wiki explains the terms, and the blog covers the arguments in more depth than a 75 minute session can.'
              : 'Dasselbe Material steht bereits geschrieben und frei zugänglich bereit. In der Academy liegen die Video-Masterclasses, das Tech-Wiki erklärt die Begriffe, und der Blog geht tiefer, als eine 75-Minuten-Session es kann.'}
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {[
              { href: '/knowledge/academy', label: isEn ? 'Academy' : 'Academy' },
              { href: '/knowledge/wikihub', label: isEn ? 'Tech wiki' : 'Tech-Wiki' },
              { href: '/knowledge/blog', label: isEn ? 'Blog' : 'Blog' },
              { href: '/knowledge/whitepapers', label: isEn ? 'Whitepapers' : 'Whitepapers' },
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
            {isEn ? 'Register interest' : 'Interesse vormerken'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            {isEn
              ? 'One line is enough: which format, and online or in Wetzlar. You will hear from us as soon as a date is set, and never otherwise.'
              : 'Eine Zeile genügt: welches Format, und online oder in Wetzlar. Sie hören von uns, sobald ein Termin steht — und sonst nicht.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-800 transition-colors"
            >
              <OptimizedIcon icon={CheckCircle} className="w-4 h-4" />
              {isEn ? 'Put me on the list' : 'Auf die Liste setzen'}
            </Link>
            <Link
              href="/community/calendar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {isEn ? 'Project availability' : 'Projekt-Verfügbarkeit'}
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Events;
