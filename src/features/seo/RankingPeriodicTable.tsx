import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRtl } from '@/shared/hooks/useRtl';

interface Element {
  symbol: string;
  name: string;
  score: number;
  category: 'content' | 'tech' | 'trust' | 'ux';
  desc: string;
}

const RankingPeriodicTable: React.FC = () => {
  const { isRtl } = useRtl();
  const [activeElement, setActiveElement] = useState<Element | null>(null);

  const elements: Element[] = [
    {
      symbol: 'Ct',
      name: 'Quality Content',
      score: 3,
      category: 'content',
      desc: 'Einzigartiger, relevanter Inhalt ist King.',
    },
    {
      symbol: 'Kw',
      name: 'Keywords',
      score: 2,
      category: 'content',
      desc: 'Strategische Platzierung von Suchbegriffen.',
    },
    {
      symbol: 'Fr',
      name: 'Freshness',
      score: 1,
      category: 'content',
      desc: 'Aktualität der Informationen.',
    },

    {
      symbol: 'Cr',
      name: 'Crawlability',
      score: 3,
      category: 'tech',
      desc: 'Kann Google die Seite lesen?',
    },
    {
      symbol: 'Sp',
      name: 'Page Speed',
      score: 3,
      category: 'tech',
      desc: 'Ladezeit < 2.5s (Core Web Vitals).',
    },
    {
      symbol: 'Mo',
      name: 'Mobile First',
      score: 3,
      category: 'tech',
      desc: 'Optimierung für Smartphones.',
    },
    {
      symbol: 'Hs',
      name: 'HTTPS',
      score: 1,
      category: 'tech',
      desc: 'Sichere Verbindung ist Standard.',
    },

    {
      symbol: 'Au',
      name: 'Authority',
      score: 3,
      category: 'trust',
      desc: 'Domain Rating & Backlink Qualität.',
    },
    {
      symbol: 'Bl',
      name: 'Backlinks',
      score: 3,
      category: 'trust',
      desc: 'Empfehlungen von anderen Websites.',
    },
    {
      symbol: 'Hi',
      name: 'History',
      score: 1,
      category: 'trust',
      desc: 'Alter der Domain & Trust.',
    },

    { symbol: 'Ux', name: 'User Exp', score: 2, category: 'ux', desc: 'Dwell Time & Bounce Rate.' },
    {
      symbol: 'In',
      name: 'Intent',
      score: 3,
      category: 'ux',
      desc: 'Erfüllt die Seite die Suchintention?',
    },
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'content':
        return '#10B981'; // Green
      case 'tech':
        return '#3B82F6'; // Blue
      case 'trust':
        return '#F59E0B'; // Amber
      case 'ux':
        return '#EC4899'; // Pink
      default:
        return '#9CA3AF';
    }
  };

  return (
    <div className="bg-surface-dark border border-white/10 rounded-3xl p-8 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* The Table Grid */}
        <div className="lg:col-span-2">
          <h3 className="font-display font-bold text-2xl text-white mb-6">
            The Periodic Table of SEO Factors
          </h3>
          <div className="flex flex-wrap gap-2">
            {elements.map((el, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                onMouseEnter={() => setActiveElement(el)}
                className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-lg border border-white/10 flex flex-col items-center justify-center relative backdrop-blur-sm bg-white/5 transition-colors"
                style={{
                  borderColor:
                    activeElement?.symbol === el.symbol ? getCategoryColor(el.category) : '',
                }}
              >
                <div className="absolute top-1 end-1 text-[8px] sm:text-[10px] text-gray-400">
                  +{el.score}
                </div>
                <div
                  className="absolute top-1 start-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: getCategoryColor(el.category) }}
                ></div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white">
                  {el.symbol}
                </div>
                <div className="text-[8px] sm:text-[10px] text-gray-400 truncate w-full text-center px-1">
                  {el.name}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-6 text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Content
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> Architecture
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div> Trust
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div> User
            </div>
          </div>
        </div>

        {/* Detail View */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeElement ? (
              <motion.div
                key={activeElement.symbol}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="h-full flex flex-col justify-center"
              >
                <div
                  className="w-24 h-24 mb-6 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden"
                  style={{ backgroundColor: `${getCategoryColor(activeElement.category)}20` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <span className="font-display font-black text-4xl text-white relative z-10">
                    {activeElement.symbol}
                  </span>
                </div>

                <h4 className="text-3xl font-bold text-white mb-2">{activeElement.name}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white uppercase tracking-wider">
                    {activeElement.category}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 rounded-sm ${i < activeElement.score ? 'bg-primary' : 'bg-gray-700'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-1">Importance</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed border-t border-white/10 pt-4">
                  {activeElement.desc}
                </p>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-center italic">
                Hover over an element <br /> to see details.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RankingPeriodicTable;
