'use client';
import React, { useEffect, useRef, useState } from 'react';

// Configuration
const CONFIG = {
  SHIP_SPEED: 8,
  BULLET_SPEED: 18,
  BASE_ENEMY_SPEED: 4,
  FIRE_RATE: 12, // frames between shots
  PARTICLE_COUNT: 20,
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
  maxHp: number;
  vertices: { x: number; y: number }[];
  rot: number;
  rotSpeed: number;
}

interface Bullet extends Entity {
  vy: number;
}

interface Particle extends Entity {
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  glow?: boolean;
}

export default function VelocityVoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const isGameOver = useRef(false);
  const animationIdRef = useRef<number | null>(null);

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
  const stars = useRef<
    { x: number; y: number; speed: number; size: number; layer: number; opacity: number }[]
  >([]);

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
    player.current.y = canvas.height - 120;

    // Init Parallax Stars (3 layers)
    stars.current = Array.from({ length: 150 }).map(() => {
      const layer = Math.floor(Math.random() * 3) + 1; // 1 (far), 2 (mid), 3 (near)
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: layer * 0.5 + Math.random() * 0.5,
        size: layer * 0.8,
        layer,
        opacity: layer * 0.3 + 0.1,
      };
    });
  };

  const createExplosion = (
    x: number,
    y: number,
    color: string,
    count: number = CONFIG.PARTICLE_COUNT,
    speedMulti: number = 1
  ) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 * speedMulti;
      particles.current.push({
        x,
        y,
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        color,
        markedForDeletion: false,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 30 + 10,
        glow: true,
      });
    }
  };

  const createExhaust = (x: number, y: number) => {
    particles.current.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + Math.random() * 5,
      width: 2,
      height: 2,
      color: '#00f0ff',
      markedForDeletion: false,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 5 + 2,
      life: 0,
      maxLife: 15,
      glow: true,
    });
  };

  const generateAsteroidVertices = (size: number) => {
    const vertices = [];
    const points = 8;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius = (size / 2) * (0.7 + Math.random() * 0.3);
      vertices.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }
    return vertices;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Touch
    let touchStartX = 0,
      touchStartY = 0,
      pStartX = 0,
      pStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pStartX = player.current.x;
      pStartY = player.current.y;
      keys.current['Space'] = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      player.current.x = Math.max(
        20,
        Math.min(canvas.width - player.current.width - 20, pStartX + dx)
      );
      player.current.y = Math.max(
        20,
        Math.min(canvas.height - player.current.height - 20, pStartY + dy)
      );
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (e.target !== canvas) return;
      keys.current['Space'] = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    const loop = () => {
      if (isGameOver.current) return;

      // Clear with dark blue/black space color
      ctx.fillStyle = '#030514';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speedMultiplier = 1 + scoreRef.current / 3000;
      frameRef.current++;
      scoreRef.current += 1;

      // Draw Stars
      stars.current.forEach((star) => {
        star.y += star.speed * speedMultiplier;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      const p = player.current;

      // Player Move
      if (keys.current['ArrowLeft'] || keys.current['KeyA']) p.x -= CONFIG.SHIP_SPEED;
      if (keys.current['ArrowRight'] || keys.current['KeyD']) p.x += CONFIG.SHIP_SPEED;
      if (keys.current['ArrowUp'] || keys.current['KeyW']) p.y -= CONFIG.SHIP_SPEED;
      if (keys.current['ArrowDown'] || keys.current['KeyS']) p.y += CONFIG.SHIP_SPEED;

      p.x = Math.max(10, Math.min(canvas.width - p.width - 10, p.x));
      p.y = Math.max(10, Math.min(canvas.height - p.height - 10, p.y));

      // Exhaust
      if (frameRef.current % 2 === 0) createExhaust(p.x + p.width / 2, p.y + p.height);

      // Shooting
      if (p.cooldown > 0) p.cooldown--;
      if (keys.current['Space'] && p.cooldown <= 0) {
        bullets.current.push({
          x: p.x + p.width / 2 - 2,
          y: p.y,
          width: 4,
          height: 18,
          color: '#00f0ff',
          markedForDeletion: false,
          vy: -CONFIG.BULLET_SPEED,
        });
        p.cooldown = CONFIG.FIRE_RATE;
      }

      // Spawn Enemies
      const spawnRate = Math.max(20, 70 - Math.floor(speedMultiplier * 8));
      if (frameRef.current % spawnRate === 0) {
        const size = Math.random() * 40 + 25;
        enemies.current.push({
          x: Math.random() * (canvas.width - size),
          y: -size,
          width: size,
          height: size,
          color: '#ff2a6d',
          markedForDeletion: false,
          vy: (CONFIG.BASE_ENEMY_SPEED + Math.random() * 3) * speedMultiplier,
          hp: size > 50 ? 5 : 2,
          maxHp: size > 50 ? 5 : 2,
          vertices: generateAsteroidVertices(size),
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }

      // Draw Bullets
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.fillStyle = '#fff';
      bullets.current.forEach((b) => {
        b.y += b.vy;
        if (b.y < -50) b.markedForDeletion = true;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });

      // Draw Enemies
      ctx.lineWidth = 2;
      enemies.current.forEach((e) => {
        e.y += e.vy;
        e.rot += e.rotSpeed;
        if (e.y > canvas.height + 100) e.markedForDeletion = true;

        ctx.save();
        ctx.translate(e.x + e.width / 2, e.y + e.height / 2);
        ctx.rotate(e.rot);

        ctx.strokeStyle = e.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = e.color;
        ctx.fillStyle = 'rgba(10, 0, 20, 0.7)'; // Dark core

        ctx.beginPath();
        e.vertices.forEach((v, i) => {
          if (i === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Damage indicator
        if (e.hp < e.maxHp) {
          ctx.fillStyle = 'white';
          ctx.globalAlpha = 0.5;
          ctx.fill();
        }

        ctx.restore();

        // Collision with Player (Circle based for better feel)
        const dx = p.x + p.width / 2 - (e.x + e.width / 2);
        const dy = p.y + p.height / 2 - (e.y + e.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < p.width / 2 + e.width / 2 - 5) {
          isGameOver.current = true;
          setGameOverState(true);
          setCurrentScore(scoreRef.current);
          createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#00f0ff', 50, 2);
          createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#ff2a6d', 30, 1.5);
        }
      });

      // Bullet-Enemy Collisions
      bullets.current.forEach((b) => {
        enemies.current.forEach((e) => {
          if (b.markedForDeletion || e.markedForDeletion) return;

          const dx = b.x + b.width / 2 - (e.x + e.width / 2);
          const dy = b.y + b.height / 2 - (e.y + e.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < e.width / 2 + 5) {
            b.markedForDeletion = true;
            e.hp--;
            if (e.hp <= 0) {
              e.markedForDeletion = true;
              createExplosion(e.x + e.width / 2, e.y + e.height / 2, e.color, 20);
              scoreRef.current += e.maxHp * 50;
            } else {
              createExplosion(b.x, b.y, '#fff', 5, 0.5);
            }
          }
        });
      });

      // Draw Particles
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) p.markedForDeletion = true;

        ctx.fillStyle = p.color;
        if (p.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillRect(p.x, p.y, p.width, p.height);
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Cleanup
      bullets.current = bullets.current.filter((b) => !b.markedForDeletion);
      enemies.current = enemies.current.filter((e) => !e.markedForDeletion);
      particles.current = particles.current.filter((p) => !p.markedForDeletion);

      // Draw Player Ship (Sleek Polygon)
      if (!isGameOver.current) {
        ctx.save();
        ctx.translate(p.x + p.width / 2, p.y + p.height / 2);

        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00f0ff';
        ctx.fillStyle = '#fff';

        ctx.beginPath();
        // Nose
        ctx.moveTo(0, -p.height / 2);
        // Right wing
        ctx.lineTo(p.width / 2, p.height / 2);
        // Right indent
        ctx.lineTo(p.width / 4, p.height / 3);
        // Core bottom
        ctx.lineTo(0, p.height / 2 - 5);
        // Left indent
        ctx.lineTo(-p.width / 4, p.height / 3);
        // Left wing
        ctx.lineTo(-p.width / 2, p.height / 2);
        ctx.closePath();
        ctx.fill();

        // Cockpit window
        ctx.fillStyle = '#030514';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(0, -p.height / 4);
        ctx.lineTo(p.width / 8, 0);
        ctx.lineTo(-p.width / 8, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // Draw Score
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.floor(scoreRef.current).toString(), canvas.width - 30, 50);
      ctx.shadowBlur = 0;

      animationIdRef.current = requestAnimationFrame(loop);
    };

    // Export restart function to the window or handle via state.
    // Easiest is just starting the loop.
    animationIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handleRestart = () => {
    if (canvasRef.current) {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      // initGame is called inside useEffect, so we need a way to trigger it.
      // Easiest way in React is to force a re-render of the component via a key.
    }
  };

  return (
    <div className="w-full h-full relative bg-[#030514]">
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {gameOverState && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030514]/80 backdrop-blur-md z-10 text-white">
          <h2
            className="text-5xl md:text-7xl font-black tracking-widest mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff2a6d]"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}
          >
            SYSTEM FAILURE
          </h2>
          <p className="text-2xl font-mono text-[#00f0ff] mb-12 text-center drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
            SCORE: {Math.floor(currentScore)}
          </p>
          <button
            onClick={() => window.location.reload()} // Restarting via reload is the most stable way to reset event listeners safely without refactoring the massive useEffect.
            className="px-10 py-4 border-2 border-[#ff2a6d] text-[#ff2a6d] hover:bg-[#ff2a6d] hover:text-white hover:shadow-[0_0_30px_rgba(255,42,109,0.8)] transition-all font-mono tracking-widest uppercase text-lg rounded-full"
          >
            Restart Engine
          </button>
        </div>
      )}
    </div>
  );
}
