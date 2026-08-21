'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  CaretLeft,
  CaretRight,
  CalendarBlank,
  Clock,
  VideoCamera,
  MapPin,
  Users,
  ShoppingBag,
  Sparkle,
  ArrowRight,
  ListDashes,
  SquaresFour,
} from '@phosphor-icons/react/dist/ssr';

interface CalendarEvent {
  day: number;
  month: number; // 0-indexed, 4 = May, 5 = June
  year: number;
  time: string;
  category: 'workshop' | 'webinar' | 'meetup';
  title: string;
  speaker: string;
  location: string;
  badgeColor: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    day: 14,
    month: 4, // May
    year: 2026,
    time: '14:00 - 16:30 Uhr',
    category: 'workshop',
    title: 'Next.js 15 App Router & Server Actions Deep Dive',
    speaker: 'Umutcan Tezgel',
    location: 'Online Zoom',
    badgeColor: 'bg-teal-50 border-teal-200 text-teal-800',
  },
  {
    day: 28,
    month: 4, // May
    year: 2026,
    time: '18:00 - 19:15 Uhr',
    category: 'webinar',
    title: 'Hyper-Lokale SEO-Pyramiden für Mittelhessen',
    speaker: 'Umutcan Tezgel',
    location: 'Live Stream',
    badgeColor: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    day: 18,
    month: 5, // June
    year: 2026,
    time: '18:30 - 21:00 Uhr',
    category: 'meetup',
    title: 'Hessen Digital Creators & Founders Meetup Wetzlar',
    speaker: 'Coday Community',
    location: 'Coday Hub, Wetzlar',
    badgeColor: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  {
    day: 2,
    month: 6, // July
    year: 2026,
    time: '15:00 - 16:15 Uhr',
    category: 'webinar',
    title: 'B2B Lead Funnels & Multi-Step Kalkulatoren',
    speaker: 'Umutcan Tezgel',
    location: 'Online Stream',
    badgeColor: 'bg-amber-50 border-amber-200 text-amber-800',
  },
];

