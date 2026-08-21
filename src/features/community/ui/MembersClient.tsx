'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Users,
  MapPin,
  Sparkle,
  CalendarBlank,
  ShoppingBag,
  MagnifyingGlass,
  CheckCircle,
  Briefcase,
  PaperPlaneTilt,
} from '@phosphor-icons/react/dist/ssr';

interface CommunityMember {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  category: 'founders' | 'devs' | 'design' | 'marketing';
  skills: string[];
  initials: string;
  gradient: string;
  availableForProjects?: boolean;
}

const MEMBERS_DATA: CommunityMember[] = [
  {
    id: 1,
    name: 'Umutcan Tezgel',
    role: 'Founder & Full-Stack Architect',
    company: 'Coday Agency',
    location: 'Wetzlar, Hessen',
    category: 'founders',
    skills: ['Next.js 15', 'TailwindCSS', 'TypeScript', 'SEO'],
    initials: 'UT',
    gradient: 'from-primary-700 to-teal-500',
    availableForProjects: true,
  },
  {
    id: 2,
    name: 'Sarah Meyer',
    role: 'Product Lead & UI/UX',
    company: 'Nexus Digital',
    location: 'Frankfurt am Main',
    category: 'design',
    skills: ['Figma', 'Design Systems', 'UX Audit'],
    initials: 'SM',
    gradient: 'from-purple-600 to-indigo-500',
    availableForProjects: false,
  },
  {
    id: 3,
    name: 'Thomas Weber',
    role: 'Head of Growth',
    company: 'ScaleForce Mittelhessen',
    location: 'Gießen, Hessen',
    category: 'marketing',
    skills: ['B2B SEO', 'Inbound Funnels', 'Google Ads'],
    initials: 'TW',
    gradient: 'from-blue-600 to-cyan-500',
    availableForProjects: true,
  },
  {
    id: 4,
    name: 'Michael Schmidt',
    role: 'Senior Backend Engineer',
    company: 'CloudCore Systems',
    location: 'Marburg, Hessen',
    category: 'devs',
    skills: ['Supabase', 'PostgreSQL', 'API Design'],
    initials: 'MS',
    gradient: 'from-slate-700 to-slate-900',
    availableForProjects: true,
  },
  {
    id: 5,
    name: 'Julia Wagner',
    role: 'Brand & Motion Designer',
    company: 'Studio Form & Code',
    location: 'Wiesbaden, Hessen',
    category: 'design',
    skills: ['Brand Identity', 'GSAP', 'Illustration'],
    initials: 'JW',
    gradient: 'from-rose-500 to-amber-500',
    availableForProjects: true,
  },
  {
    id: 6,
    name: 'David Fischer',
    role: 'Head of E-Commerce',
    company: 'RetailHub',
    location: 'Kassel, Hessen',
    category: 'founders',
    skills: ['Shopify Plus', 'Headless Commerce', 'CRO'],
    initials: 'DF',
    gradient: 'from-emerald-600 to-teal-600',
    availableForProjects: false,
  },
  {
    id: 7,
    name: 'Anna Koch',
    role: 'Technical SEO Strategist',
    company: 'RankVector',
    location: 'Darmstadt, Hessen',
    category: 'marketing',
    skills: ['Schema.org', 'Core Web Vitals', 'Geo-Targeting'],
    initials: 'AK',
    gradient: 'from-amber-600 to-orange-500',
    availableForProjects: true,
  },
  {
    id: 8,
    name: 'Jan Becker',
    role: 'Frontend Engineer',
    company: 'Coday Network',
    location: 'Limburg an der Lahn',
    category: 'devs',
    skills: ['React 19', 'Next.js App Router', 'CSS Architecture'],
    initials: 'JB',
    gradient: 'from-primary-800 to-blue-700',
    availableForProjects: true,
  },
];

const Members: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filterTabs = [
    { key: 'all', label: isEn ? 'All Members' : 'Alle Mitglieder' },
    { key: 'founders', label: isEn ? 'Founders & Leads' : 'Gründer & Leads' },
    { key: 'devs', label: isEn ? 'Developers' : 'Entwickler' },
    { key: 'design', label: isEn ? 'Designers' : 'Designer' },
    { key: 'marketing', label: isEn ? 'Marketing & SEO' : 'Marketing & SEO' },
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

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((m) => {
      const matchesCat = activeCategory === 'all' || m.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, search]);

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

        {/* Header Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Regional & Remote Network' : 'Regionales & Remote Netzwerk'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
              <span>{isEn ? 'Community ' : 'Community '}</span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                {isEn ? 'Members' : 'Mitglieder'}
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {isEn
                ? 'Connect with specialized designers, developers, and agency founders across Central Hesse and Germany.'
                : 'Vernetze dich auf Augenhöhe mit spezialisierten Designern, Entwicklern und Agentur-Gründern aus Mittelhessen und ganz Deutschland.'}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="relative">
              <OptimizedIcon
                icon={MagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEn ? 'Search members, skills...' : 'Name, Skill, Ort suchen...'}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs text-sm"
              />
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {filterTabs.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Members Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {filteredMembers.map((member) => (
            <li
              key={member.id}
              className="group relative bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Avatar with Ring & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} text-white font-bold text-lg flex items-center justify-center shadow-md`}
                  >
                    {member.initials}
                  </div>
                  {member.availableForProjects && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {isEn ? 'Available' : 'Verfügbar'}
                    </span>
                  )}
                </div>

                {/* Name & Title */}
                <h2 className="text-lg font-bold font-display text-slate-900 group-hover:text-primary transition-colors">
                  {member.name}
                </h2>
                <p className="text-xs font-semibold text-primary mb-1">{member.role}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                  <OptimizedIcon icon={Briefcase} className="w-3.5 h-3.5 text-slate-400" />
                  {member.company}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                  <OptimizedIcon icon={MapPin} className="w-3.5 h-3.5 text-slate-400" />
                  <span>{member.location}</span>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-primary hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-100 group-hover:border-primary"
              >
                <OptimizedIcon icon={PaperPlaneTilt} className="w-3.5 h-3.5" />
                <span>{isEn ? 'Connect' : 'Vernetzen'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Members;
