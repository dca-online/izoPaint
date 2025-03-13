'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export type FallbackType = 'placeholder' | 'product' | 'person' | 'service';

type ErrorFallbackImageProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
  fallbackType?: FallbackType;
};

const ErrorFallbackImage = ({
  src,
  alt,
  fallbackSrc,
  fallbackType = 'placeholder',
  ...props
}: ErrorFallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Select appropriate fallback based on type
  const getFallbackSrc = () => {
    if (fallbackSrc) return fallbackSrc;
    
    switch (fallbackType) {
      case 'product':
        return '/images/product-placeholder.svg';
      case 'person':
        return '/images/person-placeholder.svg';
      case 'service':
        return '/images/service-placeholder.svg';
      case 'placeholder':
      default:
        return '/images/placeholder.svg';
    }
  };

  const handleError = () => {
    if (!hasError) {
      setImgSrc(getFallbackSrc());
      setHasError(true);
      
      // Replace console.warn with a comment or implement proper error handling
      // console.warn(`Image failed to load: ${src}. Using fallback.`);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ErrorFallbackImage; 