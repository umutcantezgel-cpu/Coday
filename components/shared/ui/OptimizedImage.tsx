import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    priority = false,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`
                    w-full h-full object-cover transition-opacity duration-500 ease-in-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                    ${className}
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
