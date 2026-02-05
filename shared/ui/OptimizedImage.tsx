import React, { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
    responsive?: boolean;
}

/**
 * Optimized image component with WebP support and lazy loading.
 * Automatically generates WebP path from JPEG/PNG and uses picture element.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    priority = false,
    sizes = '(max-width: 768px) 100vw, 50vw',
    responsive = false // New prop to enable automatic srcset
}) => {
    const [hasError, setHasError] = useState(false);
    const [failedWebp, setFailedWebp] = useState(false);

    // Generate WebP source path from original
    const webpSrc = src.replace(/\.(jpeg|jpg|png)$/i, '.webp');

    // Generate responsive srcset if enabled
    const srcSet = responsive
        ? `${webpSrc.replace('.webp', '-320w.webp')} 320w, 
           ${webpSrc.replace('.webp', '-640w.webp')} 640w, 
           ${webpSrc.replace('.webp', '-1024w.webp')} 1024w, 
           ${webpSrc.replace('.webp', '-1920w.webp')} 1920w`
        : webpSrc;

    const handleError = () => {
        if (!failedWebp) {
            setFailedWebp(true);
        } else {
            setHasError(true);
        }
    };

    if (hasError) {
        return (
            <div className={`${className} bg-gray-100 flex items-center justify-center`}>
                <span className="text-gray-400 text-sm">Bild nicht gefunden</span>
            </div>
        );
    }

    if (failedWebp) {
        // Fallback to simple img tag without picture source
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                sizes={sizes}
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <picture>
            {/* WebP source - modern browsers will use this */}
            <source srcSet={srcSet} type="image/webp" />
            {/* Fallback to original format */}
            <img
                src={src}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                sizes={sizes}
                onError={handleError}
            />
        </picture>
    );
};

export default OptimizedImage;

