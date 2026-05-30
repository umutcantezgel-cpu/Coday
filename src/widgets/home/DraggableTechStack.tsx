'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';

const techs = [
  {
    name: 'Next.js 15',
    color: 'bg-zinc-900 text-white border-zinc-700',
    top: '20%',
    left: '15%',
    rotate: -12,
  },
  {
    name: 'React 19',
    color: 'bg-[#149ECA]/90 text-white border-[#149ECA]/50',
    top: '35%',
    left: '80%',
    rotate: 8,
  },
  {
    name: 'Tailwind 4',
    color: 'bg-[#38BDF8]/90 text-white border-[#38BDF8]/50',
    top: '65%',
    left: '12%',
    rotate: -6,
  },
  {
    name: 'Supabase',
    color: 'bg-[#3ECF8E]/90 text-white border-[#3ECF8E]/50',
    top: '75%',
    left: '75%',
    rotate: 15,
  },
  {
    name: 'Framer Motion',
    color: 'bg-[#0055FF]/90 text-white border-[#0055FF]/50',
    top: '45%',
    left: '8%',
    rotate: 10,
  },
  {
    name: 'Sanity',
    color: 'bg-[#F03E2F]/90 text-white border-[#F03E2F]/50',
    top: '15%',
    left: '70%',
    rotate: -8,
  },
];

export const DraggableTechStack = () => {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {techs.map((tech, i) => (
        <motion.div
          key={tech.name}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.6}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: tech.rotate }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: i * 0.1 + 0.8, // Delay so it appears after main hero text
          }}
          whileHover={{ scale: 1.1, cursor: 'grab' }}
          whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
          className={cn(
            'absolute px-5 py-2.5 rounded-full font-calistoga text-[15px] tracking-wide shadow-2xl pointer-events-auto select-none hidden lg:block',
            'border border-white/20 backdrop-blur-md',
            tech.color
          )}
          style={{ top: tech.top, left: tech.left }}
        >
          {tech.name}
        </motion.div>
      ))}
    </div>
  );
};
