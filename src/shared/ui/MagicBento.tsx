import React from 'react';

export interface BentoCardData {
  title?: string;
  description?: string;
  label?: string;
  color?: string;
  icon?: React.ReactNode;
}

const defaultCardData: BentoCardData[] = [
  { title: 'Innovation', description: 'Pushing boundaries.', label: 'NEW', color: '#1A1A1A' },
  { title: 'Speed', description: 'Lightning fast.', color: '#2A2A2A' },
];

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: BentoCardData[];
  children?: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

export interface BentoCardProps {
  className?: string;
  style?: React.CSSProperties;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  children?: React.ReactNode;
}

export const BentoCard: React.FC<
  BentoCardProps & {
    effect?: string;
    tiltMax?: number;
    glowColor?: string;
    spotlightColor?: string;
    children?: React.ReactNode;
    className?: string;
    allowOverflow?: boolean;
  }
> = ({ className = '', style, children }) => {
  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform-gpu ${className}`}
      style={style}
    >
      {children || null}
    </div>
  );
};

export const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableBorderGlow = true,
  cards = defaultCardData,
  children,
  columns = 3,
  gap = 12,
  className = '',
}) => {
  let content: React.ReactNode;
  if (children) {
    content = children;
  } else {
    content = cards.map((card, idx) => (
      <BentoCard
        key={idx}
        className={`p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md min-h-[200px] flex flex-col justify-end transition motion-reduce:duration-[0.01ms] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-glow hover:bg-black/40 ${enableBorderGlow ? 'card--border-glow' : ''}`}
        style={{ backgroundColor: card.color || '#060010' }}
      >
        <div
          className={`relative z-10 transition-opacity motion-reduce:duration-[0.01ms] duration-300 ${textAutoHide ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        >
          {card.label && (
            <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase mb-2 block">
              {card.label}
            </span>
          )}
          {card.title && <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>}
          {card.description && <p className="text-gray-400 text-sm">{card.description}</p>}
        </div>
      </BentoCard>
    ));
  }

  const columnClass =
    columns === 3
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : columns === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1';

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`grid ${columnClass} auto-rows-fr w-full relative z-10`}
        style={{ gap: `${gap}px` }}
      >
        {content}
      </div>
    </div>
  );
};
