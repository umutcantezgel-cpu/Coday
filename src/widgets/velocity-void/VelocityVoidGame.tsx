/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';

// --- CONFIGURATION ---
const CONFIG = {
  SHIP_SPEED: 7,
  BULLET_SPEED: 22,
  ENEMY_BULLET_SPEED: 5,
  BASE_METEOR_SPEED: 0.3, // Super slow
  BASE_BOT_SPEED: 0.3, // Super slow
  PIXEL_SIZE: 5,
  PARTICLE_COUNT: 25,
};

// --- PALETTE ---
const PALETTE = {
  bg: '#161311',
  star: '#4A3728',
  player: '#F5E6D3',
  playerEye: '#00f0ff',
  thruster: '#ff2a6d',
  playerLaser: '#D4AF37',
  botPrimary: '#8C6239',
  botHunter: '#4A1C16',
  botJuggernaut: '#3A2718',
  botSniper: '#2D1B36',
  botStealth: '#1B2A2F',
  bossPrimary: '#111111',
  bossSecondary: '#333333',

  botSecondary: '#D4AF37',
  botEye: '#ff2a6d',
  enemyLaser: '#ff2a6d',
  meteorPrimary: '#5C4033',
  meteorSecondary: '#3E2723',
  meteorGold: '#D4AF37',
  itemWeapon: '#00f0ff',
  itemShield: '#D4AF37',
  itemHeart: '#ff2a6d',
  explosion1: '#D4AF37',
  explosion2: '#ff2a6d',
  uiText: '#F5E6D3',
};

// --- SPRITES ---
const PLAYER_SPRITE_L1 = ['   W   ', '  WEW  ', ' WWWWW ', ' W W W ', ' T   T '];

const CLAUDE_SCOUT = [' B   B ', '  BBB  ', ' BBRBB ', 'BBBBBBB', ' G   G ', '  B B  '];

const CLAUDE_HUNTER = [' H   H ', ' HHHHH ', ' HHRHH ', ' HHHHH ', '  H H  '];

const CLAUDE_JUGGERNAUT = [
  '  J   J  ',
  ' JJJJJJJ ',
  ' JJJJJJJ ',
  ' GJRJRG  ',
  'JJJJJJJJJ',
  ' J     J ',
];

const CLAUDE_STEALTH = ['   K   ', '  KKK  ', '   R   ', '   K   '];

const CLAUDE_SNIPER = ['  V V  ', ' VVVVV ', ' VV V  ', '  VRV  ', '   V   ', '   V   '];

const MOTHERSHIP_BOSS = [
  '       X X X       ',
  '    XXXXXXXXXXX    ',
  '   XXXXXXXXXXXXX   ',
  '  XXXRXXXXXXXRXXX  ',
  ' XXXXXXXXXXXXXXXXX ',
  ' X X XXXRRRXXX X X ',
  '   XXXXXXXXXXXXX   ',
  '  Y      Y      Y  ',
  '  Y      Y      Y  ',
];

const ITEM_XP = [' C ', 'CCC', ' C '];

const ITEM_HEART_EMPTY = [' VV VV ', 'V  V  V', 'V     V', ' V   V ', '  V V  ', '   V   '];
const ITEM_SHIELD_ICON = ['SSSSS', 'S   S', 'S   S', ' S S ', '  S  '];
const ITEM_HEART = [' R R ', 'RRRRR', ' RRR ', '  R  '];

const generateMeteorSprite = (gridSize: number, isGold: boolean = false) => {
  const sprite: string[] = [];
  for (let r = 0; r < gridSize; r++) {
    let row = '';
    for (let c = 0; c < gridSize; c++) {
      const dx = c - gridSize / 2 + 0.5;
      const dy = r - gridSize / 2 + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = gridSize / 2 - Math.random() * 1.5;
      if (dist < threshold) {
        if (isGold) row += Math.random() > 0.3 ? 'G' : 'D';
        else row += Math.random() > 0.3 ? 'M' : 'D';
      } else {
        row += ' ';
      }
    }
    sprite.push(row);
  }
  return sprite;
};

const retroSnap = (val: number) => Math.floor(val / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE;

const drawSprite = (
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  x: number,
  y: number,
  pixelSize: number,
  alpha: number = 1,
  flashColor?: string
) => {
  ctx.globalAlpha = alpha;
  const snappedX = retroSnap(x);
  const snappedY = retroSnap(y);

  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      const char = sprite[row][col];
      if (char === ' ') continue;

      if (flashColor) {
        ctx.fillStyle = flashColor;
      } else {
        if (char === 'W') ctx.fillStyle = PALETTE.player;
        else if (char === 'E') ctx.fillStyle = PALETTE.playerEye;
        else if (char === 'T') ctx.fillStyle = PALETTE.thruster;
        else if (char === 'B') ctx.fillStyle = PALETTE.botPrimary;
        else if (char === 'H') ctx.fillStyle = PALETTE.botHunter;
        else if (char === 'J') ctx.fillStyle = PALETTE.botJuggernaut;
        else if (char === 'G') ctx.fillStyle = PALETTE.botSecondary;
        else if (char === 'R')
          ctx.fillStyle = PALETTE.botEye; // Also used for Hearts
        else if (char === 'M') ctx.fillStyle = PALETTE.meteorPrimary;
        else if (char === 'D') ctx.fillStyle = PALETTE.meteorSecondary;
        else if (char === 'C') ctx.fillStyle = PALETTE.itemWeapon;
        else if (char === 'A')
          ctx.fillStyle = '#B0B0B0'; // Armor
        else if (char === 'P')
          ctx.fillStyle = '#00ff00'; // Regen
        else if (char === 'S')
          ctx.fillStyle = '#ffaa00'; // Speed Thruster
        else if (char === 'V') ctx.fillStyle = PALETTE.botSniper;
        else if (char === 'K') ctx.fillStyle = PALETTE.botStealth;
        else if (char === 'X') ctx.fillStyle = PALETTE.bossPrimary;
        else if (char === 'Y') ctx.fillStyle = PALETTE.bossSecondary;
      }

      ctx.fillRect(snappedX + col * pixelSize, snappedY + row * pixelSize, pixelSize, pixelSize);
    }
  }
  ctx.globalAlpha = 1;
};

const getPlayerSprite = (upgrades: Record<UpgradeId, number>) => {
  let row0 = '   W   ';
  let row1 = '  WEW  ';
  let row2 = ' WWWWW ';
  let row3 = ' W W W ';
  let row4 = ' T   T ';

  if (upgrades.homing_missiles > 0) row0 = ' R W R ';
  if (upgrades.twin_link > 0) row1 = ' CWEWC ';
  if (upgrades.max_hp > 0) row2 = 'AWAWAWA';
  if (upgrades.regen > 0) row3 = ' W P W ';
  if (upgrades.fire_rate > 0) row4 = ' T S T ';

  return [row0, row1, row2, row3, row4];
};

// --- INTERFACES ---
interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  markedForDeletion: boolean;
}

interface Enemy extends Entity {
  type:
    | 'meteor'
    | 'scout'
    | 'hunter'
    | 'juggernaut'
    | 'meteor_gold'
    | 'stealth'
    | 'sniper'
    | 'boss';
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  sprite: string[];
  gridSize?: number;
  shootCooldown?: number;
  aiState?: 'idle' | 'strafe' | 'evade' | 'enraged' | 'predictive_aim' | 'sweep';
  aiTimer?: number;
  targetX?: number;
  hitFlashTimer?: number;
  bossSpawnCooldown?: number;
}

interface Bullet extends Entity {
  vx: number;
  vy: number;
  isEnemy: boolean;
  color: string;
  isHoming?: boolean;
  isPlasma?: boolean;
  isLightning?: boolean;
  lightningTarget?: Enemy | null;
  lightningJumps?: number;
}

