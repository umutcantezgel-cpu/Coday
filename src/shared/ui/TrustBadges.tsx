import React from 'react';
import { ShieldCheck, LockKey, CheckCircle, Code } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

export interface TrustBadge {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  url?: string;
  color?: string;
}

const DEFAULT_BADGES: TrustBadge[] = [
  {
    id: 'proven-expert',
    icon: CheckCircle,
    title: 'Top Dienstleister 2024',
    description: '100% Empfehlungsrate auf ProvenExpert',
    url: 'https://www.provenexpert.com/coday-gmbh/',
    color: 'text-green-500',
  },
  {
    id: 'vercel',
    icon: Code,
    title: 'Vercel Agency Partner',
    description: 'Offizieller Entwicklungspartner',
    color: 'text-black ',
  },
  {
    id: 'dsgvo',
    icon: LockKey,
    title: 'DSGVO Konform',
    description: '100% Datenschutz-konform',
    color: 'text-blue-500',
  },
  {
    id: 'wcag',
    icon: ShieldCheck,
    title: 'Barrierefrei (WCAG AA)',
    description: 'Zertifizierte Accessibility',
    color: 'text-purple-500',
  },
];

export interface TrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
  align?: 'left' | 'center' | 'right';
  layout?: 'row' | 'grid';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  badges = DEFAULT_BADGES,
  className = '',
  align = 'center',
  layout = 'row',
}) => {
  const { ref, isVisible } = useIntersectionObserver({ triggerOnce: true, threshold: 0.1 });

  const getAlignmentClass = () => {
    switch (align) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  const getLayoutClass = () => {
    if (layout === 'grid') {
      return 'grid grid-cols-2 md:grid-cols-4 gap-6';
    }
    return `flex flex-wrap gap-6 md:gap-10 ${getAlignmentClass()}`;
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`w-full ${className}`}
      aria-label="Vertrauenssiegel und Zertifikate"
    >
      <div className={getLayoutClass()}>
        {badges.map((badge, index) => {
          const BadgeContent = () => (
            <>
              <div
                className={`w-12 h-12 rounded-full bg-surface-light flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${badge.color || 'text-primary'}`}
              >
                <OptimizedIcon icon={badge.icon} className="w-6 h-6" weight="fill" />
              </div>
              <div className="font-bold text-secondary text-sm md:text-base text-center">
                {badge.title}
              </div>
              <div className="text-xs text-slate-500 text-center mt-1">{badge.description}</div>
            </>
          );

          const wrapperClass = `group flex flex-col items-center p-4 rounded-xl hover:bg-surface-light/50 transition-colors duration-300 motion-safe:transition-all ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`;

          const style = { transitionDelay: `${index * 100}ms` };

          if (badge.url) {
            return (
              <a
                key={badge.id}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className={wrapperClass}
                style={style}
              >
                <BadgeContent />
              </a>
            );
          }

          return (
            <div key={badge.id} className={wrapperClass} style={style}>
              <BadgeContent />
            </div>
          );
        })}
      </div>
    </div>
  );
};
