'use client';

import React, { useState, useEffect } from 'react';

export const MobileRotatingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), 3000);
    return () => clearInterval(id);
  }, [texts.length]);
  return (
    <span className="inline-block min-h-[2.75rem] flex items-center text-base sm:text-lg font-semibold text-primary-700 transition-opacity duration-300">
      {texts[index] || texts[0]}
    </span>
  );
};
