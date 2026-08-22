/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import {
  Crosshair,
  Lightning,
  Rocket,
  Heart,
  Sparkle,
  Magnet,
  ShieldCheck,
  Flame,
  Trophy,
  Coins,
  ArrowClockwise,
  ShoppingBag,
  X,
  Play,
} from '@phosphor-icons/react/dist/ssr';

// --- CONFIGURATION ---
const CONFIG = {
  SHIP_SPEED: 7,
  BULLET_SPEED: 22,
  ENEMY_BULLET_SPEED: 5,
  BASE_METEOR_SPEED: 0.3,
  BASE_BOT_SPEED: 0.3,
  PIXEL_SIZE: 5,
  PARTICLE_COUNT: 25,
};

// --- ARCHITECTURAL CYBER COSMOS LIGHT PALETTE ---
const PALETTE = {
  bg: '#FAFAFA',
  grid: 'rgba(37, 99, 235, 0.05)',
  star: '#94A3B8',
  starGlow: '#CBD5E1',

  // Player Cyber Ship (Coday Blue Core & Sky Blue Sensor)
  player: '#2563EB',
  playerHull: '#0F172A',
  playerEye: '#38BDF8',
  thruster: '#3B82F6',
  playerLaser: '#2563EB',

  // Hostile Enemy Bots (Slate/Anthrazit with Crimson Scanner)
  botPrimary: '#334155',
  botHunter: '#1E293B',
  botJuggernaut: '#0F172A',
  botSniper: '#475569',
  botStealth: '#64748B',
  bossPrimary: '#0F172A',
  bossSecondary: '#1E293B',

  botSecondary: '#D97706',
  botEye: '#E11D48',
  enemyLaser: '#E11D48',

  // Obstacles & Pickups
  meteorPrimary: '#94A3B8',
  meteorSecondary: '#64748B',
  meteorGold: '#D97706',
  itemWeapon: '#2563EB',
  itemShield: '#10B981',
  itemHeart: '#E11D48',

  // Visual Kinetic Particle Feedback
  explosion1: '#2563EB',
  explosion2: '#D97706',
  uiText: '#0F172A',
  uiBorder: '#E2E8F0',
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
        else if (char === 'R') ctx.fillStyle = PALETTE.botEye;
        else if (char === 'M') ctx.fillStyle = PALETTE.meteorPrimary;
        else if (char === 'D') ctx.fillStyle = PALETTE.meteorSecondary;
        else if (char === 'C') ctx.fillStyle = PALETTE.itemWeapon;
        else if (char === 'A')
          ctx.fillStyle = '#64748B'; // Armor
        else if (char === 'P')
          ctx.fillStyle = '#10B981'; // Regen
        else if (char === 'S')
          ctx.fillStyle = '#2563EB'; // Speed
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
  isCross?: boolean;
}

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
  icon: React.ElementType;
  maxLevel: number;
}

