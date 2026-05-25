import React from 'react';

export const Noise: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 4px)',
        backgroundRepeat: 'repeat',
      }}
    />
  );
};
