'use client';

import React, { useRef, useState, useEffect } from 'react';

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_GLOW_COLOR = '255, 255, 255';

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

const GlobalSpotlight: React.FC<{
  enabled: boolean;
  spotlightRadius: number;
  glowColor: string;
  disableAnimations: boolean;
}> = ({ enabled, spotlightRadius, glowColor, disableAnimations }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || disableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setOpacity(1);
        rafRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, disableAnimations]);

  if (!enabled || disableAnimations) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity motion-reduce:duration-[0.01ms] duration-300 mix-blend-screen"
      style={{
        opacity,
        background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, transparent 70%)`,
      }}
    />
  );
};

const ParticleCard: React.FC<BentoCardProps> = ({ className = '', style, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
};

export const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
  cards = defaultCardData,
  children,
  columns,
  gap = 12,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    // Use requestAnimationFrame to avoid synchronous state update in effect
    requestAnimationFrame(handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldDisableAnimations = disableAnimations || isMobile;

  const gridStyle = {
    gap: `${gap}px`,
    gridTemplateColumns: columns ? (isMobile ? '1fr' : `repeat(${columns}, 1fr)`) : undefined,
  } as React.CSSProperties;

  let content: React.ReactNode;
  if (children) {
    content = children;
  } else {
    content = cards.map((card, idx) => (
      <ParticleCard
        key={idx}
        className={`p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md min-h-[200px] flex flex-col justify-end transition motion-reduce:duration-[0.01ms] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-glow hover:bg-black/40 ${enableBorderGlow ? 'card--border-glow' : ''}`}
        style={{ backgroundColor: card.color || '#060010' }}
        disableAnimations={shouldDisableAnimations}
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
      </ParticleCard>
    ));
  }

  return (
    <div className={`relative w-full ${className}`}>
      <GlobalSpotlight
        enabled={enableSpotlight}
        spotlightRadius={spotlightRadius}
        glowColor={glowColor}
        disableAnimations={shouldDisableAnimations}
      />

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full relative z-10`}
        style={gridStyle}
      >
        {content}
      </div>
    </div>
  );
};

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
> = ({ children, ...props }) => {
  return <ParticleCard {...props}>{children || null}</ParticleCard>;
};
