import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from '@phosphor-icons/react/dist/ssr';

interface GlossaryTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, children }) => {
  return (
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger asChild>
        <span className="cursor-help border-b-2 border-dotted border-blue-300 text-blue-700 font-medium inline-flex items-center gap-0.5 hover:bg-blue-50 hover:border-blue-500 transition-colors motion-reduce:duration-[0.01ms] rounded px-0.5 mx-0.5">
          {children}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 max-w-xs bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-700 data-[state=delayed-open]:animate-fadeIn motion-reduce:animate-none"
          sideOffset={5}
        >
          <div className="flex items-start gap-3">
            <Info size={16} className="text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-bold text-sm mb-1 text-blue-200">{term}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{definition}</p>
            </div>
          </div>
          <Tooltip.Arrow className="fill-slate-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
