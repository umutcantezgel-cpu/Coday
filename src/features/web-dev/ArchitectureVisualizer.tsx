"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { STAGGER, DURATION } from '@/shared/lib/motion';

const ArchitectureVisualizer: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const t = useTranslations('services');

  const nodes = [
    {
      id: 'cms',
      label: t('web_development_page.architecture.visualizer.cms.label'),
      desc: t('web_development_page.architecture.visualizer.cms.desc'),
      details: t('web_development_page.architecture.visualizer.cms.details'),
      x: 10,
      y: 50,
      color: '#EC4899', // Pink
    },
    {
      id: 'build',
      label: t('web_development_page.architecture.visualizer.build.label'),
      desc: t('web_development_page.architecture.visualizer.build.desc'),
      details: t('web_development_page.architecture.visualizer.build.details'),
      x: 40,
      y: 50,
      color: '#1A9A9A', // Teal (Primary)
    },
    {
      id: 'edge',
      label: t('web_development_page.architecture.visualizer.edge.label'),
      desc: t('web_development_page.architecture.visualizer.edge.desc'),
      details: t('web_development_page.architecture.visualizer.edge.details'),
      x: 70,
      y: 50,
      color: '#F59E0B', // Amber
    },
    {
      id: 'user',
      label: t('web_development_page.architecture.visualizer.user.label'),
      desc: t('web_development_page.architecture.visualizer.user.desc'),
      details: t('web_development_page.architecture.visualizer.user.details'),
      x: 90,
      y: 50,
      color: '#3B82F6', // Blue
    },
  ];

  return (
    <div className="w-full bg-surface-dark rounded-3xl p-8 border border-white/5 overflow-hidden relative min-h-[400px] flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10 pointer-events-none">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="border border-white/5" />
        ))}
      </div>

      <div className="relative w-full max-w-4xl h-64">
        {/* Connecting Lines */}
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-1 bg-white/5 w-full -z-10"></div>
        <motion.div
          className="absolute inset-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-pink-500 via-teal-500 to-blue-500 -z-10"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Packets Animation */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          animate={{
            left: ['10%', '90%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute top-1/2 -translate-y-1/2 transform -translate-x-1/2"
            style={{ left: `${node.x}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * STAGGER.hero * 2, duration: DURATION.default }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${activeNode === node.id ? 'scale-110 border-white/30 bg-white/10 shadow-[0_0_30px_rgba(26,154,154,0.3)]' : 'hover:border-white/20'}`}
              style={{ borderColor: activeNode === node.id ? node.color : '' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${node.color}20` }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: node.color }}></div>
              </div>
              <h4 className="text-white font-bold text-xs sm:text-sm text-center mb-1">
                {node.label}
              </h4>
              <p className="text-gray-400 text-[10px] text-center">{node.desc}</p>

              {/* Popover Detail */}
              {activeNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 bg-white text-secondary p-3 rounded-xl shadow-xl text-center z-20 pointer-events-none"
                >
                  <div className="text-xs font-bold">{node.details}</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 w-full text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">
          {t('web_development_page.architecture.visualizer.footer')}
        </p>
      </div>
    </div>
  );
};

export default ArchitectureVisualizer;
