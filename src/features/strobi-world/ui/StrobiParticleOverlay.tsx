'use client';

import React from 'react';
import type { StrobiParticle } from '../model/types';

export const StrobiParticleOverlay: React.FC<{ particles: StrobiParticle[] }> = ({ particles }) => {
  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-75 select-none"
            style={{
              left: p.x,
              top: p.y,
              opacity: p.opacity,
              transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
              color: p.color,
            }}
          >
            {p.type === 'heart' && <span className="text-2xl drop-shadow-md">❤️</span>}
            {p.type === 'star' && <span className="text-2xl drop-shadow-md">⭐</span>}
            {p.type === 'sparkle' && <span className="text-2xl drop-shadow-md">✨</span>}
            {p.type === 'confetti' && (
              <div className="w-3 h-3 rounded-xs shadow-sm" style={{ backgroundColor: p.color }} />
            )}
          </div>
        );
      })}
    </div>
  );
};
