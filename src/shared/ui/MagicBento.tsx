import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

export interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    textAutoHide?: boolean;
    disableAnimations?: boolean;
    allowOverflow?: boolean;
}

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
    cards?: BentoCardProps[];
    children?: React.ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
}

const DEFAULT_PARTICLE_COUNT = 8; // Reduced slightly for React performance
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '20, 154, 154'; // Teal
const MOBILE_BREAKPOINT = 768;

const defaultCardData: BentoCardProps[] = [
    { color: '#060010', title: 'Analytics', description: 'Track user behavior', label: 'Insights' },
    { color: '#060010', title: 'Dashboard', description: 'Centralized data view', label: 'Overview' },
    { color: '#060010', title: 'Collaboration', description: 'Work together seamlessly', label: 'Teamwork' },
    { color: '#060010', title: 'Automation', description: 'Streamline workflows', label: 'Efficiency' },
    { color: '#060010', title: 'Integration', description: 'Connect favorite tools', label: 'Connectivity' },
    { color: '#060010', title: 'Security', description: 'Enterprise-grade protection', label: 'Protection' }
];

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};

// Global Spotlight Component
const GlobalSpotlight: React.FC<{
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
    disableAnimations?: boolean;
}> = ({ enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR, disableAnimations = false }) => {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const opacity = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

    useEffect(() => {
        if (disableAnimations || !enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            opacity.set(0.8);

            // Check if hovering over any bento card to update CSS variables for border glow
            const target = e.target as HTMLElement;
            const card = target.closest('.card--border-glow');
            if (card) {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                (card as HTMLElement).style.setProperty('--glow-x', `${x}%`);
                (card as HTMLElement).style.setProperty('--glow-y', `${y}%`);
                (card as HTMLElement).style.setProperty('--glow-intensity', '1');
            } else {
                // Reset intensity on other cards (optional, might be expensive to query all)
                document.querySelectorAll('.card--border-glow').forEach(el => {
                    (el as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
            }
        };

        const handleMouseLeave = () => {
            opacity.set(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [disableAnimations, enabled, mouseX, mouseY, opacity]);

    if (!enabled || disableAnimations) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <motion.div
            className="global-spotlight pointer-events-none fixed z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            style={{
                left: smoothX,
                top: smoothY,
                opacity: smoothOpacity,
                width: spotlightRadius * 2,
                height: spotlightRadius * 2,
                background: `radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, transparent 70%)`
            }}
        />,
        document.body
    );
};

// Particle Card Component
const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disableAnimations?: boolean;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}> = ({
    children, className = '', style, disableAnimations = false, particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR, enableTilt = true, clickEffect = false, enableMagnetism = false
}) => {
        const ref = useRef<HTMLDivElement>(null);
        const [isHovered, setIsHovered] = useState(false);
        const [particles, setParticles] = useState<{ id: number; x: number; y: number; jitterX: number; jitterY: number }[]>([]);
        const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

        // Motion Values for Tilt & Magnetism
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 100, damping: 20 });
        const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 100, damping: 20 });

        // Magnetism springs
        const magX = useSpring(0, { stiffness: 100, damping: 20 });
        const magY = useSpring(0, { stiffness: 100, damping: 20 });

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disableAnimations) return;
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            x.set(mouseX - centerX);
            y.set(mouseY - centerY);

            if (enableMagnetism) {
                magX.set((mouseX - centerX) * 0.05);
                magY.set((mouseY - centerY) * 0.05);
            }
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
            magX.set(0);
            magY.set(0);
            setParticles([]); // Clear particles on leave
        };

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!clickEffect || disableAnimations) return;
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height) * 2;

            const newRipple = { id: Date.now(), x, y, size };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 800);
        };

        // Particle Generation Interval
        useEffect(() => {
            if (!isHovered || disableAnimations) return;

            const interval = setInterval(() => {
                if (particles.length >= particleCount) return;
                const rect = ref.current?.getBoundingClientRect();
                if (!rect) return;

                const newParticle = {
                    id: Math.random(),
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    jitterX: (Math.random() - 0.5) * 50,
                    jitterY: (Math.random() - 0.5) * 50
                };
                setParticles(prev => [...prev, newParticle]);
            }, 200);

            return () => clearInterval(interval);
        }, [isHovered, disableAnimations, particles.length, particleCount]);

        return (
            <motion.div
                ref={ref}
                className={`relative overflow-hidden ${className}`}
                style={{
                    ...style,
                    rotateX: enableTilt ? rotateX : 0,
                    rotateY: enableTilt ? rotateY : 0,
                    x: enableMagnetism ? magX : 0,
                    y: enableMagnetism ? magY : 0,
                    perspective: 1000
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* Particles */}
                <AnimatePresence>
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: p.x + p.jitterX, y: p.y + p.jitterY }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute w-1 h-1 rounded-full pointer-events-none"
                            style={{
                                left: p.x,
                                top: p.y,
                                background: `rgba(${glowColor}, 0.6)`,
                                boxShadow: `0 0 6px rgba(${glowColor}, 0.6)`
                            }}
                            onAnimationComplete={() => setParticles(prev => prev.filter(item => item.id !== p.id))}
                        />
                    ))}
                </AnimatePresence>

                {/* Ripples */}
                <AnimatePresence>
                    {ripples.map(r => (
                        <motion.div
                            key={r.id}
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                left: r.x - r.size / 2,
                                top: r.y - r.size / 2,
                                width: r.size,
                                height: r.size,
                                background: `radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, transparent 70%)`
                            }}
                        />
                    ))}
                </AnimatePresence>

                {children}
            </motion.div>
        );
    };

