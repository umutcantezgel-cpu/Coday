/* eslint-disable */
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'motion/react';
import {
  ChatCircle,
  ShareNetwork,
  Phone,
  ShieldCheck,
  FolderPlus,
  Alien,
} from '@phosphor-icons/react/dist/ssr';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';
import { useCookieStore } from '@/shared/lib/cookieStore';
import { VelocityVoidOverlay } from '@/widgets/velocity-void/VelocityVoidOverlay';

const WIDGET_SIZE = 64; // Diameter
const RADIUS = WIDGET_SIZE / 2;
const FRICTION = 0.92;
const BOUNCE = 0.6;
const COLLISION_BOUNCE = 0.8;
const MIN_VEL = 0.3;
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

const WIDGET_IDS = ['whatsapp', 'security', 'chat', 'social', 'folder', 'game'] as const;
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

  // Tooltips & badges
  const [showWaTooltip, setShowWaTooltip] = useState(false);
  const [showWaBadge, setShowWaBadge] = useState(true);

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
  });

  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const prevPointer = useRef({ x: 0, y: 0, t: 0 });
  const activeWidgetId = useRef<WidgetId | null>(null);

  const animFrame = useRef<number>(0);
  const isMobile = useRef(false);

  // Initialize positions
  useEffect(() => {
    setMounted(true);
    isMobile.current = window.innerWidth < 768;

    const margin = isMobile.current ? 16 : 24;
    const hideOffset = isMobile.current ? WIDGET_SIZE * 0.6 : 0;
    const bottomBase = window.innerHeight - WIDGET_SIZE - (isMobile.current ? 140 : 96);

    // Initial arrangement
    // Right side: folder, chat, social
    widgets.current.folder.x =
      window.innerWidth - WIDGET_SIZE + hideOffset - (isMobile.current ? 0 : margin);
    widgets.current.folder.y = bottomBase;

    widgets.current.chat.x =
      window.innerWidth - WIDGET_SIZE + hideOffset - (isMobile.current ? 0 : margin);
    widgets.current.chat.y = bottomBase - WIDGET_SIZE - 16;

    widgets.current.social.x =
      window.innerWidth - WIDGET_SIZE + hideOffset - (isMobile.current ? 0 : margin);
    widgets.current.social.y = bottomBase - WIDGET_SIZE * 2 - 32;

    // Left side: whatsapp, security, game
    widgets.current.whatsapp.x = isMobile.current ? -hideOffset : margin;
    widgets.current.whatsapp.y = bottomBase;

    widgets.current.security.x = isMobile.current ? -hideOffset : margin;
    widgets.current.security.y = bottomBase - WIDGET_SIZE - 16;

    widgets.current.game.x = isMobile.current ? -hideOffset : margin;
    widgets.current.game.y = bottomBase - WIDGET_SIZE * 2 - 32;

    forceRender((n) => n + 1);

    const tooltipTimer = setTimeout(() => setShowWaTooltip(true), 5000);
    const badgeTimer = setTimeout(() => setShowWaBadge(false), 30000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(badgeTimer);
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

        // Ignore hidden widgets
        if (w1.isInsideFolder || w2.isInsideFolder) continue;

        const dx = w2.x - w1.x;
        const dy = w2.y - w1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = WIDGET_SIZE;

        if (distSq > 0 && distSq < minDist * minDist) {
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
    const hideOffset = isMobile.current ? WIDGET_SIZE * 0.6 : 0;

    // Limits
    const minX = -hideOffset;
    const maxX = window.innerWidth - WIDGET_SIZE + hideOffset;
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
    const margin = 16;
    const hideOffset = isMobile.current ? WIDGET_SIZE * 0.6 : 0;

    const midX = w.x + RADIUS;
    const distLeft = midX;
    const distRight = window.innerWidth - midX;

    const targetY = Math.max(margin, Math.min(window.innerHeight - WIDGET_SIZE - margin, w.y));

    if (distLeft < distRight) {
      return { x: isMobile.current ? -hideOffset : margin, y: targetY };
    }
    return {
      x: window.innerWidth - WIDGET_SIZE + (isMobile.current ? hideOffset : -margin),
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
      if (w.isDragging || w.isInsideFolder) return;

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

      if (id === 'whatsapp') {
        setShowWaTooltip(false);
        setShowWaBadge(false);
      }

      const now = Date.now();
      dragStart.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
      prevPointer.current = { x: e.clientX, y: e.clientY, t: now };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);

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
    (e: React.PointerEvent, id: WidgetId) => {
      const w = widgets.current[id];
      if (!w.isDragging) return;
      w.isDragging = false;
      activeWidgetId.current = null;

      const dt = Math.max(1, lastPointer.current.t - prevPointer.current.t);
      const vx = ((lastPointer.current.x - prevPointer.current.x) / dt) * 16;
      const vy = ((lastPointer.current.y - prevPointer.current.y) / dt) * 16;

      const maxV = 40;
      w.vx = Math.max(-maxV, Math.min(maxV, vx));
      w.vy = Math.max(-maxV, Math.min(maxV, vy));

      // CHECK FOLDER DROP
      if (id !== 'folder') {
        const folder = widgets.current.folder;
        const dx = w.x - folder.x;
        const dy = w.y - folder.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < WIDGET_SIZE) {
          // SWALLOWED
          w.isInsideFolder = true;
          w.vx = 0;
          w.vy = 0;
        }
      }

      animFrame.current = requestAnimationFrame(animate);
    },
    [animate]
  );

  /* ── Clicks ── */
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (widgets.current.whatsapp.wasDragged) {
      e.preventDefault();
      return;
    }
    const msg = getContextualMessage(
      pathname,
      'Hallo, ich interessiere mich für Ihre Webdesign-Dienstleistungen.'
    );
    const url = `https://wa.me/4917641195301?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

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

    // Eject all hidden widgets!
    let exploded = false;
    WIDGET_IDS.forEach((id) => {
      const w = widgets.current[id];
      if (w.isInsideFolder) {
        w.isInsideFolder = false;
        w.x = widgets.current.folder.x;
        w.y = widgets.current.folder.y;

        // Random velocity between -30 and 30
        w.vx = (Math.random() - 0.5) * 60;
        w.vy = (Math.random() - 0.5) * 60;
        exploded = true;
      }
    });

    if (exploded) {
      if (navigator.vibrate) navigator.vibrate(50);
      cancelAnimationFrame(animFrame.current);
      animFrame.current = requestAnimationFrame(animate);
    }
  };

  const [isGameActive, setIsGameActive] = useState(false);
  const handleGameClick = (e: React.MouseEvent) => {
    if (widgets.current.game.wasDragged) return;
    setIsGameActive(true);
  };

  if (!mounted) return null;

  const wWa = widgets.current.whatsapp;
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
    if (w.isInsideFolder) return null;

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
        onPointerUp={(e) => onPointerUp(e, w.id as WidgetId)}
        onPointerCancel={(e) => onPointerUp(e, w.id as WidgetId)}
      >
        <button
          onClick={onClick}
          className="w-full h-full rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center relative bg-white border border-gray-200 text-gray-800"
          style={{
            background: w.id === 'chat' || w.id === 'folder' ? 'transparent' : undefined,
            border: w.id === 'chat' || w.id === 'folder' ? 'none' : undefined,
          }}
        >
          {content}
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* ── Security Widget ── */}
      {renderWidget(
        wSec,
        <>
          <ShieldCheck className="w-8 h-8 text-primary" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Cookies
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </>,
        handleSecurityClick,
        ''
      )}

      {/* ── Social Widget ── */}
      {renderWidget(
        wSocial,
        <>
          <ShareNetwork className="w-8 h-8 text-gray-800" weight="fill" />
          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Instagram
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </>,
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

      {/* ── WhatsApp Widget ── */}
      {renderWidget(
        wWa,
        <div className="w-full h-full bg-success text-white rounded-full flex items-center justify-center relative">
          <Phone className="w-8 h-8" weight="fill" />
          <AnimatePresence>
            {showWaBadge && (
              <m.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
              >
                1
              </m.span>
            )}
          </AnimatePresence>

          {!wWa.isDragging && wWa.vx === 0 && wWa.vy === 0 && (
            <span className="absolute inset-0 bg-success rounded-full opacity-30 animate-ping pointer-events-none" />
          )}

          <AnimatePresence>
            {(showWaTooltip || showWaBadge) && (
              <m.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-xl whitespace-nowrap pointer-events-none hidden md:block"
              >
                Chat starten 💬
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 border-4 border-transparent border-r-gray-900" />
              </m.div>
            )}
          </AnimatePresence>
        </div>,
        handleWhatsAppClick,
        ''
      )}

      {/* ── FOLDER Widget ── */}
      {renderWidget(
        wFolder,
        <div className="w-full h-full rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center relative overflow-hidden group-hover:brightness-110 transition-all">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black animate-pulse" />
          <FolderPlus className="w-8 h-8 relative z-10" weight="fill" />

          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
            Widgets einsammeln
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>,
        handleFolderClick,
        'z-[10000]'
      )}

      {/* ── GAME Widget (Easter Egg) ── */}
      {renderWidget(
        wGame,
        <div className="w-full h-full rounded-full bg-black text-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:brightness-125 border border-white/20 transition-all">
          <Alien className="w-7 h-7 relative z-10 text-white" weight="duotone" />

          <span className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block border border-white/10">
            Velocity Void
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
          </span>
        </div>,
        handleGameClick,
        ''
      )}

      <VelocityVoidOverlay isActive={isGameActive} onClose={() => setIsGameActive(false)} />
    </div>
  );
};

export default FloatingWidgetsManager;
