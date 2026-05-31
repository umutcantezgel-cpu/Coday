import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, Lightning, Globe, Stack, Shield } from '@phosphor-icons/react/dist/ssr';

const technologies = [
  { name: 'React Router v7', icon: Cpu, color: 'text-white', bg: 'bg-black' },
  { name: 'Supabase', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-900/50' },
  { name: 'Tailwind', icon: Lightning, color: 'text-cyan-400', bg: 'bg-cyan-900/50' },
  { name: 'Edge Network', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-900/50' },
  { name: 'TypeScript', icon: Stack, color: 'text-blue-500', bg: 'bg-blue-900/20' },
  { name: 'Auth', icon: Shield, color: 'text-green-400', bg: 'bg-green-900/20' },
];

export const TechStackHologram: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]">
      {/* Central Core */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative w-64 h-64 transform-style-3d"
      >
        {/* Core Sphere */}
        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 blur-xl opacity-50 animate-pulse motion-reduce:animate-none" />

        {technologies.map((tech, i) => {
          const angle = (i / technologies.length) * 360;
          const radius = 180; // Distance from center
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const z = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                x: x - 48, // Centering offset (half width)
                y: -48, // Centering offset (half height)
                z: z,
                transformStyle: 'preserve-3d',
              }}
              // Look at center logic would be complex in pure CSS/Motion without R3F
              // Instead we just counter-rotate the items so they face front-ish relative to the orbit
              animate={{ rotateY: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className={`
                                w-24 h-24 rounded-2xl border border-white/10 backdrop-blur-md 
                                flex flex-col items-center justify-center gap-2
                                shadow-[0_0_30px_rgba(0,0,0,0.2)]
                                ${tech.bg}
                            `}
              >
                <tech.icon className={`w-8 h-8 ${tech.color}`} />
                <span className="text-xs font-bold text-white/80">{tech.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floor Reflection */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent blur-2xl -z-10 transform rotate-x-90" />
    </div>
  );
};