interface Item extends Entity {
  type: 'xp' | 'heart';
  vy: number;
  sprite: string[];
  xpValue?: number;
}

interface Particle extends Entity {
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  sizeMultiplier: number;
}

// RPG Upgrades
type GameState = 'START' | 'PLAYING' | 'GAME_OVER' | 'LEVEL_UP';

type UpgradeId =
  | 'twin_link'
  | 'fire_rate'
  | 'homing_missiles'
  | 'plasma_arc'
  | 'chain_lightning'
  | 'max_hp'
  | 'regen'
  | 'magnet'
  | 'shield';

interface Upgrade {
  id: UpgradeId;
  name: string;
  desc: string;
  icon: string;
  maxLevel: number;
}

const UPGRADES: Record<UpgradeId, Upgrade> = {
  twin_link: {
    id: 'twin_link',
    name: 'Zusatz-Pistole',
    desc: 'Fügt einen weiteren Laserstrahl hinzu.',
    icon: '🔫',
    maxLevel: 5,
  },
  fire_rate: {
    id: 'fire_rate',
    name: 'Schnellfeuer',
    desc: 'Erhöht die Feuerrate um 20%.',
    icon: '⚡',
    maxLevel: 5,
  },
  homing_missiles: {
    id: 'homing_missiles',
    name: 'Suchraketen',
    desc: 'Feuert automatisch Raketen auf nahe Gegner.',
    icon: '🚀',
    maxLevel: 5,
  },
  max_hp: {
    id: 'max_hp',
    name: 'Extra Herz',
    desc: 'Erhöht die maximale Lebensenergie um 1.',
    icon: '❤️',
    maxLevel: 10,
  },
  regen: {
    id: 'regen',
    name: 'Regeneration',
    desc: 'Heilt 1 Herz alle paar Sekunden.',
    icon: '⚕️',
    maxLevel: 3,
  },
  magnet: {
    id: 'magnet',
    name: 'XP-Magnet',
    desc: 'Zieht XP-Orbs in einem größeren Radius an.',
    icon: '🧲',
    maxLevel: 5,
  },
  shield: {
    id: 'shield',
    name: 'Energie-Schild',
    desc: 'Erzeugt ein Schild, das Treffer abfängt.',
    icon: '🛡️',
    maxLevel: 3,
  },
  plasma_arc: {
    id: 'plasma_arc',
    name: 'Plasma Flammen',
    desc: 'Ein extrem starker Feuerstrahl vor dem Schiff.',
    icon: '🔥',
    maxLevel: 3,
  },
  chain_lightning: {
    id: 'chain_lightning',
    name: 'Kettenblitz',
    desc: 'Blitze springen von Gegner zu Gegner.',
    icon: '⚡',
    maxLevel: 3,
  },
};

