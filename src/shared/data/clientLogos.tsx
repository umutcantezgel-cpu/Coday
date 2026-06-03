import React from 'react';
import { LogoItem } from '@/shared/ui/LogoLoop';
import { Drop, Key, ForkKnife } from '@phosphor-icons/react/dist/ssr';

// Wir nutzen die Phosphor-Icons, um die realen Portfolio-Kunden
// im Design-System-konformen Stil darzustellen, da reine Text-Platzhalter nicht zulässig sind.
const generateClientLogo = (text: string, Icon: React.ElementType): LogoItem => ({
  node: (
    <div className="flex items-center justify-center gap-3 h-12 px-6 group cursor-default" aria-label={text} role="img">
      <Icon
        weight="duotone"
        aria-hidden="true"
        className="w-8 h-8 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-primary transition motion-reduce:duration-[0.01ms] duration-300 grayscale group-hover:grayscale-0"
      />
      <span aria-hidden="true" className="font-display font-bold text-xl text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-primary transition motion-reduce:duration-[0.01ms] duration-300 grayscale group-hover:grayscale-0 tracking-wide uppercase">
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
