'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/* ═══════════════════════════════════════════════════════════════════════════
 * Floating WhatsApp CTA
 *
 * Features:
 *  1. Physics-based drag & throw (momentum, bounce, friction)
 *  2. Edge-snapping after release (docks to nearest screen edge)
 *  3. Pulse animation when idle
 *  4. Tooltip ("Chat starten 💬") on hover & after 5s idle
 *  5. Notification badge ("1") for first 30 seconds
 *  6. Contextual WhatsApp messages per page (anpassbar)
 *  7. Haptic feedback on mobile drag
 *  8. Analytics event on click (anpassbar)
 * ═══════════════════════════════════════════════════════════════════════════ */

interface FloatingWhatsAppWidgetProps {
  /**
   * Die WhatsApp-Nummer im internationalen Format (z.B. "+49123456789" oder "015201234567")
   */
  phoneNumber: string;
  /**
   * Die Standard-Nachricht, falls keine seitenspezifische Nachricht definiert ist
   */
  defaultMessage?: string;
}

/* ── Contextual messages per route ── */
function getContextualMessage(pathname: string, defaultMsg: string): string {
  // --- BEISPIEL: Seitenspezifische Logik ---
  // Passe die Routen an dein eigenes Projekt an oder lösche sie:
  /*
  if (pathname.includes("/preise")) return "Hallo, ich hätte eine Frage zu Ihren Preisen.";
  if (pathname.includes("/kontakt")) return "Hallo, ich möchte einen Termin vereinbaren.";
  */
  return defaultMsg;
}

/* ── Edge-snap target: find nearest screen edge ── */
function getSnapTarget(x: number, y: number, w: number, h: number, size: number) {
  const margin = 16;
  const midX = x + size / 2;
  const distLeft = midX;
  const distRight = w - midX;

  // Snap horizontally to nearest edge, keep vertical position clamped
  const clampedY = Math.max(margin, Math.min(h - size - margin, y));
  if (distLeft < distRight) {
    return { x: margin, y: clampedY };
  }
  return { x: w - size - margin, y: clampedY };
}