const UPGRADES: Record<UpgradeId, Upgrade> = {
  twin_link: {
    id: 'twin_link',
    name: 'Dual-Laser Matrix',
    desc: 'Fügt einen zusätzlichen Coday-Laserstrahl hinzu.',
    icon: Crosshair,
    maxLevel: 5,
  },
  fire_rate: {
    id: 'fire_rate',
    name: 'Highspeed Taktung',
    desc: 'Erhöht die Feuerrate um 20% für maximale DPS.',
    icon: Lightning,
    maxLevel: 5,
  },
  homing_missiles: {
    id: 'homing_missiles',
    name: 'Autonome Drohnen',
    desc: 'Feuert automatisch Zielsuch-Geschosse auf nahe Bots.',
    icon: Rocket,
    maxLevel: 5,
  },
  max_hp: {
    id: 'max_hp',
    name: 'Rumpf-Verstärkung',
    desc: 'Erhöht die maximale Integrität um +1 Herz.',
    icon: Heart,
    maxLevel: 10,
  },
  regen: {
    id: 'regen',
    name: 'Auto-Reparatur',
    desc: 'Regeneriert Hüllen-Integrität in Intervallen.',
    icon: Sparkle,
    maxLevel: 3,
  },
  magnet: {
    id: 'magnet',
    name: 'Daten-Magnet',
    desc: 'Zieht XP- und Performance-Orbs aus größerer Distanz an.',
    icon: Magnet,
    maxLevel: 5,
  },
  shield: {
    id: 'shield',
    name: 'Edge Deflektor',
    desc: 'Projiziert einen regenerativen Schutzschild.',
    icon: ShieldCheck,
    maxLevel: 3,
  },
  plasma_arc: {
    id: 'plasma_arc',
    name: 'Plasma-Konverter',
    desc: 'Konzentrierter Energiestrahl im Frontalbereich.',
    icon: Flame,
    maxLevel: 3,
  },
  chain_lightning: {
    id: 'chain_lightning',
    name: 'Ketten-Impuls',
    desc: 'Spannungsbögen springen zwischen gegnerischen Bots über.',
    icon: Lightning,
    maxLevel: 3,
  },
};

interface UpgradeChoice extends Upgrade {
  currentLevel: number;
}

