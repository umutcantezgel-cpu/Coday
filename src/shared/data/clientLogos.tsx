import React from 'react';
import { LogoItem } from '@/shared/ui/LogoLoop';
import { Drop, Key, ForkKnife } from '@phosphor-icons/react';

// Wir nutzen die Phosphor-Icons, um die realen Portfolio-Kunden
// im Design-System-konformen Stil darzustellen, da reine Text-Platzhalter nicht zulässig sind.
const generateClientLogo = (text: string, Icon: React.ElementType): LogoItem => ({
  node: (
    <div className="flex items-center justify-center gap-3 h-12 px-6 group cursor-default">
      <Icon
        weight="duotone"
        className="w-8 h-8 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 grayscale group-hover:grayscale-0"
      />
      <span className="font-display font-bold text-xl text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 grayscale group-hover:grayscale-0 tracking-wide uppercase">
        {text}
      </span>
    </div>
  ),
  title: text,
});

export const clientLogos: LogoItem[] = [
  generateClientLogo('MS Schlüsseldienst Wetzlar', Key),
  generateClientLogo('Lindener Ratsstuben', ForkKnife),
  generateClientLogo('Sanitär Batherm', Drop),
];
