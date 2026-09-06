'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide' | 'portrait';
  /** @deprecated — next/image handles srcSet automatically */
  srcSet?: string;
  sizes?: string;
  /** Explicit width for layout — required by next/image for static images */
  width?: number;
  /** Explicit height for layout — required by next/image for static images */
  height?: number;
  style?: React.CSSProperties;
  title?: string;
  draggable?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
}

// Default sizes attribute for responsive images when none is provided
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * Client variant of OptimizedImage with an onError fallback ("Image N/A").
 *
 * Use it only where the src can be a remote URL that may 404 (cdn.sanity.io,
 * images.provenexpert.com, CMS-fed content). Everywhere else use the
 * server-safe OptimizedImage so server sections stay server components.
 */
export const OptimizedImageWithFallback: React.FC<OptimizedImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio,
  sizes,
  width,
  height,
  style,
  fetchPriority,
  loading,
  // srcSet is accepted but ignored — next/image generates its own
}) => {
  const [hasError, setHasError] = useState(false);

  // Dynamic aspect ratio container
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[21/9]';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return '';
    }
  };

  // Container style with inline aspect ratio if width/height provided
  const containerStyle: React.CSSProperties = {
    ...style,
    ...(width && height && !aspectRatio ? { aspectRatio: `${width} / ${height}` } : {}),
  };

  // Determine if we should use fill mode (no explicit dimensions, or has aspect ratio)
  const useFill = !width || !height || !!aspectRatio;

  // Skip SVGs — next/image can't optimize them, serve directly
  const isSvg = src.endsWith('.svg');

  const finalAlt = alt && alt.trim() !== '' ? alt : 'Webdesign & Webentwicklung Wetzlar – Coday';

  if (isSvg) {
    return (
      <div
        className={`relative overflow-hidden ${getAspectRatioClass()} ${className}`}
        style={containerStyle}
      >
        <Image
          src={src}
          alt={finalAlt}
          unoptimized
          {...(useFill
            ? { fill: true, className: 'object-cover' }
            : {
                width: width as number,
                height: height as number,
                className: 'w-full h-full object-cover',
              })}
          priority={priority}
          sizes={sizes || DEFAULT_SIZES}
          onError={() => setHasError(true)}
          {...(fetchPriority ? { fetchPriority } : {})}
          {...(loading ? { loading } : {})}
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gray-200 ${getAspectRatioClass()} ${className}`}
        style={containerStyle}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
          Image N/A
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${getAspectRatioClass()} ${className}`}
      style={containerStyle}
    >
      <Image
        src={src}
        alt={finalAlt}
        {...(useFill
          ? { fill: true, className: 'object-cover' }
          : { width, height, className: 'w-full h-full object-cover' })}
        sizes={sizes || DEFAULT_SIZES}
        priority={priority}
        quality={80}
        onError={() => setHasError(true)}
        {...(fetchPriority ? { fetchPriority } : {})}
        {...(loading ? { loading } : {})}
      />
    </div>
  );
};
