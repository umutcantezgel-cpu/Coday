'use client';

import React from 'react';
import type { StrobiParticle } from '../model/types';

/**
 * GPU-Accelerated Pure SVG Vector Particle Renderer (Zero Emojis)
 */
export const StrobiParticleOverlay: React.FC<{
  particles: StrobiParticle[];
}> = ({ particles }) => {
  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotation}deg)`,
          }}
        >
          {p.type === 'heart' && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={p.color}
              className="drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'star' && (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={p.color}
              className="drop-shadow-sm"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
            </svg>
          )}

          {p.type === 'sparkle' && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={p.color}
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          )}

          {p.type === 'confetti' && (
            <div
              className="w-3 h-1.5 rounded-full"
              style={{
                backgroundColor: p.color,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