export default function VelocityVoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Core game states
  const scoreRef = useRef(0);
  const frameRef = useRef(0);

  const [gameState, setGameState] = useState<GameState>('START');
  const gameStateRef = useRef<GameState>('START');
  const [currentScore, setCurrentScore] = useState(0);
  const [metaCoins, setMetaCoins] = useState(0);
  const metaCoinsRef = useRef(0);
  const currentEventRef = useRef('');

  // Meta Shop State
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [metaUpgrades, setMetaUpgrades] = useState({
    start_hp: 0,
    start_shield: 0,
    coin_multiplier: 0,
  });
  const metaUpgradesRef = useRef({ start_hp: 0, start_shield: 0, coin_multiplier: 0 });
  const [highScore, setHighScore] = useState(0);
  const highScoreRef = useRef(0);

  // HUD States
  const [hudHp, setHudHp] = useState(3);
  const [hudMaxHp, setHudMaxHp] = useState(3);
  const [hudXp, setHudXp] = useState(0);
  const [hudMaxXp, setHudMaxXp] = useState(10);
  const [hudLevel, setHudLevel] = useState(1);
  const [upgradeChoices, setUpgradeChoices] = useState<Upgrade[]>([]);

  // Input
  const keys = useRef<{ [key: string]: boolean }>({});

  // Player RPG Stats
  const player = useRef({
    x: 0,
    y: 0,
    width: PLAYER_SPRITE_L1[0].length * CONFIG.PIXEL_SIZE,
    height: PLAYER_SPRITE_L1.length * CONFIG.PIXEL_SIZE,
    cooldown: 0,
    homingCooldown: 0,
    regenTimer: 0,

    // Stats
    hp: 3,
    maxHp: 3,
    xp: 0,
    maxXp: 10,
    level: 1,
    hitFlashTimer: 0,
    markedForDeletion: false,
    shieldHp: 0,
    shieldRegenTimer: 0,

    // Upgrade Levels
    upgrades: {
      twin_link: 0,
      fire_rate: 0,
      homing_missiles: 0,
      max_hp: 0,
      regen: 0,
      magnet: 0,
      shield: 0,
      plasma_arc: 0,
      chain_lightning: 0,
    } as Record<UpgradeId, number>,
  });

  // Entities
  const bullets = useRef<Bullet[]>([]);
  const enemies = useRef<Enemy[]>([]);
  const items = useRef<Item[]>([]);
  const particles = useRef<Particle[]>([]);

  const stars = useRef<{ x: number; y: number; speed: number; size: number; opacity: number }[]>(
    []
  );
  const planets = useRef<{ x: number; y: number; radius: number; color: string; speed: number }[]>(
    []
  );
  const screenFlash = useRef({ alpha: 0, color: '#fff' });
  const screenShake = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem('velocityVoidHighScore');
    if (saved) {
      const parsed = parseInt(saved, 10);
      setHighScore(parsed);
      highScoreRef.current = parsed;
    }
  }, []);

  const saveHighScore = (score: number) => {
    if (score > highScoreRef.current) {
      setHighScore(score);
      highScoreRef.current = score;
      localStorage.setItem('velocityVoidHighScore', Math.floor(score).toString());
    }
  };

  const triggerScreenFlash = (color: string) => {
    screenFlash.current = { alpha: 1, color };
    screenShake.current = 15;
  };

  const createExplosion = (
    x: number,
    y: number,
    c1: string,
    c2: string,
    count: number = CONFIG.PARTICLE_COUNT
  ) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8;
      particles.current.push({
        x,
        y,
        width: CONFIG.PIXEL_SIZE * (Math.random() > 0.5 ? 1 : 2),
        height: CONFIG.PIXEL_SIZE * (Math.random() > 0.5 ? 1 : 2),
        color: Math.random() > 0.5 ? c1 : c2,
        markedForDeletion: false,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 30 + 10,
        sizeMultiplier: 1.0,
      });
    }
  };

  const initGame = (canvas: HTMLCanvasElement) => {
    scoreRef.current = 0;
    frameRef.current = 0;
    // Don't auto play, start handles it
    // setGameState('PLAYING');
    // gameStateRef.current = 'PLAYING';
    setCurrentScore(0);
    bullets.current = [];
    enemies.current = [];
    items.current = [];
    particles.current = [];

    player.current = {
      x: canvas.width / 2 - (PLAYER_SPRITE_L1[0].length * CONFIG.PIXEL_SIZE) / 2,
      y: canvas.height - 120,
      width: PLAYER_SPRITE_L1[0].length * CONFIG.PIXEL_SIZE,
      height: PLAYER_SPRITE_L1.length * CONFIG.PIXEL_SIZE,
      cooldown: 0,
      homingCooldown: 0,
      regenTimer: 0,
      markedForDeletion: false,
      hp: 3,
      maxHp: 3,
      xp: 0,
      maxXp: 10,
      level: 1,
      hitFlashTimer: 0,
      shieldHp: 0,
      shieldRegenTimer: 0,
      upgrades: {
        twin_link: 0,
        fire_rate: 0,
        homing_missiles: 0,
        plasma_arc: 0,
        chain_lightning: 0,
        max_hp: 0,
        regen: 0,
        magnet: 0,
        shield: 0,
      },
    };

    setHudHp(3);
    setHudMaxHp(3);
    setHudXp(0);
    setHudMaxXp(10);
    setHudLevel(1);

    stars.current = Array.from({ length: 80 }).map(() => ({
      x: retroSnap(Math.random() * canvas.width),
      y: retroSnap(Math.random() * canvas.height),
      speed: (Math.floor(Math.random() * 3) + 1) * 0.3 + Math.random() * 0.2,
      size: Math.max(CONFIG.PIXEL_SIZE, CONFIG.PIXEL_SIZE * (Math.random() > 0.8 ? 2 : 1)),
      opacity: Math.random() * 0.5 + 0.1,
    }));

    planets.current = [
      {
        x: retroSnap(canvas.width * 0.2),
        y: -200,
        radius: retroSnap(100),
        color: '#2A1F1A',
        speed: 0.1,
      },
      {
        x: retroSnap(canvas.width * 0.8),
        y: canvas.height * 0.5,
        radius: retroSnap(40),
        color: '#3A2A20',
        speed: 0.2,
      },
    ];
  };

  // --- LEVEL UP LOGIC ---
  const triggerLevelUp = () => {
    gameStateRef.current = 'LEVEL_UP';
    setGameState('LEVEL_UP');

    // Pick 3 random available upgrades
    const available = Object.values(UPGRADES).filter(
      (u) => player.current.upgrades[u.id] < u.maxLevel
    );
    // Shuffle and pick 3
    const shuffled = available.sort(() => 0.5 - Math.random());
    setUpgradeChoices(shuffled.slice(0, 3));

    triggerScreenFlash(PALETTE.playerEye);
  };

  const applyUpgrade = (id: UpgradeId) => {
    player.current.upgrades[id]++;

    if (id === 'max_hp') {
      player.current.maxHp++;
      player.current.hp++; // Heal 1 on max hp up
      setHudMaxHp(player.current.maxHp);
      setHudHp(player.current.hp);
    }
    if (id === 'shield') {
      player.current.shieldHp = player.current.upgrades.shield; // refill to new max
    }

    // Carry over XP, increase max XP exponentially
    player.current.level++;
    player.current.xp = 0; // Or keep overflow: player.current.xp - player.current.maxXp
    player.current.maxXp = Math.floor(player.current.maxXp * 1.5) + 10;

    setHudLevel(player.current.level);
    setHudXp(player.current.xp);
    setHudMaxXp(player.current.maxXp);

    gameStateRef.current = 'PLAYING';
    setGameState('PLAYING');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
      if (gameStateRef.current !== 'GAME_OVER') {
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

    let touchStartX = 0,
      touchStartY = 0,
      pStartX = 0,
      pStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.target !== canvas || gameStateRef.current !== 'PLAYING') return;
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pStartX = player.current.x;
      pStartY = player.current.y;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.target !== canvas || gameStateRef.current !== 'PLAYING') return;
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      player.current.x = Math.max(
        10,
        Math.min(canvas.width - player.current.width - 10, pStartX + dx * 1.5)
      );
      player.current.y = Math.max(
        10,
        Math.min(canvas.height - player.current.height - 10, pStartY + dy * 1.5)
      );
    };
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    const triggerGameOver = () => {
      if (gameStateRef.current === 'GAME_OVER') return;
      gameStateRef.current = 'GAME_OVER';
      setGameState('GAME_OVER');
      setCurrentScore(scoreRef.current);
      saveHighScore(scoreRef.current);
      const p = player.current;
      createExplosion(p.x + p.width / 2, p.y + p.height / 2, PALETTE.playerLaser, '#fff', 80);
      triggerScreenFlash('#ff0000');
    };

    const handlePlayerHit = () => {
      if (player.current.shieldHp > 0) {
        player.current.shieldHp--;
        player.current.shieldRegenTimer = 0; // reset regen
        triggerScreenFlash('#00f0ff'); // cyan flash for shield hit
      } else {
        player.current.hp--;
        setHudHp(player.current.hp);
        triggerScreenFlash('#ff0000');
      }
      player.current.hitFlashTimer = 5;

      if (player.current.hp <= 0) {
        triggerGameOver();
      }
    };

    const checkCollision = (a: Entity, b: Entity, tolerance: number = 0.2) => {
      const aW = a.width * (1 - tolerance);
      const aH = a.height * (1 - tolerance);
      const aX = a.x + a.width * (tolerance / 2);
      const aY = a.y + a.height * (tolerance / 2);
      const bW = b.width * (1 - tolerance);
      const bH = b.height * (1 - tolerance);
      const bX = b.x + b.width * (tolerance / 2);
      const bY = b.y + b.height * (tolerance / 2);
      return aX < bX + bW && aX + aW > bX && aY < bY + bH && aY + aH > bY;
    };

    let animationId: number;
    let lastTime = 0;

    const loop = (timestamp: number) => {
      // Delta time could be used, but keeping frame-based for simplicity
      const isPlaying = gameStateRef.current === 'PLAYING';

      let shakeX = 0,
        shakeY = 0;
      if (screenShake.current > 0) {
        shakeX = (Math.random() - 0.5) * screenShake.current;
        shakeY = (Math.random() - 0.5) * screenShake.current;
        screenShake.current *= 0.8;
        if (screenShake.current < 0.5) screenShake.current = 0;
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Background
      // Biome Logic
      const p = player.current;
      const sector = Math.floor(p.level / 5) + 1;
      let bgColor = PALETTE.bg;
      if (sector === 2)
        bgColor = '#2a0a0a'; // Crimson Nebula
      else if (sector === 3)
        bgColor = '#051a05'; // Alien Ruins
      else if (sector >= 4) bgColor = '#0a0a2a'; // Cosmic Anomaly

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // We still draw background movement even if LEVEL_UP paused for cool effect
      const speedMultiplier = isPlaying ? Math.min(2.0, 1 + frameRef.current / 40000) : 0.1;

      // Planets & Stars
      planets.current.forEach((pl) => {
        pl.y += pl.speed * speedMultiplier;
        if (pl.y - pl.radius > canvas.height) {
          pl.y = -pl.radius - 50;
          pl.x = retroSnap(Math.random() * canvas.width);
        }
        ctx.beginPath();
        ctx.arc(retroSnap(pl.x), retroSnap(pl.y), pl.radius, 0, Math.PI * 2);
        ctx.fillStyle = pl.color;
        ctx.fill();
      });

      stars.current.forEach((star) => {
        star.y += star.speed * speedMultiplier;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = retroSnap(Math.random() * canvas.width);
        }
        ctx.fillStyle = PALETTE.star;
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(retroSnap(star.x), retroSnap(star.y), star.size, star.size);
      });
      ctx.globalAlpha = 1.0;

      if (isPlaying) {
        frameRef.current++;
        if (frameRef.current % 30 === 0) scoreRef.current += 1;

        // Shield Regen
        if (p.upgrades.shield > 0 && p.shieldHp < p.upgrades.shield) {
          p.shieldRegenTimer++;
          if (p.shieldRegenTimer > 600) {
            // 10 seconds without hit to regen 1 shield HP
            p.shieldHp++;
            p.shieldRegenTimer = 0;
            createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#00f0ff', '#fff', 15);
          }
        }
        // RPG Regen
        if (p.upgrades.regen > 0) {
          p.regenTimer++;
          // Regen 1 HP every (15 / regenLevel) seconds (assuming 60fps -> 900 frames)
          const regenFrames = Math.max(300, 900 - p.upgrades.regen * 150);
          if (p.regenTimer >= regenFrames) {
            p.regenTimer = 0;
            if (p.hp < p.maxHp) {
              p.hp++;
              setHudHp(p.hp);
              // Small green heal flash
              createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#0f0', '#fff', 10);
            }
          }
        }

        // Move Player
        if (keys.current['ArrowLeft'] || keys.current['KeyA']) p.x -= CONFIG.SHIP_SPEED;
        if (keys.current['ArrowRight'] || keys.current['KeyD']) p.x += CONFIG.SHIP_SPEED;
        if (keys.current['ArrowUp'] || keys.current['KeyW']) p.y -= CONFIG.SHIP_SPEED;
        if (keys.current['ArrowDown'] || keys.current['KeyS']) p.y += CONFIG.SHIP_SPEED;

        p.x = Math.max(10, Math.min(canvas.width - p.width - 10, p.x));
        p.y = Math.max(10, Math.min(canvas.height - p.height - 10, p.y));

        // Exhaust
        if (frameRef.current % 4 === 0) {
          particles.current.push({
            x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE / 2 + (Math.random() - 0.5) * 10,
            y: p.y + p.height,
            width: CONFIG.PIXEL_SIZE,
            height: CONFIG.PIXEL_SIZE,
            color: PALETTE.playerLaser,
            markedForDeletion: false,
            vx: Math.random() - 0.5,
            vy: Math.random() * 2 + 1,
            life: 0,
            maxLife: 8,
            sizeMultiplier: 1,
          });
        }

        // Auto-Shooting
        if (p.cooldown > 0) p.cooldown--;
        if (p.cooldown <= 0) {
          // RPG Fire Rate
          let fireRate = 20 - p.upgrades.fire_rate * 2.5;
          if (fireRate < 5) fireRate = 5;

          // RPG Twin Link (Multi-shot)
          const lasers = 1 + p.upgrades.twin_link;
          const spread = 8;

          for (let i = 0; i < lasers; i++) {
            // Calculate X offset so they are centered
            const offset = (i - (lasers - 1) / 2) * spread;
            // Calculate Vx spread slightly
            const vxOffset = (i - (lasers - 1) / 2) * 0.5;

            bullets.current.push({
              x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE / 2 + offset,
              y: p.y - 10,
              width: CONFIG.PIXEL_SIZE,
              height: CONFIG.PIXEL_SIZE * 3,
              color: PALETTE.playerLaser,
              markedForDeletion: false,
              vx: vxOffset,
              vy: -CONFIG.BULLET_SPEED,
              isEnemy: false,
            });
          }
          p.cooldown = fireRate;
        }

        // Auto Homing Missiles
        if (p.upgrades.homing_missiles > 0) {
          p.homingCooldown--;
          if (p.homingCooldown <= 0) {
            const count = p.upgrades.homing_missiles;
            for (let i = 0; i < count; i++) {
              bullets.current.push({
                x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE,
                y: p.y,
                width: CONFIG.PIXEL_SIZE * 2,
                height: CONFIG.PIXEL_SIZE * 4,
                color: '#00f0ff',
                markedForDeletion: false,
                vx: (Math.random() - 0.5) * 6,
                vy: -8,
                isEnemy: false,
                isHoming: true,
              });
            }
            p.homingCooldown = 120; // Every 2 seconds
          }
        }

        // Spawning System
        // Boss Logic
        const isBossLevel = p.level >= 10;
        const bossActive = enemies.current.some((e) => e.type === 'boss');
        const activeBots = enemies.current.filter((e) => !e.type.includes('meteor')).length;
        const hardCap = Math.min(6, 3 + Math.floor(p.level / 3));

        if (isBossLevel && !bossActive && p.level === 10) {
          // Spawn Boss!
          const bWidth = MOTHERSHIP_BOSS[0].length * CONFIG.PIXEL_SIZE;
          const bHeight = MOTHERSHIP_BOSS.length * CONFIG.PIXEL_SIZE;
          enemies.current.push({
            type: 'boss',
            x: canvas.width / 2 - bWidth / 2,
            y: -bHeight,
            width: bWidth,
            height: bHeight,
            markedForDeletion: false,
            vx: 1 * speedMultiplier,
            vy: 0.5 * speedMultiplier,
            hp: 1500,
            maxHp: 1500,
            sprite: MOTHERSHIP_BOSS,
            shootCooldown: 100,
            bossSpawnCooldown: 300,
            aiState: 'sweep',
            aiTimer: 0,
          });
        }

        // Slower base spawns
        const botRate = Math.max(400, 800 - p.level * 15);
        if (frameRef.current % botRate === 0 && !bossActive && activeBots < hardCap) {
          let type: 'scout' | 'hunter' | 'juggernaut' | 'stealth' | 'sniper' = 'scout';
          let r = Math.random();
          if (p.level >= 5) {
            if (r < 0.15) type = 'juggernaut';
            else if (r < 0.3) type = 'sniper';
            else if (r < 0.45) type = 'stealth';
            else if (r < 0.7) type = 'hunter';
          } else if (p.level >= 3) {
            if (r < 0.3) type = 'stealth';
            else if (r < 0.6) type = 'hunter';
          }

          let spr = CLAUDE_SCOUT;
          let hp = 4 + Math.floor(p.level * 0.5);
          let botVx = CONFIG.BASE_BOT_SPEED * speedMultiplier;
          let yPos = Math.random() * (canvas.height * 0.2) + 80;

          if (type === 'hunter') {
            spr = CLAUDE_HUNTER;
            hp = 8 + p.level;
            botVx = (CONFIG.BASE_BOT_SPEED + 0.5) * speedMultiplier;
          } else if (type === 'juggernaut') {
            spr = CLAUDE_JUGGERNAUT;
            hp = 25 + p.level * 3;
            botVx = 0.3 * speedMultiplier;
          } else if (type === 'stealth') {
            spr = CLAUDE_STEALTH;
            hp = 2 + Math.floor(p.level * 0.3);
            botVx = 2.0 * speedMultiplier;
          } else if (type === 'sniper') {
            spr = CLAUDE_SNIPER;
            hp = 10 + p.level;
            botVx = 0.5 * speedMultiplier;
            yPos = 40; // Stays at top
          }

          const eWidth = spr[0].length * CONFIG.PIXEL_SIZE;
          const eHeight = spr.length * CONFIG.PIXEL_SIZE;

          enemies.current.push({
            type,
            x: Math.random() > 0.5 ? -eWidth : canvas.width,
            y: yPos,
            width: eWidth,
            height: eHeight,
            markedForDeletion: false,
            vx: (Math.random() > 0.5 ? 1 : -1) * botVx,
            vy: 0,
            hp,
            maxHp: hp,
            sprite: spr,
            shootCooldown: type === 'sniper' ? 180 : Math.random() * 60 + 30,
            aiState: 'idle',
            aiTimer: Math.random() * 30 + 30,
            targetX: 0,
          });
        }

        const meteorRate =
          currentEventRef.current === 'METEOR_STORM' ? 30 : Math.max(500, 800 - p.level * 15);
        if (frameRef.current % meteorRate === 0 && !bossActive) {
          const gridSizes = [7, 9, 13];
          const gridSize = gridSizes[Math.floor(Math.random() * gridSizes.length)];
          const eWidth = gridSize * CONFIG.PIXEL_SIZE;
          const eHeight = gridSize * CONFIG.PIXEL_SIZE;
          enemies.current.push({
            type: 'meteor',
            x: Math.random() * (canvas.width - eWidth),
            y: -eHeight,
            width: eWidth,
            height: eHeight,
            markedForDeletion: false,
            vx: (Math.random() - 0.5) * 1 * speedMultiplier,
            vy: (CONFIG.BASE_METEOR_SPEED + Math.random() * 1.5) * speedMultiplier,
            hp: 3 + Math.floor(p.level / 2),
            maxHp: 3 + Math.floor(p.level / 2),
            sprite: generateMeteorSprite(gridSize, false),
            gridSize: gridSize,
          });
        }

        // Occasional Heart drops
        if (frameRef.current % 1800 === 0 && Math.random() > 0.5 && p.hp < p.maxHp) {
          items.current.push({
            type: 'heart',
            x: Math.random() * canvas.width,
            y: -50,
            width: ITEM_HEART[0].length * CONFIG.PIXEL_SIZE,
            height: ITEM_HEART.length * CONFIG.PIXEL_SIZE,
            markedForDeletion: false,
            vy: 1 * speedMultiplier,
            sprite: ITEM_HEART,
          });
        }

        // Process Enemies
        enemies.current.forEach((e) => {
          if (e.type !== 'meteor' && e.type !== 'meteor_gold') {
            e.aiTimer = (e.aiTimer || 0) - 1;
            if (e.type === 'boss') {
              if (e.y < 40) {
                e.y += e.vy;
              } else {
                e.y = 40;
                e.x += e.vx;
                if (e.x <= 0 || e.x + e.width >= canvas.width) e.vx *= -1;
              }

              if (e.bossSpawnCooldown !== undefined) {
                e.bossSpawnCooldown--;
                if (e.bossSpawnCooldown <= 0) {
                  // Spawn minions
                  const minionSpr = CLAUDE_SCOUT;
                  enemies.current.push({
                    type: 'scout',
                    x: e.x + e.width / 2,
                    y: e.y + e.height,
                    width: minionSpr[0].length * CONFIG.PIXEL_SIZE,
                    height: minionSpr.length * CONFIG.PIXEL_SIZE,
                    markedForDeletion: false,
                    vx: (Math.random() - 0.5) * 2,
                    vy: 1,
                    hp: 5,
                    maxHp: 5,
                    sprite: minionSpr,
                    aiState: 'idle',
                    aiTimer: 30,
                  });
                  e.bossSpawnCooldown = 300;
                }
              }
            }

            if (e.type === 'juggernaut' && e.hp < e.maxHp * 0.4 && e.aiState !== 'enraged') {
              e.aiState = 'enraged';
              e.vx = e.x < p.x ? 1.5 * speedMultiplier : -1.5 * speedMultiplier;
              e.sprite = CLAUDE_JUGGERNAUT.map((row) => row.replace(/J/g, 'R'));
            }

            if (e.aiState === 'enraged') {
              if (e.x + e.width / 2 < p.x + p.width / 2) e.x += 1.5 * speedMultiplier;
              else e.x -= 1.5 * speedMultiplier;
            }

            // Nerfed evasion
            if (e.type === 'scout' && e.aiState !== 'evade') {
              bullets.current.forEach((b) => {
                if (!b.isEnemy) {
                  const dist = Math.hypot(b.x - (e.x + e.width / 2), b.y - (e.y + e.height / 2));
                  if (dist < 80 && Math.random() > 0.95) {
                    // 5% chance
                    e.aiState = 'evade';
                    e.aiTimer = 15;
                    e.vx = (e.x > b.x ? 1 : -1) * 2 * speedMultiplier;
                  }
                }
              });
            }

            if (e.aiTimer <= 0) {
              if (e.aiState === 'evade') {
                e.aiState = 'idle';
                e.aiTimer = Math.random() * 60 + 30;
                e.vx = (Math.random() > 0.5 ? 1 : -1) * CONFIG.BASE_BOT_SPEED * speedMultiplier;
              } else if (e.aiState === 'idle') {
                e.aiState = 'strafe';
                e.aiTimer = Math.random() * 40 + 20;
              } else if (e.aiState === 'strafe') {
                e.aiState = 'idle';
                e.aiTimer = Math.random() * 60 + 30;
                if (e.type !== 'hunter') {
                  if (Math.random() > 0.5) e.vx *= -1;
                }
              }
            }

            if (
              e.type === 'scout' ||
              e.type === 'stealth' ||
              e.type === 'sniper' ||
              (e.type === 'juggernaut' && e.aiState !== 'enraged')
            ) {
              if (e.aiState !== 'idle') {
                e.x += e.vx;
                if (e.x <= 0 || e.x + e.width >= canvas.width) {
                  e.vx *= -1;
                  e.x = Math.max(0, Math.min(canvas.width - e.width, e.x));
                }
              }
            } else if (e.type === 'hunter') {
              const targetX = p.x;
              const diffX = targetX - e.x;
              if (Math.abs(diffX) > 20) {
                e.x += Math.sign(diffX) * 1.5 * speedMultiplier;
              }
            }

            // Enemy Shooting
            if (e.shootCooldown !== undefined) {
              e.shootCooldown--;
              if (e.shootCooldown <= 0) {
                if (e.type === 'juggernaut') {
                  for (let i = -1; i <= 1; i++) {
                    bullets.current.push({
                      x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                      y: e.y + e.height,
                      width: CONFIG.PIXEL_SIZE,
                      height: CONFIG.PIXEL_SIZE * 3,
                      color: PALETTE.enemyLaser,
                      markedForDeletion: false,
                      vx: i * 1.5,
                      vy: CONFIG.ENEMY_BULLET_SPEED * speedMultiplier,
                      isEnemy: true,
                    });
                  }
                  e.shootCooldown = e.aiState === 'enraged' ? 60 : 100;
                } else if (e.type === 'boss') {
                  for (let i = -2; i <= 2; i++) {
                    bullets.current.push({
                      x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                      y: e.y + e.height,
                      width: CONFIG.PIXEL_SIZE * 2,
                      height: CONFIG.PIXEL_SIZE * 4,
                      color: PALETTE.bossSecondary,
                      markedForDeletion: false,
                      vx: i * 2,
                      vy: CONFIG.ENEMY_BULLET_SPEED * 1.2 * speedMultiplier,
                      isEnemy: true,
                    });
                  }
                  e.shootCooldown = 150;
                } else if (e.type === 'sniper') {
                  bullets.current.push({
                    x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                    y: e.y + e.height,
                    width: CONFIG.PIXEL_SIZE,
                    height: CONFIG.PIXEL_SIZE * 6,
                    color: '#ff00ff',
                    markedForDeletion: false,
                    vx: 0,
                    vy: CONFIG.ENEMY_BULLET_SPEED * 3 * speedMultiplier,
                    isEnemy: true,
                  });
                  e.shootCooldown = 200;
                } else if (e.type === 'stealth') {
                  // Shoots rarely
                  if (Math.random() > 0.5) {
                    bullets.current.push({
                      x: e.x + e.width / 2,
                      y: e.y + e.height,
                      width: CONFIG.PIXEL_SIZE,
                      height: CONFIG.PIXEL_SIZE * 2,
                      color: PALETTE.enemyLaser,
                      markedForDeletion: false,
                      vx: 0,
                      vy: CONFIG.ENEMY_BULLET_SPEED * speedMultiplier,
                      isEnemy: true,
                    });
                  }
                  e.shootCooldown = 120;
                } else if (e.type === 'hunter') {
                  bullets.current.push({
                    x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                    y: e.y + e.height,
                    width: CONFIG.PIXEL_SIZE,
                    height: CONFIG.PIXEL_SIZE * 3,
                    color: PALETTE.enemyLaser,
                    markedForDeletion: false,
                    vx: 0,
                    vy: CONFIG.ENEMY_BULLET_SPEED * 1.5 * speedMultiplier,
                    isEnemy: true,
                  });
                  e.shootCooldown = 80;
                } else {
                  bullets.current.push({
                    x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                    y: e.y + e.height,
                    width: CONFIG.PIXEL_SIZE,
                    height: CONFIG.PIXEL_SIZE * 3,
                    color: PALETTE.enemyLaser,
                    markedForDeletion: false,
                    vx: 0,
                    vy: CONFIG.ENEMY_BULLET_SPEED * speedMultiplier,
                    isEnemy: true,
                  });
                  e.shootCooldown = 120;
                }
              }
            }
          } else {
            e.x += e.vx;
            e.y += e.vy;
          }

          if (e.y > canvas.height + 100) e.markedForDeletion = true;

          if (checkCollision(p, e, 0.3)) {
            handlePlayerHit();
            e.markedForDeletion = true;
            createExplosion(
              e.x + e.width / 2,
              e.y + e.height / 2,
              PALETTE.explosion1,
              PALETTE.explosion2,
              40
            );
          }
        });

        // Process Items & Magnet
        const magnetRadius = 80 + p.upgrades.magnet * 50;
        items.current.forEach((i) => {
          // Magnet pull for XP
          if (i.type === 'xp') {
            const dist = Math.hypot(
              p.x + p.width / 2 - (i.x + i.width / 2),
              p.y + p.height / 2 - (i.y + i.height / 2)
            );
            if (dist < magnetRadius) {
              // Pull towards player
              i.x += (p.x + p.width / 2 - (i.x + i.width / 2)) * 0.1;
              i.y += (p.y + p.height / 2 - (i.y + i.height / 2)) * 0.1;
            } else {
              i.y += i.vy;
            }
          } else {
            i.y += i.vy;
          }

          if (i.y > canvas.height + 50) i.markedForDeletion = true;

          if (checkCollision(p, i, 0.1)) {
            i.markedForDeletion = true;
            if (i.type === 'xp') {
              p.xp += i.xpValue || 10;
              if (p.xp >= p.maxXp) {
                triggerLevelUp();
              }
              setHudXp(p.xp);
              scoreRef.current += 10;
            } else if (i.type === 'heart') {
              if (p.hp < p.maxHp) {
                p.hp++;
                setHudHp(p.hp);
              }
              scoreRef.current += 50;
            }
            createExplosion(
              i.x,
              i.y,
              i.type === 'xp' ? PALETTE.itemWeapon : PALETTE.itemHeart,
              '#fff',
              20
            );
          }
        });

        // Process Bullets
        bullets.current.forEach((b) => {
          // Weapon logics
          if (
            b.isLightning &&
            !b.isEnemy &&
            b.lightningTarget &&
            !b.lightningTarget.markedForDeletion
          ) {
            const angle = Math.atan2(b.lightningTarget.y - b.y, b.lightningTarget.x - b.x);
            b.vx = Math.cos(angle) * 15;
            b.vy = Math.sin(angle) * 15;
            particles.current.push({
              x: b.x,
              y: b.y,
              width: CONFIG.PIXEL_SIZE,
              height: CONFIG.PIXEL_SIZE,
              color: '#fff',
              markedForDeletion: false,
              vx: 0,
              vy: 0,
              life: 0,
              maxLife: 5,
              sizeMultiplier: 1,
            });
          } else if (b.isHoming && !b.isEnemy) {
            let closest: Enemy | null = null;
            let minDist = 300;
            enemies.current.forEach((e) => {
              const dist = Math.hypot(e.x + e.width / 2 - b.x, e.y + e.height / 2 - b.y);
              if (dist < minDist) {
                minDist = dist;
                closest = e;
              }
            });
            if (closest) {
              // Steer bullet
              const angle = Math.atan2((closest as Enemy).y - b.y, (closest as Enemy).x - b.x);
              b.vx = Math.cos(angle) * 8;
              b.vy = Math.sin(angle) * 8;
            }
          }

          b.x += b.vx;
          b.y += b.vy;
          if (b.y < -50 || b.y > canvas.height + 50 || b.x < -50 || b.x > canvas.width + 50)
            b.markedForDeletion = true;

          if (b.isHoming && !b.markedForDeletion && Math.random() > 0.5) {
            particles.current.push({
              x: b.x + b.width / 2,
              y: b.y + b.height,
              width: CONFIG.PIXEL_SIZE,
              height: CONFIG.PIXEL_SIZE,
              color: '#ffaa00',
              markedForDeletion: false,
              vx: Math.random() - 0.5,
              vy: Math.random() * 2,
              life: 0,
              maxLife: 10,
              sizeMultiplier: 1,
            });
          }

          if (!b.isEnemy) {
            enemies.current.forEach((e) => {
              if (b.markedForDeletion || e.markedForDeletion) return;
              if (checkCollision(b, e, 0.1)) {
                if (!b.isPlasma) b.markedForDeletion = true;
                if (b.isLightning && b.lightningJumps && b.lightningJumps > 0) {
                  b.markedForDeletion = false;
                  b.lightningJumps--;
                  let closest = null;
                  let minDist = 200;
                  enemies.current.forEach((otherE) => {
                    if (otherE !== e) {
                      const dist = Math.hypot(otherE.x - b.x, otherE.y - b.y);
                      if (dist < minDist) {
                        minDist = dist;
                        closest = otherE;
                      }
                    }
                  });
                  b.lightningTarget = closest;
                }
                let dmg = 1;
                if (b.isHoming) dmg = 2;
                if (b.isPlasma) dmg = 3;
                if (b.isLightning) dmg = 1;
                e.hp -= dmg;
                e.hitFlashTimer = 3;

                if (e.hp <= 0) {
                  e.markedForDeletion = true;
                  const c1 = e.type.includes('meteor') ? PALETTE.meteorPrimary : PALETTE.botPrimary;
                  const c2 = e.type === 'meteor_gold' ? PALETTE.meteorGold : PALETTE.explosion2;
                  createExplosion(e.x + e.width / 2, e.y + e.height / 2, c1, c2, 30);

                  let dropXp = 5;
                  if (Math.random() < 0.2 || e.type === 'boss') {
                    const multiplier = 1 + metaUpgradesRef.current.coin_multiplier;
                    const coins = (e.type === 'boss' ? 50 : 1) * multiplier;
                    metaCoinsRef.current += coins;
                    setMetaCoins(metaCoinsRef.current);
                    localStorage.setItem('velocityVoidCoins', metaCoinsRef.current.toString());
                  }
                  if (e.type === 'boss') dropXp = 500;
                  else if (e.type === 'juggernaut') dropXp = 30;
                  else if (e.type === 'sniper') dropXp = 20;
                  else if (e.type === 'hunter') dropXp = 10;
                  else if (e.type === 'stealth' || e.type === 'scout') dropXp = 5;

                  if (e.type === 'boss') {
                    // Drop lots of hearts!
                    for (let i = 0; i < 5; i++) {
                      items.current.push({
                        type: 'heart',
                        x: e.x + Math.random() * e.width,
                        y: e.y + Math.random() * e.height,
                        width: ITEM_HEART[0].length * CONFIG.PIXEL_SIZE,
                        height: ITEM_HEART.length * CONFIG.PIXEL_SIZE,
                        markedForDeletion: false,
                        vy: 1 * speedMultiplier,
                        sprite: ITEM_HEART,
                      });
                    }
                  }

                  if (dropXp > 0) {
                    items.current.push({
                      type: 'xp',
                      x: e.x + e.width / 2,
                      y: e.y + e.height / 2,
                      width: 3 * CONFIG.PIXEL_SIZE,
                      height: 3 * CONFIG.PIXEL_SIZE,
                      markedForDeletion: false,
                      vy: 1 * speedMultiplier,
                      sprite: ITEM_XP,
                      xpValue: dropXp,
                    });
                  }
                } else {
                  createExplosion(b.x, b.y, '#fff', PALETTE.explosion1, 10);
                }
              }
            });
          } else {
            if (checkCollision(b, p, 0.3)) {
              b.markedForDeletion = true;
              handlePlayerHit();
            }
          }
        });

        // Process Particles
        particles.current.forEach((part) => {
          part.x += part.vx;
          part.y += part.vy;
          part.life++;
          if (part.life >= part.maxLife) part.markedForDeletion = true;
        });

        // Clean up
        bullets.current = bullets.current.filter((b) => !b.markedForDeletion);
        enemies.current = enemies.current.filter((e) => !e.markedForDeletion);
        items.current = items.current.filter((i) => !i.markedForDeletion);
        particles.current = particles.current.filter((p) => !p.markedForDeletion);
      } // end if isPlaying

      // Draw Enemies, Items, Bullets, Particles
      enemies.current.forEach((e) => {
        if (e.type.includes('meteor')) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = PALETTE.meteorPrimary;
        } else {
          ctx.shadowBlur = 15;
          ctx.shadowColor = PALETTE.botEye;
        }
        let overrideColor = undefined;
        if (e.hitFlashTimer && e.hitFlashTimer > 0) {
          overrideColor = '#ffffff';
          if (isPlaying) e.hitFlashTimer--;
        }
        drawSprite(ctx, e.sprite, e.x, e.y, CONFIG.PIXEL_SIZE, 1, overrideColor);
        ctx.shadowBlur = 0;
      });

      items.current.forEach((i) => {
        const glowColor = i.type === 'heart' ? PALETTE.itemHeart : PALETTE.itemWeapon;
        ctx.shadowBlur = 20;
        ctx.shadowColor = glowColor;
        drawSprite(ctx, i.sprite, i.x, i.y, CONFIG.PIXEL_SIZE);
        ctx.shadowBlur = 0;
      });

      bullets.current.forEach((b) => {
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillRect(retroSnap(b.x), retroSnap(b.y), b.width, b.height);
        ctx.shadowBlur = 0;
      });

      particles.current.forEach((part) => {
        ctx.fillStyle = part.color;
        ctx.globalAlpha = Math.max(0, 1 - part.life / part.maxLife);
        const scale = 1 - part.life / part.maxLife;
        ctx.fillRect(
          retroSnap(part.x),
          retroSnap(part.y),
          Math.max(1, retroSnap(part.width * scale)),
          Math.max(1, retroSnap(part.height * scale))
        );
      });
      ctx.globalAlpha = 1.0;

      // Draw Player
      if (gameStateRef.current !== 'GAME_OVER') {
        // Draw Magnet Aura
        if (p.upgrades.magnet > 0) {
          ctx.beginPath();
          ctx.arc(
            p.x + p.width / 2,
            p.y + p.height / 2,
            80 + p.upgrades.magnet * 50,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
          ctx.fill();
        }

        // Draw Energy Shield
        if (p.upgrades.shield > 0 && p.shieldHp > 0) {
          ctx.beginPath();
          ctx.arc(p.x + p.width / 2, p.y + p.height / 2 + 10, p.width * 0.8, Math.PI, 0);
          ctx.lineWidth = 4;
          const alpha = 0.3 + (p.shieldHp / p.upgrades.shield) * 0.5;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.stroke();
          // Draw inner glow
          ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.2})`;
          ctx.fill();
        }

        ctx.shadowBlur = 15;
        ctx.shadowColor = PALETTE.playerLaser;
        let pFlash = undefined;
        if (p.hitFlashTimer && p.hitFlashTimer > 0) {
          pFlash = '#ffffff';
          if (isPlaying) p.hitFlashTimer--;
        }
        drawSprite(ctx, getPlayerSprite(p.upgrades), p.x, p.y, CONFIG.PIXEL_SIZE, 1, pFlash);
        ctx.shadowBlur = 0;
      }

      // Flash
      if (screenFlash.current.alpha > 0) {
        ctx.fillStyle = screenFlash.current.color;
        ctx.globalAlpha = screenFlash.current.alpha;
        ctx.fillRect(-50, -50, canvas.width + 100, canvas.height + 100);
        ctx.globalAlpha = 1.0;
        if (isPlaying) screenFlash.current.alpha -= 0.05;
      }

      ctx.restore();

      // Draw HUD
      ctx.fillStyle = PALETTE.uiText;
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${Math.floor(scoreRef.current)}`, 20, 40);
      ctx.fillText(`LVL: ${p.level}`, 20, 70);

      // XP Bar
      const xpBarWidth = 150;
      const xpBarHeight = 10;
      ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.fillRect(20, 85, xpBarWidth, xpBarHeight);
      ctx.fillStyle = PALETTE.itemWeapon;
      ctx.fillRect(20, 85, (p.xp / Math.max(1, p.maxXp)) * xpBarWidth, xpBarHeight);

      // Boss Health Bar
      const activeBoss = enemies.current.find((e) => e.type === 'boss');
      if (activeBoss) {
        const barW = 500;
        const barH = 20;
        const barX = canvas.width / 2 - barW / 2;
        const barY = 30;

        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ff0000';
        ctx.strokeRect(barX - 2, barY - 2, barW + 4, barH + 4);

        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(barX, barY, barW, barH);

        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff0000';
        ctx.fillRect(barX, barY, (Math.max(0, activeBoss.hp) / activeBoss.maxHp) * barW, barH);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('WARNING: MOTHERSHIP', canvas.width / 2, 20);
        ctx.textAlign = 'left';
      }
      ctx.textAlign = 'left';

      // Hearts
      ctx.fillStyle = PALETTE.itemHeart;
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`HP: ${p.hp}/${p.maxHp}`, 20, 115);
      for (let i = 0; i < p.maxHp; i++) {
        const sprite = i < p.hp ? ITEM_HEART : ITEM_HEART_EMPTY;
        drawSprite(ctx, sprite, 20 + i * 35, 125, 4);
      }

      // Shield UI
      if (p.upgrades.shield > 0) {
        ctx.fillStyle = '#00f0ff';
        ctx.fillText(`SHIELD: ${p.shieldHp}/${p.upgrades.shield}`, 20, 165);
        for (let i = 0; i < p.upgrades.shield; i++) {
          ctx.globalAlpha = i < p.shieldHp ? 1.0 : 0.3;
          drawSprite(ctx, ITEM_SHIELD_ICON, 20 + i * 35, 175, 4, 1, '#00f0ff');
        }
        ctx.globalAlpha = 1.0;
      }

      if (currentEventRef.current === 'METEOR_STORM') {
        ctx.fillStyle = '#ff5500';
        ctx.textAlign = 'center';
        ctx.font = 'bold 30px monospace';
        ctx.fillText('WARNING: METEOR STORM', canvas.width / 2, 80);
        ctx.textAlign = 'left';
      }

      ctx.fillStyle = PALETTE.itemWeapon;
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`COINS: ${metaCoinsRef.current}`, 20, 220);

      const sectorStr = `SECTOR ${Math.floor(p.level / 5) + 1}`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'right';
      ctx.fillText(sectorStr, canvas.width - 20, 70);
      ctx.textAlign = 'left';

      ctx.textAlign = 'right';
      ctx.fillStyle = PALETTE.uiText;
      ctx.fillText(
        `HI-SCORE: ${Math.max(highScoreRef.current, Math.floor(scoreRef.current))}`,
        canvas.width - 20,
        40
      );

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: PALETTE.bg }}>
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {gameState === 'START' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-30"
          style={{ backgroundColor: 'rgba(22, 19, 17, 0.95)' }}
        >
          <h1 className="text-6xl font-black tracking-widest mb-4 text-center font-mono text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
            VELOCITY VOID
          </h1>
          <p className="text-xl font-mono mb-8 text-center text-gray-300">
            Coday Coins: <span className="text-yellow-400">{metaCoinsRef.current}</span>
          </p>

          <div className="flex gap-4 mb-12">
            <button
              onClick={() => {
                gameStateRef.current = 'PLAYING';
                setGameState('PLAYING');
              }}
              className="px-10 py-4 border-2 bg-cyan-900/40 hover:bg-cyan-800 transition-all font-mono tracking-widest uppercase text-xl"
              style={{
                borderColor: PALETTE.playerEye,
                color: PALETTE.playerEye,
                boxShadow: `4px 4px 0px ${PALETTE.playerEye}`,
              }}
            >
              LAUNCH MISSION
            </button>
          </div>

          <div className="border border-gray-700 p-6 max-w-2xl text-center text-gray-400 font-mono text-sm">
            <h3 className="text-lg text-white mb-2">ROGUE-LITE SHOP</h3>
            <button
              onClick={() => setIsShopOpen(true)}
              className="mt-4 px-6 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400/20 transition-all uppercase tracking-widest"
            >
              OPEN SHOP
            </button>
          </div>
        </div>
      )}

      {/* SHOP MODAL */}
      <AnimatePresence>
        {isShopOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          >
            <div className="border border-cyan-500 bg-gray-900 p-8 max-w-2xl w-full text-white font-mono relative">
              <button
                onClick={() => setIsShopOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-3xl text-cyan-400 mb-6 text-center tracking-widest">ARMORY</h2>
              <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                <span>AVAILABLE FUNDS:</span>
                <span className="text-yellow-400 text-2xl">{metaCoins} COINS</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-800 p-4 border border-gray-700">
                  <div>
                    <div className="text-xl text-green-400">HULL REINFORCEMENT</div>
                    <div className="text-sm text-gray-400">
                      +1 Max HP permanently. Current: +{metaUpgrades.start_hp}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const cost = 50 + metaUpgrades.start_hp * 50;
                      if (metaCoins >= cost && metaUpgrades.start_hp < 5) {
                        const newCoins = metaCoins - cost;
                        const newUps = { ...metaUpgrades, start_hp: metaUpgrades.start_hp + 1 };
                        setMetaCoins(newCoins);
                        metaCoinsRef.current = newCoins;
                        setMetaUpgrades(newUps);
                        metaUpgradesRef.current = newUps;
                        localStorage.setItem('velocityVoidCoins', newCoins.toString());
                        localStorage.setItem('velocityVoidMeta', JSON.stringify(newUps));
                      }
                    }}
                    disabled={
                      metaCoins < 50 + metaUpgrades.start_hp * 50 || metaUpgrades.start_hp >= 5
                    }
                    className="px-4 py-2 bg-green-900/50 border border-green-500 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {metaUpgrades.start_hp >= 5
                      ? 'MAX'
                      : `BUY (${50 + metaUpgrades.start_hp * 50})`}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-gray-800 p-4 border border-gray-700">
                  <div>
                    <div className="text-xl text-cyan-400">DEFLECTOR MATRIX</div>
                    <div className="text-sm text-gray-400">
                      +1 Starting Shield permanently. Current: +{metaUpgrades.start_shield}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const cost = 100 + metaUpgrades.start_shield * 100;
                      if (metaCoins >= cost && metaUpgrades.start_shield < 3) {
                        const newCoins = metaCoins - cost;
                        const newUps = {
                          ...metaUpgrades,
                          start_shield: metaUpgrades.start_shield + 1,
                        };
                        setMetaCoins(newCoins);
                        metaCoinsRef.current = newCoins;
                        setMetaUpgrades(newUps);
                        metaUpgradesRef.current = newUps;
                        localStorage.setItem('velocityVoidCoins', newCoins.toString());
                        localStorage.setItem('velocityVoidMeta', JSON.stringify(newUps));
                      }
                    }}
                    disabled={
                      metaCoins < 100 + metaUpgrades.start_shield * 100 ||
                      metaUpgrades.start_shield >= 3
                    }
                    className="px-4 py-2 bg-cyan-900/50 border border-cyan-500 hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {metaUpgrades.start_shield >= 3
                      ? 'MAX'
                      : `BUY (${100 + metaUpgrades.start_shield * 100})`}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-gray-800 p-4 border border-gray-700">
                  <div>
                    <div className="text-xl text-yellow-400">COIN MAGNET</div>
                    <div className="text-sm text-gray-400">
                      +100% Coin Drop Value. Current: +{metaUpgrades.coin_multiplier * 100}%
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const cost = 200 + metaUpgrades.coin_multiplier * 200;
                      if (metaCoins >= cost && metaUpgrades.coin_multiplier < 5) {
                        const newCoins = metaCoins - cost;
                        const newUps = {
                          ...metaUpgrades,
                          coin_multiplier: metaUpgrades.coin_multiplier + 1,
                        };
                        setMetaCoins(newCoins);
                        metaCoinsRef.current = newCoins;
                        setMetaUpgrades(newUps);
                        metaUpgradesRef.current = newUps;
                        localStorage.setItem('velocityVoidCoins', newCoins.toString());
                        localStorage.setItem('velocityVoidMeta', JSON.stringify(newUps));
                      }
                    }}
                    disabled={
                      metaCoins < 200 + metaUpgrades.coin_multiplier * 200 ||
                      metaUpgrades.coin_multiplier >= 5
                    }
                    className="px-4 py-2 bg-yellow-900/50 border border-yellow-500 hover:bg-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {metaUpgrades.coin_multiplier >= 5
                      ? 'MAX'
                      : `BUY (${200 + metaUpgrades.coin_multiplier * 200})`}
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'LEVEL_UP' && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(22, 19, 17, 0.7)' }}
          >
            <h2 className="text-5xl font-black tracking-widest mb-8 text-center font-mono text-cyan-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
              LEVEL UP!
            </h2>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl px-4">
              {upgradeChoices.map((u, idx) => (
                <button
                  key={idx}
                  onClick={() => applyUpgrade(u.id)}
                  className="flex-1 flex flex-col items-center justify-center p-6 border-2 bg-black/50 hover:bg-cyan-900/40 transition-all group"
                  style={{ borderColor: PALETTE.playerLaser }}
                >
                  <span className="text-4xl mb-4 group-hover:scale-125 transition-transform">
                    {u.icon}
                  </span>
                  <h3 className="text-xl font-bold font-mono text-white mb-2 text-center">
                    {u.name}
                  </h3>
                  <p className="text-sm text-gray-300 font-mono text-center mb-4">{u.desc}</p>
                  <div className="text-xs text-cyan-400 font-mono">
                    LVL {player.current.upgrades[u.id]} / {u.maxLevel}
                  </div>
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {gameState === 'GAME_OVER' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ backgroundColor: 'rgba(22, 19, 17, 0.85)' }}
        >
          <h2
            className="text-4xl md:text-6xl font-black tracking-widest mb-4 text-center font-mono"
            style={{ color: PALETTE.botEye, textShadow: `0 0 20px ${PALETTE.botEye}` }}
          >
            SYSTEM FAILURE
          </h2>
          <p className="text-xl font-mono mb-2 text-center" style={{ color: PALETTE.playerLaser }}>
            SCORE: {Math.floor(currentScore)}
          </p>
          <p className="text-lg font-mono mb-12 text-center" style={{ color: PALETTE.uiText }}>
            BEST: {Math.max(highScore, Math.floor(currentScore))}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 border-2 transition-all font-mono tracking-widest uppercase text-sm rounded-none"
            style={{
              borderColor: PALETTE.botEye,
              color: PALETTE.botEye,
              boxShadow: `4px 4px 0px ${PALETTE.botEye}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = PALETTE.botEye;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = PALETTE.botEye;
            }}
          >
            REBOOT SYSTEM
          </button>
        </div>
      )}
    </div>
  );
}