export const MagicBento: React.FC<BentoProps> = ({
    textAutoHide = true, enableStars: _enableStars = true, enableSpotlight = true, enableBorderGlow = true, disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR, clickEffect = true, enableMagnetism = true, cards = defaultCardData,
    children, columns, gap = 12, className = ''
}) => {
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    const gridStyle = {
        gap: `${gap}px`,
        gridTemplateColumns: columns ? (isMobile ? '1fr' : `repeat(${columns}, 1fr)`) : undefined
    } as React.CSSProperties;

    // Determine content to render: children take precedence, otherwise map cards
    let content: React.ReactNode;
    if (children) {
        content = children;
    } else {
        content = cards.map((card, idx) => (
            <ParticleCard
                key={idx}
                className={`p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md min-h-[200px] flex flex-col justify-end transition-all duration-300 ${enableBorderGlow ? 'card--border-glow' : ''}`}
                style={{ backgroundColor: card.color || '#060010' }}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
            >
                <div className={`relative z-10 transition-opacity duration-300 ${textAutoHide ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    {card.label && <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase mb-2 block">{card.label}</span>}
                    {card.title && <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>}
                    {card.description && <p className="text-gray-400 text-sm">{card.description}</p>}
                </div>
            </ParticleCard>
        ));
    }

    return (
        <div className={`relative w-full ${className}`}>
            <style>{`
                .card--border-glow::after { content: ''; position: absolute; inset: 0; padding: 2px; background: radial-gradient(var(--glow-radius, 200px) circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(${glowColor}, calc(var(--glow-intensity, 0) * 0.8)) 0%, rgba(${glowColor}, calc(var(--glow-intensity, 0) * 0.4)) 30%, transparent 60%); border-radius: inherit; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; pointer-events: none; z-index: 1; }
            `}</style>
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

// Wrapper to maintain API compatibility
export const BentoCard: React.FC<BentoCardProps & {
    effect?: string;
    tiltMax?: number;
    glowColor?: string;
    spotlightColor?: string;
    children?: React.ReactNode;
    className?: string;
    allowOverflow?: boolean
}> = ({ children, ...props }) => {
    // Pass relevant props to ParticleCard, ignoring 'effect' for now as it's handled by default styles/props
    return <ParticleCard {...props}>{children || null}</ParticleCard>;
};
