'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ErrorFallbackImageProps = ImageProps & {
  type?: 'product' | 'category' | 'subcategory' | 'default';
  fallbackSrc?: string;
};

const ErrorFallbackImage = ({ 
  src, 
  alt, 
  type = 'default',
  fallbackSrc,
  ...props 
}: ErrorFallbackImageProps) => {
  const [error, setError] = useState(false);

  // Choose the appropriate placeholder based on type
  const getFallbackSrc = () => {
    // If custom fallback is provided, use it
    if (fallbackSrc) {
      return fallbackSrc;
    }
    
    // Otherwise use default fallbacks
    switch (type) {
      case 'product':
        return '/images/product-placeholder.svg';
      case 'category':
        return '/images/category-placeholder.svg';
      case 'subcategory':
        return '/images/subcategory-placeholder.svg';
      default:
        return '/images/placeholder.svg';
    }
  };

  return (
    <Image
      src={error ? getFallbackSrc() : src}
      alt={alt}
      {...props}
      onError={() => setError(true)}
    />
  );
};

export default ErrorFallbackImage; 