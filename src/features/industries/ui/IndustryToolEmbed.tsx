'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import {
  ArrowSquareOut,
  Sparkle,
  Lightning,
  CheckCircle,
  Stethoscope,
  Wrench,
  Car,
} from '@phosphor-icons/react/dist/ssr';

interface IndustryToolEmbedProps {
  toolId?: string;
  industryKey?: string;
  locationKey?: string;
  theme?: 'dark' | 'light';
}

interface ToolConfig {
  title: string;
  titleEn: string;
  badge: string;
  badgeEn: string;
  headline: string;
  headlineEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  ctaText: string;
  ctaTextEn: string;
  icon: React.ElementType;
  accentColor: string;
  features: { de: string; en: string }[];
}

const TOOLS_CONFIG: Record<string, ToolConfig> = {
  handwerk: {
    title: 'Handwerker-Akquise & Meister-Funnel',
    titleEn: 'Craftsman Acquisition & Master Funnel',
    badge: 'LIVE AKQUISE-KANAL HANDWERK & BAU',
    badgeEn: 'LIVE CRAFTSMAN ACQUISITION CHANNEL',
    headline: 'Interaktiver Akquise- & Recruiting-Kanal für Handwerksbetriebe',
    headlineEn: 'Interactive Acquisition & Recruiting Channel for Tradesmen',
    description:
      'Testen Sie unseren Live-Akquise-Kanal für SHK-, Elektro-, Bau- und Meisterbetriebe. Erleben Sie die 60-Sekunden Express-Bewerbung und die digitale Kunden-Vorqualifizierung in Aktion.',
    descriptionEn:
      'Test our live acquisition channel for HVAC, electrical, construction and master crafts companies. Experience 60-second express applications and digital customer pre-qualification in action.',
    url: 'https://handwerker-akquise-rouge.vercel.app/',
    ctaText: 'Handwerker-Akquise Kanal öffnen',
    ctaTextEn: 'Open Craftsman Acquisition Channel',
    icon: Wrench,
    accentColor: 'from-amber-500 to-amber-600',
    features: [
      {
        de: '60-Sekunden Express-Bewerbung ohne Anschreiben-PDF',
        en: '60-second express application without cover letter',
      },
      {
        de: 'Digitale Vorqualifizierung von Bauherren & Projektbudgets',
        en: 'Digital pre-qualification of clients and project budgets',
      },
      {
        de: '100% Mobile-optimiert für Smartphone-Nutzer auf der Baustelle',
        en: '100% mobile-optimized for smartphones on-site',
      },
      {
        de: 'Automatisierte Termin- & Einsatzabstimmung',
        en: 'Automated scheduling and coordination',
      },
    ],
  },
  gesundheit: {
    title: 'PraxisExzellenz Sales & Patienten-Dashboard',
    titleEn: 'PraxisExzellenz Sales & Patient Dashboard',
    badge: 'LIVE AKQUISE-KANAL GESUNDHEITSWESEN',
    badgeEn: 'LIVE HEALTHCARE ACQUISITION CHANNEL',
    headline: 'Digitales Akquise- & Patienten-Dashboard für Praxen & Kliniken',
    headlineEn: 'Digital Acquisition & Patient Dashboard for Practices & Clinics',
    description:
      'Erleben Sie das spezialisierte Praxis-Dashboard für Ärzte, Zahnärzte und Facharztzentren: Strukturierte Neupatienten-Filterung, Entlastung des Empfangsteams und direkte Online-Buchung.',
    descriptionEn:
      'Experience the specialized practice dashboard for doctors, dentists and specialist medical centers: Structured new patient filtering, reception relief and instant online booking.',
    url: 'https://praxis-exzellenz-sales-dashboard.vercel.app/',
    ctaText: 'Praxis-Dashboard live testen',
    ctaTextEn: 'Test Practice Dashboard Live',
    icon: Stethoscope,
    accentColor: 'from-emerald-500 to-teal-600',
    features: [
      {
        de: 'DSGVO-konforme Neupatienten-Vorfilterung',
        en: 'GDPR-compliant new patient pre-filtering',
      },
      { de: 'Bis zu 70% Entlastung des Praxis-Telefons', en: 'Up to 70% reduction in phone calls' },
      {
        de: 'Express-Privatpatienten & Zuzahler-Routing',
        en: 'Express private patient and self-payer routing',
      },
      {
        de: 'Nahtlose Integration in Praxisverwaltungssysteme',
        en: 'Seamless practice management integration',
      },
    ],
  },
  automobil: {
    title: 'Automobile Digital Sales & Lead Engine',
    titleEn: 'Automobile Digital Sales & Lead Engine',
    badge: 'LIVE AKQUISE-KANAL AUTOMOBIL & KFZ',
    badgeEn: 'LIVE AUTOMOTIVE ACQUISITION CHANNEL',
    headline: 'Interaktive Lead-Maschine & Probefahrt-Funnel für Autohäuser',
    headlineEn: 'Interactive Lead Engine & Test Drive Funnel for Car Dealerships',
    description:
      'Entdecken Sie die interaktive Lead-Engine für Autohäuser, Werkstätten und KFZ-Händler: Fahrzeugberatung in Echtzeit, mobile Probefahrt-Terminierung und Inzahlungnahme-Kalkulator.',
    descriptionEn:
      'Discover the interactive lead engine for car dealerships, workshops and auto dealers: Real-time vehicle advising, mobile test drive booking and trade-in calculators.',
    url: 'https://automobile-rose-five.vercel.app/',
    ctaText: 'Automobil-Portal live öffnen',
    ctaTextEn: 'Open Automotive Portal Live',
    icon: Car,
    accentColor: 'from-blue-500 to-indigo-600',
    features: [
      {
        de: 'Interaktiver Fahrzeug- & Probefahrt-Konfigurator',
        en: 'Interactive vehicle & test drive configurator',
      },
      { de: 'Automatisierte Inzahlungnahme-Bewertung', en: 'Automated trade-in valuation' },
      {
        de: '24/7 Werkstatt-Terminbuchung & Service-Funnel',
        en: '24/7 service booking and workshop funnel',
      },
      {
        de: 'Subsekundäre Ladezeiten für mobile Käufer',
        en: 'Sub-second loading times for mobile car buyers',
      },
    ],
  },
};

