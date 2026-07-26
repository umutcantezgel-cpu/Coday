/* eslint-disable */
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'motion/react';
import {
  ChatCircle,
  ShareNetwork,
  WhatsappLogo,
  ShieldCheck,
  FolderPlus,
  Alien,
} from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { VelocityVoidOverlay } from '@/widgets/velocity-void/VelocityVoidOverlay';
import { FloatingMenuMobile } from './FloatingMenuMobile';

const WIDGET_SIZE = 64; // Diameter
const RADIUS = WIDGET_SIZE / 2;
const FRICTION = 0.96; // Float freely like zero gravity
const BOUNCE = 0.85; // Bouncy walls
const COLLISION_BOUNCE = 0.9;
const MIN_VEL = 0.1;
const DRAG_THRESHOLD = 5;

// Unified state for a physics widget
interface PhysicsState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  wasDragged: boolean;
  isSnapping: boolean;
  isInsideFolder: boolean;
}

const WIDGET_IDS = ['security', 'chat', 'social', 'folder', 'game', 'whatsapp'] as const;
type WidgetId = (typeof WIDGET_IDS)[number];

function getContextualMessage(pathname: string, defaultMsg: string): string {
  if (pathname.includes('/services/'))
    return (
      'Hallo, ich interessiere mich für Ihre Webdesign-Dienstleistungen für ' +
      pathname.split('/').pop()
    );
  if (pathname.includes('/branchen/'))
    return 'Hallo, ich interessiere mich für Webdesign für ' + pathname.split('/').pop();
  return defaultMsg;
}

