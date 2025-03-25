'use client';
import React, { useRef, useEffect } from 'react';

interface ProductCardBackgroundProps {
  className?: string;
}

const ProductCardBackground: React.FC<ProductCardBackgroundProps> = ({ className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      // Try to play the video
      video.play().catch((error) => {
        console.log('AutoPlay prevented:', error);
        // Many browsers require user interaction to play videos
        // We'll add a click event to the document to handle this
        document.addEventListener('click', handleClick, { once: true });
      });
    };

    const handleClick = () => {
      if (video) {
        video.play().catch(err => console.log('Play after click failed:', err));
      }
    };

    // Attempt autoplay when component mounts
    playVideo();

    // Cleanup function
    return () => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ''}`}>
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 object-cover w-full h-full"
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/paint.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
    </div>
  );
};

export default ProductCardBackground; 