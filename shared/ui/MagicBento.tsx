import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import gsap from 'gsap';

type BentoEffect = 'stars' | 'spotlight' | 'glow' | 'tilt' | 'magnet' | 'none';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    effect?: BentoEffect;
    spotlightColor?: string;
    glowColor?: string;
    tiltMax?: number;
    magnetStrength?: number;
    starCount?: number;
    starColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = '',
    effect = 'none',
    spotlightColor = 'rgba(26, 154, 154, 0.15)',
    glowColor = 'rgba(26, 154, 154, 0.4)',
    tiltMax = 15,
    magnetStrength = 0.3,
    starCount = 50,
    starColor = '#1A9A9A'
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement>(null);

    const generateStars = useCallback(() => {
        if (!starsRef.current || effect !== 'stars') return;
        starsRef.current.innerHTML = '';
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'absolute rounded-full opacity-0';
            star.style.cssText = `
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${starColor};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s;
      `;
            starsRef.current.appendChild(star);
        }
    }, [effect, starCount, starColor]);

    useEffect(() => {
        generateStars();
    }, [generateStars]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (effect === 'spotlight' && spotlightRef.current) {
                spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 50%)`;
                spotlightRef.current.style.opacity = '1';
            }

            if (effect === 'glow' && glowRef.current) {
                glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
                glowRef.current.style.opacity = '1';
            }

            if (effect === 'tilt' && innerRef.current) {
                const rotateX = ((y - centerY) / centerY) * -tiltMax;
                const rotateY = ((x - centerX) / centerX) * tiltMax;
                gsap.to(innerRef.current, {
                    rotateX,
                    rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (effect === 'magnet' && innerRef.current) {
                const moveX = (x - centerX) * magnetStrength;
                const moveY = (y - centerY) * magnetStrength;
                gsap.to(innerRef.current, {
                    x: moveX,
                    y: moveY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        },
        [effect, spotlightColor, glowColor, tiltMax, magnetStrength]
    );

    const handleMouseLeave = useCallback(() => {
        if (effect === 'spotlight' && spotlightRef.current) {
            spotlightRef.current.style.opacity = '0';
        }
        if (effect === 'glow' && glowRef.current) {
            glowRef.current.style.opacity = '0';
        }
        if ((effect === 'tilt' || effect === 'magnet') && innerRef.current) {
            gsap.to(innerRef.current, {
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [effect]);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
        >
            {effect === 'stars' && (
                <div ref={starsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
            )}
            {effect === 'spotlight' && (
                <div
                    ref={spotlightRef}
                    className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
                />
            )}
            {effect === 'glow' && (
                <div
                    ref={glowRef}
                    className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
                />
            )}
            <div
                ref={innerRef}
                className="relative z-10"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {children}
            </div>
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

interface MagicBentoProps {
    children: React.ReactNode;
    className?: string;
    columns?: number;
    gap?: number;
}

const MagicBento: React.FC<MagicBentoProps> = ({
    children,
    className = '',
    columns = 3,
    gap = 24
}) => {
    const gridStyle = useMemo(
        () => ({
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${gap}px`
        }),
        [columns, gap]
    );

    return (
        <div className={`w-full ${className}`} style={gridStyle}>
            {children}
        </div>
    );
};

export { MagicBento, BentoCard };
export type { BentoEffect, BentoCardProps, MagicBentoProps };
export default MagicBento;