export const FloatingWidgetsManager: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || '';

  // Stores
  const { toggleChat } = useChatStore();
  const { openSettings } = useCookieStore();

  // Re-render trigger
  const [, forceRender] = useState(0);

  const [showFolderTooltip, setShowFolderTooltip] = useState(false);
  const [showSecurityTooltip, setShowSecurityTooltip] = useState(false);

  // Physics state array using refs to avoid re-renders during drag/anim
  const widgets = useRef<Record<WidgetId, PhysicsState>>({
    folder: {
      id: 'folder',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
    security: {
      id: 'security',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
    chat: {
      id: 'chat',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
    social: {
      id: 'social',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
    game: {
      id: 'game',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
    whatsapp: {
      id: 'whatsapp',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDragging: false,
      wasDragged: false,
      isSnapping: false,
      isInsideFolder: false,
    },
  });

  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const prevPointer = useRef({ x: 0, y: 0, t: 0 });
  const activeWidgetId = useRef<WidgetId | null>(null);

  const animFrame = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);
  const isFolderOpen = useRef(false);

  // Initialize positions
  useEffect(() => {
    setMounted(true);
    isMobile.current = window.innerWidth < 768;

    const margin = isMobile.current ? 16 : 24;
    const bottomBase = window.innerHeight - WIDGET_SIZE - (isMobile.current ? 140 : 96);

    // Initial arrangement
    widgets.current.folder.x = window.innerWidth - WIDGET_SIZE - margin;
    widgets.current.folder.y = bottomBase;

    widgets.current.whatsapp.x = window.innerWidth - WIDGET_SIZE - margin;
    widgets.current.whatsapp.y = bottomBase - WIDGET_SIZE - margin - 20; // Spawn above the folder

    ['security', 'chat', 'social', 'game'].forEach((id) => {
      const w = widgets.current[id as WidgetId];
      w.x = widgets.current.folder.x;
      w.y = widgets.current.folder.y;
      w.isInsideFolder = true;
    });

    forceRender((n) => n + 1);

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Core Physics Engine ── */
  const resolveCollisions = () => {
    const ids = WIDGET_IDS;
    let hasCollisions = false;

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const w1 = widgets.current[ids[i]];
        const w2 = widgets.current[ids[j]];

        // 1. Items inside the folder never collide with each other.
        // This ensures they slide smoothly into their straight line (Pinselstrich) without bouncing.
        if (w1.isInsideFolder && w2.isInsideFolder) continue;

        // 2. Items inside the folder never collide with the folder itself.
        if (w1.isInsideFolder && w2.id === 'folder') continue;
        if (w2.isInsideFolder && w1.id === 'folder') continue;

        let dx = w2.x - w1.x;
        let dy = w2.y - w1.y;
        let distSq = dx * dx + dy * dy;

        if (distSq === 0) {
          dx = (Math.random() - 0.5) * 0.1;
          dy = (Math.random() - 0.5) * 0.1;
          distSq = dx * dx + dy * dy;
        }

        // --- MAGNETIC REPULSION (WhatsApp) ---
        if (w1.id === 'whatsapp' || w2.id === 'whatsapp') {
          const magnetRadius = WIDGET_SIZE * 3.5;
          if (distSq < magnetRadius * magnetRadius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Non-linear force: stronger when closer
            const force = Math.pow((magnetRadius - dist) / magnetRadius, 2);
            const fx = (dx / dist) * force * 3.5;
            const fy = (dy / dist) * force * 3.5;

            if (!w1.isDragging) {
              w1.vx -= fx;
              w1.vy -= fy;
            }
            if (!w2.isDragging) {
              w2.vx += fx;
              w2.vy += fy;
            }
            hasCollisions = true; // Keep physics awake
          }
        }
        // -------------------------------------

        const minDist = WIDGET_SIZE + 4; // Add slight padding

        if (distSq < minDist * minDist) {
          hasCollisions = true;
          const dist = Math.sqrt(distSq);
          const overlap = minDist - dist;

          const nx = dx / dist;
          const ny = dy / dist;

          const moveX = nx * (overlap / 2);
          const moveY = ny * (overlap / 2);

          if (!w1.isDragging && !w2.isDragging) {
            w1.x -= moveX;
            w1.y -= moveY;
            w2.x += moveX;
            w2.y += moveY;
          } else if (w1.isDragging && !w2.isDragging) {
            w2.x += moveX * 2;
            w2.y += moveY * 2;
          } else if (!w1.isDragging && w2.isDragging) {
            w1.x -= moveX * 2;
            w1.y -= moveY * 2;
          }

          const rvx = w2.vx - w1.vx;
          const rvy = w2.vy - w1.vy;
          const velAlongNormal = rvx * nx + rvy * ny;

          if (velAlongNormal < 0) {
            const restitution = COLLISION_BOUNCE;
            const jAmt = -(1 + restitution) * velAlongNormal;
            const impulse = jAmt / 2;

            const impulseX = nx * impulse;
            const impulseY = ny * impulse;

            if (!w1.isDragging) {
              w1.vx -= impulseX;
              w1.vy -= impulseY;
            }
            if (!w2.isDragging) {
              w2.vx += impulseX;
              w2.vy += impulseY;
            }
          }
        }
      }
    }
    return hasCollisions;
  };

  const checkBounds = (w: PhysicsState) => {
    let bounded = false;

    // Strict limits (no more hideOffset)
    const minX = 0;
    const maxX = window.innerWidth - WIDGET_SIZE;
    const minY = 0;
    const maxY = window.innerHeight - WIDGET_SIZE;

    if (w.x <= minX) {
      w.x = minX;
      w.vx = Math.abs(w.vx) * BOUNCE;
      bounded = true;
    } else if (w.x >= maxX) {
      w.x = maxX;
      w.vx = -Math.abs(w.vx) * BOUNCE;
      bounded = true;
    }

    if (w.y <= minY) {
      w.y = minY;
      w.vy = Math.abs(w.vy) * BOUNCE;
      bounded = true;
    } else if (w.y >= maxY) {
      w.y = maxY;
      w.vy = -Math.abs(w.vy) * BOUNCE;
      bounded = true;
    }

    return bounded;
  };

  const getSnapTarget = (w: PhysicsState) => {
    const margin = isMobile.current ? 16 : 24;

    const midX = w.x + RADIUS;
    const distLeft = midX;
    const distRight = window.innerWidth - midX;

    const targetY = Math.max(margin, Math.min(window.innerHeight - WIDGET_SIZE - margin, w.y));

    if (distLeft < distRight) {
      return { x: margin, y: targetY };
    }
    return {
      x: window.innerWidth - WIDGET_SIZE - margin,
      y: targetY,
    };
  };

  const applySnapping = (w: PhysicsState) => {
    if (w.isDragging || w.isSnapping) return;
    const target = getSnapTarget(w);

    const dx = target.x - w.x;
    const dy = target.y - w.y;

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      w.vx += dx * 0.05;
      w.vy += dy * 0.05;
    } else {
      w.x = target.x;
      w.y = target.y;
      w.vx = 0;
      w.vy = 0;
    }
  };

  const animate = useCallback(() => {
    let moving = false;

    WIDGET_IDS.forEach((id) => {
      const w = widgets.current[id];
      if (w.isDragging) return;

      if (w.isInsideFolder) {
        const folder = widgets.current.folder;
        let targetX = folder.x;
        let targetY = folder.y;

        if (isFolderOpen.current) {
          const insideIds = WIDGET_IDS.filter(
            (i) => i !== 'folder' && widgets.current[i].isInsideFolder
          );
          const index = insideIds.indexOf(id as WidgetId);

          targetY = folder.y - (index + 1) * (WIDGET_SIZE + 16); // Perfect straight line

          const spring = 0.2;
          w.vx += (targetX - w.x) * spring;
          w.vy += (targetY - w.y) * spring;
          // Heavy damping for fluid, "Pinselstrich" animation without bouncy collisions
          w.vx *= 0.6;
          w.vy *= 0.6;
        } else {
          const targetX = folder.x;
          const targetY = folder.y;
          const spring = 0.3;
          w.vx += (targetX - w.x) * spring;
          w.vy += (targetY - w.y) * spring;
          w.vx *= 0.6;
          w.vy *= 0.6;
        }

        w.x += w.vx;
        w.y += w.vy;

        checkBounds(w);

        if (
          Math.abs(w.vx) > 0.1 ||
          Math.abs(w.vy) > 0.1 ||
          Math.abs(w.x - targetX) > 1 ||
          Math.abs(w.y - targetY) > 1
        ) {
          moving = true;
        }
        return;
      }

      // If floating free, check if it should be swallowed magnetically
      if (
        !w.isInsideFolder &&
        w.id !== 'folder' &&
        w.id !== 'whatsapp' &&
        isFolderOpen.current &&
        !w.isDragging
      ) {
        const folder = widgets.current.folder;
        const dx = w.x - folder.x;
        const dy = w.y - folder.y;
        if (dx * dx + dy * dy < WIDGET_SIZE * 1.8 * (WIDGET_SIZE * 1.8)) {
          w.isInsideFolder = true;
          w.vx *= 0.5; // Dampen current velocity so it transitions smoothly into the folder slot
          w.vy *= 0.5;
        }
      }

      w.vx *= FRICTION;
      w.vy *= FRICTION;

      if (Math.abs(w.vx) < MIN_VEL && Math.abs(w.vy) < MIN_VEL) {
        w.vx = 0;
        w.vy = 0;
        applySnapping(w);
      }

      w.x += w.vx;
      w.y += w.vy;

      checkBounds(w);

      if (
        Math.abs(w.vx) > 0 ||
        Math.abs(w.vy) > 0 ||
        Math.abs(w.x - getSnapTarget(w).x) > 1 ||
        Math.abs(w.y - getSnapTarget(w).y) > 1
      ) {
        moving = true;
      }
    });

    resolveCollisions();

    forceRender((n) => n + 1);

    if (moving || activeWidgetId.current) {
      animFrame.current = requestAnimationFrame(animate);
    }
  }, []);

  // Auto-close folder when clicking outside on Desktop/Mobile
  useEffect(() => {
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (!isFolderOpen.current) return;
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        // Clicked inside the widget container, let the widget logic handle it
        return;
      }
      // Clicked outside, close the folder
      isFolderOpen.current = false;
      cancelAnimationFrame(animFrame.current);
      animFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointerdown', handleGlobalPointerDown);
    return () => {
      window.removeEventListener('pointerdown', handleGlobalPointerDown);
    };
  }, [animate]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, id: WidgetId) => {
      e.preventDefault();
      const w = widgets.current[id];
      w.isDragging = true;
      w.wasDragged = false;
      w.isSnapping = false;
      w.vx = 0;
      w.vy = 0;
      activeWidgetId.current = id;

      if (w.isInsideFolder) {
        w.isInsideFolder = false;
      }

      if (id === 'folder') setShowFolderTooltip(false);
      if (id === 'security') setShowSecurityTooltip(false);

      const now = Date.now();
      dragStart.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
      prevPointer.current = { x: e.clientX, y: e.clientY, t: now };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      if (navigator.vibrate) navigator.vibrate(30);

      cancelAnimationFrame(animFrame.current);
      animFrame.current = requestAnimationFrame(animate);
    },
    [animate]
  );

  const onPointerMove = useCallback((e: React.PointerEvent, id: WidgetId) => {
    const w = widgets.current[id];
    if (!w.isDragging) return;

    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;

    const totalDx = e.clientX - dragStart.current.x;
    const totalDy = e.clientY - dragStart.current.y;
    if (Math.abs(totalDx) > DRAG_THRESHOLD || Math.abs(totalDy) > DRAG_THRESHOLD) {
      w.wasDragged = true;
    }

    w.x += dx;
    w.y += dy;

    prevPointer.current = { ...lastPointer.current };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };

    resolveCollisions();
    forceRender((n) => n + 1);
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent, id: WidgetId, onClickAction?: (e: React.MouseEvent) => void) => {
      const w = widgets.current[id];
      if (!w.isDragging) return;
      w.isDragging = false;
      activeWidgetId.current = null;

      // Handle actual clicks here since we used preventDefault in onPointerDown
      if (!w.wasDragged && onClickAction) {
        onClickAction(e as unknown as React.MouseEvent);
      }

      const dt = Math.max(1, lastPointer.current.t - prevPointer.current.t);
      const vx = ((lastPointer.current.x - prevPointer.current.x) / dt) * 16;
      const vy = ((lastPointer.current.y - prevPointer.current.y) / dt) * 16;

      const maxV = 40;
      w.vx = Math.max(-maxV, Math.min(maxV, vx));
      w.vy = Math.max(-maxV, Math.min(maxV, vy));

      // CHECK FOLDER DROP
      if (w.wasDragged && id !== 'folder') {
        const folder = widgets.current.folder;
        const dx = w.x - folder.x;
        const dy = w.y - folder.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < WIDGET_SIZE * 2 && isFolderOpen.current) {
          // SWALLOWED
          w.isInsideFolder = true;
          w.vx = 0;
          w.vy = 0;
        }
      }

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}

      animFrame.current = requestAnimationFrame(animate);
    },
    [animate]
  );

  /* ── Clicks ── */
  const handleSecurityClick = (e: React.MouseEvent) => {
    if (widgets.current.security.wasDragged) return;
    openSettings();
  };

  const handleChatClick = (e: React.MouseEvent) => {
    if (widgets.current.chat.wasDragged) return;
    toggleChat();
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    if (widgets.current.social.wasDragged) {
      e.preventDefault();
      return;
    }
    window.open('https://www.instagram.com/codayweb/', '_blank');
  };

  const handleFolderClick = (e: React.MouseEvent) => {
    if (widgets.current.folder.wasDragged) return;

    isFolderOpen.current = !isFolderOpen.current;

    if (navigator.vibrate) navigator.vibrate(isFolderOpen.current ? 30 : 15);

    cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(animate);
  };

  const [isGameActive, setIsGameActive] = useState(false);
  const handleGameClick = (e: React.MouseEvent) => {
    if (widgets.current.game.wasDragged) return;
    setIsGameActive(true);
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    if (widgets.current.whatsapp.wasDragged) {
      e.preventDefault();
      return;
    }
    const msg = getContextualMessage(
      pathname,
      'Hallo, ich interessiere mich für Ihre Webdesign-Dienstleistungen.'
    );
    const url = `https://api.whatsapp.com/send?phone=4917641195301&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: pathname,
      });
    }
  };

  if (!mounted) return null;

  const wSec = widgets.current.security;
  const wChat = widgets.current.chat;
  const wSocial = widgets.current.social;
  const wFolder = widgets.current.folder;
  const wGame = widgets.current.game;

  // Render Helper
  const renderWidget = (
    w: PhysicsState,
    content: React.ReactNode,
    onClick: (e: React.MouseEvent) => void,
    extraClasses: string
  ) => {
    if (w.isInsideFolder && !isFolderOpen.current) {
      const folder = widgets.current.folder;
      const distSq = Math.pow(w.x - folder.x, 2) + Math.pow(w.y - folder.y, 2);
      if (distSq < 16) return null; // Hide only when fully sucked in
    }

    return (
      <div
        className={`absolute pointer-events-auto touch-none group ${extraClasses}`}
        style={{
          transform: `translate(${w.x}px, ${w.y}px)`,
          width: WIDGET_SIZE,
          height: WIDGET_SIZE,
        }}
        onPointerDown={(e) => onPointerDown(e, w.id as WidgetId)}
        onPointerMove={(e) => onPointerMove(e, w.id as WidgetId)}
        onPointerUp={(e) => onPointerUp(e, w.id as WidgetId, onClick)}
        onPointerCancel={(e) => onPointerUp(e, w.id as WidgetId)}
      >
        <button className="w-full h-full rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center relative outline-none focus:outline-none">
          {content}
        </button>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]">
      {/* ── Security Widget ── */}
      {renderWidget(
        wSec,
        <div className="w-full h-full bg-white text-gray-800 border border-gray-200 rounded-full flex items-center justify-center relative">
          <ShieldCheck className="w-8 h-8 text-primary" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Cookies
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>,
        handleSecurityClick,
        ''
      )}

      {/* ── Social Widget ── */}
      {renderWidget(
        wSocial,
        <div className="w-full h-full bg-white text-gray-800 border border-gray-200 rounded-full flex items-center justify-center relative">
          <ShareNetwork className="w-8 h-8 text-gray-800" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Instagram
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>,
        handleSocialClick,
        ''
      )}

      {/* ── Chat Widget ── */}
      {renderWidget(
        wChat,
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:brightness-110 flex items-center justify-center relative">
          <ChatCircle className="w-8 h-8" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            AI Assistent
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>,
        handleChatClick,
        ''
      )}

      {/* ── FOLDER Widget ── */}
      {renderWidget(
        wFolder,
        <div
          className={`w-full h-full rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden transition-all ${isFolderOpen.current ? 'bg-amber-200 text-amber-900' : 'bg-[#F5E6D3] text-[#4A3728] hover:bg-amber-200 hover:text-amber-900'}`}
        >
          {isFolderOpen.current ? (
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700 via-transparent to-transparent animate-pulse" />
          ) : null}
          <FolderPlus className="w-8 h-8 relative z-10" weight="fill" />

          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-[#4A3728] text-[#F5E6D3] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            {isFolderOpen.current ? 'Ordner schließen' : 'Widgets Ordner'}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-[#4A3728]" />
          </span>
        </div>,
        handleFolderClick,
        'z-[10000]'
      )}

      {/* ── GAME Widget (Easter Egg) ── */}
      {renderWidget(
        wGame,
        <div className="w-full h-full rounded-full bg-[#161311] shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.8)] border-2 border-[#D4AF37] flex items-center justify-center relative overflow-hidden transition-all">
          {/* Custom Pixel Art Bot Icon (Matches PLAYER_SPRITE_L1) */}
          <svg
            viewBox="0 0 7 6"
            className="w-6 h-6 relative z-10 drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#F5E6D3">
              {/* Row 0 */}
              <rect x="3" y="0" width="1" height="1" />
              {/* Row 1 */}
              <rect x="2" y="1" width="1" height="1" />
              <rect x="4" y="1" width="1" height="1" />
              {/* Row 2 */}
              <rect x="1" y="2" width="5" height="1" />
              {/* Row 3 */}
              <rect x="1" y="3" width="5" height="1" />
              {/* Row 4 */}
              <rect x="1" y="4" width="1" height="1" />
              <rect x="3" y="4" width="1" height="1" />
              <rect x="5" y="4" width="1" height="1" />
            </g>
            {/* Glowing Eye */}
            <rect x="3" y="1" width="1" height="1" fill="#00f0ff" />
            {/* Thrusters */}
            <rect x="1" y="5" width="1" height="1" fill="#ff2a6d" />
            <rect x="5" y="5" width="1" height="1" fill="#ff2a6d" />
          </svg>

          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-[#D4AF37] text-[#161311] text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Velocity Void
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-[#D4AF37]" />
          </span>
        </div>,
        handleGameClick,
        ''
      )}

      {/* ── WhatsApp Widget ── */}
      {renderWidget(
        widgets.current.whatsapp,
        <div
          className="w-full h-full rounded-full flex items-center justify-center relative transition-transform shadow-[0_6px_28px_rgba(37,211,102,0.55)]"
          style={{
            backgroundColor: '#25D366',
            color: '#ffffff',
            animation: 'wa-pulse 2s ease-in-out infinite',
          }}
        >
          <WhatsappLogo className="w-8 h-8" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Chat starten 💬
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-[#25D366]" />
          </span>
        </div>,
        handleWhatsappClick,
        'z-[10001]'
      )}

      <VelocityVoidOverlay isActive={isGameActive} onClose={() => setIsGameActive(false)} />

      <style jsx global>{`
        @keyframes wa-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default function FloatingWidgetsWrapper() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;
  return isMobile ? <FloatingMenuMobile /> : <FloatingWidgetsManager />;
}
