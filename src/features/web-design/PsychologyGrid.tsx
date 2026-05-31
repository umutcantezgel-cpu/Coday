import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { motion } from 'motion/react';

const PsychologyGrid: React.FC = () => {
  const laws = [
    {
      title: "Fitts's Law",
      desc: 'Die Zeit zum Erreichen eines Ziels hängt von Größe und Distanz ab.',
      example: 'Große Buttons = Mehr Klicks',
      icon: 'ads_click',
      color: '#10B981',
    },
    {
      title: "Hick's Law",
      desc: 'Mehr Optionen = Längere Entscheidungszeit.',
      example: 'Weniger Navigation = Klare Führung',
      icon: 'timeline',
      color: '#3B82F6',
    },
    {
      title: 'Von Restorff',
      desc: 'Das Element, das anders aussieht, bleibt im Gedächtnis.',
      example: 'CTA-Farbe vs. Rest',
      icon: 'visibility',
      color: '#F59E0B',
    },
    {
      title: 'Serial Position',
      desc: 'Anfang und Ende einer Liste werden am besten gemerkt.',
      example: 'Wichtigstes zuerst & zuletzt',
      icon: 'format_list_numbered',
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {laws.map((law, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-flat-lg transition-all motion-reduce:duration-[0.01ms] group cursor-default"
        >
          <div
            className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white shadow-md transition-transform motion-reduce:duration-[0.01ms] group-hover:scale-110"
            style={{ backgroundColor: law.color }}
          >
            <Icon name={law.icon} />
          </div>
          <h4 className="font-bold text-lg text-secondary mb-2">{law.title}</h4>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed h-[60px]">{law.desc}</p>

          <div className="bg-gray-50 rounded-lg p-3 text-xs border border-gray-100">
            <span className="font-bold text-secondary block mb-1">Praxis-Beispiel:</span>
            <span className="text-slate-500">{law.example}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PsychologyGrid;
