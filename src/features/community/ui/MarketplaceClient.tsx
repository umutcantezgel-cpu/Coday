'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  ShoppingBag,
  CalendarBlank,
  Users,
  Sparkle,
  Star,
  DownloadSimple,
  MagnifyingGlass,
  ArrowRight,
  CheckCircle,
  Tag,
} from '@phosphor-icons/react/dist/ssr';

interface ProductItem {
  id: number;
  category: 'templates' | 'kits' | 'themes' | 'legal' | 'courses';
  categoryLabel: string;
  title: string;
  price: string;
  rating: number;
  reviewsCount: number;
  format: string;
  downloads: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    category: 'templates',
    categoryLabel: 'Audit System',
    title: 'Enterprise SEO Audit & Reporting Suite',
    price: 'Auf Anfrage',
    rating: 5.0,
    reviewsCount: 38,
    format: 'Next.js + Notion',
    downloads: '320+',
    description:
      'Vollständiges technisches SEO-Audit-Framework mit Core-Web-Vitals-Prüfung, Crawl-Logik und Vorlagen.',
    image: '/images/marketing/seo-audit-analyse-optimierung-google-ranking.webp',
    alt: 'SEO Audit Template',
    badge: 'Bestseller',
  },
  {
    id: 2,
    category: 'kits',
    categoryLabel: 'Marketing Kit',
    title: 'Omnichannel B2B Marketing Strategy Bundle',
    price: 'Auf Anfrage',
    rating: 4.9,
    reviewsCount: 24,
    format: 'Figma + PDF',
    downloads: '180+',
    description:
      'Erprobte Social Media & Performance-Marketing Vorlagen für Agenturen und B2B-Dienstleister.',
    image: '/images/marketing/social-media-marketing-influencer-likes-shares-viral.webp',
    alt: 'Social Media Strategy Bundle',
  },
  {
    id: 3,
    category: 'kits',
    categoryLabel: 'Growth Framework',
    title: 'Agency Inbound Dominance Playbook',
    price: 'Auf Anfrage',
    rating: 5.0,
    reviewsCount: 42,
    format: 'Complete Master System',
    downloads: '410+',
    description:
      'Schritt-für-Schritt System zur planbaren Neukundengewinnung mit automatisierten Funnels.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Agency Growth Kit',
    badge: 'Empfehlung',
  },
  {
    id: 4,
    category: 'themes',
    categoryLabel: 'Design System',
    title: 'High-Speed Headless Portfolio Theme',
    price: 'Auf Anfrage',
    rating: 4.9,
    reviewsCount: 19,
    format: 'Next.js 15 + Tailwind',
    downloads: '290+',
    description: 'Sub-0,3s Ladezeit, 100/100 Lighthouse-Score und nahtlose Sanity CMS Anbindung.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'Webflow Portfolio Theme',
  },
  {
    id: 5,
    category: 'legal',
    categoryLabel: 'Rechtssicherheit',
    title: 'Agenturverträge & DSGVO-Paket Mittelhessen',
    price: 'Auf Anfrage',
    rating: 5.0,
    reviewsCount: 56,
    format: 'PDF + DOCX (Anwaltlich geprüft)',
    downloads: '520+',
    description:
      'Rechtssichere Werkverträge, AGBs, AV-Verträge und SLA-Muster für Web-Entwickler und Designer.',
    image: '/images/brand/coday-full.webp',
    alt: 'Contract Templates Pack',
    badge: 'DSGVO Safe',
  },
  {
    id: 6,
    category: 'courses',
    categoryLabel: 'Masterclass',
    title: 'Lead Gen & B2B Cold Outreach Academy',
    price: 'Auf Anfrage',
    rating: 4.9,
    reviewsCount: 31,
    format: '4h Video + Worksheets',
    downloads: '210+',
    description:
      'Wie du qualifizierte B2B-Entscheider ohne aggressive Kaltakquise für 5-stellige Projekte gewinnst.',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    alt: 'Lead Gen Masterclass',
  },
];

const Marketplace: React.FC = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { key: 'all', label: isEn ? 'All Resources' : 'Alle Ressourcen' },
    { key: 'templates', label: isEn ? 'Audit Templates' : 'Audit-Vorlagen' },
    { key: 'kits', label: isEn ? 'Growth Kits' : 'Growth-Kits' },
    { key: 'themes', label: isEn ? 'Web Themes' : 'Web-Themes' },
    { key: 'legal', label: isEn ? 'Legal & Contracts' : 'Recht & Verträge' },
    { key: 'courses', label: isEn ? 'Masterclasses' : 'Masterclasses' },
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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCat = activeTab === 'all' || item.category === activeTab;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.format.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeTab, search]);

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

        {/* Asymmetric Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {isEn ? 'Curated Agency Assets' : 'Kuratierte Agentur-Ressourcen'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
              <span>{isEn ? 'Community ' : 'Community '}</span>
              <GradientText
                colors={['#147a7a', '#2563eb', '#147a7a']}
                animationSpeed={8}
                className="inline-block"
              >
                {isEn ? 'Marketplace' : 'Marktplatz'}
              </GradientText>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {isEn
                ? 'Discover battle-tested templates, legal frameworks, and growth systems engineered for high-performance agencies and digital leaders.'
                : 'Entdecke praxiserprobte Vorlagen, anwaltlich geprüfte Vertragspakete und Growth-Systeme für digitale Spitzenleistungen.'}
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
                placeholder={
                  isEn ? 'Search templates, kits, legal...' : 'Vorlagen, Verträge, Tools suchen...'
                }
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs text-sm"
              />
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
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

        {/* Products Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list">
          {filteredProducts.map((item) => (
            <li
              key={item.id}
              className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1">
                      <OptimizedIcon icon={Tag} className="w-3.5 h-3.5 text-primary" />
                      {item.categoryLabel}
                    </span>
                  </div>

                  {item.badge && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {item.badge}
                    </div>
                  )}

                  {/* Bottom Stats on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 bg-slate-950/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      <OptimizedIcon icon={DownloadSimple} className="w-3.5 h-3.5" />
                      {item.downloads} Downloads
                    </span>
                    <span className="flex items-center gap-1 bg-slate-950/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-amber-400">
                      <OptimizedIcon icon={Star} className="w-3.5 h-3.5" weight="fill" />
                      {item.rating.toFixed(1)} ({item.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-mono font-medium text-slate-400">
                    Format: {item.format}
                  </div>
                  <h2 className="text-xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Einmalig</span>
                    <span className="text-2xl font-black font-display text-slate-900">
                      {item.price}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-xl bg-secondary text-sm font-bold text-white hover:bg-secondary/90 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>{isEn ? 'Get Asset' : 'Paket sichern'}</span>
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

export default Marketplace;
