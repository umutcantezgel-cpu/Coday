import React, { useRef, useEffect, useCallback } from 'react';

interface MetaBallsProps {
    color?: string;
    backgroundColor?: string;
    cursorBallSize?: number;
    cursorBallColor?: string;
    ballCount?: number;
    ballSize?: number;
    speed?: number;
    className?: string;
    enableCursor?: boolean;
}

const MetaBalls: React.FC<MetaBallsProps> = ({
    color = '#1A9A9A',
    backgroundColor = 'transparent',
    cursorBallSize = 80,
    cursorBallColor = '#2D3748',
    ballCount = 6,
    ballSize = 100,
    speed = 1,
    className = '',
    enableCursor = true
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const ballsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
    const animationRef = useRef<number>(0);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveSpeed = prefersReducedMotion ? 0 : speed;

    const initBalls = useCallback((width: number, height: number) => {
        ballsRef.current = Array.from({ length: ballCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2 * effectiveSpeed,
            vy: (Math.random() - 0.5) * 2 * effectiveSpeed,
            size: ballSize + Math.random() * ballSize * 0.5
        }));
    }, [ballCount, ballSize, effectiveSpeed]);

    const drawMetaballs = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Use CSS/Context filters for gooey effect: blur then threshold (contrast)
            // Note: Context filter is standard in modern browsers
            ctx.filter = 'blur(20px) contrast(20)';

            // Background fill (if needed, but usually we want transparency for overlay)
            // If backgroundColor is transparent, we leave it. 
            // If we need a bg color, we should apply it to the container, not valid with contrast filter trick on same layer easily.
            // Actually, for single layer gooey: draw white balls, apply filter. Colorize via composition or CSS.
            // Simpler: Draw balls with solid color.

            // To achieve the specific color, we can draw colored balls.
            ctx.fillStyle = color;

            // Update and draw balls
            ballsRef.current.forEach(ball => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off walls
                if (ball.x < 0 || ball.x > width) ball.vx *= -1;
                if (ball.y < 0 || ball.y > height) ball.vy *= -1;

                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw cursor ball
            if (enableCursor && mouseRef.current.x >= 0) {
                ctx.fillStyle = cursorBallColor;
                ctx.beginPath();
                ctx.arc(mouseRef.current.x, mouseRef.current.y, cursorBallSize, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        [color, cursorBallColor, cursorBallSize, enableCursor]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                // Resize handling
                // For 'contrast' filter to work well for gooey, we need high resolution or CSS filter.
                // Using Canvas 2D filter API (Chrome/FF/Safari supported mostly)
                canvas.width = rect.width;
                canvas.height = rect.height;
                if (ballsRef.current.length === 0) {
                    initBalls(rect.width, rect.height);
                }
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            drawMetaballs(ctx, canvas.width, canvas.height);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initBalls, drawMetaballs]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -1000, y: -1000 };
    }, []);

    // Apply CSS filter as fallback or enhancement if ctx.filter isn't perfect
    // But we are using ctx.filter above. 
    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ backgroundColor }}>
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
};

export default MetaBalls;