export default function FloatingWhatsAppWidget({
  phoneNumber,
  defaultMessage = 'Hallo!',
}: FloatingWhatsAppWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Nützlich für seitenspezifische Nachrichten in Next.js App Router
  const pathname = usePathname() || '';

  // Physics state
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const wasDragged = useRef(false);
  const isSnapping = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const prevPointer = useRef({ x: 0, y: 0, t: 0 });
  const animFrame = useRef<number>(0);
  const snapFrame = useRef<number>(0);

  // Render state for React
  const [renderState, setRenderState] = useState({
    x: 0,
    y: 0,
    isDragging: false,
    isSnapping: false,
    vx: 0,
    vy: 0,
  });

  const syncRender = useCallback(() => {
    setRenderState({
      x: pos.current.x,
      y: pos.current.y,
      isDragging: isDragging.current,
      isSnapping: isSnapping.current,
      vx: vel.current.x,
      vy: vel.current.y,
    });
  }, []);

  const SIZE = 64;
  const FRICTION = 0.92;
  const BOUNCE = 0.6;
  const MIN_VEL = 0.3;
  const DRAG_THRESHOLD = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    pos.current = {
      x: window.innerWidth - SIZE - (isMobile ? 16 : 24),
      y: window.innerHeight - SIZE - (isMobile ? 140 : 96),
    };
    syncRender();

    // Show tooltip after 5s of inactivity
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    // Hide notification badge after 30s
    const badgeTimer = setTimeout(() => setShowBadge(false), 30000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(badgeTimer);
    };
  }, [syncRender]);

  /* ── Edge-snap animation (spring-like easing) ── */
  const snapToEdge = useCallback(() => {
    const target = getSnapTarget(
      pos.current.x,
      pos.current.y,
      window.innerWidth,
      window.innerHeight,
      SIZE
    );
    isSnapping.current = true;

    const startX = pos.current.x;
    const startY = pos.current.y;
    const startTime = performance.now();
    const duration = 400; // ms

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      pos.current.x = startX + (target.x - startX) * eased;
      pos.current.y = startY + (target.y - startY) * eased;
      syncRender();

      if (progress < 1) {
        snapFrame.current = requestAnimationFrame(step);
      } else {
        isSnapping.current = false;
      }
    };

    snapFrame.current = requestAnimationFrame(step);
  }, [syncRender]);

  /* ── Physics animation loop ── */
  const animate = useCallback(() => {
    if (isDragging.current) return;

    const p = pos.current;
    const v = vel.current;
    const maxX = window.innerWidth - SIZE;
    const maxY = window.innerHeight - SIZE;

    v.x *= FRICTION;
    v.y *= FRICTION;

    if (Math.abs(v.x) < MIN_VEL && Math.abs(v.y) < MIN_VEL) {
      v.x = 0;
      v.y = 0;
      // After momentum settles, snap to nearest edge
      snapToEdge();
      return;
    }

    p.x += v.x;
    p.y += v.y;

    // Bounce off edges
    if (p.x <= 0) {
      p.x = 0;
      v.x = Math.abs(v.x) * BOUNCE;
    } else if (p.x >= maxX) {
      p.x = maxX;
      v.x = -Math.abs(v.x) * BOUNCE;
    }
    if (p.y <= 0) {
      p.y = 0;
      v.y = Math.abs(v.y) * BOUNCE;
    } else if (p.y >= maxY) {
      p.y = maxY;
      v.y = -Math.abs(v.y) * BOUNCE;
    }

    syncRender();
    // eslint-disable-next-line
    animFrame.current = requestAnimationFrame(() => animate());
  }, [snapToEdge, syncRender]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    wasDragged.current = false;
    isSnapping.current = false;
    cancelAnimationFrame(animFrame.current);
    cancelAnimationFrame(snapFrame.current);
    vel.current = { x: 0, y: 0 };

    // Hide tooltip on interaction
    setShowTooltip(false);
    setShowBadge(false);

    const now = Date.now();
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    prevPointer.current = { x: e.clientX, y: e.clientY, t: now };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // Haptic feedback on mobile
    if (navigator.vibrate) navigator.vibrate(30);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;

      const totalDx = e.clientX - dragStart.current.x;
      const totalDy = e.clientY - dragStart.current.y;
      if (Math.abs(totalDx) > DRAG_THRESHOLD || Math.abs(totalDy) > DRAG_THRESHOLD) {
        wasDragged.current = true;
      }

      const maxX = window.innerWidth - SIZE;
      const maxY = window.innerHeight - SIZE;

      pos.current.x = Math.max(0, Math.min(maxX, pos.current.x + dx));
      pos.current.y = Math.max(0, Math.min(maxY, pos.current.y + dy));

      prevPointer.current = { ...lastPointer.current };
      lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };

      syncRender();
    },
    [syncRender]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const dt = Math.max(1, lastPointer.current.t - prevPointer.current.t);
      const vx = ((lastPointer.current.x - prevPointer.current.x) / dt) * 16;
      const vy = ((lastPointer.current.y - prevPointer.current.y) / dt) * 16;

      const maxV = 40;
      vel.current = {
        x: Math.max(-maxV, Math.min(maxV, vx)),
        y: Math.max(-maxV, Math.min(maxV, vy)),
      };

      if (Math.abs(vel.current.x) > MIN_VEL || Math.abs(vel.current.y) > MIN_VEL) {
        animFrame.current = requestAnimationFrame(animate);
      } else {
        // No throw velocity snap immediately
        snapToEdge();
      }
    },
    [animate, snapToEdge]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (wasDragged.current) {
        e.preventDefault();
        return;
      }
      // Optional: Analytics event eintragen (z.B. Google Analytics gtag)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: pathname,
        });
      }
    },
    [pathname]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrame.current);
      cancelAnimationFrame(snapFrame.current);
    };
  }, []);

  if (!phoneNumber || !mounted) return null;

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const contextMessage = getContextualMessage(pathname, defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(contextMessage)}`;

  const isIdle =
    !renderState.isDragging &&
    renderState.vx === 0 &&
    renderState.vy === 0 &&
    !renderState.isSnapping;

  return (
    <>
      {/* CSS Keyframes for pulse animation */}
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
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Tooltip */}
      {showTooltip && isIdle && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9996,
            left: renderState.x - 110,
            top: renderState.y + 8,
            pointerEvents: 'none',
            opacity: 1,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Chat starten 💬
          </div>
        </div>
      )}

      {/* Main Button */}
      <a
        ref={btnRef}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nachricht per WhatsApp senden"
        id="whatsapp-floating-btn"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: 'fixed',
          zIndex: 9997,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: SIZE,
          height: SIZE,
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          textDecoration: 'none',
          userSelect: 'none',
          touchAction: 'none',
          left: renderState.x,
          top: renderState.y,
          cursor: renderState.isDragging ? 'grabbing' : 'grab',
          boxShadow: renderState.isDragging
            ? '0 8px 40px rgba(37,211,102,0.7), 0 0 0 6px rgba(37,211,102,0.25)'
            : '0 6px 28px rgba(37,211,102,0.55), 0 0 0 4px rgba(37,211,102,0.3)',
          transform: renderState.isDragging ? 'scale(1.15)' : 'scale(1)',
          transition: renderState.isDragging
            ? 'none'
            : renderState.isSnapping
              ? 'none'
              : 'box-shadow 0.3s, transform 0.2s',
          willChange: 'left, top, transform',
          animation: isIdle ? 'wa-pulse 2s ease-in-out infinite' : 'none',
        }}
      >
        {/* Notification Badge */}
        {showBadge && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontSize: 12,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid #fff',
              boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
              fontFamily: 'system-ui, sans-serif',
              pointerEvents: 'none',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            1
          </span>
        )}

        {/* WhatsApp SVG Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          style={{ fill: '#ffffff', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
