'use client';
import React, { useEffect, useRef, useState } from 'react';

// Configuration
const CONFIG = {
  SHIP_SPEED: 8,
  BULLET_SPEED: 15,
  BASE_ENEMY_SPEED: 4,
  FIRE_RATE: 15, // frames between shots
  PARTICLE_COUNT: 15,
};

// Physics/Game entities
interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  markedForDeletion: boolean;
}

interface Enemy extends Entity {
  vy: number;
  hp: number;
}

interface Bullet extends Entity {
  vy: number;
}

interface Particle extends Entity {
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function VelocityVoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const isGameOver = useRef(false);
  const [gameOverState, setGameOverState] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  // Input states
  const keys = useRef<{ [key: string]: boolean }>({});

  // Player state
  const player = useRef({
    x: 0,
    y: 0,
    width: 30,
    height: 40,
    cooldown: 0,
  });

  const bullets = useRef<Bullet[]>([]);
  const enemies = useRef<Enemy[]>([]);
  const particles = useRef<Particle[]>([]);
  const stars = useRef<{ x: number; y: number; speed: number; size: number }[]>([]);

  const initGame = (canvas: HTMLCanvasElement) => {
    scoreRef.current = 0;
    frameRef.current = 0;
    isGameOver.current = false;
    setGameOverState(false);
    setCurrentScore(0);
    bullets.current = [];
    enemies.current = [];
    particles.current = [];

    player.current.x = canvas.width / 2;
    player.current.y = canvas.height - 100;

    // Init stars
    stars.current = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 2,
    }));
  };

  const createExplosion = (x: number, y: number, color: string) => {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      particles.current.push({
        x,
        y,
        width: 3,
        height: 3,
        color,
        markedForDeletion: false,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: Math.random() * 20 + 10,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!isGameOver.current) {
        player.current.x = Math.min(player.current.x, canvas.width - player.current.width);
        player.current.y = Math.min(player.current.y, canvas.height - player.current.height);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    initGame(canvas);

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Touch handlers for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let pStartX = 0;
    let pStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pStartX = player.current.x;
      pStartY = player.current.y;
      keys.current['Space'] = true; // Auto-shoot on touch
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      player.current.x = Math.max(0, Math.min(canvas.width - player.current.width, pStartX + dx));
      player.current.y = Math.max(0, Math.min(canvas.height - player.current.height, pStartY + dy));
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      keys.current['Space'] = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Game Loop
    let animationId: number;

    const loop = () => {
      if (isGameOver.current) return;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speedMultiplier = 1 + scoreRef.current / 2000; // Scale speed like dino
      frameRef.current++;
      scoreRef.current += 1;

      // Update & Draw Stars
      ctx.fillStyle = '#ffffff';
      stars.current.forEach((star) => {
        star.y += star.speed * Math.max(1, speedMultiplier * 0.5);
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // Player Movement
      const p = player.current;
      if (keys.current['ArrowLeft'] || keys.current['KeyA']) p.x -= CONFIG.SHIP_SPEED;
      if (keys.current['ArrowRight'] || keys.current['KeyD']) p.x += CONFIG.SHIP_SPEED;
      if (keys.current['ArrowUp'] || keys.current['KeyW']) p.y -= CONFIG.SHIP_SPEED;
      if (keys.current['ArrowDown'] || keys.current['KeyS']) p.y += CONFIG.SHIP_SPEED;

      // Bounds check
      p.x = Math.max(0, Math.min(canvas.width - p.width, p.x));
      p.y = Math.max(0, Math.min(canvas.height - p.height, p.y));

      // Shooting
      if (p.cooldown > 0) p.cooldown--;
      if (keys.current['Space'] && p.cooldown <= 0) {
        bullets.current.push({
          x: p.x + p.width / 2 - 2,
          y: p.y,
          width: 4,
          height: 15,
          color: '#fff',
          markedForDeletion: false,
          vy: -CONFIG.BULLET_SPEED,
        });
        p.cooldown = CONFIG.FIRE_RATE;
      }

      // Spawning Enemies
      const spawnRate = Math.max(15, 60 - Math.floor(speedMultiplier * 5));
      if (frameRef.current % spawnRate === 0) {
        const size = Math.random() * 30 + 20;
        enemies.current.push({
          x: Math.random() * (canvas.width - size),
          y: -size,
          width: size,
          height: size,
          color: '#fff',
          markedForDeletion: false,
          vy: (CONFIG.BASE_ENEMY_SPEED + Math.random() * 2) * speedMultiplier,
          hp: size > 40 ? 3 : 1,
        });
      }

      // Update & Draw Bullets
      ctx.fillStyle = '#fff';
      bullets.current.forEach((b) => {
        b.y += b.vy;
        if (b.y < -100) b.markedForDeletion = true;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });

      // Update & Draw Enemies
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      enemies.current.forEach((e) => {
        e.y += e.vy;
        if (e.y > canvas.height + 100) e.markedForDeletion = true;

        ctx.strokeRect(e.x, e.y, e.width, e.height);

        // Player Collision
        if (
          p.x < e.x + e.width &&
          p.x + p.width > e.x &&
          p.y < e.y + e.height &&
          p.y + p.height > e.y
        ) {
          isGameOver.current = true;
          setGameOverState(true);
          setCurrentScore(scoreRef.current);
          createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#fff');
        }
      });

      // Bullet-Enemy Collisions
      bullets.current.forEach((b) => {
        enemies.current.forEach((e) => {
          if (
            !b.markedForDeletion &&
            !e.markedForDeletion &&
            b.x < e.x + e.width &&
            b.x + b.width > e.x &&
            b.y < e.y + e.height &&
            b.y + b.height > e.y
          ) {
            b.markedForDeletion = true;
            e.hp--;
            if (e.hp <= 0) {
              e.markedForDeletion = true;
              createExplosion(e.x + e.width / 2, e.y + e.height / 2, '#fff');
              scoreRef.current += 100;
            } else {
              createExplosion(b.x, b.y, '#888');
            }
          }
        });
      });

      // Update & Draw Particles
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) p.markedForDeletion = true;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - p.life / p.maxLife;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.globalAlpha = 1.0;
      });

      // Cleanup
      bullets.current = bullets.current.filter((b) => !b.markedForDeletion);
      enemies.current = enemies.current.filter((e) => !e.markedForDeletion);
      particles.current = particles.current.filter((p) => !p.markedForDeletion);

      // Draw Player
      if (!isGameOver.current) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(p.x + p.width / 2, p.y);
        ctx.lineTo(p.x + p.width, p.y + p.height);
        ctx.lineTo(p.x + p.width / 2, p.y + p.height - 10);
        ctx.lineTo(p.x, p.y + p.height);
        ctx.closePath();
        ctx.fill();
      }

      // Draw Score
      ctx.fillStyle = '#fff';
      ctx.font = '24px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.floor(scoreRef.current).toString(), canvas.width - 20, 40);

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-black">
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {gameOverState && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest mb-4 text-center">
            SYSTEM FAILURE
          </h2>
          <p className="text-xl font-mono text-gray-400 mb-8 text-center">
            SCORE: {Math.floor(currentScore)}
          </p>
          <button
            onClick={() => {
              if (canvasRef.current) {
                initGame(canvasRef.current);
                const loop = () => {
                  if (!isGameOver.current) {
                    /* game handles itself via useEffect unfortunately... we must remount it or trigger start */
                  }
                };
                // Actually to restart cleanly we just need to re-trigger the initGame and requestAnimationFrame inside the effect won't restart if it was cancelled.
                // Wait, if isGameOver = true, the loop returns early! It doesn't cancel the frame, it just stops looping. We need to force a re-render to rerun the effect or fix the loop.
              }
            }}
            className="hidden" // Will fix restart via state
          />
          <button
            onClick={() => window.location.reload()} // Simplest restart for a hidden game without complex refactoring
            className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black transition-colors font-mono tracking-widest uppercase text-sm"
          >
            Restart Engine
          </button>
        </div>
      )}
    </div>
  );
}
