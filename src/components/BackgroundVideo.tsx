'use client';
import { useRef, useEffect, useState } from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
  verticalFlip?: boolean;
  horizontalFlip?: boolean;
}

const BackgroundVideo = ({ videoSrc, verticalFlip = false, horizontalFlip = false }: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingForward, setIsPlayingForward] = useState(true);
  const animationRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device and set state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Apply flips for better positioning
  useEffect(() => {
    if (!videoRef.current) return;
    
    // Apply the appropriate transform based on the flip props
    if (verticalFlip && horizontalFlip) {
      videoRef.current.style.transform = 'scale(-1, -1)'; // Both flips
    } else if (verticalFlip) {
      videoRef.current.style.transform = 'scale(1, -1)'; // Vertical only
    } else if (horizontalFlip) {
      videoRef.current.style.transform = 'scale(-1, 1)'; // Horizontal only
    } else {
      videoRef.current.style.transform = ''; // No flip
    }
    
    // Ensure video always covers the screen on mobile
    if (isMobile) {
      videoRef.current.style.width = '100vw';
      videoRef.current.style.height = '100vh';
      videoRef.current.style.objectFit = 'cover';
      videoRef.current.style.position = 'fixed';
      videoRef.current.style.top = '0';
      videoRef.current.style.left = '0';
    }
  }, [verticalFlip, horizontalFlip, isMobile]);
  
  // Add scroll listener to ensure video stays fixed during scroll
  useEffect(() => {
    if (!isMobile || !containerRef.current || !videoRef.current) return;
    
    const handleScroll = () => {
      if (videoRef.current) {
        // Ensure video maintains its position during scroll
        videoRef.current.style.position = 'fixed';
        videoRef.current.style.top = '0';
        videoRef.current.style.left = '0';
        videoRef.current.style.width = '100vw';
        videoRef.current.style.height = '100vh';
        videoRef.current.style.objectFit = 'cover';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleVideoEnded = () => {
      // Time to play it backwards - creates that cool ping-pong effect
      setIsPlayingForward(false);
      if (video.currentTime >= video.duration - 0.1) {
        video.pause();
        startReversePlayback();
      }
    };
    
    const handleVideoTimeUpdate = () => {
      // We've reached the beginning again while playing backwards - back to forward we go
      if (!isPlayingForward && video.currentTime <= 0.1) {
        setIsPlayingForward(true);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        video.currentTime = 0;
        video.play();
      }
    };
    
    // Our little animation loop for smooth backward playback
    const startReversePlayback = () => {
      if (!video) return;
      
      let lastTimestamp = 0;
      const step = 0.05; // The smaller this is, the smoother (but slower) the rewind
      
      const animate = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        // Frame timing magic for smooth playback
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > 16) { // Roughly targeting 60fps feels nice and smooth
          // Rewind the video frame by frame
          video.currentTime = Math.max(0, video.currentTime - step);
          lastTimestamp = timestamp;
          
          // We're back at the start, let's go forward again
          if (video.currentTime <= 0.1) {
            setIsPlayingForward(true);
            video.currentTime = 0;
            video.play();
            return;
          }
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Hooking up the video event listeners
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('timeupdate', handleVideoTimeUpdate);
    
    // Kick things off
    video.play();
    
    return () => {
      // Housekeeping when component unmounts
      if (video) {
        video.removeEventListener('ended', handleVideoEnded);
        video.removeEventListener('timeupdate', handleVideoTimeUpdate);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlayingForward]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 w-full h-full overflow-hidden"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`absolute h-full w-full object-cover ${isMobile ? 'will-change-transform' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover'
        }}
        src={videoSrc}
      />
    </div>
  );
};

export default BackgroundVideo; 