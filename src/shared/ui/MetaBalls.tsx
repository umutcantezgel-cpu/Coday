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

    const initBalls = useCallback((width: number, height: number) => {
        ballsRef.current = Array.from({ length: ballCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2 * speed,
            vy: (Math.random() - 0.5) * 2 * speed,
            size: ballSize + Math.random() * ballSize * 0.5
        }));
    }, [ballCount, ballSize, speed]);

    const drawMetaballs = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            // Clear canvas
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // Update ball positions
            ballsRef.current.forEach(ball => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off walls
                if (ball.x < 0 || ball.x > width) ball.vx *= -1;
                if (ball.y < 0 || ball.y > height) ball.vy *= -1;
            });

            // Create ImageData for metaball effect
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            // Parse colors
            const parseColor = (colorStr: string) => {
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = 1;
                const tempCtx = canvas.getContext('2d');
                if (!tempCtx) return { r: 0, g: 0, b: 0 };
                tempCtx.fillStyle = colorStr;
                tempCtx.fillRect(0, 0, 1, 1);
                const imgData = tempCtx.getImageData(0, 0, 1, 1).data;
                return { r: imgData[0], g: imgData[1], b: imgData[2] };
            };

            const ballColor = parseColor(color);
            const cursorColor = parseColor(cursorBallColor);

            // Sample every 2 pixels for performance
            const step = 2;
            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    let sum = 0;
                    let isCursor = false;

                    // Add contribution from each ball
                    ballsRef.current.forEach(ball => {
                        const dx = x - ball.x;
                        const dy = y - ball.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > 0) {
                            sum += (ball.size * ball.size) / (dist * dist);
                        }
                    });

                    // Add contribution from cursor ball
                    if (enableCursor && mouseRef.current.x >= 0) {
                        const dx = x - mouseRef.current.x;
                        const dy = y - mouseRef.current.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > 0) {
                            const cursorContrib = (cursorBallSize * cursorBallSize) / (dist * dist);
                            if (cursorContrib > sum * 0.5) isCursor = true;
                            sum += cursorContrib;
                        }
                    }

                    // Threshold for metaball visibility
                    const threshold = 1;
                    if (sum > threshold) {
                        const alpha = Math.min(255, (sum - threshold) * 100);
                        const finalColor = isCursor ? cursorColor : ballColor;

                        // Fill the stepped area
                        for (let sy = 0; sy < step && y + sy < height; sy++) {
                            for (let sx = 0; sx < step && x + sx < width; sx++) {
                                const i = ((y + sy) * width + (x + sx)) * 4;
                                data[i] = finalColor.r;
                                data[i + 1] = finalColor.g;
                                data[i + 2] = finalColor.b;
                                data[i + 3] = alpha;
                            }
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
        },
        [color, backgroundColor, cursorBallColor, cursorBallSize, enableCursor]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
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

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'block' }}
        />
    );
};

export default MetaBalls;
