'use client';
import React, { useRef, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageVideoBackgroundProps {
  className?: string;
  videoSrc?: string;
}

const PageVideoBackground: React.FC<PageVideoBackgroundProps> = ({ 
  className = '',
  videoSrc = '/videos/paint.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This effect will re-run whenever the URL changes (pathname or search params)
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Force video reload and play when URL changes
    const loadAndPlayVideo = () => {
      console.log('Loading and playing video background...');
      // Reset video if it was previously loaded
      if (isLoaded) {
        video.pause();
        video.currentTime = 0;
      }
      
      // Set video src attribute directly if needed
      if (!video.getAttribute('src')) {
        video.src = videoSrc;
      }
      
      // Force load and play
      video.load();
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('AutoPlay prevented:', error);
          // Add click handler for browsers that require user interaction
          document.addEventListener('click', handleClick, { once: true });
        });
      }
      
      setIsLoaded(true);
    };
    
    const handleClick = () => {
      if (video) {
        video.play().catch(err => console.log('Play after click failed:', err));
      }
    };
    
    // Run on initial load and URL changes
    loadAndPlayVideo();
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, searchParams, videoSrc, isLoaded]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 object-cover w-full h-full"
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => console.log('Video loaded successfully')}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Semi-transparent overlay for better content readability */}
      <div className="absolute inset-0 bg-white/40" />
    </div>
  );
};

export default PageVideoBackground; 