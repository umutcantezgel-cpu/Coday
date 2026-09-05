'use client';
import React, { useCallback, useMemo } from 'react';
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

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 30,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style,
  }) => {
    const isVertical = direction === 'up' || direction === 'down';

    // Calculate pure CSS marquee duration based on content length and requested speed
    const animationDuration = useMemo(() => {
      const itemSpan = (gap || 32) + 120;
      const totalSequenceSpan = (logos?.length || 1) * itemSpan;
      const effectiveSpeed = Math.max(10, Math.abs(speed || 30));
      return Math.max(12, Math.round(totalSequenceSpan / effectiveSpeed));
    }, [logos?.length, gap, speed]);

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
                'transition-transform motion-reduce:duration-[0.01ms] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
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
                'transition-transform motion-reduce:duration-[0.01ms] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            src={(item as { src: string }).src}
            alt={(item as { alt?: string }).alt ?? ''}
            title={(item as { title?: string }).title}
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
              'transition-opacity motion-reduce:duration-[0.01ms] duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={itemHref}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">{itemAriaLabel || 'logo link'}</span>
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
      <div className={rootClasses} style={containerStyle} role="region" aria-label={ariaLabel}>
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
            'flex select-none relative z-0 animate-marquee',
            isVertical ? 'flex-col h-max w-full' : 'flex-row w-max',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{
            animationDuration: `${animationDuration}s`,
            animationDirection:
              direction === 'right' || direction === 'down' ? 'reverse' : 'normal',
            animationName: isVertical ? 'marquee-scroll-vertical' : 'marquee-scroll',
          }}
        >
          <ul className={cx('flex items-center', isVertical && 'flex-col')} role="list">
            {logos.map((item, itemIndex) => renderLogoItem(item, `track-a-${itemIndex}`))}
          </ul>
          <ul
            className={cx('flex items-center', isVertical && 'flex-col')}
            role="list"
            aria-hidden="true"
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `track-b-${itemIndex}`))}
          </ul>
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
