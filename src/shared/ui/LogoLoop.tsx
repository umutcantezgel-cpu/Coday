"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [seqHeight, setSeqHeight] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // Pause rAF when off-screen to save CPU
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
        threshold: 0,
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          const newHeight = Math.ceil(sequenceHeight);
          setSeqHeight((prev) => (prev !== newHeight ? newHeight : prev));

          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded =
            Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          const newCopyCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);
          setCopyCount((prev) => (prev !== newCopyCount ? newCopyCount : prev));
        }
      } else if (sequenceWidth > 0) {
        const newWidth = Math.ceil(sequenceWidth);
        setSeqWidth((prev) => (prev !== newWidth ? newWidth : prev));

        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        const newCopyCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);
        setCopyCount((prev) => (prev !== newCopyCount ? newCopyCount : prev));
      }
    }, [isVertical]);

    // Animation loop
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const seqSize = isVertical ? seqHeight : seqWidth;

      if (seqSize > 0) {
        offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      if (prefersReduced) {
        track.style.transform = 'translate3d(0, 0, 0)';
        return () => {
          lastTimestampRef.current = null;
        };
      }

      if (!isVisible) {
        return () => {
          lastTimestampRef.current = null;
        };
      }

      const animate = (timestamp: number) => {
        if (lastTimestampRef.current === null) {
          lastTimestampRef.current = timestamp;
        }

        const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        const target =
          isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;

        const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
        velocityRef.current += (target - velocityRef.current) * easingFactor;

        if (seqSize > 0) {
          let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
          nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
          offsetRef.current = nextOffset;

          const transformValue = isVertical
            ? `translate3d(0, ${-offsetRef.current}px, 0)`
            : `translate3d(${-offsetRef.current}px, 0, 0)`;
          track.style.transform = transformValue;
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        lastTimestampRef.current = null;
      };
    }, [
      targetVelocity,
      seqWidth,
      seqHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical,
      isVisible,
    ]);

    // Resize observer
    useEffect(() => {
      if (!window.ResizeObserver) {
        const handleResize = () => updateDimensions();
        window.addEventListener('resize', handleResize);
        requestAnimationFrame(() => updateDimensions());
        return () => window.removeEventListener('resize', handleResize);
      }

      const observers: ResizeObserver[] = [];
      [containerRef, seqRef].forEach((ref) => {
        if (!ref.current) return;
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(ref.current);
        observers.push(observer);
      });

      requestAnimationFrame(() => updateDimensions());

      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    }, [updateDimensions, logos, gap, logoHeight, isVertical]);

    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative group',
          isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          className
        ),
      [isVertical, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li
              className={cx(
                'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
                isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
                scaleOnHover && 'overflow-visible group/item'
              )}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          );
        }

        const isNodeItem = 'node' in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              'inline-flex items-center',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
          >
            {(item as { node: React.ReactNode }).node}
          </span>
        ) : (
          <OptimizedImage
            className={cx(
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
              '[-webkit-user-drag:none] pointer-events-none',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            src={(item as { src: string }).src}
            alt={(item as { alt?: string }).alt ?? ''}
            title={(item as { title?: string }).title}
            // loading="lazy" is handled by OptimizedImage defaults if not priority
            // decoding="async" is handled by OptimizedImage
            draggable={false}
          />
        );

        const itemHref = (item as { href?: string }).href;
        const itemTitle = (item as { title?: string }).title;
        const itemAriaLabel = isNodeItem
          ? ((item as { ariaLabel?: string }).ariaLabel ?? itemTitle)
          : ((item as { alt?: string }).alt ?? itemTitle);

        const inner = itemHref ? (
          <a
            className={cx(
              'inline-flex items-center no-underline rounded',
              'transition-opacity duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={itemHref}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
              isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
              scaleOnHover && 'overflow-visible group/item'
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [isVertical, scaleOnHover, renderItem]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx('flex items-center', isVertical && 'flex-col')}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,8%,120px)] bg-gradient-to-b from-white to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,8%,120px)] bg-gradient-to-t from-white to-transparent"
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-gradient-to-r from-white to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-gradient-to-l from-white to-transparent"
                />
              </>
            )}
          </>
        )}

        <div
          className={cx(
            'flex will-change-transform select-none relative z-0',
            'motion-reduce:transform-none',
            isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'
          )}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
