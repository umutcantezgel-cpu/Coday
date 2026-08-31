import { LockKey, Star, CheckCircle, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { FadeInUp } from '@/shared/ui/MotionWrappers';

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
    id: 'google-maps',
    icon: Star,
    title: 'Google Maps (5.0 ★)',
    description: '4 verifizierte Rezensionen',
    url: 'https://www.google.com/maps?cid=8570940562624494590',
    color: 'text-amber-500',
  },
  {
    id: 'inhabergefuehrt',
    icon: ShieldCheck,
    title: 'Inhabergeführt',
    description: '100% Persönlicher Service',
    color: 'text-emerald-600',
  },
  {
    id: 'dsgvo',
    icon: LockKey,
    title: 'DSGVO Konform',
    description: '100% Datenschutz & Eigentum',
    color: 'text-blue-600',
  },
  {
    id: 'edge',
    icon: CheckCircle,
    title: 'High-Speed Edge',
    description: '< 0.8s Ladezeit & Core Web Vitals',
    color: 'text-slate-900',
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
    <div className={`w-full ${className}`} aria-label="Vertrauenssiegel und Zertifikate">
      <div className={getLayoutClass()}>
        {badges.map((badge, index) => {
          const BadgeContent = () => (
            <>
              <div
                className={`w-12 h-12 rounded-full bg-surface-light flex items-center justify-center mb-3 transition-transform motion-reduce:duration-[0.01ms] duration-300 group-hover:scale-110 ${badge.color || 'text-primary'}`}
              >
                <OptimizedIcon icon={badge.icon} className="w-6 h-6" weight="fill" />
              </div>
              <div className="font-bold text-slate-900 text-sm md:text-base text-center">
                {badge.title}
              </div>
              <div className="text-xs text-slate-800 font-medium text-center mt-1">
                {badge.description}
              </div>
            </>
          );

          const wrapperClass = `group flex flex-col items-center p-4 rounded-xl hover:bg-slate-100/80 transition-colors motion-reduce:duration-[0.01ms] duration-300 w-full h-full`;

          return (
            <FadeInUp key={badge.id} delay={index * 0.1}>
              {badge.url ? (
                <a
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperClass}
                >
                  <BadgeContent />
                </a>
              ) : (
                <div className={wrapperClass}>
                  <BadgeContent />
                </div>
              )}
            </FadeInUp>
          );
        })}
      </div>
    </div>
  );
};
