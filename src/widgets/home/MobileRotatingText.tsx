"use client";

import React, { useState, useEffect } from 'react';

export const MobileRotatingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), 3000);
    return () => clearInterval(id);
  }, [texts.length]);
  return (
    <span
      key={index}
      className="inline-block animate-fade-in-up text-[var(--text-lead)] font-light text-text-secondary"
    >
      {texts[index]}
    </span>
  );
};
