import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    aspectRatio?: 'video' | 'square' | 'wide' | 'portrait';
    srcSet?: string;
    sizes?: string;
    /** Explicit width for CLS prevention — defaults based on aspectRatio */
    width?: number;
    /** Explicit height for CLS prevention — defaults based on aspectRatio */
    height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    priority = false,
    aspectRatio,
    srcSet,
    sizes,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setIsLoaded(true);
        }
    }, []);

    // Dynamic aspect ratio container
    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'video': return 'aspect-video';
            case 'square': return 'aspect-square';
            case 'wide': return 'aspect-[21/9]';
            case 'portrait': return 'aspect-[3/4]';
            default: return '';
        }
    };

    return (
        <div
            className={`relative overflow-hidden bg-gray-100 ${getAspectRatioClass()} ${className}`}
            style={props.style}
        >
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            <img
                ref={imgRef}
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`
                    w-full h-full object-cover transition-opacity duration-500 ease-in-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                {...props}
            />
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                    Image N/A
                </div>
            )}
        </div>
    );
};
