'use client';

import React, { useState } from 'react';

import { Link } from '@/i18n/navigation';
import { motion } from 'motion/react';
import { wikiEntities } from '@/features/knowledge/model/entities';

export default function WikiHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');

  const filteredEntities = wikiEntities.filter((entity) => {
    const matchesSearch =
      entity.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.aliases.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || entity.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Tech', 'Business', 'Design'];

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://www.codayweb.de/knowledge/wiki#set',
    name: 'Coday AI & Digital Excellence Wiki',
    description:
      '100 essentielle Entitäten aus den Bereichen Tech, Business und Design für moderne Web-Architektur.',
    hasDefinedTerm: wikiEntities.map((entity) => ({
      '@type': 'DefinedTerm',
      '@id': `https://www.codayweb.de/knowledge/wiki/${entity.slug}#term`,
      name: entity.displayName,
      termCode: entity.slug,
      inDefinedTermSet: 'https://www.codayweb.de/knowledge/wiki#set',
    })),
  };

  return (
    <div className="bg-coday-black min-h-screen pt-32 pb-24 text-coday-gray-100 font-sans selection:bg-coday-gold selection:text-coday-black">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI <span className="text-coday-gold">&amp;</span> Digital Excellence{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coday-gray-100 to-coday-gray-500">
                Wiki
              </span>
            </h1>
            <p className="text-xl text-coday-gray-400 max-w-3xl">
              Das Coday Knowledge Graph. 100 essentielle Entitäten aus Tech, Business und Design,
              strukturiert für KI-Crawler und Menschen.
            </p>
          </motion.div>
        </header>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-coday-dark border border-coday-gray-800 p-4 rounded-xl">
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Entität suchen (z.B. Next.js, Headless CMS)..."
                className="w-full bg-coday-black border border-coday-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-coday-gold transition-colors motion-reduce:duration-[0.01ms]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-5 h-5 absolute right-4 top-3.5 text-coday-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`active:scale-[0.97] px-4 py-2 rounded-lg text-sm font-medium transition-colors motion-reduce:duration-[0.01ms] ${activeCategory === cat ? 'bg-coday-gold text-coday-black' : 'bg-coday-gray-800 text-coday-gray-300 hover:bg-coday-gray-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntities.map((entity, idx) => (
            <motion.div
              key={entity.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.5), duration: 0.4 }}
            >
              <Link
                href={`/knowledge/wiki/${entity.slug}`}
                className="block p-6 rounded-xl bg-coday-dark border border-coday-gray-800 hover:border-coday-gold/50 hover:bg-coday-gray-900 transition motion-reduce:duration-[0.01ms] group h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-coday-gold bg-coday-gold/10 px-2 py-1 rounded">
                    {entity.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-coday-gold transition-colors motion-reduce:duration-[0.01ms]">
                  {entity.displayName}
                </h2>
                <div className="text-sm text-coday-gray-500 line-clamp-2">
                  Aliasse: {entity.aliases.slice(0, 3).join(', ')}{' '}
                  {entity.aliases.length > 3 && '...'}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredEntities.length === 0 && (
          <div className="text-center py-20 text-coday-gray-500">
            <p className="text-xl">Keine Entitäten gefunden für "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
