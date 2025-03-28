'use client';
import React, { useRef, useState, useEffect } from 'react';
import styles from './FullPageSections.module.css';

interface SimpleFullPageSectionsProps {
  children: React.ReactNode[];
  startAfterAnimation?: boolean;
  topOffset?: number;
  showIndicators?: boolean;
  animationDuration?: number;
}

const SimpleFullPageSections: React.FC<SimpleFullPageSectionsProps> = ({
  children,
  startAfterAnimation = true,
  topOffset = 80,
  showIndicators = true,
  animationDuration = 800
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(!startAfterAnimation);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update refs array when children count changes
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, React.Children.count(children));
  }, [children]);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for the VideoHeader animation completion
  useEffect(() => {
    if (!startAfterAnimation) return;

    const handleScroll = () => {
      // When user scrolls past the video animation
      const scrollThreshold = isMobile ? window.innerHeight * 0.15 : window.innerHeight * 0.30;
      
      if (window.scrollY > scrollThreshold && !isAnimationComplete) {
        setIsAnimationComplete(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startAfterAnimation, isAnimationComplete, isMobile]);

  // Set ref for each section
  const setSectionRef = (el: HTMLElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  // ONLY track which section is most visible for color changes - no scroll intervention
  useEffect(() => {
    const handleVisibilityTracking = () => {
      if (sectionsRef.current.length === 0) return;

      // Find the section that is most visible in the viewport
      let mostVisibleSection = activeIndex;
      let maxVisibleHeight = 0;
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = index;
          }
        }
      });
      
      // Only update if the most visible section has changed
      if (mostVisibleSection !== activeIndex) {
        setActiveIndex(mostVisibleSection);
      }
    };

    // Use passive listeners to not block the main thread
    window.addEventListener('scroll', handleVisibilityTracking, { passive: true });
    
    // Initial check
    handleVisibilityTracking();
    
    return () => window.removeEventListener('scroll', handleVisibilityTracking);
  }, [activeIndex]);

  // If animation is not complete, render a placeholder
  if (!isAnimationComplete) {
    return (
      <div className={styles.fullPageContainer}>
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`${styles.fullPageContainer} ${isAnimationComplete ? styles.animationComplete : ''}`}
      style={{ touchAction: 'auto' }}
      data-fullpage-container="true"
    >
      {/* Render sections */}
      {React.Children.map(children, (child, index) => (
        <section 
          ref={(el) => setSectionRef(el, index)}
          className={`${styles.section} ${activeIndex === index ? styles.active : ''}`}
          style={{ 
            minHeight: `calc(100vh - ${topOffset}px)`,
            paddingTop: `${topOffset}px`
          }}
          key={`section-${index}`}
          data-section-index={index}
        >
          <div className={styles.sectionContent}>
            {child}
          </div>
        </section>
      ))}
      
      {/* Section indicator dots - visual only, not interactive */}
      {showIndicators && !isMobile && React.Children.count(children) > 1 && (
        <div className={styles.sectionIndicator}>
          {React.Children.map(children, (_, index) => (
            <div 
              className={`${styles.sectionDot} ${index === activeIndex ? styles.active : ''}`}
              key={`dot-${index}`}
              aria-label={`Section ${index + 1}`}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SimpleFullPageSections; 