function getToolConfig(industryKey?: string): ToolConfig | null {
  if (!industryKey) return null;
  const key = industryKey.toLowerCase();

  if (
    key.includes('handwerk') ||
    key.includes('bau') ||
    key.includes('elektro') ||
    key.includes('shk') ||
    key.includes('meister')
  ) {
    return TOOLS_CONFIG.handwerk;
  }
  if (
    key.includes('gesundheit') ||
    key.includes('arzt') ||
    key.includes('aerzte') ||
    key.includes('praxis') ||
    key.includes('klinik') ||
    key.includes('healthcare')
  ) {
    return TOOLS_CONFIG.gesundheit;
  }
  if (
    key.includes('automobil') ||
    key.includes('kfz') ||
    key.includes('auto') ||
    key.includes('werkstatt') ||
    key.includes('car')
  ) {
    return TOOLS_CONFIG.automobil;
  }

  return null;
}

export function IndustryToolEmbed({ industryKey, theme = 'light' }: IndustryToolEmbedProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const config = getToolConfig(industryKey);

  if (!config) {
    return null;
  }

  const Icon = config.icon;
  const isDark = theme === 'dark';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
      <div
        className={`relative rounded-3xl overflow-hidden border p-8 sm:p-12 lg:p-14 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border-slate-800 text-white shadow-2xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Glow ambient highlight */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-10 bg-gradient-to-br ${config.accentColor}`}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Information & Details */}
          <div className="lg:col-span-7">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase mb-6 shadow-sm ${
                isDark
                  ? 'border-amber-500/30 bg-amber-950/40 text-amber-400 backdrop-blur-md'
                  : 'border-amber-300 bg-amber-50 text-amber-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Sparkle className="w-3.5 h-3.5" />
              <span>{isEn ? config.badgeEn : config.badge}</span>
            </div>

            <h3
              className={`font-display font-black text-2xl sm:text-4xl leading-tight mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isEn ? config.headlineEn : config.headline}
            </h3>

            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {isEn ? config.descriptionEn : config.description}
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {config.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle weight="fill" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span
                    className={`text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {isEn ? feat.en : feat.de}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Forwarding Card & Direct CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center items-stretch">
            <div
              className={`p-8 rounded-2xl border ${
                isDark
                  ? 'bg-slate-900/80 border-slate-750 shadow-inner'
                  : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${config.accentColor} shadow-lg`}
                >
                  <Icon weight="bold" className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lightning weight="fill" className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Direct Access' : 'Direkter Zugang'}</span>
                  </div>
                  <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {isEn ? config.titleEn : config.title}
                  </h4>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border mb-6 text-xs space-y-2 ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                }`}
              >
                <div className="flex justify-between items-center text-slate-500">
                  <span>URL:</span>
                  <span className="font-mono text-amber-700 font-semibold truncate max-w-[200px]">
                    {config.url.replace('https://', '')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Status:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Aktiv & Betriebsbereit
                  </span>
                </div>
              </div>

              {/* Direct Forwarding Button */}
              <a
                href={config.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white transition duration-300 shadow-lg bg-primary-700 hover:bg-primary-800 hover:scale-[1.02] active:scale-[0.98] text-base`}
              >
                <span>{isEn ? config.ctaTextEn : config.ctaText}</span>
                <ArrowSquareOut
                  weight="bold"
                  className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <p className="text-[11px] text-center text-slate-500 mt-3 font-medium">
                {isEn
                  ? 'Opens in a new window • Live demonstration & channel access'
                  : 'Öffnet in neuem Fenster • Live-Demonstration & Kanal-Zugang'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