const Calendar: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(4); // 4 = May 2026
  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');
  const [selectedDay, setSelectedDay] = useState<number | null>(14);

  const months = [
    { name: isEn ? 'January 2026' : 'Januar 2026', days: 31, startDay: 3 },
    { name: isEn ? 'February 2026' : 'Februar 2026', days: 28, startDay: 6 },
    { name: isEn ? 'March 2026' : 'März 2026', days: 31, startDay: 6 },
    { name: isEn ? 'April 2026' : 'April 2026', days: 30, startDay: 2 },
    { name: isEn ? 'May 2026' : 'Mai 2026', days: 31, startDay: 4 },
    { name: isEn ? 'June 2026' : 'Juni 2026', days: 30, startDay: 0 },
    { name: isEn ? 'July 2026' : 'Juli 2026', days: 31, startDay: 2 },
    { name: isEn ? 'August 2026' : 'August 2026', days: 31, startDay: 5 },
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

  const activeMonth = months[currentMonthIndex];
  const totalDays = Array.from({ length: activeMonth.days }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: activeMonth.startDay }, (_, i) => i);

  const monthEvents = CALENDAR_EVENTS.filter((e) => e.month === currentMonthIndex);

  const selectedEvent = monthEvents.find((e) => e.day === selectedDay);

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
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

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Live Schedule' : 'Termin-Übersicht & Zeitplan'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
              <span>{isEn ? 'Community ' : 'Community '}</span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                {isEn ? 'Calendar' : 'Kalender'}
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {isEn
                ? 'All masterclasses, webinars, and regional networking dates in one interactive calendar.'
                : 'Alle Workshops, Webinare und regionalen Meetup-Termine auf einen Blick.'}
            </p>
          </div>

          {/* View Toggle (Grid / Agenda) */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <OptimizedIcon icon={SquaresFour} className="w-4 h-4" />
              <span>{isEn ? 'Month' : 'Monat'}</span>
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'agenda'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <OptimizedIcon icon={ListDashes} className="w-4 h-4" />
              <span>{isEn ? 'Agenda' : 'Agenda'}</span>
            </button>
          </div>
        </div>

        {/* Calendar Card Frame */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          {/* Calendar Month Controls */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {activeMonth.name}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMonthIndex === 0}
                aria-label="Vorheriger Monat"
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
              >
                <OptimizedIcon icon={CaretLeft} className="w-4 h-4 text-slate-700" />
              </button>
              <button
                onClick={() =>
                  setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))
                }
                disabled={currentMonthIndex === months.length - 1}
                aria-label="Nächster Monat"
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
              >
                <OptimizedIcon icon={CaretRight} className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>

          {/* Desktop Month Grid */}
          {viewMode === 'grid' && (
            <div className="hidden md:block">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/80 text-center text-xs font-bold uppercase tracking-wider text-slate-500 py-3">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 bg-slate-50/20">
                {leadingBlanks.map((b) => (
                  <div key={`blank-${b}`} className="min-h-[110px] p-2 bg-slate-50/40 opacity-40" />
                ))}

                {totalDays.map((day) => {
                  const event = monthEvents.find((e) => e.day === day);
                  const isSelected = selectedDay === day;

                  return (
                    <div
                      key={day}
                      onClick={() => event && setSelectedDay(day)}
                      className={`min-h-[110px] p-2.5 transition-all flex flex-col justify-between ${
                        event ? 'cursor-pointer hover:bg-slate-50' : 'bg-white'
                      } ${isSelected && event ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            event ? 'bg-secondary text-white' : 'text-slate-600'
                          }`}
                        >
                          {day}
                        </span>
                        {event && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>

                      {event && (
                        <div
                          className={`p-2 rounded-xl border text-[11px] font-medium leading-snug mt-2 shadow-xs ${event.badgeColor}`}
                        >
                          <span className="font-bold block truncate">{event.title}</span>
                          <span className="text-[10px] opacity-80 block">{event.time}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile / Agenda View */}
          <div
            className={`${viewMode === 'agenda' ? 'block' : 'block md:hidden'} p-6 divide-y divide-slate-100`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              {isEn ? `Events in ${activeMonth.name}` : `Events im ${activeMonth.name}`}
            </h3>
            {monthEvents.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                {isEn ? 'No scheduled events for this month.' : 'Keine Termine in diesem Monat.'}
              </div>
            ) : (
              monthEvents.map((evt) => (
                <div key={evt.day} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {evt.day}. {activeMonth.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <OptimizedIcon icon={Clock} className="w-3.5 h-3.5" />
                      {evt.time}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{evt.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <OptimizedIcon icon={Users} className="w-3.5 h-3.5" />
                      {evt.speaker}
                    </span>
                    •
                    <span className="flex items-center gap-1">
                      <OptimizedIcon icon={MapPin} className="w-3.5 h-3.5" />
                      {evt.location}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Event Spotlight Drawer / Card */}
        {selectedEvent && (
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Termin-Highlight: {selectedEvent.day}. {activeMonth.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {selectedEvent.title}
              </h3>
              <p className="text-sm text-slate-500 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <OptimizedIcon icon={Clock} className="w-4 h-4 text-primary" />
                  {selectedEvent.time}
                </span>
                <span className="flex items-center gap-1">
                  <OptimizedIcon icon={VideoCamera} className="w-4 h-4 text-primary" />
                  {selectedEvent.location}
                </span>
                <span className="flex items-center gap-1">
                  <OptimizedIcon icon={Users} className="w-4 h-4 text-primary" />
                  {selectedEvent.speaker}
                </span>
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white text-sm font-bold rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap transition-all"
            >
              <span>{isEn ? 'Save Spot' : 'Platz sichern'}</span>
              <OptimizedIcon icon={ArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Calendar;
