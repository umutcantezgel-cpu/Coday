'use client';

import React, { useState, useMemo } from 'react';
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
} from '@phosphor-icons/react/dist/ssr';

interface CommunityEvent {
  id: number;
  category: 'webinar' | 'workshop' | 'meetup';
  categoryLabel: string;
  month: string;
  day: number;
  year: number;
  time: string;
  title: string;
  description: string;
  locationType: 'online' | 'hybrid' | 'onsite';
  locationLabel: string;
  speaker: {
    name: string;
    role: string;
  };
  seatsRemaining: number;
  featured?: boolean;
}

const EVENTS_DATA: CommunityEvent[] = [
  {
    id: 1,
    category: 'workshop',
    categoryLabel: 'Deep Dive Workshop',
    month: 'Mai',
    day: 14,
    year: 2026,
    time: '14:00 - 16:30 Uhr',
    title: 'Next.js 15 App Router & Server Actions in der Agenturpraxis',
    description:
      'Lerne praxiserprobte Architekturen für Sub-0,3s Ladezeiten, Sanity CMS Integration und strikte TypeScript-Workflows kennen.',
    locationType: 'online',
    locationLabel: 'Live Zoom & Q&A Session',
    speaker: {
      name: 'Umutcan Tezgel',
      role: 'Head of Engineering @ Coday',
    },
    seatsRemaining: 6,
    featured: true,
  },
  {
    id: 2,
    category: 'webinar',
    categoryLabel: 'Live Strategy Session',
    month: 'Mai',
    day: 28,
    year: 2026,
    time: '18:00 - 19:15 Uhr',
    title: 'Hyper-Lokale SEO-Pyramiden: Platz 1 in Mittelhessen & Rhein-Main',
    description:
      'Wie du mit regionalen Hub-Seiten, strukturierter Schema.org Hierarchie und PageSpeed lokale Suchergebnisse dominierst.',
    locationType: 'online',
    locationLabel: 'Interaktives Webinar',
    speaker: {
      name: 'Umutcan Tezgel',
      role: 'Local SEO Specialist',
    },
    seatsRemaining: 12,
  },
  {
    id: 3,
    category: 'meetup',
    categoryLabel: 'Community Meetup',
    month: 'Juni',
    day: 18,
    year: 2026,
    time: '18:30 - 21:00 Uhr',
    title: 'Hessen Digital Creators & Founders Meetup Wetzlar',
    description:
      'Netzwerken auf Augenhöhe mit Gründern, Entwicklern und Designern aus Mittelhessen. Keynote, Snacks & Deep Talks.',
    locationType: 'onsite',
    locationLabel: 'Coday Creative Hub, Wetzlar',
    speaker: {
      name: 'Coday Network',
      role: 'Wetzlar & Giessen Community',
    },
    seatsRemaining: 4,
    featured: true,
  },
  {
    id: 4,
    category: 'webinar',
    categoryLabel: 'Conversion Masterclass',
    month: 'Juli',
    day: 0o2,
    year: 2026,
    time: '15:00 - 16:15 Uhr',
    title: 'B2B Lead Funnels & Multi-Step Kalkulatoren ohne Code-Slop',
    description:
      'Erfahre, wie interaktive Bedarfs-Kalkulatoren die Conversion-Rate auf Agentur- und Handwerker-Websites verdoppeln.',
    locationType: 'online',
    locationLabel: 'Live Stream + Toolkit',
    speaker: {
      name: 'Umutcan Tezgel',
      role: 'UI/UX & Conversion Architect',
    },
    seatsRemaining: 15,
  },
];

const Events: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { key: 'all', label: isEn ? 'All Events' : 'Alle Events' },
    { key: 'workshop', label: isEn ? 'Workshops' : 'Workshops' },
    { key: 'webinar', label: isEn ? 'Webinars' : 'Webinare' },
    { key: 'meetup', label: isEn ? 'Meetups & Community' : 'Meetups vor Ort' },
  ];

  const communityNav = [
    { label: isEn ? 'Events' : 'Events & Workshops', href: '/community/events', icon: Sparkle },
    { label: isEn ? 'Calendar' : 'Kalender', href: '/community/calendar', icon: CalendarBlank },
    { label: isEn ? 'Members' : 'Mitglieder', href: '/community/members', icon: Users },
    {
      label: isEn ? 'Marketplace' : 'Marktplatz',
      href: '/community/marketplace',
      icon: ShoppingBag,
    },
  ];

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return EVENTS_DATA;
    return EVENTS_DATA.filter((e) => e.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Unified Community Subnavigation */}
        <nav aria-label="Community Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
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

        {/* Header Section */}
        <div className="text-left space-y-4 mb-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Live Masterclasses & Knowledge' : 'Live-Masterclasses & Wissensaustausch'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Upcoming ' : 'Anstehende '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Events & Workshops' : 'Events & Workshops'}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'Intensive masterclasses, technical deep dives, and regional meetups for ambitious founders, developers, and designers.'
              : 'Intensive Masterclasses, technische Deep Dives und regionale Community-Treffen für Gründer, Entwickler und Web-Spezialisten.'}
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Events List */}
        <ul className="space-y-6" role="list">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="group relative flex flex-col md:flex-row bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 list-none"
            >
              {/* Date Box / Banner */}
              <div className="md:w-56 bg-slate-900 text-white p-6 sm:p-8 flex md:flex-col items-center justify-between md:justify-center text-center relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/20" />
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-200 block mb-1">
                    {event.month} {event.year}
                  </span>
                  <span className="text-4xl sm:text-5xl font-black font-display text-white block">
                    {event.day < 10 ? `0${event.day}` : event.day}
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono mt-1 block">
                    {event.time.split('-')[0]}
                  </span>
                </div>

                {event.seatsRemaining <= 6 && (
                  <div className="relative z-10 md:mt-4 px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-[11px] font-bold">
                    Nur {event.seatsRemaining} Plätze
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Category & Time / Location Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold uppercase tracking-wider">
                      {event.categoryLabel}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1 font-medium">
                      <OptimizedIcon icon={Clock} className="w-3.5 h-3.5 text-slate-400" />
                      {event.time}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1 font-medium">
                      <OptimizedIcon
                        icon={event.locationType === 'online' ? VideoCamera : MapPin}
                        className="w-3.5 h-3.5 text-slate-400"
                      />
                      {event.locationLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {event.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                </div>

                {/* Footer: Speaker Info + Action Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
                      {event.speaker.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {event.speaker.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{event.speaker.role}</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{isEn ? 'Register for Event' : 'Kostenlos anmelden'}</span>
                    <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Events;
