'use client';
import { useRef, useEffect, useState } from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
  verticalFlip?: boolean;
}

const BackgroundVideo = ({ videoSrc, verticalFlip = false }: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingForward, setIsPlayingForward] = useState(true);
  const animationRef = useRef<number | null>(null);
  
  // Apply vertical flip via direct DOM manipulation after component mounts
  useEffect(() => {
    if (videoRef.current && verticalFlip) {
      videoRef.current.style.transform = 'scale(1, -1)';
    }
  }, [verticalFlip]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleVideoEnded = () => {
      // When video ends normally, we'll start playing in reverse
      setIsPlayingForward(false);
      if (video.currentTime >= video.duration - 0.1) {
        video.pause();
        startReversePlayback();
      }
    };
    
    const handleVideoTimeUpdate = () => {
      // If reverse playing and reached near beginning, switch to forward
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
    
    // Function to handle reverse playback using requestAnimationFrame
    const startReversePlayback = () => {
      if (!video) return;
      
      let lastTimestamp = 0;
      const step = 0.05; // Time step for reverse playback (adjust for speed)
      
      const animate = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        // Calculate elapsed time and adjust for desired playback speed
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > 16) { // ~60fps
          // Move backward in time
          video.currentTime = Math.max(0, video.currentTime - step);
          lastTimestamp = timestamp;
          
          // If we've reached the beginning, switch to forward playback
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
    
    // Set up event listeners
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('timeupdate', handleVideoTimeUpdate);
    
    // Initial play
    video.play();
    
    return () => {
      // Clean up
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
    <div className="fixed inset-0 z-0 w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute h-full w-full object-cover"
        src={videoSrc}
      />
    </div>
  );
};

export default BackgroundVideo; 