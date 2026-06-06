import React from 'react';
import { m } from 'motion/react';

export const ProductShowcase = () => {
  return (
    <div className="h-[500px] flex items-center justify-center perspective-1000 overflow-visible">
      <m.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative w-64 h-64 transform-style-3d"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl"
            style={{
              transform: `rotateY(${i * 90}deg) translateZ(180px)`,
            }}
          >
            <div className="w-24 h-32 bg-gradient-to-tr from-primary to-secondary rounded-lg mb-4 opacity-80"></div>
            <div className="text-white font-bold">Product {i + 1}</div>
            <div className="text-white/50 text-sm">Best Seller</div>
          </div>
        ))}
      </m.div>
    </div>
  );
};