export default function VelocityVoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Core game states
  const scoreRef = useRef(0);
  const frameRef = useRef(0);

  const [gameState, setGameState] = useState<GameState>('START');
  const gameStateRef = useRef<GameState>('START');
  const [currentScore, setCurrentScore] = useState(0);
  const [metaCoins, setMetaCoins] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('velocityVoidCoins');
      return saved ? parseInt(saved, 10) : 0;
    } catch (_e) {
      return 0;
    }
  });
  const metaCoinsRef = useRef(metaCoins);
  const currentEventRef = useRef('');

  // Meta Shop State
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [metaUpgrades, setMetaUpgrades] = useState(() => {
    if (typeof window === 'undefined') return { start_hp: 0, start_shield: 0, coin_multiplier: 0 };
    try {
      const saved = localStorage.getItem('velocityVoidMeta');
      return saved ? JSON.parse(saved) : { start_hp: 0, start_shield: 0, coin_multiplier: 0 };
    } catch (_e) {
      return { start_hp: 0, start_shield: 0, coin_multiplier: 0 };
    }
  });
  const metaUpgradesRef = useRef(metaUpgrades);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('velocityVoidHighScore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (_e) {
      return 0;
    }
  });
  const highScoreRef = useRef(highScore);

  // HUD States
  const [hudHp, setHudHp] = useState(3);
  const [hudMaxHp, setHudMaxHp] = useState(3);
  const [hudXp, setHudXp] = useState(0);
  const [hudMaxXp, setHudMaxXp] = useState(10);
  const [hudLevel, setHudLevel] = useState(1);
  const [upgradeChoices, setUpgradeChoices] = useState<UpgradeChoice[]>([]);

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
    plasmaCooldown: 0,
    lightningCooldown: 0,
    regenTimer: 0,

    hp: 3,
    maxHp: 3,
    xp: 0,
    maxXp: 10,
    level: 1,
    hitFlashTimer: 0,
    markedForDeletion: false,
    shieldHp: 0,
    shieldRegenTimer: 0,

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
  const screenFlash = useRef({ alpha: 0, color: '#fff' });
  const screenShake = useRef(0);

  const saveHighScore = (score: number) => {
    if (score > highScoreRef.current) {
      setHighScore(score);
      highScoreRef.current = score;
      try {
        localStorage.setItem('velocityVoidHighScore', Math.floor(score).toString());
      } catch (_e) {
        // Safe storage access
      }
    }
  };

  const triggerScreenFlash = (color: string) => {
    screenFlash.current = { alpha: 0.6, color };
    screenShake.current = 10;
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
      const speed = Math.random() * 7;
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
        maxLife: Math.random() * 26 + 10,
        sizeMultiplier: 1.0,
      });
    }
  };

  const triggerLevelUp = () => {
    gameStateRef.current = 'LEVEL_UP';
    setGameState('LEVEL_UP');

    const available: UpgradeChoice[] = Object.values(UPGRADES)
      .filter((u) => player.current.upgrades[u.id] < u.maxLevel)
      .map((u) => ({
        ...u,
        currentLevel: player.current.upgrades[u.id],
      }));
    const shuffled = available.sort(() => 0.5 - Math.random());
    setUpgradeChoices(shuffled.slice(0, 3));

    triggerScreenFlash(PALETTE.player);
  };

  const initGame = (canvas: HTMLCanvasElement) => {
    scoreRef.current = 0;
    frameRef.current = 0;
    setCurrentScore(0);
    bullets.current = [];
    enemies.current = [];
    items.current = [];
    particles.current = [];

    const startingHp = 3 + metaUpgradesRef.current.start_hp;
    const startingShield = metaUpgradesRef.current.start_shield;

    player.current = {
      x: canvas.width / 2 - (PLAYER_SPRITE_L1[0].length * CONFIG.PIXEL_SIZE) / 2,
      y: canvas.height - 120,
      width: PLAYER_SPRITE_L1[0].length * CONFIG.PIXEL_SIZE,
      height: PLAYER_SPRITE_L1.length * CONFIG.PIXEL_SIZE,
      cooldown: 0,
      homingCooldown: 0,
      plasmaCooldown: 0,
      lightningCooldown: 0,
      regenTimer: 0,
      markedForDeletion: false,
      hp: startingHp,
      maxHp: startingHp,
      xp: 0,
      maxXp: 10,
      level: 1,
      hitFlashTimer: 0,
      shieldHp: startingShield,
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
        shield: startingShield,
      },
    };

    setHudHp(startingHp);
    setHudMaxHp(startingHp);
    setHudXp(0);
    setHudMaxXp(10);
    setHudLevel(1);

    stars.current = Array.from({ length: 60 }).map(() => ({
      x: retroSnap(Math.random() * canvas.width),
      y: retroSnap(Math.random() * canvas.height),
      speed: (Math.floor(Math.random() * 3) + 1) * 0.35,
      size: Math.max(CONFIG.PIXEL_SIZE, CONFIG.PIXEL_SIZE * (Math.random() > 0.8 ? 2 : 1)),
      opacity: Math.random() * 0.4 + 0.2,
    }));
  };

  const applyUpgrade = (id: UpgradeId) => {
    player.current.upgrades[id]++;

    if (id === 'max_hp') {
      player.current.maxHp++;
      player.current.hp++;
      setHudMaxHp(player.current.maxHp);
      setHudHp(player.current.hp);
    }
    if (id === 'shield') {
      player.current.shieldHp = player.current.upgrades.shield;
    }

    player.current.level++;
    player.current.xp = 0;
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

    // Smooth Touch Dragging for Mobile
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
        Math.min(canvas.width - player.current.width - 10, pStartX + dx * 1.3)
      );
      player.current.y = Math.max(
        10,
        Math.min(canvas.height - player.current.height - 10, pStartY + dy * 1.3)
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
      createExplosion(p.x + p.width / 2, p.y + p.height / 2, PALETTE.playerLaser, '#2563EB', 70);
      triggerScreenFlash('#E11D48');
    };

    const handlePlayerHit = () => {
      if (player.current.shieldHp > 0) {
        player.current.shieldHp--;
        player.current.shieldRegenTimer = 0;
        triggerScreenFlash('#10B981');
      } else {
        player.current.hp--;
        setHudHp(player.current.hp);
        triggerScreenFlash('#E11D48');
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

    const loop = () => {
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

      // Clean Light Stage Background
      ctx.fillStyle = PALETTE.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle CAD Blueprint Floor Grid
      const gridSize = 48;
      ctx.strokeStyle = PALETTE.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      const speedMultiplier = isPlaying ? Math.min(2.0, 1 + frameRef.current / 40000) : 0.1;

      // Slate Data Stars
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

        const p = player.current;

        // Shield Regen
        if (p.upgrades.shield > 0 && p.shieldHp < p.upgrades.shield) {
          p.shieldRegenTimer++;
          if (p.shieldRegenTimer > 600) {
            p.shieldHp++;
            p.shieldRegenTimer = 0;
            createExplosion(p.x + p.width / 2, p.y + p.height / 2, '#10B981', '#2563EB', 12);
          }
        }

        // Auto Repair Regen
        if (p.upgrades.regen > 0) {
          p.regenTimer++;
          const regenFrames = Math.max(300, 900 - p.upgrades.regen * 150);
          if (p.regenTimer >= regenFrames) {
            p.regenTimer = 0;
            if (p.hp < p.maxHp) {
              p.hp++;
              setHudHp(p.hp);
            }
          }
        }

        // Move Player (Keyboard Desktop)
        if (keys.current['ArrowLeft'] || keys.current['KeyA']) p.x -= CONFIG.SHIP_SPEED;
        if (keys.current['ArrowRight'] || keys.current['KeyD']) p.x += CONFIG.SHIP_SPEED;
        if (keys.current['ArrowUp'] || keys.current['KeyW']) p.y -= CONFIG.SHIP_SPEED;
        if (keys.current['ArrowDown'] || keys.current['KeyS']) p.y += CONFIG.SHIP_SPEED;

        p.x = Math.max(10, Math.min(canvas.width - p.width - 10, p.x));
        p.y = Math.max(10, Math.min(canvas.height - p.height - 10, p.y));

        // Thruster Particle Exhaust
        if (frameRef.current % 3 === 0) {
          particles.current.push({
            x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE / 2 + (Math.random() - 0.5) * 8,
            y: p.y + p.height,
            width: CONFIG.PIXEL_SIZE,
            height: CONFIG.PIXEL_SIZE,
            color: PALETTE.thruster,
            markedForDeletion: false,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 2 + 1.5,
            life: 0,
            maxLife: 9,
            sizeMultiplier: 1,
          });
        }

        // Auto-Shooting Lasers
        if (p.cooldown > 0) p.cooldown--;
        if (p.cooldown <= 0) {
          let fireRate = 18 - p.upgrades.fire_rate * 2.2;
          if (fireRate < 5) fireRate = 5;

          const lasers = 1 + p.upgrades.twin_link;
          const spread = 8;

          for (let i = 0; i < lasers; i++) {
            const offset = (i - (lasers - 1) / 2) * spread;
            const vxOffset = (i - (lasers - 1) / 2) * 0.4;

            bullets.current.push({
              x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE / 2 + offset,
              y: p.y - 8,
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

        // Homing Missiles
        if (p.upgrades.homing_missiles > 0) {
          p.homingCooldown--;
          if (p.homingCooldown <= 0) {
            const count = p.upgrades.homing_missiles;
            for (let i = 0; i < count; i++) {
              bullets.current.push({
                x: p.x + p.width / 2 - CONFIG.PIXEL_SIZE,
                y: p.y,
                width: CONFIG.PIXEL_SIZE * 1.5,
                height: CONFIG.PIXEL_SIZE * 2,
                color: '#E11D48',
                markedForDeletion: false,
                vx: (Math.random() - 0.5) * 4,
                vy: -8,
                isEnemy: false,
                isHoming: true,
              });
            }
            p.homingCooldown = 65;
          }
        }

        // Enemy Spawner Logic
        const spawnInterval = Math.max(35, 95 - Math.floor(frameRef.current / 400));
        if (frameRef.current % spawnInterval === 0) {
          const rand = Math.random();
          const sector = Math.floor(p.level / 5) + 1;

          if (rand < 0.35) {
            const isGold = Math.random() < 0.15;
            const gSize = 5;
            enemies.current.push({
              x: Math.random() * (canvas.width - gSize * CONFIG.PIXEL_SIZE - 20) + 10,
              y: -50,
              width: gSize * CONFIG.PIXEL_SIZE,
              height: gSize * CONFIG.PIXEL_SIZE,
              vx: (Math.random() - 0.5) * 0.4,
              vy: CONFIG.BASE_METEOR_SPEED + Math.random() * 0.3,
              hp: isGold ? 4 : 2,
              maxHp: isGold ? 4 : 2,
              type: isGold ? 'meteor_gold' : 'meteor',
              sprite: generateMeteorSprite(gSize, isGold),
              gridSize: gSize,
              markedForDeletion: false,
            });
          } else if (rand < 0.65) {
            enemies.current.push({
              x: Math.random() * (canvas.width - 60) + 20,
              y: -40,
              width: CLAUDE_SCOUT[0].length * CONFIG.PIXEL_SIZE,
              height: CLAUDE_SCOUT.length * CONFIG.PIXEL_SIZE,
              vx: (Math.random() - 0.5) * 1.2,
              vy: CONFIG.BASE_BOT_SPEED + 0.4,
              hp: 3,
              maxHp: 3,
              type: 'scout',
              sprite: CLAUDE_SCOUT,
              markedForDeletion: false,
              shootCooldown: Math.floor(Math.random() * 70) + 60,
            });
          } else if (rand < 0.85) {
            enemies.current.push({
              x: Math.random() * (canvas.width - 60) + 20,
              y: -40,
              width: CLAUDE_HUNTER[0].length * CONFIG.PIXEL_SIZE,
              height: CLAUDE_HUNTER.length * CONFIG.PIXEL_SIZE,
              vx: 0,
              vy: CONFIG.BASE_BOT_SPEED + 0.2,
              hp: 5,
              maxHp: 5,
              type: 'hunter',
              sprite: CLAUDE_HUNTER,
              markedForDeletion: false,
              shootCooldown: 80,
            });
          } else if (sector >= 2) {
            enemies.current.push({
              x: Math.random() * (canvas.width - 80) + 30,
              y: -60,
              width: CLAUDE_JUGGERNAUT[0].length * CONFIG.PIXEL_SIZE,
              height: CLAUDE_JUGGERNAUT.length * CONFIG.PIXEL_SIZE,
              vx: (Math.random() - 0.5) * 0.3,
              vy: CONFIG.BASE_BOT_SPEED * 0.8,
              hp: 12,
              maxHp: 12,
              type: 'juggernaut',
              sprite: CLAUDE_JUGGERNAUT,
              markedForDeletion: false,
              shootCooldown: 90,
            });
          }
        }
      }

      // Update & Draw Bullets
      bullets.current.forEach((b) => {
        if (isPlaying) {
          if (b.isHoming) {
            let closestEnemy: Enemy | null = null;
            let minDist = 500;
            enemies.current.forEach((e) => {
              const d = Math.hypot(e.x - b.x, e.y - b.y);
              if (d < minDist) {
                minDist = d;
                closestEnemy = e;
              }
            });
            if (closestEnemy) {
              const angle = Math.atan2(
                (closestEnemy as Enemy).y - b.y,
                (closestEnemy as Enemy).x - b.x
              );
              b.vx += Math.cos(angle) * 0.8;
              b.vy += Math.sin(angle) * 0.8;
              const spd = Math.hypot(b.vx, b.vy);
              if (spd > 12) {
                b.vx = (b.vx / spd) * 12;
                b.vy = (b.vy / spd) * 12;
              }
            }
          }

          b.x += b.vx;
          b.y += b.vy;

          if (b.y < -50 || b.y > canvas.height + 50 || b.x < -50 || b.x > canvas.width + 50) {
            b.markedForDeletion = true;
          }
        }

        ctx.fillStyle = b.color;
        ctx.fillRect(retroSnap(b.x), retroSnap(b.y), b.width, b.height);
      });

      // Update & Draw Enemies
      enemies.current.forEach((e) => {
        if (isPlaying) {
          e.x += e.vx;
          e.y += e.vy;

          if (e.shootCooldown !== undefined) {
            e.shootCooldown--;
            if (e.shootCooldown <= 0) {
              bullets.current.push({
                x: e.x + e.width / 2 - CONFIG.PIXEL_SIZE / 2,
                y: e.y + e.height,
                width: CONFIG.PIXEL_SIZE,
                height: CONFIG.PIXEL_SIZE * 2.5,
                color: PALETTE.enemyLaser,
                markedForDeletion: false,
                vx: 0,
                vy: CONFIG.ENEMY_BULLET_SPEED,
                isEnemy: true,
              });
              e.shootCooldown = Math.floor(Math.random() * 80) + 70;
            }
          }

          if (e.y > canvas.height + 50) e.markedForDeletion = true;

          // Enemy-Player Collision
          if (checkCollision(e, player.current)) {
            e.markedForDeletion = true;
            handlePlayerHit();
            createExplosion(e.x + e.width / 2, e.y + e.height / 2, PALETTE.botPrimary, '#E11D48');
          }
        }

        drawSprite(ctx, e.sprite, e.x, e.y, CONFIG.PIXEL_SIZE);
      });

      // Bullet-Enemy Collisions
      bullets.current
        .filter((b) => !b.isEnemy)
        .forEach((b) => {
          enemies.current.forEach((e) => {
            if (checkCollision(b, e)) {
              b.markedForDeletion = true;
              e.hp -= 1;
              createExplosion(b.x, b.y, PALETTE.playerLaser, '#FFFFFF', 4);

              if (e.hp <= 0) {
                e.markedForDeletion = true;
                scoreRef.current += e.maxHp * 15;
                createExplosion(
                  e.x + e.width / 2,
                  e.y + e.height / 2,
                  PALETTE.botSecondary,
                  PALETTE.explosion1,
                  18
                );

                // Spawn XP item
                items.current.push({
                  x: e.x + e.width / 2,
                  y: e.y + e.height / 2,
                  width: ITEM_XP[0].length * CONFIG.PIXEL_SIZE,
                  height: ITEM_XP.length * CONFIG.PIXEL_SIZE,
                  markedForDeletion: false,
                  type: 'xp',
                  vy: 0.8,
                  sprite: ITEM_XP,
                  xpValue: e.maxHp,
                });
              }
            }
          });
        });

      // Update & Draw Items (Magnet Pull Logic)
      items.current.forEach((it) => {
        if (isPlaying) {
          const p = player.current;
          const magRange = 70 + p.upgrades.magnet * 35;
          const dist = Math.hypot(p.x + p.width / 2 - it.x, p.y + p.height / 2 - it.y);

          if (dist < magRange) {
            const angle = Math.atan2(p.y + p.height / 2 - it.y, p.x + p.width / 2 - it.x);
            it.x += Math.cos(angle) * 6;
            it.y += Math.sin(angle) * 6;
          } else {
            it.y += it.vy;
          }

          if (it.y > canvas.height + 40) it.markedForDeletion = true;

          // Pickup Collision
          if (checkCollision(it, player.current)) {
            it.markedForDeletion = true;
            if (it.type === 'xp') {
              p.xp += it.xpValue || 1;
              setHudXp(p.xp);
              if (p.xp >= p.maxXp) {
                triggerLevelUp();
              }
            }
          }
        }

        drawSprite(ctx, it.sprite, it.x, it.y, CONFIG.PIXEL_SIZE);
      });

      // Update & Draw Particles
      particles.current.forEach((part) => {
        if (isPlaying) {
          part.x += part.vx;
          part.y += part.vy;
          part.life++;
          if (part.life >= part.maxLife) part.markedForDeletion = true;
        }

        const alpha = Math.max(0, 1 - part.life / part.maxLife);
        ctx.fillStyle = part.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(retroSnap(part.x), retroSnap(part.y), part.width, part.height);
      });
      ctx.globalAlpha = 1.0;

      // Draw Player Ship (Coday Blue)
      if (gameStateRef.current !== 'GAME_OVER') {
        const p = player.current;
        const currentSprite = getPlayerSprite(p.upgrades);
        drawSprite(ctx, currentSprite, p.x, p.y, CONFIG.PIXEL_SIZE);

        // Draw Shield Aura if Active
        if (p.shieldHp > 0) {
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(
            p.x + p.width / 2,
            p.y + p.height / 2,
            Math.max(p.width, p.height) * 0.8,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      // Cleanup Marked Entities
      bullets.current = bullets.current.filter((b) => !b.markedForDeletion);
      enemies.current = enemies.current.filter((e) => !e.markedForDeletion);
      items.current = items.current.filter((i) => !i.markedForDeletion);
      particles.current = particles.current.filter((p) => !p.markedForDeletion);

      // Screen Flash
      if (screenFlash.current.alpha > 0) {
        ctx.fillStyle = screenFlash.current.color;
        ctx.globalAlpha = screenFlash.current.alpha;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        screenFlash.current.alpha *= 0.85;
        if (screenFlash.current.alpha < 0.05) screenFlash.current.alpha = 0;
      }

      ctx.restore();

      // Draw Light Canvas HUD Overlay
      if (isPlaying) {
        // Hull Hearts
        for (let i = 0; i < hudMaxHp; i++) {
          const isFilled = i < hudHp;
          drawSprite(
            ctx,
            isFilled ? ITEM_HEART : ITEM_HEART_EMPTY,
            20 + i * 28,
            20,
            CONFIG.PIXEL_SIZE * 0.8
          );
        }

        // Shield Icons
        for (let i = 0; i < player.current.shieldHp; i++) {
          drawSprite(ctx, ITEM_SHIELD_ICON, 20 + (hudMaxHp + i) * 28, 20, CONFIG.PIXEL_SIZE * 0.8);
        }

        // XP Progress Bar
        const barWidth = 160;
        const barHeight = 8;
        const fillWidth = Math.min(barWidth, (hudXp / hudMaxXp) * barWidth);
        ctx.fillStyle = '#E2E8F0';
        ctx.fillRect(20, 52, barWidth, barHeight);
        ctx.fillStyle = PALETTE.player;
        ctx.fillRect(20, 52, fillWidth, barHeight);

        ctx.fillStyle = PALETTE.uiText;
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`LVL ${hudLevel}`, 190, 60);

        // Score & High Score
        ctx.textAlign = 'right';
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = PALETTE.uiText;
        ctx.fillText(`SCORE: ${Math.floor(scoreRef.current)}`, canvas.width - 20, 36);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#64748B';
        ctx.fillText(
          `BEST: ${Math.max(highScoreRef.current, Math.floor(scoreRef.current))}`,
          canvas.width - 20,
          56
        );
        ctx.textAlign = 'left';
      }

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
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA] select-none touch-none">
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {/* START SCREEN MODAL (Light Theme Glass) */}
      {gameState === 'START' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 p-4 bg-white/80 backdrop-blur-md">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Coday Space Defense</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-slate-900 mb-2">
              VELOCITY <span className="text-blue-600">VOID</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-sm mx-auto">
              Steuere das Coday-Schiff mit WASD / Pfeiltasten oder per Touch. Vernichte feindliche
              Bots und meistere die Sektoren.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button
                onClick={() => {
                  gameStateRef.current = 'PLAYING';
                  setGameState('PLAYING');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>MISSION STARTEN</span>
              </button>

              <button
                onClick={() => setIsShopOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-2xl font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>ARMORY</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-center gap-4">
              <span>
                Steuerung: <strong>WASD / Touch</strong>
              </span>
              <span>•</span>
              <span>
                Highscore: <strong>{highScore} Pkt</strong>
              </span>
            </div>
          </m.div>
        </div>
      )}

      {/* LEVEL UP MODAL (Pure Phosphor Vector Upgrades) */}
      <AnimatePresence>
        {gameState === 'LEVEL_UP' && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 p-4 bg-slate-900/20 backdrop-blur-md"
          >
            <div className="bg-white border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-xl w-full text-slate-900">
              <div className="text-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Level {hudLevel} Erreicht
                </span>
                <h2 className="text-2xl font-bold font-display text-slate-900 mt-2">
                  System-Upgrade wählen
                </h2>
              </div>

              <div className="space-y-3">
                {upgradeChoices.map((upg) => {
                  const Icon = upg.icon;
                  const currentLvl = upg.currentLevel;

                  return (
                    <button
                      key={upg.id}
                      onClick={() => applyUpgrade(upg.id)}
                      className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-sm transition-all text-left flex items-center gap-3.5 group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                            {upg.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Stufe {currentLvl + 1}/{upg.maxLevel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 truncate mt-0.5">{upg.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ARMORY META SHOP MODAL */}
      <AnimatePresence>
        {isShopOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center z-50 p-4 bg-slate-900/20 backdrop-blur-md"
          >
            <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 relative">
              <button
                onClick={() => setIsShopOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Shop schließen"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  <span>{metaCoins} Coday Coins</span>
                </span>
                <h2 className="text-2xl font-bold font-display text-slate-900 mt-2">
                  Coday Armory
                </h2>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Rumpfverstärkung</h4>
                    <p className="text-xs text-slate-600">
                      +1 Basis-HP dauerhaft (Aktuell: +{metaUpgrades.start_hp})
                    </p>
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
                        try {
                          localStorage.setItem('velocityVoidCoins', newCoins.toString());
                          localStorage.setItem('velocityVoidMeta', JSON.stringify(newUps));
                        } catch (_e) {
                          // Safe storage error handling
                        }
                      }
                    }}
                    disabled={
                      metaCoins < 50 + metaUpgrades.start_hp * 50 || metaUpgrades.start_hp >= 5
                    }
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold text-xs shadow-2xs transition-all"
                  >
                    {metaUpgrades.start_hp >= 5 ? 'MAX' : `${50 + metaUpgrades.start_hp * 50} C`}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Deflektor-Matrix</h4>
                    <p className="text-xs text-slate-600">
                      +1 Start-Schild dauerhaft (Aktuell: +{metaUpgrades.start_shield})
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const cost = 75 + metaUpgrades.start_shield * 75;
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
                        try {
                          localStorage.setItem('velocityVoidCoins', newCoins.toString());
                          localStorage.setItem('velocityVoidMeta', JSON.stringify(newUps));
                        } catch (_e) {
                          // Safe storage error handling
                        }
                      }
                    }}
                    disabled={
                      metaCoins < 75 + metaUpgrades.start_shield * 75 ||
                      metaUpgrades.start_shield >= 3
                    }
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold text-xs shadow-2xs transition-all"
                  >
                    {metaUpgrades.start_shield >= 3
                      ? 'MAX'
                      : `${75 + metaUpgrades.start_shield * 75} C`}
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* GAME OVER MODAL */}
      <AnimatePresence>
        {gameState === 'GAME_OVER' && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-50 p-4 bg-slate-900/20 backdrop-blur-md"
          >
            <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full text-center text-slate-900">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto mb-4 shadow-sm">
                <Trophy className="w-7 h-7" />
              </div>

              <h2 className="text-2xl font-bold font-display text-slate-900 mb-1">
                Mission Beendet
              </h2>

              <p className="text-xs text-slate-600 mb-6">
                Ergebnis:{' '}
                <strong className="text-slate-900">{Math.floor(currentScore)} Punkte</strong> •
                Highscore: <strong className="text-slate-900">{highScore} Punkte</strong>
              </p>

              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    initGame(canvas);
                    gameStateRef.current = 'PLAYING';
                    setGameState('PLAYING');
                  }
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ArrowClockwise className="w-4 h-4" />
                <span>NOCHMAL SPIELEN</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
